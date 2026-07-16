export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",

  name: "Leadwell Pharmaceuticals",

  url: "https://leadwellpharmaceuticals.com",

  logo: "https://leadwellpharmaceuticals.com/logo.png",

  image: "https://leadwellpharmaceuticals.com/logo.png",

  description:
    "Leadwell Pharmaceuticals is a pharmaceutical company committed to providing quality healthcare products across India.",

  telephone: "+91-9346652741",

  email: "lwppharma@gmail.com",

  address: {
    "@type": "PostalAddress",
    addressLocality: "Hyderabad",
    addressRegion: "Telangana",
    addressCountry: "IN",
  },

  areaServed: {
    "@type": "Country",
    name: "India",
  },

  knowsAbout: [
    "Pharmaceutical Products",
    "Nutraceuticals",
    "Orthopaedics",
    "Healthcare",
    "Medicines",
  ],
};