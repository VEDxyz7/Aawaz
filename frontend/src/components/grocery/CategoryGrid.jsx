import { motion } from 'framer-motion';
import { useAIStore } from '@/store/cartStore';
import * as Icons from 'lucide-react';

export default function CategoryGrid({ categories, selectedCategory, onSelectCategory }) {
  const highlightedCategoryId = useAIStore((s) => s.highlightedCategoryId);

  return (
    <div data-testid="category-section" className="bg-white rounded-2xl p-3 md:p-4 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-base md:text-lg font-bold text-gray-900">Shop by Category</h2>
        <span className="text-xs text-gray-500">{categories.length} categories</span>
      </div>
      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-12 gap-2 md:gap-3">
        {categories.map((category) => {
          const IconComponent = Icons[category.icon] || Icons.ShoppingBag;
          const isActive = selectedCategory === category.id || (category.id === 'all' && !selectedCategory);
          const isHighlighted = highlightedCategoryId === category.id;

          return (
            <motion.button
              key={category.id}
              onClick={() => onSelectCategory(category.id === 'all' ? null : category.id)}
              data-testid={`category-${category.id}`}
              whileTap={{ scale: 0.95 }}
              className={`flex flex-col items-center justify-center gap-1.5 p-2 md:p-3 rounded-xl border-2 transition-all ${
                isActive
                  ? 'bg-yellow-50 border-yellow-400 shadow-sm'
                  : 'bg-gray-50 border-transparent hover:border-yellow-200 hover:bg-yellow-50/50'
              } ${isHighlighted ? 'ring-pulse' : ''}`}
            >
              <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center ${
                isActive ? 'bg-yellow-400 text-black' : 'bg-white text-gray-700'
              } shadow-sm`}>
                <IconComponent className="w-5 h-5 md:w-6 md:h-6" />
              </div>
              <span className={`text-xs font-semibold text-center line-clamp-2 leading-tight ${
                isActive ? 'text-gray-900' : 'text-gray-700'
              }`}>
                {category.name}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
