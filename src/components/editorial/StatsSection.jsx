import React from "react";
import Eyebrow from "./Eyebrow";
import StackedLines from "./StackedLines";
import Inview from "./Inview";

export default function StatsSection({ partnerCount, categoryCount }) {
  const stats = [
    { v: partnerCount ? String(partnerCount) : "—", l: "Parceiros credenciados" },
    { v: categoryCount ? String(categoryCount) : "—", l: "Segmentos atendidos" },
    { v: "R$ 0", l: "Custo para o cliente" },
    { v: "2", l: "Cidades atendidas" },
  ];
  return (
    <section className="mt-3 rounded-[2rem] bg-brand px-6 py-20 text-white sm:px-10">
      <Eyebrow tone="light">Em números</Eyebrow>
      <StackedLines
        id="stats-title"
        lines={["Um clube que", "faz diferença"]}
        className="mt-4 text-4xl font-medium leading-[0.95] tracking-tight sm:text-5xl"
      />
      <dl className="mt-16 grid grid-cols-2 gap-x-8 gap-y-12 lg:grid-cols-4">
        {stats.map((s, i) => (
          <Inview key={s.l} delay={i * 0.11} from={{ opacity: 0, y: 30 }} tension={180} friction={24} className="border-t border-white/20 pt-5">
            <dt className="sr-only">{s.l}</dt>
            <dd>
              <p className="text-5xl font-medium tracking-tight sm:text-7xl">{s.v}</p>
              <p className="mt-3 text-sm text-white/65">{s.l}</p>
            </dd>
          </Inview>
        ))}
      </dl>
    </section>
  );
}
