"use client";

import { useEffect } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  Home,
  RefreshCcw,
} from "lucide-react";

export default function ErrorPage({ error, reset }) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <main className="flex min-h-[75vh] items-center bg-[#f8fbff] px-[5%] py-20">
      <div className="mx-auto w-full max-w-4xl text-center">
        <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-red-50">
          <AlertTriangle
            size={48}
            aria-hidden="true"
            className="text-red-500"
          />
        </div>

        <p className="mb-4 text-sm font-black uppercase tracking-[0.24em] text-[#2ecc71]">
          Something went wrong
        </p>

        <h1 className="mb-6 text-4xl font-extrabold text-[#005a8d] md:text-5xl">
          We could not load this page
        </h1>

        <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-slate-600">
          An unexpected error occurred while loading the requested
          content. Please try again or return to the homepage.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <button
            type="button"
            onClick={() => reset()}
            className="inline-flex items-center gap-2 rounded-2xl bg-[#005a8d] px-7 py-4 font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#00466e] hover:shadow-xl"
          >
            <RefreshCcw size={18} aria-hidden="true" />
            Try Again
          </button>

          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-2xl border-2 border-[#005a8d] px-7 py-4 font-bold text-[#005a8d] transition hover:bg-[#005a8d] hover:text-white"
          >
            <Home size={18} aria-hidden="true" />
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}