import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Boxes,
  ChevronRight,
  PackageSearch,
} from "lucide-react";

import {
  productCategories,
  products,
} from "@/lib/data/products";

const BASE_URL = "https://leadwellpharmaceuticals.com";

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

      itemListElement: products.map((product, index) => ({
        "@type": "ListItem",
        position: index + 1,

        item: {
          "@type": "Product",
          name: product.name,
          url: `${BASE_URL}/products/${product.slug}`,
          image: `${BASE_URL}${getProductImage(product)}`,
          description: product.description,
          category: product.category,

          brand: {
            "@type": "Brand",
            name: "Leadwell Pharmaceuticals",
          },
        },
      })),
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
          __html: serializeJsonLd(structuredData),
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

          <header className="mb-16 text-center sm:mb-20">
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
              Our Pharmaceutical Product Portfolio
            </h1>

            <p className="mx-auto max-w-3xl text-lg leading-relaxed text-slate-600">
              Explore our growing range of orthopaedic,
              neurological, nutraceutical and general healthcare
              products. Product information is intended for
              healthcare professionals and general informational
              purposes.
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-3">
              {productCategories.map((category) => (
                <a
                  key={category}
                  href={`#${category
                    .toLowerCase()
                    .replace(/\s+/g, "-")}`}
                  className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-bold text-[#005a8d] shadow-sm transition hover:border-[#2ecc71] hover:text-[#2ecc71]"
                >
                  {category}
                </a>
              ))}
            </div>
          </header>

          {products.length > 0 ? (
            <div className="space-y-20">
              {productCategories.map((category) => {
                const categoryProducts = products.filter(
                  (product) =>
                    product.category === category,
                );

                const sectionId = category
                  .toLowerCase()
                  .replace(/\s+/g, "-");

                return (
                  <section
                    key={category}
                    id={sectionId}
                    aria-labelledby={`${sectionId}-heading`}
                    className="scroll-mt-28"
                  >
                    <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                      <div>
                        <p className="mb-2 text-xs font-black uppercase tracking-[0.22em] text-[#2ecc71]">
                          Therapeutic Category
                        </p>

                        <h2
                          id={`${sectionId}-heading`}
                          className="text-3xl font-extrabold text-[#005a8d] md:text-4xl"
                        >
                          {category}
                        </h2>
                      </div>

                      <p className="text-sm font-semibold text-slate-500">
                        {categoryProducts.length}{" "}
                        {categoryProducts.length === 1
                          ? "product"
                          : "products"}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                      {categoryProducts.map((product) => {
                        const productImage =
                          getProductImage(product);

                        return (
                          <article
                            key={product.slug}
                            className="group flex h-full flex-col overflow-hidden rounded-[32px] border border-slate-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
                          >
                            <Link
                              href={`/products/${product.slug}`}
                              aria-label={`View ${product.name} product details`}
                              className="relative mb-6 block h-56 overflow-hidden rounded-[24px] bg-slate-50 transition-colors group-hover:bg-[#2ecc71]/5"
                            >
                              <Image
                                src={productImage}
                                alt={`${product.name} pharmaceutical product by Leadwell Pharmaceuticals`}
                                fill
                                sizes="
                                  (max-width: 640px) 90vw,
                                  (max-width: 1024px) 45vw,
                                  (max-width: 1280px) 30vw,
                                  25vw
                                "
                                className="object-contain p-5 drop-shadow-md transition-transform duration-500 group-hover:scale-105"
                              />
                            </Link>

                            <div className="flex flex-1 flex-col">
                              <span className="w-fit rounded-full bg-[#2ecc71]/10 px-3 py-1 text-[10px] font-black uppercase tracking-[2px] text-[#218c50]">
                                {product.category}
                              </span>

                              <h3 className="mb-3 mt-4 text-2xl font-bold leading-tight text-[#005a8d]">
                                <Link
                                  href={`/products/${product.slug}`}
                                  className="transition hover:text-[#2ecc71]"
                                >
                                  {product.name}
                                </Link>
                              </h3>

                              {product.description && (
                                <p className="mb-5 line-clamp-3 text-sm leading-relaxed text-slate-600">
                                  {product.description}
                                </p>
                              )}

                              {product.composition && (
                                <div className="mb-6 rounded-2xl bg-slate-50 p-4">
                                  <p className="mb-1 text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">
                                    Composition
                                  </p>

                                  <p className="line-clamp-3 text-xs leading-relaxed text-slate-600">
                                    {product.composition}
                                  </p>
                                </div>
                              )}

                              <Link
                                href={`/products/${product.slug}`}
                                className="mt-auto inline-flex items-center justify-center gap-2 rounded-xl border-2 border-[#005a8d] px-4 py-3.5 text-center font-bold text-[#005a8d] transition hover:bg-[#005a8d] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2ecc71] focus-visible:ring-offset-2"
                              >
                                View Product Details

                                <ArrowRight
                                  size={17}
                                  aria-hidden="true"
                                />
                              </Link>
                            </div>
                          </article>
                        );
                      })}
                    </div>
                  </section>
                );
              })}
            </div>
          ) : (
            <section className="mx-auto max-w-2xl rounded-3xl border border-slate-100 bg-white p-10 text-center shadow-sm">
              <PackageSearch
                size={48}
                aria-hidden="true"
                className="mx-auto mb-5 text-[#2ecc71]"
              />

              <h2 className="text-2xl font-bold text-[#005a8d]">
                Products Coming Soon
              </h2>

              <p className="mt-3 text-slate-500">
                Our pharmaceutical product portfolio will be
                available shortly.
              </p>
            </section>
          )}

          {/* Contact CTA */}

          <section className="mt-24 rounded-[40px] bg-[#005a8d] px-8 py-14 text-center text-white sm:px-12">
            <h2 className="mb-5 text-3xl font-extrabold md:text-4xl">
              Need product or supply information?
            </h2>

            <p className="mx-auto mb-8 max-w-2xl leading-relaxed text-blue-100">
              Contact our team for product information, hospital
              supply requirements or distribution-related enquiries.
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