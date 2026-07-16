import React from "react";

const WarningIcon = ({ className = "h-4 w-4" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z"
      fill="#fff"
      fillOpacity="0.15"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
    <path d="M12 9v4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <circle cx="12" cy="16.6" r="1" fill="currentColor" />
  </svg>
);

const Header = () => {
  return (
    <div
      className="w-full bg-[#c62828] text-white text-center
        py-2 px-3 sm:px-4
        text-xs sm:text-sm md:text-[15px] font-medium"
      role="status"
    >
      <div className="inline-flex items-center justify-center gap-2 max-w-5xl mx-auto">
        <WarningIcon className="header-warning-icon h-[15px] w-[15px] sm:h-4 sm:w-4 shrink-0 text-white" />
        <p className="leading-snug">
          Only 7 Free Workflow Review Spots Left — Agencies Are Claiming Them Fast.
        </p>
      </div>
    </div>
  );
};

export default Header;
