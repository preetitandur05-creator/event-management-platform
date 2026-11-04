export const dynamic = "force-dynamic";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Users, Ticket, CheckCircle, Calendar } from "lucide-react";

export default async function AdminDashboardPage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/admin/login");
  }

  let stats = {
    totalRegistrations: 0,
    confirmed: 0,
    checkedIn: 0,
    events: 0,
  };

  try {
    const [total, confirmed, checkedIn, events] = await Promise.all([
      prisma.registration.count(),
      prisma.registration.count({ where: { status: "CONFIRMED" } }),
      prisma.checkIn.count(),
      prisma.event.count(),
    ]);
    stats = { totalRegistrations: total, confirmed, checkedIn, events };
  } catch {
    // DB may not be ready
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="border-b border-border bg-card">
        <div className="container-wide flex h-14 items-center justify-between px-4">
          <h1 className="font-heading font-semibold text-lg">Admin Dashboard</h1>
          <div className="flex items-center gap-4 text-sm">
            <span className="text-muted-foreground">{session.user.email}</span>
            <Link href="/" className="text-primary hover:underline">
              View Site
            </Link>
          </div>
        </div>
      </header>

      <main className="container-wide px-4 py-8">
        <h2 className="font-heading text-2xl font-bold mb-6">Overview</h2>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-10">
          {[
            { label: "Total Registrations", value: stats.totalRegistrations, icon: Users },
            { label: "Confirmed", value: stats.confirmed, icon: Ticket },
            { label: "Checked In", value: stats.checkedIn, icon: CheckCircle },
            { label: "Events", value: stats.events, icon: Calendar },
          ].map((s) => (
            <div
              key={s.label}
              className="rounded-xl border border-border bg-card p-5 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">{s.label}</p>
                <s.icon size={18} className="text-primary" />
              </div>
              <p className="mt-2 text-3xl font-bold text-foreground">{s.value}</p>
            </div>
          ))}
        </div>

        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="font-heading font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/register" className="text-primary hover:underline">
                Public Registration Form
              </Link>
            </li>
            <li>
              <span className="text-muted-foreground">
                Full registration list, form builder, email campaigns, SPOC management, and role permissions are scaffolded in the database schema and will expand in subsequent modules.
              </span>
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
}
