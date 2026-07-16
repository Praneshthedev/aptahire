import React, { useState } from "react";
import ProgressLoad from "./ProgressLoad";

// Dashboard images
import searchDashboard from "../assets/JD.png";
import interviewDashboard from "../assets/AI.png";
import analysisDashboard from "../assets/Resume.png";
import connectDashboard from "../assets/phone-1.png";

const steps = [
  {
    step: "01",
    title: "Screen ",
    subtitle: "Find the right candidates instantly",
    desc: "Resume screening with Aptahire AI validates every applicant against JD matching, skill validation, and cheat detection no manual CV sorting.",
    image: searchDashboard,
    icon: "fa-solid fa-magnifying-glass",
  },
  {
    step: "02",
    title: "Select",
    subtitle: "AI-led multi-round interviews",
    desc: "Phone screening auto-prioritises across customizable interview rounds with AI scoring + eligibility reports.",
    image: interviewDashboard,
    icon: "fa-solid fa-circle-check",
  },
  {
    step: "03",
    title: "Analyze",
    subtitle: "Objective candidate intelligence",
    desc: "Video screening transcripts, multi-language support, cheat signals, detailed reports in one dashboard.",
    image: analysisDashboard,
    icon: "fa-solid fa-chart-line",
  },
  {
    step: "04",
    title: "Connect",
    subtitle: "Move faster without coordination chaos",
    desc: "Auto-schedule interviews, multilingual updates, AI hiring recommendations.",
    image: connectDashboard,
    icon: "fa-solid fa-link",
  },
];

const HiringFlow = () => {
  const [popupImage, setPopupImage] = useState(null);

  return (
    <section className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 py-4 sm:py-12">
      
      {/* HEADING */}
      <h2 className="
        text-center
        text-2xl sm:text-3xl md:text-[40px]
        font-extrabold
        text-slate-900
        mb-10 sm:mb-14
        capitalize
      ">
        From Applications to Client-Ready Shortlists In One Flow
      </h2>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {steps.map((item, index) => (
          <div
            key={index}
            className="
              relative bg-white rounded-2xl p-5 sm:p-6 shadow-md h-full flex flex-col
              hover:shadow-xl
              transition
            "
          >
            {/* STEP NUMBER */}
            <span className="
              absolute
              top-3 sm:top-4
              right-4 sm:right-5
              text-3xl sm:text-4xl
              font-extrabold
              text-indigo-200
            ">
              {item.step}
            </span>

            {/* ICON + TITLE */}
            <div className="flex items-center gap-3">
              <div className="
                w-11 h-11 sm:w-12 sm:h-12
                rounded-xl
                bg-indigo-500
                flex items-center justify-center
              ">
                <i className={`${item.icon} text-white text-lg sm:text-xl`} />
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                {item.title}
              </h3>
            </div>

            {/* SUBTITLE */}
            <p className="mt-2 text-indigo-600 text-base sm:text-lg font-medium">
              {item.subtitle}
            </p>

            {/* DESCRIPTION */}
            <p className="mt-2 text-sm sm:text-base text-slate-600 leading-relaxed">
              {item.desc}
            </p>

            {/* DASHBOARD IMAGE */}
            <div className="block mt-4 rounded-xl border border-slate-200 bg-slate-50 p-2">
              <img
                src={item.image}
                alt={item.title}
                title="Click to enlarge"
                onClick={() => setPopupImage(item.image)}
                className="
                  w-full
                  h-[240px] sm:h-[300px] lg:h-[360px]
                  object-contain
                  cursor-pointer
                "
              />
            </div>

          </div>
        ))}
      </div>

      {/* IMAGE POPUP MODAL */}
      {popupImage && (
        <div className="fixed inset-0 z-50 z-[9999]  flex items-center justify-center bg-black/70">
          
          {/* Close Button */}
          <button
            onClick={() => setPopupImage(null)}
            className="absolute top-4 right-4 text-white text-3xl font-bold hover:scale-110"
          >
            ✕
          </button>

          {/* Image */}
          <img
            src={popupImage}
            alt="Preview"
            className="max-w-[90%] max-h-[70%] rounded-xl shadow-2xl"
          />
        </div>
      )}

      {/* CTA */}
      <div className="mt-14 flex flex-col items-center text-center gap-3 sm:gap-2">

  {/* CTA Button */}
  <button
    onClick={() => {
      document.getElementById("contact")?.scrollIntoView({
        behavior: "smooth",
      });
    }}
    className="group relative overflow-hidden
      inline-flex items-center justify-center
      rounded-xl
      px-4 sm:px-10 py-3 sm:py-4
      text-sm sm:text-3xl
      font-semibold text-white
      bg-gradient-to-r
      from-[rgb(50_94_235)]
      to-[rgb(140_54_234)]
      shadow-lg shadow-[rgb(50_94_235)/30]
      transition-all duration-300
      hover:scale-[1.04]
      hover:shadow-xl
      active:scale-[0.97]
      leading-none"
  >
    {/* Outer Soft Glow */}
    <span className="absolute -inset-1 rounded-xl bg-gradient-to-r from-[rgb(50_94_235)] to-[rgb(140_54_234)] blur-xl opacity-0 group-hover:opacity-40 transition duration-500" />

    {/* Shine Sweep */}
    <span
      className="absolute inset-y-0 -left-[45%] w-[45%]
        bg-white/40 z-0
      
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
      Transform Chaos Into Client-Ready Shortlists
    </span>
  </button>

  {/* Sub Info */}
  <p className="sm:text-base text-xs text-black flex items-center gap-2 font-medium">
    <span className="">⚠️</span>
    <span>Roles close faster when you move first.</span>
  </p>

  {/* Progress */}
  <div className="w-full max-w-xs">
    <ProgressLoad />
  </div>

  {/* Urgency */}
  <p className="text-red-600 font-semibold tracking-wide">
    🚨 HURRY! Only 7 slots left this week.
  </p>

</div>

    </section>
  );
};

export default HiringFlow;