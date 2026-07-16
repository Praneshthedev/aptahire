/**
 * RatingsSection Component
 * Displays review platform ratings and customer quotes
 */
import ProgressLoad from "./ProgressLoad";
import profile1 from "../assets/profile1.png";
import profile2 from "../assets/profile2.webp";
import profile3 from "../assets/megha.png";
import profile4 from "../assets/profile4.webp";

export default function RatingsSection() {
  const ratings = [
    {
      platform: "G2 Crowd",
      rating: "5/5",
      description:
        "Rated 5/5 by recruitment agencies for streamlining first-round interviews with AI.",
    },
    {
      platform: "Capterra",
      rating: "4.9/5",
      description:
        "Rated 4.9/5 by in-house TA teams automating screening and shortlisting for high-volume roles.",
    },
    {
      platform: "HR Tech Marketplace",
      rating: "5/5",
      description:
        "Rated 5/5 by HR leaders looking to cut interview costs while improving candidate experience.",
    },
  ];

  const quotes = [
    {
      name: "Paul R.",
      title: "Director, ScaleUp Search",
      image: profile1,
      quote:
        "Couldn't run the agency without it. Aptahire takes over the repetitive screening and scheduling, so my team finally spends their time talking to serious candidates.",
    },
    {
      name: "Priya K.",
      title: "Head of Talent, FintechCo",
      image: profile2,
      quote:
        "The best solution for handling 400+ applications per role. Aptahire ranks and interviews for us and saves at least one full recruiter day per role.",
    },
    {
      name: "Megan L.",
      title: "Senior Recruiter, GlobalTech",
      image: profile3,
      quote:
        "Great alternative to traditional ATS workflows. The AI interviews feel structured but human, and the insight reports make recommendations easy.",
    },
    {
      name: "Victor T.",
      title: "HR Manager, Enterprise BPO",
      image: profile4,
      quote:
        "I was skeptical at first, but Aptahire saves tremendous time and reduces no-shows and fake-candidate issues.",
    },
  ];

  return (
    <section className="bg-gradient-to-b from-slate-50 to-white py-14 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight">
            Hear Why Recruiters and Talent Teams
            <span className="block mt-2 text-blue-600">
              Love Aptahire
            </span>
          </h2>
        </div>

        {/* Rating Platforms */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14 sm:mb-16">
          {ratings.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 sm:p-8
                         shadow-lg border border-slate-200
                         text-center hover:shadow-2xl transition"
            >
              <div className="flex justify-center gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <i
                    key={i}
                    className="fa-solid fa-star text-yellow-400 text-lg"
                  />
                ))}
              </div>

              <h3 className="text-2xl font-bold text-slate-900 mb-2">
                {item.platform}
              </h3>
              <p className="text-3xl font-bold text-blue-600 mb-4">
                {item.rating}
              </p>
              <p className="text-slate-600 text-sm sm:text-base">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Quote Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {quotes.map((q, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-blue-50 to-purple-50
                         rounded-2xl p-6 sm:p-8
                         border border-blue-200
                         hover:shadow-lg transition"
            >
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={q.image}
                  alt={q.name}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-blue-500 shrink-0"
                />
                <div>
                  <p className="font-bold text-slate-900 leading-tight">
                    {q.name}
                  </p>
                  <p className="text-sm text-slate-600 leading-tight">
                    {q.title}
                  </p>
                </div>
              </div>

              <p className="text-slate-700 leading-relaxed italic text-sm sm:text-base">
                “{q.quote}”
              </p>
            </div>
          ))}
        </div>


             {/* CTA */}
        



        <div className="mt-14 flex flex-col items-center text-center gap-3 sm:gap-2">

  {/* CTA Button */}
  <button
    onClick={() => {
      document.getElementById("contact")?.scrollIntoView({
        behavior: "smooth",
      });
    }}
    className="group relative inline-flex items-center justify-center
      rounded-xl
      px-6 sm:px-10 py-3 sm:py-4
      text-sm sm:text-3xl
      font-semibold text-white
      bg-gradient-to-r
      from-[rgb(50_94_235)]
      to-[rgb(140_54_234)]
      shadow-lg shadow-[rgb(50_94_235)/30]
      transition-all duration-300
      hover:scale-[1.04]
      hover:shadow-xl
      active:scale-[0.97]
      overflow-hidden leading-none"
  >
    {/* Shine Sweep */}
    <span
      className="absolute inset-y-0 -left-[45%] w-[45%]
        bg-white/50 z-0
        transition-all duration-[1000ms] ease-[cubic-bezier(0.4,0,0.2,1)]
        [clip-path:polygon(0%_0%,55%_0%,100%_100%,25%_100%)]
        group-hover:left-full
        group-hover:opacity-0"
    />

    {/* Soft Glow Overlay */}
    <span
      className="absolute inset-0 bg-white/5
        opacity-0 group-hover:opacity-100
        transition-opacity duration-500"
    />

    {/* Button Text */}
    <span className="relative z-10 whitespace-nowrap">
      Join 500+ Agencies Hiring Smarter
    </span>
  </button>

  {/* Live Activity */}
  <p className="text-black font-semibold text-xs sm:text-base flex items-center gap-0">
    <span className="">👀</span>
    <span>3 agencies booked while you read this page.</span>
  </p>

  {/* Progress */}
  <div className="w-full max-w-xs">
    <ProgressLoad />
  </div>

  {/* Urgency */}
  <p className="text-red-600 font-semibold tracking-wide ">
    🚨 HURRY! Only 7 slots left this week.
  </p>

</div>
      </div>
    </section>
  );
}
