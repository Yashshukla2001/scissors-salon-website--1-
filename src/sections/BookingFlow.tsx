import { useState } from "react";
import { WhatsAppGlyph } from "@/components/icons";
import { serviceMenu } from "@/config/services";
import { artists } from "@/config/artists";
import { fullBookingLink, type BookingDetails } from "@/utils/whatsapp";

const TIMES = ["10:00 AM", "11:30 AM", "1:00 PM", "3:00 PM", "4:30 PM", "6:00 PM", "7:30 PM"];

// One flat, deduped list of category names across every audience group,
// for this general "what do you need" dropdown (exact pricing/sub-service
// picking happens in the main Services section browser).
const allServiceNames = Array.from(
  new Set(serviceMenu.flatMap((group) => group.categories.map((c) => c.name)))
);
export default function BookingFlow() {
  const [values, setValues] = useState<BookingDetails>({ artist: "No Preference" });

  function update<K extends keyof BookingDetails>(field: K, value: BookingDetails[K]) {
    setValues((v) => ({ ...v, [field]: value }));
  }

  return (
    <section id="booking" className="relative bg-ivory text-charcoal py-24 sm:py-32">
      <div className="max-w-2xl mx-auto px-5 sm:px-10 text-center">
        <span className="eyebrow text-wine">Book In Under A Minute</span>
        <h2 className="font-display text-[clamp(2rem,4.5vw,3.2rem)] mt-4 leading-tight text-balance">
          Tell us what you need — send it straight to WhatsApp.
        </h2>
      </div>

      <div className="max-w-xl mx-auto mt-12 px-5 sm:px-0">
        <div className="rounded-[1.75rem] border border-charcoal/10 bg-white shadow-[0_30px_60px_rgba(0,0,0,0.08)] overflow-hidden">
          <div className="p-6 sm:p-9">
            <span className="eyebrow text-charcoal/35">Fill in any order — even a few details are enough</span>

            <div className="mt-5 grid sm:grid-cols-2 gap-4 sm:gap-5">
              <Field label="Service">
                <select
                  value={values.service || ""}
                  onChange={(e) => update("service", e.target.value)}
                  className="field-select"
                >
                  <option value="" disabled>
                    Choose a service
                  </option>
                                     {allServiceNames.map((name) => (
                    <option key={name} value={name}>
                      {name}
                    </option>
                  ))}
                </select>
              </Field>

              <Field label="Artist">
                <select
                  value={values.artist || "No Preference"}
                  onChange={(e) => update("artist", e.target.value)}
                  className="field-select"
                >
                  <option value="No Preference">No Preference</option>
                  {artists.map((a) => (
                    <option key={a.id} value={a.name}>
                      {a.name}
                    </option>
                  ))}
                </select>
              </Field>

              <Field label="Date">
                <input
                  type="date"
                  value={values.date || ""}
                  onChange={(e) => update("date", e.target.value)}
                  className="field-select"
                />
              </Field>

              <Field label="Time">
                <select
                  value={values.time || ""}
                  onChange={(e) => update("time", e.target.value)}
                  className="field-select"
                >
                  <option value="" disabled>
                    Choose a time
                  </option>
                  {TIMES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </Field>

              <Field label="Your Name">
                <input
                  type="text"
                  value={values.name || ""}
                  onChange={(e) => update("name", e.target.value)}
                  placeholder="e.g. Priya Sharma"
                  className="field-select placeholder:text-charcoal/30"
                />
              </Field>

              <Field label="Phone Number">
                <input
                  type="tel"
                  value={values.phone || ""}
                  onChange={(e) => update("phone", e.target.value)}
                  placeholder="Your number"
                  className="field-select placeholder:text-charcoal/30"
                />
              </Field>
            </div>

            <div className="mt-4 sm:mt-5">
              <Field label="Notes (Optional)">
                <textarea
                  value={values.notes || ""}
                  onChange={(e) => update("notes", e.target.value)}
                  rows={2}
                  placeholder="Allergies, occasion, a reference photo you'll share on WhatsApp..."
                  className="field-select resize-none placeholder:text-charcoal/30"
                />
              </Field>
            </div>
          </div>

          {/* Perforated tear-line — a small nod to a real order slip */}
          <div className="relative px-6 sm:px-9" aria-hidden="true">
            <div className="border-t border-dashed border-charcoal/20" />
            <div className="absolute -top-1.5 left-0 right-0 flex justify-between px-6 sm:px-9">
              <span className="w-3 h-3 rounded-full bg-ivory border border-charcoal/10 -ml-1.5" />
              <span className="w-3 h-3 rounded-full bg-ivory border border-charcoal/10 -mr-1.5" />
            </div>
          </div>

          {/* The one, permanent, unmistakable CTA */}
          <div className="p-4 sm:p-5">
            <a
              href={fullBookingLink(values)}
              target="_blank"
              rel="noopener noreferrer"
              className="relative w-full flex items-center justify-center gap-3 rounded-2xl px-6 py-4 sm:py-5 font-sans font-bold text-base sm:text-lg text-charcoal bg-champagne hover:bg-champagne-light transition-colors overflow-hidden"
            >
              <span className="absolute inset-0 rounded-2xl bg-champagne/50 animate-ping-slow" />
              <WhatsAppGlyph size={22} className="relative" />
              <span className="relative">Book Via WhatsApp</span>
            </a>
          </div>
        </div>

        <p className="text-center text-charcoal/40 font-sans text-xs mt-4">
          Send whatever you've filled in — we'll confirm the rest with you directly on WhatsApp.
        </p>
      </div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block text-left">
      <span className="eyebrow text-charcoal/45 text-[0.62rem] mb-2 block">{label}</span>
      {children}
    </label>
  );
}
