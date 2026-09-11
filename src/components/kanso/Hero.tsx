import { Button } from "@/components/ui/button";
import { BeforeAfterSlider } from "@/components/ui/before-after-slider";
import antes from "@/assets/antes-placard.jpg";
import despues from "@/assets/despues-placard.jpg";

const scrollTo = (id: string) =>
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

export function Hero() {
  return (
    <section id="inicio" className="bg-calm">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 md:py-24 lg:grid-cols-[1fr_1.05fr] lg:items-center">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">
            Kanso — Organización & Confort
          </p>
          <h1 className="mt-5 text-4xl font-semibold leading-[1.08] md:text-6xl">
            El arte de organizar para vivir mejor.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Transformamos espacios saturados en lugares funcionales. Te devolvemos la armonía en tu
            hogar y tiempo para disfrutar de lo valioso de la vida.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button size="lg" onClick={() => scrollTo("calculadora")}>
              Cotizar Servicio Express
            </Button>
            <Button size="lg" variant="outline" onClick={() => scrollTo("servicios")}>
              Ver Servicios
            </Button>
          </div>
          <p className="mt-7 text-sm text-muted-foreground">
            Base en Parque Batlle · Montevideo y área metropolitana
          </p>
        </div>

        <BeforeAfterSlider
          priority
          beforeSrc={antes}
          afterSrc={despues}
          beforeAlt="Placard saturado con ropa y cajas desordenadas antes de la intervención"
          afterAlt="Vestidor organizado con canastos y ropa doblada después del trabajo de Kanso"
          className="aspect-[4/3]"
        />
      </div>
    </section>
  );
}
