import React from "react";
import Eyebrow from "./Eyebrow";
import StackedLines from "./StackedLines";
import Inview from "./Inview";
import PillButton from "./PillButton";

const channels = [
  { label: "WhatsApp", value: "(47) 9 3505-0560", tel: "+5547935050560" },
  { label: "Comercial Balneário Camboriú", value: "(47) 3367-0202", tel: "+554733670202" },
  { label: "Comercial Itapema", value: "(47) 2033-4629", tel: "+554720334629" },
  { label: "Administrativo", value: "(47) 3515-0359", tel: "+554735150359" },
];
const nav = [
  { label: "Parceiros", href: "#parceiros" },
  { label: "Como funciona", href: "#como-funciona" },
  { label: "Perguntas frequentes", href: "#faq" },
  { label: "Contato", href: "#contato" },
];

export default function EditorialFooter() {
  return (
    <footer id="contato" className="mt-3 rounded-[2rem] bg-brand px-6 py-14 text-white sm:px-10 sm:py-16">
      <div className="flex flex-col gap-8 border-b border-white/15 pb-14 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <Eyebrow tone="light">Fale com a Adim</Eyebrow>
          <StackedLines as="p" lines={["Pronto para", "aproveitar?"]} className="mt-4 text-5xl font-medium leading-[0.92] tracking-tight sm:text-6xl" />
        </div>
        <Inview delay={0.15} from={{ opacity: 0, y: 20 }} friction={24}>
          <PillButton href="https://wa.me/5547935050560" target="_blank" rel="noreferrer" variant="light">
            Falar no WhatsApp
          </PillButton>
        </Inview>
      </div>

      <div className="grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1.2fr]">
        <div className="max-w-xs">
          <img src="/media/logo-adim.png" alt="Adim Aluguéis" className="h-8 w-auto brightness-0 invert" />
          <p className="mt-4 text-sm text-white/65">Especialista em imóveis para alugar na região de Balneário Camboriú e Itapema.</p>
          <address className="mt-6 space-y-1.5 text-sm not-italic text-white/80">
            <a href="mailto:sac@adimalugueis.com.br" className="block hover:text-white">sac@adimalugueis.com.br</a>
            <a href="https://adimalugueis.com.br" target="_blank" rel="noreferrer" className="block hover:text-white">adimalugueis.com.br</a>
            <p className="text-white/55">Av. Brasil, 2016 — Centro, Balneário Camboriú</p>
          </address>
        </div>
        <nav>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/50">Navegação</p>
          <ul className="mt-4 space-y-3 text-sm text-white/80">
            {nav.map((l) => <li key={l.href}><a href={l.href} className="hover:text-white">{l.label}</a></li>)}
          </ul>
        </nav>
        <nav>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/50">Canais de atendimento</p>
          <ul className="mt-4 space-y-3 text-sm text-white/80">
            {channels.map((c) => (
              <li key={c.tel}>
                <a href={`tel:${c.tel}`} className="flex justify-between gap-4 hover:text-white">
                  <span className="text-white/55">{c.label}</span>
                  <span className="whitespace-nowrap">{c.value}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="flex flex-col gap-5 border-t border-white/15 pt-8 text-sm text-white/60 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Adim Aluguéis. Todos os direitos reservados.</p>
        <p>Benefícios válidos para clientes com contrato ativo.</p>
      </div>
    </footer>
  );
}
