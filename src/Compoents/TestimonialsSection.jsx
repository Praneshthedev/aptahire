import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import image1 from "../assets/5.png";
import image2 from "../assets/3.png";
import image3 from "../assets/8.png";

const testimonials = [
  {
    name: "Marcus Reynolds",
    role: "Agency Owner",
    company: "Sterling Talent Solutions",
    image: image1,
    quote:
      "100% recommend Aptahire for any agency trying to protect margins without slashing quality. We went from spending 12 hours per role on screening and scheduling to under 2 hours. The AI handles the grunt work, and my team focuses on closing. Our speed-to-submission dropped from 5 days to under 24 hours, and clients are noticing.",
  },
  {
    name: "Sarah Mitchell",
    role: "Head of Talent Acquisition",
    company: "TechVentures Asia",
    image: image2,
    quote:
      "Brilliant tool! Being someone who was skeptical about AI interviews, Aptahire's cheat detection and candidate ranking changed my mind completely. The detailed reports give us confidence we're not missing great people buried in 500+ applications. Support is phenomenal; they walked us through integration in under a week. Absolute must-have if you're hiring at scale!",
  },
  {
    name: "David Harding",
    role: "Senior Recruiter",
    company: "GlobalHire Partners",
    image: image3,
    quote:
      "The setup is straightforward and takes a lot of hassle out of trying to juggle 15 open roles at once. Before Aptahire, I was drowning in admin reformatting CVs, chasing no-shows, manually scheduling. Now the AI does the heavy lifting and I spend time on relationship building and offer negotiations. I would recommend this to any recruiter or agency juggling volume and speed!",
  },
];

export default function AutoSlidingTestimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;

    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 3500);

    return () => clearInterval(timer);
  }, [paused]);

  const getCard = (offset) =>
    testimonials[(index + offset + testimonials.length) % testimonials.length];

  return (
    <section className="bg-gradient-to-b from-slate-50 to-white py-16 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-[40px] font-extrabold text-slate-900 mb-12">
          Trusted by High-Performance Hiring Teams
        </h2>

        {/* SLIDER */}
        <div
          className="relative flex items-center justify-center gap-6"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* LEFT CARD (DESKTOP ONLY) */}
          <div className="hidden sm:block">
            <TestimonialCard data={getCard(-1)} scale={0.9} opacity={0.4} />
          </div>

          {/* CENTER CARD */}
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="relative z-10 w-full flex justify-center"
            >
              <TestimonialCard data={getCard(0)} highlight />
            </motion.div>
          </AnimatePresence>

          {/* RIGHT CARD (DESKTOP ONLY) */}
          <div className="hidden sm:block">
            <TestimonialCard data={getCard(1)} scale={0.9} opacity={0.4} />
          </div>
        </div>

        {/* DOTS */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`w-3 h-3 rounded-full transition ${
                i === index ? "bg-indigo-600" : "bg-slate-300"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* TESTIMONIAL CARD */
function TestimonialCard({ data, highlight, scale = 1, opacity = 1 }) {
  return (
    <motion.div
      style={{ scale, opacity }}
      className={`w-full sm:w-[520px] mx-auto rounded-3xl bg-white
        p-6 sm:p-8 shadow-xl transition-all flex flex-col
        ${highlight ? "ring-2 ring-indigo-500 shadow-indigo-200" : ""}
      `}
    >
      {/* HEADER */}
      <div className="flex items-center gap-4 mb-4">
        <img
          src={data.image}
          alt={data.name}
          className="w-12 h-12 rounded-full ring-2 ring-indigo-500 shrink-0"
        />
        <div className="text-left">
          <p className="font-bold text-slate-900 leading-tight">
            {data.name}
          </p>
          <p className="text-sm text-slate-600 leading-tight">
            {data.role}
          </p>
          <p className="text-sm font-semibold text-indigo-600 leading-tight">
            {data.company}
          </p>
        </div>
      </div>

      {/* QUOTE */}
      <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
        “{data.quote}”
      </p>

      {/* STARS */}
      <div className="flex gap-1 mt-4">
        {[...Array(5)].map((_, i) => (
          <i
            key={i}
            className="fa-solid fa-star text-yellow-400 text-sm"
          />
        ))}
      </div>
    </motion.div>
  );
}
