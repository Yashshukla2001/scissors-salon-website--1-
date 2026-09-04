import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { salon } from "@/config/media";
import { businessInfo } from "@/config/business";
import { generalEnquiryLink } from "@/utils/whatsapp";
import MagneticButton from "./MagneticButton";

const LINKS = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Artists", href: "#artists" },
  { label: "Experience", href: "#experience" },
  { label: "Gallery", href: "#gallery" },
  { label: "Reviews", href: "#reviews" },
  { label: "Visit", href: "#visit" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50 flex justify-center px-4 sm:px-6 pt-4 sm:pt-5">
        <nav
          className={`w-full max-w-6xl flex items-center justify-between rounded-full px-4 sm:px-6 py-2.5 transition-all duration-500 ${
            scrolled
              ? "bg-charcoal/80 backdrop-blur-xl border border-champagne/20 shadow-[0_8px_30px_rgba(0,0,0,0.35)]"
              : "bg-white/5 backdrop-blur-md border border-white/10"
          }`}
        >
          <a href="#home" className="flex items-center gap-2.5 shrink-0">
            <img src={salon.logo} alt={businessInfo.name} className="h-9 w-9 sm:h-10 sm:w-10 object-contain" />
            <span className="flex flex-col leading-none">
              <span className="font-display text-lg sm:text-xl text-ivory tracking-tight">
                Scissor&rsquo;s
              </span>
              <span className="eyebrow text-champagne/70 text-[0.5rem] sm:text-[0.55rem] mt-0.5">
                Unisex Salon
              </span>
            </span>
          </a>

          <ul className="hidden lg:flex items-center gap-7 font-sans text-sm text-ivory/80">
            {LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="hover:text-champagne transition-colors duration-300">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <MagneticButton
              href={generalEnquiryLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center rounded-full bg-champagne text-charcoal font-sans font-semibold text-sm px-5 py-2.5 hover:bg-champagne-light transition-colors duration-300"
            >
              Book Now
            </MagneticButton>
            <button
              onClick={() => setOpen(true)}
              className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-full border border-white/15 text-ivory"
              aria-label="Open menu"
            >
              <Menu size={18} />
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-charcoal/98 backdrop-blur-xl flex flex-col"
          >
            <div className="flex items-center justify-between px-6 pt-5">
              <img src={salon.logo} alt={businessInfo.name} className="h-9 w-9 object-contain" />
              <button
                onClick={() => setOpen(false)}
                className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-white/15 text-ivory"
                aria-label="Close menu"
              >
                <X size={18} />
              </button>
            </div>
            <nav className="flex-1 flex flex-col items-start justify-center gap-2 px-8">
              {LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="font-display text-4xl text-ivory py-2 hover:text-champagne transition-colors"
                >
                  {link.label}
                </motion.a>
              ))}
              <a
                href={generalEnquiryLink()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="mt-6 inline-flex items-center rounded-full bg-champagne text-charcoal font-sans font-semibold px-6 py-3"
              >
                Book Now on WhatsApp
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
