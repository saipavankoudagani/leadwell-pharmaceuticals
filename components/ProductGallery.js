"use client";
import React, { useState } from 'react';

export default function ProductGallery({ images, productName }) {
  // If no images are provided, use your company logo as a safe fallback
  const safeImages = images && images.length > 0 ? images : ['/logo.png'];
  const [activeImg, setActiveImg] = useState(safeImages[0]);

  return (
    <div className="w-full flex flex-col items-center">
      {/* MAIN LARGE IMAGE */}
      <div className="bg-white w-full h-[400px] rounded-[32px] p-6 shadow-sm border border-slate-100 flex items-center justify-center mb-6">
        <img 
          src={activeImg} 
          alt={productName} 
          className="max-h-full max-w-full object-contain drop-shadow-xl transition-all duration-300"
        />
      </div>

      {/* THUMBNAIL ROW (Only shows if you added more than 1 image) */}
      {safeImages.length > 1 && (
        <div className="flex gap-4 overflow-x-auto pb-2 w-full justify-center">
          {safeImages.map((img, index) => (
            <button 
              key={index}
              onClick={() => setActiveImg(img)}
              className={`flex-shrink-0 w-20 h-20 bg-white rounded-2xl p-2 border-2 transition-all duration-200 ${
                activeImg === img ? 'border-[#2ecc71] shadow-md scale-105' : 'border-slate-100 hover:border-[#005a8d]/30'
              }`}
            >
              <img src={img} alt={`${productName} view ${index + 1}`} className="w-full h-full object-contain" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}