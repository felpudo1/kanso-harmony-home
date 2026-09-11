import type { LeadInput } from "./validators";

/**
 * Punto único de envío de leads.
 * Preparado para Supabase: cuando la base esté habilitada, reemplazar el cuerpo
 * por un insert en la tabla `leads` (o una server function con validación).
 */
export async function submitLead(lead: LeadInput): Promise<{ ok: boolean; message: string }> {
  // Integración pendiente de base de datos.
  await new Promise((resolve) => setTimeout(resolve, 400));
  console.info("[Kanso] Lead capturado (pendiente de persistencia):", lead);
  return {
    ok: true,
    message: "Recibimos tu solicitud. Te contactamos a la brevedad por WhatsApp.",
  };
}
