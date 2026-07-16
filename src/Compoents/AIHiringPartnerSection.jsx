import React from "react";
import ProgressLoad from "./ProgressLoad";

const AIHiringPartnerSection = () => {
  return (
    <section className="relative overflow-hidden bg-[#5348ff1c] py-24">
      
      {/* SOFT GRADIENT BLOBS */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#325eeb]/30 rounded-full blur-3xl" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-[#8c36ea]/30 rounded-full blur-3xl" />

      {/* CONTENT WRAPPER */}
      <div className="relative z-10 max-w-6xl mx-auto px-2 sm:px-6">
        
        {/* GLASS CARD */}
        <div className="rounded-3xl bg-white/70 backdrop-blur-xl shadow-2xl border border-white/40 px-2 sm:px-12 py-14 text-center">

          {/* EYEBROW */}
          <p className="inline-block mb-4 sm:px-4 px-0 py-1 rounded-full text-sm font-semibold
                         bg-[#325eeb]/10 text-[#325eeb]">
            Trusted by High-Volume Hiring Agencies
          </p>

          {/* HEADLINE */}
        <h2 className="text-2xl sm:text-5xl font-extrabold leading-tight text-black text-center">
  The AI Hiring Partner Agencies Rely On
  <br />
  When Speed and Quality Matter
</h2>

<p className="mt-6 max-w-5xl mx-auto text-base sm:text-lg text-black text-center">
  High-volume hiring overwhelms teams they settle for “available” talent while
  time-to-submit spirals.
</p>

<div className="mt-4 max-w-4xl mx-auto text-black text-base leading-relaxed text-center">
  <p>
    <span className="font-semibold">Aptahire</span> delivers an automated,
    end-to-end recruiter journey:
  </p>

  <p className="mt-4 text-base">
    Resume → Phone → Video screening, tailored JD generation, natural-sounding
    interviews, cheat detection, auto-scheduling, and detailed reports including
    eligibility scores and video recordings.
  </p>

  <p className="mt-4 text-base">
    Your team focuses only on final interviews while{" "}
    <span className="font-semibold">Aptahire runs 24/7</span> across all three
    screening stages cutting costs by{" "}
    <span className="font-semibold">75%</span> and speeding hiring by{" "}
    <span className="font-semibold">10×</span>.
  </p>
</div>

{/* CTA */}
<div className="mt-10 flex flex-col items-center text-center gap-4">
  
  {/* CTA Button */}
  <button
    onClick={() => {
      document.getElementById("contact")?.scrollIntoView({
        behavior: "smooth",
      });
    }}
    className="group relative overflow-hidden
               inline-flex items-center justify-center
               rounded-xl px-6 sm:px-12 py-3 sm:py-4 text-sm
               sm:text-2xl font-bold text-white
               bg-gradient-to-r from-[#325eeb] to-[#8c36ea]
               shadow-xl shadow-[#325eeb]/30
               transition-all duration-300
               hover:scale-105 hover:shadow-2xl
               active:scale-95 leading-none"
  >
    {/* Outer Glow */}
    <span className="absolute -inset-1 rounded-xl bg-gradient-to-r from-[#325eeb] to-[#8c36ea] blur-xl opacity-0 group-hover:opacity-40 transition duration-500" />

    {/* Shine Sweep */}
    <span
      className="absolute inset-y-0 -left-[45%] w-[45%]
        bg-white/40 z-0
        transition-all duration-[1000ms] ease-[cubic-bezier(0.4,0,0.2,1)]
        [clip-path:polygon(0%_0%,55%_0%,100%_100%,25%_100%)]
        group-hover:left-full
        group-hover:opacity-0"
    />

    {/* Soft Glow Overlay */}
    <span
      className="absolute inset-0 bg-white/5
        opacity-0 group-hover:opacity-100
        transition-opacity duration-500"
    />

    {/* Text */}
    <span className="relative z-10 whitespace-nowrap">
      Deploy Your 24/7 AI Recruiter Now
    </span>
  </button>

  {/* Top Info */}
  <p className="sm:text-base text-xs text-black flex items-center gap-2 font-medium">
    <span className="animate-pulse">🔥</span>
    <span>Agencies ahead of you deployed this already.</span>
  </p>

  {/* Progress */}
  <ProgressLoad />

  {/* Bottom Info */}
 <p className="text-red-600 font-semibold">
    🚨 HURRY! Only 7 slots left this week.
  </p>

</div>
      </div>
      </div>
    </section>
  );
};

export default AIHiringPartnerSection;
