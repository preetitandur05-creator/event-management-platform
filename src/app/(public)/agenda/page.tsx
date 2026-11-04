export const metadata = { title: "Agenda" };

const days = [
  {
    title: "Day 1 — Health First",
    date: "Friday, 5 February 2027 · Proposed",
    sessions: [
      { time: "9:00–10:00 AM", title: "Registration and welcome" },
      { time: "10:00–11:00 AM", title: "Opening session and health awareness" },
      { time: "11:00 AM–1:00 PM", title: "Proposed basic health screening with qualified medical partners" },
      { time: "1:00–2:00 PM", title: "Lunch break" },
      { time: "2:00–4:00 PM", title: "Nutrition, preventive healthcare and healthy habits sessions" },
      { time: "4:00–5:00 PM", title: "Questions, referrals where appropriate and closing activities" },
    ],
  },
  {
    title: "Day 2 — Mind and Body",
    date: "Saturday, 6 February 2027 · Proposed",
    sessions: [
      { time: "9:00–10:00 AM", title: "Welcome and guided stretching" },
      { time: "10:00–11:30 AM", title: "Yoga and mindfulness sessions" },
      { time: "11:30 AM–1:00 PM", title: "Healthy eating and lifestyle workshop" },
      { time: "1:00–2:00 PM", title: "Lunch break" },
      { time: "2:00–3:30 PM", title: "Stress management and personal well-being" },
      { time: "3:30–5:00 PM", title: "Wellness demonstrations and product exhibition" },
    ],
  },
  {
    title: "Day 3 — Go Green",
    date: "Sunday, 7 February 2027 · Proposed",
    sessions: [
      { time: "9:00–10:00 AM", title: "Welcome and environmental awareness" },
      { time: "10:00–11:30 AM", title: "Waste segregation and composting demonstration" },
      { time: "11:30 AM–1:00 PM", title: "Sustainable products and plastic-free living exhibition" },
      { time: "1:00–2:00 PM", title: "Lunch break" },
      { time: "2:00–3:30 PM", title: "Sapling activity and authorised e-waste collection, if arranged" },
      { time: "3:30–5:00 PM", title: "Community sustainability pledge and closing ceremony" },
    ],
  },
];

export default function AgendaPage() {
  return (
    <div className="section-padding">
      <div className="container-narrow">
        <h1 className="font-heading text-4xl font-bold text-foreground mb-2">
          Event Agenda
        </h1>
        <p className="text-muted-foreground mb-12">
          Proposed schedule — subject to final partner confirmations.
        </p>

        <div className="space-y-12">
          {days.map((day) => (
            <div key={day.title}>
              <div className="mb-6">
                <h2 className="font-heading text-2xl font-semibold text-primary">
                  {day.title}
                </h2>
                <p className="text-sm text-muted-foreground mt-1">{day.date}</p>
              </div>
              <div className="rounded-xl border border-border overflow-hidden">
                <table className="w-full text-sm">
                  <tbody>
                    {day.sessions.map((s, i) => (
                      <tr
                        key={i}
                        className={i % 2 === 0 ? "bg-card" : "bg-muted/40"}
                      >
                        <td className="px-5 py-3.5 font-medium text-foreground whitespace-nowrap w-40 align-top">
                          {s.time}
                        </td>
                        <td className="px-5 py-3.5 text-muted-foreground">
                          {s.title}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
