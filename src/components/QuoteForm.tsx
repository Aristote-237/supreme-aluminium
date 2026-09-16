import { useState, type ChangeEvent, type FormEvent } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { buildMailtoQuoteUrl, buildWhatsappQuoteUrl, type QuoteRequestData } from "../utils/whatsapp";

type FormErrors = Partial<Record<keyof QuoteRequestData, string>>;
type SubmitStatus = "idle" | "loading" | "success" | "error";

const PROJECT_TYPES = [
  "Portes aluminium",
  "Fenêtres aluminium",
  "Baies vitrées",
  "Balcons & garde-corps",
  "Plafonds",
  "Murs rideaux",
  "Vitrerie générale",
  "Travaux en inox",
  "Autre / sur mesure",
];

const INITIAL_FORM: QuoteRequestData = {
  fullName: "",
  phone: "",
  email: "",
  projectType: "",
  city: "",
  description: "",
};

function validate(data: QuoteRequestData): FormErrors {
  const errors: FormErrors = {};
  if (!data.fullName.trim()) errors.fullName = "Votre nom complet est requis.";
  if (!data.phone.trim()) {
    errors.phone = "Un numéro de téléphone est requis.";
  } else if (!/^[0-9+\s]{8,}$/.test(data.phone.trim())) {
    errors.phone = "Entrez un numéro de téléphone valide.";
  }
  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
    errors.email = "Entrez une adresse email valide.";
  }
  if (!data.projectType) errors.projectType = "Sélectionnez le type de projet.";
  if (!data.city.trim()) errors.city = "La ville ou localisation est requise.";
  if (!data.description.trim()) errors.description = "Décrivez brièvement votre projet.";
  return errors;
}

export function QuoteForm() {
  const [formData, setFormData] = useState<QuoteRequestData>(INITIAL_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<SubmitStatus>("idle");

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors = validate(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      setStatus("error");
      return;
    }

    setStatus("loading");
    try {
      const whatsappUrl = buildWhatsappQuoteUrl(formData);
      const mailtoUrl = buildMailtoQuoteUrl(formData);

      // Open both channels: WhatsApp in a new tab, email client in the current one.
      window.open(whatsappUrl, "_blank", "noopener,noreferrer");
      window.location.href = mailtoUrl;

      setStatus("success");
      setFormData(INITIAL_FORM);
    } catch {
      setStatus("error");
    }
  };

  const inputStyle = {
    background: "var(--bg)",
    borderColor: "var(--border)",
    color: "var(--text)",
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="fullName" className="text-xs font-semibold tracking-wide" style={{ color: "var(--text-faint)" }}>
            NOM COMPLET
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            value={formData.fullName}
            onChange={handleChange}
            className="mt-2 w-full rounded-xl border px-4 py-3 text-sm outline-none focus:ring-2"
            style={{ ...inputStyle, ["--tw-ring-color" as string]: "var(--gold)" }}
            aria-invalid={Boolean(errors.fullName)}
            aria-describedby={errors.fullName ? "fullName-error" : undefined}
          />
          {errors.fullName && <p id="fullName-error" className="mt-1.5 text-xs text-red-400">{errors.fullName}</p>}
        </div>

        <div>
          <label htmlFor="phone" className="text-xs font-semibold tracking-wide" style={{ color: "var(--text-faint)" }}>
            TÉLÉPHONE
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            placeholder="6XX XX XX XX"
            className="mt-2 w-full rounded-xl border px-4 py-3 text-sm outline-none focus:ring-2"
            style={inputStyle}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "phone-error" : undefined}
          />
          {errors.phone && <p id="phone-error" className="mt-1.5 text-xs text-red-400">{errors.phone}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="email" className="text-xs font-semibold tracking-wide" style={{ color: "var(--text-faint)" }}>
            EMAIL (FACULTATIF)
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-2 w-full rounded-xl border px-4 py-3 text-sm outline-none focus:ring-2"
            style={inputStyle}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          {errors.email && <p id="email-error" className="mt-1.5 text-xs text-red-400">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="city" className="text-xs font-semibold tracking-wide" style={{ color: "var(--text-faint)" }}>
            VILLE / LOCALISATION
          </label>
          <input
            id="city"
            name="city"
            type="text"
            value={formData.city}
            onChange={handleChange}
            placeholder="Douala, Yaoundé…"
            className="mt-2 w-full rounded-xl border px-4 py-3 text-sm outline-none focus:ring-2"
            style={inputStyle}
            aria-invalid={Boolean(errors.city)}
            aria-describedby={errors.city ? "city-error" : undefined}
          />
          {errors.city && <p id="city-error" className="mt-1.5 text-xs text-red-400">{errors.city}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="projectType" className="text-xs font-semibold tracking-wide" style={{ color: "var(--text-faint)" }}>
          TYPE DE PROJET
        </label>
        <select
          id="projectType"
          name="projectType"
          value={formData.projectType}
          onChange={handleChange}
          className="mt-2 w-full rounded-xl border px-4 py-3 text-sm outline-none focus:ring-2"
          style={inputStyle}
          aria-invalid={Boolean(errors.projectType)}
          aria-describedby={errors.projectType ? "projectType-error" : undefined}
        >
          <option value="">Sélectionnez un type de projet</option>
          {PROJECT_TYPES.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
        {errors.projectType && <p id="projectType-error" className="mt-1.5 text-xs text-red-400">{errors.projectType}</p>}
      </div>

      <div>
        <label htmlFor="description" className="text-xs font-semibold tracking-wide" style={{ color: "var(--text-faint)" }}>
          DESCRIPTION DU PROJET
        </label>
        <textarea
          id="description"
          name="description"
          rows={4}
          value={formData.description}
          onChange={handleChange}
          placeholder="Décrivez votre projet : dimensions, matériaux souhaités, délais…"
          className="mt-2 w-full resize-none rounded-xl border px-4 py-3 text-sm outline-none focus:ring-2"
          style={inputStyle}
          aria-invalid={Boolean(errors.description)}
          aria-describedby={errors.description ? "description-error" : undefined}
        />
        {errors.description && <p id="description-error" className="mt-1.5 text-xs text-red-400">{errors.description}</p>}
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold tracking-wide transition-transform duration-300 hover:scale-[1.01] disabled:opacity-70 sm:w-auto"
        style={{ background: "var(--gold)", color: "var(--blue-deep)" }}
      >
        {status === "loading" ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Envoi en cours…
          </>
        ) : (
          <>
            <Send size={16} />
            Envoyer ma demande
          </>
        )}
      </button>

      {status === "success" && (
        <p className="flex items-center gap-2 text-sm" style={{ color: "var(--gold)" }}>
          <CheckCircle2 size={16} />
          Votre demande a été préparée — finalisez son envoi depuis WhatsApp ou votre application email.
        </p>
      )}
      {status === "error" && Object.keys(errors).length > 0 && (
        <p className="text-sm text-red-400">Veuillez corriger les champs signalés ci-dessus.</p>
      )}
    </form>
  );
}
