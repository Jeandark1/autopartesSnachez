import { MapPin, ShieldCheck, Truck, Clock, Phone, Mail, Wrench } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="py-20 bg-[#0d1117] relative overflow-hidden">
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-3"
        style={{
          backgroundImage: `linear-gradient(#00b4d8 1px, transparent 1px), linear-gradient(90deg, #00b4d8 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Info */}
          <div>
            <div className="inline-flex items-center gap-2 bg-[#e63946]/10 border border-[#e63946]/30 rounded-full px-4 py-1.5 mb-6">
              <Wrench className="w-4 h-4 text-[#e63946]" />
              <span className="text-[#e63946] text-xs font-semibold tracking-wide uppercase">Sobre Nosotros</span>
            </div>

            <h2 className="section-title mb-6">
              Tu tienda de confianza en <span className="text-[#e63946]">El Alto</span>
            </h2>

            <p className="text-slate-400 text-lg leading-relaxed mb-6">
              Autorepuestos Sanchez es una tienda con anos de experiencia ubicada en el corazon
              comercial de El Alto, sobre la Avenida 6 de Marzo en La Ceja. Nos especializamos en
              repuestos originales para vehiculos japoneses: Toyota, Nissan y Suzuki.
            </p>

            <p className="text-slate-400 text-lg leading-relaxed mb-8">
              Nuestro compromiso es ofrecerte productos de calidad, precios justos y atencion
              personalizada. Mas de 1,000 repuestos en stock listos para entrega inmediata.
            </p>

            {/* Trust badges */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-3 bg-[#161b22] border border-slate-800 rounded-lg p-4">
                <ShieldCheck className="w-6 h-6 text-[#2a9d8f] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-semibold text-sm">Repuestos Originales</p>
                  <p className="text-slate-500 text-xs mt-1">Garantia de calidad en cada pieza</p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-[#161b22] border border-slate-800 rounded-lg p-4">
                <Truck className="w-6 h-6 text-[#00b4d8] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-semibold text-sm">Entrega Rapida</p>
                  <p className="text-slate-500 text-xs mt-1">En todo El Alto y La Paz</p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-[#161b22] border border-slate-800 rounded-lg p-4">
                <Clock className="w-6 h-6 text-[#fcbf49] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-semibold text-sm">Atencion Inmediata</p>
                  <p className="text-slate-500 text-xs mt-1">Lun-Sab 8:00 - 18:00</p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-[#161b22] border border-slate-800 rounded-lg p-4">
                <Wrench className="w-6 h-6 text-[#e63946] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-semibold text-sm">Asesoria Tecnica</p>
                  <p className="text-slate-500 text-xs mt-1">Te ayudamos a elegir el repuesto</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Map + Contact */}
          <div id="contact" className="space-y-6">
            {/* Map */}
            <div className="card-dark overflow-hidden">
              <div className="relative h-64 bg-[#161b22]">
                <iframe
                  title="Ubicacion Autorepuestos Sanchez"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=-68.185%2C-16.505%2C-68.165%2C-16.495&layer=mapnik&marker=-16.5%2C-68.175"
                  className="w-full h-full border-0"
                  loading="lazy"
                />
              </div>
              <div className="p-4 flex items-center gap-3 border-t border-slate-800">
                <MapPin className="w-5 h-5 text-[#e63946] flex-shrink-0" />
                <div>
                  <p className="text-white text-sm font-semibold">Av. 6 de Marzo, La Ceja</p>
                  <p className="text-slate-500 text-xs">El Alto, La Paz - Bolivia</p>
                </div>
              </div>
            </div>

            {/* Contact cards */}
            <div className="grid sm:grid-cols-2 gap-4">
              <a
                href="tel:+59170000000"
                className="card-dark p-4 flex items-center gap-3 group hover:border-[#e63946]"
              >
                <div className="flex items-center justify-center w-10 h-10 bg-[#1a2332] rounded-lg group-hover:bg-[#e63946] transition-colors">
                  <Phone className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
                </div>
                <div>
                  <p className="text-xs text-slate-500">Llamanos</p>
                  <p className="text-sm text-white font-semibold">+591 70000000</p>
                </div>
              </a>
              <a
                href="mailto:contacto@autorepostossanchez.com"
                className="card-dark p-4 flex items-center gap-3 group hover:border-[#e63946]"
              >
                <div className="flex items-center justify-center w-10 h-10 bg-[#1a2332] rounded-lg group-hover:bg-[#e63946] transition-colors">
                  <Mail className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
                </div>
                <div>
                  <p className="text-xs text-slate-500">Escribenos</p>
                  <p className="text-sm text-white font-semibold truncate">contacto@autorepuestos.com</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
