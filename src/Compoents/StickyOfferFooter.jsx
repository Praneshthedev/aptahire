import React, { useEffect, useRef, useState } from "react";
import stopwatch from "../assets/stopwatch.png";

export default function StickyOfferFooter() {
  const [timeLeft, setTimeLeft] = useState(4 * 60 + 45);
  const footerRef = useRef(null);
  const lastScrollY = useRef(0);

  /* ================================
     COUNTDOWN TIMER
  ================================= */
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (secs) => {
    const m = String(Math.floor(secs / 60)).padStart(2, "0");
    const s = String(secs % 60).padStart(2, "0");
    return `${m} : ${s}`;
  };

  /* ================================
     SCROLL SHOW / HIDE (DESKTOP ONLY)
  ================================= */
  useEffect(() => {
    if (window.innerWidth < 768) return; // 🔑 disable on mobile

    const footer = footerRef.current;

    const onScroll = () => {
      const y = window.scrollY;

      if (y > 150 && y > lastScrollY.current) {
        footer.classList.remove("translate-y-full", "opacity-0");
        footer.classList.add("translate-y-0", "opacity-100");
      } else {
        footer.classList.add("translate-y-full", "opacity-0");
        footer.classList.remove("translate-y-0", "opacity-100");
      }

      lastScrollY.current = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <footer
      ref={footerRef}
      className="
        fixed bottom-0 left-0 w-full z-50
        translate-y-0 opacity-100
        pointer-events-none
        transition-all duration-500
      "
    >
      <div className="mx-auto max-w-screen-2xl px-2 sm:px-4">
        {/* CARD */}
        <div
          className="
            pointer-events-auto
            bg-gradient-to-r from-[#8938ea] to-[#395beb]
            text-white rounded-t-2xl sm:rounded-2xl
            shadow-2xl backdrop-blur-sm
            px-4 py-3 sm:px-6 sm:py-5 lg:px-8 lg:py-4
          "
        >
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            
            {/* TIMER */}
            <div className="flex items-center justify-center gap-3">
              <img src={stopwatch} alt="Stopwatch" className="w-6 h-6 sm:w-12 sm:h-12" />
              <span className="font-extrabold text-xl sm:text-4xl leading-none">
                {formatTime(timeLeft)}
              </span>
            </div>

            {/* MESSAGE */}
            <div className="text-center">
              <div className="uppercase font-bold tracking-wide text-sm sm:text-base lg:text-xl">
                💥 RUSH ME A STRATEGY CALL 💥
              </div>
              <div className="hidden sm:block text-white/90 text-xs sm:text-sm mt-1">
                Live: Deploy Aptahire AI Recruiter Now
              </div>
            </div>

            {/* CTA */}
            <div className="flex justify-center lg:justify-end">
              <button  onClick={() => {
    document.getElementById("contact")?.scrollIntoView({
      behavior: "smooth",
    });
  }}
                className="
                  group relative isolate overflow-hidden
                  rounded-full px-8 sm:px-10 py-2 sm:py-4
                  text-base sm:text-lg font-bold
                  text-black bg-white
                  shadow-[0_12px_30px_rgba(100,60,255,0.45)]
                  transition-transform duration-300
                  hover:-translate-y-0.5
                "
              >
                <span className="relative z-10 text-center">
                  Start Hiring Smarter Today
                </span>

                {/* SHINE */}
                <span
                  className="
                    absolute top-0 -left-[60%] w-[50%] h-full
                    bg-white/35
                    transition-all duration-[1000ms]
                    [clip-path:polygon(0%_0%,55%_0%,100%_100%,25%_100%)]
                    group-hover:left-[130%]
                  "
                />
              </button>
            </div>

          </div>
        </div>
      </div>
    </footer>
  );
}
