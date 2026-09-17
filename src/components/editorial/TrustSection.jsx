import React, { useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import Inview from "./Inview";
import GhostWord from "./GhostWord";
import ArrowButton from "./ArrowButton";
import CarouselDots from "./CarouselDots";

const slides = [
  {
    words: ["Descontos", "Reais", "Negociados", "Direto"],
    image: "/media/balneario-camboriu.jpg",
    name: "Balneário Camboriú",
    role: "Centro · Pioneiros · Nações",
  },
  {
    words: ["Sem", "Mensalidade", "Sem", "Carteirinha"],
    image: "/media/itapema.jpg",
    name: "Itapema",
    role: "Meia Praia · Centro",
  },
];

export default function TrustSection() {
  const ref = useRef(null);
  const [i, setI] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x1 = useTransform(scrollYProgress, [0, 1], ["-3%", "3%"]);
  const x2 = useTransform(scrollYProgress, [0, 1], ["3%", "-3%"]);
  const x3 = useTransform(scrollYProgress, [0, 1], ["-2%", "4%"]);
  const x4 = useTransform(scrollYProgress, [0, 1], ["4%", "-3%"]);
  const s = slides[i];
  const go = (n) => setI((n + slides.length) % slides.length);

  return (
    <section ref={ref} className="relative isolate overflow-hidden bg-white px-6 py-16 sm:px-10 sm:py-20">
      <div className="relative z-20 flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
        <Inview from={{ opacity: 0, scale: 0.9 }} tension={220} friction={22} className="grid h-28 w-28 place-items-center rounded-full bg-stone-50 text-center sm:h-32 sm:w-32">
          <div>
            <p className="text-2xl font-medium">100%</p>
            <p className="mx-auto max-w-[7em] text-[0.6rem] text-stone-500">Condições negociadas com o parceiro</p>
          </div>
        </Inview>
        <Inview as="article" delay={0.12} from={{ opacity: 0, y: 24 }} className="flex max-w-md gap-4 rounded-3xl bg-stone-50 p-5 sm:gap-5 sm:p-6">
          <span className="self-start rounded-xl bg-white px-4 py-2 text-xl font-medium">#01</span>
          <div>
            <h3 className="text-lg font-medium">Feito para quem aluga com a Adim</h3>
            <p className="mt-1.5 text-xs leading-relaxed text-stone-500">
              Do mercado à oficina, comércios e serviços de Balneário Camboriú e Itapema com vantagem exclusiva para clientes com contrato ativo.
            </p>
          </div>
        </Inview>
      </div>

      <h2 id="trust-title" className="pointer-events-none relative z-0 mx-auto mt-12 max-w-[88rem] select-none text-[8.2vw] font-medium uppercase leading-[1.02] tracking-tight">
        <span className="flex justify-between"><GhostWord word={s.words[0]} x={x1} slideKey={i} /><GhostWord word={s.words[1]} x={x2} slideKey={i} /></span>
        <span className="flex justify-between"><GhostWord word={s.words[2]} ink x={x3} slideKey={i} /><GhostWord word={s.words[3]} x={x4} slideKey={i} /></span>
      </h2>

      <Inview from={{ opacity: 0, y: 60, scale: 0.92 }} tension={170} friction={26} className="relative z-10 mx-auto mt-10 w-52 sm:absolute sm:left-1/2 sm:top-1/2 sm:mt-0 sm:w-64 sm:-translate-x-1/2 sm:-translate-y-1/2">
        <figure className="relative aspect-[3/4] overflow-hidden rounded-3xl bg-brand" style={{ rotate: "6deg" }}>
          <AnimatePresence mode="popLayout">
            <motion.img key={s.image} src={s.image} alt={s.name} loading="lazy" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ type: "spring", stiffness: 260, damping: 26 }} className="absolute inset-0 h-full w-full object-cover" />
          </AnimatePresence>
          <figcaption className="absolute inset-x-3 bottom-3 rounded-xl bg-stone-950/40 px-3 py-2 text-white backdrop-blur">
            <p className="text-sm font-medium">{s.name}</p>
            <p className="text-[0.65rem] opacity-80">{s.role}</p>
          </figcaption>
        </figure>
      </Inview>

      <div className="relative z-20 mt-12 flex items-center justify-between sm:mt-24">
        <ArrowButton direction="prev" variant="outline" onClick={() => go(i - 1)} label="Anterior" />
        <CarouselDots count={slides.length} active={i} onChange={setI} />
        <ArrowButton direction="next" variant="solid" onClick={() => go(i + 1)} label="Próximo" />
      </div>
    </section>
  );
}
