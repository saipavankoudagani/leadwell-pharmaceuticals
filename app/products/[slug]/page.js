import { products } from '@/lib/products-data';
import { notFound } from 'next/navigation';
import { ArrowLeft, ShieldCheck, Info } from 'lucide-react';
import Link from 'next/link';
import ProductGallery from '@/components/ProductGallery';

// SEO Logic
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) return { title: 'Product Not Found' };
  return { title: `${product.name} | Leadwell Pharmaceuticals` };
}

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);

  if (!product) notFound();

  return (
    <div className="bg-slate-50 min-h-screen py-12 px-[5%]">
      <div className="max-w-6xl mx-auto">
        <Link href="/products" className="inline-flex items-center text-[#005a8d] font-bold mb-8 hover:text-[#2ecc71] transition">
          <ArrowLeft size={18} className="mr-2" /> Back to All Products
        </Link>

        <div className="grid lg:grid-cols-12 gap-12">
          
          {/* LEFT: INTERACTIVE MULTI-IMAGE VIEWER */}
          <div className="lg:col-span-5">
            <ProductGallery images={product.gallery} productName={product.name} />
          </div>

          {/* RIGHT: MEDICAL & BRAND CONTENT */}
          <div className="lg:col-span-7 bg-white p-10 md:p-14 rounded-[40px] shadow-sm border border-slate-100">
            <div>
              <span className="bg-[#2ecc71]/10 text-[#2ecc71] px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest">
                {product.category}
              </span>
              <h1 className="text-4xl md:text-5xl font-extrabold text-[#005a8d] mt-6 mb-4">{product.name}</h1>
              <p className="text-slate-500 leading-relaxed text-lg mb-8">{product.description}</p>
            </div>

            <div className="space-y-6">
              <div className="bg-[#f8fbff] p-8 rounded-3xl border border-blue-50">
                <h3 className="font-bold text-[#005a8d] flex items-center mb-3 text-lg">
                  <ShieldCheck size={24} className="mr-3 text-[#2ecc71]" /> Active Composition
                </h3>
                <p className="text-slate-700 leading-relaxed font-medium">{product.composition}</p>
              </div>

              <div className="p-8 border border-slate-100 rounded-3xl">
                <h3 className="font-bold text-[#005a8d] flex items-center mb-3 text-lg">
                  <Info size={24} className="mr-3 text-[#2ecc71]" /> Clinical Indications
                </h3>
                <p className="text-slate-600 leading-relaxed italic">{product.indications}</p>
              </div>
            </div>

            <div className="pt-10">
              <Link href="/contact" className="w-full block text-center bg-[#005a8d] text-white py-5 rounded-2xl font-bold text-lg hover:bg-[#004066] transition-all shadow-xl shadow-blue-900/20">
                Inquire for Hospital Supply
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}