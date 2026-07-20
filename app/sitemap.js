import { products } from "@/lib/data/products";

const BASE_URL =
  "https://leadwellpharmaceuticals.com";

export default function sitemap() {
  const staticPages = [
    {
      url: BASE_URL,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/products`,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/about`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/contact`,
      changeFrequency: "yearly",
      priority: 0.6,
    },
  ];

  const productPages = products.map(
    (product) => ({
      url: `${BASE_URL}/products/${product.slug}`,
      changeFrequency: "monthly",
      priority: 0.9,
    }),
  );

  return [...staticPages, ...productPages];
}