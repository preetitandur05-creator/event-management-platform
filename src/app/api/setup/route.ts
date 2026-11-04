import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { email, password, name, setupSecret } = body;

    const userCount = await prisma.user.count();
    if (userCount > 0) {
      if (!setupSecret || setupSecret !== process.env.AUTH_SECRET) {
        return NextResponse.json(
          { error: "Setup already completed. Use admin login." },
          { status: 403 }
        );
      }
    }

    if (!email || !password || password.length < 8) {
      return NextResponse.json(
        { error: "Email and password (min 8 chars) are required." },
        { status: 400 }
      );
    }

    const passwordHash = await bcrypt.hash(password, 12);

    let superRole = await prisma.role.findUnique({ where: { name: "SUPER_ADMIN" } });
    if (!superRole) {
      superRole = await prisma.role.create({
        data: {
          name: "SUPER_ADMIN",
          description: "Full system access",
          isSystem: true,
        },
      });
    }

    const user = await prisma.user.upsert({
      where: { email: email.toLowerCase() },
      update: { passwordHash, name: name || "Super Admin", isActive: true },
      create: {
        email: email.toLowerCase(),
        name: name || "Super Admin",
        passwordHash,
        isActive: true,
      },
    });

    await prisma.userRole.upsert({
      where: { userId_roleId: { userId: user.id, roleId: superRole.id } },
      update: {},
      create: { userId: user.id, roleId: superRole.id },
    });

    let event = await prisma.event.findFirst();
    if (!event) {
      event = await prisma.event.create({
        data: {
          name: "SAMANVAYA 2027",
          tagline: "United for Health. Together for a Sustainable Future.",
          description:
            "SAMANVAYA 2027 is a proposed community initiative bringing people together to promote preventive healthcare, physical and mental wellness, and environmental sustainability. The camp will feature health awareness and screening activities through qualified healthcare partners, yoga and wellness sessions, waste management awareness, and eco-friendly community activities. It aims to encourage healthier lifestyles and a greener, more sustainable community in Hubballi–Dharwad, Karnataka.",
          category: "Community Health, Wellness & Sustainability / Social Impact",
          theme: "Healthy Communities, Mindful Living & a Greener Future",
          startDate: new Date("2027-02-05T00:00:00.000Z"),
          endDate: new Date("2027-02-07T00:00:00.000Z"),
          startTime: "09:00",
          endTime: "17:00",
          venueName: "Moorsavir Math College Ground, Hubballi",
          venueAddress: "Kamaripeth, New Hubli, Hubballi, Karnataka",
          mapsUrl: "https://share.google/nctUHrzF9RVOnkZXx",
          organizerName: "SAMANVAYA 2027 Organising Committee",
          organizerEmail: "samanvaya2027@gmail.com",
          organizerPhone: "9482169629",
          primaryColor: "#1B5E20",
          secondaryColor: "#26A69A",
          backgroundColor: "#F8F6F1",
          textColor: "#1A2E1A",
          registrationMode: "OPEN",
          isPublished: true,
        },
      });

      await prisma.ticketType.createMany({
        data: [
          { eventId: event.id, name: "Attendee", price: 0, currency: "INR", sortOrder: 1 },
          { eventId: event.id, name: "Volunteer", price: 0, currency: "INR", sortOrder: 2 },
          { eventId: event.id, name: "Exhibitor", price: 1500, currency: "INR", sortOrder: 3 },
          { eventId: event.id, name: "Sponsor", price: 0, currency: "INR", sortOrder: 4 },
        ],
      });

      const pages = [
        { slug: "home", title: "Home", sortOrder: 1 },
        { slug: "about", title: "About", sortOrder: 2 },
        { slug: "agenda", title: "Agenda", sortOrder: 3 },
        { slug: "sponsors", title: "Partners", sortOrder: 4 },
        { slug: "register", title: "Register", sortOrder: 5 },
        { slug: "contact", title: "Contact", sortOrder: 6 },
        { slug: "privacy", title: "Privacy Policy", sortOrder: 7 },
        { slug: "terms", title: "Terms & Conditions", sortOrder: 8 },
      ];
      await prisma.eventPage.createMany({
        data: pages.map((p) => ({
          eventId: event!.id,
          ...p,
          isEnabled: true,
        })),
      });

      await prisma.spoc.create({
        data: {
          eventId: event.id,
          name: "Preeti T",
          designation: "Event Coordinator Manager",
          department: "Event Management and Operations",
          email: "preetitandur05@gmail.com",
          phone: "9482169629",
          whatsapp: "9482169629",
          responsibility: "General Event Manager",
        },
      });
    }

    return NextResponse.json({
      success: true,
      message: "Setup complete. You can now log in at /admin/login",
      eventId: event.id,
      adminEmail: user.email,
    });
  } catch (err: any) {
    console.error("Setup error:", err);
    return NextResponse.json(
      { error: err.message || "Setup failed" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const userCount = await prisma.user.count();
    const eventCount = await prisma.event.count();
    return NextResponse.json({
      needsSetup: userCount === 0,
      userCount,
      eventCount,
    });
  } catch {
    return NextResponse.json({ needsSetup: true, error: "Database not ready" });
  }
}
