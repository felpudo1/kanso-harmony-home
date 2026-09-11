import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Header } from "@/components/kanso/Header";
import { Hero } from "@/components/kanso/Hero";
import { ValueProps } from "@/components/kanso/ValueProps";
import { Services } from "@/components/kanso/Services";
import { Calculator, type CalculatorResult } from "@/components/kanso/Calculator";

import { Footer } from "@/components/kanso/Footer";
import { ContactModal, type ContactPrefill } from "@/components/kanso/ContactModal";

const TITLE = "Kanso — Organización & Confort en Montevideo";
const DESCRIPTION =
  "Organización profesional de hogares en Montevideo: placares, cocinas y mudanzas. Calculá tu presupuesto y pedí un diagnóstico gratuito.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [modalOpen, setModalOpen] = useState(false);
  const [prefill, setPrefill] = useState<ContactPrefill>();

  const openWithService = (service: string) => {
    setPrefill({ service });
    setModalOpen(true);
  };

  const openWithCalculator = (result: CalculatorResult) => {
    setPrefill(result);
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <ValueProps />
        <Services onRequest={openWithService} />
        <Calculator onRequestDiagnosis={openWithCalculator} />
      </main>
      <Footer />
      <ContactModal open={modalOpen} onOpenChange={setModalOpen} prefill={prefill} />
    </div>
  );
}
