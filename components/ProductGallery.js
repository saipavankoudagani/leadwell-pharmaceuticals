"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

export default function ProductGallery({ images = [], productName = "Product" }) {
  const safeImages = useMemo(() => {
    const validImages = Array.isArray(images)
      ? images.filter(
          (image) =>
            typeof image === "string" && image.trim().length > 0,
        )
      : [];

    return validImages.length > 0
      ? [...new Set(validImages)]
      : ["/logo.png"];
  }, [images]);

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setActiveIndex(0);
  }, [safeImages]);

  const activeImage = safeImages[activeIndex] || safeImages[0];

  function handleImageError() {
    const fallbackIndex = safeImages.indexOf("/logo.png");

    if (fallbackIndex >= 0) {
      setActiveIndex(fallbackIndex);
    }
  }

  return (
    <div className="flex w-full flex-col items-center">
      {/* Main product image */}

      <div className="mb-6 flex h-[400px] w-full items-center justify-center overflow-hidden rounded-[32px] border border-slate-100 bg-white p-6 shadow-sm">
        <div className="relative h-full w-full">
          <Image
            key={activeImage}
            src={activeImage}
            alt={`${productName} pharmaceutical product`}
            fill
            priority
            sizes="(max-width: 1024px) 90vw, 420px"
            className="object-contain drop-shadow-xl transition-opacity duration-300"
            onError={handleImageError}
          />
        </div>
      </div>

      {/* Image thumbnails */}

      {safeImages.length > 1 && (
        <div
          className="flex w-full gap-4 overflow-x-auto pb-3"
          role="group"
          aria-label={`${productName} product images`}
        >
          {safeImages.map((image, index) => {
            const isActive = activeIndex === index;

            return (
              <button
                key={`${image}-${index}`}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`Show ${productName} image ${index + 1}`}
                aria-pressed={isActive}
                className={`relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-2xl border-2 bg-white p-2 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#005a8d] focus-visible:ring-offset-2 ${
                  isActive
                    ? "scale-105 border-[#2ecc71] shadow-md"
                    : "border-slate-100 hover:border-[#005a8d]/30"
                }`}
              >
                <Image
                  src={image}
                  alt={`${productName} product view ${index + 1}`}
                  fill
                  sizes="80px"
                  className="object-contain p-2"
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}