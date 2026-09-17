import { Cog, Disc3, Zap, Car, type LucideIcon } from 'lucide-react';
import type { Category } from '@/types/database';

interface CategoriesProps {
  categories: Category[];
  onSelectCategory: (categoryId: string | null) => void;
  selectedCategory: string | null;
}

const iconMap: Record<string, LucideIcon> = {
  Cog,
  Disc3,
  Zap,
  Car,
  Wrench: Cog,
};

export default function Categories({ categories, onSelectCategory, selectedCategory }: CategoriesProps) {
  return (
    <section id="categories" className="py-20 bg-[#0d1117]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="section-title animate-fade-in-up">
            Explora por <span className="text-[#e63946]">Categoria</span>
          </h2>
          <p className="section-subtitle animate-fade-in-up delay-100">
            Encuentra el repuesto exacto que necesitas
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {categories.map((cat, idx) => {
            const Icon = iconMap[cat.icon] || Cog;
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(isActive ? null : cat.id)}
                className={`card-dark p-6 text-left group hover:scale-105 animate-fade-in-up ${
                  isActive ? 'border-[#e63946] bg-[#1a2332]' : ''
                }`}
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className={`flex items-center justify-center w-14 h-14 rounded-xl mb-4 transition-colors ${
                  isActive ? 'bg-[#e63946]' : 'bg-[#1a2332] group-hover:bg-[#2a3548]'
                }`}>
                  <Icon className={`w-7 h-7 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-white'}`} />
                </div>
                <h3 className="text-base md:text-lg font-bold text-white mb-1">{cat.name}</h3>
                <p className="text-xs text-slate-500 line-clamp-2">{cat.description}</p>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
