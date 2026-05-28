import { useNavigate } from 'react-router-dom';
import { Mic, Zap, Globe, Users, ShoppingBag, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-screen flex items-center">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 via-white to-orange-50"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 py-20 grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl lg:text-7xl font-black tracking-tight text-gray-900 mb-4">
              AAWAZ
            </h1>
            <p className="text-2xl text-yellow-600 font-bold mb-3">Talk. Tap. Done.</p>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              The world's first conversational AI layer for mobile commerce.
              Shop groceries naturally by speaking in any language.
            </p>
            <button
              onClick={() => navigate('/dashboard')}
              data-testid="hero-cta-button"
              className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-8 py-4 rounded-full inline-flex items-center gap-2 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
            >
              Try AAWAZ Now
              <ChevronRight className="w-5 h-5" />
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <img
              src="https://static.prod-images.emergentagent.com/jobs/90647187-b808-4581-9bf7-b93a4ff7068b/images/efb519a79d69430ccc6e46f5664c6e832459fccf7cdc26fd22fbfb33c3530347.png"
              alt="AAWAZ Voice AI"
              className="rounded-3xl shadow-2xl"
            />
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">Why AAWAZ Changes Everything</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Mic className="w-8 h-8" />,
                title: 'Voice-First Shopping',
                description: 'Just speak naturally. AAWAZ understands your intent and navigates the app for you.'
              },
              {
                icon: <Zap className="w-8 h-8" />,
                title: 'Smart Recommendations',
                description: 'AI suggests products, finds deals, and helps you save money on every order.'
              },
              {
                icon: <Globe className="w-8 h-8" />,
                title: 'Multilingual Support',
                description: 'Speak in Hindi, English, Gujarati, Tamil, or mix them – AAWAZ understands all.'
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: 'Accessible to All',
                description: 'Designed for everyone – elderly users, first-time smartphone users, and Bharat.'
              },
              {
                icon: <ShoppingBag className="w-8 h-8" />,
                title: 'Contextual Guidance',
                description: 'AI highlights buttons, auto-scrolls, and overlays arrows to guide every action.'
              },
              {
                icon: <Zap className="w-8 h-8" />,
                title: 'Lightning Fast',
                description: 'Blinkit-fast delivery + AI-powered shopping = instant commerce redefined.'
              }
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="p-6 border-2 border-gray-100 rounded-2xl hover:border-yellow-400 hover:shadow-lg transition-all"
              >
                <div className="w-14 h-14 bg-yellow-100 rounded-2xl flex items-center justify-center mb-4 text-yellow-600">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-yellow-400 to-orange-400">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-6">
            Experience the Future of Shopping
          </h2>
          <p className="text-xl text-gray-800 mb-8">
            Join thousands already shopping smarter with AAWAZ
          </p>
          <button
            onClick={() => navigate('/dashboard')}
            data-testid="cta-get-started-button"
            className="bg-black text-yellow-400 hover:bg-gray-900 font-bold px-10 py-5 rounded-full inline-flex items-center gap-2 shadow-2xl hover:shadow-3xl transition-all hover:scale-105"
          >
            Get Started Now
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold text-yellow-400 mb-2">AAWAZ</h3>
          <p className="text-sm">© 2026 AAWAZ. Powered by Generative AI.</p>
        </div>
      </footer>
    </div>
  );
}