import React, { useEffect, useState } from "react";
import { AlertSirenIcon } from "./UrgencyLine";

const LEAD_API_URL =
  import.meta.env.VITE_LEAD_API_URL ??
  "https://connect.aptahire.ai/recruiters/api/lead.php";
const BOOKING_REDIRECT_URL =
  import.meta.env.VITE_BOOKING_REDIRECT_URL ??
  "https://cal.com/rakeshr7/strategy-call";

const STORAGE_KEY = "aptahire_lead_popup_dismissed";
const AUTO_OPEN_MS = 12000;

const initialFormData = {
  name: "",
  email: "",
  phone: "",
  company: "",
  bottleneck: "",
};

const PHONE_PATTERN = /^[6-9]\d{9}$/;

function normalizePhone(value) {
  return value.replace(/\D/g, "").slice(0, 10);
}

export function openLeadPopup() {
  window.dispatchEvent(new CustomEvent("aptahire:open-lead-popup"));
}

export default function LeadPopup() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("info");

  const closePopup = (persist = true) => {
    setOpen(false);
    if (persist) {
      try {
        sessionStorage.setItem(STORAGE_KEY, "1");
      } catch {
        /* ignore */
      }
    }
  };

  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener("aptahire:open-lead-popup", onOpen);

    let timer;
    try {
      if (!sessionStorage.getItem(STORAGE_KEY)) {
        timer = window.setTimeout(() => setOpen(true), AUTO_OPEN_MS);
      }
    } catch {
      timer = window.setTimeout(() => setOpen(true), AUTO_OPEN_MS);
    }

    return () => {
      window.removeEventListener("aptahire:open-lead-popup", onOpen);
      if (timer) window.clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (!open) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e) => {
      if (e.key === "Escape") closePopup();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "phone" ? normalizePhone(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;

    const phone = normalizePhone(formData.phone);
    if (!PHONE_PATTERN.test(phone)) {
      setMessageType("error");
      setMessage("Enter a valid 10-digit phone number.");
      return;
    }

    setSubmitting(true);
    setMessageType("info");
    setMessage("Submitting your details...");

    try {
      const payload = new FormData();
      payload.append("name", formData.name.trim());
      payload.append("email", formData.email.trim());
      payload.append("phone", phone);
      payload.append("company", formData.company.trim());
      payload.append("bottleneck", formData.bottleneck);

      const response = await fetch(LEAD_API_URL, {
        method: "POST",
        body: payload,
      });

      const data = await response.json().catch(() => null);

      if (!response.ok || !data?.success) {
        throw new Error(data?.message || "Unable to submit right now.");
      }

      setMessageType("success");
      setMessage("Thanks! Redirecting you to the booking page...");
      setFormData(initialFormData);

      try {
        sessionStorage.setItem(STORAGE_KEY, "1");
      } catch {
        /* ignore */
      }

      window.setTimeout(() => {
        window.location.href = data.redirect || BOOKING_REDIRECT_URL;
      }, 400);
    } catch (error) {
      setMessageType("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "Unable to submit right now. Please try again."
      );
      setSubmitting(false);
    }
  };

  if (!open) return null;

  const messageStyles =
    messageType === "success"
      ? "bg-green-100 text-green-800"
      : messageType === "error"
        ? "bg-red-100 text-red-800"
        : "bg-indigo-100 text-indigo-800";

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="lead-popup-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/55 backdrop-blur-[2px]"
        aria-label="Close popup"
        onClick={() => closePopup()}
      />

      <div className="relative z-10 w-full sm:max-w-lg max-h-[92vh] overflow-y-auto rounded-t-2xl sm:rounded-2xl bg-white shadow-2xl border border-slate-200">
        <div className="sticky top-0 z-10 flex items-start justify-between gap-3 bg-white/95 backdrop-blur px-5 sm:px-6 pt-5 pb-3 border-b border-slate-100">
          <div className="min-w-0 pr-2">
            <h2
              id="lead-popup-title"
              className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-tight"
            >
              See How Aptahire Fits Your Hiring Flow
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600 leading-relaxed">
              Book a free 30-minute call to see how Aptahire can simplify your
              hiring process.
            </p>
          </div>

          <button
            type="button"
            onClick={() => closePopup()}
            className="shrink-0 mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-800 transition"
            aria-label="Close"
          >
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              aria-hidden="true"
            >
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="px-5 sm:px-6 py-5">
          {message && (
            <div
              className={`mb-4 p-3 rounded-lg text-center text-sm font-medium ${messageStyles}`}
            >
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div>
              <label
                htmlFor="popup-name"
                className="block text-sm font-semibold text-slate-700 mb-1.5"
              >
                Name *
              </label>
              <input
                id="popup-name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                autoComplete="name"
                className="w-full rounded-lg border border-slate-300 px-3 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="popup-email"
                className="block text-sm font-semibold text-slate-700 mb-1.5"
              >
                Work Email *
              </label>
              <input
                id="popup-email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                autoComplete="email"
                className="w-full rounded-lg border border-slate-300 px-3 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="popup-phone"
                className="block text-sm font-semibold text-slate-700 mb-1.5"
              >
                Phone *
              </label>
              <input
                id="popup-phone"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                inputMode="numeric"
                autoComplete="tel"
                placeholder="10-digit mobile number"
                maxLength={10}
                pattern="[6-9][0-9]{9}"
                className="w-full rounded-lg border border-slate-300 px-3 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="popup-company"
                className="block text-sm font-semibold text-slate-700 mb-1.5"
              >
                Company / Role *
              </label>
              <input
                id="popup-company"
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                required
                autoComplete="organization"
                className="w-full rounded-lg border border-slate-300 px-3 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="popup-bottleneck"
                className="block text-sm font-semibold text-slate-700 mb-1.5"
              >
                Biggest Hiring Bottleneck *
              </label>
              <select
                id="popup-bottleneck"
                name="bottleneck"
                value={formData.bottleneck}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-slate-300 px-3 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm bg-white"
              >
                <option value="">Select your main challenge...</option>
                <option value="Resume screening volume">
                  Resume screening volume
                </option>
                <option value="Interview scheduling">
                  Interview scheduling
                </option>
                <option value="No-shows & drop-offs">
                  No-shows & drop-offs
                </option>
                <option value="Speed to shortlist">Speed to shortlist</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full inline-flex items-center justify-center rounded-xl px-5 py-3.5 text-base font-semibold text-white bg-gradient-to-r from-[rgb(50_94_235)] to-[rgb(140_54_234)] shadow-lg shadow-[rgb(50_94_235)/30] transition-all duration-300 hover:scale-[1.02] hover:shadow-xl active:scale-[0.97] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? "Submitting..." : "Book My Free Strategy Call"}
            </button>

            <p className="flex items-center justify-center gap-2 text-center text-sm font-semibold text-red-600">
              <AlertSirenIcon className="h-4 w-4 shrink-0 text-red-500 urgency-icon" />
              <span>Only 7 slots available this week.</span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
