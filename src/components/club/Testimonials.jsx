import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote } from "lucide-react";
import Eyebrow from "@/components/editorial/Eyebrow";
import StackedLines from "@/components/editorial/StackedLines";
import ArrowButton from "@/components/editorial/ArrowButton";
import CarouselDots from "@/components/editorial/CarouselDots";

const items = [
  {
    quote:
      "Economizei quase o valor de um aluguel no ano só usando os parceiros da oficina e do mercado. É um cuidado que não esperava da imobiliária.",
    name: "Juliana Prado",
    role: "Cliente em Balneário Camboriú",
  },
  {
    quote:
      "Fiz a reforma do apartamento inteira com desconto na loja de materiais. Bastou dizer que sou cliente Adim e o atendimento já sabia da condição.",
    name: "Rafael Menezes",
    role: "Cliente em Itapema",
  },
  {
    quote:
      "O clube me ajudou até no dentista da família. Simples, sem carteirinha, sem burocracia e sem pagar nada a mais por isso.",
    name: "Camila Ferreira",
    role: "Cliente em Balneário Camboriú",
  },
  {
    quote:
      "Aluguei com a Adim pela localização e acabei ficando pelos benefícios. Todo mês descubro um parceiro novo na lista.",
    name: "Diego Almeida",
    role: "Cliente em Itapema",
  },
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);

  const go = useCallback((dir) => {
    setIndex((i) => (i + dir + items.length) % items.length);
  }, []);

  useEffect(() => {
    const t = setInterval(() => go(1), 7000);
    return () => clearInterval(t);
  }, [go, index]);

  const current = items[index];

  return (
    <section id="depoimentos" className="bg-white px-6 pb-20 sm:px-10">
      <div className="rounded-[2rem] bg-stone-50 px-6 py-14 sm:px-12 sm:py-16">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Eyebrow>Depoimentos</Eyebrow>
            <StackedLines
              id="depoimentos-title"
              lines={["O que dizem", "nossos clientes"]}
              className="mt-4 text-4xl font-medium leading-[0.95] tracking-tight text-stone-950 sm:text-5xl"
            />
          </div>
          <div className="flex items-center gap-3">
            <ArrowButton direction="prev" label="Depoimento anterior" onClick={() => go(-1)} />
            <ArrowButton direction="next" label="Próximo depoimento" onClick={() => go(1)} />
          </div>
        </div>

        <div className="mt-12 grid min-h-[15rem] items-start gap-8 lg:grid-cols-[auto_1fr] lg:gap-12">
          <Quote className="h-10 w-10 text-brand" strokeWidth={1.6} />
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={index}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="max-w-3xl text-xl font-medium leading-snug tracking-tight text-stone-950 sm:text-3xl">
                “{current.quote}”
              </p>
              <footer className="mt-8 flex items-center gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brand text-sm font-medium text-white">
                  {current.name.charAt(0)}
                </span>
                <span>
                  <span className="block text-sm font-medium text-stone-950">{current.name}</span>
                  <span className="block text-xs text-stone-500">{current.role}</span>
                </span>
              </footer>
            </motion.blockquote>
          </AnimatePresence>
        </div>

        <div className="mt-10 flex justify-center lg:justify-start">
          <CarouselDots count={items.length} active={index} onChange={setIndex} />
        </div>
      </div>
    </section>
  );
}
