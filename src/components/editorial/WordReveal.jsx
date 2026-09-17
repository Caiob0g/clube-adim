import React from "react";
import { motion } from "framer-motion";
import { EASE_OUT_EXPO } from "./StackedLines";

export default function WordReveal({
  text,
  as: Tag = "p",
  className = "",
  stagger = 0.05,
  baseDelay = 0,
  duration = 0.7,
  id,
}) {
  const words = text.split(" ");
  return (
    <Tag id={id} className={className}>
      {words.map((w, i) => (
        <span key={i} className="inline-block">
          <motion.span
            className="inline-block"
            initial={{ y: 14, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration, ease: EASE_OUT_EXPO, delay: baseDelay + i * stagger }}
          >
            {w}
          </motion.span>
          {i < words.length - 1 && "\u00A0"}
        </span>
      ))}
    </Tag>
  );
}
