import Link from "next/link";
import {
  ArrowRight,
  Boxes,
  ChevronRight,
} from "lucide-react";

import ProductsExplorer from "@/components/ProductsExplorer";
import { products } from "@/lib/data/products";

const BASE_URL =
  "https://leadwellpharmaceuticals.com";

export const metadata = {
  title: "Pharmaceutical Products",

  description:
    "Explore pharmaceutical, nutraceutical, orthopaedic, neurological and general healthcare products from Leadwell Pharmaceuticals, Hyderabad.",

  alternates: {
    canonical: "/products",
  },

  openGraph: {
    type: "website",
    locale: "en_IN",
    url: `${BASE_URL}/products`,
    siteName: "Leadwell Pharmaceuticals",
    title:
      "Pharmaceutical Products | Leadwell Pharmaceuticals",
    description:
      "Explore pharmaceutical, orthopaedic, neurological, nutraceutical and general healthcare products from Leadwell Pharmaceuticals.",
    images: [
      {
        url: "/pharma-1.png",
        width: 1200,
        height: 630,
        alt: "Leadwell Pharmaceuticals product portfolio",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title:
      "Pharmaceutical Products | Leadwell Pharmaceuticals",
    description:
      "Explore pharmaceutical and healthcare products from Leadwell Pharmaceuticals.",
    images: ["/pharma-1.png"],
  },

  robots: {
    index: true,
    follow: true,
  },
};

function getProductImage(product) {
  if (product.mainImage) {
    return product.mainImage;
  }

  if (
    Array.isArray(product.gallery) &&
    product.gallery.length > 0
  ) {
    return product.gallery[0];
  }

  return "/logo.png";
}

function serializeJsonLd(data) {
  return JSON.stringify(data)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026");
}

export default function ProductsPage() {
  const productListSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${BASE_URL}/products#webpage`,
    url: `${BASE_URL}/products`,
    name:
      "Pharmaceutical Products | Leadwell Pharmaceuticals",
    description:
      "Explore the pharmaceutical and healthcare product portfolio of Leadwell Pharmaceuticals.",

    isPartOf: {
      "@id": `${BASE_URL}/#website`,
    },

    about: {
      "@id": `${BASE_URL}/#organization`,
    },

    mainEntity: {
      "@type": "ItemList",
      numberOfItems: products.length,

      itemListElement: products.map(
        (product, index) => ({
          "@type": "ListItem",
          position: index + 1,

          item: {
           "@type": "Thing",
            name: product.name,
            url: `${BASE_URL}/products/${product.slug}`,
            image: `${BASE_URL}${getProductImage(
              product,
            )}`,
            description:
              product.description ||
              product.tagline ||
              product.composition ||
              `${product.name} by Leadwell Pharmaceuticals`,
            category: product.category,

            brand: {
              "@type": "Brand",
              name: "Leadwell Pharmaceuticals",
            },
          },
        }),
      ),
    },

    breadcrumb: {
      "@id": `${BASE_URL}/products#breadcrumb`,
    },

    inLanguage: "en-IN",
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${BASE_URL}/products#breadcrumb`,

    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: BASE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Products",
        item: `${BASE_URL}/products`,
      },
    ],
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      productListSchema,
      breadcrumbSchema,
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(
            structuredData,
          ),
        }}
      />

      <main className="min-h-screen bg-[#f8fbff] px-[5%] py-16 sm:py-20">
        <div className="mx-auto max-w-7xl">
          {/* Breadcrumb */}

          <nav
            aria-label="Breadcrumb"
            className="mb-10 flex items-center gap-2 text-sm"
          >
            <Link
              href="/"
              className="font-medium text-slate-500 transition hover:text-[#2ecc71]"
            >
              Home
            </Link>

            <ChevronRight
              size={15}
              aria-hidden="true"
              className="text-slate-300"
            />

            <span
              aria-current="page"
              className="font-semibold text-[#005a8d]"
            >
              Products
            </span>
          </nav>

          {/* Page heading */}

          <header className="mb-12 text-center sm:mb-14">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 shadow-sm">
              <Boxes
                size={16}
                aria-hidden="true"
                className="text-[#2ecc71]"
              />

              <span className="text-xs font-black uppercase tracking-[0.22em] text-[#005a8d]">
                Leadwell Pharmaceuticals
              </span>
            </div>

            <h1 className="mb-6 text-4xl font-extrabold leading-tight text-[#005a8d] md:text-5xl lg:text-6xl">
              Our Pharmaceutical Product
              Portfolio
            </h1>

            <p className="mx-auto max-w-3xl text-lg leading-relaxed text-slate-600">
              Explore our growing range of
              orthopaedic, neurological,
              gastroenterology, gynecology,
              nutraceutical and general
              healthcare products.
            </p>
          </header>

          {/* Search, dropdown and unified product grid */}

          <ProductsExplorer
            products={products}
          />

          {/* Contact CTA */}

          <section className="mt-24 rounded-[40px] bg-[#005a8d] px-8 py-14 text-center text-white sm:px-12">
            <h2 className="mb-5 text-3xl font-extrabold md:text-4xl">
              Need product or supply
              information?
            </h2>

            <p className="mx-auto mb-8 max-w-2xl leading-relaxed text-blue-100">
              Contact our team for product
              information, hospital supply
              requirements or distribution-related
              enquiries.
            </p>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-2xl bg-[#2ecc71] px-8 py-4 font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#27ae60] hover:shadow-xl"
            >
              Contact Leadwell

              <ArrowRight
                size={18}
                aria-hidden="true"
              />
            </Link>
          </section>
        </div>
      </main>
    </>
  );
}