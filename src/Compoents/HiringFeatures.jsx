import React from "react";
import ProgressLoad from "./ProgressLoad";
const features = [
  {
    title: "AI-Generated Job Descriptions",
    desc: "Create role-specific, industry-standard JDs in minutes. Reduce job setup time by up to 70%.",
    icon: "fa-solid fa-file-lines",
    bg: "bg-[#e3effe]",
    iconColor: "text-blue-600",
  },
{
  title: "Multi-Layer AI Screening System",
  desc: (
    <>
      <span className="font-bold text-black">Resume Intelligence</span> <br />
      <span className="font-bold text-black">AI Phone Interviews</span> <br />
      <span className="font-bold text-black">AI Video Interviews</span>
    </>
  ),
  icon: "fa-solid fa-magnifying-glass-plus",
  bg: "bg-[#e5fced]",
  iconColor: "text-green-600",
},
  {
    title: "Multilingual AI Interviews",
    desc: "Conduct interviews in 20+ languages and 5 English accents for inclusive, global hiring.",
    icon: "fa-solid fa-globe",
    bg: "bg-[#f6eeff]",
    iconColor: "text-purple-600",
  },
  {
    title: "9 Customizable Interview Rounds",
    desc: "Personality, STAR, Technical, Coding, Aptitude, Big Five, Spoken Language -fully configurable.",
    icon: "fa-solid fa-gears",
    bg: "bg-[#fff2e0]",
    iconColor: "text-orange-600",
  },
  {
    title: "Asynchronous Interviews",
    desc: "Candidates interview on their schedule. Recruiters save up to 90% of scheduling time.",
    icon: "fa-solid fa-clock",
    bg: "bg-[#feebeb]",
    iconColor: "text-red-600",
  },
  {
    title: "Candidate Verification",
    desc: "AI-based face and voice verification prevents impersonation and proxy interviews.",
    icon: "fa-solid fa-user-shield",
    bg: "bg-[#dcfcf5]",
    iconColor: "text-emerald-600",
  },
  {
    title: "Automated Shortlisting Engine",
    desc: "Filter candidates using 11 criteria including CTC, notice period, skills %, experience %, and more.",
    icon: "fa-solid fa-filter",
    bg: "bg-[#e6ecff]",
    iconColor: "text-indigo-600",
  },
  {
    title: "AI Evaluation Reports",
    desc: "Round-wise breakdowns, pros & cons, and performance scores ready to share with managers.",
    icon: "fa-solid fa-chart-line",
    bg: "bg-[#fef9cb]",
    iconColor: "text-yellow-600",
  },
];

const HiringFeatures = () => {
  return (
    <section className="max-w-[88rem] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
      {/* Heading */}
      <h2 className="text-center text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 mb-12 sm:mb-16 leading-tight">
        Everything You Need to Screen, Interview, and Shortlist -Built In
      </h2>

      {/* Features Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
        {features.map((item, index) => (
          <div
            key={index}
            className={`group rounded-2xl p-6 sm:p-7 ${item.bg}
              transition-all duration-300
              hover:-translate-y-1 hover:shadow-xl`}
          >
            {/* Icon */}
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-white flex items-center justify-center shadow-sm mb-4">
              <i
                className={`${item.icon} ${item.iconColor} text-xl sm:text-2xl`}
              />
            </div>

            {/* Content */}
            <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-2">
              {item.title}
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              {item.desc}
            </p>
          </div>
        ))}
      </div>

           {/* CTA */}
        <div className="mt-14 flex flex-col items-center text-center gap-3 sm:gap-2">

  {/* CTA Button */}
  <button
    onClick={() => {
      document.getElementById("contact")?.scrollIntoView({
        behavior: "smooth",
      });
    }}
    className="group relative inline-flex items-center justify-center
      rounded-xl
      px-6 sm:px-10 py-3 sm:py-4
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
      overflow-hidden leading-none"
  >
    {/* Shine Sweep */}
    <span
      className="absolute inset-y-0 -left-[45%] w-[45%]
        bg-white/50 z-0
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

    {/* Button Text */}
    <span className="relative z-10 whitespace-nowrap">
      Book a Free Hiring Workflow Review
    </span>
  </button>

  {/* Sub Text */}
  <p className="text-lackfont-semibold text-xs sm:text-base">
    ⚠️ Roles close faster when you move first.
  </p>

  {/* Progress */}
  <div className="w-full max-w-xs">
    <ProgressLoad />
  </div>

  {/* Urgency */}
  <p className="text-red-600 font-semibold tracking-wide ">
    🚨 HURRY! Only 7 slots left this week.
  </p>

</div>
    </section>
  );
};

export default HiringFeatures;
