import React, { useEffect, useRef, useState } from "react";
import ProgressLoad from "./ProgressLoad";
import UrgencyLine from "./UrgencyLine";

import searchDashboard from "../assets/JD.png";
import interviewDashboard from "../assets/AI.png";
import analysisDashboard from "../assets/Resume.png";
import connectDashboard from "../assets/phone-1.png";

const steps = [
  {
    step: "01",
    title: "Screen",
    subtitle: "Find the right candidates instantly",
    desc: "Resume screening with Aptahire AI validates every applicant against JD matching, skill validation, and cheat detection - no manual CV sorting.",
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
  const [active, setActive] = useState(0);
  const [popupImage, setPopupImage] = useState(null);
  const trackRef = useRef(null);
  const activeRef = useRef(0);

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let ticking = false;
    let catchUpTimer = null;

    const getTargetStep = () => {
      const rect = track.getBoundingClientRect();
      const trackHeight = track.offsetHeight - window.innerHeight;
      let progress = 0;
      if (trackHeight > 0) {
        progress = -rect.top / trackHeight;
      }
      progress = Math.min(1, Math.max(0, progress));

      // 0–25% → step 0, 25–50% → 1, 50–75% → 2, 75–100% → 3
      return Math.min(steps.length - 1, Math.floor(progress * steps.length));
    };

    const stepToward = (target) => {
      const current = activeRef.current;
      if (current === target) {
        catchUpTimer = null;
        return;
      }
      const next = target > current ? current + 1 : current - 1;
      activeRef.current = next;
      setActive(next);
      catchUpTimer = setTimeout(() => stepToward(target), 180);
    };

    const updateFromScroll = () => {
      ticking = false;
      const target = getTargetStep();
      if (target === activeRef.current) return;

      if (catchUpTimer) clearTimeout(catchUpTimer);
      // Advance one step at a time (no skipping)
      stepToward(target);
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(updateFromScroll);
    };

    updateFromScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (catchUpTimer) clearTimeout(catchUpTimer);
    };
  }, []);

  const scrollToStep = (index) => {
    const track = trackRef.current;
    if (!track) return;

    const trackTop = track.getBoundingClientRect().top + window.scrollY;
    const trackHeight = track.offsetHeight - window.innerHeight;
    // Center of each quarter
    const targetY =
      trackTop + ((index + 0.15) / steps.length) * Math.max(trackHeight, 1);

    window.scrollTo({ top: targetY, behavior: "smooth" });
  };

  const current = steps[active];

  return (
    <section className="py-10 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2
          className="
          text-center
          text-2xl sm:text-3xl md:text-[40px]
          font-extrabold
          text-slate-900
          mb-8 sm:mb-12
          capitalize
          max-w-4xl mx-auto
        "
        >
          From Applications to Client-Ready Shortlists In One Flow
        </h2>
      </div>

      {/* Tall track → progress drives steps 1→2→3→4 */}
      <div
        ref={trackRef}
        className="relative h-[280vh] sm:h-[300vh] lg:h-[340vh]"
      >
        <div className="sticky top-0 h-[100svh] flex items-center overflow-hidden">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-6 lg:gap-10 items-center">
              {/* STEPS */}
              <div className="flex flex-col gap-2 sm:gap-3 order-2 lg:order-1">
                {steps.map((item, index) => {
                  const isActive = active === index;

                  return (
                    <button
                      key={item.step}
                      type="button"
                      onClick={() => scrollToStep(index)}
                      className={`
                        relative rounded-2xl p-3.5 sm:p-5 text-left
                        transition-all duration-500 ease-out
                        border
                        ${
                          isActive
                            ? "bg-white border-indigo-200 shadow-md scale-[1.01]"
                            : "bg-white/40 border-transparent opacity-45 hover:opacity-70"
                        }
                      `}
                    >
                      {isActive && (
                        <span className="absolute left-0 top-3 bottom-3 w-1 rounded-full bg-indigo-600" />
                      )}

                      <div className="flex items-start gap-3 sm:gap-4 pl-2">
                        <div
                          className={`
                            w-10 h-10 sm:w-11 sm:h-11 rounded-xl shrink-0
                            flex items-center justify-center transition-colors duration-500
                            ${
                              isActive
                                ? "bg-indigo-600 text-white"
                                : "bg-indigo-100 text-indigo-400"
                            }
                          `}
                        >
                          <i className={`${item.icon} text-base sm:text-lg`} />
                        </div>

                        <div className="min-w-0">
                          <h3
                            className={`text-base sm:text-xl font-bold transition-colors duration-500 ${
                              isActive ? "text-slate-900" : "text-slate-500"
                            }`}
                          >
                            {item.step} {item.title}
                          </h3>

                          <div
                            className={`overflow-hidden transition-all duration-500 ease-out ${
                              isActive
                                ? "max-h-40 opacity-100 mt-1"
                                : "max-h-0 opacity-0"
                            }`}
                          >
                            <p className="text-sm sm:text-base font-semibold text-slate-800">
                              {item.subtitle}
                            </p>
                            <p className="mt-1 text-xs sm:text-sm text-slate-600 leading-relaxed">
                              {item.desc}
                            </p>
                          </div>

                          {!isActive && (
                            <p className="mt-0.5 text-xs sm:text-sm text-slate-500">
                              {item.subtitle}
                            </p>
                          )}
                        </div>
                      </div>
                    </button>
                  );
                })}

                {/* Progress dots */}
                <div className="flex items-center justify-center gap-2 pt-2 lg:justify-start lg:pl-2">
                  {steps.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      aria-label={`Go to step ${i + 1}`}
                      onClick={() => scrollToStep(i)}
                      className={`h-1.5 rounded-full transition-all duration-500 ${
                        i === active
                          ? "w-8 bg-indigo-600"
                          : "w-1.5 bg-slate-300"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* BIG IMAGE */}
              <div className="order-1 lg:order-2">
                <button
                  type="button"
                  onClick={() => setPopupImage(current.image)}
                  className="w-full group text-left"
                >
                  <img
                    key={current.step}
                    src={current.image}
                    alt={current.title}
                    className="w-full h-[42vh] sm:h-[52vh] lg:h-[68vh] max-h-[720px] object-contain rounded-xl sm:rounded-2xl transition-opacity duration-500"
                  />
                  <p className="mt-3 text-center text-sm sm:text-base font-semibold text-slate-700">
                    {current.step} · {current.title}
                  </p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {popupImage && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 p-4"
          onClick={() => setPopupImage(null)}
        >
          <button
            type="button"
            onClick={() => setPopupImage(null)}
            className="absolute top-4 right-4 text-white text-3xl font-bold"
            aria-label="Close"
          >
            ✕
          </button>
          <img
            src={popupImage}
            alt="Preview"
            className="max-w-[95%] max-h-[85vh] rounded-xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mt-6 sm:mt-10 flex flex-col items-center text-center gap-3 sm:gap-2">
          <button
            onClick={() => {
              document.getElementById("contact")?.scrollIntoView({
                behavior: "smooth",
              });
            }}
            className="group relative
      inline-flex items-center justify-center
      rounded-xl
      px-5 sm:px-10 py-3.5 sm:py-4
      text-sm sm:text-2xl lg:text-3xl
      font-semibold text-white text-center
      bg-gradient-to-r
      from-[rgb(50_94_235)]
      to-[rgb(140_54_234)]
      shadow-lg shadow-[rgb(50_94_235)/30]
      transition-all duration-300
      hover:scale-[1.02]
      hover:shadow-xl
      active:scale-[0.97]
      leading-snug
      w-full max-w-3xl
      overflow-hidden"
          >
            <span className="absolute -inset-1 rounded-xl bg-gradient-to-r from-[rgb(50_94_235)] to-[rgb(140_54_234)] blur-xl opacity-0 group-hover:opacity-40 transition duration-500 pointer-events-none" />
            <span className="absolute inset-y-0 -left-[45%] w-[45%] bg-white/40 z-0 pointer-events-none group-hover:left-full group-hover:opacity-0 transition-all duration-700" />
            <span className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <span className="relative z-10 px-1">
              Transform Chaos Into Client-Ready Shortlists
            </span>
          </button>

          <p className="sm:text-base text-xs text-black flex items-center gap-2 font-medium">
            <span>Roles close faster when you move first.</span>
          </p>

          <div className="w-full max-w-xs">
            <ProgressLoad />
          </div>

          <UrgencyLine />
        </div>
      </div>
    </section>
  );
};

export default HiringFlow;
