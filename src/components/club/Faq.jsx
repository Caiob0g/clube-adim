import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import Eyebrow from "@/components/editorial/Eyebrow";
import StackedLines from "@/components/editorial/StackedLines";
import Inview from "@/components/editorial/Inview";

const items = [
  {
    q: "Quem pode usar o clube de benefícios?",
    a: "Todos os clientes com contrato de locação ativo na Adim Aluguéis, sem custo adicional e sem cadastro.",
  },
  {
    q: "Como faço para utilizar um desconto?",
    a: "Escolha o parceiro na lista, veja a condição negociada e apresente-se como cliente Adim no atendimento. Alguns parceiros pedem o número do contrato.",
  },
  {
    q: "Preciso de carteirinha ou aplicativo?",
    a: "Não. Basta informar que você é cliente Adim Aluguéis. Se o parceiro solicitar, mostre seu contrato ou fale com o nosso atendimento.",
  },
  {
    q: "Os benefícios podem ser somados a outras promoções?",
    a: "Depende de cada estabelecimento. Em geral o benefício Adim não é cumulativo com outras campanhas do parceiro.",
  },
  {
    q: "As condições podem mudar?",
    a: "Sim. As condições são negociadas diretamente com cada parceiro e podem ser atualizadas. Consulte sempre esta página antes de usar.",
  },
  {
    q: "Quero indicar um parceiro. Como faço?",
    a: "Fale com a gente pelo WhatsApp (47) 9 3505-0560 ou por sac@adimalugueis.com.br com a indicação.",
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="bg-white px-6 py-20 sm:px-10 sm:py-24">
      <div className="grid gap-10 md:grid-cols-[0.8fr_1.2fr] md:gap-14">
        <div className="md:sticky md:top-28 md:self-start">
          <Eyebrow>Dúvidas frequentes</Eyebrow>
          <StackedLines
            id="faq-title"
            lines={["Como usar", "os benefícios"]}
            className="mt-4 text-4xl font-medium leading-[0.95] tracking-tight text-stone-950 sm:text-5xl"
          />
        </div>

        <ul>
          {items.map((item, i) => (
            <li key={item.q} className={`border-t border-stone-200 ${i === items.length - 1 ? "border-b" : ""}`}>
              <Inview delay={i * 0.07} from={{ opacity: 0, y: 20 }} tension={190}>
                <button
                  onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left"
                >
                  <span className="text-lg font-medium tracking-tight text-stone-950 sm:text-xl">{item.q}</span>
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-stone-200">
                    <Plus
                      className={`h-4 w-4 text-stone-950 transition-transform duration-300 ${openIndex === i ? "rotate-45" : ""}`}
                      strokeWidth={1.8}
                    />
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-xl pb-7 text-sm leading-relaxed text-stone-500">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Inview>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
