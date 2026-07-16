import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import ProgressLoad from "./ProgressLoad";

const data = [
  {
    metric: "Resume screening",
    before: 23,
    after: 2.3,
    improvement: 90,
    unit: "hrs",
    prefix: "",
    decimals: { before: 0, after: 1 },
    label: "faster",
  },
  {
    metric: "Interview scheduling",
    before: 18,
    after: 5,
    improvement: 72,
    unit: "hrs",
    prefix: "",
    decimals: { before: 0, after: 0 },
    label: "faster",
  },
  {
    metric: "Interview execution",
    before: 54,
    after: 5.4,
    improvement: 90,
    unit: "hrs",
    prefix: "",
    decimals: { before: 0, after: 1 },
    label: "faster",
  },
  {
    metric: "Cost per hire",
    before: 4700,
    after: 470,
    improvement: 90,
    unit: "",
    prefix: "$",
    decimals: { before: 0, after: 0 },
    label: "reduction",
    formatMoney: true,
  },
];

function formatValue(n, row, which) {
  const decimals = row.decimals[which];
  const rounded = decimals > 0 ? n.toFixed(decimals) : Math.round(n).toString();
  if (row.formatMoney) {
    return `${row.prefix}${Number(rounded).toLocaleString()}`;
  }
  return `${row.prefix}${rounded}${row.unit ? ` ${row.unit}` : ""}`;
}

function useCountUp({ to, duration = 1400, start = false, decimals = 0 }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) {
      setValue(0);
      return;
    }

    let frame;
    const startTime = performance.now();

    const tick = (now) => {
      const t = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      const next = to * eased;
      setValue(decimals > 0 ? next : Math.round(next));
      if (t < 1) frame = requestAnimationFrame(tick);
      else setValue(to);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [to, duration, start, decimals]);

  return value;
}

function AnimatedCell({ row, which, start, delay, className }) {
  const target = which === "before" ? row.before : row.after;
  const decimals = row.decimals[which];
  const count = useCountUp({
    to: target,
    duration: which === "before" ? 1100 : 1400,
    start,
    decimals,
  });

  // display delayed start via CSS opacity until parent triggers — actual count starts with `start`
  const display =
    decimals > 0 && typeof count === "number"
      ? formatValue(Number(count), row, which)
      : formatValue(count, row, which);

  return (
    <motion.span
      initial={{ opacity: 0, y: 8 }}
      animate={start ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.4 }}
      className={`tabular-nums inline-block ${className}`}
    >
      {display}
    </motion.span>
  );
}

function ImprovementCell({ row, start, delay }) {
  const pct = useCountUp({ to: row.improvement, duration: 1500, start, decimals: 0 });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={start ? { opacity: 1 } : {}}
      transition={{ delay, duration: 0.4 }}
      className="flex flex-col items-center gap-2 w-full max-w-[180px] mx-auto"
    >
      <div className="flex items-center gap-2 font-semibold text-green-600">
        <i className="fa-solid fa-arrow-down text-sm" />
        <span className="tabular-nums">
          {pct}% {row.label}
        </span>
      </div>
      <div className="w-full h-1.5 rounded-full bg-green-100 overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-green-500"
          initial={{ width: 0 }}
          animate={start ? { width: `${row.improvement}%` } : { width: 0 }}
          transition={{ delay: delay + 0.15, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </motion.div>
  );
}

function MetricRow({ row, index, start }) {
  const delay = index * 0.12;

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={start ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="grid grid-cols-4 border-t border-slate-200 text-base items-center"
    >
      <div className="px-6 py-6 font-medium text-slate-900">{row.metric}</div>

      <div className="px-6 py-6 text-center font-semibold text-red-600">
        <AnimatedCell row={row} which="before" start={start} delay={delay + 0.1} className="text-red-600" />
      </div>

      <div className="px-6 py-6 text-center font-semibold text-green-600">
        <AnimatedCell row={row} which="after" start={start} delay={delay + 0.2} className="text-green-600" />
      </div>

      <div className="px-6 py-6">
        <ImprovementCell row={row} start={start} delay={delay + 0.25} />
      </div>
    </motion.div>
  );
}

function MobileCard({ row, index, start }) {
  const delay = index * 0.1;
  const before = useCountUp({
    to: row.before,
    duration: 1100,
    start,
    decimals: row.decimals.before,
  });
  const after = useCountUp({
    to: row.after,
    duration: 1400,
    start,
    decimals: row.decimals.after,
  });
  const pct = useCountUp({ to: row.improvement, duration: 1500, start, decimals: 0 });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={start ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.5 }}
      className="bg-white rounded-2xl shadow-md p-5 border border-slate-100"
    >
      <h3 className="text-lg font-semibold text-slate-900 mb-3">{row.metric}</h3>

      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <p className="text-slate-500">Before</p>
          <p className="font-semibold text-red-600 tabular-nums">
            {formatValue(
              row.decimals.before > 0 ? Number(before) : before,
              row,
              "before"
            )}
          </p>
        </div>
        <div>
          <p className="text-slate-500">After</p>
          <p className="font-semibold text-green-600 tabular-nums">
            {formatValue(
              row.decimals.after > 0 ? Number(after) : after,
              row,
              "after"
            )}
          </p>
        </div>
      </div>

      <div className="mt-4">
        <div className="flex items-center gap-2 text-green-700 font-semibold text-sm mb-2">
          <i className="fa-solid fa-arrow-down" />
          <span className="tabular-nums">
            {pct}% {row.label}
          </span>
        </div>
        <div className="w-full h-1.5 rounded-full bg-green-100 overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-green-500"
            initial={{ width: 0 }}
            animate={start ? { width: `${row.improvement}%` } : { width: 0 }}
            transition={{ delay: delay + 0.2, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
      </div>
    </motion.div>
  );
}

const AptahireImpactTable = () => {
  const ref = useRef(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="bg-white py-14 sm:py-20 overflow-x-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6" ref={ref}>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={started ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 mb-10 sm:mb-12"
        >
          What Changes After You Implement Aptahire
        </motion.h2>

        {/* Desktop */}
        <div className="hidden md:block rounded-2xl overflow-hidden shadow-xl bg-white border border-slate-100">
          <div className="grid grid-cols-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold">
            <div className="px-6 py-5">Metric</div>
            <div className="px-6 py-5 text-center">Before Aptahire</div>
            <div className="px-6 py-5 text-center">After Aptahire</div>
            <div className="px-6 py-5 text-center">Improvement</div>
          </div>

          {data.map((row, i) => (
            <MetricRow key={row.metric} row={row} index={i} start={started} />
          ))}
        </div>

        {/* Mobile */}
        <div className="md:hidden space-y-4">
          {data.map((row, i) => (
            <MobileCard key={row.metric} row={row} index={i} start={started} />
          ))}
        </div>
      </div>

      <div className="mt-12 sm:mt-14 flex flex-col items-center gap-3 px-4">
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
          <span className="relative z-10 px-1">Fit Aptahire To Your Workflow</span>
        </button>

        <p className="text-indigo-600 font-semibold text-sm sm:text-base text-center">
          Go live in weeks; don’t wait while top talent disappears.
        </p>

        <ProgressLoad />
      </div>
    </section>
  );
};

export default AptahireImpactTable;
