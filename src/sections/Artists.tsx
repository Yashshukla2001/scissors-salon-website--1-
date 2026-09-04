import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { artists, type Artist } from "@/config/artists";
import { artistBookingLink } from "@/utils/whatsapp";

const HOLD_MS = 4000;
const COUNT = artists.length;

export default function Artists() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selected, setSelected] = useState<Artist | null>(null);
  const pausedRef = useRef(false);
  const activeIndexRef = useRef(0);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const interval = setInterval(() => {
      if (!pausedRef.current) {
        activeIndexRef.current = (activeIndexRef.current + 1) % COUNT;
        setActiveIndex(activeIndexRef.current);
      }
    }, HOLD_MS);
    return () => clearInterval(interval);
  }, []);

  // Belt-and-braces native scroll lock while the modal is open — the
  // modal's own scroll container is exempted from Lenis via
  // data-lenis-prevent, but this guards any other native scroll path.
  useEffect(() => {
    if (!selected) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [selected]);

  return (
    <section id="artists" className="relative bg-ivory text-charcoal py-24 sm:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-10">
        <div className="flex flex-col items-center text-center gap-4 mb-4">
          <span className="eyebrow text-wine">The People</span>
          <h2 className="font-display text-[clamp(2.2rem,5vw,4.2rem)] leading-[1.04]">
            Meet the artists behind every look.
          </h2>
        </div>

        {/* All four, always visible — the auto-carousel cycles which one is emphasised */}
        <div
          className="mt-14 sm:mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 items-end"
          onMouseEnter={() => (pausedRef.current = true)}
          onMouseLeave={() => (pausedRef.current = false)}
        >
          {artists.map((artist, i) => {
            const isActive = i === activeIndex;
            return (
              <button
                key={artist.id}
                onClick={() => setSelected(artist)}
                aria-label={`View ${artist.name}'s profile`}
                className="group relative rounded-[1.5rem] overflow-hidden shadow-xl transition-all duration-[900ms]"
                style={{
                  aspectRatio: "3 / 4",
                  transform: isActive ? "scale(1.06) translateY(-6px)" : "scale(0.92)",
                  opacity: isActive ? 1 : 0.6,
                  filter: isActive ? "blur(0px)" : "blur(0.5px)",
                  zIndex: isActive ? 10 : 1,
                  transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                  boxShadow: isActive ? "0 25px 50px rgba(0,0,0,0.28)" : "0 10px 20px rgba(0,0,0,0.12)",
                }}
              >
                <img
                  src={artist.image}
                  alt={artist.name}
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.06]"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/10 to-transparent transition-opacity duration-500"
                  style={{ opacity: isActive ? 1 : 0.75 }}
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 text-left">
                  <p
                    className="font-display leading-tight text-ivory transition-all duration-500"
                    style={{ fontSize: isActive ? "1.6rem" : "1.15rem" }}
                  >
                    {artist.name}
                  </p>
                  <p
                    className="eyebrow text-champagne-light mt-1 transition-opacity duration-500"
                    style={{ opacity: isActive ? 1 : 0.7, fontSize: isActive ? "0.62rem" : "0.55rem" }}
                  >
                    {artist.role}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center bg-charcoal/85 backdrop-blur-md p-0 sm:p-6"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full sm:max-w-2xl max-h-[90svh] overflow-hidden rounded-t-[2rem] sm:rounded-[2rem] bg-ivory text-charcoal"
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-charcoal/70 text-ivory flex items-center justify-center"
                aria-label="Close"
              >
                <X size={16} />
              </button>

              <div data-lenis-prevent className="max-h-[90svh] overflow-y-auto overscroll-contain scrollbar-hide">
                <div className="sm:grid sm:grid-cols-2">
                  <div className="h-64 sm:h-auto">
                    <img src={selected.image} alt={selected.name} className="w-full h-full object-cover object-top" />
                  </div>
                  <div className="p-6 sm:p-8 flex flex-col">
                    <span className="eyebrow text-wine">{selected.experience}</span>
                    <h3 className="font-display text-3xl mt-2">{selected.name}</h3>
                    <p className="font-display italic text-charcoal/60 mt-1">{selected.role}</p>
                    <p className="mt-4 text-charcoal/70 text-sm leading-relaxed">{selected.bio}</p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {selected.expertise.map((e) => (
                        <span key={e} className="text-xs font-sans font-medium bg-charcoal/5 rounded-full px-3 py-1.5">
                          {e}
                        </span>
                      ))}
                    </div>
                    <a
                      href={artistBookingLink(selected.name)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-7 inline-flex items-center justify-center rounded-full bg-charcoal text-ivory font-sans font-semibold px-6 py-3.5"
                    >
                      Book With {selected.name}
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
