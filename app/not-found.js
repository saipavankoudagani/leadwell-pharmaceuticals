import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Home,
  PackageSearch,
} from "lucide-react";

export const metadata = {
  title: "Page Not Found",
  description:
    "The requested page could not be found on the Leadwell Pharmaceuticals website.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <main className="flex min-h-[75vh] items-center bg-[#f8fbff] px-[5%] py-20">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-14 lg:grid-cols-2">
        <div>
          <p className="mb-4 text-sm font-black uppercase tracking-[0.24em] text-[#2ecc71]">
            Error 404
          </p>

          <h1 className="mb-6 text-5xl font-extrabold leading-tight text-[#005a8d] md:text-6xl">
            We could not find that page
          </h1>

          <p className="mb-9 max-w-xl text-lg leading-relaxed text-slate-600">
            The page may have been moved, renamed or removed. You can
            return to the homepage or continue browsing our
            pharmaceutical product portfolio.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-2xl bg-[#005a8d] px-7 py-4 font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#00466e] hover:shadow-xl"
            >
              <Home size={18} aria-hidden="true" />
              Back to Home
            </Link>

            <Link
              href="/products"
              className="inline-flex items-center gap-2 rounded-2xl border-2 border-[#005a8d] px-7 py-4 font-bold text-[#005a8d] transition hover:bg-[#005a8d] hover:text-white"
            >
              <PackageSearch size={18} aria-hidden="true" />
              Browse Products
            </Link>
          </div>

          <Link
            href="/contact"
            className="mt-8 inline-flex items-center gap-2 font-bold text-[#005a8d] transition hover:text-[#2ecc71]"
          >
            <ArrowLeft size={17} aria-hidden="true" />
            Contact our team for assistance
          </Link>
        </div>

        <div className="relative">
          <div
            aria-hidden="true"
            className="absolute inset-0 rounded-full bg-[#2ecc71]/10 blur-3xl"
          />

          <div className="relative rounded-[44px] border border-slate-100 bg-white p-10 shadow-xl">
            <Image
              src="/logo.png"
              alt="Leadwell Pharmaceuticals"
              width={500}
              height={500}
              priority
              className="mx-auto h-auto w-full max-w-sm object-contain opacity-90"
            />

            <div className="mt-8 rounded-3xl bg-[#005a8d] p-7 text-center text-white">
              <p className="text-7xl font-black text-[#2ecc71]">
                404
              </p>

              <p className="mt-2 font-semibold text-blue-100">
                Page not found
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}