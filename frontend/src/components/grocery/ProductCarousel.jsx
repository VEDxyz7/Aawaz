import { ChevronRight } from 'lucide-react';
import ProductCard from './ProductCard';
import { useRef } from 'react';

export default function ProductCarousel({ title, subtitle, products, id }) {
  const scrollRef = useRef(null);

  if (!products || products.length === 0) return null;

  return (
    <section data-testid={`carousel-${id}`} className="space-y-3" id={`section-${id}`}>
      <div className="flex items-end justify-between px-1">
        <div>
          <h2 className="text-lg md:text-xl font-bold text-gray-900">{title}</h2>
          {subtitle && <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>}
        </div>
        <button className="text-xs font-semibold text-yellow-600 hover:text-yellow-700 flex items-center gap-0.5">
          See all <ChevronRight className="w-3 h-3" />
        </button>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-2 md:gap-3 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-2"
      >
        {products.map((product) => (
          <div
            key={product.id}
            className="flex-shrink-0 w-36 md:w-44 snap-start"
          >
            <ProductCard product={product} compact />
          </div>
        ))}
      </div>
    </section>
  );
}
