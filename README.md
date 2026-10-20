# Clube Adim

Site de página única do Clube de Benefícios da **Adim Aluguéis**, com a rede de parceiros credenciados de Balneário Camboriú e Itapema. Clientes com contrato de locação ativo consultam a lista, veem a condição negociada com cada estabelecimento e como utilizá-la — sem mensalidade, carteirinha ou cadastro.

**No ar:** https://clube-adim.vercel.app

Migrado do Base44 (`adimclube.base44.app`) para um projeto React + Vite, a partir de [PROJETO.MD](PROJETO.MD).

## Rodando

Precisa do **Node.js 18 ou mais novo** (com o npm).

```bash
npm install
```

```bash
npm run dev
```

O site abre em http://localhost:5173.

Build de produção em `dist/`:

```bash
npm run build
```

Pré-visualizar o build:

```bash
npm run preview
```

## Configuração

Não há variáveis de ambiente, chaves nem banco de dados: o site é estático e os dados dos parceiros são um arquivo JSON do próprio repositório. De fora vêm só a fonte Poppins (Google Fonts) e as fotos de cada segmento (Unsplash, em `categoryImages.js`).

## Publicação

Hospedado na **Vercel**, conectada a este repositório: todo push na branch `main` publica automaticamente, em cerca de 1 minuto. Se um build falhar, a versão anterior continua no ar.

| Item | Config |
|---|---|
| Comando de build | `npm run build` |
| Diretório publicado | `dist` |
| Rotas | `vercel.json` manda toda rota para o `index.html` (SPA) |

O `public/_redirects` faz o mesmo papel caso o site seja hospedado na Netlify.

No build, o `vite.config.js` tira do JavaScript os parceiros com `"published": false`, para que os dados ainda não confirmados não cheguem ao navegador.

## Onde mexer

| Quero mudar… | Arquivo |
|---|---|
| Parceiros (incluir, editar, publicar) | `src/data/partners.json` |
| Categorias e ordem da lista | `src/api/partners.js` (`PARTNER_CATEGORIES`) |
| Foto de cada categoria | `src/components/club/categoryImages.js` |
| Frases do carrossel de abertura | `src/components/editorial/TrustSection.jsx` (`slides`) |
| "Como funciona" | `src/components/editorial/StepsSection.jsx` (`steps`) |
| Depoimentos | `src/components/club/Testimonials.jsx` (`items`) |
| Perguntas frequentes | `src/components/club/Faq.jsx` (`items`) |
| "Em números" | `src/components/editorial/StatsSection.jsx` (parceiros e segmentos são contados sozinhos) |
| Contatos e links do rodapé | `src/components/editorial/EditorialFooter.jsx` (`channels`, `nav`) |
| Menu do topo | `src/components/club/Header.jsx` (`links`) |
| Vídeo, logo e fotos das cidades | `public/media/` |
| Título e descrição da página | `index.html` |
| Cores e fonte | `tailwind.config.js` e `src/index.css` |

## Stack

React 18 · Vite 6 · Tailwind CSS 3 · Framer Motion · lucide-react · react-router-dom

## Estrutura

```
index.html
tailwind.config.js · postcss.config.js · vite.config.js · vercel.json
PROJETO.MD                     ← extração completa do projeto original no Base44
docs/
  Clube-Beneficios-ADIM.pdf    ← PDF oficial com a lista de parceiros
public/
  manifest.json · _redirects
  media/                       ← mídias baixadas do Base44
    hero-video.mp4
    logo-adim.png
    balneario-camboriu.jpg
    itapema.jpg
src/
  main.jsx · App.jsx · index.css
  api/partners.js              ← camada de dados (substitui o Base44)
  data/partners.json           ← cadastro dos parceiros
  pages/
    Home.jsx
    PageNotFound.jsx
  components/
    ScrollToTop.jsx
    club/       Header · PartnerGrid · PartnerCard · PartnerModal · Testimonials · Faq · categoryImages
    editorial/  TrustSection · StepsSection · StatsSection · EditorialFooter
                Eyebrow · StackedLines · WordReveal · GhostWord · Inview
                ArrowButton · PillButton · CarouselDots
    ui/         scroll-locked-video-hero
```

## Parceiros

O backend Base44 (entidade `Partner`) foi substituído por dados locais.

- **Cadastro:** [`src/data/partners.json`](src/data/partners.json) — **38 parceiros**, extraídos do PDF oficial do clube ([`docs/Clube-Beneficios-ADIM.pdf`](docs/Clube-Beneficios-ADIM.pdf)).
- **Leitura:** [`src/api/partners.js`](src/api/partners.js) expõe `listPartners(sort)`, com a mesma assinatura do antigo `base44.entities.Partner.list()`. Para migrar depois para uma API, CMS ou banco, basta reescrever essa função.

### Publicação

O site mostra apenas os parceiros com `"published": true`. Hoje são **10** — os que tiveram o endereço confirmado. Os outros **28** estão no JSON com `"published": false`, aguardando confirmação dos dados; eles não aparecem em lugar nenhum do site e não entram na contagem da seção "Em números".

Para publicar um parceiro, confirme os dados e vire a flag:

```json
"published": true
```

> **Atenção:** as listas de `services` foram **inferidas** a partir da coluna "Segmento" do PDF e de pesquisa na web — nenhuma foi confirmada com o parceiro. As dos 10 publicados já estão no ar. Confira com cada estabelecimento antes de considerar o conteúdo definitivo.

Campos de cada parceiro:

| Campo | Tipo | Obrigatório |
|---|---|---|
| `id` | string | sim (chave do React) |
| `name` | string | sim |
| `category` | string (uma das 12 de `PARTNER_CATEGORIES`) | sim |
| `benefit` | string | sim |
| `description` | string | não |
| `how_to_use` | string | não |
| `city` | string | não |
| `address` | string | não |
| `phone` | string | não |
| `website` | string | não |
| `logo_url` | string | não |
| `featured` | boolean | não |
| `services` | array de strings | sim — renderiza a seção "Serviços" no modal |
| `published` | boolean | sim — `false` mantém o parceiro fora do site |

## O que mudou em relação ao Base44

| Base44 | Aqui |
|---|---|
| `base44.entities.Partner.list()` | `listPartners()` lendo `src/data/partners.json` |
| `AuthProvider` / `UserNotRegisteredError` / login | removidos — a página é pública |
| `QueryClientProvider` / `@tanstack/react-query` | removido — não havia uso real |
| `Toaster` (shadcn/ui) | removido — nenhum toast era disparado |
| `lib/PageNotFound` | `src/pages/PageNotFound.jsx` |
| Mídias em `media.base44.com` | baixadas para `public/media/` |
| `tailwind.config.js` em CommonJS | convertido para ESM (o projeto é `"type": "module"`) |
| `outline-ring/50` no `@layer base` | removido — é sintaxe do Tailwind v4 |
| `<title>Base44 APP</title>` | título, descrição e favicon próprios |

## Observação

Em desenvolvimento o React emite um aviso `Function components cannot be given refs` vindo do `PartnerCard` dentro do `AnimatePresence mode="popLayout"`. É um aviso herdado do design original, não afeta o funcionamento nem aparece em produção.
