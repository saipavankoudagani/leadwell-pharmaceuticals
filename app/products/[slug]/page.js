import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  ChevronRight,
  Info,
  ShieldCheck,
} from "lucide-react";

import ProductGallery from "@/components/ProductGallery";
import {
  getProductBySlug,
  products,
} from "@/lib/data/products";

const BASE_URL = "https://leadwellpharmaceuticals.com";
const DEFAULT_IMAGE = "/logo.png";

/*
 * Only product slugs returned by generateStaticParams are valid.
 *
 * If a URL contains an unknown product slug, Next.js will show
 * the not-found page rather than attempting to generate it.
 */
export const dynamicParams = false;

/*
 * Convert a local public image path into a full absolute URL.
 *
 * Example:
 * /products/cpwalk-main.png
 *
 * becomes:
 * https://leadwellpharmaceuticals.com/products/cpwalk-main.png
 */
function getAbsoluteImageUrl(imagePath) {
  if (!imagePath) {
    return `${BASE_URL}${DEFAULT_IMAGE}`;
  }

  if (
    imagePath.startsWith("http://") ||
    imagePath.startsWith("https://")
  ) {
    return imagePath;
  }

  const normalizedPath = imagePath.startsWith("/")
    ? imagePath
    : `/${imagePath}`;

  return `${BASE_URL}${normalizedPath}`;
}

/*
 * Return all available product images.
 *
 * Priority:
 * 1. Gallery images
 * 2. Main image
 * 3. Website logo
 */
function getProductImages(product) {
  const galleryImages = Array.isArray(product?.gallery)
    ? product.gallery.filter(
        (image) =>
          typeof image === "string" && image.trim().length > 0,
      )
    : [];

  if (galleryImages.length > 0) {
    return [...new Set(galleryImages)];
  }

  if (product?.mainImage) {
    return [product.mainImage];
  }

  return [DEFAULT_IMAGE];
}

/*
 * Keep metadata descriptions within a practical search-result length.
 */
function createMetaDescription(product) {
  const compositionText = product.composition
    ? ` Composition: ${product.composition}.`
    : "";

  const fullDescription =
    `${product.name} by Leadwell Pharmaceuticals. ` +
    `${product.description || ""}${compositionText}`;

  const normalizedDescription = fullDescription
    .replace(/\s+/g, " ")
    .trim();

  if (normalizedDescription.length <= 160) {
    return normalizedDescription;
  }

  return `${normalizedDescription.slice(0, 157).trimEnd()}...`;
}

/*
 * Safely serialize structured data before inserting it into HTML.
 */
function serializeJsonLd(data) {
  return JSON.stringify(data)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026");
}

/*
 * Generate all known product pages during the production build.
 */
export function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

/*
 * Generate unique metadata for every product page.
 */
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: "Product Not Found",
      description:
        "The requested pharmaceutical product could not be found.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const productUrl = `${BASE_URL}/products/${product.slug}`;
  const productImages = getProductImages(product).map(
    getAbsoluteImageUrl,
  );
  const description = createMetaDescription(product);

  return {
    title: product.name,
    description,

    alternates: {
      canonical: productUrl,
    },

    openGraph: {
      type: "website",
      locale: "en_IN",
      url: productUrl,
      siteName: "Leadwell Pharmaceuticals",
      title: `${product.name} | Leadwell Pharmaceuticals`,
      description,
      images: productImages.map((image, index) => ({
        url: image,
        width: 1200,
        height: 1200,
        alt:
          index === 0
            ? `${product.name} pharmaceutical product`
            : `${product.name} product view ${index + 1}`,
      })),
    },

    twitter: {
      card: "summary_large_image",
      title: `${product.name} | Leadwell Pharmaceuticals`,
      description,
      images: [productImages[0]],
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

    other: {
      manufacturer: "Leadwell Pharmaceuticals",
      category:
        product.category || "Pharmaceutical Product",
    },
  };
}

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const productUrl = `${BASE_URL}/products/${product.slug}`;
  const productGallery = getProductImages(product);

  const absoluteProductImages = productGallery.map(
    getAbsoluteImageUrl,
  );

  /*
   * Select up to three related products from the same category.
   *
   * These links help visitors discover related products and improve
   * internal linking for search engines.
   */
  const relatedProducts = products
    .filter(
      (item) =>
        item.slug !== product.slug &&
        item.category === product.category,
    )
    .slice(0, 3);

  const additionalProperties = [];

  if (product.composition) {
    additionalProperties.push({
      "@type": "PropertyValue",
      name: "Composition",
      value: product.composition,
    });
  }

  if (product.indications) {
    additionalProperties.push({
      "@type": "PropertyValue",
      name: "Product information",
      value: product.indications,
    });
  }

  /*
   * Product structured data.
   *
   * Price, ratings, reviews and availability are intentionally excluded
   * because they should only be included when genuine data exists.
   */
  const productSchema = {
    "@type": "Product",
    "@id": `${productUrl}#product`,
    name: product.name,
    url: productUrl,
    description: product.description,
    image: absoluteProductImages,
    category:
      product.category || "Pharmaceutical Product",

    brand: {
      "@type": "Brand",
      name: "Leadwell Pharmaceuticals",
    },

    manufacturer: {
      "@type": "Organization",
      "@id": `${BASE_URL}/#organization`,
      name: "Leadwell Pharmaceuticals",
      url: BASE_URL,
    },

    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": productUrl,
    },

    ...(additionalProperties.length > 0 && {
      additionalProperty: additionalProperties,
    }),
  };

  /*
   * Breadcrumb structured data:
   *
   * Home → Products → Current product
   */
  const breadcrumbSchema = {
    "@type": "BreadcrumbList",
    "@id": `${productUrl}#breadcrumb`,

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
      {
        "@type": "ListItem",
        position: 3,
        name: product.name,
        item: productUrl,
      },
    ],
  };

  const webPageSchema = {
    "@type": "WebPage",
    "@id": productUrl,
    url: productUrl,
    name: `${product.name} | Leadwell Pharmaceuticals`,
    description: product.description,
    breadcrumb: {
      "@id": `${productUrl}#breadcrumb`,
    },
    mainEntity: {
      "@id": `${productUrl}#product`,
    },

    isPartOf: {
      "@type": "WebSite",
      "@id": `${BASE_URL}/#website`,
      name: "Leadwell Pharmaceuticals",
      url: BASE_URL,
    },
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      webPageSchema,
      productSchema,
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

      <main className="min-h-screen bg-slate-50 px-[5%] py-12">
        <div className="mx-auto max-w-6xl">
          {/* Visible breadcrumb navigation */}

          <nav
            aria-label="Breadcrumb"
            className="mb-8 flex flex-wrap items-center gap-2 text-sm"
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

            <Link
              href="/products"
              className="font-medium text-slate-500 transition hover:text-[#2ecc71]"
            >
              Products
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
              {product.name}
            </span>
          </nav>

          {/* Back link */}

          <Link
            href="/products"
            className="mb-8 inline-flex items-center font-bold text-[#005a8d] transition hover:text-[#2ecc71]"
          >
            <ArrowLeft
              size={18}
              aria-hidden="true"
              className="mr-2"
            />

            Back to All Products
          </Link>

          <div className="grid gap-12 lg:grid-cols-12">
            {/* Product gallery */}

            <section
              aria-label={`${product.name} image gallery`}
              className="lg:col-span-5"
            >
              <ProductGallery
                images={productGallery}
                productName={product.name}
              />
            </section>

            {/* Product information */}

            <article className="rounded-[40px] border border-slate-100 bg-white p-8 shadow-sm md:p-14 lg:col-span-7">
              <header>
                {product.category && (
                  <span className="inline-flex rounded-full bg-[#2ecc71]/10 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-[#218c50]">
                    {product.category}
                  </span>
                )}

                <h1 className="mb-4 mt-6 text-4xl font-extrabold text-[#005a8d] md:text-5xl">
                  {product.name}
                </h1>

                <p className="mb-3 text-sm font-semibold text-slate-400">
                  Marketed by Leadwell Pharmaceuticals
                </p>

                {product.description && (
                  <p className="mb-8 text-lg leading-relaxed text-slate-600">
                    {product.description}
                  </p>
                )}
              </header>

              <div className="space-y-6">
                {/* Composition */}

                {product.composition && (
                  <section className="rounded-3xl border border-blue-50 bg-[#f8fbff] p-8">
                    <h2 className="mb-3 flex items-center text-lg font-bold text-[#005a8d]">
                      <ShieldCheck
                        size={24}
                        aria-hidden="true"
                        className="mr-3 text-[#2ecc71]"
                      />

                      Composition
                    </h2>

                    <p className="font-medium leading-relaxed text-slate-700">
                      {product.composition}
                    </p>
                  </section>
                )}

                {/* Product information */}

                {product.indications && (
                  <section className="rounded-3xl border border-slate-100 p-8">
                    <h2 className="mb-3 flex items-center text-lg font-bold text-[#005a8d]">
                      <Info
                        size={24}
                        aria-hidden="true"
                        className="mr-3 text-[#2ecc71]"
                      />

                      Product Information
                    </h2>

                    <p className="leading-relaxed text-slate-600">
                      {product.indications}
                    </p>
                  </section>
                )}
              </div>

              {/* Enquiry button */}

              <div className="pt-10">
                <Link
                  href={`/contact?product=${encodeURIComponent(
                    product.name,
                  )}`}
                  className="block w-full rounded-2xl bg-[#005a8d] py-5 text-center text-lg font-bold text-white shadow-xl shadow-blue-900/20 transition hover:bg-[#004066]"
                >
                  Enquire About This Product
                </Link>
              </div>

              {/* Medical disclaimer */}

              <p className="mt-6 text-center text-xs leading-relaxed text-slate-400">
                Product information is intended for healthcare
                professionals and general informational purposes only.
                Use prescription products only under the guidance of a
                registered medical practitioner.
              </p>
            </article>
          </div>

          {/* Related products */}

          {relatedProducts.length > 0 && (
            <section
              aria-labelledby="related-products-heading"
              className="mt-20"
            >
              <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="mb-2 text-sm font-bold uppercase tracking-widest text-[#2ecc71]">
                    Explore More
                  </p>

                  <h2
                    id="related-products-heading"
                    className="text-3xl font-extrabold text-[#005a8d]"
                  >
                    Related Products
                  </h2>
                </div>

                <Link
                  href="/products"
                  className="inline-flex items-center font-bold text-[#005a8d] transition hover:text-[#2ecc71]"
                >
                  View All Products

                  <ArrowRight
                    size={18}
                    aria-hidden="true"
                    className="ml-2"
                  />
                </Link>
              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {relatedProducts.map((relatedProduct) => (
                  <article
                    key={relatedProduct.slug}
                    className="rounded-3xl border border-slate-100 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                  >
                    <p className="mb-3 text-xs font-black uppercase tracking-widest text-[#2ecc71]">
                      {relatedProduct.category}
                    </p>

                    <h3 className="mb-3 text-xl font-extrabold text-[#005a8d]">
                      <Link
                        href={`/products/${relatedProduct.slug}`}
                        className="transition hover:text-[#2ecc71]"
                      >
                        {relatedProduct.name}
                      </Link>
                    </h3>

                    <p className="mb-5 line-clamp-3 text-sm leading-relaxed text-slate-600">
                      {relatedProduct.description}
                    </p>

                    <Link
                      href={`/products/${relatedProduct.slug}`}
                      className="inline-flex items-center font-bold text-[#005a8d] transition hover:text-[#2ecc71]"
                      aria-label={`View details for ${relatedProduct.name}`}
                    >
                      View Product

                      <ArrowRight
                        size={16}
                        aria-hidden="true"
                        className="ml-2"
                      />
                    </Link>
                  </article>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
    </>
  );
}