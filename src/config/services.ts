import { salon, stockPhoto } from "./media";

export type Service = {
  id: string;
  index: string;
  name: string;
  tagline: string;
  description: string;
  highlights: string[];
  subServices: string[];
  image: string;
};

// Sourced from the real Scissor's Salon tariff card. Individual prices are
// intentionally not shown on the site (a deliberate earlier design choice
// to keep the premium feel and route exact quotes — which vary by hair
// length/condition on most of these — through a WhatsApp consultation).
// The real price list is available if that decision should be revisited.
export const services: Service[] = [
  {
    id: "hair-cut-style",
    index: "01",
    name: "Haircut & Styling",
    tagline: "Precision. Shape. Personality.",
    description:
      "A cut is a decision, not a trim. Our stylists read your face, your hair's natural fall and your everyday routine before a single blade moves — so the shape still works on day thirty, not just day one.",
    highlights: ["Consultation included", "Precision cutting", "Blow-dry finish"],
    subServices: [
      "Haircut (Women, Men & Kids)",
      "Blow Dry",
      "Ironing & Crimping",
      "Hot Rollers & Curls",
      "Beard Trim & Styling",
      "Occasion Hair Styling",
    ],
    image: salon.gallery.chairsRow,
  },
  {
    id: "hair-colour",
    index: "02",
    name: "Hair Colour",
    tagline: "Not just colour. A new expression.",
    description:
      "Global colour, highlights, root touch-ups or a full fashion transformation — including ammonia-free options — colour-matched to your skin tone so it stays rich long after you leave the chair.",
    highlights: ["Ammonia-free available", "Global & fashion tones", "Highlights & cap colouring"],
    subServices: [
      "Global Colour",
      "Highlighting & Striking",
      "Root Touch-Up",
      "Ammonia-Free Colour",
      "Fashion Colour",
      "Cap Highlighting",
    ],
    image: stockPhoto.hairColorProcess,
  },
  {
    id: "hair-spa-treatments",
    index: "03",
    name: "Hair Spa & Treatments",
    tagline: "Repair, from the root.",
    description:
      "Deep-conditioning rituals built around your hair's actual condition — from a L'Oréal or Wella spa to Keratin, Botox and straightening or perming treatments for longer-lasting results.",
    highlights: ["Keratin & Botox treatment", "L'Oréal & Wella spa", "Straightening & perming"],
    subServices: [
      "Keratin Hair Spa",
      "L'Oréal Hair Fall Spa",
      "Wella Hair Spa",
      "Hair Botox / Kerasmooth / Elastin",
      "Hair Straightening",
      "Hair Perming",
    ],
    image: salon.gallery.backwash,
  },
  {
    id: "facials-skin",
    index: "04",
    name: "Facials & Skin",
    tagline: "Make your face your beauty spot.",
    description:
      "From a quick cleanup to gold, diamond and O3+ facials with polishing, plus acne, hydra and tan-removal treatments — matched to your skin type, not a one-size routine.",
    highlights: ["Cleanups to advanced facials", "Gold, diamond & O3+", "Tan removal & polishing"],
    subServices: [
      "Cleanup (Aloevera, Charcoal, O3+ & more)",
      "Mini & Advance Facial",
      "Gold / Diamond / O3+ Facial & Polishing",
      "Hydra Facial",
      "Acne Treatment",
      "Tan Removal",
    ],
    image: stockPhoto.facialSpa,
  },
  {
    id: "threading-waxing-nails",
    index: "05",
    name: "Threading, Waxing & Nails",
    tagline: "The finishing details.",
    description:
      "Threading and waxing in your choice of aloevera, chocolate, honey or oil/cream formulas, plus manicures, pedicures and nail art for that last-detail polish.",
    highlights: ["Threading & full-body waxing", "Manicure & pedicure", "Nail art & extensions"],
    subServices: [
      "Threading (Brow, Face & More)",
      "Waxing (Full Hand To Full Body)",
      "Manicure & Pedicure",
      "Nail Art",
      "Nail Extensions",
      "Hair Extensions",
    ],
    image: stockPhoto.facialTreatment,
  },
  {
    id: "bridal-groom",
    index: "06",
    name: "Bridal & Groom Packages",
    tagline: "Your biggest day, done right.",
    description:
      "A complete pre-wedding package for both bride and groom — facials, polishing, global colour, hair spa, manicure-pedicure and makeup — bundled so nothing gets left out before the big day.",
    highlights: ["Complete bride package", "Complete groom package", "Trial available on request"],
    subServices: [
      "Pre-Bridal Cleanup, D-Tan & Facial",
      "Body Waxing & Polishing",
      "Global Hair Colour",
      "Manicure & Pedicure",
      "Hair Spa & Styling",
      "Bridal / Groom Makeup",
    ],
    image: stockPhoto.bridalPortrait,
  },
];
