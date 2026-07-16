import React, { useEffect, useRef, useState } from "react";
import ProgressLoad from "./ProgressLoad";

/* 🔹 DASHBOARD IMAGES */
// import jdImg from "../assets/aptahire-logo.webp";
// import resumeImg from "../assets/aptahire-logo.webp";
// import interviewImg from "../assets/aptahire-logo.webp";
// import verifyImg from "../assets/aptahire-logo.webp";
// import reportImg from "../assets/aptahire-logo.webp";
// import decisionImg from "../assets/aptahire-logo.webp";

/* STEPS */
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
        <rect x="3" y="8" width="18" height="10" rx="2" />
        <path d="M12 8V4" />
        <path d="M8 4h8" />
      </svg>
    ),
  },
      {
    title: "AI Video Interview",
   
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6 text-white" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2l7 4v6c0 5-3.5 9-7 10-3.5-1-7-5-7-10V6z" />
      </svg>
    ),
  },
  {
    title: "Verification",
   
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6 text-white" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2l7 4v6c0 5-3.5 9-7 10-3.5-1-7-5-7-10V6z" />
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

const SmartHiringStack = () => {
  const sliderRef = useRef(null);
  const [active, setActive] = useState(0);

  /* AUTO SLIDE (MOBILE ONLY) */
  useEffect(() => {
    const interval = setInterval(() => {
      slideTo(active + 1);
    }, 3000);

    return () => clearInterval(interval);
  }, [active]);

  const slideTo = (index) => {
    const total = steps.length;
    const nextIndex = (index + total) % total;
    setActive(nextIndex);

    sliderRef.current?.scrollTo({
      left: sliderRef.current.clientWidth * nextIndex,
      behavior: "smooth",
    });
  };

  return (
    <section className="bg-white md:py-16 py-10">
      <div className="mx-auto max-w-[95rem] px-4 sm:px-6">

        {/* HEADER */}
        <h2 className="text-center text-2xl sm:text-3xl md:text-[40px] font-extrabold text-slate-900">
          Meet the Smart Hiring Stack™ Built for Speed and Accuracy
        </h2>

        <p className="mt-6 text-center text-sm sm:text-base lg:text-lg text-slate-600 max-w-4xl mx-auto">
          Aptahire mimics how great recruiters actually work but runs it 24/7 at scale.
        </p>

        {/* MOBILE SLIDER */}
        <div className="relative lg:hidden mt-14">
          <div ref={sliderRef} className="flex overflow-hidden">
            {steps.map((step, index) => (
              <div key={index} className="min-w-full flex justify-center">
                <div className="w-[160px] text-center">
                  <div className="h-14 w-14 mx-auto bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                    {step.icon}
                  </div>
                  <p className="mt-3 font-semibold text-sm">{step.title}</p>
                  <img src={step.img} className="mt-3 rounded-xl border" />
                </div>
              </div>
            ))}
          </div>

          <button onClick={() => slideTo(active - 1)} className="absolute left-3 top-1/2 bg-white p-2 rounded-full shadow">‹</button>
          <button onClick={() => slideTo(active + 1)} className="absolute right-3 top-1/2 bg-white p-2 rounded-full shadow">›</button>
        </div>

        {/* DESKTOP FLOW */}
        <div className="hidden lg:flex mt-20 justify-center gap-x-5 gap-y-16 flex-wrap">
          {steps.map((step, index) => (
            <React.Fragment key={index}>
              <div className="w-[150px] text-center">
                <div className="h-16 w-16 mx-auto bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                  {step.icon}
                </div>
                <p className="mt-4 font-semibold">{step.title}</p>
                <img src={step.img} className="mt-4 rounded-xl border" />
              </div>
              {index !== steps.length - 1 && (
                <div className="flex items-center mt-10 text-indigo-500">→</div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* CTA */}
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
      Book a Free Hiring Workflow Review
    </span>
  </button>

  <p className="text-sm sm:text-base">
    Your competitors booked theirs this morning.
  </p>

  <div className="w-full flex justify-center">
    <ProgressLoad />
  </div>

  <p className="text-red-600 font-semibold">
    🚨 HURRY! Only 7 slots left this week.
  </p>

</div>

      </div>
    </section>
  );
};

export default SmartHiringStack;
