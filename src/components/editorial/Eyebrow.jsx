import React from "react";

export default function Eyebrow({ children, tone = "dark" }) {
  const light = tone === "light";
  return (
    <span
      className={`inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.22em] ${
        light ? "text-white/70" : "text-stone-500"
      }`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${light ? "bg-white" : "bg-brand"}`} />
      {children}
    </span>
  );
}
