import React, { useState, useMemo } from "react";
import { AnimatePresence } from "framer-motion";
import { Search, X } from "lucide-react";
import PartnerCard from "./PartnerCard";
import Eyebrow from "@/components/editorial/Eyebrow";
import StackedLines from "@/components/editorial/StackedLines";
import WordReveal from "@/components/editorial/WordReveal";

export default function PartnerGrid({ partners, loading, onSelect }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Todos");
  const [showAll, setShowAll] = useState(false);

  const categories = useMemo(
    () => ["Todos", ...Array.from(new Set(partners.map((p) => p.category)))],
    [partners]
  );

  const filtered = [...partners].sort((a, b) => a.name.localeCompare(b.name, "pt-BR")).filter((p) => {
    const matchCat = category === "Todos" || p.category === category;
    const q = query.toLowerCase();
    const matchQ =
      !q ||
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      (p.description || "").toLowerCase().includes(q);
    return matchCat && matchQ;
  });

  return (
    <section id="parceiros" className="relative z-10 -mt-10 rounded-[2rem] bg-white px-6 pt-16 pb-20 sm:px-10">
      <div className="grid gap-8 md:grid-cols-2 md:items-end">
        <div>
          <Eyebrow>Rede credenciada</Eyebrow>
          <StackedLines
            id="parceiros-title"
            lines={["Parceiros em", "Balneário Camboriú", "e Itapema"]}
            className="mt-4 text-4xl font-medium leading-[0.95] tracking-tight text-stone-950 sm:text-5xl"
          />
        </div>
        <WordReveal
          mode="fade"
          stagger={0.028}
          baseDelay={0.25}
          duration={0.7}
          text="Cada condição foi negociada diretamente com o estabelecimento. Toque em um parceiro para ver o desconto e como utilizá-lo."
          className="max-w-md text-sm leading-relaxed text-stone-500 md:justify-self-end"
        />
      </div>

      <div className="sticky top-16 z-20 -mx-6 mt-12 bg-white/90 px-6 py-4 backdrop-blur-xl sm:-mx-10 sm:top-20 sm:px-10 border-y border-stone-200">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-sm">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" strokeWidth={1.8} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar por nome ou categoria"
              className="w-full rounded-full border border-stone-200 bg-stone-50 py-3 pl-11 pr-11 text-sm text-stone-950 placeholder:text-stone-400 transition-colors focus:border-brand focus:outline-none"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                aria-label="Limpar busca"
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-stone-400 transition-colors hover:text-brand"
              >
                <X className="h-3.5 w-3.5" strokeWidth={1.8} />
              </button>
            )}
          </div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-stone-500">
            {filtered.length} {filtered.length === 1 ? "parceiro" : "parceiros"}
          </p>
        </div>

        <div className="-mx-6 mt-4 flex gap-2 overflow-x-auto px-6 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:-mx-10 sm:px-10 md:mx-0 md:flex-wrap md:overflow-visible md:px-0">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`shrink-0 rounded-full border px-4 py-2 text-xs font-medium transition-colors ${
                category === c
                  ? "border-stone-950 bg-stone-950 text-white"
                  : "border-stone-200 text-stone-600 hover:border-stone-950 hover:text-stone-950"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-56 animate-pulse rounded-3xl bg-stone-50" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <p className="mt-16 text-sm text-stone-500">Nenhum parceiro encontrado para essa busca.</p>
      ) : (
        <>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {(showAll ? filtered : filtered.slice(0, 9)).map((p) => (
                <PartnerCard key={p.id} partner={p} onSelect={onSelect} />
              ))}
            </AnimatePresence>
          </div>
          {filtered.length > 9 && (
            <div className="mt-10 flex justify-center">
              <button
                onClick={() => setShowAll((v) => !v)}
                className="rounded-full border border-stone-950 px-6 py-3 text-xs font-medium uppercase tracking-[0.18em] text-stone-950 transition-colors hover:bg-stone-950 hover:text-white"
              >
                {showAll ? "Ver menos" : `Ver todos (${filtered.length})`}
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
}
