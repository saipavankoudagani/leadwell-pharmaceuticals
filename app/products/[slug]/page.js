import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Info,
  Package,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Warehouse,
} from "lucide-react";

import ProductGallery from "@/components/ProductGallery";
import {
  getProductBySlug,
  products,
} from "@/lib/data/products";

const BASE_URL =
  "https://leadwellpharmaceuticals.com";

const COMPANY_NAME = "Leadwell Pharmaceuticals";
const DEFAULT_IMAGE = "/logo.png";

export const dynamicParams = false;

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

  return `${BASE_URL}${
    imagePath.startsWith("/")
      ? imagePath
      : `/${imagePath}`
  }`;
}

function getProductImages(product) {
  const galleryImages = Array.isArray(
    product?.gallery,
  )
    ? product.gallery.filter(
        (image) =>
          typeof image === "string" &&
          image.trim().length > 0,
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
 * This produces titles such as:
 * FRACMUST-PLUS | Leadwell Pharmaceuticals
 */
function createPageTitle(product) {
  return `${product.name} | ${COMPANY_NAME}`;
}

/*
 * Creates a description beginning with the exact
 * brand name and company name.
 */
function createMetaDescription(product) {
  const productDescription =
    product.description ||
    product.seoDescription ||
    product.tagline ||
    product.composition ||
    "";

  const companyMention =
    productDescription
      .toLowerCase()
      .includes("leadwell pharmaceuticals")
      ? ""
      : ` by ${COMPANY_NAME}`;

  const text = `${product.name}${companyMention}. ${productDescription}`
    .replace(/\s+/g, " ")
    .trim();

  if (text.length <= 160) {
    return text;
  }

  return `${text.slice(0, 157).trimEnd()}...`;
}

function serializeJsonLd(data) {
  return JSON.stringify(data)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026");
}

export function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: {
        absolute:
          "Product Not Found | Leadwell Pharmaceuticals",
      },

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
    title: {
      absolute: `${product.name} | Leadwell Pharmaceuticals`,
    },

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
            ? `${product.name} by Leadwell Pharmaceuticals`
            : `${product.name} product image ${index + 1}`,
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
  };
}

export default async function ProductPage({
  params,
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const productUrl = `${BASE_URL}/products/${product.slug}`;
  const pageTitle = createPageTitle(product);
  const description =
    createMetaDescription(product);

  const productGallery =
    getProductImages(product);

  const absoluteProductImages =
    productGallery.map(getAbsoluteImageUrl);

  const hasCompositionDetails =
    Array.isArray(product.compositionDetails) &&
    product.compositionDetails.length > 0;

  const packageInformation =
    product.packInfo ||
    product.packaging ||
    "";

  const relatedProducts = products
    .filter(
      (item) =>
        item.slug !== product.slug &&
        item.category === product.category,
    )
    .slice(0, 3);

  const structuredData = {
    "@context": "https://schema.org",

    "@graph": [
      {
        "@type": "MedicalWebPage",
        "@id": `${productUrl}#webpage`,
        url: productUrl,
        name: pageTitle,
        headline: product.name,
        description,
        image: absoluteProductImages,
        inLanguage: "en-IN",

        breadcrumb: {
          "@id": `${productUrl}#breadcrumb`,
        },

        isPartOf: {
          "@id": `${BASE_URL}/#website`,
        },

        about: {
          "@id": `${productUrl}#medical-entity`,
        },

        mainEntity: {
          "@id": `${productUrl}#medical-entity`,
        },

        publisher: {
          "@id": `${BASE_URL}/#organization`,
        },
      },

      {
        "@type": "MedicalEntity",
        "@id": `${productUrl}#medical-entity`,
        name: product.name,
        alternateName: product.name,
        url: productUrl,
        description,
        image: absoluteProductImages,

        mainEntityOfPage: {
          "@id": `${productUrl}#webpage`,
        },

        subjectOf: {
          "@id": `${productUrl}#webpage`,
        },
      },

      {
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
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html:
            serializeJsonLd(structuredData),
        }}
      />

      <main className="min-h-screen bg-slate-50 px-[5%] py-12">
        <div className="mx-auto max-w-7xl">
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

          <section className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <ProductGallery
                images={productGallery}
                productName={product.name}
              />
            </div>

            <article className="rounded-[40px] border border-slate-100 bg-white p-8 shadow-sm md:p-14 lg:col-span-7">
              {product.category && (
                <span className="inline-flex rounded-full bg-[#2ecc71]/10 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-[#218c50]">
                  {product.category}
                </span>
              )}

              <h1 className="mb-4 mt-6 text-4xl font-extrabold text-[#005a8d] md:text-5xl">
                {product.name}
              </h1>

              <p className="mb-4 text-sm font-bold uppercase tracking-wider text-[#218c50]">
                A Leadwell Pharmaceuticals Brand
              </p>

              {product.tagline && (
                <p className="mb-4 text-xl font-semibold leading-relaxed text-slate-700">
                  {product.tagline}
                </p>
              )}

              <p className="mb-3 text-sm font-semibold text-slate-400">
                Marketed by Leadwell
                Pharmaceuticals
              </p>

              {product.description && (
                <p className="mb-8 text-lg leading-relaxed text-slate-600">
                  {product.description}
                </p>
              )}

              <div className="grid gap-4 sm:grid-cols-2">
                <QuickInfo
                  Icon={Package}
                  label="Dosage Form"
                  value={
                    product.dosageForm ||
                    "Product formulation"
                  }
                />

                <QuickInfo
                  Icon={Stethoscope}
                  label="Category"
                  value={
                    product.category ||
                    "Healthcare"
                  }
                />
              </div>

              <div className="pt-8">
                <Link
                  href={`/contact?product=${encodeURIComponent(
                    product.name,
                  )}`}
                  className="block w-full rounded-2xl bg-[#005a8d] py-5 text-center text-lg font-bold text-white shadow-xl shadow-blue-900/20 transition hover:bg-[#004066]"
                >
                  Enquire About This Product
                </Link>
              </div>
            </article>
          </section>

          {product.overview && (
            <section className="mt-16 rounded-[40px] border border-slate-100 bg-white p-8 shadow-sm md:p-12">
              <SectionHeading
                Icon={Info}
                eyebrow="Product Overview"
                title={`About ${product.name}`}
              />

              <p className="max-w-4xl text-lg leading-8 text-slate-600">
                {product.overview}
              </p>
            </section>
          )}

          {hasCompositionDetails && (
            <section className="mt-16">
              <SectionHeading
                Icon={ShieldCheck}
                eyebrow="Formula"
                title="Composition"
              />

              <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-sm">
                <div className="grid grid-cols-2 bg-[#005a8d] px-6 py-4 font-bold text-white">
                  <span>Ingredient</span>

                  <span className="text-right">
                    Quantity
                  </span>
                </div>

                {product.compositionDetails.map(
                  (item) => (
                    <div
                      key={`${item.ingredient}-${item.quantity}`}
                      className="grid grid-cols-2 border-t border-slate-100 px-6 py-5"
                    >
                      <span className="font-semibold text-slate-700">
                        {item.ingredient}
                      </span>

                      <span className="text-right font-bold text-[#005a8d]">
                        {item.quantity}
                      </span>
                    </div>
                  ),
                )}
              </div>
            </section>
          )}

          {!hasCompositionDetails &&
            product.composition && (
              <section className="mt-16 rounded-[32px] border border-blue-50 bg-white p-8 shadow-sm">
                <SectionHeading
                  Icon={ShieldCheck}
                  eyebrow="Formula"
                  title="Composition"
                />

                <p className="leading-8 text-slate-700">
                  {product.composition}
                </p>
              </section>
            )}

          {Array.isArray(
            product.keyIngredients,
          ) &&
            product.keyIngredients.length > 0 && (
              <section className="mt-16">
                <SectionHeading
                  Icon={Sparkles}
                  eyebrow="Ingredient Profile"
                  title="Key Ingredients"
                />

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {product.keyIngredients.map(
                    (item) => (
                      <article
                        key={item.title}
                        className="rounded-[28px] border border-slate-100 bg-white p-7 shadow-sm"
                      >
                        <h3 className="mb-3 text-xl font-extrabold text-[#005a8d]">
                          {item.title}
                        </h3>

                        <p className="leading-7 text-slate-600">
                          {item.description}
                        </p>
                      </article>
                    ),
                  )}
                </div>
              </section>
            )}

          {Array.isArray(product.highlights) &&
            product.highlights.length > 0 && (
              <section className="mt-16 rounded-[40px] bg-[#005a8d] p-8 text-white md:p-12">
                <SectionHeading
                  Icon={CheckCircle2}
                  eyebrow="Product Highlights"
                  title="Why This Formulation"
                  dark
                />

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {product.highlights.map(
                    (highlight) => (
                      <div
                        key={highlight}
                        className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/10 p-4"
                      >
                        <CheckCircle2
                          size={20}
                          aria-hidden="true"
                          className="mt-0.5 flex-shrink-0 text-[#2ecc71]"
                        />

                        <p className="text-sm leading-relaxed text-blue-50">
                          {highlight}
                        </p>
                      </div>
                    ),
                  )}
                </div>
              </section>
            )}

          <section className="mt-16 grid gap-8 lg:grid-cols-2">
            {product.indications && (
              <InfoPanel
                Icon={Info}
                title="Product Information"
                text={product.indications}
              />
            )}

            {product.usage && (
              <InfoPanel
                Icon={Stethoscope}
                title="Directions for Use"
                text={product.usage}
              />
            )}

            {product.storage && (
              <InfoPanel
                Icon={Warehouse}
                title="Storage"
                text={product.storage}
              />
            )}

            {packageInformation && (
              <InfoPanel
                Icon={Package}
                title="Packaging"
                text={packageInformation}
              />
            )}
          </section>

          <section className="mt-12 rounded-3xl border border-amber-100 bg-amber-50 p-6">
            <p className="text-sm leading-7 text-amber-900">
              {product.disclaimer ||
                "Product information is intended for healthcare professionals and general informational purposes only. Use prescription products only under the guidance of a registered medical practitioner."}
            </p>
          </section>

          {relatedProducts.length > 0 && (
            <section className="mt-20">
              <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="mb-2 text-sm font-bold uppercase tracking-widest text-[#2ecc71]">
                    Explore More
                  </p>

                  <h2 className="text-3xl font-extrabold text-[#005a8d]">
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
                {relatedProducts.map(
                  (relatedProduct) => (
                    <article
                      key={relatedProduct.slug}
                      className="rounded-3xl border border-slate-100 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                    >
                      <p className="mb-3 text-xs font-black uppercase tracking-widest text-[#2ecc71]">
                        {
                          relatedProduct.category
                        }
                      </p>

                      <h3 className="mb-3 text-xl font-extrabold text-[#005a8d]">
                        <Link
                          href={`/products/${relatedProduct.slug}`}
                          className="transition hover:text-[#2ecc71]"
                        >
                          {relatedProduct.name}
                        </Link>
                      </h3>

                      {relatedProduct.description && (
                        <p className="mb-5 line-clamp-3 text-sm leading-relaxed text-slate-600">
                          {
                            relatedProduct.description
                          }
                        </p>
                      )}

                      <Link
                        href={`/products/${relatedProduct.slug}`}
                        className="inline-flex items-center font-bold text-[#005a8d] transition hover:text-[#2ecc71]"
                      >
                        View Product

                        <ArrowRight
                          size={16}
                          aria-hidden="true"
                          className="ml-2"
                        />
                      </Link>
                    </article>
                  ),
                )}
              </div>
            </section>
          )}
        </div>
      </main>
    </>
  );
}

function SectionHeading({
  Icon,
  eyebrow,
  title,
  dark = false,
}) {
  return (
    <div className="mb-8">
      <div className="mb-3 flex items-center gap-3">
        <Icon
          size={24}
          aria-hidden="true"
          className="text-[#2ecc71]"
        />

        <p className="text-xs font-black uppercase tracking-[0.22em] text-[#2ecc71]">
          {eyebrow}
        </p>
      </div>

      <h2
        className={`text-3xl font-extrabold ${
          dark
            ? "text-white"
            : "text-[#005a8d]"
        }`}
      >
        {title}
      </h2>
    </div>
  );
}

function QuickInfo({
  Icon,
  label,
  value,
}) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
      <Icon
        size={22}
        aria-hidden="true"
        className="mb-3 text-[#2ecc71]"
      />

      <p className="mb-1 text-xs font-black uppercase tracking-wider text-slate-400">
        {label}
      </p>

      <p className="font-bold text-[#005a8d]">
        {value}
      </p>
    </div>
  );
}

function InfoPanel({
  Icon,
  title,
  text,
}) {
  return (
    <article className="rounded-[30px] border border-slate-100 bg-white p-8 shadow-sm">
      <h2 className="mb-4 flex items-center text-xl font-bold text-[#005a8d]">
        <Icon
          size={24}
          aria-hidden="true"
          className="mr-3 text-[#2ecc71]"
        />

        {title}
      </h2>

      <p className="leading-8 text-slate-600">
        {text}
      </p>
    </article>
  );
}