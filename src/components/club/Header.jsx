import React, { useEffect, useState } from "react";

const links = [
  { label: "Parceiros", href: "#parceiros" },
  { label: "Como funciona", href: "#como-funciona" },
  { label: "Dúvidas", href: "#faq" },
  { label: "Contato", href: "#contato" },
];

export default function Header() {
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > window.innerHeight * 1.85);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const text = solid ? "text-stone-950" : "text-white";

  return (
    <header className="fixed inset-x-0 top-0 z-40 p-2 sm:p-3 pointer-events-none">
      <div
        className={`pointer-events-auto flex h-14 items-center justify-between rounded-full px-4 text-xs font-medium transition-all duration-500 sm:h-16 sm:px-6 ${
          solid ? "bg-white/85 shadow-lg shadow-stone-950/5 backdrop-blur-xl" : "bg-transparent"
        } ${text}`}
      >
        <nav className="hidden flex-1 items-center gap-6 lg:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="opacity-80 transition-opacity hover:opacity-100">
              {l.label}
            </a>
          ))}
        </nav>

        <a href="#top" className="flex-1 lg:text-center">
          <img
            src="/media/logo-adim.png"
            alt="Adim Aluguéis"
            className={`inline-block h-6 w-auto transition-all duration-500 sm:h-7 ${solid ? "" : "brightness-0 invert"}`}
          />
        </a>

        <div className="flex flex-1 items-center justify-end gap-4">
          <a href="#contato" className="hidden uppercase tracking-wide opacity-80 hover:underline hover:opacity-100 sm:block">
            Falar com a Adim
          </a>
          <a
            href="#parceiros"
            className={`rounded-full px-4 py-2 uppercase tracking-wide backdrop-blur transition-colors ${
              solid ? "bg-stone-950 text-white hover:bg-brand" : "bg-white/15 text-white hover:bg-white/25"
            }`}
          >
            Vantagens
          </a>
        </div>
      </div>
    </header>
  );
}
