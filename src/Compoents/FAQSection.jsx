import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    q: "Will AI send low-quality candidates?",
    a: "No. Every shortlist is backed by interviews, transcripts, recordings, and recruiter-defined criteria.",
  },
  {
    q: "Do we lose control?",
    a: "Never. You control rounds, questions, scoring logic, and final approval.",
  },
  {
    q: "Will candidates hate it?",
    a: "No. Interviews are conversational, flexible, and multilingual not robotic bots.",
  },
  {
    q: "Will this hurt our fees?",
    a: "Agencies use Aptahire to protect margins by proving quality with data-backed reports.",
  },
];

export default function FAQSection() {
  const [open, setOpen] = useState(null);

  return (
    <section className="py-5 
     bg-white">
      <div className="max-w-3xl mx-auto px-4">
        {/* Header */}
        <h2 className="text-3xl sm:text-[40px] font-bold text-center text-slate-900 mb-12 capitalize">
          Common Questions Answered Clearly
        </h2>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((item, index) => {
            const isOpen = open === index;

            return (
              <div
                key={index}
                className="border border-slate-200 rounded-xl"
              >
                {/* Question */}
                <button
                  onClick={() => setOpen(isOpen ? null : index)}
                  className="w-full px-6 py-5 flex justify-between items-center text-left"
                >
                  <span className="text-base sm:text-lg font-medium text-slate-900">
                    {item.q}
                  </span>
                  <span className="text-2xl text-slate-400">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>

                {/* Answer */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-5 text-slate-600">
                        {item.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
