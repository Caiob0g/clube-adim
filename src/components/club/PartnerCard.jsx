import React from "react";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

export default function PartnerCard({ partner, onSelect }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      whileHover={{ y: -8 }}
      whileTap={{ scale: 0.985 }}
      transition={{ type: "spring", stiffness: 180, damping: 26 }}
      onClick={() => onSelect(partner)}
      className="group flex h-full cursor-pointer flex-col justify-between rounded-3xl border border-stone-200 bg-stone-50 p-6 transition-colors duration-300 hover:border-stone-300 sm:p-7"
    >
      <div>
        <div className="flex items-start justify-between gap-4 text-xs font-medium uppercase tracking-[0.18em] text-stone-500">
          <span>{partner.category}</span>
          {partner.city && (
            <span className="flex items-center gap-1.5 normal-case tracking-normal">
              <MapPin className="h-3.5 w-3.5" strokeWidth={1.8} />
              {partner.city}
            </span>
          )}
        </div>
        <h3 className="mt-5 text-2xl font-medium leading-tight tracking-tight text-stone-950">{partner.name}</h3>
        {partner.description && (
          <p className="mt-2 text-sm leading-relaxed text-stone-500 line-clamp-2">{partner.description}</p>
        )}
      </div>

      <div className="mt-6 flex items-end justify-between gap-4 border-t border-stone-200 pt-5">
        <p className="text-sm font-medium leading-snug text-brand-dark">{partner.benefit}</p>
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-stone-200 text-stone-950 transition-colors duration-300 group-hover:border-stone-950 group-hover:bg-stone-950 group-hover:text-white">
          <svg viewBox="0 0 24 24" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </span>
      </div>
    </motion.div>
  );
}
