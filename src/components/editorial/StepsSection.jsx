import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import Eyebrow from "./Eyebrow";
import StackedLines from "./StackedLines";
import Inview from "./Inview";

const steps = [
  { n: "01", name: "Tenha contrato ativo", desc: "O benefício é exclusivo para quem aluga com a Adim Aluguéis." },
  { n: "02", name: "Escolha o parceiro", desc: "Navegue pela rede credenciada e veja a condição de cada estabelecimento." },
  { n: "03", name: "Identifique-se como cliente Adim", desc: "No atendimento, informe que é cliente e apresente um documento." },
  { n: "04", name: "Aproveite a vantagem", desc: "Sem mensalidade, sem carteirinha, sem burocracia." },
];

export default function StepsSection() {
  const [open, setOpen] = useState(null);

  return (
    <section id="como-funciona" className="bg-stone-50 px-6 py-24 sm:px-10">
      <Eyebrow>Como funciona</Eyebrow>
      <StackedLines
        id="steps-title"
        lines={["Simples para", "todo cliente"]}
        className="mt-4 text-4xl font-medium leading-[0.95] tracking-tight text-stone-950 sm:text-5xl"
      />
      <ul className="mt-14">
        {steps.map((s, i) => {
          const isOpen = open === i;
          return (
            <li key={s.n} className={`border-t border-stone-200 ${i === steps.length - 1 ? "border-b" : ""}`}>
              <Inview delay={i * 0.09} from={{ opacity: 0, y: 26 }} tension={190}>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center gap-6 py-7 text-left"
                >
                  <span className="w-10 text-sm font-medium text-stone-500">{s.n}</span>
                  <p className="flex-1 text-2xl font-medium tracking-tight text-stone-950 sm:text-3xl">{s.name}</p>
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-stone-200">
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ type: "spring", stiffness: 300, damping: 22 }}
                      className="grid place-items-center"
                    >
                      <Plus className="h-5 w-5 text-stone-950" strokeWidth={1.6} />
                    </motion.span>
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-xl pb-7 pl-16 text-sm leading-relaxed text-stone-500">{s.desc}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Inview>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
