import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  Building2,
  CheckCircle2,
  HeartHandshake,
  MapPin,
  ShieldCheck,
  Target,
  Users,
} from "lucide-react";

const BASE_URL = "https://leadwellpharmaceuticals.com";

export const metadata = {
  title: "About Us",

  description:
    "Learn about Leadwell Pharmaceuticals, a Hyderabad-based pharmaceutical marketing company focused on quality healthcare products, ethical practices, professional engagement and reliable supply coordination.",

  alternates: {
    canonical: "/about",
  },

  openGraph: {
    type: "website",
    locale: "en_IN",
    url: `${BASE_URL}/about`,
    siteName: "Leadwell Pharmaceuticals",
    title: "About Leadwell Pharmaceuticals",
    description:
      "Discover the vision, values and healthcare commitment of Leadwell Pharmaceuticals, Hyderabad.",
    images: [
      {
        url: "/pharma-2.png",
        width: 1200,
        height: 630,
        alt: "Leadwell Pharmaceuticals company and healthcare operations",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "About Leadwell Pharmaceuticals",
    description:
      "Discover the vision, values and healthcare commitment of Leadwell Pharmaceuticals, Hyderabad.",
    images: ["/pharma-2.png"],
  },

  robots: {
    index: true,
    follow: true,
  },
};

const values = [
  {
    title: "Quality Focus",
    description:
      "We work with selected manufacturing partners and maintain a strong focus on product quality, documentation and responsible supply practices.",
    Icon: ShieldCheck,
  },
  {
    title: "Professional Partnerships",
    description:
      "We build long-term relationships with healthcare professionals, hospitals, clinics and distribution partners through responsive service and clear communication.",
    Icon: Users,
  },
  {
    title: "Ethical Conduct",
    description:
      "We aim to conduct our business responsibly, transparently and in accordance with applicable pharmaceutical and healthcare requirements.",
    Icon: Award,
  },
];

const commitments = [
  "Responsible pharmaceutical product marketing",
  "Accurate and clear product information",
  "Reliable hospital and institutional supply support",
  "Professional healthcare engagement",
  "Long-term distribution partnerships",
  "Patient- and healthcare-focused service",
];

function serializeJsonLd(data) {
  return JSON.stringify(data)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026");
}

export default function AboutPage() {
  const aboutPageSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": `${BASE_URL}/about#webpage`,
    url: `${BASE_URL}/about`,
    name: "About Leadwell Pharmaceuticals",
    description:
      "Learn about Leadwell Pharmaceuticals, a Hyderabad-based pharmaceutical marketing company focused on healthcare products, ethical practices and reliable supply coordination.",
    isPartOf: {
      "@id": `${BASE_URL}/#website`,
    },
    about: {
      "@id": `${BASE_URL}/#organization`,
    },
    breadcrumb: {
      "@id": `${BASE_URL}/about#breadcrumb`,
    },
    inLanguage: "en-IN",
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${BASE_URL}/about#breadcrumb`,
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
        name: "About Us",
        item: `${BASE_URL}/about`,
      },
    ],
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [aboutPageSchema, breadcrumbSchema],
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
        {/* ================= HERO ================= */}

        <section className="relative overflow-hidden bg-[#005a8d] px-[5%] py-24 text-white">
          <Building2
            size={420}
            aria-hidden="true"
            className="pointer-events-none absolute -right-12 -top-12 text-white opacity-[0.04]"
          />

          <div className="relative z-10 mx-auto max-w-5xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 backdrop-blur-sm">
              <HeartHandshake
                size={17}
                aria-hidden="true"
                className="text-[#2ecc71]"
              />

              <span className="text-xs font-black uppercase tracking-[0.22em] text-blue-100">
                About Leadwell
              </span>
            </div>

            <h1 className="mb-7 text-4xl font-extrabold leading-tight md:text-5xl lg:text-6xl">
              Our commitment to responsible healthcare
            </h1>

            <p className="mx-auto max-w-3xl text-lg leading-relaxed text-blue-100">
              Leadwell Pharmaceuticals is a Hyderabad-based
              pharmaceutical marketing company focused on dependable
              products, professional healthcare engagement and reliable
              supply coordination.
            </p>
          </div>
        </section>

        {/* ================= BREADCRUMB ================= */}

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

            <span aria-hidden="true" className="text-slate-300">
              /
            </span>

            <span
              aria-current="page"
              className="font-semibold text-[#005a8d]"
            >
              About Us
            </span>
          </nav>
        </div>

        {/* ================= COMPANY STORY ================= */}

        <section className="px-[5%] py-20">
          <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">
            <div>
              <p className="mb-3 text-sm font-black uppercase tracking-[0.22em] text-[#2ecc71]">
                Our Story
              </p>

              <h2 className="mb-7 text-4xl font-extrabold leading-tight text-[#005a8d]">
                Connecting quality pharmaceutical products with
                healthcare needs
              </h2>

              <p className="mb-5 leading-8 text-slate-600">
                Leadwell Pharmaceuticals was established with the goal
                of supporting healthcare professionals and institutions
                through a focused portfolio of pharmaceutical,
                nutraceutical, orthopaedic, neurological and general
                healthcare products.
              </p>

              <p className="mb-5 leading-8 text-slate-600">
                Based in Hyderabad, Telangana, we coordinate product
                marketing, healthcare professional engagement and
                supply support through selected manufacturing and
                distribution partners.
              </p>

              <p className="leading-8 text-slate-600">
                Our approach is centred on professional communication,
                dependable service and responsible product information.
                We aim to build lasting relationships with doctors,
                hospitals, clinics and authorised distributors.
              </p>

              <div className="mt-9 flex flex-wrap gap-4">
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 rounded-2xl bg-[#005a8d] px-7 py-4 font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#00466e] hover:shadow-xl"
                >
                  Explore Our Products

                  <ArrowRight size={18} aria-hidden="true" />
                </Link>

                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-2xl border-2 border-[#005a8d] px-7 py-4 font-bold text-[#005a8d] transition hover:bg-[#005a8d] hover:text-white"
                >
                  Contact Our Team
                </Link>
              </div>
            </div>

            <div className="relative">
              <div
                aria-hidden="true"
                className="absolute -inset-6 rounded-full bg-[#2ecc71]/10 blur-3xl"
              />

              <div className="relative overflow-hidden rounded-[40px] border border-slate-100 bg-slate-100 shadow-xl">
                <div className="relative h-[430px]">
                  <Image
                    src="/pharma-2.png"
                    alt="Leadwell Pharmaceuticals healthcare and pharmaceutical operations"
                    fill
                    sizes="(max-width: 1024px) 90vw, 600px"
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="absolute -bottom-8 -left-6 hidden max-w-[290px] rounded-3xl border border-slate-100 bg-white p-6 shadow-xl md:block">
                <div className="mb-3 flex items-center gap-3">
                  <MapPin
                    size={22}
                    aria-hidden="true"
                    className="text-[#2ecc71]"
                  />

                  <p className="font-bold text-[#005a8d]">
                    Hyderabad, Telangana
                  </p>
                </div>

                <p className="text-sm leading-relaxed text-slate-500">
                  Strategically located to serve healthcare
                  professionals, hospitals and distribution partners.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ================= MISSION AND VISION ================= */}

        <section className="bg-[#f8fbff] px-[5%] py-24">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-2">
            <article className="rounded-[36px] border border-slate-100 bg-white p-9 shadow-sm md:p-12">
              <div className="mb-6 inline-flex rounded-2xl bg-[#2ecc71]/10 p-4">
                <Target
                  size={34}
                  aria-hidden="true"
                  className="text-[#2ecc71]"
                />
              </div>

              <h2 className="mb-5 text-3xl font-extrabold text-[#005a8d]">
                Our Mission
              </h2>

              <p className="leading-8 text-slate-600">
                To support healthcare professionals and institutions
                with dependable pharmaceutical products, responsive
                service, responsible product communication and reliable
                supply coordination.
              </p>
            </article>

            <article className="rounded-[36px] border border-slate-100 bg-[#005a8d] p-9 text-white shadow-xl md:p-12">
              <div className="mb-6 inline-flex rounded-2xl bg-white/10 p-4">
                <Building2
                  size={34}
                  aria-hidden="true"
                  className="text-[#2ecc71]"
                />
              </div>

              <h2 className="mb-5 text-3xl font-extrabold">
                Our Vision
              </h2>

              <p className="leading-8 text-blue-100">
                To become a trusted pharmaceutical brand recognised for
                professional integrity, quality-focused products,
                dependable partnerships and meaningful contribution to
                healthcare delivery.
              </p>
            </article>
          </div>
        </section>

        {/* ================= CORE VALUES ================= */}

        <section className="px-[5%] py-24">
          <div className="mx-auto max-w-7xl">
            <div className="mb-14 text-center">
              <p className="mb-3 text-sm font-black uppercase tracking-[0.22em] text-[#2ecc71]">
                What Guides Us
              </p>

              <h2 className="text-4xl font-extrabold text-[#005a8d]">
                Our Core Values
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {values.map(({ title, description, Icon }) => (
                <article
                  key={title}
                  className="rounded-[32px] border border-slate-100 bg-white p-10 text-center shadow-sm transition hover:-translate-y-2 hover:shadow-xl"
                >
                  <Icon
                    aria-hidden="true"
                    className="mx-auto mb-6 text-[#2ecc71]"
                    size={48}
                  />

                  <h3 className="mb-4 text-xl font-bold text-[#005a8d]">
                    {title}
                  </h3>

                  <p className="text-sm leading-7 text-slate-500">
                    {description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ================= COMMITMENTS ================= */}

        <section className="px-[5%] pb-24">
          <div className="mx-auto grid max-w-7xl items-center gap-14 rounded-[44px] bg-[#005a8d] p-9 text-white md:p-14 lg:grid-cols-2">
            <div>
              <p className="mb-3 text-sm font-black uppercase tracking-[0.22em] text-[#2ecc71]">
                Our Commitment
              </p>

              <h2 className="mb-6 text-4xl font-extrabold leading-tight">
                Building trusted healthcare relationships
              </h2>

              <p className="leading-8 text-blue-100">
                We aim to create value through quality-focused products,
                clear communication, ethical business practices and
                dependable support for healthcare professionals and
                institutions.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {commitments.map((commitment) => (
                <div
                  key={commitment}
                  className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/10 p-4"
                >
                  <CheckCircle2
                    size={20}
                    aria-hidden="true"
                    className="mt-0.5 flex-shrink-0 text-[#2ecc71]"
                  />

                  <p className="text-sm leading-relaxed text-blue-50">
                    {commitment}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= CALL TO ACTION ================= */}

        <section className="px-[5%] pb-16 text-center">
          <div className="mx-auto max-w-4xl rounded-[44px] border border-slate-100 bg-[#f8fbff] px-8 py-14">
            <h2 className="mb-5 text-3xl font-extrabold text-[#005a8d] md:text-4xl">
              Learn more about our products and partnerships
            </h2>

            <p className="mx-auto mb-8 max-w-2xl leading-relaxed text-slate-600">
              Connect with our team for product information, hospital
              supply enquiries or distribution-related discussions.
            </p>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-2xl bg-[#005a8d] px-9 py-4 font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#00466e] hover:shadow-xl"
            >
              Contact Leadwell

              <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}