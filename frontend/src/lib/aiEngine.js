// Local AI Intent Engine for AAWAZ
// Parses user intent and executes actions deterministically
import Fuse from 'fuse.js';
import { PRODUCTS } from '@/data/products';

// Recipe to product mapping
const RECIPES = {
  chai: {
    keywords: ['chai', 'tea', 'चाय'],
    products: ['bv4', 'd1', 'e1', 'e11', 'v9'],
    response: 'Adding everything for perfect masala chai - tea, milk, sugar, cardamom, and ginger. Total saves ₹35!',
  },
  paneer_butter_masala: {
    keywords: ['paneer butter masala', 'paneer masala', 'पनीर'],
    products: ['d4', 'd3', 'v1', 'v2', 'v9', 'v10', 'e9', 'd7'],
    response: 'Adding ingredients for paneer butter masala: paneer, butter, tomatoes, onions, ginger, garlic, garam masala, and cream.',
  },
  dal: {
    keywords: ['dal', 'daal', 'दाल', 'lentil'],
    products: ['e5', 'v2', 'v9', 'v10', 'e7', 'e8'],
    response: 'Got your dal essentials - toor dal, onions, ginger, garlic, turmeric, and chilli powder.',
  },
  breakfast: {
    keywords: ['breakfast', 'morning', 'नाश्ता'],
    products: ['d8', 'b1', 'd1', 'bv6', 'f2'],
    response: 'Quick breakfast pack ready - eggs, bread, milk, coffee, and bananas. Healthy start!',
  },
  sandwich: {
    keywords: ['sandwich', 'सैंडविच'],
    products: ['b2', 'd6', 'v1', 'v6', 'd3'],
    response: 'Sandwich kit added - bread, cheese slices, tomatoes, cucumber, and butter.',
  },
  pasta: {
    keywords: ['pasta', 'italian'],
    products: ['fz6', 'd6', 'v1', 'v10', 'd7'],
    response: 'Italian night! Adding pasta sauce, cheese, tomatoes, garlic, and cream.',
  },
};

// Intent patterns
const INTENTS = {
  add_to_cart: ['add', 'buy', 'order', 'get', 'want', 'need', 'चाहिए', 'add karo'],
  remove_from_cart: ['remove', 'delete', 'hatao', 'remove from cart'],
  show_category: ['show', 'find', 'browse', 'dikhao', 'दिखाओ'],
  open_cart: ['open cart', 'view cart', 'show cart', 'cart kholo'],
  checkout: ['checkout', 'pay', 'place order', 'order karo'],
  healthy: ['healthy', 'fit', 'diet', 'low cal', 'nutritious'],
  cheap: ['cheap', 'budget', 'under', 'sasta', 'सस्ता'],
  recommend: ['recommend', 'suggest', 'best', 'top'],
};

// Category keyword mapping
const CATEGORY_KEYWORDS = {
  vegetables: ['vegetable', 'sabzi', 'veggie', 'सब्जी'],
  fruits: ['fruit', 'fal', 'फल'],
  dairy: ['dairy', 'milk', 'paneer', 'doodh', 'दूध'],
  bakery: ['bread', 'bakery', 'roti', 'cookie'],
  snacks: ['snack', 'chips', 'biscuit', 'namkeen'],
  beverages: ['drink', 'cold drink', 'tea', 'coffee', 'चाय'],
  essentials: ['atta', 'rice', 'dal', 'oil', 'masala', 'spice'],
  frozen: ['frozen', 'instant', 'ready'],
  household: ['detergent', 'cleaner', 'household'],
  personal: ['shampoo', 'toothpaste', 'soap'],
  baby: ['baby', 'diaper', 'cerelac'],
};

// Fuzzy search across all products
const fuse = new Fuse(PRODUCTS, {
  keys: ['name', 'tags', 'category'],
  threshold: 0.4,
  includeScore: true,
});

export function searchProducts(query) {
  if (!query || query.length < 2) return [];
  return fuse.search(query).map((r) => r.item);
}

// Parse budget from query like "under ₹300" or "less than 500"
function extractBudget(text) {
  const patterns = [
    /under\s*[₹rs.]*\s*(\d+)/i,
    /less\s*than\s*[₹rs.]*\s*(\d+)/i,
    /below\s*[₹rs.]*\s*(\d+)/i,
    /[₹rs.]+\s*(\d+)\s*ke\s*andar/i,
    /(\d+)\s*ke\s*andar/i,
  ];
  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match) return parseInt(match[1]);
  }
  return null;
}

// Main intent parser
export function parseIntent(text) {
  const lower = text.toLowerCase().trim();
  const result = {
    intent: 'general',
    action: null,
    products: [],
    category: null,
    budget: null,
    response: '',
    recipe: null,
  };

  // Check budget
  result.budget = extractBudget(lower);

  // Check for recipe matches first
  for (const [recipeKey, recipe] of Object.entries(RECIPES)) {
    if (recipe.keywords.some((kw) => lower.includes(kw.toLowerCase()))) {
      const products = recipe.products
        .map((id) => PRODUCTS.find((p) => p.id === id))
        .filter(Boolean);
      result.intent = 'add_recipe';
      result.action = 'add_multiple';
      result.products = products;
      result.recipe = recipeKey;
      result.response = recipe.response;
      return result;
    }
  }

  // Check cart actions
  if (INTENTS.open_cart.some((kw) => lower.includes(kw))) {
    result.intent = 'open_cart';
    result.action = 'open_cart';
    result.response = 'Opening your cart for you.';
    return result;
  }

  if (INTENTS.checkout.some((kw) => lower.includes(kw))) {
    result.intent = 'checkout';
    result.action = 'checkout';
    result.response = 'Taking you to checkout. Let me help you save more!';
    return result;
  }

  // Check category navigation
  for (const [cat, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    if (keywords.some((kw) => lower.includes(kw))) {
      result.category = cat;
      result.intent = 'show_category';
      result.action = 'show_category';
    }
  }

  // Check for healthy/budget filters
  const isHealthy = INTENTS.healthy.some((kw) => lower.includes(kw));
  const isCheap = INTENTS.cheap.some((kw) => lower.includes(kw)) || result.budget;

  if (isHealthy) {
    const healthyProducts = PRODUCTS.filter((p) =>
      p.tags?.some((t) => ['healthy', 'protein', 'fresh', 'greens'].includes(t))
    );
    let filtered = healthyProducts;
    if (result.budget) {
      filtered = filtered.filter((p) => p.price <= result.budget);
    }
    result.intent = 'show_filtered';
    result.action = 'highlight_products';
    result.products = filtered.slice(0, 8);
    result.response = `Found ${filtered.length} healthy options${result.budget ? ` under ₹${result.budget}` : ''}. Highlighting top picks!`;
    return result;
  }

  if (isCheap && result.budget) {
    const cheapProducts = PRODUCTS.filter((p) => p.price <= result.budget);
    result.intent = 'show_filtered';
    result.action = 'highlight_products';
    result.products = cheapProducts.slice(0, 10);
    result.response = `Found ${cheapProducts.length} products under ₹${result.budget}. Great picks!`;
    return result;
  }

  // Add to cart intent - search products
  if (INTENTS.add_to_cart.some((kw) => lower.includes(kw))) {
    const searchTerm = lower.replace(/add|buy|order|get|want|need|to cart|please|कुछ|चाहिए/g, '').trim();
    const matches = searchProducts(searchTerm);
    if (matches.length > 0) {
      result.intent = 'add_to_cart';
      result.action = 'add_single';
      result.products = [matches[0]];
      result.response = `Added ${matches[0].name} to your cart!`;
      return result;
    }
  }

  // Category found - show products
  if (result.category) {
    const catProducts = PRODUCTS.filter((p) => p.category === result.category);
    result.products = catProducts.slice(0, 8);
    result.response = `Showing ${result.category}. ${catProducts.length} items available.`;
    return result;
  }

  // Fuzzy search fallback
  const searched = searchProducts(text);
  if (searched.length > 0) {
    result.intent = 'search';
    result.action = 'highlight_products';
    result.products = searched.slice(0, 5);
    result.response = `Found ${searched.length} matching products. Highlighting them!`;
    return result;
  }

  // Default response
  result.intent = 'chat';
  result.response = "I can help you shop! Try: 'Mujhe chai banani hai', 'Show me healthy snacks under ₹300', or 'Add milk and bread'.";
  return result;
}

// Quick suggestions
export const QUICK_SUGGESTIONS = [
  'Mujhe chai banani hai',
  'Healthy snacks under ₹300',
  'Add milk and bread',
  'Breakfast essentials',
  'What\'s on discount?',
];
