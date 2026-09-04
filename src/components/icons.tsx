/** Recognisable WhatsApp glyph (speech bubble + handset), filled solid — for the primary booking CTA. */
export function WhatsAppGlyph({ size = 18, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.47 14.38c-.29-.15-1.7-.84-1.97-.93-.26-.1-.46-.15-.65.14-.2.3-.75.94-.92 1.13-.17.2-.34.22-.63.08-.29-.15-1.22-.45-2.33-1.44-.86-.77-1.44-1.72-1.61-2.01-.17-.29-.02-.45.13-.6.13-.13.29-.34.44-.5.15-.18.2-.3.29-.5.1-.2.05-.37-.02-.52-.08-.15-.65-1.58-.9-2.16-.24-.58-.48-.5-.65-.5-.17-.02-.37-.02-.56-.02-.2 0-.52.08-.79.37-.27.3-1.03 1.02-1.03 2.48s1.06 2.87 1.2 3.07c.15.2 2.1 3.24 5.09 4.54.71.31 1.27.5 1.7.63.72.23 1.37.2 1.88.12.57-.08 1.7-.7 1.95-1.37.24-.68.24-1.25.17-1.37-.07-.13-.26-.2-.55-.35z" />
      <path d="M12.02 2C6.5 2 2.02 6.48 2.02 12c0 1.88.51 3.63 1.4 5.14L2 22l4.99-1.38A9.96 9.96 0 0 0 12.02 22c5.52 0 10-4.48 10-10s-4.48-10-10-10zm0 18.2a8.2 8.2 0 0 1-4.18-1.14l-.3-.18-3.05.85.82-3.02-.2-.31A8.19 8.19 0 0 1 3.82 12c0-4.53 3.68-8.2 8.2-8.2 4.53 0 8.2 3.67 8.2 8.2 0 4.53-3.67 8.2-8.2 8.2z" />
    </svg>
  );
}

/** Standard four-colour Google "G" mark, used purely as a review-source attribution badge. */
export function GoogleGlyph({ size = 18, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" className={className} aria-hidden="true">
      <path
        fill="#FFC107"
        d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.7-6.1 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 6.1 29.6 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.2-.1-2.4-.4-3.5z"
      />
      <path
        fill="#FF3D00"
        d="M6.3 14.7l6.6 4.8C14.6 15.9 18.9 13 24 13c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 6.1 29.6 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"
      />
      <path
        fill="#4CAF50"
        d="M24 44c5.5 0 10.5-2.1 14.3-5.6l-6.6-5.6C29.6 34.7 27 35.5 24 35.5c-5.2 0-9.6-3.3-11.2-7.9l-6.5 5C9.6 39.6 16.2 44 24 44z"
      />
      <path
        fill="#1976D2"
        d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.2 4.2-4.1 5.6l6.6 5.6C41.5 36 44 30.5 44 24c0-1.2-.1-2.4-.4-3.5z"
      />
    </svg>
  );
}

/** Generic outlined camera-in-square glyph (lucide-react's brand icons were removed upstream). */
export function InstagramGlyph({ size = 18, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}
