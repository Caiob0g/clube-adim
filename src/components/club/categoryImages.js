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
