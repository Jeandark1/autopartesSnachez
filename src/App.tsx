import { useState, useEffect, useCallback } from 'react';
import { CartProvider } from '@/context/CartContext';
import SplashScreen from '@/components/SplashScreen';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Categories from '@/components/Categories';
import ProductGrid from '@/components/ProductGrid';
import CartDrawer from '@/components/CartDrawer';
import CheckoutModal from '@/components/CheckoutModal';
import About from '@/components/About';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import { supabase } from '@/lib/supabase';
import type { Category, Product } from '@/types/database';

function AppContent() {
  const [showSplash, setShowSplash] = useState(true);
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [brandFilter, setBrandFilter] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const [catRes, prodRes] = await Promise.all([
        supabase.from('categories').select('*').order('name'),
        supabase.from('products').select('*').order('created_at'),
      ]);

      if (catRes.data) setCategories(catRes.data);
      if (prodRes.data) setProducts(prodRes.data as Product[]);
      setLoading(false);
    }
    fetchData();
  }, []);

  const filteredProducts = products.filter((p) => {
    if (selectedCategory && p.category_id !== selectedCategory) return false;
    if (brandFilter && p.brand !== brandFilter) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matches =
        p.name.toLowerCase().includes(q) ||
        p.part_number?.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.compatible_models?.some((m) => m.toLowerCase().includes(q));
      if (!matches) return false;
    }
    return true;
  });

  const handleNavigate = useCallback((section: string) => {
    if (section === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const handleShopNow = useCallback(() => {
    document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <>
      {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}

      <Header
        onSearch={setSearchQuery}
        onBrandFilter={(brand) => {
          setBrandFilter(brand);
          handleShopNow();
        }}
        onNavigate={handleNavigate}
      />

      <main>
        <Hero onShopNow={handleShopNow} />

        <Categories
          categories={categories}
          onSelectCategory={setSelectedCategory}
          selectedCategory={selectedCategory}
        />

        <ProductGrid
          products={filteredProducts}
          loading={loading}
          searchQuery={searchQuery}
          brandFilter={brandFilter}
          selectedCategory={selectedCategory}
        />

        <About />
      </main>

      <Footer />
      <WhatsAppButton />

      <CartDrawer onCheckout={() => setCheckoutOpen(true)} />
      <CheckoutModal isOpen={checkoutOpen} onClose={() => setCheckoutOpen(false)} />
    </>
  );
}

export default function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}
