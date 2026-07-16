import React, { useEffect, useState } from "react";
import logo from "../assets/aptahire-logo-white.png";
import ProgressLoad from "./ProgressLoad";
import DarkVeil from "./DarkVeil";

/* ✅ Import Hero Image */
import heroImage from "../assets/Main.png"; // change this path correctly

/* ================= STAT CARD (WITH COUNTER) ================= */
const StatCard = ({ value, label }) => {
  const numericValue = parseFloat(value);
  const suffix = value.replace(/[0-9.]/g, "");
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1400;
    const stepTime = 16;
    const totalSteps = duration / stepTime;
    const increment = numericValue / totalSteps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= numericValue) {
        setCount(numericValue);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [numericValue]);

  return (
    <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition text-center">
      <div className="text-2xl sm:text-4xl font-extrabold text-[#4f46e5]">
        {count}
        {suffix}
      </div>
      <p className="mt-2 text-xs sm:text-sm text-slate-600">{label}</p>
    </div>
  );
};

/* ================= HERO COMPONENT ================= */
export default function HeroWithVideo({ isPopupOpen = false, openPopup }) {
  const [activeBox, setActiveBox] = useState(8);

  return (
    <>
      {/* ================= HERO ================= */}
      <section
        className="relative flex flex-col items-center overflow-visible pb-0
        bg-gradient-to-b from-[#365cea] via-[#8938ea] to-white"
      >
        {/* Logo + Attention */}
        <div className="w-full relative px-0 sm:px-4 sm:px-40 sm:pt-8 pt-5 z-10 flex flex-col sm:block">
          {/* Logo */}
          <div className="flex justify-center sm:absolute sm:left-4 lg:left-40 sm:top-14 sm:-translate-y-1/2">
            <img src={logo} alt="Logo" className="h-12 sm:h-12" />
          </div>

          {/* Attention Bar */}
          <div className="flex justify-center mb-4 sm:mb-0">
            <div className="bg-black/70 text-white px-5 py-2 rounded-full text-[10px] sm:text-sm flex items-center gap-2 max-w-[100%] sm:max-w-2xl">
              <span className="relative flex h-4 w-4">
                <span className="animate-ping absolute h-full w-full rounded-full bg-red-500 opacity-75" />
                <span className="relative h-4 w-4 rounded-full bg-red-600" />
              </span>
              ATTENTION: Agencies & Lean HR Teams Drowning in Applications
            </div>
          </div>
        </div>

        {/* Heading */}
        <h1 className="mt-4 sm:mt-12 text-center text-white text-[32px] sm:text-[78px] leading-[1.2] sm:leading-[78px] max-w-[85rem] drop-shadow-lg px-4 font-extrabold">
          Hire <span className="text-[#ffeb3c]">10× Faster</span>.
          <br />
          Cut Cost-Per-Hire by <span className="text-[#ffeb3c]">~90%</span>.
          <br />
          <span className="text-[#ffeb3c]">Without Burning Out </span>
          <br className="hidden sm:block" />
          <span className="text-white"> Your Recruiters.</span>
        </h1>

        {/* Sub Text */}
        <p className="mt-6 text-center text-white/90 text-[14px] sm:text-xl max-w-4xl px-4 mb-12">
          Aptahire runs your complete automated recruiter journey across three
          screening types (Resume → Phone → Video), plus JD creation, multi-round
          interviews, cheat detection, and detailed candidate reports, so
          agencies handle 10X volume, close roles in days, and maintain 75%
          margins without burnout.
        </p>

        {/* ✅ IMAGE Instead of Video */}
        <div
          className={`relative w-[90%] sm:w-[70%] md:w-[55%] z-40 mb-[-130px] transition-all ${
            isPopupOpen ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        >
          <img
            src={heroImage}
            alt="Hero Preview"
            className="w-full h-full rounded-2xl shadow-2xl object-cover"
          />
        </div>
      </section>

      {/* ================= STATS + CTA ================= */}
      <section className="bg-white pt-[160px] pb-20 text-center px-4">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 max-w-4xl mx-auto">
          <StatCard value="70%" label="Faster Time-to-Hire" />
          <StatCard value="90%" label="Reduction in Cost per Hire" />
          <StatCard value="10×" label="Candidate Volume Handled" />
        </div>

        {/* CTA */}
        <div className="relative mt-14 flex flex-col items-center">
         <button onClick={() => {
    document.getElementById("contact")?.scrollIntoView({
      behavior: "smooth",
    });
  }}
  className="group relative inline-flex items-center justify-center
    rounded-xl
    px-7 sm:px-8 py-4
    text-base sm:text-3xl
    font-semibold text-white
    bg-gradient-to-r
    from-[rgb(50_94_235)]
    to-[rgb(140_54_234)]
    shadow-lg shadow-[rgb(50_94_235)/30]
    transition-all duration-300
    hover:scale-[1.04]
    hover:shadow-xl
    active:scale-[0.97]
    overflow-hidden"
>
  {/* Soft Glow Overlay */}
  <span className="
    absolute top-0 -left-[45%] w-[45%] h-full 
    bg-white/50 z-0 
    transition-all duration-[1000ms] ease-[cubic-bezier(0.4,0,0.2,1)]
    [clip-path:polygon(0%_0%,55%_0%,100%_100%,25%_100%)]
    group-hover:left-full
    group-hover:opacity-0
  "></span>

                                {/* Soft glow overlay */}
                                <span className="
    absolute inset-0 bg-white/5
    opacity-0 group-hover:opacity-100
    transition-opacity duration-500
  "></span>

  {/* Button Text */}
  <span className="relative z-10">
    Fill Your Hiring Pipeline Fast
  </span>
</button>

          <p className="mt-3 text-indigo-600 font-semibold text-sm sm:text-base text-center">
            Join AI-powered agencies recommending top talent at scale.
          </p>

          <ProgressLoad />
        </div>
      </section>
    </>
  );
}
