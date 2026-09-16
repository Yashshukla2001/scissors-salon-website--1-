import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { WhatsAppGlyph } from "@/components/icons";
import { serviceMenu } from "@/config/services";
import { serviceItemBookingLink } from "@/utils/whatsapp";

export default function Services() {
  const [audienceId, setAudienceId] = useState(serviceMenu[0].id);
  const audience = serviceMenu.find((a) => a.id === audienceId) ?? serviceMenu[0];

  const [categoryId, setCategoryId] = useState(audience.categories[0].id);
  const category = audience.categories.find((c) => c.id === categoryId) ?? audience.categories[0];

  // Reset to the first category whenever the audience changes.
  useEffect(() => {
    setCategoryId(audience.categories[0].id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [audienceId]);

  return (
    <section id="services" className="relative bg-ivory text-charcoal py-24 sm:py-32">
      <div className="max-w-3xl mx-auto px-5 sm:px-10">
        <SectionHeading eyebrow="Our Menu" title="Every service, one tap to book." tone="dark" align="center" />

        {/* Audience selector */}
        <div className="flex flex-wrap justify-center gap-2.5 mt-10">
          {serviceMenu.map((a) => (
            <button
              key={a.id}
              onClick={() => setAudienceId(a.id)}
              className={`rounded-full px-5 py-2.5 font-sans font-semibold text-sm transition-colors duration-200 ${
                a.id === audienceId
                  ? "bg-charcoal text-ivory"
                  : "bg-white border border-charcoal/15 text-charcoal/60 hover:border-charcoal/40"
              }`}
            >
              {a.label}
            </button>
          ))}
        </div>

        {/* Category dropdown */}
        <div className="relative mt-6 max-w-sm mx-auto">
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="field-select appearance-none pr-10 font-display text-base"
          >
            {audience.categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
          <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-charcoal/40" />
        </div>

        {/* Selected category's items */}
        <AnimatePresence mode="wait">
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 rounded-2xl border border-charcoal/10 bg-white shadow-[0_15px_35px_rgba(0,0,0,0.06)] overflow-hidden"
          >
            {category.note && (
              <div className="px-5 sm:px-7 py-3 border-b border-charcoal/10 bg-ivory-2">
                <span className="eyebrow text-wine/70 text-[0.62rem]">{category.note}</span>
              </div>
            )}
            <ul>
              {category.items.map((item) => (
                <li
                  key={item.name}
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5 px-5 sm:px-7 py-4 border-b border-charcoal/8 last:border-b-0"
                >
                  <span className="font-sans text-sm sm:text-base text-charcoal/85">{item.name}</span>

                  {item.price && (
                    <a
                      href={serviceItemBookingLink(category.name, item.name, item.price)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 shrink-0 rounded-full bg-champagne text-charcoal font-sans font-semibold text-sm px-4 py-2 hover:bg-champagne-light transition-colors self-start sm:self-auto"
                    >
                      <WhatsAppGlyph size={14} />
                      {item.price}
                    </a>
                  )}

                  {item.prices && (
                    <div className="flex flex-wrap gap-2">
                      {item.prices.map((tier) => (
                        <a
                          key={tier.label}
                          href={serviceItemBookingLink(category.name, `${item.name} (${tier.label})`, tier.price)}
                          target="_blank"
                          rel="noopener noreferrer"
                          title={tier.label}
                          className="inline-flex items-center gap-1.5 shrink-0 rounded-full bg-champagne text-charcoal font-sans font-semibold text-xs sm:text-sm px-3.5 py-2 hover:bg-champagne-light transition-colors"
                        >
                          <WhatsAppGlyph size={12} />
                          {tier.price}
                          <span className="text-charcoal/50 font-normal hidden sm:inline">· {tier.label}</span>
                        </a>
                      ))}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>

        <p className="text-center text-charcoal/40 font-sans text-xs mt-5">
          Tap any price to book that service directly on WhatsApp.
        </p>
      </div>
    </section>
  );
}