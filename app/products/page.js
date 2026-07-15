import Link from 'next/link';
import { products } from '@/lib/products-data';

export default function ProductsGallery() {
  return (
    <div className="bg-[#f8fbff] min-h-screen py-20 px-[5%]">
      <div className="max-w-7xl mx-auto text-center mb-20">
        <h1 className="text-5xl font-extrabold text-[#005a8d] mb-6">Our Branded Portfolio</h1>
        <p className="text-slate-500 text-lg max-w-2xl mx-auto">
          Explore our proprietary, doctor-recommended formulations trusted by leading hospitals and clinics across Telangana.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {products.map((product) => (
          <div key={product.slug} className="bg-white border border-slate-100 p-6 rounded-[32px] shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between group">
            <div>
              {/* IMAGE DISPLAY */}
              <div className="bg-slate-50 h-56 rounded-[24px] mb-6 flex items-center justify-center p-4 overflow-hidden group-hover:bg-[#2ecc71]/5 transition-colors">
                {product.mainImage ? (
                  <img src={product.mainImage} alt={product.name} className="max-h-full object-contain mix-blend-multiply drop-shadow-md group-hover:scale-110 transition-transform duration-500" />
                ) : (
                   <span className="text-slate-300 font-bold uppercase tracking-widest text-xs">Image Coming Soon</span>
                )}
              </div>
              <span className="text-[10px] font-black text-[#2ecc71] uppercase tracking-[2px] bg-[#2ecc71]/10 px-3 py-1 rounded-full">{product.category}</span>
              <h3 className="text-2xl font-bold text-[#005a8d] mt-4 mb-2">{product.name}</h3>
              <p className="text-slate-500 text-sm line-clamp-2 mb-6">{product.description}</p>
            </div>
            
            {/* --- UPDATED BUTTON TEXT --- */}
            <Link 
              href={`/products/${product.slug}`} 
              className="text-center border-2 border-[#005a8d] text-[#005a8d] py-3.5 rounded-xl font-bold hover:bg-[#005a8d] hover:text-white transition-colors"
            >
              View Product Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}