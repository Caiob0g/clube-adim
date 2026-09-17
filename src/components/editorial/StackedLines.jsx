import React from "react";
import { motion } from "framer-motion";

export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1];

export default function StackedLines({
  lines,
  as: Tag = "h2",
  className = "",
  stagger = 0.1,
  baseDelay = 0,
  duration = 0.85,
  id,
}) {
  return (
    <Tag id={id} className={className}>
      {lines.map((line, i) => (
        <motion.span
          key={i}
          className="block"
          initial={{ y: 26, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration, ease: EASE_OUT_EXPO, delay: baseDelay + i * stagger }}
        >
          {line}
        </motion.span>
      ))}
    </Tag>
  );
}
