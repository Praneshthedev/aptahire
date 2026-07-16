import React from "react";
import ProgressLoad from "./ProgressLoad";
const manualPoints = [
  "Manual resume screening",
  "Endless scheduling back-and-forth",
  "Inconsistent evaluations",
  "Missing qualified candidates",
  "Recruiter burnout",
];

const aiPoints = [
  "AI-powered screening",
  "Automatic scheduling",
  "Objective evaluation criteria",
  "No candidate left behind",
  "Focus on strategic decisions",
];

const HumanVsAI = () => {
  return (
    <section className="bg-[#f7f4ff] py-16 sm:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Heading */}
        <h2 className="text-center text-2xl sm:text-3xl md:text-[40px] font-extrabold text-slate-900">
          AI Assists. Humans Decide. Always.
        </h2>

        <p className="mt-6 text-center text-slate-600 max-w-3xl mx-auto leading-relaxed text-sm sm:text-base">
          Aptahire doesn't replace recruiters it removes the grunt work.
          AI handles JD creation, screening, interviews, and reports.
          Recruiters focus on judgment, context, relationships, and final
          decisions.
          This balance is why Aptahire works across agencies and in-house teams.
        </p>

        {/* Comparison */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-8 md:gap-10 items-center">
          {/* Manual Hiring */}
          <div className="bg-white rounded-2xl shadow-md p-6 sm:p-8">
            <h3 className="text-center text-xl sm:text-2xl font-semibold text-red-500">
              Manual Hiring
            </h3>
            <div className="h-px bg-red-200 my-4" />

            <div className="flex justify-center my-5">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-red-100 flex items-center justify-center">
                <i className="fa-solid fa-triangle-exclamation text-red-600 text-lg sm:text-xl"></i>
              </div>
            </div>

            <p className="text-center text-sm sm:text-base italic text-slate-500 mb-6">
              Chaos, endless calls, calendar conflicts
            </p>

            <ul className="space-y-3 sm:space-y-4 text-sm sm:text-base text-slate-700">
              {manualPoints.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <i className="fa-solid fa-xmark text-red-500 mt-1"></i>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Arrow (Desktop only) */}
          <div className="hidden md:flex justify-center">
            <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center">
              <i className="fa-solid fa-arrow-right text-indigo-600 text-xl"></i>
            </div>
          </div>

          {/* With Aptahire */}
          <div className="bg-white rounded-2xl shadow-md p-6 sm:p-8">
            <h3 className="text-center text-xl sm:text-2xl font-semibold text-green-600">
              With Aptahire
            </h3>
            <div className="h-px bg-green-200 my-4" />

            <div className="flex justify-center my-5">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-green-100 flex items-center justify-center">
                <i className="fa-solid fa-check text-green-600 text-lg sm:text-xl"></i>
              </div>
            </div>

            <p className="text-center text-sm sm:text-base italic text-slate-500 mb-6">
              Clean dashboards, streamlined process
            </p>

            <ul className="space-y-3 sm:space-y-4 text-sm sm:text-base text-slate-700">
              {aiPoints.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <i className="fa-solid fa-check text-green-600 mt-1"></i>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-14 flex flex-col items-center">
          

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
     Deploy Your 24/7 AI Recruiter Now
  </span>
</button>

          <p className="mt-3 text-indigo-600 font-semibold text-sm sm:text-base text-center">
            Don’t let faster competitors steal your best candidates
          </p>

          <ProgressLoad />

        </div>
      </div>
    </section>
  );
};

export default HumanVsAI;
