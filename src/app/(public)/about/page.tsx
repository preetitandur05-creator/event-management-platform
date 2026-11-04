export const dynamic = "force-dynamic";

import { prisma } from "@/lib/db";

async function getEvent() {
  try {
    return await prisma.event.findFirst({ where: { isPublished: true } });
  } catch {
    return null;
  }
}

export const metadata = { title: "About" };

export default async function AboutPage() {
  const event = await getEvent();
  const name = event?.name ?? "SAMANVAYA 2027";

  return (
    <div className="section-padding">
      <div className="container-narrow">
        <h1 className="font-heading text-4xl font-bold text-foreground mb-6">
          About {name}
        </h1>
        <div className="prose prose-lg max-w-none text-muted-foreground space-y-6">
          <p>
            {event?.description ??
              "SAMANVAYA 2027 is a proposed community initiative designed to bring health, wellness and environmental sustainability together in one accessible event. It aims to encourage people to adopt healthy habits, understand preventive healthcare and make environmentally responsible choices in their daily lives."}
          </p>
          <p>
            The event will bring together community members, healthcare professionals, wellness instructors, environmental organisations, volunteers, sponsors and exhibitors.
          </p>

          <h2 className="font-heading text-2xl font-semibold text-foreground mt-10">
            Objectives
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Promote awareness of preventive healthcare and healthy lifestyles</li>
            <li>Encourage physical and mental wellness through guided activities</li>
            <li>Educate participants about waste segregation, recycling and sustainable living</li>
            <li>Create collaboration between local communities, businesses and social organisations</li>
            <li>Encourage practical actions that contribute to a healthier and greener community</li>
          </ul>

          <h2 className="font-heading text-2xl font-semibold text-foreground mt-10">
            Target Audience
          </h2>
          <p>
            Local families, adults, senior citizens, students, young adults and community groups.
          </p>

          <h2 className="font-heading text-2xl font-semibold text-foreground mt-10">
            Format
          </h2>
          <p>
            Three-day outdoor community camp at {event?.venueName ?? "Moorsavir Math College Ground, Hubballi"}, subject to venue approval and partner availability.
          </p>
        </div>
      </div>
    </div>
  );
}
