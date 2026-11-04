export const dynamic = "force-dynamic";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { prisma } from "@/lib/db";

async function getEvent() {
  try {
    const event = await prisma.event.findFirst({
      where: { isPublished: true },
      orderBy: { createdAt: "desc" },
    });
    return event;
  } catch {
    return null;
  }
}

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const event = await getEvent();

  return (
    <>
      <Header eventName={event?.name} logoUrl={event?.logoUrl} />
      <main className="flex-1">{children}</main>
      <Footer
        eventName={event?.name}
        tagline={event?.tagline}
        organizerEmail={event?.organizerEmail}
        organizerPhone={event?.organizerPhone}
        venueName={event?.venueName}
      />
    </>
  );
}
