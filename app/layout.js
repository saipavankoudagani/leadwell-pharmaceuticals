import { GoogleAnalytics } from "@next/third-parties/google";
import Image from "next/image";
import Link from "next/link";
import "./globals.css";

const BASE_URL = "https://leadwellpharmaceuticals.com";

function serializeJsonLd(data) {
  return JSON.stringify(data)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026");
}

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${BASE_URL}/#organization`,

  name: "Leadwell Pharmaceuticals",
  legalName: "Leadwell Pharmaceuticals",
  url: BASE_URL,

  logo: {
    "@type": "ImageObject",
    "@id": `${BASE_URL}/#logo`,
    url: `${BASE_URL}/logo.png`,
    contentUrl: `${BASE_URL}/logo.png`,
    caption: "Leadwell Pharmaceuticals",
  },

  image: {
    "@id": `${BASE_URL}/#logo`,
  },

  description:
    "Leadwell Pharmaceuticals is a Hyderabad-based pharmaceutical company offering healthcare, nutraceutical, orthopaedic and specialty pharmaceutical products across India.",

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

  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+91-9346652741",
      email: "lwppharma@gmail.com",
      contactType: "customer support",
      areaServed: "IN",
      availableLanguage: ["English", "Telugu", "Hindi"],
    },
  ],

  knowsAbout: [
    "Pharmaceutical Products",
    "Healthcare Products",
    "Nutraceuticals",
    "Orthopaedic Formulations",
    "Neurology Products",
    "Tablets",
    "Capsules",
    "Specialty Pharmaceutical Products",
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${BASE_URL}/#website`,

  name: "Leadwell Pharmaceuticals",
  alternateName: "Leadwell Pharma",
  url: BASE_URL,

  publisher: {
    "@id": `${BASE_URL}/#organization`,
  },

  inLanguage: "en-IN",
};

const globalStructuredData = {
  "@context": "https://schema.org",
  "@graph": [organizationSchema, websiteSchema],
};

export const metadata = {
  metadataBase: new URL(BASE_URL),

  title: {
    default:
      "Leadwell Pharmaceuticals | Pharmaceutical Products in India",
    template: "%s | Leadwell Pharmaceuticals",
  },

  description:
    "Leadwell Pharmaceuticals is a Hyderabad-based pharmaceutical company offering healthcare products, nutraceuticals, orthopaedic formulations, tablets, capsules and specialty pharmaceutical products across India.",

  applicationName: "Leadwell Pharmaceuticals",

  authors: [
    {
      name: "Leadwell Pharmaceuticals",
      url: BASE_URL,
    },
  ],

  creator: "Leadwell Pharmaceuticals",
  publisher: "Leadwell Pharmaceuticals",

  keywords: [
    "Leadwell Pharmaceuticals",
    "Leadwell Pharma",
    "pharmaceutical company in Hyderabad",
    "pharmaceutical company in Telangana",
    "pharmaceutical company in India",
    "pharmaceutical products",
    "healthcare products",
    "orthopaedic products",
    "neurology products",
    "nutraceutical products",
    "tablets and capsules",
    "hospital pharmaceutical supplies",
  ],

  category: "Healthcare",

  referrer: "origin-when-cross-origin",

  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    locale: "en_IN",
    url: BASE_URL,
    siteName: "Leadwell Pharmaceuticals",

    title:
      "Leadwell Pharmaceuticals | Pharmaceutical Products in India",

    description:
      "Explore pharmaceutical, nutraceutical, orthopaedic, neurological and healthcare products from Leadwell Pharmaceuticals, Hyderabad.",

    images: [
      {
        url: "/logo.png",
        width: 512,
        height: 512,
        alt: "Leadwell Pharmaceuticals logo",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title:
      "Leadwell Pharmaceuticals | Pharmaceutical Products in India",

    description:
      "Explore pharmaceutical and healthcare products from Leadwell Pharmaceuticals, Hyderabad.",

    images: ["/logo.png"],
  },

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  icons: {
    icon: [
      {
        url: "/favicon.ico",
      },
      {
        url: "/logo.png",
        type: "image/png",
      },
    ],

    shortcut: "/favicon.ico",
    apple: "/logo.png",
  },

  appleWebApp: {
    capable: true,
    title: "Leadwell Pharmaceuticals",
    statusBarStyle: "default",
  },

  verification: {
    /*
     * Add your Google Search Console verification code here only
     * when Google provides a meta-tag verification value.
     *
     * Example:
     * google: "your-google-verification-code",
     */
  },
};

/*
 * Next.js requires themeColor and viewport settings to be exported
 * separately from metadata.
 */
export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#005a8d",
  colorScheme: "light",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-IN">
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: serializeJsonLd(globalStructuredData),
          }}
        />

        {/* ================= NAVBAR ================= */}

        <header>
          <nav
            aria-label="Main navigation"
            className="sticky top-0 z-50 flex items-center justify-between bg-white px-[5%] py-4 shadow-md"
          >
            <Link
              href="/"
              aria-label="Leadwell Pharmaceuticals homepage"
              className="flex items-center gap-3"
            >
              <Image
                src="/logo.png"
                alt="Leadwell Pharmaceuticals logo"
                width={176}
                height={60}
                priority
                sizes="176px"
                className="h-11 w-auto object-contain"
              />

              <div className="hidden md:block">
                <p className="text-xl font-bold uppercase leading-tight text-[#005a8d]">
                  Leadwell
                </p>

                <p className="-mt-1 text-xs text-gray-500">
                  Pharmaceuticals
                </p>
              </div>
            </Link>

            <ul className="flex items-center gap-4 text-sm font-semibold text-gray-700 sm:gap-6 md:gap-8 md:text-base">
              <li>
                <Link
                  href="/"
                  className="transition duration-300 hover:text-[#2ecc71] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#005a8d] focus-visible:ring-offset-4"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  href="/products"
                  className="transition duration-300 hover:text-[#2ecc71] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#005a8d] focus-visible:ring-offset-4"
                >
                  Products
                </Link>
              </li>

              <li>
                <Link
                  href="/about"
                  className="transition duration-300 hover:text-[#2ecc71] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#005a8d] focus-visible:ring-offset-4"
                >
                  About Us
                </Link>
              </li>

              <li>
                <Link
                  href="/contact"
                  className="transition duration-300 hover:text-[#2ecc71] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#005a8d] focus-visible:ring-offset-4"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </nav>
        </header>

        {/* ================= PAGE CONTENT ================= */}

        {children}

        {/* ================= FOOTER ================= */}

        <footer className="mt-20 bg-[#003b5c] text-white">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-14 md:grid-cols-2 lg:grid-cols-4">
            {/* Company information */}

            <section aria-labelledby="footer-company-heading">
              <div className="mb-5 flex items-center gap-3">
                <Image
                  src="/logo.png"
                  alt="Leadwell Pharmaceuticals logo"
                  width={180}
                  height={72}
                  sizes="180px"
                  className="h-14 w-auto object-contain"
                />

                <div>
                  <h2
                    id="footer-company-heading"
                    className="text-2xl font-bold uppercase"
                  >
                    Leadwell
                  </h2>

                  <p className="text-sm text-blue-200">
                    Pharmaceuticals
                  </p>
                </div>
              </div>

              <p className="text-sm leading-7 text-gray-300">
                Leadwell Pharmaceuticals is committed to providing
                reliable pharmaceutical and healthcare products with a
                focus on quality, safety and patient care. We serve
                healthcare professionals and institutions across India.
              </p>
            </section>

            {/* Quick links */}

            <nav aria-labelledby="footer-links-heading">
              <h2
                id="footer-links-heading"
                className="mb-5 text-xl font-semibold text-[#2ecc71]"
              >
                Quick Links
              </h2>

              <ul className="space-y-3 text-gray-300">
                <li>
                  <Link
                    href="/"
                    className="transition duration-300 hover:text-white"
                  >
                    Home
                  </Link>
                </li>

                <li>
                  <Link
                    href="/products"
                    className="transition duration-300 hover:text-white"
                  >
                    Products
                  </Link>
                </li>

                <li>
                  <Link
                    href="/about"
                    className="transition duration-300 hover:text-white"
                  >
                    About Us
                  </Link>
                </li>

                <li>
                  <Link
                    href="/contact"
                    className="transition duration-300 hover:text-white"
                  >
                    Contact Us
                  </Link>
                </li>
              </ul>
            </nav>

            {/* Contact details */}

            <section aria-labelledby="footer-contact-heading">
              <h2
                id="footer-contact-heading"
                className="mb-5 text-xl font-semibold text-[#2ecc71]"
              >
                Contact Us
              </h2>

              <address className="space-y-4 text-sm not-italic text-gray-300">
                <p>
                  <span aria-hidden="true">📍</span>{" "}
                  Hyderabad, Telangana, India
                </p>

                <p>
                  <span aria-hidden="true">📞</span>{" "}
                  <a
                    href="tel:+919346652741"
                    className="transition hover:text-white"
                  >
                    +91 9346652741
                  </a>
                </p>

                <p>
                  <span aria-hidden="true">✉</span>{" "}
                  <a
                    href="mailto:lwppharma@gmail.com"
                    className="break-all transition hover:text-white"
                  >
                    lwppharma@gmail.com
                  </a>
                </p>

                <p>
                  <span aria-hidden="true">🌐</span>{" "}
                  <a
                    href={BASE_URL}
                    className="break-all transition hover:text-white"
                  >
                    leadwellpharmaceuticals.com
                  </a>
                </p>
              </address>
            </section>

            {/* Business hours */}

            <section aria-labelledby="footer-hours-heading">
              <h2
                id="footer-hours-heading"
                className="mb-5 text-xl font-semibold text-[#2ecc71]"
              >
                Business Hours
              </h2>

              <div className="space-y-3 text-sm text-gray-300">
                <p>
                  <span className="font-semibold text-white">
                    Monday – Saturday
                  </span>
                </p>

                <p>09:00 AM – 07:00 PM</p>

                <p>
                  <span className="font-semibold text-white">
                    Sunday
                  </span>{" "}
                  – Closed
                </p>

                <div className="pt-5">
                  <span className="inline-flex rounded-full bg-[#2ecc71] px-4 py-2 text-xs font-semibold text-white">
                    Trusted Healthcare Partner
                  </span>
                </div>
              </div>
            </section>
          </div>

          {/* Bottom footer */}

          <div className="border-t border-white/10">
            <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-5 text-sm text-gray-300 md:flex-row">
              <p className="text-center md:text-left">
                © {new Date().getFullYear()} Leadwell Pharmaceuticals.
                All Rights Reserved.
              </p>

              <p>
                Designed &amp; Developed by{" "}
                <span className="font-semibold text-[#2ecc71]">
                  Vegaahi
                </span>
              </p>
            </div>
          </div>
        </footer>

        <GoogleAnalytics gaId="G-MMJP02NJ42" />
      </body>
    </html>
  );
}