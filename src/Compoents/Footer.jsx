import React from "react";
import logo from "../assets/aptahire-logo.webp"; // update path if needed

export default function Footer() {
  return (
    <footer className="bg-slate-50 border-t border-slate-200 py-10 sm:mb-20 mb-36">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <img
            src={logo}
            alt="Aptahire Logo"
            className="h-16 w-auto"
          />
        </div>

        {/* Copyright */}
        <p className="text-center text-base text-slate-500">
          © 2026 Aptahire. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
