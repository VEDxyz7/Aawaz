import { ShoppingCart, MapPin, Search, ChevronDown, Zap } from 'lucide-react';
import { useState } from 'react';
import { useCartStore } from '@/store/cartStore';

export default function Header({ searchQuery, setSearchQuery }) {
  const [location] = useState('Bangalore, Karnataka');
  const totalItems = useCartStore((s) => s.getTotalItems());
  const openCart = useCartStore((s) => s.openCart);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-xl border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-3 md:px-4 py-3">
        {/* Top Row: Logo + Location + Cart */}
        <div className="flex items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2 md:gap-4 min-w-0">
            <div className="flex items-center gap-1.5">
              <div className="w-9 h-9 rounded-xl bg-yellow-400 flex items-center justify-center shadow-md">
                <Zap className="w-5 h-5 text-black" fill="currentColor" />
              </div>
              <h1 className="text-xl md:text-2xl font-black text-gray-900 tracking-tight">AAWAZ</h1>
            </div>

            <button
              data-testid="location-selector"
              className="hidden sm:flex items-center gap-1.5 text-left min-w-0 hover:bg-gray-50 px-3 py-1.5 rounded-lg transition-colors"
            >
              <MapPin className="w-4 h-4 text-yellow-500 flex-shrink-0" />
              <div className="min-w-0">
                <div className="flex items-center gap-1">
                  <span className="text-xs font-bold text-gray-900">Delivery in 8 mins</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <span className="truncate">{location}</span>
                  <ChevronDown className="w-3 h-3 flex-shrink-0" />
                </div>
              </div>
            </button>
          </div>

          {/* Cart Button */}
          <button
            onClick={openCart}
            data-testid="cart-button"
            className="relative bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-4 md:px-6 py-2.5 rounded-full flex items-center gap-2 transition-all hover:scale-105 shadow-md text-sm md:text-base flex-shrink-0"
          >
            <ShoppingCart className="w-4 h-4 md:w-5 md:h-5" />
            <span className="hidden sm:inline">Cart</span>
            {totalItems > 0 && (
              <span
                data-testid="cart-count"
                className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-xs font-bold min-w-[20px] h-5 px-1 rounded-full flex items-center justify-center cart-bounce"
              >
                {totalItems}
              </span>
            )}
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
          <input
            type="text"
            placeholder='Search "milk", "chai", or anything...'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            data-testid="search-input"
            className="w-full pl-11 pr-4 py-3 rounded-xl bg-gray-100 border-2 border-transparent focus:border-yellow-400 focus:bg-white focus:outline-none transition-all text-sm font-medium"
          />
        </div>
      </div>
    </header>
  );
}
