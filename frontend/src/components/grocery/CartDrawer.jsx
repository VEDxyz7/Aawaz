import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, ShoppingBag, Clock, Trash2, Sparkles } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useNavigate } from 'react-router-dom';

export default function CartDrawer() {
  const navigate = useNavigate();
  const isOpen = useCartStore((s) => s.isOpen);
  const closeCart = useCartStore((s) => s.closeCart);
  const items = useCartStore((s) => s.items);
  const subtotal = useCartStore((s) => s.getSubtotal());
  const savings = useCartStore((s) => s.getSavings());
  const incrementQuantity = useCartStore((s) => s.incrementQuantity);
  const decrementQuantity = useCartStore((s) => s.decrementQuantity);
  const removeItem = useCartStore((s) => s.removeItem);

  const handleCheckout = () => {
    closeCart();
    navigate('/checkout');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-[55]"
            onClick={closeCart}
            data-testid="cart-overlay"
          />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            data-testid="cart-drawer"
            className="fixed top-0 right-0 bottom-0 w-full md:max-w-md bg-gray-50 z-[60] flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="bg-white px-4 py-4 border-b border-gray-100 flex items-center justify-between flex-shrink-0">
              <div>
                <h2 className="text-lg font-bold text-gray-900">My Cart</h2>
                <p className="text-xs text-gray-500">{items.length} {items.length === 1 ? 'item' : 'items'}</p>
              </div>
              <button
                onClick={closeCart}
                data-testid="close-cart"
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-700" />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
                <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
                  <ShoppingBag className="w-10 h-10 text-yellow-500" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">Your cart is empty</h3>
                <p className="text-sm text-gray-500 mb-6">Add items to get started</p>
                <button
                  onClick={closeCart}
                  className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-6 py-2.5 rounded-full transition-colors"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              <>
                {/* Delivery Info */}
                <div className="bg-blue-50 mx-4 mt-3 p-3 rounded-xl flex items-center gap-2 flex-shrink-0">
                  <Clock className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  <span className="text-xs font-semibold text-blue-900">Delivery in 10 mins</span>
                </div>

                {/* Items List */}
                <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2">
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      className="bg-white rounded-xl p-3 flex gap-3 items-center"
                      data-testid={`cart-item-${item.id}`}
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-14 h-14 rounded-lg object-cover flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-semibold text-gray-900 line-clamp-1">{item.name}</h4>
                        <p className="text-[11px] text-gray-500">{item.unit}</p>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span className="text-sm font-bold text-gray-900">₹{item.price}</span>
                          {item.original_price && (
                            <span className="text-[11px] text-gray-400 line-through">₹{item.original_price}</span>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-1.5">
                        <button
                          onClick={() => removeItem(item.id)}
                          data-testid={`remove-${item.id}`}
                          className="text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <div className="flex items-center bg-green-600 rounded-lg">
                          <button
                            onClick={() => decrementQuantity(item.id)}
                            className="text-white p-1 hover:bg-green-700"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-white text-xs font-bold px-2">{item.quantity}</span>
                          <button
                            onClick={() => incrementQuantity(item.id)}
                            className="text-white p-1 hover:bg-green-700"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}

                  {/* AI Recommendation */}
                  {savings > 0 && (
                    <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 border border-yellow-200 rounded-xl p-3 flex items-start gap-2">
                      <Sparkles className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-xs font-bold text-gray-900">AAWAZ saved you ₹{savings}!</p>
                        <p className="text-[11px] text-gray-600 mt-0.5">Smart picks from today's deals</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Bill Summary */}
                <div className="bg-white border-t border-gray-100 px-4 py-3 space-y-2 flex-shrink-0">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-semibold text-gray-900">₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-600">Delivery</span>
                    <span className="font-semibold text-green-600">FREE</span>
                  </div>
                  {savings > 0 && (
                    <div className="flex justify-between text-xs">
                      <span className="text-green-600 font-medium">Total Savings</span>
                      <span className="font-semibold text-green-600">-₹{savings}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-base pt-2 border-t border-gray-100">
                    <span className="font-bold text-gray-900">Total</span>
                    <span className="font-bold text-gray-900">₹{subtotal}</span>
                  </div>

                  <button
                    onClick={handleCheckout}
                    data-testid="checkout-button"
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl transition-colors flex items-center justify-between px-4 mt-2"
                  >
                    <span>Proceed to Checkout</span>
                    <span>₹{subtotal} →</span>
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
