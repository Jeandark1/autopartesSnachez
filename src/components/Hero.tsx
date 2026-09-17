import { ShieldCheck, Truck, Zap, ArrowDown } from 'lucide-react';

interface HeroProps {
  onShopNow: () => void;
}

export default function Hero({ onShopNow }: HeroProps) {
  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden pt-20">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(https://images.pexels.com/photos/5158155/pexels-photo-5158155.jpeg?auto=compress&cs=tinysrgb&w=1920)`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d1117] via-[#0d1117]/90 to-[#0d1117]/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117] via-transparent to-[#0d1117]/60" />
      </div>

      {/* Decorative grid overlay */}
      <div
        className="absolute inset-0 z-0 opacity-5"
        style={{
          backgroundImage: `linear-gradient(#00b4d8 1px, transparent 1px), linear-gradient(90deg, #00b4d8 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-[#e63946]/10 border border-[#e63946]/30 rounded-full px-4 py-1.5 mb-6 animate-fade-in-up">
            <span className="w-2 h-2 bg-[#e63946] rounded-full animate-pulse" />
            <span className="text-[#e63946] text-xs font-semibold tracking-wide uppercase">
              Av. 6 de Marzo · La Ceja · El Alto
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.05] tracking-tight animate-fade-in-up delay-100">
            Repuestos
            <span className="block text-[#e63946]">Originales</span>
            <span className="block text-3xl sm:text-4xl md:text-5xl text-slate-300 font-bold mt-2">
              para tu vehiculo
            </span>
          </h1>

          <p className="mt-6 text-slate-400 text-lg md:text-xl max-w-xl leading-relaxed animate-fade-in-up delay-200">
            Especialistas en Toyota, Nissan y Suzuki. Mas de 1,000 repuestos en stock
            con garantia de calidad y entrega rapida en todo El Alto.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 animate-fade-in-up delay-300">
            <button onClick={onShopNow} className="btn-accent flex items-center justify-center gap-2">
              <Zap className="w-5 h-5" />
              Comprar Ahora
            </button>
            <button onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })} className="btn-outline">
              Sobre Nosotros
            </button>
          </div>

          {/* Trust badges */}
          <div className="mt-12 grid grid-cols-3 gap-4 max-w-lg animate-fade-in-up delay-500">
            <div className="flex flex-col items-center text-center gap-2">
              <div className="flex items-center justify-center w-12 h-12 bg-[#1a2332] rounded-lg border border-slate-700">
                <ShieldCheck className="w-6 h-6 text-[#2a9d8f]" />
              </div>
              <p className="text-xs text-slate-400 font-medium">Garantia Original</p>
            </div>
            <div className="flex flex-col items-center text-center gap-2">
              <div className="flex items-center justify-center w-12 h-12 bg-[#1a2332] rounded-lg border border-slate-700">
                <Truck className="w-6 h-6 text-[#00b4d8]" />
              </div>
              <p className="text-xs text-slate-400 font-medium">Entrega Rapida</p>
            </div>
            <div className="flex flex-col items-center text-center gap-2">
              <div className="flex items-center justify-center w-12 h-12 bg-[#1a2332] rounded-lg border border-slate-700">
                <Zap className="w-6 h-6 text-[#fcbf49]" />
              </div>
              <p className="text-xs text-slate-400 font-medium">Stock Inmediato</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={onShopNow}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-500 hover:text-slate-300 transition-colors animate-float"
      >
        <ArrowDown className="w-6 h-6" />
      </button>
    </section>
  );
}
