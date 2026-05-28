import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, CreditCard, Wallet, Sparkles, Clock, CheckCircle2, Zap } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { toast } from 'sonner';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export default function CheckoutPage() {
  const navigate = useNavigate();
  const items = useCartStore((s) => s.items);
  const subtotal = useCartStore((s) => s.getSubtotal());
  const savings = useCartStore((s) => s.getSavings());
  const clearCart = useCartStore((s) => s.clearCart);

  const [selectedAddress, setSelectedAddress] = useState('home');
  const [selectedPayment, setSelectedPayment] = useState('upi');
  const [placing, setPlacing] = useState(false);

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
        <p className="text-gray-500 mb-4">Your cart is empty</p>
        <button
          onClick={() => navigate('/dashboard')}
          data-testid="back-to-shop"
          className="bg-yellow-400 text-black font-bold px-6 py-3 rounded-full"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  const placeOrder = async () => {
    setPlacing(true);
    try {
      const response = await axios.post(`${API}/order`, {
        items: items.map((i) => ({ id: i.id, name: i.name, quantity: i.quantity, price: i.price })),
        subtotal,
        delivery_address: selectedAddress,
      });
      clearCart();
      navigate('/order-success', { state: { orderId: response.data.order_id, total: subtotal } });
    } catch (error) {
      toast.error('Order failed. Please try again.');
      console.error(error);
    } finally {
      setPlacing(false);
    }
  };

  const deliveryFee = 0;
  const handlingFee = 5;
  const finalTotal = subtotal + deliveryFee + handlingFee;

  return (
    <div className="min-h-screen bg-gray-50 pb-32">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white border-b border-gray-100 px-4 py-3 flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          data-testid="back-button"
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <ArrowLeft className="w-5 h-5 text-gray-700" />
        </button>
        <div>
          <h1 className="text-base font-bold text-gray-900">Checkout</h1>
          <p className="text-xs text-gray-500">{items.length} items</p>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-4 space-y-3">
        {/* AI Helper Card */}
        <div className="bg-gradient-to-r from-yellow-400 to-yellow-300 rounded-2xl p-4 flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-5 h-5 text-yellow-400" />
          </div>
          <div className="flex-1">
            <p className="text-xs font-bold text-black mb-0.5">AAWAZ says:</p>
            <p className="text-sm font-semibold text-black">
              {savings > 0
                ? `Great picks! You saved ₹${savings} today. Delivery in 10 mins!`
                : 'Your order is ready. Free delivery in 10 mins!'}
            </p>
          </div>
        </div>

        {/* Delivery Address */}
        <div className="bg-white rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <MapPin className="w-4 h-4 text-gray-700" />
            <h2 className="text-sm font-bold text-gray-900">Delivery Address</h2>
          </div>
          <div className="space-y-2">
            {[
              { id: 'home', name: 'Home', address: '123 Main Street, Indiranagar, Bangalore - 560038' },
              { id: 'office', name: 'Office', address: 'Tech Park, Whitefield, Bangalore - 560066' },
            ].map((addr) => (
              <button
                key={addr.id}
                onClick={() => setSelectedAddress(addr.id)}
                data-testid={`address-${addr.id}`}
                className={`w-full text-left p-3 rounded-xl border-2 transition-all ${
                  selectedAddress === addr.id
                    ? 'border-yellow-400 bg-yellow-50'
                    : 'border-gray-100 hover:border-gray-200'
                }`}
              >
                <div className="flex items-start gap-2">
                  <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 mt-0.5 flex items-center justify-center ${
                    selectedAddress === addr.id ? 'border-yellow-500' : 'border-gray-300'
                  }`}>
                    {selectedAddress === addr.id && <div className="w-2 h-2 rounded-full bg-yellow-500" />}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">{addr.name}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{addr.address}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Delivery Time */}
        <div className="bg-white rounded-2xl p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
            <Clock className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <p className="text-sm font-bold text-gray-900">Delivery in 10 mins</p>
            <p className="text-[11px] text-gray-500">Lightning fast delivery</p>
          </div>
        </div>

        {/* Payment Method */}
        <div className="bg-white rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <CreditCard className="w-4 h-4 text-gray-700" />
            <h2 className="text-sm font-bold text-gray-900">Payment Method</h2>
          </div>
          <div className="space-y-2">
            {[
              { id: 'upi', name: 'UPI Payment', subtitle: 'PhonePe, GPay, Paytm', icon: Zap },
              { id: 'card', name: 'Credit/Debit Card', subtitle: 'Visa, Mastercard, Rupay', icon: CreditCard },
              { id: 'cod', name: 'Cash on Delivery', subtitle: 'Pay when you receive', icon: Wallet },
            ].map((method) => (
              <button
                key={method.id}
                onClick={() => setSelectedPayment(method.id)}
                data-testid={`payment-${method.id}`}
                className={`w-full p-3 rounded-xl border-2 transition-all flex items-center gap-3 ${
                  selectedPayment === method.id
                    ? 'border-yellow-400 bg-yellow-50'
                    : 'border-gray-100 hover:border-gray-200'
                }`}
              >
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  selectedPayment === method.id ? 'bg-yellow-400 text-black' : 'bg-gray-100 text-gray-600'
                }`}>
                  <method.icon className="w-4 h-4" />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-sm font-bold text-gray-900">{method.name}</p>
                  <p className="text-[11px] text-gray-500">{method.subtitle}</p>
                </div>
                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                  selectedPayment === method.id ? 'border-yellow-500' : 'border-gray-300'
                }`}>
                  {selectedPayment === method.id && <div className="w-2 h-2 rounded-full bg-yellow-500" />}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Bill Summary */}
        <div className="bg-white rounded-2xl p-4">
          <h2 className="text-sm font-bold text-gray-900 mb-3">Bill Details</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Item total</span>
              <span className="font-semibold text-gray-900">₹{subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Delivery fee</span>
              <span className="font-semibold text-green-600">FREE</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Handling charge</span>
              <span className="font-semibold text-gray-900">₹{handlingFee}</span>
            </div>
            {savings > 0 && (
              <div className="flex justify-between bg-green-50 -mx-2 px-2 py-1.5 rounded">
                <span className="text-green-700 font-medium flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  AI savings
                </span>
                <span className="font-bold text-green-700">-₹{savings}</span>
              </div>
            )}
            <div className="flex justify-between pt-3 border-t border-gray-100">
              <span className="font-bold text-gray-900">Grand Total</span>
              <span className="font-black text-gray-900 text-base">₹{finalTotal}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Place Order Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 z-30">
        <div className="max-w-2xl mx-auto">
          <motion.button
            onClick={placeOrder}
            disabled={placing}
            whileTap={{ scale: 0.98 }}
            data-testid="place-order-button"
            className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white font-bold py-4 rounded-2xl flex items-center justify-between px-5 transition-colors"
          >
            <div className="text-left">
              <p className="text-[11px] opacity-90 font-medium">₹{finalTotal}</p>
              <p className="text-base font-black">{placing ? 'Placing Order...' : 'Place Order'}</p>
            </div>
            {!placing && <CheckCircle2 className="w-6 h-6" />}
          </motion.button>
        </div>
      </div>
    </div>
  );
}
