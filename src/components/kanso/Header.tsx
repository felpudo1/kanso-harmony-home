import { Button } from "@/components/ui/button";

const scrollTo = (id: string) =>
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <a href="#inicio" className="leading-tight">
          <span className="block text-2xl font-semibold tracking-tight">Kanso</span>
          <span className="block text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            Organización & Confort
          </span>
        </a>

        <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
          <button className="transition-colors hover:text-foreground" onClick={() => scrollTo("servicios")}>
            Servicios
          </button>
          <button className="transition-colors hover:text-foreground" onClick={() => scrollTo("metodo")}>
            Método
          </button>
          <button className="transition-colors hover:text-foreground" onClick={() => scrollTo("calculadora")}>
            Calculadora
          </button>
        </nav>

        <Button size="sm" onClick={() => scrollTo("calculadora")}>
          Cotizar
        </Button>
      </div>
    </header>
  );
}
