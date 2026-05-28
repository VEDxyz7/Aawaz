import { useNavigate } from 'react-router-dom';
import { Mic, Zap, Globe, Users, ShoppingBag, ChevronRight, Sparkles, Languages, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

export default function LandingPage() {
  const navigate = useNavigate();

  const features = [
    { icon: Mic, title: 'Voice-First Shopping', desc: 'Speak naturally. AAWAZ understands intent and acts.', color: 'bg-red-50 text-red-600' },
    { icon: Sparkles, title: 'AI Recipe Builder', desc: '"Mujhe chai banani hai" → instantly adds all ingredients.', color: 'bg-purple-50 text-purple-600' },
    { icon: Languages, title: 'Multilingual', desc: 'English, Hindi, Hinglish, Gujarati, Tamil — all natural.', color: 'bg-blue-50 text-blue-600' },
    { icon: Heart, title: 'Accessible to All', desc: 'Perfect for elderly, first-time users, and Bharat.', color: 'bg-pink-50 text-pink-600' },
    { icon: ShoppingBag, title: 'Smart Recommendations', desc: 'Budget-aware, health-aware, deal-aware suggestions.', color: 'bg-green-50 text-green-600' },
    { icon: Zap, title: 'Lightning Fast', desc: '10-min delivery + zero-tap shopping = pure speed.', color: 'bg-yellow-50 text-yellow-600' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-yellow-400 flex items-center justify-center">
              <Zap className="w-5 h-5 text-black" fill="currentColor" />
            </div>
            <span className="text-xl font-black text-gray-900">AAWAZ</span>
          </div>
          <button
            onClick={() => navigate('/dashboard')}
            data-testid="nav-launch-button"
            className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-5 py-2 rounded-full text-sm transition-colors"
          >
            Launch App
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 via-white to-orange-50"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-16 md:py-24 grid md:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-1.5 bg-black text-yellow-400 px-3 py-1.5 rounded-full text-xs font-bold mb-6">
              <Sparkles className="w-3 h-3" />
              Powered by Generative AI
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight text-gray-900 mb-3 leading-[0.95]">
              Talk. Tap.<br />
              <span className="text-yellow-500">Done.</span>
            </h1>
            <p className="text-base md:text-lg text-gray-600 mb-8 leading-relaxed max-w-md">
              The world's first conversational AI layer for mobile commerce. Just speak — AAWAZ shops for you.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => navigate('/dashboard')}
                data-testid="hero-cta-button"
                className="bg-black hover:bg-gray-900 text-yellow-400 font-bold px-7 py-3.5 rounded-full inline-flex items-center gap-2 shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
              >
                Try AAWAZ Now
                <ChevronRight className="w-4 h-4" />
              </button>
              <div className="flex items-center gap-3 text-xs text-gray-500">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="w-7 h-7 rounded-full bg-gradient-to-br from-yellow-300 to-orange-400 border-2 border-white"></div>
                  ))}
                </div>
                <span className="font-semibold">10K+ shoppers love it</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <div className="relative bg-black rounded-3xl p-2 shadow-2xl max-w-sm mx-auto">
              <img
                src="https://static.prod-images.emergentagent.com/jobs/90647187-b808-4581-9bf7-b93a4ff7068b/images/efb519a79d69430ccc6e46f5664c6e832459fccf7cdc26fd22fbfb33c3530347.png"
                alt="AAWAZ"
                className="rounded-2xl w-full"
              />
            </div>
            <div className="absolute -top-4 -left-4 bg-white rounded-2xl shadow-xl p-3 border border-gray-100">
              <p className="text-[10px] uppercase tracking-wider font-bold text-yellow-600 mb-1">You said</p>
              <p className="text-xs font-semibold text-gray-900">"Mujhe chai banani hai"</p>
            </div>
            <div className="absolute -bottom-4 -right-4 bg-yellow-400 rounded-2xl shadow-xl p-3 max-w-[200px]">
              <p className="text-[10px] uppercase tracking-wider font-bold text-yellow-900 mb-1">✨ AAWAZ added</p>
              <p className="text-xs font-bold text-black leading-snug">Tea, milk, sugar, cardamom, ginger — saved you ₹35!</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-black text-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: '3x', label: 'Faster Checkout' },
            { value: '40%', label: 'Higher Conversion' },
            { value: '5+', label: 'Languages' },
            { value: '10 min', label: 'Avg Delivery' },
          ].map((stat, idx) => (
            <div key={idx} className="text-center">
              <div className="text-3xl md:text-5xl font-black text-yellow-400 mb-1">{stat.value}</div>
              <div className="text-xs md:text-sm text-gray-400 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-widest font-bold text-yellow-600 mb-2">Why AAWAZ</p>
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 leading-tight">
              Not just a chatbot.<br />A shopping co-pilot.
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {features.map((f, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                className="p-6 border border-gray-100 rounded-2xl hover:border-yellow-300 hover:shadow-md transition-all"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${f.color}`}>
                  <f.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">{f.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-yellow-400 py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-black text-black mb-4 leading-tight">
            Ready to talk your way to checkout?
          </h2>
          <p className="text-base text-black/80 mb-8 font-medium">Join thousands shopping smarter with AAWAZ</p>
          <button
            onClick={() => navigate('/dashboard')}
            data-testid="cta-get-started-button"
            className="bg-black text-yellow-400 hover:bg-gray-900 font-bold px-8 py-4 rounded-full inline-flex items-center gap-2 shadow-2xl transition-all hover:scale-105"
          >
            Get Started Free
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-yellow-400 flex items-center justify-center">
              <Zap className="w-4 h-4 text-black" fill="currentColor" />
            </div>
            <span className="text-lg font-black text-white">AAWAZ</span>
          </div>
          <p className="text-xs">© 2026 AAWAZ. Powered by Generative AI.</p>
        </div>
      </footer>
    </div>
  );
}
