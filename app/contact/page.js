import Link from "next/link";
import {
  ChevronRight,
  Clock,
  Mail,
  MapPin,
  MessageSquareText,
  Phone,
} from "lucide-react";

import ContactForm from "@/components/ContactForm";

const BASE_URL = "https://leadwellpharmaceuticals.com";

export const metadata = {
  title: "Contact Us",

  description:
    "Contact Leadwell Pharmaceuticals in Hyderabad for product information, hospital supply requirements, distribution enquiries and pharmaceutical business partnerships.",

  alternates: {
    canonical: "/contact",
  },

  openGraph: {
    type: "website",
    locale: "en_IN",
    url: `${BASE_URL}/contact`,
    siteName: "Leadwell Pharmaceuticals",
    title: "Contact Leadwell Pharmaceuticals",
    description:
      "Contact our Hyderabad team for pharmaceutical product information, hospital supplies and distribution enquiries.",
    images: [
      {
        url: "/pharma-3.png",
        width: 1200,
        height: 630,
        alt: "Contact Leadwell Pharmaceuticals in Hyderabad",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Contact Leadwell Pharmaceuticals",
    description:
      "Contact our Hyderabad team for pharmaceutical product information and business enquiries.",
    images: ["/pharma-3.png"],
  },

  robots: {
    index: true,
    follow: true,
  },
};

function serializeJsonLd(data) {
  return JSON.stringify(data)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026");
}

export default async function ContactPage({ searchParams }) {
  const query = await searchParams;

  const requestedProduct =
    typeof query?.product === "string"
      ? query.product.trim().slice(0, 120)
      : "";

  const contactPageSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": `${BASE_URL}/contact#webpage`,
    url: `${BASE_URL}/contact`,
    name: "Contact Leadwell Pharmaceuticals",
    description:
      "Contact Leadwell Pharmaceuticals for pharmaceutical product, hospital supply and distribution enquiries.",
    isPartOf: {
      "@id": `${BASE_URL}/#website`,
    },
    about: {
      "@id": `${BASE_URL}/#organization`,
    },
    breadcrumb: {
      "@id": `${BASE_URL}/contact#breadcrumb`,
    },
    mainEntity: {
      "@id": `${BASE_URL}/#organization`,
    },
    inLanguage: "en-IN",
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${BASE_URL}/contact#breadcrumb`,
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
        name: "Contact Us",
        item: `${BASE_URL}/contact`,
      },
    ],
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [contactPageSchema, breadcrumbSchema],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(structuredData),
        }}
      />

      <main className="min-h-screen bg-white">
        {/* Hero */}

        <section className="relative overflow-hidden bg-[#f8fbff] px-[5%] py-20 text-center">
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-[#2ecc71]/10 blur-3xl"
          />

          <div className="relative z-10 mx-auto max-w-4xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 shadow-sm">
              <MessageSquareText
                size={17}
                aria-hidden="true"
                className="text-[#2ecc71]"
              />

              <span className="text-xs font-black uppercase tracking-[0.22em] text-[#005a8d]">
                Contact Leadwell
              </span>
            </div>

            <h1 className="mb-6 text-4xl font-extrabold leading-tight text-[#005a8d] md:text-5xl lg:text-6xl">
              Pharmaceutical product and business enquiries
            </h1>

            <p className="mx-auto max-w-3xl text-lg leading-relaxed text-slate-600">
              Contact our Hyderabad team for product information,
              hospital and institutional supply requirements,
              distribution discussions or other pharmaceutical
              business enquiries.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-7xl px-[5%] pt-10">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-sm"
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
              Contact Us
            </span>
          </nav>
        </div>

        <section className="px-[5%] py-16">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-14 lg:grid-cols-2 lg:gap-16">
            {/* Contact information */}

            <div>
              <p className="mb-3 text-sm font-black uppercase tracking-[0.22em] text-[#2ecc71]">
                Get in Touch
              </p>

              <h2 className="mb-6 text-4xl font-extrabold text-[#005a8d]">
                Connect with our Hyderabad team
              </h2>

              <p className="mb-10 max-w-xl leading-8 text-slate-600">
                Our team is available to assist healthcare
                professionals, hospitals, clinics and distribution
                partners with product and supply-related enquiries.
              </p>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <ContactCard
                  Icon={Phone}
                  title="Business Enquiries"
                >
                  <a
                    href="tel:+919346652741"
                    className="font-medium text-slate-600 transition hover:text-[#005a8d]"
                  >
                    +91 9346652741
                  </a>
                </ContactCard>

                <ContactCard Icon={Mail} title="Official Email">
                  <a
                    href="mailto:lwppharma@gmail.com"
                    className="break-all font-medium text-slate-600 transition hover:text-[#005a8d]"
                  >
                    lwppharma@gmail.com
                  </a>
                </ContactCard>

                <ContactCard Icon={MapPin} title="Location">
                  <address className="not-italic leading-relaxed text-slate-600">
                    Hyderabad, Telangana, India
                  </address>
                </ContactCard>

                <ContactCard Icon={Clock} title="Business Hours">
                  <p className="leading-relaxed text-slate-600">
                    Monday – Saturday
                    <br />
                    9:00 AM – 7:00 PM
                  </p>
                </ContactCard>
              </div>

              <div className="mt-8 rounded-3xl border border-blue-100 bg-[#f8fbff] p-7">
                <h3 className="mb-3 text-lg font-bold text-[#005a8d]">
                  Before submitting an enquiry
                </h3>

                <p className="text-sm leading-7 text-slate-600">
                  Please include the product name, required quantity,
                  organisation name and your preferred contact details
                  wherever applicable. This helps our team respond more
                  effectively.
                </p>
              </div>
            </div>

            {/* Interactive form */}

            <ContactForm requestedProduct={requestedProduct} />
          </div>
        </section>

        {/* Additional CTA */}

        <section className="px-[5%] pb-16">
          <div className="mx-auto max-w-7xl rounded-[40px] bg-[#005a8d] px-8 py-14 text-center text-white md:px-14">
            <h2 className="mb-5 text-3xl font-extrabold md:text-4xl">
              Looking for a specific pharmaceutical product?
            </h2>

            <p className="mx-auto mb-8 max-w-2xl leading-relaxed text-blue-100">
              Browse our product portfolio to review available
              categories, compositions and product information before
              contacting our team.
            </p>

            <Link
              href="/products"
              className="inline-flex items-center gap-2 rounded-2xl bg-[#2ecc71] px-8 py-4 font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#27ae60] hover:shadow-xl"
            >
              Browse Our Products
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}

function ContactCard({ Icon, title, children }) {
  return (
    <article className="rounded-3xl border border-slate-100 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="mb-5 inline-flex rounded-2xl bg-[#2ecc71]/10 p-3">
        <Icon
          size={25}
          aria-hidden="true"
          className="text-[#2ecc71]"
        />
      </div>

      <h3 className="mb-2 font-bold text-[#005a8d]">{title}</h3>

      <div className="text-sm">{children}</div>
    </article>
  );
}