import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import {
  generateRegistrationId,
  generateTicketNumber,
  generateSecureToken,
} from "@/lib/utils";
import QRCode from "qrcode";
import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { fullName, email, phone, organization, city, ticketType } = body;

    if (!fullName || !email || !phone) {
      return NextResponse.json(
        { error: "Full name, email and phone are required." },
        { status: 400 }
      );
    }

    const event = await prisma.event.findFirst({
      where: { isPublished: true },
      orderBy: { createdAt: "desc" },
    });

    if (!event) {
      return NextResponse.json(
        { error: "No active event found. Please complete setup first." },
        { status: 400 }
      );
    }

    let tt = await prisma.ticketType.findFirst({
      where: {
        eventId: event.id,
        name: {
          equals: ticketType === "exhibitor" ? "Exhibitor" : ticketType === "volunteer" ? "Volunteer" : "Attendee",
          mode: "insensitive",
        },
      },
    });

    if (!tt) {
      tt = await prisma.ticketType.create({
        data: {
          eventId: event.id,
          name:
            ticketType === "exhibitor"
              ? "Exhibitor"
              : ticketType === "volunteer"
              ? "Volunteer"
              : "Attendee",
          price: ticketType === "exhibitor" ? 1500 : 0,
          currency: "INR",
        },
      });
    }

    const existing = await prisma.registration.findFirst({
      where: {
        eventId: event.id,
        email: email.toLowerCase().trim(),
        ticketTypeId: tt.id,
        status: { not: "CANCELLED" },
      },
    });

    if (existing) {
      return NextResponse.json(
        { error: "You have already registered with this email for this category." },
        { status: 409 }
      );
    }

    const registrationId = generateRegistrationId("SAM");
    const ticketNumber = generateTicketNumber("TKT");
    const verificationToken = generateSecureToken(40);

    const result = await prisma.$transaction(async (tx) => {
      const registration = await tx.registration.create({
        data: {
          eventId: event.id,
          ticketTypeId: tt!.id,
          registrationId,
          fullName: fullName.trim(),
          email: email.toLowerCase().trim(),
          phone: phone.trim(),
          organization: organization?.trim() || null,
          city: city?.trim() || null,
          status: "CONFIRMED",
        },
      });

      const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
      const verifyUrl = `${appUrl}/ticket/${verificationToken}`;
      const qrDataUrl = await QRCode.toDataURL(verifyUrl, {
        width: 300,
        margin: 2,
        color: { dark: "#1B5E20", light: "#FFFFFF" },
      });

      const ticket = await tx.ticket.create({
        data: {
          registrationId: registration.id,
          ticketNumber,
          verificationToken,
          qrCodeDataUrl: qrDataUrl,
          status: "VALID",
        },
      });

      return { registration, ticket };
    });

    if (resend && process.env.RESEND_FROM_EMAIL) {
      try {
        await resend.emails.send({
          from: `${process.env.RESEND_FROM_NAME || event.name} <${process.env.RESEND_FROM_EMAIL}>`,
          to: result.registration.email,
          subject: `Registration Confirmed – ${event.name}`,
          html: `
            <div style="font-family: Inter, Arial, sans-serif; max-width: 560px; margin: 0 auto; color: #1A2E1A;">
              <h1 style="color: #1B5E20;">Registration Confirmed!</h1>
              <p>Dear ${result.registration.fullName},</p>
              <p>Thank you for registering for <strong>${event.name}</strong>.</p>
              <p><strong>Registration ID:</strong> ${result.registration.registrationId}<br/>
              <strong>Ticket Number:</strong> ${result.ticket.ticketNumber}</p>
              <p>Please keep this email and present your QR code at the venue for check-in.</p>
              <p><a href="${process.env.NEXT_PUBLIC_APP_URL}/ticket/${verificationToken}" style="display:inline-block;background:#1B5E20;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;">View Your Ticket</a></p>
              <p style="color:#5A6B5A;font-size:14px;">Venue: ${event.venueName || "TBA"}<br/>
              Dates: ${event.startDate.toLocaleDateString("en-IN")} – ${event.endDate.toLocaleDateString("en-IN")}</p>
            </div>
          `,
        });
      } catch (emailErr) {
        console.error("Email send failed:", emailErr);
      }
    }

    return NextResponse.json({
      success: true,
      registration: {
        id: result.registration.id,
        registrationId: result.registration.registrationId,
      },
      ticket: {
        ticketNumber: result.ticket.ticketNumber,
        verificationToken: result.ticket.verificationToken,
      },
    });
  } catch (err: any) {
    console.error("Registration error:", err);
    return NextResponse.json(
      { error: "Registration failed. Please try again later." },
      { status: 500 }
    );
  }
}
