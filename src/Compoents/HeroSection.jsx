import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import logo from "../assets/aptahire-logo-white.png";
import ProgressLoad from "./ProgressLoad";

const WISTIA_MEDIA_ID = "8gosrmsfk3";

function loadWistiaScripts() {
  if (document.querySelector('script[data-wistia-player]')) return;

  const player = document.createElement("script");
  player.src = "https://fast.wistia.com/player.js";
  player.async = true;
  player.dataset.wistiaPlayer = "true";
  document.head.appendChild(player);

  const embed = document.createElement("script");
  embed.src = `https://fast.wistia.com/embed/${WISTIA_MEDIA_ID}.js`;
  embed.async = true;
  embed.type = "module";
  embed.dataset.wistiaPlayer = "true";
  document.head.appendChild(embed);
}

/* ================= STAT CARD (COUNT FROM 1) ================= */
const StatCard = ({ value, label, start }) => {
  const to = parseFloat(value);
  const suffix = value.replace(/[0-9.]/g, "");
  const [count, setCount] = useState(1);

  useEffect(() => {
    if (!start) {
      setCount(1);
      return;
    }

    let frame;
    const from = 1;
    const duration = 1400;
    const startTime = performance.now();

    const tick = (now) => {
      const t = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      const next = from + (to - from) * eased;
      setCount(Math.round(next));
      if (t < 1) frame = requestAnimationFrame(tick);
      else setCount(to);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [to, start]);

  return (
    <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-md hover:shadow-xl transition text-center">
      <div className="text-2xl sm:text-4xl font-extrabold text-[#4f46e5] tabular-nums">
        {count}
        {suffix}
      </div>
      <p className="mt-2 text-xs sm:text-sm text-slate-600">{label}</p>
    </div>
  );
};

/* ================= HERO WISTIA VIDEO ================= */
function HeroPreviewImage({ isPopupOpen = false }) {
  const wrapRef = useRef(null);
  const [interactive, setInteractive] = useState(false);

  useEffect(() => {
    loadWistiaScripts();
  }, []);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap || interactive) return;

    const onWheel = (e) => {
      e.preventDefault();
      e.stopPropagation();
      window.scrollBy({ top: e.deltaY, left: 0, behavior: "auto" });
    };

    wrap.addEventListener("wheel", onWheel, { passive: false, capture: true });
    return () => wrap.removeEventListener("wheel", onWheel, { capture: true });
  }, [interactive]);

  useEffect(() => {
    const wrap = wrapRef.current;
    const player = wrap?.querySelector("wistia-player");
    if (!player) return;

    const clampPlayer = () => {
      player.style.setProperty("position", "absolute", "important");
      player.style.setProperty("inset", "0", "important");
      player.style.setProperty("width", "100%", "important");
      player.style.setProperty("height", "100%", "important");
      player.style.setProperty("max-height", "100%", "important");
      player.style.setProperty("padding", "0", "important");
      player.style.setProperty("margin", "0", "important");
    };

    clampPlayer();
    const observer = new MutationObserver(clampPlayer);
    observer.observe(player, { attributes: true, childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!interactive) return;

    const onDocPointerDown = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) {
        setInteractive(false);
      }
    };

    document.addEventListener("pointerdown", onDocPointerDown);
    return () => document.removeEventListener("pointerdown", onDocPointerDown);
  }, [interactive]);

  return (
    <motion.div
      variants={heroItem}
      className={`relative w-[92%] sm:w-[70%] md:w-[55%] mb-6 sm:mb-8 md:mb-10 ${
        isPopupOpen ? "pointer-events-none opacity-0" : ""
      }`}
    >
      <div
        ref={wrapRef}
        className={`hero-wistia-wrap shadow-2xl bg-black/10 ${
          interactive ? "hero-wistia-wrap--interactive" : ""
        }`}
      >
        <wistia-player
          media-id={WISTIA_MEDIA_ID}
          aspect="1.7777777777777777"
        />
        {!interactive && (
          <div
            className="hero-wistia-scroll-shield"
            onClick={() => setInteractive(true)}
            aria-label="Click to interact with video"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setInteractive(true);
              }
            }}
          />
        )}
      </div>
    </motion.div>
  );
}

/* ================= LOAD ENTRANCE ================= */
const heroContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.11,
      delayChildren: 0.06,
    },
  },
};

const heroItem = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

/* ================= HERO HEADLINE COUNTERS ================= */
function useCountUp({ from, to, duration = 1200, start = true }) {
  const [value, setValue] = useState(from);

  useEffect(() => {
    if (!start) {
      setValue(from);
      return;
    }

    let frame;
    const startTime = performance.now();

    const tick = (now) => {
      const t = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(from + (to - from) * eased));
      if (t < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [from, to, duration, start]);

  return value;
}

function HeroHeadline() {
  const [started, setStarted] = useState(false);
  const speed = useCountUp({ from: 1, to: 10, duration: 1100, start: started });
  const cost = useCountUp({ from: 10, to: 90, duration: 1400, start: started });

  // Start counters shortly after the rise-in begins
  useEffect(() => {
    const t = setTimeout(() => setStarted(true), 450);
    return () => clearTimeout(t);
  }, []);

  return (
    <motion.h1
      variants={heroItem}
      className="mt-4 sm:mt-12 text-center text-white text-[28px] sm:text-[78px] leading-[1.2] sm:leading-[78px] max-w-[85rem] drop-shadow-lg px-4 font-extrabold"
    >
      Hire{" "}
      <span className="text-[#ffeb3c] -ml-1 sm:-ml-1.5">
        <span className="tabular-nums">{speed}</span>× Faster
      </span>
      .
      <br />
      Cut Cost-Per-Hire by{" "}
      <span className="text-[#ffeb3c]">
        ~
        <span className="tabular-nums">{cost}</span>
        %
      </span>
      .
      <br />
      <span className="text-[#ffeb3c]">Without Burning Out </span>
      <br className="hidden sm:block" />
      <span className="text-white"> Your Recruiters.</span>
    </motion.h1>
  );
}

/* ================= HERO COMPONENT ================= */
export default function HeroWithVideo({ isPopupOpen = false }) {
  const statsRef = useRef(null);
  const [statsStarted, setStatsStarted] = useState(false);

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* ================= HERO ================= */}
      <section
        className="relative flex flex-col items-center overflow-hidden pb-6 sm:pb-8
        bg-gradient-to-b from-[#365cea] via-[#8938ea] to-white"
      >
        <motion.div
          className="w-full flex flex-col items-center"
          variants={heroContainer}
          initial="hidden"
          animate="show"
        >
          {/* Logo + Attention */}
          <motion.div
            variants={heroItem}
            className="w-full relative px-0 sm:px-4 sm:px-40 sm:pt-8 pt-10 z-10 flex flex-col sm:block"
          >
            {/* Logo */}
            <div className="flex justify-center sm:absolute sm:left-4 lg:left-40 sm:top-14 sm:-translate-y-1/2 mt-1 sm:mt-0">
              <img src={logo} alt="Logo" className="h-10 sm:h-12" />
            </div>

            {/* Attention Bar */}
            <div className="flex justify-center mb-4 sm:mb-0 mt-3 sm:mt-0">
              <div
                className="inline-flex items-center gap-2
                px-4 sm:px-5 py-1.5 sm:py-2
                max-w-[95%] sm:max-w-xl
                rounded-full
                bg-black/55 text-white
                text-[10px] sm:text-sm font-medium"
              >
                <svg
                  className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0 text-[#ff6b6b]"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z"
                    fill="currentColor"
                    fillOpacity="0.2"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinejoin="round"
                  />
                  <path d="M12 9v4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  <circle cx="12" cy="16.6" r="1" fill="currentColor" />
                </svg>
                <span className="leading-snug text-center sm:text-left">
                  <span className="text-[#ff8a8a] font-semibold">ATTENTION:</span>{" "}
                  Agencies & Lean HR Teams Drowning in Applications
                </span>
              </div>
            </div>
          </motion.div>

          <HeroHeadline />

          {/* Sub Text */}
          <motion.p
            variants={heroItem}
            className="mt-5 sm:mt-6 text-center text-white/90 text-[14px] sm:text-xl max-w-4xl px-4 mb-6 sm:mb-8"
          >
            Aptahire runs your complete automated recruiter journey across three
            screening types (Resume → Phone → Video), plus JD creation, multi-round
            interviews, cheat detection, and detailed candidate reports, so
            agencies handle 10X volume, close roles in days, and maintain 75%
            margins without burnout.
          </motion.p>

          <HeroPreviewImage isPopupOpen={isPopupOpen} />
        </motion.div>
      </section>

      {/* ================= STATS + CTA ================= */}
      <section className="relative z-10 bg-white pt-6 sm:pt-8 md:pt-10 pb-14 sm:pb-20 text-center px-4">
        <div
          ref={statsRef}
          className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 max-w-4xl mx-auto"
        >
          <StatCard value="70%" label="Faster Time-to-Hire" start={statsStarted} />
          <StatCard value="90%" label="Reduction in Cost per Hire" start={statsStarted} />
          <StatCard value="10×" label="Candidate Volume Handled" start={statsStarted} />
        </div>

        <div className="relative mt-8 sm:mt-10 flex flex-col items-center">
          <button
            onClick={() => {
              document.getElementById("contact")?.scrollIntoView({
                behavior: "smooth",
              });
            }}
            className="group relative inline-flex items-center justify-center
    rounded-xl
    px-6 sm:px-8 py-3.5 sm:py-4
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
    overflow-hidden
    w-full max-w-md sm:w-auto sm:max-w-none"
          >
            <span
              className="
    absolute top-0 -left-[45%] w-[45%] h-full 
    bg-white/50 z-0 
    transition-all duration-[1000ms] ease-[cubic-bezier(0.4,0,0.2,1)]
    [clip-path:polygon(0%_0%,55%_0%,100%_100%,25%_100%)]
    group-hover:left-full
    group-hover:opacity-0
  "
            />

            <span
              className="
    absolute inset-0 bg-white/5
    opacity-0 group-hover:opacity-100
    transition-opacity duration-500
  "
            />

            <span className="relative z-10">Fill Your Hiring Pipeline Fast</span>
          </button>

          <p className="mt-3 text-indigo-600 font-semibold text-sm sm:text-base text-center px-2">
            Join AI-powered agencies recommending top talent at scale.
          </p>

          <ProgressLoad />
        </div>
      </section>
    </>
  );
}
