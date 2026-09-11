import { z } from "zod";

/**
 * Valida celulares/teléfonos uruguayos.
 * Acepta: 099123456, 09 123 456, +598 99 123 456, 24001234 (fijo Montevideo).
 */
export const URUGUAY_PHONE_REGEX = /^(?:\+?598)?0?(?:9\d{7}|[2-4]\d{7})$/;

export const normalizePhone = (value: string) => value.replace(/[\s()-]/g, "");

export const uruguayPhoneSchema = z
  .string()
  .trim()
  .min(1, { message: "Ingresá tu teléfono o WhatsApp" })
  .transform(normalizePhone)
  .refine((value) => URUGUAY_PHONE_REGEX.test(value), {
    message: "Teléfono uruguayo inválido (ej: 099 123 456)",
  });

export const leadSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, { message: "Ingresá tu nombre completo" })
    .max(100, { message: "Máximo 100 caracteres" }),
  phone: uruguayPhoneSchema,
  email: z
    .string()
    .trim()
    .email({ message: "Email inválido" })
    .max(255, { message: "Máximo 255 caracteres" }),
  service: z.string().trim().min(1, { message: "Elegí un servicio" }),
  neighborhood: z.string().trim().min(1, { message: "Elegí tu barrio" }),
  details: z.string().trim().max(1000, { message: "Máximo 1000 caracteres" }).optional(),
});

export type LeadInput = z.infer<typeof leadSchema>;
