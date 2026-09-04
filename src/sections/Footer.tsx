import { MessageCircle, Star, MapPin, Clock } from "lucide-react";
import { InstagramGlyph } from "@/components/icons";
import { businessInfo } from "@/config/business";
import { salon } from "@/config/media";
import { generalEnquiryLink } from "@/utils/whatsapp";

const LINKS = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Artists", href: "#artists" },
  { label: "Gallery", href: "#gallery" },
  { label: "Reviews", href: "#reviews" },
];

export default function Footer() {
  return (
    <footer className="relative bg-charcoal border-t border-champagne/15 pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-5 sm:px-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
        <div>
          <div className="flex items-center gap-2.5">
            <img src={salon.logo} alt={businessInfo.name} className="h-10 w-10 object-contain" />
            <span className="font-display text-xl">Scissor&rsquo;s</span>
          </div>
          <p className="mt-4 text-ivory/55 font-sans text-sm leading-relaxed max-w-xs">
            {businessInfo.tagline} — a studio for hair, colour, skin and
            bridal artistry in Dewas, since {businessInfo.foundedYear}.
          </p>
          <div className="flex items-center gap-3 mt-6">
            <SocialIcon href={generalEnquiryLink()} label="WhatsApp"><MessageCircle size={16} /></SocialIcon>
            <SocialIcon href={businessInfo.social.instagram} label="Instagram"><InstagramGlyph size={16} /></SocialIcon>
            <SocialIcon href={businessInfo.social.googleReviews} label="Google Reviews"><Star size={16} /></SocialIcon>
          </div>
        </div>

        <div>
          <span className="eyebrow text-champagne/70">Explore</span>
          <ul className="mt-5 flex flex-col gap-3">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="text-ivory/65 font-sans text-sm hover:text-champagne transition-colors">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <span className="eyebrow text-champagne/70">Visit</span>
          <div className="mt-5 flex gap-3">
            <MapPin size={16} className="text-champagne/70 shrink-0 mt-0.5" />
            <p className="text-ivory/65 font-sans text-sm leading-relaxed">
              {businessInfo.address.line1}
              <br />
              {businessInfo.address.line2}
            </p>
          </div>
        </div>

        <div>
          <span className="eyebrow text-champagne/70">Hours</span>
          <div className="mt-5 flex flex-col gap-3">
            {businessInfo.hours.map((h) => (
              <div key={h.days} className="flex gap-3">
                <Clock size={16} className="text-champagne/70 shrink-0 mt-0.5" />
                <p className="text-ivory/65 font-sans text-sm leading-relaxed">
                  {h.days}
                  <br />
                  {h.time}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-10 mt-16 pt-8 border-t border-champagne/10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-ivory/40 font-sans text-xs text-center sm:text-left">
          © {new Date().getFullYear()} {businessInfo.fullName}. All rights reserved.
        </p>
        <p className="text-ivory/40 font-sans text-xs text-center sm:text-right">
          Built by <span className="text-champagne/70 font-semibold">Exsora</span> under India&rsquo;s Business Digitization Mission
        </p>
      </div>
    </footer>
  );
}

function SocialIcon({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="w-10 h-10 rounded-full border border-champagne/20 text-champagne flex items-center justify-center hover:bg-champagne hover:text-charcoal transition-colors duration-300"
    >
      {children}
    </a>
  );
}
