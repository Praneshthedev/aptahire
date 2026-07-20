import React from "react";

/** Fire GIF from /image/fire.gif — screen blend removes black bg */
export default function FireGif({ className = "h-5 w-5" }) {
  return (
    <img
      src={`${import.meta.env.BASE_URL}image/fire.gif`}
      alt=""
      aria-hidden="true"
      className={`shrink-0 object-contain [mix-blend-mode:screen] ${className}`}
      style={{ background: "transparent" }}
    />
  );
}
