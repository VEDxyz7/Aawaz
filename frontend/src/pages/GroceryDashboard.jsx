import { useState, useEffect, useMemo } from 'react';
import Header from '@/components/grocery/Header';
import CategoryGrid from '@/components/grocery/CategoryGrid';
import ProductGrid from '@/components/grocery/ProductGrid';
import ProductCarousel from '@/components/grocery/ProductCarousel';
import AIAssistant from '@/components/ai/AIAssistant';
import CartDrawer from '@/components/grocery/CartDrawer';
import StickyBottomCart from '@/components/grocery/StickyBottomCart';
import { PRODUCTS, CATEGORIES, COLLECTIONS } from '@/data/products';
import { searchProducts } from '@/lib/aiEngine';

export default function GroceryDashboard() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [aiFilteredProducts, setAiFilteredProducts] = useState(null);

  // Listen for AI events
  useEffect(() => {
    const handleSetCategory = (e) => {
      setSelectedCategory(e.detail);
      setAiFilteredProducts(null);
      setTimeout(() => {
        document.getElementById('all-products')?.scrollIntoView({ behavior: 'smooth' });
      }, 200);
    };

    const handleFilterProducts = (e) => {
      setAiFilteredProducts(e.detail);
      setSelectedCategory(null);
      setTimeout(() => {
        document.getElementById('all-products')?.scrollIntoView({ behavior: 'smooth' });
      }, 200);
    };

    window.addEventListener('ai-set-category', handleSetCategory);
    window.addEventListener('ai-filter-products', handleFilterProducts);

    return () => {
      window.removeEventListener('ai-set-category', handleSetCategory);
      window.removeEventListener('ai-filter-products', handleFilterProducts);
    };
  }, []);

  // Filter products
  const displayProducts = useMemo(() => {
    if (aiFilteredProducts) return aiFilteredProducts;

    let products = PRODUCTS;
    if (selectedCategory) {
      products = products.filter((p) => p.category === selectedCategory);
    }
    if (searchQuery && searchQuery.length > 1) {
      products = searchProducts(searchQuery);
    }
    return products;
  }, [selectedCategory, searchQuery, aiFilteredProducts]);

  // Get products for collections
  const collectionProducts = useMemo(() => {
    return COLLECTIONS.map((c) => ({
      ...c,
      products: c.productIds.map((id) => PRODUCTS.find((p) => p.id === id)).filter(Boolean),
    }));
  }, []);

  const handleCategorySelect = (catId) => {
    setSelectedCategory(catId);
    setAiFilteredProducts(null);
    setSearchQuery('');
  };

  const isFilteredView = selectedCategory || searchQuery.length > 1 || aiFilteredProducts;

  return (
    <div className="min-h-screen bg-gray-50 pb-32">
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <main className="max-w-7xl mx-auto px-3 md:px-4 py-4 space-y-6">
        {/* Promotional Banner */}
        {!isFilteredView && (
          <div className="bg-gradient-to-r from-yellow-400 to-yellow-300 rounded-2xl p-5 md:p-6 flex items-center justify-between overflow-hidden relative">
            <div className="relative z-10">
              <p className="text-[10px] font-bold uppercase tracking-wider text-yellow-900 mb-1">Powered by AI</p>
              <h2 className="text-xl md:text-2xl font-black text-black leading-tight mb-2">
                Just say it.<br />Shop in seconds.
              </h2>
              <p className="text-xs md:text-sm text-black/80 font-medium">
                Tap the sparkle button → Speak naturally → AAWAZ shops for you
              </p>
            </div>
            <div className="absolute -right-4 top-1/2 -translate-y-1/2 opacity-20 text-9xl">✨</div>
          </div>
        )}

        {/* Categories */}
        <CategoryGrid
          categories={CATEGORIES}
          selectedCategory={selectedCategory}
          onSelectCategory={handleCategorySelect}
        />

        {/* AI Filtered or Filtered View */}
        {isFilteredView ? (
          <div id="all-products" className="space-y-3">
            <div className="flex items-center justify-between px-1">
              <div>
                <h2 className="text-lg md:text-xl font-bold text-gray-900">
                  {aiFilteredProducts
                    ? '✨ AI Curated for You'
                    : searchQuery
                    ? `Results for "${searchQuery}"`
                    : CATEGORIES.find((c) => c.id === selectedCategory)?.name || 'Products'}
                </h2>
                <p className="text-xs text-gray-500 mt-0.5">{displayProducts.length} products</p>
              </div>
              {(selectedCategory || aiFilteredProducts) && (
                <button
                  onClick={() => {
                    setSelectedCategory(null);
                    setAiFilteredProducts(null);
                    setSearchQuery('');
                  }}
                  data-testid="clear-filters"
                  className="text-xs font-semibold text-yellow-700 hover:text-yellow-800"
                >
                  Clear filters
                </button>
              )}
            </div>
            <ProductGrid products={displayProducts} />
          </div>
        ) : (
          <>
            {/* Collections */}
            {collectionProducts.map((collection) => (
              <ProductCarousel
                key={collection.id}
                id={collection.id}
                title={collection.title}
                subtitle={collection.subtitle}
                products={collection.products}
              />
            ))}

            {/* All Products */}
            <div id="all-products" className="space-y-3">
              <div className="px-1">
                <h2 className="text-lg md:text-xl font-bold text-gray-900">Shop Everything</h2>
                <p className="text-xs text-gray-500 mt-0.5">All {PRODUCTS.length} products</p>
              </div>
              <ProductGrid products={PRODUCTS} />
            </div>
          </>
        )}
      </main>

      <AIAssistant />
      <CartDrawer />
      <StickyBottomCart />
    </div>
  );
}
