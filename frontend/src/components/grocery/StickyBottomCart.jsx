import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, ArrowRight } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';

export default function StickyBottomCart() {
  const totalItems = useCartStore((s) => s.getTotalItems());
  const subtotal = useCartStore((s) => s.getSubtotal());
  const openCart = useCartStore((s) => s.openCart);

  return (
    <AnimatePresence>
      {totalItems > 0 && (
        <motion.button
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 22, stiffness: 280 }}
          onClick={openCart}
          data-testid="sticky-bottom-cart"
          className="fixed bottom-4 left-4 right-4 md:left-1/2 md:right-auto md:-translate-x-1/2 md:w-[440px] z-40 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-2xl shadow-2xl flex items-center justify-between transition-colors active:scale-[0.98]"
        >
          <div className="flex items-center gap-3">
            <div className="bg-white/20 rounded-lg p-2 relative">
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute -top-1.5 -right-1.5 bg-white text-green-700 text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            </div>
            <div className="text-left">
              <div className="text-sm font-black">{totalItems} {totalItems === 1 ? 'item' : 'items'} • ₹{subtotal}</div>
              <div className="text-[11px] opacity-90 font-medium">View cart</div>
            </div>
          </div>
          <ArrowRight className="w-5 h-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
