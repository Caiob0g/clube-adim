import React from "react";
import { motion } from "framer-motion";

const toState = (from) =>
  Object.fromEntries(Object.keys(from).map((k) => [k, k === "opacity" || k === "scale" ? 1 : 0]));

export default function Inview({
  children,
  from = { opacity: 0, y: 28 },
  delay = 0,
  tension = 200,
  friction = 26,
  className = "",
  as = "div",
  ...rest
}) {
  const Comp = motion[as] || motion.div;
  return (
    <Comp
      className={className}
      initial={from}
      whileInView={toState(from)}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ type: "spring", stiffness: tension, damping: friction, delay }}
      {...rest}
    >
      {children}
    </Comp>
  );
}
