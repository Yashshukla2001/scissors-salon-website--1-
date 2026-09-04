import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, MessageCircle, ChevronDown } from "lucide-react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SectionHeading from "@/components/SectionHeading";
import { services, type Service } from "@/config/services";
import { talkToStylistLink } from "@/utils/whatsapp";

gsap.registerPlugin(ScrollTrigger);

// A static torn/perforated top edge — decorative only, never animated as a
// shape (morphing clip-path polygons is fragile across browsers; the punch-in
// motion below carries the animation instead).
const TORN_EDGE =
  "polygon(0% 6%,4% 1%,8% 7%,12% 2%,16% 6%,20% 1%,24% 7%,28% 2%,32% 6%,36% 1%,40% 7%,44% 2%,48% 6%,52% 1%,56% 7%,60% 2%,64% 6%,68% 1%,72% 7%,76% 2%,80% 6%,84% 1%,88% 7%,92% 2%,96% 6%,100% 1%,100% 100%,0% 100%)";

export default function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const ledgerRef = useRef<HTMLDivElement>(null);
  const ticketColRef = useRef<HTMLDivElement>(null);
  const numberRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const lineRefs = useRef<(SVGLineElement | null)[]>([]);
  const thumbRef = useRef<HTMLDivElement>(null);
  const moveThumb = useRef<{ x?: (v: number) => void; y?: (v: number) => void }>({});

  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mobileOpen, setMobileOpen] = useState<number | null>(null);
  const [detailService, setDetailService] = useState<Service | null>(null);

  // ---- Ledger entrance: each line's number fades in, then its ink underline draws itself ----
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      numberRefs.current.forEach((n) => gsap.set(n, { opacity: 1 }));
      lineRefs.current.forEach((l) => gsap.set(l, { strokeDashoffset: 0 }));
      return;
    }

    lineRefs.current.forEach((l) => l && l.setAttribute("stroke-dasharray", String(l.getTotalLength())));

    const ctx = gsap.context(() => {
      gsap.set(numberRefs.current, { opacity: 0 });
      gsap.set(lineRefs.current, {
        strokeDashoffset: (i) => lineRefs.current[i]?.getTotalLength() || 300,
      });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: ledgerRef.current, start: "top 82%", once: true },
      });
      services.forEach((_, i) => {
        tl.to(numberRefs.current[i], { opacity: 1, duration: 0.35 }, i * 0.16).to(
          lineRefs.current[i],
          { strokeDashoffset: 0, duration: 0.6, ease: "power2.inOut" },
          i * 0.16 + 0.1
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // ---- Gentle parallax: ledger + ticket drift upward at slightly different rates ----
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(ledgerRef.current, {
        yPercent: -3,
        ease: "none",
        scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: true },
      });
      gsap.to(ticketColRef.current, {
        yPercent: -6,
        ease: "none",
        scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: true },
      });

      // The open ticket files itself away as the section hands off to Transformation.
      gsap.to(ticketColRef.current, {
        y: 90,
        opacity: 0,
        ease: "power1.in",
        scrollTrigger: { trigger: sectionRef.current, start: "bottom 65%", end: "bottom top", scrub: true },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!thumbRef.current) return;
    moveThumb.current.x = gsap.quickTo(thumbRef.current, "x", { duration: 0.35, ease: "power3.out" });
    moveThumb.current.y = gsap.quickTo(thumbRef.current, "y", { duration: 0.35, ease: "power3.out" });
  }, []);

  function onLedgerMouseMove(e: React.MouseEvent) {
    moveThumb.current.x?.(e.clientX + 26);
    moveThumb.current.y?.(e.clientY - 70);
  }

  return (
    <section id="services" ref={sectionRef} className="relative bg-ivory text-charcoal py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-5 sm:px-10">
        <SectionHeading eyebrow="What We Do" title="Every service, entered in the ledger." tone="dark" />

        <div className="mt-16 grid lg:grid-cols-12 gap-x-12">
          {/* ---- The ledger ---- */}
          <div ref={ledgerRef} className="lg:col-span-7" onMouseMove={onLedgerMouseMove} onMouseLeave={() => setHoveredIndex(null)}>
            {services.map((s, i) => (
              <div key={s.id}>
                <button
                  onClick={() => {
                    setActiveIndex(i);
                    setMobileOpen(mobileOpen === i ? null : i);
                  }}
                  onMouseEnter={() => {
                    setActiveIndex(i);
                    setHoveredIndex(i);
                  }}
                  className="group w-full text-left py-5 sm:py-6 border-t border-charcoal/10 last:border-b flex items-start gap-4 sm:gap-6"
                >
                  <span
                    ref={(el) => {
                      numberRefs.current[i] = el;
                    }}
                    className="font-display text-sm text-charcoal/40 pt-2 w-6 shrink-0"
                  >
                    {s.index}
                  </span>
                  <div className="flex-1 min-w-0">
                    <span
                      className={`font-display text-2xl sm:text-4xl leading-tight transition-colors duration-300 ${
                        activeIndex === i ? "text-wine" : "text-charcoal"
                      } group-hover:text-wine`}
                    >
                      {s.name}
                    </span>
                    <svg viewBox="0 0 300 6" preserveAspectRatio="none" className="block w-full max-w-[280px] h-[6px] mt-1">
                      <line
                        ref={(el) => {
                          lineRefs.current[i] = el;
                        }}
                        x1="0"
                        y1="3"
                        x2="300"
                        y2="3"
                        stroke="#c8a05c"
                        strokeWidth="2"
                        className={`transition-opacity duration-300 ${
                          activeIndex === i ? "opacity-100" : "opacity-45 group-hover:opacity-90"
                        }`}
                      />
                    </svg>
                    <p className="font-sans text-sm text-charcoal/50 mt-1.5">{s.tagline}</p>
                  </div>
                </button>

                {/* Mobile: ticket expands inline, accordion-style */}
                <div className="lg:hidden">
                  <AnimatePresence initial={false}>
                    {mobileOpen === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="pb-7 pt-1">
                          <Ticket service={s} onExplore={() => setDetailService(s)} />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            ))}
          </div>

          {/* ---- Desktop: sticky issued ticket ---- */}
          <div ref={ticketColRef} className="hidden lg:block lg:col-span-5">
            <div className="sticky top-28">
              <AnimatePresence mode="wait">
                <motion.div
                  key={services[activeIndex].id}
                  initial={{ opacity: 0, x: 70, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 36, scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 260, damping: 22 }}
                >
                  <Ticket service={services[activeIndex]} onExplore={() => setDetailService(services[activeIndex])} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Ghost preview thumbnail, following the cursor while browsing the ledger (desktop only) */}
      <div
        ref={thumbRef}
        className="hidden lg:block fixed top-0 left-0 w-36 h-44 rounded-xl overflow-hidden shadow-2xl pointer-events-none z-40 transition-opacity duration-200"
        style={{ opacity: hoveredIndex !== null ? 1 : 0 }}
      >
        {hoveredIndex !== null && (
          <img src={services[hoveredIndex].image} alt="" className="w-full h-full object-cover" />
        )}
      </div>

      <ServiceDetailModal service={detailService} onClose={() => setDetailService(null)} />
    </section>
  );
}

function Ticket({ service, onExplore }: { service: Service; onExplore: () => void }) {
  return (
    <div
      className="relative bg-charcoal text-ivory shadow-[0_30px_60px_rgba(0,0,0,0.25)]"
      style={{ clipPath: TORN_EDGE }}
    >
      <div className="h-56 sm:h-64">
        <img src={service.image} alt={service.name} className="w-full h-full object-cover opacity-90" />
      </div>

      <div className="p-6 sm:p-7">
        <span className="font-display italic text-champagne-light text-lg">{service.tagline}</span>
        <p className="mt-3 text-ivory/75 text-sm leading-relaxed">{service.description}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {service.highlights.map((h) => (
            <span key={h} className="text-xs font-sans font-medium border border-ivory/25 rounded-full px-3 py-1">
              {h}
            </span>
          ))}
        </div>

        <div className="mt-6 border-t border-dashed border-ivory/20 pt-5">
          <button
            onClick={onExplore}
            className="w-full inline-flex items-center justify-center rotate-[-1.5deg] rounded-full border-2 border-champagne text-champagne font-sans font-bold text-xs uppercase tracking-wider px-5 py-3 hover:bg-champagne hover:text-charcoal transition-colors"
          >
            Explore {service.name.split(" ")[0]} &middot; See The Full Menu
          </button>
        </div>
      </div>
    </div>
  );
}

function ServiceDetailModal({ service, onClose }: { service: Service | null; onClose: () => void }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showHint, setShowHint] = useState(true);

  useEffect(() => {
    const el = scrollRef.current;
    if (!service || !el) return;

    function evaluate() {
      const el2 = scrollRef.current!;
      const hasMore = el2.scrollHeight - el2.scrollTop - el2.clientHeight > 16;
      setShowHint(hasMore);
    }
    evaluate();
    el.addEventListener("scroll", evaluate, { passive: true });
    return () => el.removeEventListener("scroll", evaluate);
  }, [service]);

  // A fixed overlay doesn't stop the page underneath from scrolling on its
  // own, so lock native body scroll while the modal is open. Lenis itself
  // is handled separately below via data-lenis-prevent on the scroll
  // container — that's the purpose-built exemption for nested scrollable
  // regions, and safer than globally stopping Lenis (which risks Lenis's
  // own wheel listener swallowing the event entirely via preventDefault,
  // blocking the popup's own scroll too).
  useEffect(() => {
    if (!service) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [service]);

  return (
    <AnimatePresence>
      {service && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[70] bg-charcoal/88 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-6"
        >
          {/* Non-scrolling frame — handles rounding/border/shadow only */}
          <motion.div
            initial={{ y: 60, opacity: 0, scale: 0.97 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 40, opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full sm:max-w-3xl max-h-[92svh] sm:max-h-[85svh] overflow-hidden rounded-t-[2rem] sm:rounded-[2rem] border border-champagne/25 shadow-[0_40px_90px_rgba(0,0,0,0.5)]"
          >
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute top-4 right-4 z-20 -rotate-[10deg] w-10 h-10 rounded-full border-2 border-champagne/70 bg-charcoal/80 backdrop-blur-sm text-champagne flex items-center justify-center hover:bg-charcoal transition-colors"
            >
              <X size={16} />
            </button>

            {/* Scroll container — deliberately separate from the grid inside it, so
                CSS Grid's implicit min-height can never fight max-height/overflow. */}
            <div
              ref={scrollRef}
              data-lenis-prevent
              className="max-h-[92svh] sm:max-h-[85svh] overflow-y-auto overscroll-contain scrollbar-hide"
            >
              <div className="sm:grid sm:grid-cols-2 bg-ivory text-charcoal">
                <div className="relative h-64 sm:h-auto">
                  <img src={service.image} alt={service.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/50 sm:bg-gradient-to-r sm:from-transparent to-transparent" />
                </div>

                <div className="relative p-7 sm:p-9 flex flex-col bg-noise">
                  <span className="eyebrow text-wine">The Full Story</span>
                  <h3 className="font-display text-3xl sm:text-[2.6rem] mt-2 leading-[1.05] max-w-[80%]">
                    {service.name}
                  </h3>
                  <div className="hairline w-20 text-champagne mt-3" />
                  <p className="font-display italic text-charcoal/60 mt-3 text-lg">{service.tagline}</p>
                  <p className="mt-4 text-charcoal/70 text-sm leading-relaxed">{service.description}</p>

                  <div className="mt-7 border-t border-dashed border-charcoal/15 pt-6">
                    <span className="eyebrow text-charcoal/40">The Full Menu</span>
                    <ul className="mt-3.5 grid grid-cols-2 gap-x-4 gap-y-3">
                      {service.subServices.map((sub) => (
                        <li key={sub} className="flex items-start gap-2 text-sm text-charcoal/80 leading-snug">
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-wine shrink-0" />
                          {sub}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <a
                    href={talkToStylistLink(service.name)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative mt-8 inline-flex items-center justify-center gap-2.5 rounded-full bg-charcoal text-ivory font-sans font-semibold px-7 py-3.5 overflow-hidden hover:text-charcoal transition-colors duration-300"
                  >
                    <span className="absolute inset-0 bg-champagne scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 -z-0" />
                    <MessageCircle size={17} className="relative z-10" />
                    <span className="relative z-10">Talk To Our Stylist</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Scroll hint — fades out once there's nothing left to reveal */}
            <div
              className="absolute bottom-0 inset-x-0 h-14 flex items-end justify-center pb-2 pointer-events-none bg-gradient-to-t from-ivory to-transparent transition-opacity duration-300"
              style={{ opacity: showHint ? 1 : 0 }}
              aria-hidden="true"
            >
              <span className="flex flex-col items-center gap-0.5 text-charcoal/40 animate-bounce">
                <ChevronDown size={16} />
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
