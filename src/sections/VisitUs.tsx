import { useState } from "react";
import { MapPin, Clock, Send } from "lucide-react";
import { WhatsAppGlyph } from "@/components/icons";
import SectionHeading from "@/components/SectionHeading";
import { businessInfo } from "@/config/business";
import { contactFormLink } from "@/utils/whatsapp";

const mapQuery = encodeURIComponent(
  `${businessInfo.address.city}, ${businessInfo.address.state}, ${businessInfo.address.country}`
);
const mapSrc = `https://www.google.com/maps?q=${mapQuery}&output=embed`;

export default function VisitUs() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  return (
    <section id="visit" className="relative bg-ivory text-charcoal py-16 sm:py-20">
      <div className="max-w-4xl mx-auto px-5 sm:px-10">
        <SectionHeading eyebrow="Visit Us" title="Find your way to the studio." tone="dark" align="center" />

        <div className="mt-10 grid lg:grid-cols-2 gap-5 items-stretch">
          {/* Map + location info */}
          <div className="flex flex-col rounded-2xl overflow-hidden border border-charcoal/10 bg-white shadow-[0_15px_35px_rgba(0,0,0,0.07)]">
            <div className="relative h-40 sm:h-44 lg:h-auto lg:flex-1 grayscale-[0.15] contrast-[1.05]">
              <iframe
                title="Scissor's location"
                src={mapSrc}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 w-full h-full border-0"
              />
            </div>
            <div className="p-4 sm:p-5 flex flex-col gap-3">
              <div className="flex gap-2.5">
                <MapPin size={16} className="text-wine shrink-0 mt-0.5" />
                <p className="font-sans text-xs sm:text-sm text-charcoal/75 leading-relaxed">
                  {businessInfo.address.line1}
                  <br />
                  {businessInfo.address.line2}
                </p>
              </div>
              <div className="flex flex-col gap-2 pt-2.5 border-t border-charcoal/10">
                {businessInfo.hours.map((h) => (
                  <div key={h.days} className="flex gap-2.5">
                    <Clock size={16} className="text-wine shrink-0 mt-0.5" />
                    <p className="font-sans text-xs sm:text-sm text-charcoal/75 leading-relaxed">
                      <span className="font-medium">{h.days}</span> — {h.time}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Compact contact form — routes straight to WhatsApp, same as everywhere else */}
          <div className="relative rounded-2xl border border-charcoal/10 bg-charcoal text-ivory shadow-[0_15px_35px_rgba(0,0,0,0.12)] p-5 sm:p-6 flex flex-col overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-champagne/60 to-transparent" />

            <span className="eyebrow text-champagne text-[0.62rem]">Get In Touch</span>
            <h3 className="font-display text-xl mt-1.5 mb-0.5">Send us a message.</h3>
            <p className="text-ivory/50 font-sans text-xs mb-4">We'll reply on WhatsApp, usually within the hour.</p>

            <div className="flex flex-col gap-3 flex-1">
              <label className="block">
                <span className="eyebrow text-ivory/35 text-[0.56rem] mb-1.5 block">Your Name</span>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Priya Sharma"
                  className="w-full rounded-lg border border-ivory/15 bg-charcoal-2 px-3.5 py-2.5 text-sm font-sans text-ivory placeholder:text-ivory/30 focus:border-champagne outline-none"
                />
              </label>
              <label className="block">
                <span className="eyebrow text-ivory/35 text-[0.56rem] mb-1.5 block">Phone Number</span>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Your number"
                  className="w-full rounded-lg border border-ivory/15 bg-charcoal-2 px-3.5 py-2.5 text-sm font-sans text-ivory placeholder:text-ivory/30 focus:border-champagne outline-none"
                />
              </label>
              <label className="block flex-1">
                <span className="eyebrow text-ivory/35 text-[0.56rem] mb-1.5 block">Message</span>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={2}
                  placeholder="What can we help with?"
                  className="w-full h-full rounded-lg border border-ivory/15 bg-charcoal-2 px-3.5 py-2.5 text-sm font-sans text-ivory placeholder:text-ivory/30 focus:border-champagne outline-none resize-none"
                />
              </label>
            </div>

            <a
              href={contactFormLink({ name, phone, message })}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex items-center justify-center gap-2 rounded-full font-sans font-bold text-sm px-5 py-3 text-charcoal bg-champagne hover:bg-champagne-light transition-colors"
            >
              <WhatsAppGlyph size={16} />
              Send On WhatsApp
              <Send size={13} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
