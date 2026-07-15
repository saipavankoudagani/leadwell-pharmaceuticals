import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";
import Link from "next/link";

export const metadata = {
  metadataBase: new URL("https://leadwellpharmaceuticals.com"),

  title: {
    default:
      "Leadwell Pharmaceuticals | Quality Pharmaceutical Products in India",
    template: "%s | Leadwell Pharmaceuticals",
  },

  description:
    "Leadwell Pharmaceuticals is a Hyderabad-based pharmaceutical company offering quality healthcare products, tablets, capsules, nutraceuticals, orthopedic formulations, and specialty pharmaceutical products across India.",

  applicationName: "Leadwell Pharmaceuticals",

  authors: [
    {
      name: "Leadwell Pharmaceuticals",
      url: "https://leadwellpharmaceuticals.com",
    },
  ],

  creator: "Leadwell Pharmaceuticals",
  publisher: "Leadwell Pharmaceuticals",

  keywords: [
    "Leadwell Pharmaceuticals",
    "Leadwell Pharma",
    "pharmaceutical company in Hyderabad",
    "pharmaceutical company in India",
    "pharmaceutical products",
    "healthcare products",
    "orthopedic medicines",
    "nutraceutical products",
    "tablets and capsules",
    "hospital pharmaceutical supplies",
  ],

  category: "Healthcare",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://leadwellpharmaceuticals.com",
    siteName: "Leadwell Pharmaceuticals",
    title:
      "Leadwell Pharmaceuticals | Quality Pharmaceutical Products in India",
    description:
      "Explore quality pharmaceutical and healthcare products from Leadwell Pharmaceuticals, Hyderabad.",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Leadwell Pharmaceuticals",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title:
      "Leadwell Pharmaceuticals | Quality Pharmaceutical Products in India",
    description:
      "Explore quality pharmaceutical and healthcare products from Leadwell Pharmaceuticals, Hyderabad.",
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
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/logo.png",
  },

  verification: {},
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        {/* ================= NAVBAR ================= */}

        <nav className="sticky top-0 z-50 flex items-center justify-between bg-white px-[5%] py-4 shadow-md">
          <Link href="/" className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="Leadwell Pharmaceuticals"
              className="h-11 w-auto"
            />

            <div className="hidden md:block">
              <h2 className="text-xl font-bold uppercase text-[#005a8d]">
                Leadwell
              </h2>

              <p className="-mt-1 text-xs text-gray-500">
                Pharmaceuticals
              </p>
            </div>
          </Link>

          <ul className="flex gap-4 text-sm font-semibold text-gray-700 sm:gap-6 md:gap-8 md:text-base">
            <li>
              <Link
                href="/"
                className="transition duration-300 hover:text-[#2ecc71]"
              >
                Home
              </Link>
            </li>

            <li>
              <Link
                href="/products"
                className="transition duration-300 hover:text-[#2ecc71]"
              >
                Products
              </Link>
            </li>

            <li>
              <Link
                href="/about"
                className="transition duration-300 hover:text-[#2ecc71]"
              >
                About Us
              </Link>
            </li>

            <li>
              <Link
                href="/contact"
                className="transition duration-300 hover:text-[#2ecc71]"
              >
                Contact Us
              </Link>
            </li>
          </ul>
        </nav>

        {/* ================= MAIN ================= */}

        <main>{children}</main>

        {/* ================= FOOTER ================= */}

        <footer className="mt-20 bg-[#003b5c] text-white">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-14 md:grid-cols-2 lg:grid-cols-4">
            {/* Company */}

            <div>
              <div className="mb-5 flex items-center gap-3">
                <img
                  src="/logo.png"
                  alt="Leadwell Pharmaceuticals logo"
                  className="h-14 w-auto"
                />

                <div>
                  <h2 className="text-2xl font-bold uppercase">
                    Leadwell
                  </h2>

                  <p className="text-sm text-blue-200">
                    Pharmaceuticals
                  </p>
                </div>
              </div>

              <p className="text-sm leading-7 text-gray-300">
                Leadwell Pharmaceuticals is dedicated to delivering
                high-quality pharmaceutical products with a strong
                commitment to innovation, safety, and patient care. We
                strive to improve healthcare by providing reliable and
                affordable medicines across India.
              </p>
            </div>

            {/* Quick Links */}

            <div>
              <h3 className="mb-5 text-xl font-semibold text-[#2ecc71]">
                Quick Links
              </h3>

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
            </div>

            {/* Contact */}

            <div>
              <h3 className="mb-5 text-xl font-semibold text-[#2ecc71]">
                Contact Us
              </h3>

              <div className="space-y-4 text-sm text-gray-300">
                <p>📍 Hyderabad, Telangana, India</p>

                <p>
                  📞{" "}
                  <a
                    href="tel:+919346652741"
                    className="transition hover:text-white"
                  >
                    +91 9346652741
                  </a>
                </p>

                <p>
                  ✉{" "}
                  <a
                    href="mailto:lwppharma@gmail.com"
                    className="transition hover:text-white"
                  >
                    lwppharma@gmail.com
                  </a>
                </p>

                <p>
                  🌐{" "}
                  <a
                    href="https://leadwellpharmaceuticals.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="break-all transition hover:text-white"
                  >
                    leadwellpharmaceuticals.com
                  </a>
                </p>
              </div>
            </div>

            {/* Business Hours */}

            <div>
              <h3 className="mb-5 text-xl font-semibold text-[#2ecc71]">
                Business Hours
              </h3>

              <div className="space-y-3 text-sm text-gray-300">
                <p>Monday - Saturday</p>
                <p>09:00 AM - 07:00 PM</p>
                <p>Sunday - Closed</p>

                <div className="pt-5">
                  <span className="rounded-full bg-[#2ecc71] px-4 py-2 text-xs font-semibold text-white">
                    Trusted Healthcare Partner
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Footer */}

          <div className="border-t border-white/10">
            <div className="mx-auto flex max-w-7xl flex-col items-center justify-between px-6 py-5 text-sm text-gray-300 md:flex-row">
              <p className="text-center md:text-left">
                © {new Date().getFullYear()} Leadwell Pharmaceuticals.
                All Rights Reserved.
              </p>

              <p className="mt-3 md:mt-0">
                Designed &amp; Developed by{" "}
                <span className="font-semibold text-[#2ecc71]">
                  Vegaahi
                </span>
              </p>
            </div>
          </div>
        </footer>
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />

</body>
</html>
  );
}