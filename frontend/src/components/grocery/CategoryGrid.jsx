export default function CategoryGrid({ categories, selectedCategory, onSelectCategory }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 gap-4">
      <button
        onClick={() => onSelectCategory(null)}
        data-testid="category-all"
        className={`p-4 rounded-2xl border-2 font-semibold transition-all hover:scale-105 ${
          !selectedCategory
            ? 'bg-yellow-400 border-yellow-500 text-black shadow-lg'
            : 'bg-white border-gray-200 text-gray-700 hover:border-yellow-300'
        }`}
      >
        <div className="text-3xl mb-2">🛒</div>
        <div className="text-sm">All</div>
      </button>

      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onSelectCategory(category.id)}
          data-testid={`category-${category.id}`}
          className={`p-4 rounded-2xl border-2 font-semibold transition-all hover:scale-105 ${
            selectedCategory === category.id
              ? 'bg-yellow-400 border-yellow-500 text-black shadow-lg'
              : 'bg-white border-gray-200 text-gray-700 hover:border-yellow-300'
          }`}
        >
          <div className="text-3xl mb-2">{category.icon}</div>
          <div className="text-sm">{category.name}</div>
        </button>
      ))}
    </div>
  );
}