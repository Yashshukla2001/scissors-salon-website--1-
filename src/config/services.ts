/**
 * SERVICES & PRICING
 * ----------------------------------------------------------------
 * Transcribed directly from the salon's printed tariff card. Prices
 * marked "onwards" (note: "onwards") vary with hair length/condition —
 * the WhatsApp booking message always says "starting from" for those.
 */

export type ServiceItem = {
  name: string;
  /** Simple single price, e.g. "₹350". Omit if using `prices` instead. */
  price?: string;
  /** For dual-tier pricing (waxing formula, manicure vs pedicure, bride/groom package tiers). */
  prices?: { label: string; price: string }[];
};

export type ServiceCategory = {
  id: string;
  name: string;
  /** Shown as a small badge next to the category name, e.g. "Onwards", "45 Min". */
  note?: string;
  items: ServiceItem[];
};

export type AudienceGroup = {
  id: string;
  label: string;
  categories: ServiceCategory[];
};

export const serviceMenu: AudienceGroup[] = [
  {
    id: "women",
    label: "For Women",
    categories: [
      {
        id: "women-hair",
        name: "Hair",
        items: [
          { name: "Shampoo", price: "₹50" },
          { name: "Conditioner", price: "₹50" },
          { name: "Junior Haircut (Below 7yr)", price: "₹250" },
          { name: "Haircut", price: "₹350" },
          { name: "Split End Cut", price: "₹400" },
        ],
      },
      {
        id: "women-hairstyle",
        name: "Hairstyle",
        note: "Onwards",
        items: [
          { name: "Blow Dry", price: "₹250" },
          { name: "Ironing", price: "₹600" },
          { name: "Crimping", price: "₹500" },
          { name: "Hot Rollers", price: "₹500" },
          { name: "Hot Curls", price: "₹500" },
          { name: "Hair Style", price: "₹500" },
        ],
      },
      {
        id: "women-hair-color",
        name: "Hair Color",
        note: "Onwards",
        items: [
          { name: "Highlighting / Striking", price: "₹200" },
          { name: "Global Touch-Up", price: "₹700" },
          { name: "Ammonia Free Touch-Up", price: "₹800" },
          { name: "Global Natural", price: "₹3000" },
          { name: "Global Fashion", price: "₹3500" },
          { name: "Ammonia Free Global", price: "₹4500" },
        ],
      },
      {
        id: "women-hair-spa",
        name: "Hair Spa Treatment",
        note: "Onwards",
        items: [
          { name: "Head Massage", price: "₹400" },
          { name: "L'Oréal Hair Fall Spa", price: "₹700" },
          { name: "Ampoule Anti-Dandruff", price: "₹200" },
          { name: "Wella Hair Spa", price: "₹900" },
          { name: "Keratin Spa", price: "₹1200" },
          { name: "Matrix", price: "₹700" },
        ],
      },
      {
        id: "women-straightening",
        name: "Hair Straightening",
        note: "Onwards",
        items: [
          { name: "Short To Medium", price: "₹4000" },
          { name: "Medium To Long", price: "₹5000" },
          { name: "Very Long", price: "₹6000" },
        ],
      },
      {
        id: "women-hair-treatment",
        name: "Hair Treatment",
        note: "Onwards",
        items: [
          { name: "Keratin", price: "₹4000" },
          { name: "Botox", price: "₹5000" },
          { name: "Kerasmooth", price: "₹6000" },
          { name: "Elastin", price: "₹6000" },
        ],
      },
      {
        id: "women-perming",
        name: "Hair Perming",
        note: "Onwards",
        items: [
          { name: "Short To Medium", price: "₹4000" },
          { name: "Medium To Long", price: "₹5000" },
          { name: "Very Long", price: "₹6000" },
        ],
      },
      {
        id: "women-threading",
        name: "Threading",
        items: [
          { name: "Eye Brow", price: "₹30" },
          { name: "Upper Lip", price: "₹20" },
          { name: "Chin", price: "₹20" },
          { name: "Fore Head", price: "₹20" },
          { name: "Jawline", price: "₹20" },
          { name: "Full Face", price: "₹200" },
        ],
      },
      {
        id: "women-waxing",
        name: "Waxing",
        note: "Aloevera/Choco/Honey · Oil/Cream/Brazilian",
        items: [
          { name: "Upper Lip", prices: [{ label: "Aloevera/Choco/Honey", price: "₹50" }, { label: "Oil/Cream/Brazilian", price: "₹100" }] },
          { name: "Chin", prices: [{ label: "Aloevera/Choco/Honey", price: "₹50" }, { label: "Oil/Cream/Brazilian", price: "₹100" }] },
          { name: "Under Arm", prices: [{ label: "Aloevera/Choco/Honey", price: "₹100" }, { label: "Oil/Cream/Brazilian", price: "₹200" }] },
          { name: "Full Hand", prices: [{ label: "Aloevera/Choco/Honey", price: "₹200" }, { label: "Oil/Cream/Brazilian", price: "₹500" }] },
          { name: "Half Leg", prices: [{ label: "Aloevera/Choco/Honey", price: "₹250" }, { label: "Oil/Cream/Brazilian", price: "₹500" }] },
          { name: "Full Leg", prices: [{ label: "Aloevera/Choco/Honey", price: "₹500" }, { label: "Oil/Cream/Brazilian", price: "₹1000" }] },
          { name: "Full Face", prices: [{ label: "Aloevera/Choco/Honey", price: "₹600" }, { label: "Oil/Cream/Brazilian", price: "₹500" }] },
          { name: "Tummy", prices: [{ label: "Aloevera/Choco/Honey", price: "₹250" }, { label: "Oil/Cream/Brazilian", price: "₹500" }] },
          { name: "Front", prices: [{ label: "Aloevera/Choco/Honey", price: "₹500" }, { label: "Oil/Cream/Brazilian", price: "₹500" }] },
          { name: "Half Back", prices: [{ label: "Aloevera/Choco/Honey", price: "₹250" }, { label: "Oil/Cream/Brazilian", price: "₹500" }] },
          { name: "Full Back", prices: [{ label: "Aloevera/Choco/Honey", price: "₹500" }, { label: "Oil/Cream/Brazilian", price: "₹1000" }] },
          { name: "Full Body", prices: [{ label: "Aloevera/Choco/Honey", price: "₹2000" }, { label: "Oil/Cream/Brazilian", price: "₹4000" }] },
        ],
      },
      {
        id: "women-makeup",
        name: "Makeup",
        items: [
          { name: "Regular Makeup", price: "₹1500" },
          { name: "Party Makeup", price: "₹3000" },
        ],
      },
      {
        id: "women-nail-art",
        name: "Nail Art",
        items: [
          { name: "Nail Art", price: "₹1000" },
          { name: "Temporary Extension", price: "₹1500" },
          { name: "Permanent Extension", price: "₹2000" },
        ],
      },
      {
        id: "women-hair-extension",
        name: "Hair Extension",
        items: [
          { name: "Single Hair Strips", price: "₹300" },
          { name: "Complete Hair Extension", price: "₹20000" },
        ],
      },
    ],
  },
  {
    id: "men",
    label: "For Men",
    categories: [
      {
        id: "men-hair",
        name: "Hair",
        items: [
          { name: "Shampoo", price: "₹50" },
          { name: "Conditioner", price: "₹50" },
          { name: "Beard Trim (Shave)", price: "₹70" },
          { name: "Junior Haircut (Below 7yr)", price: "₹100" },
          { name: "Beard Styling", price: "₹100" },
          { name: "Hair Style Set", price: "₹100" },
          { name: "Haircut", price: "₹150" },
        ],
      },
      {
        id: "men-hair-color",
        name: "Hair Color",
        note: "Onwards",
        items: [
          { name: "Highlighting Strips", price: "₹100" },
          { name: "Global Natural", price: "₹450" },
          { name: "Global Fashion", price: "₹500" },
          { name: "Ammonia Free Global", price: "₹700" },
          { name: "Cap Highlighting", price: "₹500" },
        ],
      },
      {
        id: "men-hair-spa",
        name: "Hair Spa Treatment",
        note: "Onwards",
        items: [
          { name: "Head Massage", price: "₹300" },
          { name: "Hair Spa Smoothening", price: "₹200" },
          { name: "L'Oréal Hair Fall Spa", price: "₹300" },
          { name: "Wella Hair Spa", price: "₹400" },
          { name: "Hair Spa Scalp", price: "₹450" },
          { name: "Hair Spa Deep Nourishing", price: "₹400" },
          { name: "Keratin Hair Spa", price: "₹500" },
        ],
      },
      {
        id: "men-hair-treatment",
        name: "Hair Treatment",
        note: "Onwards",
        items: [
          { name: "Keratin", price: "₹2000" },
          { name: "Botox", price: "₹2500" },
          { name: "Kerasmooth", price: "₹3000" },
          { name: "Elastin", price: "₹3000" },
        ],
      },
      {
        id: "men-threading",
        name: "Threading",
        items: [
          { name: "Eye Brow", price: "₹30" },
          { name: "Fore Head", price: "₹20" },
        ],
      },
      {
        id: "men-waxing",
        name: "Waxing",
        note: "Aloevera/Choco/Honey · Oil/Cream/Brazilian",
        items: [
          { name: "Full Hand", prices: [{ label: "Aloevera/Choco/Honey", price: "₹300" }, { label: "Oil/Cream/Brazilian", price: "₹600" }] },
          { name: "Half Leg", prices: [{ label: "Aloevera/Choco/Honey", price: "₹400" }, { label: "Oil/Cream/Brazilian", price: "₹800" }] },
          { name: "Full Leg", prices: [{ label: "Aloevera/Choco/Honey", price: "₹800" }, { label: "Oil/Cream/Brazilian", price: "₹1500" }] },
          { name: "Chest", prices: [{ label: "Aloevera/Choco/Honey", price: "₹700" }, { label: "Oil/Cream/Brazilian", price: "₹1400" }] },
          { name: "Back", prices: [{ label: "Aloevera/Choco/Honey", price: "₹700" }, { label: "Oil/Cream/Brazilian", price: "₹1400" }] },
          { name: "Full Body", prices: [{ label: "Aloevera/Choco/Honey", price: "₹2500" }, { label: "Oil/Cream/Brazilian", price: "₹4500" }] },
        ],
      },
      {
        id: "men-makeup",
        name: "Makeup",
        items: [
          { name: "Regular Makeup", price: "₹1000" },
          { name: "Model Makeup", price: "₹1000" },
        ],
      },
      {
        id: "men-hair-extension",
        name: "Hair Extension",
        items: [{ name: "Hair Patch", price: "₹12000" }],
      },
    ],
  },
  {
    id: "unisex",
    label: "Unisex",
    categories: [
      {
        id: "unisex-cleanup",
        name: "Cleanup",
        note: "35 Min",
        items: [
          { name: "Aloevera Clean-Up", price: "₹350" },
          { name: "VLCC Clean-Up", price: "₹400" },
          { name: "Fruit Clean-Up", price: "₹400" },
          { name: "Charcoal Clean-Up", price: "₹450" },
          { name: "Lotus Clean-Up", price: "₹550" },
          { name: "O3+ Clean-Up", price: "₹1200" },
        ],
      },
      {
        id: "unisex-mini-facial",
        name: "Mini Facial",
        note: "45 Min",
        items: [
          { name: "Honey Facial", price: "₹500" },
          { name: "Mini Gold Facial", price: "₹550" },
          { name: "Lotus Cleansing Facial", price: "₹600" },
          { name: "Fruit Facial", price: "₹650" },
          { name: "Diamond Facial", price: "₹700" },
          { name: "Aloevera Facial", price: "₹750" },
          { name: "O3+ Facial", price: "₹1500" },
        ],
      },
      {
        id: "unisex-advance-facial",
        name: "Advance Facial",
        note: "60 Min",
        items: [
          { name: "Derma Facial", price: "₹800" },
          { name: "Raga Facial", price: "₹800" },
          { name: "Fruit Facial", price: "₹850" },
          { name: "Charcoal Facial", price: "₹900" },
          { name: "Skin Whitening Facial", price: "₹950" },
        ],
      },
      {
        id: "unisex-metallic",
        name: "Metallic (Facial + Polishing)",
        note: "75 Min",
        items: [
          { name: "Gold Facial + Polishing", price: "₹1000" },
          { name: "Casmara Facial + Polishing", price: "₹1000" },
          { name: "Diamond Facial + Polishing", price: "₹1000" },
          { name: "Pearl Facial + Polishing", price: "₹1100" },
          { name: "Cheryl's Facial + Polishing", price: "₹1300" },
          { name: "Dermatologic Facial + Polishing", price: "₹1500" },
          { name: "Lotus Facial + Polishing", price: "₹1500" },
          { name: "Aroma Facial + Polishing", price: "₹1500" },
          { name: "Shehnaz Facial + Polishing", price: "₹2000" },
          { name: "Raga Facial + Polishing", price: "₹2000" },
          { name: "O3+ Facial + Polishing", price: "₹2500" },
        ],
      },
      {
        id: "unisex-treatment",
        name: "Treatment",
        items: [
          { name: "Acne Treatment", price: "₹800" },
          { name: "Hydra Facial", price: "₹3000" },
          { name: "Korean Treatment", price: "₹2000" },
        ],
      },
      {
        id: "unisex-tan-remove",
        name: "Tan Remove Treatment",
        note: "Bleaching / D-Tan / Polishing",
        items: [
          { name: "Upper Lip", price: "₹50" },
          { name: "Chin", price: "₹50" },
          { name: "Under Arm", price: "₹100" },
          { name: "Feet", price: "₹100" },
          { name: "Neck", price: "₹100" },
          { name: "Full Face", price: "₹400" },
          { name: "Full Hand", price: "₹400" },
          { name: "Half Leg", price: "₹400" },
          { name: "Full Leg", price: "₹800" },
          { name: "Tummy", price: "₹250" },
          { name: "Front", price: "₹500" },
          { name: "Half Back", price: "₹250" },
          { name: "Full Back", price: "₹500" },
          { name: "Full Body", price: "₹2500" },
        ],
      },
      {
        id: "unisex-mani-pedi",
        name: "Manicure & Pedicure",
        items: [
          { name: "Regular (Men)", prices: [{ label: "Manicure", price: "₹450" }, { label: "Pedicure", price: "₹700" }] },
          { name: "Regular (Women)", prices: [{ label: "Manicure", price: "₹400" }, { label: "Pedicure", price: "₹600" }] },
          { name: "Raga (Women + Men)", prices: [{ label: "Manicure", price: "₹500" }, { label: "Pedicure", price: "₹1000" }] },
          { name: "Pediclam (Women + Men)", prices: [{ label: "Manicure", price: "₹500" }, { label: "Pedicure", price: "₹1500" }] },
          { name: "O3+ (Women + Men)", prices: [{ label: "Manicure", price: "₹500" }, { label: "Pedicure", price: "₹1000" }] },
        ],
      },
    ],
  },
  {
    id: "bridal",
    label: "Bride & Groom",
    categories: [
      {
        id: "bride-package",
        name: "Bride Package",
        note: "Two tiers — see options",
        items: [
          { name: "Cleanup, D-Tan / HydraFacial", prices: [{ label: "Option A", price: "₹700" }, { label: "Option B", price: "₹3000" }] },
          { name: "Gold Facial, D-Tan / HydraFacial", prices: [{ label: "Option A", price: "₹1000" }, { label: "Option B", price: "₹3000" }] },
          { name: "Casmara Facial, Polishing / HydraFacial", prices: [{ label: "Option A", price: "₹1500" }, { label: "Option B", price: "₹3000" }] },
          { name: "O3+ Facial, Polishing", prices: [{ label: "Option A", price: "₹2500" }, { label: "Option B", price: "₹3000" }] },
          { name: "Body Waxing / Oil Waxing", prices: [{ label: "Option A", price: "₹2500" }, { label: "Option B", price: "₹4000" }] },
          { name: "Body Polishing", price: "₹2500" },
          { name: "Global Color", price: "₹2500" },
          { name: "Manicure, Pedicure", price: "₹1000" },
          { name: "Threading", price: "₹70" },
          { name: "Haircut, Shampoo, Conditioner", price: "₹400" },
          { name: "Hair Spa", price: "₹1000" },
          { name: "Makeup", price: "₹7000" },
          { name: "Bride Package Total", prices: [{ label: "Option A Total", price: "₹22,670" }, { label: "Option B Total", price: "₹30,470" }] },
        ],
      },
      {
        id: "groom-package",
        name: "Groom Package",
        note: "Two tiers — see options",
        items: [
          { name: "Cleanup, D-Tan / HydraFacial", prices: [{ label: "Option A", price: "₹700" }, { label: "Option B", price: "₹3000" }] },
          { name: "Gold Facial, D-Tan / HydraFacial", prices: [{ label: "Option A", price: "₹1000" }, { label: "Option B", price: "₹3000" }] },
          { name: "Casmara Facial, Polishing / HydraFacial", prices: [{ label: "Option A", price: "₹1500" }, { label: "Option B", price: "₹3000" }] },
          { name: "O3+ Facial, Polishing", prices: [{ label: "Option A", price: "₹2500" }, { label: "Option B", price: "₹3000" }] },
          { name: "Body Polishing", price: "₹2500" },
          { name: "Hair Color", price: "₹450" },
          { name: "Manicure, Pedicure", price: "₹1100" },
          { name: "Shaving (4)", price: "₹200" },
          { name: "Haircut, Shampoo, Conditioner", price: "₹300" },
          { name: "Hair Spa", price: "₹450" },
          { name: "Makeup", price: "₹1500" },
          { name: "Groom Package Total", prices: [{ label: "Option A Total", price: "₹12,200" }, { label: "Option B Total", price: "₹18,500" }] },
        ],
      },
    ],
  },
];