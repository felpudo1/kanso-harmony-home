import { HeartHandshake, Leaf, ShieldCheck } from "lucide-react";

const VALUES = [
  {
    icon: HeartHandshake,
    title: "Confidencialidad 100% y respeto",
    text: "Entramos a tu casa sin juicios. Cada decisión de descarte es tuya y lo que vemos queda entre nosotras.",
  },
  {
    icon: ShieldCheck,
    title: "Seguridad y ergonomía",
    text: "Protocolos estandarizados de levantamiento de cargas, trabajo en altura y prevención de riesgos.",
  },
  {
    icon: Leaf,
    title: "Sustentabilidad",
    text: "Donación consciente de lo que ya no usás e insumos amigables con el ambiente en cada intervención.",
  },
];

export function ValueProps() {
  return (
    <section id="metodo" className="section-y">
      <div className="mx-auto max-w-6xl px-5">
        <h2 className="max-w-2xl text-3xl font-semibold md:text-4xl">
          Un método cuidado, de principio a fin
        </h2>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Trabajamos con criterios profesionales para que el orden se sostenga en el tiempo.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {VALUES.map(({ icon: Icon, title, text }) => (
            <article
              key={title}
              className="rounded-3xl border border-border bg-card p-7 shadow-soft"
            >
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-accent text-accent-foreground">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="mt-5 text-lg font-semibold">{title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
