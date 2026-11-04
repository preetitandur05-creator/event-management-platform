export const metadata = { title: "Partners & Sponsors" };

const sponsors = [
  { name: "Dabur India", tier: "Sponsor" },
  { name: "Apollo Hospitals", tier: "Sponsor" },
  { name: "Abbott India", tier: "Sponsor" },
  { name: "Tata Consumer Products", tier: "Sponsor" },
  { name: "HDFC Life", tier: "Sponsor" },
];

const partners = [
  "Local registered environmental NGO",
  "Local yoga or wellness centre",
  "Authorised e-waste recycler",
  "Hubballi-Dharwad Municipal Corporation",
  "Indian Red Cross Society",
  "KLE Society's JGMM Medical College",
];

const exhibitors = ["Patanjali Ayurveda", "Organic India", "Dabur India"];

export default function SponsorsPage() {
  return (
    <div className="section-padding">
      <div className="container-wide">
        <h1 className="font-heading text-4xl font-bold text-foreground mb-2 text-center">
          Partners & Sponsors
        </h1>
        <p className="text-muted-foreground text-center mb-14 max-w-2xl mx-auto">
          We are grateful to the organisations supporting health, wellness and sustainability in our community.
        </p>

        <section className="mb-16">
          <h2 className="font-heading text-2xl font-semibold text-primary mb-6 text-center">
            Sponsors
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {sponsors.map((s) => (
              <div
                key={s.name}
                className="rounded-xl border border-border bg-card p-6 text-center shadow-sm"
              >
                <p className="font-heading font-semibold text-lg text-foreground">
                  {s.name}
                </p>
                <p className="text-xs text-muted-foreground mt-1 uppercase tracking-wide">
                  {s.tier}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="font-heading text-2xl font-semibold text-primary mb-6 text-center">
            Partners
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {partners.map((p) => (
              <div
                key={p}
                className="rounded-lg border border-border bg-card px-5 py-4 text-sm text-foreground"
              >
                {p}
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="font-heading text-2xl font-semibold text-primary mb-6 text-center">
            Exhibitors
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {exhibitors.map((e) => (
              <div
                key={e}
                className="rounded-full border border-primary/30 bg-primary/5 px-6 py-2.5 text-sm font-medium text-primary"
              >
                {e}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
