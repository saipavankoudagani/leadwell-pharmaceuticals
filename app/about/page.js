import { Award, Users, ShieldCheck, Building2 } from 'lucide-react';

export default function About() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-[5%] bg-[#005a8d] text-white text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Commitment to Healthcare</h1>
        <p className="max-w-3xl mx-auto text-blue-100 text-lg leading-relaxed">
          Based in the heart of Hyderabad, Leadwell Pharmaceuticals is a premier 
          supply chain partner dedicated to delivering excellence in every dose.
        </p>
      </section>

      {/* Origin Story */}
      <section className="py-20 px-[5%] max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-3xl font-bold text-[#005a8d] mb-6">Bridging the Gap</h2>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Leadwell Pharmaceuticals was established with a clear vision: to ensure that 
            essential medicines are available to those who need them most. We specialize 
            in sourcing top-tier formulations from WHO-GMP certified manufacturers.
          </p>
          <p className="text-gray-600 leading-relaxed">
            As a Hyderabad-based entity, we leverage our strategic location to provide 
            seamless distribution to hospitals, clinics, and healthcare centers, 
            maintaining the highest standards of safety and professional integrity.
          </p>
        </div>
        <div className="bg-slate-100 rounded-3xl h-80 flex items-center justify-center border-2 border-dashed border-slate-200">
           <Building2 size={80} className="text-slate-300" />
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-slate-50 px-[5%]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-10 bg-white rounded-[32px] shadow-sm">
            <ShieldCheck className="mx-auto text-[#2ecc71] mb-6" size={48} />
            <h3 className="font-bold text-[#005a8d] text-xl mb-4">Quality First</h3>
            <p className="text-gray-500 text-sm">Every batch undergoes rigorous quality checks before it enters our supply chain.</p>
          </div>
          <div className="p-10 bg-white rounded-[32px] shadow-sm">
            <Users className="mx-auto text-[#2ecc71] mb-6" size={48} />
            <h3 className="font-bold text-[#005a8d] text-xl mb-4">Partner Focused</h3>
            <p className="text-gray-500 text-sm">We build long-term relationships with hospitals based on trust and reliability.</p>
          </div>
          <div className="p-10 bg-white rounded-[32px] shadow-sm">
            <Award className="mx-auto text-[#2ecc71] mb-6" size={48} />
            <h3 className="font-bold text-[#005a8d] text-xl mb-4">Ethical Conduct</h3>
            <p className="text-gray-500 text-sm">Operating with 100% transparency and adherence to pharmaceutical regulations.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
