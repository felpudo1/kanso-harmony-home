import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SERVICES } from "@/lib/kanso-data";

interface ServicesProps {
  onRequest: (serviceName: string) => void;
}

export function Services({ onRequest }: ServicesProps) {
  return (
    <section id="servicios" className="section-y bg-sand/60">
      <div className="mx-auto max-w-6xl px-5">
        <h2 className="max-w-2xl text-3xl font-semibold md:text-4xl">Servicios</h2>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Elegí el punto de partida. Toda intervención comienza con un diagnóstico sin costo.
        </p>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {SERVICES.map((service) => (
            <article
              key={service.id}
              className="flex flex-col rounded-3xl border border-border bg-card p-7 shadow-soft"
            >
              <h3 className="text-xl font-semibold">{service.name}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {service.description}
              </p>

              <ul className="mt-6 space-y-2.5 text-sm">
                {service.features.map((feature) => (
                  <li key={feature} className="flex gap-2.5 text-muted-foreground">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    {feature}
                  </li>
                ))}
              </ul>

              <p className="mt-7 border-t border-border pt-5 text-sm font-medium text-foreground">
                {service.price}
              </p>

              <Button
                variant="outline"
                className="mt-5"
                onClick={() => onRequest(service.name)}
              >
                Consultar
              </Button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
