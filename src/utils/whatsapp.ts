import { businessInfo } from "@/config/business";

/**
 * WHATSAPP UTILITY
 * ----------------------------------------------------------------
 * Every WhatsApp CTA on the site should call one of these functions
 * rather than building its own link. That keeps the message format
 * consistent and the phone number centralized in business.ts.
 */

const WA_BASE = `https://wa.me/${businessInfo.whatsappNumber}`;

function buildLink(lines: (string | undefined)[]): string {
  const message = lines.filter(Boolean).join("\n");
  return `${WA_BASE}?text=${encodeURIComponent(message)}`;
}

/** General "just say hi" enquiry — used by the floating button default state. */
export function generalEnquiryLink(): string {
  return buildLink([
    `Hi ${businessInfo.name} 👋`,
    "I have a question about your services.",
  ]);
}

/** A visitor tapping "book this service" from a service card. */
export function serviceEnquiryLink(serviceName: string): string {
  return buildLink([
    `Hi ${businessInfo.name} 👋`,
    "I'd like to know more about a service.",
    "",
    `Service: ${serviceName}`,
    "",
    "Please share availability and pricing.",
  ]);
}

/** "Talk to our stylist" — a lighter-touch consultation ask from the service detail popup. */
export function talkToStylistLink(serviceName: string, subService?: string): string {
  return buildLink([
    `Hi ${businessInfo.name} 👋`,
    "I'd like to talk to a stylist before booking.",
    "",
    `Service: ${serviceName}`,
    subService ? `Interested in: ${subService}` : undefined,
    "",
    "Could someone help me understand what's right for me?",
  ]);
}

/** Booking a specific artist directly from their profile. */
export function artistBookingLink(artistName: string, serviceName?: string): string {
  return buildLink([
    `Hi ${businessInfo.name} 👋`,
    "I'd like to book an appointment.",
    "",
    serviceName ? `Service: ${serviceName}` : undefined,
    `Preferred Artist: ${artistName}`,
    "",
    "Please help me confirm my appointment.",
  ]);
}

export type ContactFormDetails = {
  name?: string;
  phone?: string;
  message?: string;
};

/** The Visit Us section's small contact form — routes through WhatsApp like everything else. */
export function contactFormLink(details: ContactFormDetails): string {
  return buildLink([
    `Hi ${businessInfo.name} 👋`,
    "I'd like to get in touch.",
    "",
    details.name ? `Name: ${details.name}` : undefined,
    details.phone ? `Phone: ${details.phone}` : undefined,
    details.message ? `Message: ${details.message}` : undefined,
  ]);
}

export type BookingDetails = {
  service?: string;
  artist?: string;
  date?: string;
  time?: string;
  name?: string;
  phone?: string;
  notes?: string;
};

/** Full multi-step booking flow submission. */
export function fullBookingLink(details: BookingDetails): string {
  return buildLink([
    `Hi ${businessInfo.name} 👋`,
    "I would like to book an appointment.",
    "",
    details.name ? `Name: ${details.name}` : undefined,
    details.service ? `Service: ${details.service}` : undefined,
    `Artist: ${details.artist || "No preference"}`,
    details.date ? `Preferred Date: ${details.date}` : undefined,
    details.time ? `Preferred Time: ${details.time}` : undefined,
    details.phone ? `Phone: ${details.phone}` : undefined,
    details.notes ? `Notes: ${details.notes}` : undefined,
    "",
    "Please let me know about availability and confirm my appointment.",
  ]);
}
