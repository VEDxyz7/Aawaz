import { Plus, Clock } from 'lucide-react';

export default function ProductGrid({ products, onAddToCart }) {
  if (products.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500 text-lg">No products found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {products.map((product) => (
        <div
          key={product.id}
          data-testid={`product-card-${product.id}`}
          className="bg-white border border-gray-100 shadow-sm hover:shadow-lg transition-all rounded-2xl p-3 flex flex-col justify-between h-full group"
        >
          {/* Product Image */}
          <div className="relative mb-3">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-32 object-cover rounded-xl"
            />
            {product.original_price && (
              <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                {Math.round(((product.original_price - product.price) / product.original_price) * 100)}% OFF
              </div>
            )}
            <div className="absolute bottom-2 right-2 bg-white/90 backdrop-blur-sm text-gray-700 text-xs font-medium px-2 py-1 rounded-full flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {product.delivery_time}
            </div>
          </div>

          {/* Product Info */}
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-2">
              {product.name}
            </h3>
            <p className="text-xs text-gray-500 mb-2">{product.unit}</p>
            
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-gray-900">₹{product.price}</span>
              {product.original_price && (
                <span className="text-xs text-gray-400 line-through">₹{product.original_price}</span>
              )}
            </div>
          </div>

          {/* Add Button */}
          <button
            onClick={() => onAddToCart(product)}
            data-testid={`add-to-cart-${product.id}`}
            className="mt-3 w-full bg-white border-2 border-green-600 text-green-700 hover:bg-green-50 font-bold py-2 rounded-lg flex items-center justify-center gap-2 transition-all group-hover:scale-105"
          >
            <Plus className="w-4 h-4" />
            ADD
          </button>
        </div>
      ))}
    </div>
  );
}