/**
 * BUSINESS CONFIG
 * ----------------------------------------------------------------
 * Every real-world fact about Scissor's lives here. Replace values
 * in this single file to update the whole site — no hunting through
 * components required.
 *
 * Fields marked TODO are placeholders and must be replaced with the
 * real value before launch (we never invent a real URL/handle).
 */

export const businessInfo = {
  name: "Scissor's",
  fullName: "Scissor's — The Unisex Salon",
  tagline: "Style That Defines You",
  foundedYear: 2009,

  // Used to auto-calculate "years of experience" everywhere so the
  // number is never stale. See utils/time.ts
  get yearsOfExperience() {
    return new Date().getFullYear() - this.foundedYear;
  },

  // Real number, confirmed by the client.
  whatsappNumber: "919826738198",

  // TODO: confirm exact salon address
  address: {
    line1: "Scissor's — The Unisex Salon",
    line2: "Dewas, Madhya Pradesh",
    city: "Dewas",
    state: "Madhya Pradesh",
    country: "India",
  },

  // TODO: confirm real opening hours
  hours: [
    { days: "Monday — Saturday", time: "10:00 AM – 8:30 PM" },
    { days: "Sunday", time: "10:00 AM – 6:00 PM" },
  ],

  // Real handle, confirmed from the salon's printed tariff card.
  social: {
    instagram: "https://instagram.com/scissors_salon5",
    googleReviews: "https://www.google.com/maps", // TODO: add real Google Business review link
    whatsappGroup: "https://wa.me/", // TODO: add real WhatsApp community invite link
    facebook: "",
  },

  // Trust-strip stats — kept realistic and editable, not invented as verified fact.
  stats: [
    { value: businessYears(), label: "Years Of Craft" },
    { value: "4", label: "Expert Artists" },
    { value: "20+", label: "Signature Services" },
    { value: "1", label: "Studio In Dewas" },
  ],
};

function businessYears() {
  return String(new Date().getFullYear() - 2009) + "+";
}

export type BusinessInfo = typeof businessInfo;
