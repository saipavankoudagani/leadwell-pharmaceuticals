"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ChevronDown,
  PackageSearch,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";

function getProductImage(product) {
  if (product?.mainImage) {
    return product.mainImage;
  }

  if (
    Array.isArray(product?.gallery) &&
    product.gallery.length > 0
  ) {
    return product.gallery[0];
  }

  return "/logo.png";
}

function normalizeText(value) {
  return String(value || "")
    .trim()
    .toLowerCase();
}

export default function ProductsExplorer({
  products = [],
}) {
  const [searchTerm, setSearchTerm] =
    useState("");

  const [selectedCategory, setSelectedCategory] =
    useState("all");

  /*
   * Generate dropdown categories directly
   * from the product data.
   */
  const availableCategories = Array.from(
    new Set(
      products
        .map((product) =>
          String(product?.category || "").trim(),
        )
        .filter(Boolean),
    ),
  ).sort((a, b) => a.localeCompare(b));

  /*
   * Filter products on every render.
   * This runs immediately when search or category changes.
   */
  const filteredProducts = products.filter(
    (product) => {
      const productCategory = normalizeText(
        product?.category,
      );

      const categoryMatches =
        selectedCategory === "all" ||
        productCategory ===
          normalizeText(selectedCategory);

      const searchableText = normalizeText(
        [
          product?.name,
          product?.category,
          product?.dosageForm,
          product?.tagline,
          product?.composition,
          product?.description,
          product?.overview,
          product?.indications,
        ]
          .filter(Boolean)
          .join(" "),
      );

      const searchMatches =
        normalizeText(searchTerm) === "" ||
        searchableText.includes(
          normalizeText(searchTerm),
        );

      return categoryMatches && searchMatches;
    },
  );

  const hasActiveFilters =
    searchTerm.trim() !== "" ||
    selectedCategory !== "all";

  function clearFilters() {
    setSearchTerm("");
    setSelectedCategory("all");
  }

  return (
    <section aria-labelledby="products-heading">
      <h2
        id="products-heading"
        className="sr-only"
      >
        Search and browse pharmaceutical
        products
      </h2>

      {/* Search and category filters */}

      <div className="mb-10 rounded-[30px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="grid gap-4 lg:grid-cols-[1fr_360px]">
          {/* Search */}

          <div>
            <label
              htmlFor="product-search"
              className="mb-2 block text-xs font-black uppercase tracking-[0.18em] text-[#005a8d]"
            >
              Search Products
            </label>

            <div className="relative">
              <Search
                size={20}
                aria-hidden="true"
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                id="product-search"
                type="text"
                value={searchTerm}
                onChange={(event) => {
                  setSearchTerm(
                    event.target.value,
                  );
                }}
                placeholder="Search by product name, composition or ingredient..."
                autoComplete="off"
                className="h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-12 pr-12 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#2ecc71] focus:bg-white focus:ring-4 focus:ring-[#2ecc71]/10"
              />

              {searchTerm.length > 0 && (
                <button
                  type="button"
                  onClick={() =>
                    setSearchTerm("")
                  }
                  aria-label="Clear product search"
                  className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-200 hover:text-slate-700"
                >
                  <X
                    size={17}
                    aria-hidden="true"
                  />
                </button>
              )}
            </div>
          </div>

          {/* Category dropdown */}

          <div>
            <label
              htmlFor="product-category"
              className="mb-2 block text-xs font-black uppercase tracking-[0.18em] text-[#005a8d]"
            >
              Therapeutic Category
            </label>

            <div className="relative">
              <SlidersHorizontal
                size={19}
                aria-hidden="true"
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <select
                id="product-category"
                value={selectedCategory}
                onChange={(event) => {
                  setSelectedCategory(
                    event.target.value,
                  );
                }}
                className="h-14 w-full cursor-pointer appearance-none rounded-2xl border border-slate-200 bg-slate-50 pl-12 pr-12 text-sm font-semibold text-slate-700 outline-none transition focus:border-[#2ecc71] focus:bg-white focus:ring-4 focus:ring-[#2ecc71]/10"
              >
                <option value="all">
                  All Categories
                </option>

                {availableCategories.map(
                  (category) => (
                    <option
                      key={category}
                      value={category}
                    >
                      {category}
                    </option>
                  ),
                )}
              </select>

              <ChevronDown
                size={19}
                aria-hidden="true"
                className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
              />
            </div>
          </div>
        </div>

        {/* Result count */}

        <div className="mt-5 flex flex-col gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:items-center sm:justify-between">
          <p
            aria-live="polite"
            className="text-sm font-semibold text-slate-600"
          >
            Showing{" "}
            <span className="font-extrabold text-[#005a8d]">
              {filteredProducts.length}
            </span>{" "}
            {filteredProducts.length === 1
              ? "product"
              : "products"}

            {selectedCategory !== "all" && (
              <>
                {" "}
                in{" "}
                <span className="font-extrabold text-[#218c50]">
                  {selectedCategory}
                </span>
              </>
            )}

            {searchTerm.trim() !== "" && (
              <>
                {" "}
                for{" "}
                <span className="font-extrabold text-[#218c50]">
                  “{searchTerm.trim()}”
                </span>
              </>
            )}
          </p>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="inline-flex w-fit items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-bold text-slate-600 transition hover:border-[#2ecc71] hover:text-[#218c50]"
            >
              <X
                size={16}
                aria-hidden="true"
              />

              Clear Filters
            </button>
          )}
        </div>
      </div>

      {/* Unified product grid */}

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map(
            (product) => {
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
                    {product.category && (
                      <span className="w-fit rounded-full bg-[#2ecc71]/10 px-3 py-1 text-[10px] font-black uppercase tracking-[2px] text-[#218c50]">
                        {product.category}
                      </span>
                    )}

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
            },
          )}
        </div>
      ) : (
        <div className="mx-auto max-w-2xl rounded-[32px] border border-slate-100 bg-white px-6 py-14 text-center shadow-sm">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#2ecc71]/10">
            <PackageSearch
              size={32}
              aria-hidden="true"
              className="text-[#218c50]"
            />
          </div>

          <h3 className="text-2xl font-extrabold text-[#005a8d]">
            No products found
          </h3>

          <p className="mx-auto mt-3 max-w-md leading-relaxed text-slate-500">
            Try another product name,
            composition or ingredient, or
            choose another therapeutic
            category.
          </p>

          <button
            type="button"
            onClick={clearFilters}
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#005a8d] px-6 py-3 font-bold text-white transition hover:bg-[#004b76]"
          >
            <X
              size={17}
              aria-hidden="true"
            />

            Clear Filters
          </button>
        </div>
      )}
    </section>
  );
}