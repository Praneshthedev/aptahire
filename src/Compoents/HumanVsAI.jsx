import React from "react";
import { motion } from "framer-motion";
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

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.06,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const HumanVsAI = () => {
  return (
    <section className="bg-[#f7f4ff] py-14 sm:py-20 overflow-x-hidden">
      <motion.div
        className="max-w-6xl mx-auto px-4 sm:px-6"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.h2
          variants={item}
          className="text-center text-2xl sm:text-3xl md:text-[40px] font-extrabold text-slate-900 px-1"
        >
          AI Assists. Humans Decide. Always.
        </motion.h2>

        <motion.p
          variants={item}
          className="mt-5 sm:mt-6 text-center text-slate-600 max-w-3xl mx-auto leading-relaxed text-sm sm:text-base"
        >
          Aptahire doesn't replace recruiters it removes the grunt work. AI
          handles JD creation, screening, interviews, and reports. Recruiters
          focus on judgment, context, relationships, and final decisions. This
          balance is why Aptahire works across agencies and in-house teams.
        </motion.p>

        <div className="mt-10 sm:mt-14 grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-6 sm:gap-8 md:gap-10 items-stretch md:items-center">
          <motion.div
            variants={item}
            className="bg-white rounded-2xl shadow-md p-5 sm:p-8"
          >
            <h3 className="text-center text-xl sm:text-2xl font-semibold text-red-500">
              Manual Hiring
            </h3>
            <div className="h-px bg-red-200 my-4" />

            <div className="flex justify-center my-5">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-red-100 flex items-center justify-center">
                <i className="fa-solid fa-triangle-exclamation text-red-600 text-lg sm:text-xl" />
              </div>
            </div>

            <p className="text-center text-sm sm:text-base italic text-slate-500 mb-6">
              Chaos, endless calls, calendar conflicts
            </p>

            <ul className="space-y-3 sm:space-y-4 text-sm sm:text-base text-slate-700">
              {manualPoints.map((point, i) => (
                <li key={i} className="flex items-start gap-3">
                  <i className="fa-solid fa-xmark text-red-500 mt-1 shrink-0" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            variants={item}
            className="flex justify-center md:block"
          >
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-indigo-100 flex items-center justify-center">
              <i className="fa-solid fa-arrow-down md:hidden text-indigo-600 text-lg" />
              <i className="fa-solid fa-arrow-right hidden md:inline text-indigo-600 text-xl" />
            </div>
          </motion.div>

          <motion.div
            variants={item}
            className="bg-white rounded-2xl shadow-md p-5 sm:p-8"
          >
            <h3 className="text-center text-xl sm:text-2xl font-semibold text-green-600">
              With Aptahire
            </h3>
            <div className="h-px bg-green-200 my-4" />

            <div className="flex justify-center my-5">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-green-100 flex items-center justify-center">
                <i className="fa-solid fa-check text-green-600 text-lg sm:text-xl" />
              </div>
            </div>

            <p className="text-center text-sm sm:text-base italic text-slate-500 mb-6">
              Clean dashboards, streamlined process
            </p>

            <ul className="space-y-3 sm:space-y-4 text-sm sm:text-base text-slate-700">
              {aiPoints.map((point, i) => (
                <li key={i} className="flex items-start gap-3">
                  <i className="fa-solid fa-check text-green-600 mt-1 shrink-0" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <motion.div
          variants={item}
          className="mt-12 sm:mt-14 flex flex-col items-center gap-3 px-1"
        >
          <button
            onClick={() => {
              document.getElementById("contact")?.scrollIntoView({
                behavior: "smooth",
              });
            }}
            className="group relative inline-flex items-center justify-center
    rounded-xl
    px-5 sm:px-8 py-3.5 sm:py-4
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
    overflow-hidden
    w-full max-w-xl sm:max-w-3xl
    leading-snug"
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
            <span className="relative z-10 px-1">
              Deploy Your 24/7 AI Recruiter Now
            </span>
          </button>

          <p className="text-indigo-600 font-semibold text-sm sm:text-base text-center">
            Don’t let faster competitors steal your best candidates
          </p>

          <ProgressLoad />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HumanVsAI;
