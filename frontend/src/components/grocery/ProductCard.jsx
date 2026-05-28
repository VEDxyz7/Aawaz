import { Plus, Clock, Star, Minus, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCartStore, useAIStore } from '@/store/cartStore';
import { toast } from 'sonner';
import { CATEGORY_FALLBACKS } from '@/data/products';

export default function ProductCard({ product, compact = false }) {
  const items = useCartStore((s) => s.items);
  const addItem = useCartStore((s) => s.addItem);
  const incrementQuantity = useCartStore((s) => s.incrementQuantity);
  const decrementQuantity = useCartStore((s) => s.decrementQuantity);

  const highlightedIds = useAIStore((s) => s.highlightedProductIds);
  const isHighlighted = highlightedIds.includes(product.id);

  const cartItem = items.find((i) => i.id === product.id);
  const quantity = cartItem?.quantity || 0;

  const discount = product.original_price
    ? Math.round(((product.original_price - product.price) / product.original_price) * 100)
    : 0;

  const handleAdd = (e) => {
    e.stopPropagation();
    addItem(product);
    toast.success(`${product.name} added`, { duration: 1500 });
  };

  return (
    <motion.div
      data-testid={`product-card-${product.id}`}
      layout
      whileHover={{ y: -2 }}
      className={`bg-white border rounded-2xl p-2.5 flex flex-col h-full transition-all relative ${
        isHighlighted
          ? 'ring-pulse border-yellow-400 shadow-lg'
          : 'border-gray-100 shadow-sm hover:shadow-md'
      }`}
    >
      {isHighlighted && (
        <div className="absolute -top-2 -right-2 bg-yellow-400 text-black text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1 z-10 shadow-md">
          <Sparkles className="w-3 h-3" />
          AI Pick
        </div>
      )}

      {/* Image */}
      <div className="relative mb-2 bg-gray-50 rounded-xl overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className={`w-full ${compact ? 'h-24' : 'h-28 md:h-32'} object-cover`}
          onError={(e) => {
            // Use category-specific fallback to keep imagery relevant
            const fallback = CATEGORY_FALLBACKS[product.category] || CATEGORY_FALLBACKS.essentials;
            if (e.target.src !== fallback) {
              e.target.src = fallback;
            }
          }}
        />
        {discount > 0 && (
          <div className="absolute top-1.5 left-1.5 bg-blue-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
            {discount}% OFF
          </div>
        )}
        <div className="absolute bottom-1.5 left-1.5 bg-white/95 backdrop-blur-sm text-gray-700 text-[10px] font-semibold px-1.5 py-0.5 rounded flex items-center gap-1">
          <Clock className="w-2.5 h-2.5" />
          {product.delivery_time}
        </div>
      </div>

      {/* Info */}
      <div className="flex-1 min-h-0">
        {product.rating && (
          <div className="flex items-center gap-1 mb-1">
            <Star className="w-3 h-3 fill-green-600 text-green-600" />
            <span className="text-[11px] font-semibold text-gray-700">{product.rating}</span>
          </div>
        )}
        <h3 className="font-semibold text-gray-900 text-xs md:text-sm leading-tight line-clamp-2 mb-1">
          {product.name}
        </h3>
        <p className="text-[10px] text-gray-500 mb-1.5">{product.unit}</p>
      </div>

      {/* Price + Add */}
      <div className="flex items-end justify-between gap-1">
        <div className="flex flex-col">
          <span className="text-sm font-bold text-gray-900">₹{product.price}</span>
          {product.original_price && (
            <span className="text-[10px] text-gray-400 line-through">₹{product.original_price}</span>
          )}
        </div>

        {quantity > 0 ? (
          <div className="flex items-center gap-1 bg-green-600 rounded-lg overflow-hidden shadow-sm" data-testid={`quantity-control-${product.id}`}>
            <button
              onClick={(e) => { e.stopPropagation(); decrementQuantity(product.id); }}
              data-testid={`decrement-${product.id}`}
              className="text-white p-1 hover:bg-green-700 transition-colors"
            >
              <Minus className="w-3 h-3" />
            </button>
            <span className="text-white text-xs font-bold min-w-[16px] text-center">{quantity}</span>
            <button
              onClick={(e) => { e.stopPropagation(); incrementQuantity(product.id); }}
              data-testid={`increment-${product.id}`}
              className="text-white p-1 hover:bg-green-700 transition-colors"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>
        ) : (
          <button
            onClick={handleAdd}
            data-testid={`add-to-cart-${product.id}`}
            className="border border-green-600 text-green-700 hover:bg-green-50 active:bg-green-100 font-bold px-3 py-1 rounded-lg text-xs transition-colors"
          >
            ADD
          </button>
        )}
      </div>
    </motion.div>
  );
}
