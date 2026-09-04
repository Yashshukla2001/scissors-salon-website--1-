import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, Phone } from "lucide-react";
import { generalEnquiryLink } from "@/utils/whatsapp";
import { businessInfo } from "@/config/business";

export default function WhatsAppFloat() {
  const [showTip, setShowTip] = useState(false);

  useEffect(() => {
    // Contextual nudge once the visitor has scrolled a fair way in.
    const onScroll = () => {
      if (window.scrollY > window.innerHeight * 2.2) {
        setShowTip(true);
        window.removeEventListener("scroll", onScroll);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Auto-hide 20s after the tip actually appears — not 20s after page load,
  // which could hide it before it's even shown or cut its visible time short.
  useEffect(() => {
    if (!showTip) return;
    const timeout = setTimeout(() => setShowTip(false), 20000);
    return () => clearTimeout(timeout);
  }, [showTip]);

  return (
    <div className="fixed bottom-5 right-5 sm:bottom-7 sm:right-7 z-40 flex flex-col items-end gap-3">
      <AnimatePresence>
        {showTip && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="relative max-w-[200px] bg-ivory text-charcoal text-sm font-sans font-medium rounded-2xl rounded-br-sm px-4 py-3 shadow-xl"
          >
            Need help choosing a service? Chat with us →
            <button
              onClick={() => setShowTip(false)}
              className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-charcoal text-ivory text-xs flex items-center justify-center"
              aria-label="Dismiss"
            >
              ×
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <a
        href={`tel:+${businessInfo.whatsappNumber}`}
        aria-label="Call the salon"
        className="inline-flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-charcoal-2 text-champagne border border-champagne/40 shadow-[0_8px_20px_rgba(0,0,0,0.35)] hover:scale-105 hover:bg-charcoal transition-all duration-300"
      >
        <Phone size={18} strokeWidth={2} />
      </a>

      <a
        href={generalEnquiryLink()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="relative inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-champagne text-charcoal shadow-[0_10px_30px_rgba(200,160,92,0.4)] hover:scale-105 transition-transform duration-300"
      >
        <span className="absolute inset-0 rounded-full bg-champagne/60 animate-ping-slow" />
        <MessageCircle size={26} strokeWidth={2} className="relative" />
      </a>
    </div>
  );
}
