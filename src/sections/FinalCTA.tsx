import Reveal from "@/components/Reveal";
import MagneticButton from "@/components/MagneticButton";
import { stockVideo } from "@/config/media";
import { generalEnquiryLink } from "@/utils/whatsapp";

export default function FinalCTA() {
  return (
    <section id="contact" className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover">
        <source src={stockVideo.makeupMirror} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal via-charcoal/80 to-charcoal" />

      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center flex flex-col items-center py-28">
        <span className="eyebrow text-champagne">Ready When You Are</span>
        <Reveal delay={0.08}>
          <h2 className="font-display text-[clamp(2.6rem,7vw,5.5rem)] leading-[1.02] mt-5 text-balance">
            Ready for your next look?
          </h2>
        </Reveal>
        <Reveal delay={0.18}>
          <p className="mt-6 text-ivory/70 font-sans text-lg max-w-md">
            One message is all it takes. Tell us what you're after and we'll
            confirm your appointment on WhatsApp.
          </p>
        </Reveal>
        <Reveal delay={0.28} className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <MagneticButton
            href="#booking"
            className="inline-flex items-center rounded-full bg-champagne text-charcoal font-sans font-semibold px-8 py-4 hover:bg-champagne-light transition-colors duration-300"
          >
            Book Your Experience
          </MagneticButton>
          <MagneticButton
            href={generalEnquiryLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-full border border-ivory/30 text-ivory font-sans font-semibold px-8 py-4 hover:border-champagne hover:text-champagne transition-colors duration-300"
          >
            Talk To Us On WhatsApp
          </MagneticButton>
        </Reveal>
      </div>
    </section>
  );
}
