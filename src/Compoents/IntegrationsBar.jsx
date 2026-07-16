/**
 * IntegrationsBar Component
 * Infinite looping logo slider
 */

import greenhouse from "../assets/green.png";
import lever from "../assets/le.png";
import workday from "../assets/work.png";
import sap from "../assets/download.jpg";
import bamboohr from "../assets/sma.png";
import salesforce from "../assets/sal.png";

const logos = [
  { name: "Greenhouse", src: greenhouse },
  { name: "Lever", src: lever },
  { name: "Workday", src: workday },
  { name: "SAP", src: sap },
  { name: "BambooHR", src: bamboohr },
  { name: "Salesforce", src: salesforce },
];

export default function IntegrationsBar() {
  return (
    <section className="border-y border-slate-200 bg-white py-12 sm:py-16 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* HEADING */}
        <h2 className="
          text-center
          text-2xl sm:text-3xl md:text-[40px]
          font-extrabold
          text-slate-900
          mb-10 sm:mb-14
          capitalize
        ">
          Works Seamlessly With the Tools You Already Use
        </h2>

        {/* SLIDER WRAPPER */}
        <div className="relative overflow-hidden">

          {/* GRADIENT EDGES */}
          <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-16 sm:w-24 bg-gradient-to-r from-white to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-16 sm:w-24 bg-gradient-to-l from-white to-transparent" />

          {/* SLIDER */}
          <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
            {[...logos, ...logos].map((logo, i) => (
              <div
                key={i}
                className="
                  mx-3 sm:mx-5 lg:mx-6
                  flex items-center justify-center
                  h-16 sm:h-20
                  w-28 sm:w-36
                  bg-white
                "
              >
                <img
                  src={logo.src}
                  alt={logo.name}
                  className="h-8 sm:h-12 object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CUSTOM ANIMATION */}
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 28s linear infinite;
        }
      `}</style>
    </section>
  );
}
