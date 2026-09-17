import { ShoppingCart, PackageSearch, Tag } from 'lucide-react';
import type { Product } from '@/types/database';
import { useCart } from '@/context/CartContext';

interface ProductGridProps {
  products: Product[];
  loading: boolean;
  searchQuery: string;
  brandFilter: string;
  selectedCategory: string | null;
}

export default function ProductGrid({
  products,
  loading,
  searchQuery,
  brandFilter,
  selectedCategory,
}: ProductGridProps) {
  const { addItem } = useCart();

  if (loading) {
    return (
      <section className="py-20 bg-[#0d1117]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="card-dark p-4 h-96">
                <div className="shimmer h-48 rounded-lg mb-4" />
                <div className="shimmer h-4 rounded mb-3 w-3/4" />
                <div className="shimmer h-3 rounded mb-2 w-1/2" />
                <div className="shimmer h-3 rounded mb-4 w-2/3" />
                <div className="shimmer h-10 rounded w-full" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  const hasFilters = searchQuery || brandFilter || selectedCategory;

  if (products.length === 0) {
    return (
      <section className="py-20 bg-[#0d1117]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <PackageSearch className="w-16 h-16 text-slate-600 mb-4" />
            <h3 className="text-xl font-bold text-slate-300 mb-2">
              No se encontraron repuestos
            </h3>
            <p className="text-slate-500">
              {hasFilters
                ? 'Intenta cambiar los filtros de busqueda.'
                : 'No hay productos disponibles en este momento.'}
            </p>
          </div>
        </div>
      </section>
    );
  }

  const countText =
    products.length === 1
      ? '1 producto encontrado'
      : `${products.length} productos encontrados`;

  return (
    <section className="py-20 bg-[#0d1117]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              {hasFilters ? 'Resultados' : 'Productos'}{' '}
              <span className="text-[#e63946]">Destacados</span>
            </h2>
            <p className="text-slate-400 text-base md:text-lg mt-2">{countText}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product, idx) => (
            <div
              key={product.id}
              className="card-dark overflow-hidden group flex flex-col animate-fade-in-up"
              style={{ animationDelay: `${Math.min(idx * 0.05, 0.5)}s` }}
            >
              <div className="relative h-48 overflow-hidden bg-[#0d1117]">
                {product.image_url ? (
                  <img
                    src={product.image_url}
                    alt={product.name}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <PackageSearch className="w-12 h-12 text-slate-700" />
                  </div>
                )}
                {product.featured && (
                  <span className="absolute top-3 left-3 bg-[#fcbf49] text-[#0d1117] text-xs font-bold px-2 py-1 rounded-md flex items-center gap-1">
                    <Tag className="w-3 h-3" /> Destacado
                  </span>
                )}
                <span className="absolute top-3 right-3 bg-[#1a2332]/90 text-slate-300 text-xs font-medium px-2 py-1 rounded-md">
                  {product.brand}
                </span>
              </div>

              <div className="p-4 flex flex-col flex-1">
                <h3 className="text-sm font-bold text-white leading-snug line-clamp-2 mb-1">
                  {product.name}
                </h3>
                <p className="text-xs text-slate-500 mb-2 font-mono">
                  {product.part_number}
                </p>

                {product.compatible_models && product.compatible_models.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-3">
                    {product.compatible_models.slice(0, 3).map((model) => (
                      <span
                        key={model}
                        className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded"
                      >
                        {model}
                      </span>
                    ))}
                    {product.compatible_models.length > 3 && (
                      <span className="text-[10px] text-slate-500">
                        +{product.compatible_models.length - 3}
                      </span>
                    )}
                  </div>
                )}

                <div className="mt-auto">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xl font-extrabold text-white">
                      Bs {product.price.toFixed(0)}
                    </span>
                    <span
                      className={`text-xs ${
                        product.stock > 0 ? 'text-[#2a9d8f]' : 'text-[#e63946]'
                      }`}
                    >
                      {product.stock > 0 ? `${product.stock} en stock` : 'Sin stock'}
                    </span>
                  </div>

                  <button
                    onClick={() => addItem(product)}
                    disabled={product.stock <= 0}
                    className="w-full flex items-center justify-center gap-2 bg-[#1a2332] hover:bg-[#e63946] text-slate-300 hover:text-white text-sm font-semibold py-2.5 rounded-lg transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed active:scale-95"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Agregar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
