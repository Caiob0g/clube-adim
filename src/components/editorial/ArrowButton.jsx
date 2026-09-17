import React from "react";
import { motion } from "framer-motion";

export default function ArrowButton({ direction = "next", variant = "outline", onClick, label }) {
  const styles =
    variant === "solid"
      ? "bg-stone-950 border-stone-950 text-white hover:bg-brand-dark hover:border-brand-dark"
      : "border-stone-200 text-stone-950 hover:border-stone-950";
  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-label={label}
      whileHover="hover"
      className={`grid h-12 w-12 place-items-center rounded-full border transition-colors duration-300 sm:h-14 sm:w-14 ${styles}`}
    >
      <motion.svg
        variants={{ hover: { scale: 1.15 } }}
        transition={{ type: "spring", stiffness: 320, damping: 18 }}
        viewBox="0 0 24 24"
        className={`h-5 w-5 ${direction === "prev" ? "-scale-x-100" : ""}`}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5 12h14M13 6l6 6-6 6" />
      </motion.svg>
    </motion.button>
  );
}
