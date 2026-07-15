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
    "Leadwell Pharmaceuticals is a Hyderabad-based pharmaceutical company offering quality healthcare products, tablets, capsules, nutraceuticals and specialty pharmaceutical formulations.",

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
        <nav className="flex justify-between items-center py-4 px-[5%] bg-white shadow-md sticky top-0 z-50">

          <Link href="/" className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="Leadwell Pharmaceuticals"
              className="h-11 w-auto"
            />

            <div className="hidden md:block">
              <h2 className="text-xl font-bold text-[#005a8d] uppercase">
                Leadwell
              </h2>
              <p className="text-xs text-gray-500 -mt-1">
                Pharmaceuticals
              </p>
            </div>
          </Link>

          <ul className="flex gap-8 font-semibold text-gray-700">
            <li>
              <Link href="/" className="hover:text-[#2ecc71] duration-300">
                Home
              </Link>
            </li>

            <li>
              <Link
                href="/products"
                className="hover:text-[#2ecc71] duration-300"
              >
                Products
              </Link>
            </li>

            <li>
              <Link
                href="/about"
                className="hover:text-[#2ecc71] duration-300"
              >
                About Us
              </Link>
            </li>

            <li>
              <Link
                href="/contact"
                className="hover:text-[#2ecc71] duration-300"
              >
                Contact Us
              </Link>
            </li>
          </ul>
        </nav>

        {/* ================= MAIN ================= */}

        <main>{children}</main>

        {/* ================= FOOTER ================= */}

        <footer className="bg-[#003b5c] text-white mt-20">

          <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

            {/* Company */}
            <div>
              <div className="flex items-center gap-3 mb-5">
                <img
                  src="/logo.png"
                  alt="Leadwell"
                  className="h-14"
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

              <p className="text-gray-300 leading-7 text-sm">
                Leadwell Pharmaceuticals is dedicated to delivering
                high-quality pharmaceutical products with a strong
                commitment to innovation, safety, and patient care.
                We strive to improve healthcare by providing reliable
                and affordable medicines across India.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-xl font-semibold mb-5 text-[#2ecc71]">
                Quick Links
              </h3>

              <ul className="space-y-3 text-gray-300">

                <li>
                  <Link href="/" className="hover:text-white duration-300">
                    Home
                  </Link>
                </li>

                <li>
                  <Link
                    href="/products"
                    className="hover:text-white duration-300"
                  >
                    Products
                  </Link>
                </li>

                <li>
                  <Link
                    href="/about"
                    className="hover:text-white duration-300"
                  >
                    About Us
                  </Link>
                </li>

                <li>
                  <Link
                    href="/contact"
                    className="hover:text-white duration-300"
                  >
                    Contact Us
                  </Link>
                </li>

              </ul>
            </div>

            {/* Contact */}
            <div>

              <h3 className="text-xl font-semibold mb-5 text-[#2ecc71]">
                Contact Us
              </h3>

              <div className="space-y-4 text-gray-300 text-sm">

                <p>
                  📍 Hyderabad, Telangana, India
                </p>

                <p>
                  📞 +91 9346652741
                </p>

                <p>
                  ✉ lwppharma@gmail.com
                </p>

                <p>
                  🌐 www.leadwellpharmaceuticals.com
                </p>

              </div>

            </div>

            {/* Business Hours */}
            <div>

              <h3 className="text-xl font-semibold mb-5 text-[#2ecc71]">
                Business Hours
              </h3>

              <div className="space-y-3 text-gray-300 text-sm">

                <p>Monday - Saturday</p>

                <p>09:00 AM - 07:00 PM</p>

                <p>Sunday - Closed</p>

                <div className="pt-5">

                  <span className="bg-[#2ecc71] px-4 py-2 rounded-full font-semibold text-white text-xs">
                    Trusted Healthcare Partner
                  </span>

                </div>

              </div>

            </div>

          </div>

          {/* Bottom Footer */}

          <div className="border-t border-white/10">

            <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row justify-between items-center text-sm text-gray-300">

              <p>
                © {new Date().getFullYear()} Leadwell Pharmaceuticals.
                All Rights Reserved.
              </p>

              <p className="mt-3 md:mt-0">
                Designed & Developed by{" "}
                <span className="font-semibold text-[#2ecc71]">
                  Vegaahi
                </span>
              </p>

            </div>

          </div>

        </footer>

      </body>
    </html>
  );
}