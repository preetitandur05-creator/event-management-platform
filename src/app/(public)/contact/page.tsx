export const dynamic = "force-dynamic";

import { Mail, Phone, MapPin } from "lucide-react";
import { prisma } from "@/lib/db";

async function getEvent() {
  try {
    return await prisma.event.findFirst({ where: { isPublished: true } });
  } catch {
    return null;
  }
}

export const metadata = { title: "Contact" };

export default async function ContactPage() {
  const event = await getEvent();

  return (
    <div className="section-padding">
      <div className="container-narrow">
        <h1 className="font-heading text-4xl font-bold text-foreground mb-2">
          Contact Us
        </h1>
        <p className="text-muted-foreground mb-12">
          Reach the organising committee for any queries about the event.
        </p>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Mail size={20} />
              </div>
              <div>
                <p className="font-medium text-foreground">Email</p>
                <a
                  href={`mailto:${event?.organizerEmail ?? "samanvaya2027@gmail.com"}`}
                  className="text-primary hover:underline"
                >
                  {event?.organizerEmail ?? "samanvaya2027@gmail.com"}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Phone size={20} />
              </div>
              <div>
                <p className="font-medium text-foreground">Phone / WhatsApp</p>
                <a
                  href={`tel:${event?.organizerPhone ?? "9482169629"}`}
                  className="text-primary hover:underline"
                >
                  {event?.organizerPhone ?? "9482169629"}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <MapPin size={20} />
              </div>
              <div>
                <p className="font-medium text-foreground">Venue</p>
                <p className="text-muted-foreground">
                  {event?.venueName ?? "Moorsavir Math College Ground, Hubballi"}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  {event?.venueAddress ?? "Kamaripeth, New Hubli, Hubballi, Karnataka"}
                </p>
                {event?.mapsUrl && (
                  <a
                    href={event.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline mt-1 inline-block"
                  >
                    View on Google Maps →
                  </a>
                )}
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-8">
            <h2 className="font-heading text-xl font-semibold mb-2">
              Organising Committee
            </h2>
            <p className="text-muted-foreground text-sm mb-4">
              {event?.organizerName ?? "SAMANVAYA 2027 Organising Committee"}
            </p>
            <p className="text-sm text-muted-foreground">
              For registration support, stall enquiries, sponsorship, or partnership opportunities, please email or call us. We aim to respond within 1–2 working days.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
