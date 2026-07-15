export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/"],
    },

    sitemap:
      "https://leadwellpharmaceuticals.com/sitemap.xml",

    host: "https://leadwellpharmaceuticals.com",
  };
}