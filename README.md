# Kanso Home Harmony

Build a modern, high-converting, and elegant web application for "Kanso - Organización & Confort", a professional home organization service based in Montevideo, Uruguay.

Design & Aesthetics:
- Vibe: Minimalist, soothing, high-end, clean, and warm.
- Color Palette: Soft warm grays, sand/beige tones, slate text, and muted sage green accents.
- Typography: Clean sans-serif (e.g., Inter or Plus Jakarta Sans).

Key Sections & Components:

1. HERO SECTION:
   - Brand Name: "Kanso - Organización & Confort"
   - Slogan: "El arte de organizar para vivir mejor."
   - Subtitle: "Transformamos espacios saturados en lugares funcionales. Te devolvemos la armonía en tu hogar y tiempo para disfrutar de lo valioso de la vida."
   - CTAs: Primary button "Cotizar Servicio Express" (scrolls to calculator), Secondary button "Ver Servicios".
   - Visual: Interactive Before/After image comparison slider (e.g., cluttered closet vs. perfectly organized space).

2. VALUE PROPOSITION & ETHICS (Trust Section):
   - Highlight our key differentiators:
     * 100% Confidentiality & Respect: Non-judgmental approach to home organization.
     * Safety & Ergonomics: Standardized protocols for lifting, high-level placement, and risk prevention.
     * Sustainability: Active commitment to donating items consciously and using eco-friendly supplies.

3. SERVICES SECTION (Grid of Cards):
   - Card 1: "Home Orden Express"
     * Description: Focused organization for specific spaces (closets, walk-in closets, kitchens, pantries, bathrooms).
     * Pricing: Flexible hourly rate of $U 1.500 to $U 1.800 per hour per organizer.
   - Card 2: "Mudanza Integral"
     * Description: Full packing, unpacking, categorizing, and efficient spatial setup for stress-free moves.
     * Pricing: Custom project estimate ranging from $U 8.500 to $U 15.000 per workday.
   - Card 3: "Asesoría y Planificación Personalizada"
     * Description: Tailored storage system design, small-space optimization, and habit coaching for the family.
     * Pricing: Custom quote based on client requirements.

4. INTERACTIVE COST CALCULATOR (Wizard / Step Form):
   - Create an intuitive 3-step interactive wizard:
     * Step 1 (Service Type): Home Orden Express, Mudanza Integral, or Asesoría.
     * Step 2 (Spaces to Intervene): Multi-select options (Placard / Vestidor, Cocina / Despensa, Baño, Escritorio, Mudanza Completa).
     * Step 3 (Details & Location): Select estimated scale (Small, Medium, Large) and Neighborhood in Montevideo (e.g., Parque Batlle, Pocitos, Carrasco, Punta Carretas, Malvín).
   - Dynamic Result Output: Display an estimated budget range in Uruguayan Pesos ($U) based on selection.
   - CTA at the end: "Solicitar Diagnóstico Gratuito" which opens the contact modal with pre-filled calculator data.

5. SAFETY & OCCUPATIONAL HEALTH HIGHLIGHT (Footer Note / Section):
   - Brief badge or section showing our compliance with occupational risk prevention (physical, ergonomic, and chemical safety standards) to demonstrate professionalism.

6. CONTACT & LEAD CAPTURE (Modal & Form):
   - Fields: Full Name, Phone / WhatsApp, Email, Selected Service, Neighborhood, Additional Details.
   - Pre-configured submit button ready to store leads into Supabase.

7. FOOTER:
   - Location: Base in Parque Batlle, Montevideo (serving the metropolitan area).
   - Legal info: Formalized business under Uruguayan regulations (BPS, DGI, BSE).
   - Social links: WhatsApp Business & Instagram links.

Technical Requirements:
- Fully responsive (mobile-first approach).
- Form validation for Uruguayan phone numbers.
- Clean component architecture prepared for integration with Supabase (@supabase/supabase-js).

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://kanso-harmony-home.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/f330b62e-6284-46d6-af9b-10ca6d587e76).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
