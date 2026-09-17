import React from "react";
import { motion } from "framer-motion";
import { EASE_OUT_EXPO } from "./StackedLines";

export default function GhostWord({ word, ink = false, x, slideKey }) {
  return (
    <motion.span style={{ x }} className="block overflow-hidden pb-[0.12em] -mb-[0.12em]">
      <motion.span
        key={`${slideKey}-${word}`}
        initial={{ y: "115%", opacity: 0 }}
        animate={{ y: "0%", opacity: 1 }}
        transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
        className={`block ${ink ? "text-stone-950" : "text-stone-200"}`}
      >
        {word}
      </motion.span>
    </motion.span>
  );
}
