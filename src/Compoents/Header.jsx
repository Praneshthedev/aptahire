import React from "react";
import logo from "../assets/aptahire-logo.webp";

const Header = () => {
  return (
    <>
      {/* 🔴 Top Attention Bar */}
     <div
  className="w-full text-black text-center py-2 sm:px-4 px-1
  text-xs sm:text-sm md:text-base font-semibold
  bg-[#ffeb3c]"
>
  
   
  ⚠️ Only 7 Free Workflow Review Spots Left - Agencies Are Claiming Them Fast.
</div>

      {/* 🧭 Header */}
      {/* <header className="w-full bg-white border-b border-gray-200 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
          
     <div className="flex flex-col items-center gap-4 lg:flex-row lg:items-center lg:gap-0">
  
  <img
    src={logo}
    alt="Aptahire Logo"
    className="h-10 md:h-12 object-contain shrink-0"
  />

  <div
    className="
      w-full flex justify-center
      lg:absolute lg:left-1/2 lg:-translate-x-1/2
    "
  >
    <span
      className="
        inline-flex items-center gap-2 sm:gap-3
        px-4 sm:px-5 py-2
        rounded-full
        text-xs sm:text-sm md:text-base font-medium
        bg-[#ef44441a] backdrop-blur-md
        border border-[#ef4444]
        text-[#ef4444]
        shadow-md shadow-[#ef4444]/20

        text-center
        max-w-[92%] sm:max-w-[80%] md:max-w-[65%] lg:max-w-none
      "
    >
      <span className="relative flex h-4 w-4 sm:h-5 sm:w-5 shrink-0">
        <span className="absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75 animate-ping" />
        <span className="relative inline-flex h-full w-full rounded-full bg-red-500" />
      </span>

      <span className="leading-tight">
        ATTENTION: Agencies & Lean HR Teams Drowning in Applications
      </span>
    </span>
  </div>

</div>

        </div>
      </header> */}
    </>
  );
};

export default Header;
