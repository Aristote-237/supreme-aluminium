import { company } from "../data/company";

export interface QuoteRequestData {
  fullName: string;
  phone: string;
  email?: string;
  projectType: string;
  city: string;
  description: string;
}

function buildQuoteMessage(data: QuoteRequestData): string {
  const lines = [
    `Bonjour ${company.name},`,
    "",
    "Je souhaite demander un devis.",
    "",
    `Nom : ${data.fullName}`,
    `Téléphone : ${data.phone}`,
    `Type de projet : ${data.projectType}`,
    `Localisation : ${data.city}`,
    `Description : ${data.description}`,
    "",
    "Merci.",
  ];
  return lines.join("\n");
}

export function buildWhatsappQuoteUrl(data: QuoteRequestData): string {
  const message = buildQuoteMessage(data);
  return `https://wa.me/${company.whatsappNumberIntl}?text=${encodeURIComponent(message)}`;
}

export function buildMailtoQuoteUrl(data: QuoteRequestData): string {
  const subject = `Demande de devis — ${data.projectType || "Projet"}`;
  const body = buildQuoteMessage(data);
  return `mailto:${company.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function buildWhatsappGenericUrl(prefilledText: string): string {
  return `https://wa.me/${company.whatsappNumberIntl}?text=${encodeURIComponent(prefilledText)}`;
}
