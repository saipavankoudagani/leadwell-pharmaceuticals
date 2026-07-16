"use client";

import Link from "next/link";
import { useEffect } from "react";
import Image from "next/image";
import {
  AlertTriangle,
  Home,
  RefreshCw,
  Mail,
} from "lucide-react";

export default function GlobalError({
  error,
  reset,
}) {
  useEffect(() => {
    console.error("Global Error:", error);
  }, [error]);

  return (
    <html lang="en">
      <body className="bg-[#f8fbff]">
        <main className="min-h-screen flex items-center justify-center px-[5%] py-16">
          <div className="max-w-3xl w-full bg-white rounded-[40px] shadow-2xl border border-slate-100 p-10 md:p-14 text-center">

            {/* Logo */}

            <Image
              src="/logo.png"
              alt="Leadwell Pharmaceuticals"
              width={140}
              height={140}
              priority
              className="mx-auto mb-8"
            />

            {/* Icon */}

            <div className="mx-auto mb-8 w-24 h-24 rounded-full bg-red-50 flex items-center justify-center">
              <AlertTriangle
                size={52}
                className="text-red-500"
              />
            </div>

            <p className="text-xs font-black tracking-[4px] uppercase text-[#2ecc71] mb-4">
              Application Error
            </p>

            <h1 className="text-4xl md:text-5xl font-extrabold text-[#005a8d] mb-6">
              Something Unexpected Happened
            </h1>

            <p className="text-slate-600 text-lg leading-relaxed max-w-2xl mx-auto mb-10">
              An unexpected error occurred while loading the
              application. This has been logged automatically.
              Please try again or return to the homepage.
            </p>

            <div className="flex flex-wrap justify-center gap-4">

              <button
                onClick={() => reset()}
                className="bg-[#005a8d] text-white px-8 py-4 rounded-2xl font-bold hover:bg-[#00446c] transition flex items-center gap-2"
              >
                <RefreshCw size={18} />
                Try Again
              </button>

              <Link
                href="/"
                className="border-2 border-[#005a8d] text-[#005a8d] px-8 py-4 rounded-2xl font-bold hover:bg-[#005a8d] hover:text-white transition flex items-center gap-2"
              >
                <Home size={18} />
                Home
              </Link>

              <Link
                href="/contact"
                className="border-2 border-[#2ecc71] text-[#2ecc71] px-8 py-4 rounded-2xl font-bold hover:bg-[#2ecc71] hover:text-white transition flex items-center gap-2"
              >
                <Mail size={18} />
                Contact Us
              </Link>

            </div>

            <div className="mt-12 border-t border-slate-100 pt-8">

              <p className="text-sm text-slate-500">
                Leadwell Pharmaceuticals
              </p>

              <p className="text-sm text-slate-400 mt-2">
                Hyderabad • Telangana • India
              </p>

            </div>

          </div>
        </main>
      </body>
    </html>
  );
}