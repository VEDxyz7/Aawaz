import { ShoppingCart, MapPin, Search } from 'lucide-react';
import { useState } from 'react';

export default function Header({ cart, searchQuery, setSearchQuery }) {
  const [location, setLocation] = useState('Bangalore, Karnataka');
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-xl border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo & Location */}
          <div className="flex items-center gap-6">
            <div>
              <h1 className="text-2xl font-black text-gray-900">AAWAZ</h1>
              <div className="flex items-center gap-1 text-sm text-gray-600 mt-1">
                <MapPin className="w-4 h-4 text-yellow-500" />
                <span className="font-medium">{location}</span>
                <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-semibold">
                  8 mins
                </span>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-xl">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search for products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                data-testid="search-input"
                className="w-full pl-12 pr-4 py-3 rounded-full bg-gray-50 border-2 border-transparent focus:border-yellow-400 focus:bg-white focus:outline-none transition-all"
              />
            </div>
          </div>

          {/* Cart */}
          <button
            data-testid="cart-button"
            className="relative bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-6 py-3 rounded-full flex items-center gap-2 transition-all hover:scale-105 shadow-md"
          >
            <ShoppingCart className="w-5 h-5" />
            <span>Cart</span>
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}