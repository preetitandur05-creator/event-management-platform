export const dynamic = "force-dynamic";

import Link from "next/link";
import { Heart, Leaf, Users, Calendar, MapPin, ArrowRight } from "lucide-react";
import { prisma } from "@/lib/db";
import { formatDate } from "@/lib/utils";

async function getEvent() {
  try {
    return await prisma.event.findFirst({
      where: { isPublished: true },
      orderBy: { createdAt: "desc" },
    });
  } catch {
    return null;
  }
}

export default async function HomePage() {
  const event = await getEvent();

  const name = event?.name ?? "SAMANVAYA 2027";
  const tagline = event?.tagline ?? "United for Health. Together for a Sustainable Future.";
  const description =
    event?.description ??
    "SAMANVAYA 2027 is a community initiative bringing people together to promote preventive healthcare, physical and mental wellness, and environmental sustainability in Hubballi–Dharwad, Karnataka.";
  const startDate = event?.startDate ? formatDate(event.startDate) : "5 February 2027";
  const endDate = event?.endDate ? formatDate(event.endDate) : "7 February 2027";
  const venue = event?.venueName ?? "Moorsavir Math College Ground, Hubballi";

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-white/20 blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-secondary/30 blur-3xl" />
        </div>

        <div className="container-wide relative section-padding !py-24 lg:!py-32">
          <div className="max-w-3xl">
            <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium backdrop-blur mb-6">
              <Calendar size={16} />
              {startDate} – {endDate}
            </p>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
              {name}
            </h1>
            <p className="mt-4 text-xl sm:text-2xl text-white/90 font-medium">
              {tagline}
            </p>
            <p className="mt-6 text-lg text-white/80 leading-relaxed max-w-2xl">
              {description}
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/register" className="btn-primary !bg-white !text-primary-900 hover:!bg-white/90">
                Register Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link href="/agenda" className="btn-secondary !border-white/40 !text-white hover:!bg-white/10">
                Explore Agenda
              </Link>
            </div>
            <div className="mt-8 flex items-center gap-2 text-sm text-white/70">
              <MapPin size={16} />
              {venue}
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-wide">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground">
              Three Days. One Vision.
            </h2>
            <p className="mt-4 text-muted-foreground text-lg">
              Health awareness, mindfulness, and sustainable living come together for a healthier, greener community.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                icon: Heart,
                title: "Health First",
                day: "Day 1 · 5 Feb",
                desc: "Preventive healthcare awareness, basic screenings with medical partners, and nutrition sessions.",
              },
              {
                icon: Users,
                title: "Mind & Body",
                day: "Day 2 · 6 Feb",
                desc: "Yoga, mindfulness, stress management, and wellness demonstrations for physical and mental balance.",
              },
              {
                icon: Leaf,
                title: "Go Green",
                day: "Day 3 · 7 Feb",
                desc: "Waste segregation, composting, plastic-free living, sapling activity, and community sustainability pledge.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="group rounded-2xl border border-border bg-card p-8 shadow-sm transition hover:shadow-md hover:border-primary/30"
              >
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                  <item.icon size={24} />
                </div>
                <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-2">
                  {item.day}
                </p>
                <h3 className="font-heading text-xl font-semibold text-foreground mb-3">
                  {item.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-primary text-white">
        <div className="container-narrow text-center">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold">
            Be part of the change
          </h2>
          <p className="mt-4 text-lg text-white/85 max-w-xl mx-auto">
            Free registration for attendees. Join families, students, and community groups for three days of learning and action.
          </p>
          <Link
            href="/register"
            className="btn-primary mt-8 !bg-white !text-primary-900 hover:!bg-white/90 inline-flex"
          >
            Register Free
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
