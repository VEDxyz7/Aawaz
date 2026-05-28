// AAWAZ Multilingual AI Engine
// Supports: English, Hindi (Devanagari + Romanized), Gujarati (Romanized), Hinglish
// Completely local, no translation APIs
import Fuse from 'fuse.js';
import { PRODUCTS } from '@/data/products';

// ============================================================
// LANGUAGE DETECTION - based on common markers
// ============================================================
const LANG_MARKERS = {
  gu: [
    // Gujarati romanized markers
    'joie', 'mate', 'shu', ' su ', 'che', 'kari', 'banava', 'banavanu',
    'taiyaar', 'taiyar', 'kareli', 'hovi', 'joiye',
  ],
  hi: [
    // Hindi/Hinglish markers
    'karo', 'kariye', 'batao', 'bataao', 'banao', 'banani', 'banane',
    'banaani', 'chahiye', 'chaahiye', 'mujhe', 'mera', 'meri', 'mere liye',
    'ke liye', 'dikhao', 'dikhaao', 'daalo', 'dalo', 'lagao', 'kar do',
    ' hai ', ' hain ', ' ka ', ' ki ', ' ke ', ' ko ', 'kya', 'kaise',
  ],
};

const DEVANAGARI = /[\u0900-\u097F]/;
const GUJARATI_SCRIPT = /[\u0A80-\u0AFF]/;

function detectLanguage(text) {
  const lower = ` ${text.toLowerCase()} `;
  if (GUJARATI_SCRIPT.test(text)) return 'gu';
  if (DEVANAGARI.test(text)) return 'hi';
  if (LANG_MARKERS.gu.some((m) => lower.includes(m))) return 'gu';
  if (LANG_MARKERS.hi.some((m) => lower.includes(m))) return 'hi';
  return 'en';
}

// ============================================================
// RECIPES with multilingual keywords + responses
// ============================================================
const RECIPES = {
  chai: {
    keywords: ['chai', 'cha', 'tea', 'चाय', 'masala chai', 'masala tea'],
    products: ['bv4', 'd1', 'e1', 'e11', 'v9'],
    responses: {
      en: 'Adding chai essentials ☕ — tea, milk, sugar, cardamom & ginger.',
      hi: 'Chai ke saamaan add kar diye ☕ — chai, doodh, cheeni, elaichi aur adrak.',
      gu: 'Cha mate badhu mali gayu ☕ — cha, dudh, sakkar, elaichi ane adrak.',
    },
  },
  pizza: {
    keywords: ['pizza', 'पिज्जा'],
    products: ['d6', 'd3', 'v1', 'v4', 'v10', 'fz6', 'b2'],
    responses: {
      en: 'Pizza night! 🍕 Adding cheese, butter, tomatoes, capsicum, garlic, sauce & bread base.',
      hi: 'Pizza ki saari saamagri add kar di 🍕 — cheese, makhan, tamatar, shimla mirch, lehsun, sauce aur bread.',
      gu: 'Pizza mate ingredients mali gaya 🍕 — cheese, butter, tamata, capsicum, lasan, sauce ane bread.',
    },
  },
  pulao: {
    keywords: ['pulao', 'pulav', 'pilaf', 'biryani', 'बिरयानी', 'पुलाव', 'biriyani'],
    products: ['e4', 'fz4', 'v7', 'v2', 'e9', 'e11', 'v10', 'e7'],
    responses: {
      en: 'Pulao essentials ready! 🍚 Rice, peas, carrots, onions, garam masala, cardamom, garlic & turmeric.',
      hi: 'Pulao ka saamaan taiyaar 🍚 — chawal, matar, gajar, pyaaz, garam masala, elaichi, lehsun aur haldi.',
      gu: 'Pulao mate badhu taiyaar 🍚 — chaval, vatana, gajar, dungri, garam masala, elaichi, lasan ane haldar.',
    },
  },
  pasta: {
    keywords: ['pasta', 'italian', 'spaghetti', 'macaroni'],
    products: ['fz6', 'd6', 'd3', 'v1', 'v10', 'd7', 'e9'],
    responses: {
      en: 'Italian night! 🍝 Adding pasta sauce, cheese, butter, tomatoes, garlic, cream & spices.',
      hi: 'Pasta ka saamaan mil gaya 🍝 — sauce, cheese, makhan, tamatar, lehsun aur cream.',
      gu: 'Pasta mate badhu mali gayu 🍝 — sauce, cheese, butter, tamata, lasan ane cream.',
    },
  },
  sandwich: {
    keywords: ['sandwich', 'सैंडविच'],
    products: ['b2', 'd6', 'v1', 'v6', 'd3', 'e8'],
    responses: {
      en: 'Sandwich kit added 🥪 — bread, cheese, tomatoes, cucumber, butter & chilli.',
      hi: 'Sandwich ke liye saamaan 🥪 — bread, cheese, tamatar, kheera, makhan aur mirch.',
      gu: 'Sandwich mate badhu 🥪 — bread, cheese, tamata, kakdi, butter ane marcha.',
    },
  },
  paneer: {
    keywords: ['paneer butter masala', 'paneer masala', 'paneer', 'पनीर', 'paneer ki sabzi'],
    products: ['d4', 'd3', 'v1', 'v2', 'v9', 'v10', 'e9', 'd7', 'e7'],
    responses: {
      en: 'Paneer butter masala ingredients added 🧈',
      hi: 'Paneer butter masala ki saamagri mil gayi 🧈',
      gu: 'Paneer butter masala mate badhu mali gayu 🧈',
    },
  },
  dal: {
    keywords: ['dal', 'daal', 'दाल', 'lentil', 'dal chawal'],
    products: ['e5', 'v2', 'v9', 'v10', 'e7', 'e8', 'e4'],
    responses: {
      en: 'Dal essentials 🍲 — toor dal, onions, ginger, garlic, turmeric, chilli & rice.',
      hi: 'Dal ka saamaan 🍲 — toor dal, pyaaz, adrak, lehsun, haldi, mirch aur chawal.',
      gu: 'Dal mate 🍲 — toor dal, dungri, adrak, lasan, haldar, marcha ane chaval.',
    },
  },
  breakfast: {
    keywords: ['breakfast', 'naashta', 'nashta', 'morning food', 'नाश्ता', 'subah ka', 'morning'],
    products: ['d8', 'b1', 'd1', 'bv6', 'f2', 'b6', 'd3'],
    responses: {
      en: 'Quick breakfast pack 🍳 — eggs, bread, milk, coffee, bananas & butter.',
      hi: 'Naashta taiyaar 🍳 — ande, bread, doodh, coffee, kele aur makhan.',
      gu: 'Nashto taiyaar 🍳 — inda, bread, dudh, coffee, kela ane butter.',
    },
  },
  lunch: {
    keywords: ['lunch', 'dopahar ka', 'दोपहर', 'lunch ka'],
    products: ['e4', 'e5', 'v2', 'v9', 'v10', 'e7', 'e8', 'e9'],
    responses: {
      en: 'Lunch essentials added 🍱',
      hi: 'Lunch ka saamaan add ho gaya 🍱',
      gu: 'Lunch mate badhu mali gayu 🍱',
    },
  },
  dinner: {
    keywords: ['dinner', 'raat ka khana', 'रात का खाना', 'night meal'],
    products: ['e3', 'd4', 'v2', 'v1', 'e9', 'd3', 'fz4'],
    responses: {
      en: 'Dinner essentials added 🍽️',
      hi: 'Dinner ka saamaan add ho gaya 🍽️',
      gu: 'Dinner mate badhu mali gayu 🍽️',
    },
  },
  coffee: {
    keywords: ['coffee', 'कॉफी', 'kaufi'],
    products: ['bv6', 'd1', 'e1'],
    responses: {
      en: 'Coffee combo ☕ — Nescafe, milk & sugar.',
      hi: 'Coffee combo ☕ — Nescafe, doodh aur cheeni.',
      gu: 'Coffee combo ☕ — Nescafe, dudh ane sakkar.',
    },
  },
  maggi: {
    keywords: ['maggi', 'noodles', 'मैगी', 'instant noodle'],
    products: ['fz5', 'v1', 'v2', 'd6', 'd8'],
    responses: {
      en: 'Maggi upgrade pack 🍜 — Maggi, tomatoes, onions, cheese & eggs.',
      hi: 'Maggi pack 🍜 — Maggi, tamatar, pyaaz, cheese aur ande.',
      gu: 'Maggi pack 🍜 — Maggi, tamata, dungri, cheese ane inda.',
    },
  },
  dosa: {
    keywords: ['dosa', 'idli', 'south indian', 'डोसा', 'sambar'],
    products: ['e4', 'e6', 'e2', 'v3', 'v2', 'e7'],
    responses: {
      en: 'Dosa basics 🥞 — rice, oil, salt, potatoes, onions & turmeric.',
      hi: 'Dosa ka saamaan 🥞 — chawal, tel, namak, aaloo, pyaaz aur haldi.',
      gu: 'Dosa mate 🥞 — chaval, tel, mithu, batata, dungri ane haldar.',
    },
  },
  smoothie: {
    keywords: ['smoothie', 'shake', 'milkshake'],
    products: ['f2', 'd1', 'd5', 'f6', 'e1'],
    responses: {
      en: 'Smoothie pack 🍌 — bananas, milk, curd, strawberries & sugar.',
      hi: 'Shake pack 🍌 — kele, doodh, dahi, strawberry aur cheeni.',
      gu: 'Shake mate 🍌 — kela, dudh, dahi, strawberry ane sakkar.',
    },
  },
  salad: {
    keywords: ['salad', 'सलाद'],
    products: ['v1', 'v6', 'v7', 'f1', 'v5', 'e2'],
    responses: {
      en: 'Salad pack 🥗 — tomatoes, cucumber, carrots, apples, spinach & salt.',
      hi: 'Salad ka saamaan 🥗 — tamatar, kheera, gajar, seb, palak aur namak.',
      gu: 'Salad mate 🥗 — tamata, kakdi, gajar, seb, palak ane mithu.',
    },
  },
  party: {
    keywords: ['party', 'पार्टी', 'guests', 'mehmaan'],
    products: ['s1', 's2', 's3', 's4', 'bv1', 'bv2', 's8'],
    responses: {
      en: 'Party time 🎉 — chips, kurkure, bhujia, oreo, coke, sprite & chocolate.',
      hi: 'Party pack 🎉 — chips, kurkure, bhujia, oreo, coke, sprite aur chocolate.',
      gu: 'Party mate 🎉 — chips, kurkure, bhujia, oreo, coke, sprite ane chocolate.',
    },
  },
  baking: {
    keywords: ['baking', 'cake', 'bake', 'bakery'],
    products: ['e3', 'd8', 'd3', 'e1', 'd1', 's8'],
    responses: {
      en: 'Baking essentials 🎂 — atta, eggs, butter, sugar, milk & chocolate.',
      hi: 'Baking ka saamaan 🎂 — atta, ande, makhan, cheeni, doodh aur chocolate.',
      gu: 'Baking mate 🎂 — atta, inda, butter, sakkar, dudh ane chocolate.',
    },
  },
  monthly: {
    keywords: ['monthly', 'monthly groceries', 'staples', 'pantry', 'mahine ka', 'महीने का', 'rasoi', 'kirana'],
    products: ['e3', 'e4', 'e1', 'e2', 'e6', 'd1', 'd8', 'b1', 'e5'],
    responses: {
      en: 'Monthly essentials 🛒 — atta, rice, sugar, salt, oil, milk, eggs, bread & dal.',
      hi: 'Mahine ka saamaan 🛒 — atta, chawal, cheeni, namak, tel, doodh, ande, bread aur dal.',
      gu: 'Mahina nu kirana 🛒 — atta, chaval, sakkar, mithu, tel, dudh, inda, bread ane dal.',
    },
  },
};

// ============================================================
// MULTILINGUAL PRODUCT ALIASES - for direct product matching
// ============================================================
const PRODUCT_ALIASES = {
  // Format: alias -> product ID
  milk: 'd1', dudh: 'd1', doodh: 'd1', दूध: 'd1', dudhh: 'd1',
  butter: 'd3', makhan: 'd3', makkhan: 'd3',
  paneer: 'd4', पनीर: 'd4',
  curd: 'd5', dahi: 'd5', yogurt: 'd5', દહીં: 'd5',
  cheese: 'd6',
  cream: 'd7', malai: 'd7',
  eggs: 'd8', anda: 'd8', ande: 'd8', inda: 'd8',
  bread: 'b1', ब्रेड: 'b1',
  pav: 'b3',
  cookies: 'b4', biscuit: 's5',
  chips: 's1',
  chocolate: 's8',
  almonds: 's6', badam: 's6',
  cashews: 's7', cashew: 's7', kaju: 's7',
  coke: 'bv1', cola: 'bv1',
  sprite: 'bv2',
  pepsi: 'bv3',
  tea: 'bv4', chai: 'bv4', cha: 'bv4', चाय: 'bv4',
  coffee: 'bv6', कॉफी: 'bv6',
  juice: 'bv7',
  water: 'bv9', paani: 'bv9', pani: 'bv9', पानी: 'bv9',
  sugar: 'e1', chini: 'e1', cheeni: 'e1', sakkar: 'e1', shakkar: 'e1', साकर: 'e1',
  salt: 'e2', namak: 'e2', mithu: 'e2',
  atta: 'e3', flour: 'e3', wheat: 'e3', आटा: 'e3',
  rice: 'e4', chawal: 'e4', chaval: 'e4', bhaat: 'e4', चावल: 'e4',
  dal: 'e5', daal: 'e5', lentil: 'e5', दाल: 'e5',
  oil: 'e6', tel: 'e6', तेल: 'e6',
  turmeric: 'e7', haldi: 'e7', haldar: 'e7', हल्दी: 'e7',
  chilli: 'e8', mirch: 'e8', marcha: 'e8', mirchi: 'e8',
  cardamom: 'e11', elaichi: 'e11', एलायची: 'e11',
  jeera: 'e12', cumin: 'e12',
  tomato: 'v1', tomatoes: 'v1', tamatar: 'v1', tamata: 'v1', टमाटर: 'v1',
  onion: 'v2', onions: 'v2', pyaaz: 'v2', pyaz: 'v2', kanda: 'v2', dungri: 'v2', प्याज: 'v2',
  potato: 'v3', potatoes: 'v3', aloo: 'v3', batata: 'v3', आलू: 'v3',
  capsicum: 'v4', simla: 'v4', 'shimla mirch': 'v4',
  spinach: 'v5', palak: 'v5', पालक: 'v5',
  cucumber: 'v6', kheera: 'v6', kakdi: 'v6',
  carrot: 'v7', carrots: 'v7', gajar: 'v7', गाजर: 'v7',
  cauliflower: 'v8', gobi: 'v8',
  ginger: 'v9', adrak: 'v9', अदरक: 'v9',
  garlic: 'v10', lehsun: 'v10', lahsun: 'v10', lasan: 'v10', लहसुन: 'v10',
  apple: 'f1', apples: 'f1', seb: 'f1', सेब: 'f1',
  banana: 'f2', bananas: 'f2', kela: 'f2', kele: 'f2', केला: 'f2',
  orange: 'f3', santra: 'f3',
  pomegranate: 'f4', anar: 'f4',
  watermelon: 'f5', tarbooz: 'f5',
  strawberry: 'f6', strawberries: 'f6',
  mango: 'f7', aam: 'f7',
  grapes: 'f8', angoor: 'f8',
  noodles: 'fz5', maggi: 'fz5', मैगी: 'fz5',
  peas: 'fz4', matar: 'fz4', vatana: 'fz4',
};

// ============================================================
// MULTILINGUAL INTENT KEYWORDS
// ============================================================
const INTENT_KEYWORDS = {
  add: [
    // English
    'add', 'buy', 'order', 'get', 'want', 'need',
    // Hindi/Hinglish
    'add karo', 'daalo', 'dalo', 'dal do', 'add kar', 'lao', 'le aao', 'lana',
    'chahiye', 'chaahiye', 'mangaao', 'mangao', 'mangwao', 'kharido',
    // Gujarati
    'umer', 'umero', 'umerO', 'add karo', 'joie', 'joiye', 'leva', 'kharido',
  ],
  open_cart: [
    'open cart', 'view cart', 'show cart', 'my cart',
    'cart kholo', 'cart dekhao', 'cart batao', 'mera cart',
    'cart khola', 'cart dekhad',
  ],
  checkout: [
    'checkout', 'pay', 'place order', 'buy now',
    'order karo', 'order kar do', 'paisa do', 'pay karo',
    'order kareli', 'order karo',
  ],
  healthy: [
    'healthy', 'fit', 'diet', 'low cal', 'nutritious',
    'sehatmand', 'achha', 'fayde', 'फिट',
    'tandurasti', 'sajja',
  ],
  cheap: [
    'cheap', 'budget', 'under', 'less than',
    'sasta', 'sasti', 'kam dam', 'kam paisa', 'सस्ता',
    'sastu', 'oodu', 'oochu',
  ],
};

// ============================================================
// CATEGORIES with multilingual keywords
// ============================================================
const CATEGORY_KEYWORDS = {
  vegetables: ['vegetable', 'sabzi', 'veggie', 'सब्जी', 'shaakbhaji', 'shak'],
  fruits: ['fruit', 'fruits', 'fal', 'phal', 'फल', 'falo'],
  dairy: ['dairy', 'milk', 'paneer', 'doodh', 'दूध', 'dudh', 'dairy products'],
  bakery: ['bakery', 'bread', 'cookie', 'cake', 'pav', 'bun'],
  snacks: ['snack', 'snacks', 'chips', 'biscuit', 'namkeen', 'nashta'],
  beverages: ['drink', 'cold drink', 'tea', 'coffee', 'juice', 'beverage', 'pina'],
  essentials: ['atta', 'flour', 'rice', 'dal', 'oil', 'masala', 'spice', 'kirana'],
  frozen: ['frozen', 'instant', 'ready', 'maggi'],
  household: ['detergent', 'cleaner', 'household', 'safai'],
  personal: ['shampoo', 'toothpaste', 'soap'],
  baby: ['baby', 'diaper', 'cerelac', 'bachcha'],
};

// ============================================================
// FUZZY SEARCH
// ============================================================
const fuse = new Fuse(PRODUCTS, {
  keys: ['name', 'tags', 'category'],
  threshold: 0.4,
  includeScore: true,
});

export function searchProducts(query) {
  if (!query || query.length < 2) return [];
  return fuse.search(query).map((r) => r.item);
}

// ============================================================
// RESPONSE TEMPLATES per language
// ============================================================
const RESPONSES = {
  added_to_cart: {
    en: (name) => `Added ${name} to cart ✅`,
    hi: (name) => `${name} cart me add kar diya ✅`,
    gu: (name) => `${name} cart ma umeri didhu ✅`,
  },
  open_cart: {
    en: 'Opening your cart 🛒',
    hi: 'Cart khol raha hoon 🛒',
    gu: 'Cart kholu chu 🛒',
  },
  checkout: {
    en: 'Taking you to checkout 💳',
    hi: 'Checkout par le ja raha hoon 💳',
    gu: 'Checkout par lai jau chu 💳',
  },
  healthy_found: {
    en: (n, b) => `Found ${n} healthy options${b ? ` under ₹${b}` : ''} 🥗`,
    hi: (n, b) => `${n} healthy options mile${b ? ` ₹${b} ke andar` : ''} 🥗`,
    gu: (n, b) => `${n} healthy items mali gaya${b ? ` ₹${b} ni andar` : ''} 🥗`,
  },
  budget_found: {
    en: (n, b) => `Found ${n} products under ₹${b} 💰`,
    hi: (n, b) => `${n} products mile ₹${b} ke andar 💰`,
    gu: (n, b) => `${n} products mali gaya ₹${b} ni andar 💰`,
  },
  category: {
    en: (cat, n) => `Showing ${cat} 📦 ${n} items.`,
    hi: (cat, n) => `${cat} dikha raha hoon 📦 ${n} items.`,
    gu: (cat, n) => `${cat} batavu chu 📦 ${n} items.`,
  },
  search_found: {
    en: (n) => `Found ${n} matching products 🔍`,
    hi: (n) => `${n} products mile 🔍`,
    gu: (n) => `${n} products mali gaya 🔍`,
  },
  not_understood: {
    en: 'I couldn\'t find that. Try: "ingredients for pizza", "add milk", or "healthy snacks".',
    hi: 'Samajh nahi aaya. Aise try karo: "pizza ke ingredients", "doodh add karo", ya "healthy snacks".',
    gu: 'Samjavyu nahi. Aam try karo: "pizza mate ingredients", "dudh umero", ke "healthy snacks".',
  },
};

// ============================================================
// HELPERS
// ============================================================
function extractBudget(text) {
  const patterns = [
    /under\s*[₹rs.]*\s*(\d+)/i,
    /less\s*than\s*[₹rs.]*\s*(\d+)/i,
    /below\s*[₹rs.]*\s*(\d+)/i,
    /[₹rs.]+\s*(\d+)\s*(?:ke\s*andar|ni\s*andar|na\s*andar)/i,
    /(\d+)\s*(?:ke\s*andar|ni\s*andar|na\s*andar|me)/i,
    /budget\s*[₹rs.]*\s*(\d+)/i,
  ];
  for (const p of patterns) {
    const m = text.match(p);
    if (m) return parseInt(m[1]);
  }
  return null;
}

function findProductsByAlias(text) {
  const lower = ` ${text.toLowerCase()} `;
  const matched = new Set();
  for (const [alias, productId] of Object.entries(PRODUCT_ALIASES)) {
    const a = ` ${alias.toLowerCase()} `;
    if (lower.includes(a) || lower.includes(`${alias.toLowerCase()},`) || lower.includes(`${alias.toLowerCase()} and`) || lower.includes(`${alias.toLowerCase()} aur`) || lower.includes(`${alias.toLowerCase()} ane`)) {
      matched.add(productId);
    }
  }
  return Array.from(matched)
    .map((id) => PRODUCTS.find((p) => p.id === id))
    .filter(Boolean);
}

// ============================================================
// MAIN INTENT PARSER - MULTILINGUAL
// ============================================================
export function parseIntent(text) {
  const original = text;
  const lower = text.toLowerCase().trim();
  const lang = detectLanguage(text);

  const result = {
    intent: 'general',
    action: null,
    products: [],
    category: null,
    budget: extractBudget(lower),
    response: '',
    recipe: null,
    language: lang,
  };

  // STEP 1: Recipe match (works across languages)
  for (const [key, recipe] of Object.entries(RECIPES)) {
    if (recipe.keywords.some((kw) => lower.includes(kw.toLowerCase()))) {
      const products = recipe.products.map((id) => PRODUCTS.find((p) => p.id === id)).filter(Boolean);
      result.intent = 'add_recipe';
      result.action = 'add_multiple';
      result.products = products;
      result.recipe = key;
      result.response = recipe.responses[lang] || recipe.responses.en;
      return result;
    }
  }

  // STEP 2: Cart actions
  if (INTENT_KEYWORDS.open_cart.some((kw) => lower.includes(kw))) {
    result.intent = 'open_cart';
    result.action = 'open_cart';
    result.response = RESPONSES.open_cart[lang];
    return result;
  }

  if (INTENT_KEYWORDS.checkout.some((kw) => lower.includes(kw))) {
    result.intent = 'checkout';
    result.action = 'checkout';
    result.response = RESPONSES.checkout[lang];
    return result;
  }

  // STEP 3: Healthy filter
  if (INTENT_KEYWORDS.healthy.some((kw) => lower.includes(kw))) {
    let filtered = PRODUCTS.filter((p) =>
      p.tags?.some((t) => ['healthy', 'protein', 'fresh', 'greens', 'nuts', 'fruit'].includes(t))
    );
    if (result.budget) filtered = filtered.filter((p) => p.price <= result.budget);
    result.intent = 'show_filtered';
    result.action = 'highlight_products';
    result.products = filtered.slice(0, 8);
    result.response = RESPONSES.healthy_found[lang](filtered.length, result.budget);
    return result;
  }

  // STEP 4: Budget filter
  if (result.budget && INTENT_KEYWORDS.cheap.some((kw) => lower.includes(kw))) {
    const cheap = PRODUCTS.filter((p) => p.price <= result.budget);
    result.intent = 'show_filtered';
    result.action = 'highlight_products';
    result.products = cheap.slice(0, 10);
    result.response = RESPONSES.budget_found[lang](cheap.length, result.budget);
    return result;
  }

  // STEP 5: Multi-product add via aliases (handles "dudh ane bread add karo")
  const aliasMatches = findProductsByAlias(text);
  if (aliasMatches.length > 0) {
    result.intent = aliasMatches.length > 1 ? 'add_multiple' : 'add_to_cart';
    result.action = aliasMatches.length > 1 ? 'add_multiple' : 'add_single';
    result.products = aliasMatches;
    if (aliasMatches.length === 1) {
      result.response = RESPONSES.added_to_cart[lang](aliasMatches[0].name);
    } else {
      const names = aliasMatches.map((p) => p.name).join(', ');
      result.response = lang === 'hi' ? `${names} cart me add kar diye ✅`
        : lang === 'gu' ? `${names} cart ma umeri didha ✅`
        : `Added ${names} ✅`;
    }
    return result;
  }

  // STEP 6: Category navigation
  for (const [cat, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    if (keywords.some((kw) => lower.includes(` ${kw}`) || lower.startsWith(kw) || lower.endsWith(kw))) {
      const catProducts = PRODUCTS.filter((p) => p.category === cat);
      result.intent = 'show_category';
      result.action = 'show_category';
      result.category = cat;
      result.products = catProducts.slice(0, 8);
      result.response = RESPONSES.category[lang](cat, catProducts.length);
      return result;
    }
  }

  // STEP 7: Fuzzy search fallback
  const cleaned = lower
    .replace(/\b(what|how|where|tell|show|give|find|i|want|need|the|to|for|are|is|me|of|do|please|kya|kaise|mujhe|mere|ke|ki|liye|hai|chahiye|joie|mate|shu|su)\b/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  const searched = searchProducts(cleaned || text);
  if (searched.length > 0) {
    result.intent = 'search';
    result.action = 'highlight_products';
    result.products = searched.slice(0, 6);
    result.response = RESPONSES.search_found[lang](searched.length);
    return result;
  }

  // STEP 8: True fallback - in user's language
  result.intent = 'unknown';
  result.action = null;
  result.response = RESPONSES.not_understood[lang];
  return result;
}

// Quick suggestions - in mixed languages to showcase
export const QUICK_SUGGESTIONS = [
  'Mujhe chai banani hai',
  'Pizza mate ingredients',
  'Healthy snacks under ₹300',
  'Dudh ane bread add karo',
];

export const ONBOARDING_GREETING = "Hi! I'm AAWAZ ✨ Speak in English, Hindi, or Gujarati — I understand all.";
