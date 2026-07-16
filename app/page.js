import Image from "next/image";
import Link from "next/link";
import {
  Activity,
  ArrowUpRight,
  Award,
  Building2,
  ClipboardCheck,
  HeartPulse,
  ShieldCheck,
  Truck,
  UserRound,
  Zap,
} from "lucide-react";

const BASE_URL = "https://leadwellpharmaceuticals.com";

export const metadata = {
  title: "Pharmaceutical Products and Healthcare Brands in Hyderabad",

  description:
    "Leadwell Pharmaceuticals is a Hyderabad-based pharmaceutical marketing company offering orthopaedic, neurological, nutraceutical and general healthcare products across India.",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    locale: "en_IN",
    url: BASE_URL,
    siteName: "Leadwell Pharmaceuticals",
    title:
      "Leadwell Pharmaceuticals | Healthcare and Pharmaceutical Products",
    description:
      "Explore orthopaedic, neurological, nutraceutical and general healthcare products from Leadwell Pharmaceuticals, Hyderabad.",
    images: [
      {
        url: "/pharma-1.png",
        width: 1200,
        height: 630,
        alt: "Leadwell Pharmaceuticals healthcare products and services",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title:
      "Leadwell Pharmaceuticals | Healthcare and Pharmaceutical Products",
    description:
      "Explore pharmaceutical and healthcare products from Leadwell Pharmaceuticals, Hyderabad.",
    images: ["/pharma-1.png"],
  },
};

const specialties = [
  {
    title: "Orthopaedics",
    description:
      "Nutritional and pharmaceutical formulations supporting bone, joint, tendon and mobility care.",
    Icon: Activity,
    featured: false,
  },
  {
    title: "Neurology",
    description:
      "Prescription formulations developed for neurological and nerve-related healthcare requirements.",
    Icon: Zap,
    featured: true,
  },
  {
    title: "Nutraceuticals",
    description:
      "Vitamin, mineral and antioxidant formulations supporting nutritional and metabolic wellbeing.",
    Icon: HeartPulse,
    featured: false,
  },
  {
    title: "General Health",
    description:
      "A focused portfolio of pharmaceutical and wellness products for varied healthcare needs.",
    Icon: UserRound,
    featured: false,
  },
];

const businessSteps = [
  {
    number: "01",
    title: "Quality-focused manufacturing",
    description:
      "Our products are manufactured through selected pharmaceutical manufacturing partners according to applicable quality and regulatory requirements.",
  },
  {
    number: "02",
    title: "Healthcare professional engagement",
    description:
      "Our team shares accurate product information with healthcare professionals and supports responsible product awareness.",
  },
  {
    number: "03",
    title: "Reliable product distribution",
    description:
      "We work to maintain consistent product availability through hospital supply, direct coordination and authorised distribution channels.",
  },
];

const homePageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${BASE_URL}/#webpage`,
  url: BASE_URL,
  name: "Leadwell Pharmaceuticals",
  description:
    "Leadwell Pharmaceuticals is a Hyderabad-based pharmaceutical marketing company offering orthopaedic, neurological, nutraceutical and general healthcare products.",
  isPartOf: {
    "@id": `${BASE_URL}/#website`,
  },
  about: {
    "@id": `${BASE_URL}/#organization`,
  },
  primaryImageOfPage: {
    "@type": "ImageObject",
    url: `${BASE_URL}/pharma-1.png`,
  },
  inLanguage: "en-IN",
};

function serializeJsonLd(data) {
  return JSON.stringify(data)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026");
}

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(homePageSchema),
        }}
      />

      <main className="bg-white selection:bg-[#2ecc71] selection:text-white">
        {/* ================= HERO ================= */}

        <section className="relative flex min-h-[90vh] items-center overflow-hidden bg-[#f8fbff] px-[5%] py-20">
          <Image
            src="/logo.png"
            alt=""
            width={600}
            height={600}
            aria-hidden="true"
            className="pointer-events-none absolute -right-20 top-20 w-[600px] rotate-12 opacity-[0.03]"
          />

          <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-16 lg:grid-cols-2">
            <div className="text-left">
              <Image
                src="/logo.png"
                alt="Leadwell Pharmaceuticals logo"
                width={120}
                height={120}
                priority
                className="mb-10 h-auto w-24 drop-shadow-sm"
              />

              <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 shadow-sm">
                <span
                  aria-hidden="true"
                  className="h-2 w-2 animate-pulse rounded-full bg-[#2ecc71]"
                />

                <span className="text-xs font-bold uppercase tracking-widest text-[#005a8d]">
                  Trusted Pharmaceutical Brand
                </span>
              </div>

              <h1 className="mb-8 text-5xl font-extrabold leading-[1.1] text-[#005a8d] sm:text-6xl md:text-7xl">
                Advancing healthcare with{" "}
                <span className="bg-gradient-to-r from-[#005a8d] to-[#2ecc71] bg-clip-text text-transparent">
                  quality-focused formulations.
                </span>
              </h1>

              <p className="mb-10 max-w-xl text-lg leading-relaxed text-slate-600">
                Leadwell Pharmaceuticals is a Hyderabad-based
                pharmaceutical marketing company offering orthopaedic,
                neurological, nutraceutical and general healthcare
                products. We support healthcare professionals,
                institutions and distribution partners with reliable
                product availability and responsive service.
              </p>

              <div className="flex flex-wrap gap-5">
                <Link
                  href="/products"
                  className="group inline-flex items-center gap-2 rounded-2xl bg-[#005a8d] px-10 py-5 font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-[#00466e] hover:shadow-2xl hover:shadow-blue-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2ecc71] focus-visible:ring-offset-4"
                >
                  Explore Our Products

                  <ArrowUpRight
                    aria-hidden="true"
                    className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
                  />
                </Link>

                <Link
                  href="/about"
                  className="inline-flex items-center rounded-2xl border-2 border-[#005a8d] px-10 py-5 font-bold text-[#005a8d] transition hover:bg-[#005a8d] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#005a8d] focus-visible:ring-offset-4"
                >
                  About Leadwell
                </Link>
              </div>
            </div>

            <div className="group relative">
              <div
                aria-hidden="true"
                className="absolute inset-0 rounded-full bg-[#2ecc71]/10 opacity-0 blur-3xl transition-opacity group-hover:opacity-100"
              />

              <div className="relative z-10 rounded-[40px] border border-slate-100 bg-white p-4 shadow-2xl">
                <div className="relative h-[440px] overflow-hidden rounded-[32px] sm:h-[550px]">
                  <Image
                    src="/pharma-1.png"
                    alt="Pharmaceutical healthcare services by Leadwell Pharmaceuticals"
                    fill
                    priority
                    sizes="(max-width: 1024px) 90vw, 600px"
                    className="object-cover"
                  />
                </div>

                <div className="absolute right-10 top-10 rounded-2xl border border-slate-100 bg-white p-3 shadow-lg">
                  <Image
                    src="/logo.png"
                    alt="Leadwell Pharmaceuticals"
                    width={112}
                    height={40}
                    className="h-8 w-auto object-contain"
                  />
                </div>
              </div>

              <div className="absolute -bottom-10 -left-6 z-20 hidden max-w-[300px] rounded-3xl border border-white/50 bg-white/90 p-8 shadow-xl backdrop-blur-md md:block">
                <div className="mb-4 flex items-center gap-4">
                  <div className="rounded-xl bg-[#2ecc71]/10 p-3">
                    <Award
                      aria-hidden="true"
                      className="text-[#2ecc71]"
                    />
                  </div>

                  <p className="font-bold text-[#005a8d]">
                    Quality-focused portfolio
                  </p>
                </div>

                <p className="text-xs leading-relaxed text-slate-500">
                  Our growing product portfolio is developed to support
                  the needs of healthcare professionals, hospitals and
                  patients.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ================= TRUST STRIP ================= */}

        <section
          aria-label="Leadwell Pharmaceuticals commitments"
          className="overflow-hidden border-y border-slate-100 bg-white py-10"
        >
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-12 gap-y-6 px-[5%]">
            <TrustItem
              Icon={ShieldCheck}
              text="Quality-focused products"
            />

            <TrustItem
              Icon={ClipboardCheck}
              text="Responsible product information"
            />

            <TrustItem
              Icon={Truck}
              text="Reliable supply coordination"
            />
          </div>
        </section>

        {/* ================= SPECIALTIES ================= */}

        <section className="relative px-[5%] py-28 sm:py-32">
          <div className="mx-auto max-w-7xl">
            <div className="mb-16 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="mb-3 text-sm font-black uppercase tracking-[0.24em] text-[#2ecc71]">
                  Our Product Portfolio
                </p>

                <h2 className="max-w-2xl text-4xl font-extrabold leading-tight text-[#005a8d] md:text-5xl">
                  Focused healthcare categories
                </h2>
              </div>

              <Link
                href="/products"
                className="inline-flex items-center gap-2 font-bold text-[#005a8d] transition hover:text-[#2ecc71]"
              >
                View all products
                <ArrowUpRight size={18} aria-hidden="true" />
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
              {specialties.map((specialty) => (
                <VerticalCard
                  key={specialty.title}
                  {...specialty}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ================= BUSINESS MODEL ================= */}

        <section className="relative overflow-hidden bg-[#005a8d] px-[5%] py-24">
          <Building2
            size={400}
            aria-hidden="true"
            className="pointer-events-none absolute right-0 top-0 text-white opacity-[0.04]"
          />

          <div className="relative z-10 mx-auto max-w-7xl">
            <div className="grid items-center gap-20 lg:grid-cols-2">
              <div>
                <p className="mb-4 text-sm font-black uppercase tracking-[0.24em] text-[#2ecc71]">
                  How We Work
                </p>

                <h2 className="mb-10 text-4xl font-bold leading-tight text-white md:text-5xl">
                  Our integrated{" "}
                  <span className="text-[#2ecc71]">
                    business approach
                  </span>
                </h2>

                <div className="space-y-9">
                  {businessSteps.map((step) => (
                    <ProcessItem
                      key={step.number}
                      {...step}
                    />
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="relative mt-12 h-64 overflow-hidden rounded-3xl">
                  <Image
                    src="/pharma-2.png"
                    alt="Pharmaceutical manufacturing and quality processes"
                    fill
                    sizes="(max-width: 1024px) 45vw, 300px"
                    className="object-cover"
                  />
                </div>

                <div className="relative h-64 overflow-hidden rounded-3xl">
                  <Image
                    src="/pharma-3.png"
                    alt="Healthcare professional product discussion"
                    fill
                    sizes="(max-width: 1024px) 45vw, 300px"
                    className="object-cover"
                  />
                </div>

                <div className="col-span-2 rounded-3xl border border-white/10 bg-white/10 p-8 backdrop-blur-sm">
                  <div className="grid gap-6 sm:grid-cols-3">
                    <ModelFeature
                      Icon={ShieldCheck}
                      title="Quality"
                      text="Carefully selected product portfolio"
                    />

                    <ModelFeature
                      Icon={Building2}
                      title="Partnership"
                      text="Manufacturing and distribution coordination"
                    />

                    <ModelFeature
                      Icon={Truck}
                      title="Availability"
                      text="Responsive institutional supply support"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= ABOUT PREVIEW ================= */}

        <section className="px-[5%] py-28">
          <div className="mx-auto grid max-w-7xl items-center gap-14 rounded-[44px] border border-slate-100 bg-[#f8fbff] p-8 md:p-14 lg:grid-cols-2">
            <div>
              <p className="mb-3 text-sm font-black uppercase tracking-[0.24em] text-[#2ecc71]">
                About Leadwell
              </p>

              <h2 className="mb-6 text-4xl font-extrabold leading-tight text-[#005a8d]">
                Supporting better healthcare through dependable
                pharmaceutical products
              </h2>

              <p className="mb-8 leading-8 text-slate-600">
                Based in Hyderabad, Telangana, Leadwell
                Pharmaceuticals focuses on pharmaceutical product
                marketing, healthcare professional engagement and
                reliable supply coordination. Our portfolio serves
                multiple therapeutic and nutritional categories.
              </p>

              <Link
                href="/about"
                className="inline-flex items-center gap-2 font-bold text-[#005a8d] transition hover:text-[#2ecc71]"
              >
                Learn more about us
                <ArrowUpRight size={18} aria-hidden="true" />
              </Link>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <InfoCard
                value="Hyderabad"
                label="Headquartered in Telangana"
              />

              <InfoCard
                value="Multiple"
                label="Healthcare categories"
              />

              <InfoCard
                value="India"
                label="Market and service focus"
              />

              <InfoCard
                value="Responsive"
                label="Supply and enquiry support"
              />
            </div>
          </div>
        </section>

        {/* ================= CALL TO ACTION ================= */}

        <section className="px-[5%] pb-20 pt-8 text-center">
          <div className="mx-auto max-w-4xl rounded-[50px] border border-slate-100 bg-slate-50 px-8 py-16 sm:px-10">
            <ClipboardCheck
              aria-hidden="true"
              className="mx-auto mb-6 text-[#2ecc71]"
              size={50}
            />

            <h2 className="mb-6 text-4xl font-bold text-[#005a8d]">
              Connect with Leadwell Pharmaceuticals
            </h2>

            <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-slate-500">
              Contact our team for product information, healthcare
              professional enquiries, hospital supply requirements or
              distribution-related discussions.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="inline-block rounded-2xl bg-[#005a8d] px-12 py-5 font-bold text-white shadow-xl shadow-blue-100 transition-transform hover:scale-105 hover:bg-[#00466e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2ecc71] focus-visible:ring-offset-4"
              >
                Contact Leadwell
              </Link>

              <Link
                href="/products"
                className="inline-block rounded-2xl border-2 border-[#005a8d] px-12 py-5 font-bold text-[#005a8d] transition hover:bg-[#005a8d] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#005a8d] focus-visible:ring-offset-4"
              >
                Browse Products
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

function VerticalCard({
  Icon,
  title,
  description,
  featured = false,
}) {
  return (
    <article
      className={`group relative overflow-hidden rounded-[40px] p-10 transition-all duration-500 ${
        featured
          ? "bg-[#005a8d] text-white shadow-2xl lg:-translate-y-3"
          : "border border-slate-100 bg-white hover:-translate-y-2 hover:border-[#2ecc71] hover:shadow-xl"
      }`}
    >
      <Image
        src="/logo.png"
        alt=""
        width={100}
        height={100}
        aria-hidden="true"
        className={`pointer-events-none absolute -bottom-4 -right-4 h-20 w-auto opacity-[0.04] ${
          featured ? "brightness-0 invert" : ""
        }`}
      />

      <div
        className={`mb-8 inline-flex rounded-2xl p-4 transition-colors ${
          featured
            ? "bg-[#2ecc71]/20"
            : "bg-slate-50 group-hover:bg-[#2ecc71]/10"
        }`}
      >
        <Icon
          size={32}
          aria-hidden="true"
          className={
            featured ? "text-[#2ecc71]" : "text-[#005a8d]"
          }
        />
      </div>

      <h3 className="mb-4 text-xl font-bold">{title}</h3>

      <p
        className={`text-sm leading-relaxed ${
          featured ? "text-blue-100" : "text-slate-500"
        }`}
      >
        {description}
      </p>
    </article>
  );
}

function ProcessItem({ number, title, description }) {
  return (
    <article className="flex items-start gap-6">
      <span
        aria-hidden="true"
        className="text-3xl font-black text-[#2ecc71]/40"
      >
        {number}
      </span>

      <div>
        <h3 className="mb-2 text-lg font-bold text-white">
          {title}
        </h3>

        <p className="text-sm leading-relaxed text-blue-100/75">
          {description}
        </p>
      </div>
    </article>
  );
}

function TrustItem({ Icon, text }) {
  return (
    <div className="flex items-center gap-3">
      <div className="rounded-xl bg-[#2ecc71]/10 p-3">
        <Icon
          size={22}
          aria-hidden="true"
          className="text-[#2ecc71]"
        />
      </div>

      <p className="font-bold text-[#005a8d]">{text}</p>
    </div>
  );
}

function ModelFeature({ Icon, title, text }) {
  return (
    <div>
      <Icon
        aria-hidden="true"
        className="mb-3 text-[#2ecc71]"
        size={26}
      />

      <h3 className="mb-1 font-bold text-white">{title}</h3>

      <p className="text-xs leading-relaxed text-blue-100/70">
        {text}
      </p>
    </div>
  );
}

function InfoCard({ value, label }) {
  return (
    <div className="rounded-3xl border border-slate-100 bg-white p-7 shadow-sm">
      <p className="mb-2 text-2xl font-extrabold text-[#005a8d]">
        {value}
      </p>

      <p className="text-sm leading-relaxed text-slate-500">
        {label}
      </p>
    </div>
  );
}