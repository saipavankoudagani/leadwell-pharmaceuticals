import { products } from "@/lib/products-data";
import { notFound } from "next/navigation";
import { ArrowLeft, ShieldCheck, Info } from "lucide-react";
import Link from "next/link";
import ProductGallery from "@/components/ProductGallery";

const baseUrl = "https://leadwellpharmaceuticals.com";

/*
  Generates every product route during the production build.

  Examples:
  /products/cpwalk
  /products/cpwalk-forte
  /products/tendowish
*/
export function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

/*
  Generates unique SEO metadata for every product page.
*/
export async function generateMetadata({ params }) {
  const { slug } = await params;

  const product = products.find((item) => item.slug === slug);

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

  const productUrl = `${baseUrl}/products/${product.slug}`;

  const description = `${product.name} by Leadwell Pharmaceuticals. ${product.description} Composition: ${product.composition}`;

  return {
    title: product.name,

    description,

    keywords: [
      product.name,
      `${product.name} Leadwell Pharmaceuticals`,
      product.category,
      product.composition,
      "Leadwell Pharmaceuticals products",
      "pharmaceutical products in Hyderabad",
      "pharmaceutical products in India",
    ],

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
      images: [
        {
          url: product.mainImage,
          alt: `${product.name} by Leadwell Pharmaceuticals`,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: `${product.name} | Leadwell Pharmaceuticals`,
      description,
      images: [product.mainImage],
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

export default async function ProductPage({ params }) {
  const { slug } = await params;

  const product = products.find((item) => item.slug === slug);

  if (!product) {
    notFound();
  }

  /*
    Structured data helps search engines understand the product page.
    This is basic Product schema and does not claim price, availability,
    ratings, or medical approval.
  */
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    category: product.category,
    image: product.gallery.map((image) => `${baseUrl}${image}`),
    brand: {
      "@type": "Brand",
      name: "Leadwell Pharmaceuticals",
    },
    manufacturer: {
      "@type": "Organization",
      name: "Leadwell Pharmaceuticals",
      url: baseUrl,
    },
    url: `${baseUrl}/products/${product.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productSchema).replace(/</g, "\\u003c"),
        }}
      />

      <div className="min-h-screen bg-slate-50 px-[5%] py-12">
        <div className="mx-auto max-w-6xl">
          <Link
            href="/products"
            className="mb-8 inline-flex items-center font-bold text-[#005a8d] transition hover:text-[#2ecc71]"
          >
            <ArrowLeft size={18} className="mr-2" />
            Back to All Products
          </Link>

          <div className="grid gap-12 lg:grid-cols-12">
            {/* Product Gallery */}

            <div className="lg:col-span-5">
              <ProductGallery
                images={product.gallery}
                productName={product.name}
              />
            </div>

            {/* Product Information */}

            <article className="rounded-[40px] border border-slate-100 bg-white p-8 shadow-sm md:p-14 lg:col-span-7">
              <header>
                <span className="rounded-full bg-[#2ecc71]/10 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-[#2ecc71]">
                  {product.category}
                </span>

                <h1 className="mb-4 mt-6 text-4xl font-extrabold text-[#005a8d] md:text-5xl">
                  {product.name}
                </h1>

                <p className="mb-8 text-lg leading-relaxed text-slate-500">
                  {product.description}
                </p>
              </header>

              <div className="space-y-6">
                <section className="rounded-3xl border border-blue-50 bg-[#f8fbff] p-8">
                  <h2 className="mb-3 flex items-center text-lg font-bold text-[#005a8d]">
                    <ShieldCheck
                      size={24}
                      className="mr-3 text-[#2ecc71]"
                    />
                    Active Composition
                  </h2>

                  <p className="font-medium leading-relaxed text-slate-700">
                    {product.composition}
                  </p>
                </section>

                <section className="rounded-3xl border border-slate-100 p-8">
                  <h2 className="mb-3 flex items-center text-lg font-bold text-[#005a8d]">
                    <Info
                      size={24}
                      className="mr-3 text-[#2ecc71]"
                    />
                    Clinical Indications
                  </h2>

                  <p className="italic leading-relaxed text-slate-600">
                    {product.indications}
                  </p>
                </section>
              </div>

              <div className="pt-10">
                <Link
                  href={`/contact?product=${encodeURIComponent(
                    product.name
                  )}`}
                  className="block w-full rounded-2xl bg-[#005a8d] py-5 text-center text-lg font-bold text-white shadow-xl shadow-blue-900/20 transition-all hover:bg-[#004066]"
                >
                  Inquire for Hospital Supply
                </Link>
              </div>

              <p className="mt-6 text-center text-xs leading-relaxed text-slate-400">
                Product information is provided for professional and
                informational purposes. Please consult a qualified healthcare
                professional before use.
              </p>
            </article>
          </div>
        </div>
      </div>
    </>
  );
}