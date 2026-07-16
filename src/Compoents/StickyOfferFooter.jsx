import React, { useEffect, useRef, useState } from "react";
import stopwatch from "../assets/stopwatch.png";

function BurstIcon({ className = "h-4 w-4" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="3.2" fill="currentColor" />
      <path
        d="M12 2.5v3.2M12 18.3v3.2M2.5 12h3.2M18.3 12h3.2
           M5.1 5.1l2.3 2.3M16.6 16.6l2.3 2.3M18.9 5.1l-2.3 2.3M7.4 16.6l-2.3 2.3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M12 6.2l1.1 3.4 3.4.2-2.6 2.3.8 3.3L12 13.6l-2.7 1.8.8-3.3-2.6-2.3 3.4-.2L12 6.2Z"
        fill="currentColor"
        fillOpacity="0.35"
      />
    </svg>
  );
}

export default function StickyOfferFooter() {
  const [timeLeft, setTimeLeft] = useState(4 * 60 + 45);
  const footerRef = useRef(null);
  const lastScrollY = useRef(0);

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

  useEffect(() => {
    if (window.innerWidth < 768) return;

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
            <div className="flex items-center justify-center gap-3">
              <img src={stopwatch} alt="Stopwatch" className="w-6 h-6 sm:w-12 sm:h-12" />
              <span className="font-extrabold text-xl sm:text-4xl leading-none tabular-nums">
                {formatTime(timeLeft)}
              </span>
            </div>

            <div className="text-center px-1">
              <div className="inline-flex items-center justify-center gap-2 sm:gap-2.5 uppercase font-extrabold tracking-wide text-sm sm:text-base lg:text-xl text-[#ffeb3c]">
                <BurstIcon className="h-4 w-4 sm:h-5 sm:w-5 shrink-0 text-[#ffeb3c] animate-pulse" />
                <span className="leading-tight">Rush Me a Strategy Call</span>
                <BurstIcon className="h-4 w-4 sm:h-5 sm:w-5 shrink-0 text-[#ffeb3c] animate-pulse" />
              </div>
              <div className="hidden sm:block text-white/90 text-xs sm:text-sm mt-1">
                Live: Deploy Aptahire AI Recruiter Now
              </div>
            </div>

            <div className="flex justify-center lg:justify-end">
              <button
                onClick={() => {
                  document.getElementById("contact")?.scrollIntoView({
                    behavior: "smooth",
                  });
                }}
                className="
                  group relative isolate overflow-hidden
                  rounded-full px-6 sm:px-10 py-2 sm:py-4
                  text-sm sm:text-lg font-bold
                  text-black bg-white
                  shadow-[0_12px_30px_rgba(100,60,255,0.45)]
                  transition-transform duration-300
                  hover:-translate-y-0.5
                  w-full sm:w-auto max-w-xs sm:max-w-none
                "
              >
                <span className="relative z-10 text-center">
                  Start Hiring Smarter Today
                </span>

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
