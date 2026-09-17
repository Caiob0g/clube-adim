import React from "react";
import { motion } from "framer-motion";

const variants = {
  light: "bg-white text-brand-dark hover:bg-stone-950 hover:text-white",
  solid: "bg-stone-950 text-white hover:bg-brand-dark",
  outline: "border border-current text-stone-950 hover:bg-stone-950 hover:text-white",
};

export default function PillButton({ children, variant = "light", className = "", ...rest }) {
  return (
    <motion.a
      whileHover="hover"
      className={`inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium uppercase tracking-wide transition-colors duration-300 ${variants[variant]} ${className}`}
      {...rest}
    >
      {children}
      <motion.svg
        variants={{ hover: { x: 5 } }}
        transition={{ type: "spring", stiffness: 320, damping: 20 }}
        viewBox="0 0 24 24"
        className="h-4 w-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5 12h14M13 6l6 6-6 6" />
      </motion.svg>
    </motion.a>
  );
}
