import React from "react";
import ProgressLoad from "./ProgressLoad";
const data = [
  {
    metric: "Resume screening",
    before: "23 hrs",
    after: "2.3 hrs",
    improvement: "90% faster",
  },
  {
    metric: "Interview scheduling",
    before: "18 hrs",
    after: "5 hrs",
    improvement: "72% faster",
  },
  {
    metric: "Interview execution",
    before: "54 hrs",
    after: "5.4 hrs",
    improvement: "90% faster",
  },
  {
    metric: "Cost per hire",
    before: "$4,700",
    after: "$470",
    improvement: "90% reduction",
  },
];

const AptahireImpactTable = () => {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Heading */}
        <h2 className="text-center text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 mb-10 sm:mb-12">
          What Changes After You Implement Aptahire
        </h2>

        {/* ================= DESKTOP TABLE ================= */}
        <div className="hidden md:block rounded-2xl overflow-hidden shadow-xl bg-white">
          {/* Header */}
          <div className="grid grid-cols-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold">
            <div className="px-6 py-5">Metric</div>
            <div className="px-6 py-5 text-center">Before Aptahire</div>
            <div className="px-6 py-5 text-center">After Aptahire</div>
            <div className="px-6 py-5 text-center">Improvement</div>
          </div>

          {/* Rows */}
          {data.map((row, i) => (
            <div
              key={i}
              className="grid grid-cols-4 border-t border-slate-200 text-base"
            >
              <div className="px-6 py-6 font-medium text-slate-900">
                {row.metric}
              </div>

              <div className="px-6 py-6 text-center font-semibold text-red-600">
                {row.before}
              </div>

              <div className="px-6 py-6 text-center font-semibold text-green-600">
                {row.after}
              </div>

              <div className="px-6 py-6 text-center font-semibold text-green-600 flex items-center justify-center gap-2">
                <i className="fa-solid fa-arrow-down"></i>
                {row.improvement}
              </div>
            </div>
          ))}
        </div>

        {/* ================= MOBILE CARDS ================= */}
        <div className="md:hidden space-y-4">
          {data.map((row, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow-md p-5 border border-slate-100"
            >
              <h3 className="text-lg font-semibold text-slate-900 mb-3">
                {row.metric}
              </h3>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-slate-500">Before</p>
                  <p className="font-semibold text-red-600">{row.before}</p>
                </div>

                <div>
                  <p className="text-slate-500">After</p>
                  <p className="font-semibold text-green-600">{row.after}</p>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-2 text-green-700 font-semibold text-sm">
                <i className="fa-solid fa-arrow-down"></i>
                {row.improvement}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="mt-14 flex flex-col items-center">
        
          <button onClick={() => {
    document.getElementById("contact")?.scrollIntoView({
      behavior: "smooth",
    });
  }}
  className="group relative inline-flex items-center justify-center
    rounded-xl
    px-7 sm:px-8 py-4
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
    overflow-hidden"
>
  {/* Soft Glow Overlay */}
  <span className="
    absolute top-0 -left-[45%] w-[45%] h-full 
    bg-white/50 z-0 
    transition-all duration-[1000ms] ease-[cubic-bezier(0.4,0,0.2,1)]
    [clip-path:polygon(0%_0%,55%_0%,100%_100%,25%_100%)]
    group-hover:left-full
    group-hover:opacity-0
  "></span>

                                {/* Soft glow overlay */}
                                <span className="
    absolute inset-0 bg-white/5
    opacity-0 group-hover:opacity-100
    transition-opacity duration-500
  "></span>

  {/* Button Text */}
  <span className="relative z-10">
     Fit Aptahire To Your Workflow
  </span>
</button>

        <p className="mt-3 text-indigo-600 font-semibold text-sm sm:text-base text-center">
        Go live in weeks; don’t wait while top talent disappears.

        </p>

        <ProgressLoad />

      </div>



      
    </section>
  );
};

export default AptahireImpactTable;
