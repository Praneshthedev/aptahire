import React, { useState } from "react";
import UrgencyLine from "./UrgencyLine";

const LEAD_API_URL =
  import.meta.env.VITE_LEAD_API_URL ??
  "https://connect.aptahire.ai/recruiters/api/lead.php";
const BOOKING_REDIRECT_URL =
  import.meta.env.VITE_BOOKING_REDIRECT_URL ??
  "https://cal.com/rakeshr7/strategy-call";

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

export default function FinalCTASection() {
  const [ctaFormData, setCtaFormData] = useState(initialFormData);
  const [ctaSubmitting, setCtaSubmitting] = useState(false);
  const [ctaMessage, setCtaMessage] = useState("");
  const [ctaMessageType, setCtaMessageType] = useState("info");

  const handleCtaChange = (e) => {
    const { name, value } = e.target;
    setCtaFormData((prev) => ({
      ...prev,
      [name]: name === "phone" ? normalizePhone(value) : value,
    }));
  };

  const handleCtaSubmit = async (e) => {
    e.preventDefault();

    if (ctaSubmitting) return;

    const phone = normalizePhone(ctaFormData.phone);
    if (!PHONE_PATTERN.test(phone)) {
      setCtaMessageType("error");
      setCtaMessage("Enter a valid 10-digit phone number.");
      return;
    }

    setCtaSubmitting(true);
    setCtaMessageType("info");
    setCtaMessage("Submitting your details...");

    try {
      const payload = new FormData();
      payload.append("name", ctaFormData.name.trim());
      payload.append("email", ctaFormData.email.trim());
      payload.append("phone", phone);
      payload.append("company", ctaFormData.company.trim());
      payload.append("bottleneck", ctaFormData.bottleneck);

      const response = await fetch(LEAD_API_URL, {
        method: "POST",
        body: payload,
      });

      const data = await response.json().catch(() => null);

      if (!response.ok || !data?.success) {
        throw new Error(data?.message || "Unable to submit right now.");
      }

      setCtaMessageType("success");
      setCtaMessage("Thanks! Redirecting you to the booking page...");
      setCtaFormData(initialFormData);

      window.setTimeout(() => {
        window.location.href = data.redirect || BOOKING_REDIRECT_URL;
      }, 400);
    } catch (error) {
      setCtaMessageType("error");
      setCtaMessage(
        error instanceof Error
          ? error.message
          : "Unable to submit right now. Please try again."
      );
      setCtaSubmitting(false);
    }
  };

  const messageStyles =
    ctaMessageType === "success"
      ? "bg-green-100 text-green-800"
      : ctaMessageType === "error"
        ? "bg-red-100 text-red-800"
        : "bg-indigo-100 text-indigo-800";

  return (
    <section id="contact" className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-stretch">
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl sm:text-[55px] font-bold text-slate-900 leading-tight">
              See How Aptahire Fits Your Hiring Flow
            </h2>
            <p className="mt-4 sm:mt-6 text-base sm:text-lg text-slate-600 max-w-xl">
              Book a free 30-minute strategy call. We&apos;ll map your current
              hiring process and show exactly where Aptahire saves time, cost,
              and effort tailored to your roles and volume.
            </p>
            <ul className="mt-6 sm:mt-8 space-y-3 sm:space-y-4 text-md text-slate-700">
              {[
                "Personalized workflow analysis",
                "ROI calculation for your team",
                "Custom integration guidance",
                "No sales pressure practical walkthrough only",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-green-100">
                    <svg
                      className="h-3 w-3 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      viewBox="0 0 24 24"
                    >
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span className="text-sm sm:text-base">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6 sm:p-8 lg:p-10 flex flex-col justify-center">
            {ctaMessage && (
              <div
                className={`mb-4 p-3 rounded-lg text-center font-medium ${messageStyles}`}
              >
                {ctaMessage}
              </div>
            )}

            <form
              onSubmit={handleCtaSubmit}
              className="space-y-4 sm:space-y-6"
              noValidate
            >
              <div>
                <label
                  htmlFor="cta-name"
                  className="block text-sm font-semibold text-slate-700 mb-1 sm:mb-2"
                >
                  Name *
                </label>
                <input
                  id="cta-name"
                  type="text"
                  name="name"
                  value={ctaFormData.name}
                  onChange={handleCtaChange}
                  required
                  autoComplete="name"
                  className="w-full rounded-lg border border-slate-300 px-3 sm:px-4 py-2 sm:py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm sm:text-base"
                />
              </div>

              <div>
                <label
                  htmlFor="cta-email"
                  className="block text-sm font-semibold text-slate-700 mb-1 sm:mb-2"
                >
                  Work Email *
                </label>
                <input
                  id="cta-email"
                  type="email"
                  name="email"
                  value={ctaFormData.email}
                  onChange={handleCtaChange}
                  required
                  autoComplete="email"
                  className="w-full rounded-lg border border-slate-300 px-3 sm:px-4 py-2 sm:py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm sm:text-base"
                />
              </div>

              <div>
                <label
                  htmlFor="cta-phone"
                  className="block text-sm font-semibold text-slate-700 mb-1 sm:mb-2"
                >
                  Phone *
                </label>
                <input
                  id="cta-phone"
                  type="tel"
                  name="phone"
                  value={ctaFormData.phone}
                  onChange={handleCtaChange}
                  required
                  inputMode="numeric"
                  autoComplete="tel"
                  placeholder="10-digit mobile number"
                  maxLength={10}
                  pattern="[6-9][0-9]{9}"
                  className="w-full rounded-lg border border-slate-300 px-3 sm:px-4 py-2 sm:py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm sm:text-base"
                />
              </div>

              <div>
                <label
                  htmlFor="cta-company"
                  className="block text-sm font-semibold text-slate-700 mb-1 sm:mb-2"
                >
                  Company / Role *
                </label>
                <input
                  id="cta-company"
                  type="text"
                  name="company"
                  value={ctaFormData.company}
                  onChange={handleCtaChange}
                  required
                  autoComplete="organization"
                  className="w-full rounded-lg border border-slate-300 px-3 sm:px-4 py-2 sm:py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm sm:text-base"
                />
              </div>

              <div>
                <label
                  htmlFor="cta-bottleneck"
                  className="block text-sm font-semibold text-slate-700 mb-1 sm:mb-2"
                >
                  Biggest hiring bottleneck *
                </label>
                <select
                  id="cta-bottleneck"
                  name="bottleneck"
                  value={ctaFormData.bottleneck}
                  onChange={handleCtaChange}
                  required
                  className="w-full rounded-lg border border-slate-300 px-3 sm:px-4 py-2 sm:py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm sm:text-base"
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
                disabled={ctaSubmitting}
                className="w-full inline-flex items-center justify-center rounded-xl px-10 sm:px-30 py-4 text-base sm:text-lg md:text-base font-semibold text-white bg-gradient-to-r from-[rgb(50_94_235)] to-[rgb(140_54_234)] shadow-lg shadow-[rgb(50_94_235)/30] transition-all duration-300 hover:scale-[1.04] hover:shadow-xl active:scale-[0.97] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {ctaSubmitting
                  ? "Submitting..."
                  : "Grab your slot now - it won't last long."}
              </button>

              <UrgencyLine className="text-center w-full" />
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
