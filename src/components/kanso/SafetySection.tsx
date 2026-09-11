import { HardHat, FlaskConical, PersonStanding } from "lucide-react";

const ITEMS = [
  { icon: PersonStanding, label: "Riesgo ergonómico", text: "Posturas y cargas controladas" },
  { icon: HardHat, label: "Riesgo físico", text: "Trabajo en altura con escalera certificada" },
  { icon: FlaskConical, label: "Riesgo químico", text: "Productos rotulados y ventilación" },
];

export function SafetySection() {
  return (
    <section className="section-y">
      <div className="mx-auto max-w-6xl px-5">
        <div className="rounded-3xl border border-border bg-card p-8 shadow-soft md:p-10">
          <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
            Salud ocupacional
          </p>
          <h2 className="mt-4 max-w-2xl text-2xl font-semibold md:text-3xl">
            Prevención de riesgos laborales en cada jornada
          </h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            {ITEMS.map(({ icon: Icon, label, text }) => (
              <div key={label} className="rounded-2xl bg-secondary p-5">
                <Icon className="h-5 w-5 text-primary" />
                <p className="mt-3 text-sm font-semibold">{label}</p>
                <p className="mt-1 text-sm text-muted-foreground">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
