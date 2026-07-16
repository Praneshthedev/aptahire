import React from "react";
import ProgressLoad from "./ProgressLoad";
import UrgencyLine from "./UrgencyLine";

const steps = [
  {
    title: "JD Creation",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6 text-white" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
        <path d="M14 2v6h6" />
      </svg>
    ),
  },
  {
    title: "Resume Screening",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6 text-white" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
  },
  {
    title: "AI Phone Interview",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6 text-white" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0122 16.92z" />
      </svg>
    ),
  },
  {
    title: "AI Video Interview",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6 text-white" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="6" width="14" height="12" rx="2" />
        <path d="M16 10l6-3v10l-6-3" />
      </svg>
    ),
  },
  {
    title: "Verification",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6 text-white" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2l7 4v6c0 5-3.5 9-7 10-3.5-1-7-5-7-10V6z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
  {
    title: "Candidate Report",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6 text-white" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="8" y1="6" x2="21" y2="6" />
        <line x1="8" y1="12" x2="21" y2="12" />
        <line x1="8" y1="18" x2="21" y2="18" />
        <circle cx="4" cy="6" r="1" />
        <circle cx="4" cy="12" r="1" />
        <circle cx="4" cy="18" r="1" />
      </svg>
    ),
  },
  {
    title: "Human Decision",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6 text-white" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="7" r="4" />
        <path d="M5.5 21a6.5 6.5 0 0113 0" />
      </svg>
    ),
  },
];

/* Desktop: wavy path through icon centers — no loose dots */
function StackPathDesktop() {
  // 7 equal columns in viewBox 980 — centers aligned with grid
  const xs = [70, 210, 350, 490, 630, 770, 910];
  // same center Y so the line meets every icon the same way
  const y = 40;

  let d = `M ${xs[0]} ${y}`;
  for (let i = 1; i < xs.length; i++) {
    const midX = (xs[i - 1] + xs[i]) / 2;
    // curve up / down between icons only
    const bump = i % 2 === 0 ? y - 28 : y + 28;
    d += ` Q ${midX} ${bump}, ${xs[i]} ${y}`;
  }

  return (
    <svg
      className="pointer-events-none absolute left-0 right-0 top-0 h-20 w-full z-0"
      viewBox="0 0 980 80"
      fill="none"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="stackGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.55" />
          <stop offset="50%" stopColor="#9333ea" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#2563eb" stopOpacity="0.55" />
        </linearGradient>
      </defs>
      <path
        d={d}
        stroke="url(#stackGrad)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray="7 9"
        className="stack-flow-dash"
      />
    </svg>
  );
}

/* Tablet / mobile: vertical wavy connector — clipped to steps only */
function StackPathVertical() {
  return (
    <svg
      className="pointer-events-none absolute left-[22px] sm:left-[26px] top-6 bottom-6 w-5 lg:hidden z-0 overflow-visible"
      viewBox="0 0 20 600"
      fill="none"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M 10 0
           C 18 40, 2 80, 10 120
           S 2 200, 10 240
           S 18 320, 10 360
           S 2 440, 10 480
           S 18 540, 10 580
           L 10 600"
        stroke="#818cf8"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="6 8"
        strokeOpacity="0.7"
        className="stack-flow-dash"
      />
    </svg>
  );
}

const SmartHiringStack = () => {
  return (
    <section className="bg-white md:py-16 py-10 overflow-x-hidden">
      <div className="mx-auto max-w-[95rem] px-4 sm:px-6">
        <h2 className="text-center text-2xl sm:text-3xl md:text-[40px] font-extrabold text-slate-900 px-1">
          Meet the Smart Hiring Stack™ Built for Speed and Accuracy
        </h2>

        <p className="mt-5 sm:mt-6 text-center text-sm sm:text-base lg:text-lg text-slate-600 max-w-4xl mx-auto">
          Aptahire mimics how great recruiters actually work but runs it 24/7 at
          scale.
        </p>

        {/* DESKTOP: wavy connected flow */}
        <div className="relative hidden lg:block mt-16 xl:mt-20 px-2">
          <div className="relative pt-2">
            <StackPathDesktop />
            <div className="relative z-10 grid grid-cols-7 gap-2 xl:gap-3">
              {steps.map((step, index) => (
                <div
                  key={step.title}
                  className="flex flex-col items-center text-center px-1"
                >
                  <div className="relative h-14 w-14 xl:h-16 xl:w-16 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg ring-4 ring-white">
                    {step.icon}
                  </div>
                  <p className="mt-4 font-semibold text-xs xl:text-sm text-slate-800 leading-snug">
                    {step.title}
                  </p>
                  <span className="mt-1 text-[10px] font-bold text-indigo-400 tabular-nums">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* MOBILE / TABLET: vertical connected list */}
        <div className="relative lg:hidden mt-12 sm:mt-14 max-w-md mx-auto pl-2 overflow-hidden">
          <StackPathVertical />
          <div className="relative z-10 flex flex-col gap-5 sm:gap-6">
            {steps.map((step, index) => (
              <div key={step.title} className="flex items-center gap-4">
                <div className="relative h-12 w-12 sm:h-14 sm:w-14 shrink-0 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg ring-4 ring-white">
                  {step.icon}
                </div>
                <div className="min-w-0 text-left">
                  <p className="font-semibold text-sm sm:text-base text-slate-900">
                    {step.title}
                  </p>
                  <p className="text-[11px] sm:text-xs text-indigo-500 font-semibold tabular-nums">
                    Step {String(index + 1).padStart(2, "0")} of {steps.length}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="md:mt-16 mt-12 text-center flex flex-col items-center gap-4 px-1">
          <button
            onClick={() => {
              document.getElementById("contact")?.scrollIntoView({
                behavior: "smooth",
              });
            }}
            className="group relative overflow-hidden
      px-6 sm:px-8 py-3.5 sm:py-4
      text-white text-sm sm:text-2xl
      rounded-xl
      bg-gradient-to-r from-indigo-600 to-purple-600
      shadow-lg
      transition-all duration-300
      hover:scale-[1.02]
      active:scale-[0.97]
      w-full max-w-xl sm:max-w-3xl
      leading-snug"
          >
            <span
              className="absolute top-0 -left-[45%] w-[45%] h-full
        bg-white/40 z-0
        transition-all duration-[1000ms] ease-[cubic-bezier(0.4,0,0.2,1)]
        [clip-path:polygon(0%_0%,55%_0%,100%_100%,25%_100%)]
        group-hover:left-full
        group-hover:opacity-0"
            />
            <span
              className="absolute inset-0 bg-white/5
        opacity-0 group-hover:opacity-100
        transition-opacity duration-500"
            />
            <span className="relative z-10 px-1">
              Book a Free Hiring Workflow Review
            </span>
          </button>

          <p className="text-sm sm:text-base text-slate-700">
            Your competitors booked theirs this morning.
          </p>

          <div className="w-full flex justify-center">
            <ProgressLoad />
          </div>

          <UrgencyLine />
        </div>
      </div>

      <style>{`
        .stack-flow-dash {
          animation: stackFlowDash 16s linear infinite;
        }
        @keyframes stackFlowDash {
          to { stroke-dashoffset: -160; }
        }
      `}</style>
    </section>
  );
};

export default SmartHiringStack;
