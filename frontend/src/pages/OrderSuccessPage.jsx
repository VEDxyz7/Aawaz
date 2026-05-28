import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, Clock, Sparkles, ChevronRight } from 'lucide-react';
import { useEffect } from 'react';

export default function OrderSuccessPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { orderId = 'ORD-12345', total = 0 } = location.state || {};

  useEffect(() => {
    // Optional celebration sound
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-green-50 flex flex-col items-center justify-center px-4 py-8">
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', damping: 12, stiffness: 200 }}
        className="w-24 h-24 rounded-full bg-green-500 flex items-center justify-center mb-6 shadow-xl"
        data-testid="order-success-icon"
      >
        <CheckCircle2 className="w-14 h-14 text-white" strokeWidth={2.5} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-center max-w-md"
      >
        <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-2" data-testid="order-success-title">
          Order Placed! 🎉
        </h1>
        <p className="text-sm text-gray-600 mb-6">Your groceries are on the way</p>

        <div className="bg-white rounded-2xl shadow-md p-5 mb-4 text-left">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-gray-500">Order ID</span>
            <span className="text-sm font-bold text-gray-900" data-testid="order-id">{orderId}</span>
          </div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-gray-500">Amount Paid</span>
            <span className="text-sm font-bold text-gray-900">₹{total}</span>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-xl p-3 flex items-center gap-3">
            <Clock className="w-5 h-5 text-green-600 flex-shrink-0" />
            <div>
              <p className="text-sm font-bold text-green-900">Arriving in 10 minutes</p>
              <p className="text-[11px] text-green-700">Track your order in the app</p>
            </div>
          </div>
        </div>

        <div className="bg-yellow-100 border border-yellow-300 rounded-2xl p-4 mb-6 flex items-start gap-3 text-left">
          <Sparkles className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-bold text-yellow-900 mb-0.5">AAWAZ Tip</p>
            <p className="text-xs text-yellow-800">
              Next time, just say "reorder my usual" and I'll set everything up in seconds.
            </p>
          </div>
        </div>

        <button
          onClick={() => navigate('/dashboard')}
          data-testid="continue-shopping-button"
          className="bg-black text-yellow-400 hover:bg-gray-900 font-bold px-8 py-3.5 rounded-full inline-flex items-center gap-2 shadow-lg transition-all"
        >
          Continue Shopping
          <ChevronRight className="w-4 h-4" />
        </button>
      </motion.div>
    </div>
  );
}
