import React from "react";
import ProgressLoad from "./ProgressLoad";

const stats = [
  {
    icon: (
      <svg viewBox="0 0 24 24" className="h-9 w-9 sm:h-10 sm:w-10 text-red-500" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
    value: "75%",
    text: "of applications don't meet role requirements",
    color: "text-red-500",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="h-9 w-9 sm:h-10 sm:w-10 text-orange-500" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
    value: "23+",
    text: "hours per role just screening resumes",
    color: "text-orange-500",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="h-9 w-9 sm:h-10 sm:w-10 text-amber-500" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
    value: "44",
    text: "days average time-to-hire",
    color: "text-amber-500",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="h-9 w-9 sm:h-10 sm:w-10 text-red-600" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 1v22" />
        <path d="M17 5H9.5a3.5 3.5 0 000 7H14a3.5 3.5 0 010 7H6" />
      </svg>
    ),
    value: "$120K",
    text: "cost of a single bad hire",
    color: "text-red-600",
  },
];

const HiringPainPoints = () => {
  return (
    <section className="bg-[#fff5ee] py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* HEADING */}
        <h2 className="
          text-center
          text-2xl sm:text-3xl md:text-[40px]
          font-extrabold
          text-slate-900
        ">
          Modern Hiring Is Expensive, Slow and Missing Great Talent
        </h2>

        <p className="
          mt-4
          text-center
          text-sm sm:text-base lg:text-lg
          text-slate-600
          max-w-3xl
          mx-auto
        ">
          High-volume hiring today creates chaos for both recruiters and candidates
        </p>

        {/* STATS GRID */}
        {/* STATS GRID */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {stats.map((item, index) => (
            <div
              key={index}
              className="
        bg-white
        rounded-2xl
        p-6 sm:p-8
        text-center
        shadow-[0_12px_30px_rgba(0,0,0,0.08)]
        transition
        hover:-translate-y-1
        hover:shadow-[0_18px_40px_rgba(0,0,0,0.12)]
      "
            >
              {/* ICON + VALUE */}
              <div className="flex flex-row sm:flex-col items-center justify-center gap-3 sm:gap-0">
                <div className="flex-shrink-0">
                  {item.icon}
                </div>

                <div
                  className={`text-3xl sm:mt-4 sm:text-3xl font-extrabold ${item.color}`}
                >
                  {item.value}
                </div>
              </div>

              {/* TEXT */}
              <p className="mt-3 text-sm sm:text-base text-slate-600">
                {item.text}
              </p>
            </div>
          ))}
        </div>



      </div>

      {/* <div className="mt-14 flex flex-col items-center">
                <button
                  className="inline-flex items-center justify-center
                    rounded-xl
                    px-2 sm:px-8 py-4
                    text-sm sm:text-3xl
                    font-semibold text-white
                    bg-gradient-to-r
                    from-[rgb(50_94_235)]
                    to-[rgb(140_54_234)]
                    shadow-lg shadow-[rgb(50_94_235)/30]
                    transition-all duration-300
                    hover:scale-[1.04]
                    hover:shadow-xl
                    active:scale-[0.97]"
                >
Transform Chaos Into Client-Ready Shortlists</button>
      
                <p className="mt-3 text-indigo-600 font-semibold text-sm sm:text-base text-center">
Convert multi-round, multilingual interviews into confident hiring decisions faster.                </p>
      
                <ProgressLoad />
      
              </div> */}
              <div className="md:mt-16 mt-10 text-center flex flex-col items-center gap-4">
  
  <button
    onClick={() => {
      document.getElementById("contact")?.scrollIntoView({
        behavior: "smooth",
      });
    }}
    className="group relative overflow-hidden
      px-8 py-4
      text-white text-sm sm:text-2xl
      rounded-xl
      bg-gradient-to-r from-indigo-600 to-purple-600
      shadow-lg
      transition-all duration-300
      hover:scale-[1.04]
      active:scale-[0.97]"
  >
    {/* Shine Sweep */}
    <span
      className="absolute top-0 -left-[45%] w-[45%] h-full
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

    <span className="relative z-10">
      Deploy Your 24/7 AI Recruiter Now
    </span>
  </button>

 <p className="text-sm sm:text-base">
  ⚡ Slow hiring is costing you roles right now.
</p>

  <div className="w-full flex justify-center">
    <ProgressLoad />
  </div>

  <p className="text-red-600 font-semibold">
    🚨 HURRY! Only 7 onboarding slots left this month.
  </p>

</div>
    </section>
  );
};

export default HiringPainPoints;
