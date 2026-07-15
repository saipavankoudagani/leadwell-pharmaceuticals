import Link from 'next/link';
import { ShieldCheck, Truck, Building2, ClipboardCheck, ArrowUpRight, Award, Activity, Zap, HeartPulse, User } from 'lucide-react';

export default function Home() {
  return (
    <div className="bg-white selection:bg-[#2ecc71] selection:text-white">
      {/* --- HERO: BRAND MARKETING FOCUS --- */}
      <section className="relative min-h-[90vh] flex items-center justify-center px-[5%] overflow-hidden bg-[#f8fbff]">
        {/* LARGE WATERMARK LOGO */}
        <img src="/logo.png" className="absolute -right-20 top-20 w-[600px] opacity-[0.03] rotate-12 pointer-events-none" alt="" />
        
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10">
          <div className="text-left">
            <img src="/logo.png" alt="Leadwell Logo" className="w-24 mb-10 drop-shadow-sm" />
            <div className="inline-flex items-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-full mb-8 shadow-sm">
              <span className="w-2 h-2 bg-[#2ecc71] rounded-full animate-pulse"></span>
              <span className="text-xs font-bold text-[#005a8d] tracking-widest uppercase">Trusted Pharma Brand</span>
            </div>
            <h1 className="text-6xl md:text-7xl font-extrabold text-[#005a8d] leading-[1.1] mb-8">
              Advancing Care with <br /> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#005a8d] to-[#2ecc71]">Proven Formulations.</span>
            </h1>
            <p className="text-lg text-slate-600 mb-10 max-w-lg leading-relaxed">
              We are a premier pharmaceutical brand marketing company. We develop high-quality medicines, promote evidence-based therapies to doctors, and ensure seamless availability across hospitals.
            </p>
            <div className="flex flex-wrap gap-5">
              <Link href="/products" className="bg-[#005a8d] text-white px-10 py-5 rounded-2xl font-bold hover:shadow-2xl hover:shadow-blue-200 transition-all flex items-center gap-2 group">
                Explore Our Brands <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Link>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute inset-0 bg-[#2ecc71]/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative z-10 bg-white p-4 rounded-[40px] shadow-2xl border border-slate-100 italic">
              <img src="/pharma-1.png" alt="Clinical Supply" className="rounded-[32px] w-full h-[550px] object-cover" />
              {/* BRAND STAMP OVER IMAGE */}
              <div className="absolute top-10 right-10 bg-white p-3 rounded-2xl shadow-lg border border-slate-100">
                <img src="/logo.png" className="h-8 w-auto" alt="Leadwell" />
              </div>
            </div>
            {/* Professional Floating Card */}
            <div className="absolute -bottom-10 -left-10 bg-white/80 backdrop-blur-md p-8 rounded-3xl shadow-xl border border-white/50 z-20 hidden md:block max-w-[280px]">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-[#2ecc71]/10 p-3 rounded-xl"><Award className="text-[#2ecc71]" /></div>
                <h4 className="font-bold text-[#005a8d]">Doctor Recommended</h4>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">Our proprietary brands are trusted and prescribed by top specialists across Telangana.</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- LOGO MARQUEE (TRUST STRIP) --- */}
      <div className="bg-white py-10 border-y border-slate-50 flex items-center justify-center gap-20 overflow-hidden">
        <div className="flex items-center gap-12 animate-infinite-scroll">
           <img src="/logo.png" className="h-10 opacity-30 grayscale" alt="" />
           <span className="text-slate-200 font-bold text-2xl uppercase tracking-[10px]">Quality Formulations</span>
           <img src="/logo.png" className="h-10 opacity-30 grayscale" alt="" />
           <span className="text-slate-200 font-bold text-2xl uppercase tracking-[10px]">Clinical Advocacy</span>
           <img src="/logo.png" className="h-10 opacity-30 grayscale" alt="" />
           <span className="text-slate-200 font-bold text-2xl uppercase tracking-[10px]">Hospital Availability</span>
        </div>
      </div>

      {/* --- CORE VERTICALS: THE SPECIALIZED GRID --- */}
      <section className="py-32 px-[5%] relative">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-16">
            <img src="/logo.png" className="h-12 w-auto" alt="Leadwell" />
            <div className="h-px bg-slate-200 flex-grow"></div>
            <h2 className="text-2xl font-bold text-[#005a8d] uppercase tracking-widest">Our Branded Verticals</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <VerticalCard icon={<Activity />} title="Orthopedics" desc="Premium bone density and joint recovery formulations." />
            <VerticalCard icon={<Zap />} title="Neurology" desc="Targeted neuro-protective and cognitive treatments." active />
            <VerticalCard icon={<HeartPulse />} title="Gynecology" desc="Comprehensive women's hormonal and wellness healthcare." />
            <VerticalCard icon={<User />} title="General Health" desc="Highly prescribed daily broad-spectrum medicines." />
          </div>
        </div>
      </section>

      {/* --- THE LEADWELL MODEL: UNIQUE SECTION --- */}
      <section className="py-24 px-[5%] bg-[#005a8d] overflow-hidden relative">
        <div className="absolute top-0 right-0 p-20 opacity-10"><Building2 size={400} /></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-4xl font-bold text-white mb-8">Our Integrated <br /> <span className="text-[#2ecc71]">Business Model</span></h2>
              <div className="space-y-8">
                <ProcessItem num="01" title="Contract Manufacturing" text="We partner with elite, WHO-GMP certified facilities to produce our proprietary branded medicines." />
                <ProcessItem num="02" title="Clinical Promotion" text="Our dedicated team engages with medical professionals, ensuring our formulations become the trusted prescription of choice." />
                <ProcessItem num="03" title="Flexible Distribution" text="We ensure uninterrupted hospital supply through both direct delivery and authorized third-party distributor networks." />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img src="/pharma-2.png" className="rounded-3xl h-64 w-full object-cover mt-12" alt="Manufacturing" />
              <img src="/pharma-3.png" className="rounded-3xl h-64 w-full object-cover" alt="Doctor Consultation" />
            </div>
          </div>
        </div>
      </section>

      {/* --- FINAL CALL TO ACTION --- */}
      <section className="py-32 text-center px-[5%]">
        <div className="max-w-4xl mx-auto bg-slate-50 rounded-[50px] py-16 px-10 border border-slate-100">
           <ClipboardCheck className="mx-auto text-[#2ecc71] mb-6" size={50} />
           <h2 className="text-4xl font-bold text-[#005a8d] mb-6">Partner for Better Outcomes</h2>
           <p className="text-slate-500 mb-10 text-lg">Whether you are a healthcare professional looking for reliable prescriptions, or a hospital requiring consistent supply.</p>
           <Link href="/contact" className="bg-[#005a8d] text-white px-12 py-5 rounded-2xl font-bold shadow-xl shadow-blue-100 hover:scale-105 transition-transform inline-block">
             Contact Leadwell
           </Link>
        </div>
      </section>
    </div>
  );
}

// Sub-components for better organization
function VerticalCard({ icon, title, desc, active = false }) {
  // We use require('react') here to clone the element cleanly in Next.js Server Components
  const React = require('react');
  return (
    <div className={`p-10 rounded-[40px] transition-all duration-500 relative overflow-hidden group ${active ? 'bg-[#005a8d] text-white shadow-2xl scale-105' : 'bg-white border border-slate-100 hover:border-[#2ecc71]'}`}>
      {/* TINY WATERMARK LOGO INSIDE CARD */}
      <img src="/logo.png" className={`absolute -right-4 -bottom-4 h-16 opacity-5 ${active ? 'brightness-0 invert' : ''}`} alt="" />
      
      <div className={`mb-8 p-4 rounded-2xl inline-block transition-colors ${active ? 'bg-[#2ecc71]/20' : 'bg-slate-50 group-hover:bg-[#2ecc71]/10'}`}>
        {React.cloneElement(icon, { size: 32, className: active ? 'text-[#2ecc71]' : 'text-[#005a8d]' })}
      </div>
      <h4 className="text-xl font-bold mb-4">{title}</h4>
      <p className={`text-sm leading-relaxed ${active ? 'text-blue-100' : 'text-slate-500'}`}>{desc}</p>
    </div>
  );
}

function ProcessItem({ num, title, text }) {
  return (
    <div className="flex gap-6 items-start">
      <div className="text-3xl font-black text-[#2ecc71]/30">{num}</div>
      <div>
        <h4 className="text-white font-bold text-lg mb-1">{title}</h4>
        <p className="text-blue-100/70 text-sm leading-relaxed">{text}</p>
      </div>
    </div>
  );
}