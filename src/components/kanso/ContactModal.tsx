import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { NEIGHBORHOODS, SERVICES } from "@/lib/kanso-data";
import { leadSchema } from "@/lib/validators";
import { submitLead } from "@/lib/leads";

export interface ContactPrefill {
  service?: string;
  neighborhood?: string;
  details?: string;
}

interface ContactModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  prefill?: ContactPrefill | undefined;
}

const emptyForm = {
  fullName: "",
  phone: "",
  email: "",
  service: "",
  neighborhood: "",
  details: "",
};

export function ContactModal({ open, onOpenChange, prefill }: ContactModalProps) {
  const [form, setForm] = useState(emptyForm);
  type FieldKey = keyof typeof emptyForm;
  const [errors, setErrors] = useState<Partial<Record<FieldKey, string>>>({});
  const [sending, setSending] = useState(false);

  useEffect(() => {
    if (!open) return;
    setErrors({});
    setForm((prev) => ({
      ...prev,
      service: prefill?.service ?? prev.service,
      neighborhood: prefill?.neighborhood ?? prev.neighborhood,
      details: prefill?.details ?? prev.details,
    }));
  }, [open, prefill]);

  const setField = (key: keyof typeof emptyForm) => (value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const parsed = leadSchema.safeParse(form);

    if (!parsed.success) {
      const nextErrors: Partial<Record<FieldKey, string>> = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as FieldKey;
        if (key && !nextErrors[key]) nextErrors[key] = issue.message;
      }
      setErrors(nextErrors);
      return;
    }

    setErrors({});
    setSending(true);
    const result = await submitLead(parsed.data);
    setSending(false);

    if (result.ok) {
      toast.success(result.message);
      setForm(emptyForm);
      onOpenChange(false);
    } else {
      toast.error(result.message);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[92vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Solicitar diagnóstico gratuito</DialogTitle>
          <DialogDescription>
            Dejanos tus datos y coordinamos una visita o videollamada sin costo.
          </DialogDescription>
        </DialogHeader>

        <form className="space-y-4" onSubmit={handleSubmit} noValidate>
          <div className="space-y-2">
            <Label htmlFor="fullName">Nombre completo</Label>
            <Input
              id="fullName"
              value={form.fullName}
              maxLength={100}
              onChange={(e) => setField("fullName")(e.target.value)}
            />
            {errors.fullName && <p className="text-xs text-destructive">{errors.fullName}</p>}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="phone">Teléfono / WhatsApp</Label>
              <Input
                id="phone"
                inputMode="tel"
                placeholder="099 123 456"
                value={form.phone}
                onChange={(e) => setField("phone")(e.target.value)}
              />
              {errors.phone && <p className="text-xs text-destructive">{errors.phone}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={form.email}
                onChange={(e) => setField("email")(e.target.value)}
              />
              {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="service">Servicio</Label>
            <select
              id="service"
              value={form.service}
              onChange={(e) => setField("service")(e.target.value)}
              className="h-10 w-full rounded-xl border border-input bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <option value="">Seleccioná un servicio</option>
              {SERVICES.map((option) => (
                <option key={option.id} value={option.name}>
                  {option.name}
                </option>
              ))}
            </select>
            {errors.service && <p className="text-xs text-destructive">{errors.service}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="neighborhood">Barrio</Label>
            <select
              id="neighborhood"
              value={form.neighborhood}
              onChange={(e) => setField("neighborhood")(e.target.value)}
              className="h-10 w-full rounded-xl border border-input bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <option value="">Seleccioná tu barrio</option>
              {NEIGHBORHOODS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {errors.neighborhood && (
              <p className="text-xs text-destructive">{errors.neighborhood}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="details">Detalles adicionales</Label>
            <Textarea
              id="details"
              rows={4}
              maxLength={1000}
              value={form.details}
              onChange={(e) => setField("details")(e.target.value)}
            />
            {errors.details && <p className="text-xs text-destructive">{errors.details}</p>}
          </div>

          <Button type="submit" className="w-full" disabled={sending}>
            {sending ? "Enviando..." : "Enviar solicitud"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
