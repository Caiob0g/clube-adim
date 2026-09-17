# Clube Adim — Extração completa do projeto

> Site interativo de página única para exibir o clube de benefícios da Adim Aluguéis (Balneário Camboriú e Itapema).
> Publicado em: https://adimclube.base44.app

---

## 1. Visão geral

| Item | Detalhe |
|---|---|
| Tipo | Single Page Application (SPA) |
| Stack | React 18 + Vite, Tailwind CSS, Framer Motion, lucide-react, react-router-dom |
| Backend | Base44 (entidade `Partner`) |
| Fonte | Poppins (Google Fonts) |
| Paleta | Laranja Adim (`hsl(19 91% 48%)`), tons `stone` do Tailwind, branco |
| Estilo | Editorial minimalista (inspirado em Baseline Tennis Club), tipografia oversize, muito espaço em branco, animações de revelação no scroll |

### Fluxo da página (`/`)

1. **ScrollLockedVideoHero** — vídeo de abertura com scroll travado; o scroll "arrasta" o vídeo até o fim e libera a página.
2. **Header** — fixo, transparente sobre o vídeo, sólido (branco/blur) após o scroll.
3. **TrustSection** — carrossel editorial com palavras gigantes e foto inclinada (BC / Itapema).
4. **StepsSection** — "Como funciona" em acordeão (4 passos).
5. **PartnerGrid** — busca, filtros por categoria, grid de parceiros (9 iniciais + "Ver todos").
6. **Testimonials** — carrossel de depoimentos.
7. **StatsSection** — números do clube (fundo laranja).
8. **Faq** — perguntas frequentes em acordeão.
9. **EditorialFooter** — rodapé laranja com contatos reais da Adim.
10. **PartnerModal** — modal de detalhes do parceiro.

---

## 2. Estrutura de arquivos

```
index.html
tailwind.config.js
src/
  index.css
  App.jsx
  pages/
    Home.jsx
  components/
    club/
      Header.jsx
      PartnerGrid.jsx
      PartnerCard.jsx
      PartnerModal.jsx
      Testimonials.jsx
      Faq.jsx
      categoryImages.js
    editorial/
      TrustSection.jsx
      StepsSection.jsx
      StatsSection.jsx
      EditorialFooter.jsx
      Eyebrow.jsx
      StackedLines.jsx
      WordReveal.jsx
      GhostWord.jsx
      Inview.jsx
      ArrowButton.jsx
      PillButton.jsx
      CarouselDots.jsx
    ui/
      scroll-locked-video-hero.jsx
      (componentes shadcn/ui padrão)
base44/
  entities/
    Partner.jsonc
```

---

## 3. Entidade `Partner` (`base44/entities/Partner.jsonc`)

```json
{
  "name": "Partner",
  "type": "object",
  "properties": {
    "name": { "type": "string", "description": "Nome do parceiro" },
    "category": {
      "type": "string",
      "enum": [
        "Automotivo", "Casa e Reforma", "Saúde e Odontologia", "Gastronomia",
        "Educação", "Serviços", "Beleza e Estética", "Pet", "Tecnologia",
        "Energia Solar", "Seguros e Finanças", "Móveis e Decoração"
      ],
      "description": "Categoria do parceiro"
    },
    "benefit": { "type": "string", "description": "Resumo curto do benefício" },
    "description": { "type": "string", "description": "Segmento / descrição do parceiro" },
    "how_to_use": { "type": "string", "description": "Como utilizar o benefício" },
    "city": { "type": "string", "description": "Cidade / região" },
    "address": { "type": "string" },
    "phone": { "type": "string" },
    "website": { "type": "string" },
    "logo_url": { "type": "string" },
    "latitude": { "type": "number" },
    "longitude": { "type": "number" },
    "featured": { "type": "boolean", "default": false }
  },
  "required": ["name", "category", "benefit"]
}
```

Campos internos automáticos: `id`, `created_date`, `updated_date`, `created_by_id`.

---

## 4. Configuração

### `index.html`

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="https://base44.com/logo_v2.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="manifest" href="/manifest.json" />
    <title>Base44 APP</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

### `src/index.css`

```css
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;1,300;1,400&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 0 0% 3.9%;
    --card: 0 0% 100%;
    --card-foreground: 0 0% 3.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 0 0% 3.9%;
    --primary: 19 91% 48%;
    --primary-foreground: 0 0% 100%;
    --brand: 19 91% 48%;
    --brand-dark: 19 88% 40%;
    --secondary: 0 0% 96.1%;
    --secondary-foreground: 0 0% 9%;
    --muted: 0 0% 96.1%;
    --muted-foreground: 0 0% 45.1%;
    --accent: 0 0% 96.1%;
    --accent-foreground: 0 0% 9%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 0 0% 98%;
    --border: 0 0% 89.8%;
    --input: 0 0% 89.8%;
    --ring: 0 0% 3.9%;
    --chart-1: 12 76% 61%;
    --chart-2: 173 58% 39%;
    --chart-3: 197 37% 24%;
    --chart-4: 43 74% 66%;
    --chart-5: 27 87% 67%;
    --radius: 0.5rem;
    --font-heading: 'Poppins', ui-sans-serif, system-ui, sans-serif;
    --font-body: 'Poppins', ui-sans-serif, system-ui, sans-serif;
    --font-display: 'Poppins', ui-sans-serif, system-ui, sans-serif;
    --font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
    --sidebar-background: 0 0% 98%;
    --sidebar-foreground: 240 5.3% 26.1%;
    --sidebar-primary: 240 5.9% 10%;
    --sidebar-primary-foreground: 0 0% 98%;
    --sidebar-accent: 240 4.8% 95.9%;
    --sidebar-accent-foreground: 240 5.9% 10%;
    --sidebar-border: 220 13% 91%;
    --sidebar-ring: 217.2 91.2% 59.8%;
  }

  .dark {
    --background: 0 0% 3.9%;
    --foreground: 0 0% 98%;
    --card: 0 0% 3.9%;
    --card-foreground: 0 0% 98%;
    --popover: 0 0% 3.9%;
    --popover-foreground: 0 0% 98%;
    --primary: 19 91% 48%;
    --primary-foreground: 0 0% 100%;
    --brand: 19 91% 48%;
    --brand-dark: 19 88% 40%;
    --secondary: 0 0% 14.9%;
    --secondary-foreground: 0 0% 98%;
    --muted: 0 0% 14.9%;
    --muted-foreground: 0 0% 63.9%;
    --accent: 0 0% 14.9%;
    --accent-foreground: 0 0% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 0 0% 98%;
    --border: 0 0% 14.9%;
    --input: 0 0% 14.9%;
    --ring: 0 0% 83.1%;
    --chart-1: 220 70% 50%;
    --chart-2: 160 60% 45%;
    --chart-3: 30 80% 55%;
    --chart-4: 280 65% 60%;
    --chart-5: 340 75% 55%;
    --sidebar-background: 240 5.9% 10%;
    --sidebar-foreground: 240 4.8% 95.9%;
    --sidebar-primary: 224.3 76.3% 48%;
    --sidebar-primary-foreground: 0 0% 100%;
    --sidebar-accent: 240 3.7% 15.9%;
    --sidebar-accent-foreground: 240 4.8% 95.9%;
    --sidebar-border: 240 3.7% 15.9%;
    --sidebar-ring: 217.2 91.2% 59.8%;
  }
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }

  body {
    @apply bg-background text-foreground font-body;
  }
}
```

### `tailwind.config.js`

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
  	extend: {
  		opacity: Object.fromEntries(Array.from({ length: 101 }, (_, i) => [i, `${i / 100}`])),
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: { DEFAULT: 'hsl(var(--card))', foreground: 'hsl(var(--card-foreground))' },
  			popover: { DEFAULT: 'hsl(var(--popover))', foreground: 'hsl(var(--popover-foreground))' },
  			primary: { DEFAULT: 'hsl(var(--primary))', foreground: 'hsl(var(--primary-foreground))' },
  			secondary: { DEFAULT: 'hsl(var(--secondary))', foreground: 'hsl(var(--secondary-foreground))' },
  			muted: { DEFAULT: 'hsl(var(--muted))', foreground: 'hsl(var(--muted-foreground))' },
  			accent: { DEFAULT: 'hsl(var(--accent))', foreground: 'hsl(var(--accent-foreground))' },
  			destructive: { DEFAULT: 'hsl(var(--destructive))', foreground: 'hsl(var(--destructive-foreground))' },
  			brand: { DEFAULT: 'hsl(var(--brand))', dark: 'hsl(var(--brand-dark))' },
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			}
  		},
  		fontFamily: {
  			heading: ['var(--font-heading)'],
  			body: ['var(--font-body)'],
  			display: ['var(--font-display)'],
  			mono: ['var(--font-mono)']
  		},
  		keyframes: {
  			'accordion-down': { from: { height: '0' }, to: { height: 'var(--radix-accordion-content-height)' } },
  			'accordion-up': { from: { height: 'var(--radix-accordion-content-height)' }, to: { height: '0' } }
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
}
```

---

## 5. Roteamento — `src/App.jsx`

```jsx
import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    } else if (authError.type === 'auth_required') {
      navigateToLogin();
      return null;
    }
  }

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <ScrollToTop />
          <AuthenticatedApp />
        </Router>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App
```

---

## 6. Página — `src/pages/Home.jsx`

```jsx
import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import Header from "@/components/club/Header";
import ScrollLockedVideoHero from "@/components/ui/scroll-locked-video-hero";
import TrustSection from "@/components/editorial/TrustSection";
import StepsSection from "@/components/editorial/StepsSection";
import StatsSection from "@/components/editorial/StatsSection";
import EditorialFooter from "@/components/editorial/EditorialFooter";
import PartnerGrid from "@/components/club/PartnerGrid";
import PartnerModal from "@/components/club/PartnerModal";
import Testimonials from "@/components/club/Testimonials";
import Faq from "@/components/club/Faq";

export default function Home() {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    base44.entities.Partner.list("-featured").then((data) => {
      setPartners(data);
      setLoading(false);
    });
  }, []);

  const handleSelect = (partner) => {
    setSelected(partner);
    setOpen(true);
  };

  const categoryCount = new Set(partners.map((p) => p.category)).size;

  return (
    <div className="min-h-screen bg-white antialiased">
      <ScrollLockedVideoHero
        videoSrc="https://media.base44.com/videos/public/6a970314d9fce7a150742af3/3699a27d9_Hero_Video.mp4"
        title="A CIDADE SE ABRE"
        tagline="Clube de Benefícios Adim Aluguéis"
        scrollHint="ROLE"
      />
      <Header />
      <main className="w-full overflow-x-clip p-2 sm:p-3">
        <TrustSection />
        <StepsSection />
        <PartnerGrid partners={partners} loading={loading} onSelect={handleSelect} />
        <Testimonials />
        <StatsSection partnerCount={partners.length} categoryCount={categoryCount} />
        <Faq />
        <EditorialFooter />
      </main>
      <PartnerModal partner={selected} open={open} onClose={() => setOpen(false)} />
    </div>
  );
}
```

---

## 7. Componentes — `src/components/club/`

### `Header.jsx`

```jsx
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
            src="https://media.base44.com/images/public/6a970314d9fce7a150742af3/b953dbc9d_j09ahb4y.png"
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
```

### `PartnerGrid.jsx`

```jsx
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
```

### `PartnerCard.jsx`

```jsx
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
```

### `PartnerModal.jsx`

```jsx
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
```

### `Testimonials.jsx`

```jsx
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
```

### `Faq.jsx`

```jsx
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
```

### `categoryImages.js`

```js
// Imagem de apoio por segmento de benefício
export const CATEGORY_IMAGES = {
  "Automotivo": "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&q=80",
  "Casa e Reforma": "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&q=80",
  "Saúde e Odontologia": "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=600&q=80",
  "Gastronomia": "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80",
  "Educação": "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&q=80",
  "Serviços": "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&q=80",
  "Beleza e Estética": "https://images.unsplash.com/photo-1560750588-73207b1ef5b8?w=600&q=80",
  "Pet": "https://images.unsplash.com/photo-1552053831-71594a27632d?w=600&q=80",
  "Tecnologia": "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80",
  "Energia Solar": "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&q=80",
  "Seguros e Finanças": "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&q=80",
  "Móveis e Decoração": "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80",
};

export const categoryImage = (category) =>
  CATEGORY_IMAGES[category] || CATEGORY_IMAGES["Serviços"];
```

---

## 8. Componentes — `src/components/editorial/`

### `TrustSection.jsx`

```jsx
import React, { useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import Inview from "./Inview";
import GhostWord from "./GhostWord";
import ArrowButton from "./ArrowButton";
import CarouselDots from "./CarouselDots";

const slides = [
  {
    words: ["Descontos", "Reais", "Negociados", "Direto"],
    image: "https://media.base44.com/images/public/6a970314d9fce7a150742af3/4a4a75131_istockphoto-1472792510-612x612.jpg",
    name: "Balneário Camboriú",
    role: "Centro · Pioneiros · Nações",
  },
  {
    words: ["Sem", "Mensalidade", "Sem", "Carteirinha"],
    image: "https://media.base44.com/images/public/6a970314d9fce7a150742af3/8be170ddd_IMG_2744-4-scaled.jpg",
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
```

### `StepsSection.jsx`

```jsx
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
```

### `StatsSection.jsx`

```jsx
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
```

### `EditorialFooter.jsx`

```jsx
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
          <img src="https://media.base44.com/images/public/6a970314d9fce7a150742af3/b953dbc9d_j09ahb4y.png" alt="Adim Aluguéis" className="h-8 w-auto brightness-0 invert" />
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
```

### `Eyebrow.jsx`

```jsx
import React from "react";

export default function Eyebrow({ children, tone = "dark" }) {
  const light = tone === "light";
  return (
    <span
      className={`inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.22em] ${
        light ? "text-white/70" : "text-stone-500"
      }`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${light ? "bg-white" : "bg-brand"}`} />
      {children}
    </span>
  );
}
```

### `StackedLines.jsx`

```jsx
import React from "react";
import { motion } from "framer-motion";

export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1];

export default function StackedLines({
  lines,
  as: Tag = "h2",
  className = "",
  stagger = 0.1,
  baseDelay = 0,
  duration = 0.85,
  id,
}) {
  return (
    <Tag id={id} className={className}>
      {lines.map((line, i) => (
        <motion.span
          key={i}
          className="block"
          initial={{ y: 26, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration, ease: EASE_OUT_EXPO, delay: baseDelay + i * stagger }}
        >
          {line}
        </motion.span>
      ))}
    </Tag>
  );
}
```

### `WordReveal.jsx`

```jsx
import React from "react";
import { motion } from "framer-motion";
import { EASE_OUT_EXPO } from "./StackedLines";

export default function WordReveal({
  text,
  as: Tag = "p",
  className = "",
  stagger = 0.05,
  baseDelay = 0,
  duration = 0.7,
  id,
}) {
  const words = text.split(" ");
  return (
    <Tag id={id} className={className}>
      {words.map((w, i) => (
        <span key={i} className="inline-block">
          <motion.span
            className="inline-block"
            initial={{ y: 14, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration, ease: EASE_OUT_EXPO, delay: baseDelay + i * stagger }}
          >
            {w}
          </motion.span>
          {i < words.length - 1 && "\u00A0"}
        </span>
      ))}
    </Tag>
  );
}
```

### `GhostWord.jsx`

```jsx
import React from "react";
import { motion } from "framer-motion";
import { EASE_OUT_EXPO } from "./StackedLines";

export default function GhostWord({ word, ink = false, x, slideKey }) {
  return (
    <motion.span style={{ x }} className="block overflow-hidden pb-[0.12em] -mb-[0.12em]">
      <motion.span
        key={`${slideKey}-${word}`}
        initial={{ y: "115%", opacity: 0 }}
        animate={{ y: "0%", opacity: 1 }}
        transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
        className={`block ${ink ? "text-stone-950" : "text-stone-200"}`}
      >
        {word}
      </motion.span>
    </motion.span>
  );
}
```

### `Inview.jsx`

```jsx
import React from "react";
import { motion } from "framer-motion";

const toState = (from) =>
  Object.fromEntries(Object.keys(from).map((k) => [k, k === "opacity" || k === "scale" ? 1 : 0]));

export default function Inview({
  children,
  from = { opacity: 0, y: 28 },
  delay = 0,
  tension = 200,
  friction = 26,
  className = "",
  as = "div",
  ...rest
}) {
  const Comp = motion[as] || motion.div;
  return (
    <Comp
      className={className}
      initial={from}
      whileInView={toState(from)}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ type: "spring", stiffness: tension, damping: friction, delay }}
      {...rest}
    >
      {children}
    </Comp>
  );
}
```

### `ArrowButton.jsx`

```jsx
import React from "react";
import { motion } from "framer-motion";

export default function ArrowButton({ direction = "next", variant = "outline", onClick, label }) {
  const styles =
    variant === "solid"
      ? "bg-stone-950 border-stone-950 text-white hover:bg-brand-dark hover:border-brand-dark"
      : "border-stone-200 text-stone-950 hover:border-stone-950";
  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-label={label}
      whileHover="hover"
      className={`grid h-12 w-12 place-items-center rounded-full border transition-colors duration-300 sm:h-14 sm:w-14 ${styles}`}
    >
      <motion.svg
        variants={{ hover: { scale: 1.15 } }}
        transition={{ type: "spring", stiffness: 320, damping: 18 }}
        viewBox="0 0 24 24"
        className={`h-5 w-5 ${direction === "prev" ? "-scale-x-100" : ""}`}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5 12h14M13 6l6 6-6 6" />
      </motion.svg>
    </motion.button>
  );
}
```

### `PillButton.jsx`

```jsx
import React from "react";
import { motion } from "framer-motion";

const variants = {
  light: "bg-white text-brand-dark hover:bg-stone-950 hover:text-white",
  solid: "bg-stone-950 text-white hover:bg-brand-dark",
  outline: "border border-current text-stone-950 hover:bg-stone-950 hover:text-white",
};

export default function PillButton({ children, variant = "light", className = "", ...rest }) {
  return (
    <motion.a
      whileHover="hover"
      className={`inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium uppercase tracking-wide transition-colors duration-300 ${variants[variant]} ${className}`}
      {...rest}
    >
      {children}
      <motion.svg
        variants={{ hover: { x: 5 } }}
        transition={{ type: "spring", stiffness: 320, damping: 20 }}
        viewBox="0 0 24 24"
        className="h-4 w-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5 12h14M13 6l6 6-6 6" />
      </motion.svg>
    </motion.a>
  );
}
```

### `CarouselDots.jsx`

```jsx
import React from "react";

export default function CarouselDots({ count, active, onChange, tone = "dark" }) {
  const light = tone === "light";
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: count }).map((_, i) => {
        const isActive = i === active;
        return (
          <button
            key={i}
            type="button"
            aria-label={`Ir para o slide ${i + 1}`}
            aria-current={isActive}
            onClick={() => onChange(i)}
            className="p-1.5"
          >
            <span
              className={`block h-1.5 rounded-full transition-all duration-300 ${
                isActive ? "w-5" : "w-1.5"
              } ${
                isActive
                  ? light ? "bg-white" : "bg-stone-950"
                  : light ? "bg-white/40" : "bg-stone-200"
              }`}
            />
          </button>
        );
      })}
    </div>
  );
}
```

---

## 9. Hero — `src/components/ui/scroll-locked-video-hero.jsx`

```jsx
import React, { useEffect, useRef, useState } from "react";

// Scroll-locked video hero: the page is pinned while wheel/touch input
// scrubs the video forward and backward. Once the video reaches the end
// and the user keeps pushing down, the page unlocks and scrolls normally —
// and re-locks when they come back to the very top.

const SANS = "'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";
const COL_BG = "#f5f3ef";
const COL_TEXT = "#ffffff";

function clamp(v, min, max) {
  return Math.min(max, Math.max(min, v));
}

export default function ScrollLockedVideoHero({
  videoSrc,
  title = "A CIDADE SE ABRE",
  scrollHint = "ROLE",
  tagline = "",
  scrubDistance,
  className,
  style,
}) {
  const videoRef = useRef(null);
  const titleRef = useRef(null);
  const hintRef = useRef(null);
  const taglineRef = useRef(null);
  const progressBarRef = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    // no mobile o gesto de toque percorre menos distância que a roda do mouse
    const isMobile = window.matchMedia?.("(max-width: 767px)").matches;
    const scrub = scrubDistance ?? (isMobile ? 1300 : 2600);

    let duration = 0;
    let rafId = 0;
    let targetProgress = 0;
    let currentProgress = 0;
    let hasStartedScrolling = false;
    let isSeeking = false;
    let pendingTime = null;
    let locked = false;
    let lockedScrollY = 0;
    let touchStartY = 0;

    const onLoadedData = () => {
      duration = video.duration || 0;
      setReady(true);
      if (reduceMotion) video.currentTime = duration * 0.92;
    };
    video.addEventListener("loadeddata", onLoadedData);

    const onSeeked = () => {
      isSeeking = false;
      if (pendingTime !== null) {
        const t = pendingTime;
        pendingTime = null;
        isSeeking = true;
        video.currentTime = t;
      }
    };
    video.addEventListener("seeked", onSeeked);

    function seekTo(t) {
      if (isSeeking) {
        pendingTime = t;
        return;
      }
      isSeeking = true;
      video.currentTime = t;
    }

    function engageLock() {
      if (locked) return;
      locked = true;
      lockedScrollY = window.scrollY;
      const b = document.body.style;
      b.position = "fixed";
      b.top = `-${lockedScrollY}px`;
      b.left = "0";
      b.right = "0";
      b.width = "100%";
    }

    function releaseLock() {
      if (!locked) return;
      locked = false;
      const y = lockedScrollY;
      const b = document.body.style;
      b.position = "";
      b.top = "";
      b.left = "";
      b.right = "";
      b.width = "";
      window.scrollTo(0, y);
    }

    if (!reduceMotion) engageLock();

    function addDelta(deltaY) {
      if (!locked) {
        // Back at the very top and scrolling up again → take control back.
        if (window.scrollY <= 0 && deltaY < 0) {
          engageLock();
          targetProgress = 1;
        }
        return false;
      }
      // Video finished and still pushing down → let the page go.
      if (targetProgress >= 1 && deltaY > 0) {
        releaseLock();
        return false;
      }
      targetProgress = clamp(targetProgress + deltaY / scrub, 0, 1);
      if (targetProgress > 0.001) hasStartedScrolling = true;
      return true;
    }

    const onWheel = (e) => {
      if (addDelta(e.deltaY)) e.preventDefault();
    };
    const onTouchStart = (e) => {
      touchStartY = e.touches[0]?.clientY ?? 0;
    };
    const onTouchMove = (e) => {
      const y = e.touches[0]?.clientY ?? touchStartY;
      const deltaY = touchStartY - y;
      touchStartY = y;
      if (addDelta(deltaY)) e.preventDefault();
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });

    function frame() {
      currentProgress += (targetProgress - currentProgress) * 0.18;

      if (duration > 0) seekTo(currentProgress * duration);

      if (videoRef.current) {
        videoRef.current.style.transform = `scale(${1 + currentProgress * 0.06})`;
      }
      if (titleRef.current) {
        const t = 1 - clamp(currentProgress / 0.35, 0, 1);
        titleRef.current.style.opacity = String(t);
        titleRef.current.style.transform = `translateY(${(1 - t) * -24}px) scale(${0.96 + t * 0.04})`;
        titleRef.current.style.filter = `blur(${(1 - t) * 10}px)`;
      }
      if (hintRef.current) {
        hintRef.current.style.opacity = hasStartedScrolling ? "0" : "1";
      }
      if (taglineRef.current) {
        const t = clamp((currentProgress - 0.6) / 0.3, 0, 1);
        taglineRef.current.style.opacity = String(t);
        taglineRef.current.style.transform = `translateY(${(1 - t) * 20}px) scale(${0.97 + t * 0.03})`;
        taglineRef.current.style.filter = `blur(${(1 - t) * 8}px)`;
      }
      if (progressBarRef.current) {
        progressBarRef.current.style.transform = `scaleX(${currentProgress})`;
      }

      rafId = requestAnimationFrame(frame);
    }

    if (!reduceMotion) rafId = requestAnimationFrame(frame);

    return () => {
      video.removeEventListener("loadeddata", onLoadedData);
      video.removeEventListener("seeked", onSeeked);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      cancelAnimationFrame(rafId);
      releaseLock();
    };
  }, [scrubDistance]);

  return (
    <div
      className={className}
      style={{
        position: "relative",
        height: "100dvh",
        width: "100%",
        overflow: "hidden",
        background: COL_BG,
        ...style,
      }}
    >
      <video
        ref={videoRef}
        src={videoSrc}
        muted
        playsInline
        preload="auto"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: ready ? 1 : 0,
          transformOrigin: "center center",
          willChange: "transform",
          transition: "opacity 0.6s ease",
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(28,25,23,0.30), rgba(28,25,23,0) 35%, rgba(28,25,23,0.10) 70%, rgba(28,25,23,0.45))",
          pointerEvents: "none",
        }}
      />

      <div
        ref={titleRef}
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 6%",
          textAlign: "center",
          pointerEvents: "none",
        }}
      >
        <span
          style={{
            fontFamily: SANS,
            fontWeight: 500,
            fontSize: "clamp(30px, 7vw, 88px)",
            lineHeight: 1.0,
            letterSpacing: "-0.02em",
            color: COL_TEXT,
            textShadow: "0 4px 30px rgba(0,0,0,0.35)",
            display: "inline-block",
            willChange: "transform, filter, opacity",
          }}
        >
          {title}
        </span>
      </div>

      {tagline && (
        <div
          ref={taglineRef}
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 8%",
            textAlign: "center",
            opacity: 0,
            pointerEvents: "none",
          }}
        >
          <span
            style={{
              fontFamily: SANS,
              fontWeight: 500,
              fontSize: "clamp(20px, 3.4vw, 38px)",
              lineHeight: 1.25,
              letterSpacing: "-0.01em",
              color: COL_TEXT,
              textShadow: "0 2px 18px rgba(0,0,0,0.45)",
              background: "rgba(28,25,23,0.28)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              padding: "0.6em 1.1em",
              borderRadius: "999px",
            }}
          >
            {tagline}
          </span>
        </div>
      )}

      <div
        ref={hintRef}
        style={{
          position: "absolute",
          left: "50%",
          bottom: "clamp(20px, 6vh, 48px)",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
          color: "rgba(255,255,255,0.85)",
          fontFamily: SANS,
          fontSize: "clamp(10px, 1.4vw, 12px)",
          fontWeight: 500,
          letterSpacing: "0.22em",
          transition: "opacity 0.4s ease",
          pointerEvents: "none",
        }}
      >
        <span>{scrollHint}</span>
        <svg width="14" height="18" viewBox="0 0 14 18" style={{ animation: "metro-hero-bounce 1.6s ease-in-out infinite" }}>
          <style>{`
            @keyframes metro-hero-bounce {
              0%, 100% { transform: translateY(0); opacity: 0.5; }
              50% { transform: translateY(5px); opacity: 1; }
            }
          `}</style>
          <path d="M7 1 L7 17 M2 12 L7 17 L12 12" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: 2,
          background: "rgba(255,255,255,0.25)",
        }}
      >
        <div
          ref={progressBarRef}
          style={{
            height: "100%",
            width: "100%",
            background: "linear-gradient(90deg, rgba(255,255,255,0.6), rgba(255,255,255,1))",
            transform: "scaleX(0)",
            transformOrigin: "left center",
          }}
        />
      </div>
    </div>
  );
}
```

---

## 10. Mídias utilizadas

| Uso | URL |
|---|---|
| Vídeo hero | https://media.base44.com/videos/public/6a970314d9fce7a150742af3/3699a27d9_Hero_Video.mp4 |
| Logo Adim | https://media.base44.com/images/public/6a970314d9fce7a150742af3/b953dbc9d_j09ahb4y.png |
| Foto Balneário Camboriú | https://media.base44.com/images/public/6a970314d9fce7a150742af3/4a4a75131_istockphoto-1472792510-612x612.jpg |
| Foto Itapema | https://media.base44.com/images/public/6a970314d9fce7a150742af3/8be170ddd_IMG_2744-4-scaled.jpg |

## 11. Dados de contato exibidos (Adim Aluguéis)

- WhatsApp: (47) 9 3505-0560 — https://wa.me/5547935050560
- Comercial Balneário Camboriú: (47) 3367-0202
- Comercial Itapema: (47) 2033-4629
- Administrativo: (47) 3515-0359
- E-mail: sac@adimalugueis.com.br
- Site: adimalugueis.com.br
- Endereço: Av. Brasil, 2016 — Centro, Balneário Camboriú

## 12. Decisões de design registradas

- SPA de página única, editorial minimalista, sem mapa (Leaflet removido) e sem excesso de elementos.
- Poppins em todo o site; títulos em uppercase onde aplicável; paleta Laranja Adim + stone.
- Animações de revelação (Inview / StackedLines / WordReveal / GhostWord) em todas as seções.
- Hero com scroll travado e sensibilidade ajustada para toque no mobile.
- Cards de parceiros tipográficos (sem foto), com borda fina `stone-200`.
- Lista de parceiros ordenada alfabeticamente, 9 iniciais + botão "Ver todos".
- Filtros de categoria em carrossel horizontal no mobile.
- Seção "Como funciona" e FAQ em acordeão.
- Rodapé e seção de números com fundo laranja e cantos arredondados.