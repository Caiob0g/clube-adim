import React from "react";

export default function CarouselDots({ count, active, onChange, tone = "dark" }) {
  const light = tone === "light";
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: count }).map((_, i) => {
        const isActive = i === active;
        return (
          <button
            key={i}
            type="button"
            aria-label={`Ir para o slide ${i + 1}`}
            aria-current={isActive}
            onClick={() => onChange(i)}
            className="p-1.5"
          >
            <span
              className={`block h-1.5 rounded-full transition-all duration-300 ${
                isActive ? "w-5" : "w-1.5"
              } ${
                isActive
                  ? light ? "bg-white" : "bg-stone-950"
                  : light ? "bg-white/40" : "bg-stone-200"
              }`}
            />
          </button>
        );
      })}
    </div>
  );
}
