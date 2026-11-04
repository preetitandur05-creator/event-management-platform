export const dynamic = "force-dynamic";

import { prisma } from "@/lib/db";
import { formatDate } from "@/lib/utils";
import { CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ token: string }>;
}

export default async function TicketPage({ params }: Props) {
  const { token } = await params;

  const ticket = await prisma.ticket.findUnique({
    where: { verificationToken: token },
    include: {
      registration: {
        include: {
          event: true,
          ticketType: true,
        },
      },
      checkIns: {
        orderBy: { checkedInAt: "desc" },
        take: 1,
      },
    },
  });

  if (!ticket) {
    notFound();
  }

  const { registration } = ticket;
  const event = registration.event;
  const isCheckedIn = ticket.checkIns.length > 0;
  const status = ticket.status;

  return (
    <div className="section-padding min-h-[70vh] flex items-center">
      <div className="container-narrow max-w-lg w-full">
        <div className="rounded-2xl border border-border bg-card shadow-lg overflow-hidden">
          <div className="bg-primary px-6 py-5 text-white text-center">
            <p className="text-sm font-medium opacity-90">{event.name}</p>
            <h1 className="font-heading text-xl font-bold mt-1">Your Ticket</h1>
          </div>

          <div className="p-6 space-y-5">
            <div className="flex justify-center">
              {status === "VALID" && !isCheckedIn && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 text-green-800 px-3 py-1 text-sm font-medium">
                  <CheckCircle size={16} /> Valid Ticket
                </span>
              )}
              {isCheckedIn && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-100 text-blue-800 px-3 py-1 text-sm font-medium">
                  <CheckCircle size={16} /> Checked In
                </span>
              )}
              {status === "CANCELLED" && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-red-100 text-red-800 px-3 py-1 text-sm font-medium">
                  <XCircle size={16} /> Cancelled
                </span>
              )}
              {status === "USED" && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 text-amber-800 px-3 py-1 text-sm font-medium">
                  <AlertCircle size={16} /> Already Used
                </span>
              )}
            </div>

            {ticket.qrCodeDataUrl && status === "VALID" && (
              <div className="flex justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={ticket.qrCodeDataUrl}
                  alt="Ticket QR Code"
                  className="w-48 h-48 rounded-lg border border-border"
                />
              </div>
            )}

            <dl className="space-y-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Name</dt>
                <dd className="font-medium text-foreground">{registration.fullName}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Registration ID</dt>
                <dd className="font-mono text-foreground">{registration.registrationId}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Ticket No.</dt>
                <dd className="font-mono text-foreground">{ticket.ticketNumber}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Category</dt>
                <dd className="font-medium text-foreground">{registration.ticketType.name}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Event Dates</dt>
                <dd className="text-foreground">
                  {formatDate(event.startDate)} – {formatDate(event.endDate)}
                </dd>
              </div>
              {event.venueName && (
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Venue</dt>
                  <dd className="text-foreground text-right max-w-[60%]">
                    {event.venueName}
                  </dd>
                </div>
              )}
            </dl>

            <p className="text-xs text-muted-foreground text-center pt-2 border-t border-border">
              Present this QR code at the entrance for check-in. Screenshot or print this page.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
