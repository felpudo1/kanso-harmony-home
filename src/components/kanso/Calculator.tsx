import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  NEIGHBORHOODS,
  SCALES,
  SERVICES,
  SPACES,
  estimateBudget,
  formatPesos,
  type ScaleId,
  type ServiceId,
  type SpaceId,
} from "@/lib/kanso-data";

export interface CalculatorResult {
  service: string;
  neighborhood: string;
  details: string;
}

interface CalculatorProps {
  onRequestDiagnosis: (result: CalculatorResult) => void;
}

const STEPS = ["Servicio", "Espacios", "Detalles"];

export function Calculator({ onRequestDiagnosis }: CalculatorProps) {
  const [step, setStep] = useState(0);
  const [service, setService] = useState<ServiceId | null>(null);
  const [spaces, setSpaces] = useState<SpaceId[]>([]);
  const [scale, setScale] = useState<ScaleId | null>(null);
  const [neighborhood, setNeighborhood] = useState<string>("");

  const estimate = useMemo(
    () => (service && scale ? estimateBudget({ service, spaces, scale }) : null),
    [service, spaces, scale],
  );

  const canAdvance =
    (step === 0 && service !== null) ||
    (step === 1 && spaces.length > 0) ||
    (step === 2 && scale !== null && neighborhood !== "");

  const toggleSpace = (id: SpaceId) =>
    setSpaces((prev) => (prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]));

  const serviceName = SERVICES.find((s) => s.id === service)?.name ?? "";

  return (
    <section id="calculadora" className="section-y bg-sand/60">
      <div className="mx-auto max-w-4xl px-5">
        <h2 className="text-3xl font-semibold md:text-4xl">Calculadora de presupuesto</h2>
        <p className="mt-4 text-muted-foreground">
          Tres pasos para tener una referencia inmediata en pesos uruguayos.
        </p>

        <div className="mt-10 rounded-3xl border border-border bg-card p-6 shadow-lift md:p-9">
          <ol className="flex items-center gap-3 text-xs">
            {STEPS.map((label, index) => (
              <li key={label} className="flex flex-1 items-center gap-3">
                <span
                  className={cn(
                    "flex h-7 w-7 items-center justify-center rounded-full border text-[11px] font-semibold",
                    index <= step
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border text-muted-foreground",
                  )}
                >
                  {index + 1}
                </span>
                <span
                  className={cn(
                    "hidden sm:inline",
                    index <= step ? "text-foreground" : "text-muted-foreground",
                  )}
                >
                  {label}
                </span>
                {index < STEPS.length - 1 && <span className="h-px flex-1 bg-border" />}
              </li>
            ))}
          </ol>

          <div className="mt-8">
            {step === 0 && (
              <div className="grid gap-3">
                {SERVICES.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => setService(option.id)}
                    className={cn(
                      "rounded-2xl border p-5 text-left transition-colors",
                      service === option.id
                        ? "border-primary bg-accent"
                        : "border-border hover:bg-secondary",
                    )}
                  >
                    <span className="block font-semibold">{option.name}</span>
                    <span className="mt-1 block text-sm text-muted-foreground">{option.price}</span>
                  </button>
                ))}
              </div>
            )}

            {step === 1 && (
              <div className="grid gap-3 sm:grid-cols-2">
                {SPACES.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => toggleSpace(option.id)}
                    className={cn(
                      "rounded-2xl border p-5 text-left font-medium transition-colors",
                      spaces.includes(option.id)
                        ? "border-primary bg-accent"
                        : "border-border hover:bg-secondary",
                    )}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}

            {step === 2 && (
              <div className="space-y-7">
                <div>
                  <p className="text-sm font-medium">Escala estimada</p>
                  <div className="mt-3 grid gap-3 sm:grid-cols-3">
                    {SCALES.map((option) => (
                      <button
                        key={option.id}
                        onClick={() => setScale(option.id)}
                        className={cn(
                          "rounded-2xl border p-4 text-left transition-colors",
                          scale === option.id
                            ? "border-primary bg-accent"
                            : "border-border hover:bg-secondary",
                        )}
                      >
                        <span className="block font-semibold">{option.label}</span>
                        <span className="mt-1 block text-xs text-muted-foreground">
                          {option.hint}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label htmlFor="calc-barrio" className="text-sm font-medium">
                    Barrio en Montevideo
                  </label>
                  <select
                    id="calc-barrio"
                    value={neighborhood}
                    onChange={(e) => setNeighborhood(e.target.value)}
                    className="mt-3 h-11 w-full rounded-xl border border-input bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <option value="">Seleccioná tu barrio</option>
                    {NEIGHBORHOODS.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                {estimate && (
                  <div className="rounded-2xl bg-secondary p-6">
                    <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
                      Rango estimado
                    </p>
                    <p className="mt-2 text-2xl font-semibold md:text-3xl">
                      {formatPesos(estimate.min)} – {formatPesos(estimate.max)}
                    </p>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Estimación orientativa. El presupuesto final se confirma en el diagnóstico.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
            <Button
              variant="ghost"
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              disabled={step === 0}
            >
              <ArrowLeft className="h-4 w-4" /> Atrás
            </Button>

            {step < 2 ? (
              <Button onClick={() => setStep((s) => s + 1)} disabled={!canAdvance}>
                Continuar <ArrowRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button
                disabled={!canAdvance}
                onClick={() =>
                  onRequestDiagnosis({
                    service: serviceName,
                    neighborhood,
                    details: [
                      `Servicio: ${serviceName}`,
                      `Espacios: ${spaces
                        .map((id) => SPACES.find((s) => s.id === id)?.label)
                        .filter(Boolean)
                        .join(", ")}`,
                      `Escala: ${SCALES.find((s) => s.id === scale)?.label ?? ""}`,
                      estimate
                        ? `Rango estimado: ${formatPesos(estimate.min)} – ${formatPesos(estimate.max)}`
                        : "",
                    ]
                      .filter(Boolean)
                      .join("\n"),
                  })
                }
              >
                Solicitar Diagnóstico Gratuito
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
