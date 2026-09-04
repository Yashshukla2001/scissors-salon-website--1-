import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Star, X } from "lucide-react";
import { InstagramGlyph } from "@/components/icons";
import { businessInfo } from "@/config/business";

export default function EngagementPopup() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 9000);
    return () => clearTimeout(timer);
  }, []);

  function dismiss() {
    setVisible(false);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.96 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed z-50 bottom-40 left-5 right-5 sm:left-auto sm:right-7 sm:bottom-44 sm:w-[360px]"
          role="dialog"
          aria-label="Follow and review Scissor's"
        >
          <div className="relative bg-ivory text-charcoal rounded-3xl p-6 shadow-[0_30px_60px_rgba(0,0,0,0.5)] border border-champagne/30 bg-noise">
            <button
              onClick={dismiss}
              aria-label="Close"
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-charcoal/5 hover:bg-charcoal/10 flex items-center justify-center transition-colors"
            >
              <X size={16} />
            </button>

            <span className="eyebrow text-wine">Loved Your Visit?</span>
            <h3 className="font-display text-2xl mt-1.5 mb-4 leading-tight">
              Tell the world — it takes ten seconds.
            </h3>

            <div className="flex flex-col gap-2.5">
              <a
                href={businessInfo.social.googleReviews}
                target="_blank"
                rel="noopener noreferrer"
                onClick={dismiss}
                className="flex items-center gap-3 rounded-xl bg-charcoal text-ivory px-4 py-3 hover:bg-ink transition-colors"
              >
                <Star size={18} className="text-champagne shrink-0" fill="currentColor" />
                <span className="font-sans text-sm font-semibold">Leave us a Google Review</span>
              </a>
              <a
                href={businessInfo.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                onClick={dismiss}
                className="flex items-center gap-3 rounded-xl border border-charcoal/15 px-4 py-3 hover:bg-charcoal/5 transition-colors"
              >
                <InstagramGlyph size={18} className="text-wine shrink-0" />
                <span className="font-sans text-sm font-semibold">Follow us on Instagram</span>
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
