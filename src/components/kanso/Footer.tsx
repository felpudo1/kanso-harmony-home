import { Instagram, MessageCircle } from "lucide-react";

export const WHATSAPP_URL = "https://wa.me/59899123456";
export const INSTAGRAM_URL = "https://instagram.com/kanso.uy";

export function Footer() {
  return (
    <footer className="border-t border-border bg-sand/70">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-3">
        <div>
          <p className="text-lg font-semibold">Kanso</p>
          <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            Organización & Confort
          </p>
          <p className="mt-4 text-sm text-muted-foreground">
            Base en Parque Batlle, Montevideo. Trabajamos en Montevideo y área metropolitana.
          </p>
        </div>

        <div className="text-sm text-muted-foreground">
          <p className="font-semibold text-foreground">Empresa formalizada</p>
          <p className="mt-3">
            Actividad registrada según normativa uruguaya: BPS, DGI y seguro de accidentes laborales
            BSE.
          </p>
        </div>

        <div className="text-sm">
          <p className="font-semibold">Contacto</p>
          <div className="mt-3 flex flex-col gap-2">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
            >
              <MessageCircle className="h-4 w-4" /> WhatsApp Business
            </a>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
            >
              <Instagram className="h-4 w-4" /> Instagram
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-border/70 py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Kanso — Organización & Confort. Montevideo, Uruguay.
      </div>
    </footer>
  );
}
