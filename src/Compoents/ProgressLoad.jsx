import React, { useEffect, useRef, useState } from "react";

const TOTAL = 20;
const SLOTS_LEFT = 7;
const CLAIMED = TOTAL - SLOTS_LEFT; // 13

export default function ProgressLoad() {
  const [filled, setFilled] = useState(0);
  const [done, setDone] = useState(false);
  const containerRef = useRef(null);
  const startedRef = useRef(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || startedRef.current) return;
        startedRef.current = true;

        let i = 0;
        const tick = () => {
          i += 1;
          setFilled(i);
          if (i < CLAIMED) {
            setTimeout(tick, i < 8 ? 100 : 75);
          } else {
            setDone(true);
          }
        };
        setTimeout(tick, 250);
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const left = TOTAL - filled;

  return (
    <div
      ref={containerRef}
      className="w-full py-3 sm:py-4 flex flex-col items-center gap-2.5 bg-transparent"
    >
      <div
        className="flex items-end gap-[3px] sm:gap-1.5 md:gap-2"
        role="img"
        aria-label={`${filled} of ${TOTAL} slots claimed, ${left} left`}
      >
        {Array.from({ length: TOTAL }).map((_, i) => {
          const isClaimed = i < filled;
          const isOpenSlot = i >= CLAIMED;
          const justFilled = i === filled - 1 && filled > 0 && !done;

          return (
            <div
              key={i}
              className={`
                relative
                h-4 w-2 sm:h-7 sm:w-3.5 md:w-4
                rounded-[3px] sm:rounded-sm
                transition-all duration-200 ease-out
                ${justFilled ? "scale-y-110" : "scale-y-100"}
                ${
                  isClaimed
                    ? "bg-indigo-600"
                    : isOpenSlot
                      ? done
                        ? "bg-red-500/90"
                        : "bg-slate-300"
                      : "bg-slate-300"
                }
              `}
            >
              {/* thin underline for the open ones when done */}
              {isOpenSlot && done && (
                <span className="absolute -bottom-1 left-0 right-0 h-[2px] rounded-full bg-red-500/70" />
              )}
            </div>
          );
        })}
      </div>

      <p
        className={`text-xs sm:text-sm font-semibold transition-colors duration-300 ${
          done ? "text-red-600" : "text-slate-500"
        }`}
      >
        {done
          ? `Only ${SLOTS_LEFT} slots left this week`
          : `${left} slots remaining…`}
      </p>
    </div>
  );
}
