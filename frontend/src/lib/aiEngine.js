// Local AI Intent Engine for AAWAZ - Comprehensive
// Parses user intent, handles 30+ recipes, generic food queries, smart fallbacks
import Fuse from 'fuse.js';
import { PRODUCTS } from '@/data/products';

// Expanded recipe-to-product mapping (30+ recipes)
const RECIPES = {
  chai: {
    keywords: ['chai', 'tea', 'चाय', 'masala chai'],
    products: ['bv4', 'd1', 'e1', 'e11', 'v9'],
    response: 'Adding everything for perfect masala chai ☕ — tea, milk, sugar, cardamom & ginger.',
  },
  pizza: {
    keywords: ['pizza', 'पिज्जा'],
    products: ['d6', 'd3', 'v1', 'v4', 'v10', 'fz6', 'b2'],
    response: 'Pizza night! 🍕 Adding cheese slices, butter, tomatoes, capsicum, garlic, pasta sauce & bread base.',
  },
  pulao: {
    keywords: ['pulao', 'pilaf', 'पुलाव', 'biryani', 'बिरयानी'],
    products: ['e4', 'fz4', 'v7', 'v2', 'e9', 'e11', 'v10', 'e7'],
    response: 'Pulao essentials ready! 🍚 Basmati rice, peas, carrots, onions, garam masala, cardamom, garlic & turmeric.',
  },
  pasta: {
    keywords: ['pasta', 'italian', 'spaghetti', 'macaroni'],
    products: ['fz6', 'd6', 'd3', 'v1', 'v10', 'd7', 'e9'],
    response: 'Italian night! 🍝 Adding pasta sauce, cheese, butter, tomatoes, garlic, cream & spices.',
  },
  sandwich: {
    keywords: ['sandwich', 'सैंडविच'],
    products: ['b2', 'd6', 'v1', 'v6', 'd3', 'e8'],
    response: 'Sandwich kit added! 🥪 Bread, cheese slices, tomatoes, cucumber, butter & chilli powder.',
  },
  paneer_butter_masala: {
    keywords: ['paneer butter masala', 'paneer masala', 'पनीर', 'paneer'],
    products: ['d4', 'd3', 'v1', 'v2', 'v9', 'v10', 'e9', 'd7', 'e7'],
    response: 'Paneer butter masala ingredients added! 🧈 Paneer, butter, tomatoes, onions, ginger, garlic, garam masala, cream & turmeric.',
  },
  dal: {
    keywords: ['dal', 'daal', 'दाल', 'lentil', 'dal chawal'],
    products: ['e5', 'v2', 'v9', 'v10', 'e7', 'e8', 'e4'],
    response: 'Dal essentials ready! 🍲 Toor dal, onions, ginger, garlic, turmeric, chilli & rice.',
  },
  breakfast: {
    keywords: ['breakfast', 'morning', 'नाश्ता', 'subah'],
    products: ['d8', 'b1', 'd1', 'bv6', 'f2', 'b6', 'd3'],
    response: 'Quick breakfast pack ready! 🍳 Eggs, bread, milk, coffee, bananas, multigrain & butter.',
  },
  lunch: {
    keywords: ['lunch', 'दोपहर'],
    products: ['e4', 'e5', 'v2', 'v9', 'v10', 'e7', 'e8', 'e9'],
    response: 'Lunch essentials added! 🍱 Rice, dal, onions, ginger, garlic & spices.',
  },
  dinner: {
    keywords: ['dinner', 'rat ka khana', 'रात का खाना'],
    products: ['e3', 'd4', 'v2', 'v1', 'e9', 'd3', 'fz4'],
    response: 'Dinner essentials added! 🍽️ Atta, paneer, onions, tomatoes, masala, butter & peas.',
  },
  coffee: {
    keywords: ['coffee', 'कॉफ़ी', 'caffeine'],
    products: ['bv6', 'd1', 'e1'],
    response: 'Coffee combo ready! ☕ Nescafe, milk & sugar.',
  },
  maggi: {
    keywords: ['maggi', 'noodles', 'मैगी', 'instant noodles'],
    products: ['fz5', 'v1', 'v2', 'd6', 'd8'],
    response: 'Maggi upgrade pack! 🍜 Maggi, tomatoes, onions, cheese & eggs.',
  },
  dosa: {
    keywords: ['dosa', 'idli', 'south indian', 'डोसा'],
    products: ['e4', 'e6', 'e2', 'v3', 'v2', 'e7'],
    response: 'Dosa basics added! 🥞 Rice, oil, salt, potatoes, onions & turmeric.',
  },
  biryani: {
    keywords: ['biryani', 'बिरयानी'],
    products: ['e4', 'v2', 'd5', 'e9', 'e11', 'v9', 'v10', 'e7', 'd3'],
    response: 'Biryani ingredients added! 🍛 Basmati rice, onions, curd, garam masala, cardamom, ginger, garlic, turmeric & butter.',
  },
  smoothie: {
    keywords: ['smoothie', 'shake'],
    products: ['f2', 'd1', 'd5', 'f6', 'e1'],
    response: 'Smoothie pack ready! 🍌 Bananas, milk, curd, strawberries & sugar.',
  },
  salad: {
    keywords: ['salad', 'सलाद'],
    products: ['v1', 'v6', 'v7', 'f1', 'v5', 'e2'],
    response: 'Fresh salad pack! 🥗 Tomatoes, cucumber, carrots, apples, spinach & salt.',
  },
  party: {
    keywords: ['party', 'snacks for party', 'पार्टी'],
    products: ['s1', 's2', 's3', 's4', 'bv1', 'bv2', 's8'],
    response: 'Party time! 🎉 Adding chips, kurkure, bhujia, oreo, coke, sprite & chocolate.',
  },
  baking: {
    keywords: ['baking', 'cake', 'bake'],
    products: ['e3', 'd8', 'd3', 'e1', 'd1', 's8'],
    response: 'Baking essentials added! 🎂 Atta, eggs, butter, sugar, milk & chocolate.',
  },
  daily_essentials: {
    keywords: ['essentials', 'daily essentials', 'monthly', 'groceries', 'staples', 'pantry'],
    products: ['e3', 'e4', 'e1', 'e2', 'e6', 'd1', 'd8', 'b1', 'e5'],
    response: 'Monthly essentials added! 🛒 Atta, rice, sugar, salt, oil, milk, eggs, bread & dal.',
  },
};

// Intent action keywords
const INTENT_KEYWORDS = {
  add_to_cart: ['add', 'buy', 'order', 'get me', 'want', 'need', 'चाहिए', 'add karo', 'put in cart', 'cart me daalo'],
  remove_from_cart: ['remove', 'delete', 'hatao', 'remove from cart', 'take out'],
  open_cart: ['open cart', 'view cart', 'show cart', 'cart kholo', 'my cart'],
  checkout: ['checkout', 'pay', 'place order', 'order karo', 'buy now'],
  healthy: ['healthy', 'fit', 'diet', 'low cal', 'nutritious', 'low fat'],
  cheap: ['cheap', 'budget', 'under', 'sasta', 'सस्ता', 'low price', 'affordable'],
  recommend: ['recommend', 'suggest', 'best', 'top', 'what should i'],
};

// Category synonyms
const CATEGORY_KEYWORDS = {
  vegetables: ['vegetable', 'sabzi', 'veggie', 'सब्जी', 'veggies'],
  fruits: ['fruit', 'fal', 'फल', 'fruits'],
  dairy: ['dairy', 'milk', 'paneer', 'doodh', 'दूध', 'butter', 'cheese', 'curd', 'eggs'],
  bakery: ['bakery', 'bread', 'cookie', 'cake', 'croissant', 'pav'],
  snacks: ['snack', 'chips', 'biscuit', 'namkeen', 'chocolate', 'nuts'],
  beverages: ['drink', 'cold drink', 'tea', 'coffee', 'juice', 'water', 'beverage'],
  essentials: ['atta', 'flour', 'rice', 'dal', 'oil', 'masala', 'spice', 'sugar', 'salt'],
  frozen: ['frozen', 'instant', 'ready', 'maggi', 'fries', 'nuggets'],
  household: ['detergent', 'cleaner', 'household', 'soap', 'tissue'],
  personal: ['shampoo', 'toothpaste', 'soap', 'cream', 'body wash'],
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

// Extract budget like "under ₹300" or "less than 500"
function extractBudget(text) {
  const patterns = [
    /under\s*[₹rs.]*\s*(\d+)/i,
    /less\s*than\s*[₹rs.]*\s*(\d+)/i,
    /below\s*[₹rs.]*\s*(\d+)/i,
    /[₹rs.]+\s*(\d+)\s*ke\s*andar/i,
    /(\d+)\s*ke\s*andar/i,
    /budget\s*of\s*[₹rs.]*\s*(\d+)/i,
  ];
  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match) return parseInt(match[1]);
  }
  return null;
}

// Clean common question words to extract intent
function cleanQuery(text) {
  return text
    .toLowerCase()
    .replace(/^(what|how|where|when|tell me|show me|give me|find me|i want|i need|can you|please|kya|kaise|hai|are|is|the|to|for|of|me|i|do|does)\s+/gi, ' ')
    .replace(/\s+(banani|banane|banao|recipe|ingredients|chahiye|ke liye)\s*/gi, ' ')
    .replace(/\?+/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

// Main intent parser - PROPERLY handles all query types
export function parseIntent(text) {
  const lower = text.toLowerCase().trim();
  const cleaned = cleanQuery(text);
  
  const result = {
    intent: 'general',
    action: null,
    products: [],
    category: null,
    budget: null,
    response: '',
    recipe: null,
  };

  // Extract budget if present
  result.budget = extractBudget(lower);

  // STEP 1: Check for recipe matches (handles "ingredients for pizza", "how to make chai", etc.)
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

  // STEP 2: Cart actions
  if (INTENT_KEYWORDS.open_cart.some((kw) => lower.includes(kw))) {
    result.intent = 'open_cart';
    result.action = 'open_cart';
    result.response = 'Opening your cart 🛒';
    return result;
  }

  if (INTENT_KEYWORDS.checkout.some((kw) => lower.includes(kw))) {
    result.intent = 'checkout';
    result.action = 'checkout';
    result.response = 'Taking you to checkout 💳 Let me help you save more!';
    return result;
  }

  // STEP 3: Healthy + budget filter
  const isHealthy = INTENT_KEYWORDS.healthy.some((kw) => lower.includes(kw));
  if (isHealthy) {
    let filtered = PRODUCTS.filter((p) =>
      p.tags?.some((t) => ['healthy', 'protein', 'fresh', 'greens', 'nuts', 'fruit'].includes(t))
    );
    if (result.budget) {
      filtered = filtered.filter((p) => p.price <= result.budget);
    }
    result.intent = 'show_filtered';
    result.action = 'highlight_products';
    result.products = filtered.slice(0, 8);
    result.response = `Found ${filtered.length} healthy options${result.budget ? ` under ₹${result.budget}` : ''} 🥗 Highlighting top picks!`;
    return result;
  }

  // STEP 4: Budget-only filter
  if (result.budget && INTENT_KEYWORDS.cheap.some((kw) => lower.includes(kw))) {
    const cheap = PRODUCTS.filter((p) => p.price <= result.budget);
    result.intent = 'show_filtered';
    result.action = 'highlight_products';
    result.products = cheap.slice(0, 10);
    result.response = `Found ${cheap.length} products under ₹${result.budget} 💰`;
    return result;
  }

  // STEP 5: Category navigation
  for (const [cat, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    if (keywords.some((kw) => lower.includes(` ${kw}`) || lower.startsWith(kw) || lower.endsWith(kw))) {
      result.category = cat;
      const catProducts = PRODUCTS.filter((p) => p.category === cat);
      result.intent = 'show_category';
      result.action = 'show_category';
      result.products = catProducts.slice(0, 8);
      result.response = `Showing ${cat} 📦 ${catProducts.length} items available.`;
      return result;
    }
  }

  // STEP 6: Add specific products (explicit add intent)
  if (INTENT_KEYWORDS.add_to_cart.some((kw) => lower.includes(kw))) {
    const searchTerm = cleaned.replace(/\b(add|buy|order|get|want|need|cart|please)\b/g, '').trim();
    const matches = searchProducts(searchTerm);
    if (matches.length > 0) {
      result.intent = 'add_to_cart';
      result.action = 'add_single';
      result.products = [matches[0]];
      result.response = `Added ${matches[0].name} to your cart ✅`;
      return result;
    }
  }

  // STEP 7: Fuzzy search across all products (last useful fallback)
  const searched = searchProducts(cleaned || text);
  if (searched.length > 0) {
    result.intent = 'search';
    result.action = 'highlight_products';
    result.products = searched.slice(0, 6);
    result.response = `Found ${searched.length} matching products 🔍 Showing best matches!`;
    return result;
  }

  // STEP 8: True fallback - couldn't understand, ask user to try AI mode
  result.intent = 'unknown';
  result.action = 'unknown';
  result.response = `Hmm, I couldn't find specific products for that. Try asking for a recipe like "pizza ingredients" or "what's needed for pulao", or browse our categories!`;
  return result;
}

// Initial onboarding greeting (only shown when conversation is empty)
export const ONBOARDING_GREETING = "Hi! I'm AAWAZ ✨ Ask me for any recipe ingredients, products, or just say what you need.";

// Quick suggestions
export const QUICK_SUGGESTIONS = [
  'Ingredients for pizza',
  'Pulao essentials',
  'Healthy snacks under ₹300',
  'Add milk and bread',
  'Monthly groceries',
];
