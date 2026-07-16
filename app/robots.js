const BASE_URL = "https://leadwellpharmaceuticals.com";

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",

        // Prevent indexing of API routes only.
        disallow: [
          "/api/",
        ],
      },
    ],

    sitemap: `${BASE_URL}/sitemap.xml`,

    host: BASE_URL,
  };
}