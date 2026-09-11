/** Datos de negocio de Kanso: servicios, barrios y parámetros del cálculo. */

export const SERVICES = [
  {
    id: "express",
    name: "Home Orden Express",
    description:
      "Organización focalizada en espacios puntuales: placares, vestidores, cocinas, despensas y baños.",
    price: "$U 1.500 a $U 1.800 por hora, por organizadora",
    features: [
      "Clasificación y descarte consciente",
      "Sistemas de contención a medida",
      "Resultado visible en una jornada",
    ],
  },
  {
    id: "mudanza",
    name: "Mudanza Integral",
    description:
      "Embalaje, desembalaje, categorización y armado espacial eficiente para mudanzas sin estrés.",
    price: "Proyecto a medida: $U 8.500 a $U 15.000 por jornada",
    features: [
      "Embalaje protegido y rotulado",
      "Desarme y armado por ambiente",
      "Casa funcional desde el día uno",
    ],
  },
  {
    id: "asesoria",
    name: "Asesoría y Planificación Personalizada",
    description:
      "Diseño de sistemas de guardado, optimización de espacios reducidos y acompañamiento de hábitos en familia.",
    price: "Presupuesto según requerimiento",
    features: [
      "Diagnóstico y plan por etapas",
      "Propuesta de mobiliario y contenedores",
      "Coaching de hábitos sostenibles",
    ],
  },
] as const;

export const SPACES = [
  { id: "placard", label: "Placard / Vestidor" },
  { id: "cocina", label: "Cocina / Despensa" },
  { id: "bano", label: "Baño" },
  { id: "escritorio", label: "Escritorio" },
  { id: "mudanza", label: "Mudanza completa" },
] as const;

export const SCALES = [
  { id: "chica", label: "Chica", hint: "1 ambiente puntual", factor: 1 },
  { id: "media", label: "Media", hint: "Varios ambientes", factor: 1.6 },
  { id: "grande", label: "Grande", hint: "Casa completa", factor: 2.4 },
] as const;

export const NEIGHBORHOODS = [
  "Parque Batlle",
  "Pocitos",
  "Carrasco",
  "Punta Carretas",
  "Malvín",
  "Buceo",
  "Cordón",
  "Prado",
  "Ciudad de la Costa",
  "Otro",
] as const;

export type ServiceId = (typeof SERVICES)[number]["id"];
export type SpaceId = (typeof SPACES)[number]["id"];
export type ScaleId = (typeof SCALES)[number]["id"];

/** Estimación de rango presupuestal en pesos uruguayos. */
export function estimateBudget(input: {
  service: ServiceId;
  spaces: SpaceId[];
  scale: ScaleId;
}): { min: number; max: number } | null {
  const scale = SCALES.find((s) => s.id === input.scale);
  if (!scale) return null;

  const spaceCount = Math.max(input.spaces.length, 1);

  if (input.service === "mudanza") {
    const days = Math.max(1, Math.round(scale.factor * 1.2));
    return { min: 8500 * days, max: 15000 * days };
  }

  if (input.service === "asesoria") {
    return { min: Math.round(6000 * scale.factor), max: Math.round(11000 * scale.factor) };
  }

  const hours = Math.round(4 * scale.factor + (spaceCount - 1) * 2);
  return { min: 1500 * hours, max: 1800 * hours };
}

export const formatPesos = (value: number) =>
  `$U ${value.toLocaleString("es-UY", { maximumFractionDigits: 0 })}`;
