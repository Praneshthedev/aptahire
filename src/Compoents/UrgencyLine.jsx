import React from "react";

export function AlertSirenIcon({ className = "h-4 w-4" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M6.5 14.5a5.5 5.5 0 0111 0"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M5 17.5h14v2.2a1.3 1.3 0 01-1.3 1.3H6.3A1.3 1.3 0 015 19.7v-2.2z"
        fill="currentColor"
        fillOpacity="0.2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M12 4.5v2.2M4.8 9.2l1.7 1.2M19.2 9.2l-1.7 1.2"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <circle cx="12" cy="14.2" r="1.15" fill="currentColor" />
    </svg>
  );
}

export function FireIcon({ className = "h-4 w-4" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M12 21c4 0 6.5-2.8 6.5-6.2 0-2.6-1.4-4.4-2.8-5.8.2 1.8-.4 3-1.5 3.8C13.4 8.2 12 5.5 12 3c-1.8 2.2-5.5 5.4-5.5 11.8C6.5 18.2 9 21 12 21z"
        fill="currentColor"
        fillOpacity="0.25"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M12 20c1.8 0 3-1.3 3-3.1 0-1.5-1-2.5-2.1-3.4.1 1.2-.4 2-1.2 2.5C11.3 14.2 10.5 12.5 10.5 11c-1 1.3-2.5 3-2.5 5.9 0 1.8 1.2 3.1 4 3.1z"
        fill="currentColor"
      />
    </svg>
  );
}

export function EyeIcon({ className = "h-4 w-4" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M2.5 12s3.5-6.5 9.5-6.5S21.5 12 21.5 12s-3.5 6.5-9.5 6.5S2.5 12 2.5 12z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
        fill="currentColor"
        fillOpacity="0.12"
      />
      <circle cx="12" cy="12" r="2.6" fill="currentColor" />
    </svg>
  );
}

/** Shared “HURRY! Only 7…” line with siren SVG + glow */
export default function UrgencyLine({
  text = "HURRY! Only 7 slots left this week.",
  className = "",
}) {
  return (
    <p
      className={`inline-flex items-center justify-center gap-2 text-red-600 font-semibold tracking-wide text-sm sm:text-base ${className}`}
    >
      <AlertSirenIcon className="urgency-icon h-4 w-4 sm:h-[18px] sm:w-[18px] shrink-0 text-red-500" />
      <span>{text}</span>
    </p>
  );
}
