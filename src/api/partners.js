// Camada de dados dos parceiros.
//
// Migrado do Base44 (`base44.entities.Partner.list`) para dados locais.
// Para trocar por uma API/CMS depois, basta reescrever `listPartners`
// mantendo a mesma assinatura (Promise de array de parceiros).

import partnersData from "@/data/partners.json";

export const PARTNER_CATEGORIES = [
  "Automotivo",
  "Casa e Reforma",
  "Saúde e Odontologia",
  "Gastronomia",
  "Educação",
  "Serviços",
  "Beleza e Estética",
  "Pet",
  "Tecnologia",
  "Energia Solar",
  "Seguros e Finanças",
  "Móveis e Decoração",
];

/**
 * Lista os parceiros.
 * @param {string} [sort] campo de ordenação; prefixo "-" inverte (ex.: "-featured")
 * @returns {Promise<Array>}
 */
export async function listPartners(sort = "-featured") {
  const desc = sort.startsWith("-");
  const field = desc ? sort.slice(1) : sort;

  const sorted = [...partnersData].sort((a, b) => {
    const av = a[field];
    const bv = b[field];
    if (av === bv) return a.name.localeCompare(b.name, "pt-BR");

    const cmp =
      typeof av === "boolean" || typeof bv === "boolean"
        ? (av ? 1 : 0) - (bv ? 1 : 0)
        : String(av ?? "").localeCompare(String(bv ?? ""), "pt-BR");

    return desc ? -cmp : cmp;
  });

  return sorted;
}
