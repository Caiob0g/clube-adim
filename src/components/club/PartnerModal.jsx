import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MapPin, Phone, Globe } from "lucide-react";
import Eyebrow from "@/components/editorial/Eyebrow";

export default function PartnerModal({ partner, open, onClose }) {
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  const contacts = partner
    ? [
        partner.address && { icon: MapPin, label: "Endereço", value: partner.address },
        partner.phone && {
          icon: Phone,
          label: "Telefone",
          value: partner.phone,
          href: `tel:${partner.phone.replace(/\D/g, "")}`,
        },
        partner.website && {
          icon: Globe,
          label: "Site",
          value: partner.website.replace(/^https?:\/\//, ""),
          href: partner.website.startsWith("http") ? partner.website : `https://${partner.website}`,
          external: true,
        },
      ].filter(Boolean)
    : [];

  return (
    <AnimatePresence>
      {open && partner && (
        <div className="fixed inset-0 z-[90] flex items-end justify-center p-3 sm:items-center sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: "spring", stiffness: 240, damping: 30 }}
            onClick={onClose}
            className="absolute inset-0 bg-stone-950/40 backdrop-blur"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0, y: 28, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 28, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 240, damping: 26 }}
            className="relative max-h-[92svh] w-full overflow-y-auto overscroll-contain rounded-[2rem] bg-white p-6 text-stone-950 shadow-2xl shadow-stone-950/30 sm:max-w-xl sm:p-8"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <Eyebrow>
                  {partner.category}
                  {partner.city ? ` · ${partner.city}` : ""}
                </Eyebrow>
                <h2 className="mt-3 text-3xl font-medium leading-[0.95] tracking-tight sm:text-4xl">{partner.name}</h2>
              </div>
              <button
                onClick={onClose}
                aria-label="Fechar"
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-stone-50 transition-colors hover:bg-stone-200"
              >
                <X className="h-4 w-4 transition-transform duration-300 hover:rotate-90" strokeWidth={1.8} />
              </button>
            </div>

            {partner.description && (
              <p className="mt-4 text-sm leading-relaxed text-stone-500">{partner.description}</p>
            )}

            <div className="mt-7 rounded-3xl bg-brand p-6 text-white">
              <Eyebrow tone="light">Benefício</Eyebrow>
              <p className="mt-3 text-xl font-medium leading-snug sm:text-2xl">{partner.benefit}</p>
            </div>

            {partner.how_to_use && (
              <div className="mt-6 rounded-3xl bg-stone-50 p-6">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-stone-500">Como utilizar</p>
                <p className="mt-2 text-sm leading-relaxed text-stone-600">{partner.how_to_use}</p>
              </div>
            )}

            {partner.services?.length > 0 && (
              <div className="mt-6 rounded-3xl bg-stone-50 p-6">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-stone-500">Serviços</p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {partner.services.map((s) => (
                    <li
                      key={s}
                      className="rounded-full border border-stone-200 bg-white px-3 py-1.5 text-xs text-stone-600"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {contacts.length > 0 && (
              <ul className="mt-6">
                {contacts.map(({ icon: Icon, label, value, href, external }) => {
                  const content = (
                    <>
                      <span className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-stone-500">
                        <Icon className="h-4 w-4" strokeWidth={1.8} />
                        {label}
                      </span>
                      <span className="text-sm leading-snug text-stone-950 sm:text-right">{value}</span>
                    </>
                  );
                  const cls = "flex flex-col gap-1.5 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6";
                  return (
                    <li key={label} className="border-t border-stone-200 last:border-b">
                      {href ? (
                        <a href={href} {...(external ? { target: "_blank", rel: "noreferrer" } : {})} className={`${cls} transition-colors hover:text-brand`}>
                          {content}
                        </a>
                      ) : (
                        <div className={cls}>{content}</div>
                      )}
                    </li>
                  );
                })}
              </ul>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
