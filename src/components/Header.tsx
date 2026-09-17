import { useState, useEffect } from 'react';
import { ShoppingCart, Search, Menu, X, Wrench } from 'lucide-react';
import { useCart } from '@/context/CartContext';

interface HeaderProps {
  onSearch: (query: string) => void;
  onBrandFilter: (brand: string) => void;
  onNavigate: (section: string) => void;
}

export default function Header({ onSearch, onBrandFilter, onNavigate }: HeaderProps) {
  const { totalItems, openCart } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showBrandDropdown, setShowBrandDropdown] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const brands = ['Todas', 'Toyota', 'Nissan', 'Suzuki', 'Universal'];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0d1117]/95 backdrop-blur-md border-b border-slate-800 shadow-lg shadow-black/50'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <button
            onClick={() => onNavigate('hero')}
            className="flex items-center gap-2 group"
          >
            <div className="flex items-center justify-center w-10 h-10 bg-[#e63946] rounded-lg group-hover:rotate-12 transition-transform duration-300">
              <Wrench className="w-6 h-6 text-white" />
            </div>
            <div className="text-left">
              <p className="text-sm font-extrabold text-white leading-tight">AUTOREPUESTOS</p>
              <p className="text-xs font-bold text-[#e63946] leading-tight tracking-widest">SANCHEZ</p>
            </div>
          </button>

          {/* Desktop Search */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-xl mx-8">
            <div className="relative flex-1">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar por nombre, marca o numero de parte..."
                className="input-dark w-full pl-4 pr-10 py-2.5 text-sm"
              />
              <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#00b4d8] transition-colors">
                <Search className="w-5 h-5" />
              </button>
            </div>
          </form>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            <button onClick={() => onNavigate('categories')} className="text-slate-300 hover:text-white text-sm font-medium transition-colors">
              Categorias
            </button>

            <div
              className="relative"
              onMouseEnter={() => setShowBrandDropdown(true)}
              onMouseLeave={() => setShowBrandDropdown(false)}
            >
              <button className="text-slate-300 hover:text-white text-sm font-medium transition-colors flex items-center gap-1">
                Marcas
              </button>
              {showBrandDropdown && (
                <div className="absolute top-full right-0 mt-2 w-44 bg-[#161b22] border border-slate-700 rounded-lg shadow-xl py-2 animate-fade-in">
                  {brands.map((brand) => (
                    <button
                      key={brand}
                      onClick={() => onBrandFilter(brand === 'Todas' ? '' : brand)}
                      className="block w-full text-left px-4 py-2 text-sm text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
                    >
                      {brand}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button onClick={() => onNavigate('about')} className="text-slate-300 hover:text-white text-sm font-medium transition-colors">
              Nosotros
            </button>
            <button onClick={() => onNavigate('contact')} className="text-slate-300 hover:text-white text-sm font-medium transition-colors">
              Contacto
            </button>

            <button
              onClick={openCart}
              className="relative flex items-center gap-2 bg-[#1a2332] hover:bg-[#2a3548] px-4 py-2.5 rounded-lg transition-all duration-300 group"
            >
              <ShoppingCart className="w-5 h-5 text-slate-300 group-hover:text-white" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#e63946] text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center animate-scale-in">
                  {totalItems}
                </span>
              )}
            </button>
          </nav>

          {/* Mobile */}
          <div className="flex md:hidden items-center gap-3">
            <button
              onClick={openCart}
              className="relative flex items-center bg-[#1a2332] p-2.5 rounded-lg"
            >
              <ShoppingCart className="w-5 h-5 text-slate-300" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#e63946] text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
            <button onClick={() => setMobileMenu(!mobileMenu)} className="text-slate-300">
              {mobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenu && (
          <div className="md:hidden pb-4 animate-fade-in">
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar repuestos..."
                  className="input-dark w-full pl-4 pr-10 py-2.5 text-sm"
                />
                <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400">
                  <Search className="w-5 h-5" />
                </button>
              </div>
            </form>
            <div className="flex flex-col gap-3">
              <button onClick={() => { onNavigate('categories'); setMobileMenu(false); }} className="text-left text-slate-300 hover:text-white text-sm font-medium py-2">
                Categorias
              </button>
              <div className="flex flex-wrap gap-2 py-1">
                {brands.map((brand) => (
                  <button
                    key={brand}
                    onClick={() => { onBrandFilter(brand === 'Todas' ? '' : brand); setMobileMenu(false); }}
                    className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded-full transition-colors"
                  >
                    {brand}
                  </button>
                ))}
              </div>
              <button onClick={() => { onNavigate('about'); setMobileMenu(false); }} className="text-left text-slate-300 hover:text-white text-sm font-medium py-2">
                Nosotros
              </button>
              <button onClick={() => { onNavigate('contact'); setMobileMenu(false); }} className="text-left text-slate-300 hover:text-white text-sm font-medium py-2">
                Contacto
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
