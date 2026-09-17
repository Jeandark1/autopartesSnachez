import { Wrench, MapPin, Phone, Clock } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0d1117] border-t border-slate-800 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center justify-center w-10 h-10 bg-[#e63946] rounded-lg">
                <Wrench className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-extrabold text-white leading-tight">AUTOREPUESTOS</p>
                <p className="text-xs font-bold text-[#e63946] leading-tight tracking-widest">SANCHEZ</p>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-md">
              Tu tienda de repuestos originales en El Alto. Especialistas en Toyota, Nissan y Suzuki.
              Calidad, confianza y servicio desde La Ceja.
            </p>
          </div>

          {/* Location */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4">Ubicacion</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-2 text-sm text-slate-400">
                <MapPin className="w-4 h-4 text-[#e63946] flex-shrink-0 mt-0.5" />
                <span>Av. 6 de Marzo, La Ceja<br />El Alto, La Paz - Bolivia</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <Phone className="w-4 h-4 text-[#e63946]" />
                <span>+591 70000000</span>
              </div>
            </div>
          </div>

          {/* Hours */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4">Horarios</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <Clock className="w-4 h-4 text-[#00b4d8]" />
                <span>Lun - Vie: 8:00 - 18:00</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <Clock className="w-4 h-4 text-[#00b4d8]" />
                <span>Sabado: 8:00 - 14:00</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <Clock className="w-4 h-4 text-slate-600" />
                <span>Domingo: Cerrado</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-600 text-xs">
            © {new Date().getFullYear()} Autorepuestos Sanchez. Todos los derechos reservados.
          </p>
          <p className="text-slate-600 text-xs">
            El Alto · La Paz · Bolivia
          </p>
        </div>
      </div>
    </footer>
  );
}
