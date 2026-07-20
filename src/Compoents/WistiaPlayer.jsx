import React, { useEffect, useRef, useState } from "react";

const WISTIA_MEDIA_ID = "8gosrmsfk3";

function loadWistiaScripts() {
  if (document.querySelector("script[data-wistia-player]")) return;

  const player = document.createElement("script");
  player.src = "https://fast.wistia.com/player.js";
  player.async = true;
  player.dataset.wistiaPlayer = "true";
  document.head.appendChild(player);

  const embed = document.createElement("script");
  embed.src = `https://fast.wistia.com/embed/${WISTIA_MEDIA_ID}.js`;
  embed.async = true;
  embed.type = "module";
  embed.dataset.wistiaPlayer = "true";
  document.head.appendChild(embed);
}

export default function WistiaPlayer({ className = "" }) {
  const wrapRef = useRef(null);
  const [interactive, setInteractive] = useState(false);

  useEffect(() => {
    loadWistiaScripts();
  }, []);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap || interactive) return;

    const onWheel = (e) => {
      e.preventDefault();
      e.stopPropagation();
      window.scrollBy({ top: e.deltaY, left: 0, behavior: "auto" });
    };

    wrap.addEventListener("wheel", onWheel, { passive: false, capture: true });
    return () => wrap.removeEventListener("wheel", onWheel, { capture: true });
  }, [interactive]);

  useEffect(() => {
    const wrap = wrapRef.current;
    const player = wrap?.querySelector("wistia-player");
    if (!player) return;

    const clampPlayer = () => {
      player.style.setProperty("position", "absolute", "important");
      player.style.setProperty("inset", "0", "important");
      player.style.setProperty("width", "100%", "important");
      player.style.setProperty("height", "100%", "important");
      player.style.setProperty("max-height", "100%", "important");
      player.style.setProperty("padding", "0", "important");
      player.style.setProperty("margin", "0", "important");
    };

    clampPlayer();
    const observer = new MutationObserver(clampPlayer);
    observer.observe(player, { attributes: true, childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!interactive) return;

    const onDocPointerDown = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) {
        setInteractive(false);
      }
    };

    document.addEventListener("pointerdown", onDocPointerDown);
    return () => document.removeEventListener("pointerdown", onDocPointerDown);
  }, [interactive]);

  return (
    <div
      ref={wrapRef}
      className={`hero-wistia-wrap shadow-2xl bg-black/10 ${
        interactive ? "hero-wistia-wrap--interactive" : ""
      } ${className}`}
    >
      <wistia-player media-id={WISTIA_MEDIA_ID} aspect="1.7777777777777777" />
      {!interactive && (
        <div
          className="hero-wistia-scroll-shield"
          onClick={() => setInteractive(true)}
          aria-label="Click to interact with video"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setInteractive(true);
            }
          }}
        />
      )}
    </div>
  );
}
