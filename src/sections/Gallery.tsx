import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SectionHeading from "@/components/SectionHeading";
import { galleryImages } from "@/config/content";

gsap.registerPlugin(ScrollTrigger);

export default function Gallery() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const frameRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // ---- Entrance: frames develop from desaturated to full colour, row by row ----
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const section = sectionRef.current;
    if (!section) return;

    if (prefersReduced) {
      gsap.set(frameRefs.current, { opacity: 1, y: 0, filter: "grayscale(0) brightness(1)" });
      return;
    }

    gsap.set(frameRefs.current, { opacity: 0, y: 22, filter: "grayscale(0.7) brightness(0.7)" });

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top 78%",
      once: true,
      onEnter: () => {
        gsap.to(frameRefs.current, {
          opacity: 1,
          y: 0,
          filter: "grayscale(0) brightness(1)",
          duration: 0.7,
          ease: "power2.out",
          stagger: 0.06,
        });
      },
    });

    // Gentle parallax — the wall drifts slightly slower than the page around it.
    gsap.to(gridRef.current, {
      yPercent: -3,
      ease: "none",
      scrollTrigger: { trigger: section, start: "top bottom", end: "bottom top", scrub: true },
    });

    return () => trigger.kill();
  }, []);

  function onFrameClick(i: number) {
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (canHover) {
      setLightboxIndex(i);
      return;
    }
    // Mobile: first tap develops the print, a second tap on the same frame opens it.
    if (activeIndex === i) {
      setLightboxIndex(i);
    } else {
      setActiveIndex(i);
    }
  }

  function showLightbox(delta: number) {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + delta + galleryImages.length) % galleryImages.length);
  }

  // Keyboard navigation (arrows + Escape) — promised for the lightbox, wire it up.
  useEffect(() => {
    if (lightboxIndex === null) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setLightboxIndex(null);
      else if (e.key === "ArrowLeft") showLightbox(-1);
      else if (e.key === "ArrowRight") showLightbox(1);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lightboxIndex]);

  // Lock the page behind the lightbox from scrolling while it's open.
  useEffect(() => {
    if (lightboxIndex === null) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [lightboxIndex]);

  // Touch-swipe navigation for mobile.
  const touchStartX = useRef<number | null>(null);
  function onLightboxTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
  }
  function onLightboxTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (delta > 50) showLightbox(-1);
    else if (delta < -50) showLightbox(1);
    touchStartX.current = null;
  }

  return (
    <section id="gallery" ref={sectionRef} className="relative bg-ivory text-charcoal py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-5 sm:px-10">
        <SectionHeading eyebrow="Inside The Studio" title="A closer look at Scissor's, Dewas." tone="dark" />

        {/* The light table */}
        <div className="relative mt-14 rounded-[2rem] bg-charcoal px-4 sm:px-8 pt-5 pb-6 overflow-hidden">
          <SprocketRow />

          <div
            ref={gridRef}
            onMouseLeave={() => setActiveIndex(null)}
            className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3.5 pt-4"
          >
            {galleryImages.map((img, i) => {
              const isActive = activeIndex === i;
              const dimmed = activeIndex !== null && !isActive;
              return (
                <div
                  key={img.id}
                  ref={(el) => {
                    frameRefs.current[i] = el;
                  }}
                  onMouseEnter={() => setActiveIndex(i)}
                  className="relative aspect-square transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  style={{
                    transform: isActive ? "scale(1.12)" : "scale(1)",
                    zIndex: isActive ? 20 : 1,
                  }}
                >
                  <button
                    onClick={() => onFrameClick(i)}
                    className="relative block w-full h-full border-2 border-ivory/90 bg-charcoal-2 overflow-hidden shadow-lg"
                  >
                    <img
                      src={img.src}
                      alt={img.caption}
                      loading="lazy"
                      className="w-full h-full object-cover transition-opacity duration-500"
                      style={{ opacity: dimmed ? 0.55 : 1 }}
                    />
                    <span className="absolute bottom-1 right-1.5 font-display text-[0.6rem] text-ivory/70 bg-charcoal/50 rounded px-1">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {/* Light-flare sweep on develop */}
                    {isActive && (
                      <motion.span
                        initial={{ x: "-120%", opacity: 0 }}
                        animate={{ x: "120%", opacity: [0, 0.55, 0] }}
                        transition={{ duration: 0.7, ease: "easeInOut" }}
                        className="absolute inset-y-0 w-1/3 pointer-events-none"
                        style={{
                          background:
                            "linear-gradient(100deg, transparent, rgba(255,241,214,0.8), transparent)",
                        }}
                      />
                    )}
                  </button>
                </div>
              );
            })}
          </div>

          <SprocketRow bottom />
        </div>
      </div>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] bg-charcoal/95 backdrop-blur-lg flex items-center justify-center p-4 sm:p-10"
            onClick={() => setLightboxIndex(null)}
            onTouchStart={onLightboxTouchStart}
            onTouchEnd={onLightboxTouchEnd}
          >
            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 text-ivory flex items-center justify-center"
              aria-label="Close"
            >
              <X size={18} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                showLightbox(-1);
              }}
              className="absolute left-3 sm:left-8 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 text-ivory flex items-center justify-center"
              aria-label="Previous"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                showLightbox(1);
              }}
              className="absolute right-3 sm:right-8 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 text-ivory flex items-center justify-center"
              aria-label="Next"
            >
              <ChevronRight size={20} />
            </button>

            <motion.figure
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-3xl max-h-[80svh]"
            >
              <img
                src={galleryImages[lightboxIndex].src}
                alt={galleryImages[lightboxIndex].caption}
                className="max-h-[75svh] w-auto mx-auto rounded-xl object-contain"
              />
              <figcaption className="text-center text-ivory/60 font-sans text-sm mt-4">
                {galleryImages[lightboxIndex].caption}
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function SprocketRow({ bottom = false }: { bottom?: boolean }) {
  return (
    <div className={`flex items-center justify-between ${bottom ? "mt-4" : ""}`} aria-hidden="true">
      {Array.from({ length: 28 }).map((_, i) => (
        <span key={i} className="w-1 h-1 rounded-full bg-champagne/30 shrink-0" />
      ))}
    </div>
  );
}
