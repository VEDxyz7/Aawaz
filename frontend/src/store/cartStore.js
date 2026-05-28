import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (product) => {
        const items = get().items;
        const existing = items.find((i) => i.id === product.id);
        if (existing) {
          set({
            items: items.map((i) =>
              i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
            ),
          });
        } else {
          set({ items: [...items, { ...product, quantity: 1 }] });
        }
      },

      addMultipleItems: (products) => {
        const items = get().items;
        let newItems = [...items];
        products.forEach((product) => {
          const existing = newItems.find((i) => i.id === product.id);
          if (existing) {
            newItems = newItems.map((i) =>
              i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
            );
          } else {
            newItems = [...newItems, { ...product, quantity: 1 }];
          }
        });
        set({ items: newItems });
      },

      removeItem: (productId) => {
        set({ items: get().items.filter((i) => i.id !== productId) });
      },

      incrementQuantity: (productId) => {
        set({
          items: get().items.map((i) =>
            i.id === productId ? { ...i, quantity: i.quantity + 1 } : i
          ),
        });
      },

      decrementQuantity: (productId) => {
        const items = get().items;
        const item = items.find((i) => i.id === productId);
        if (item && item.quantity > 1) {
          set({
            items: items.map((i) =>
              i.id === productId ? { ...i, quantity: i.quantity - 1 } : i
            ),
          });
        } else {
          set({ items: items.filter((i) => i.id !== productId) });
        }
      },

      clearCart: () => set({ items: [] }),

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set({ isOpen: !get().isOpen }),

      getTotalItems: () =>
        get().items.reduce((sum, item) => sum + item.quantity, 0),

      getSubtotal: () =>
        get().items.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        ),

      getOriginalTotal: () =>
        get().items.reduce(
          (sum, item) =>
            sum + (item.original_price || item.price) * item.quantity,
          0
        ),

      getSavings: () => {
        const original = get().getOriginalTotal();
        const current = get().getSubtotal();
        return original - current;
      },
    }),
    {
      name: 'aawaz-cart-storage',
    }
  )
);

// AI State Store - tracks AI actions on the UI
export const useAIStore = create((set, get) => ({
  isOpen: false,
  isListening: false,
  isProcessing: false,
  isSpeaking: false,
  transcript: '',
  response: '',
  highlightedProductIds: [],
  highlightedCategoryId: null,
  scrollToSection: null,
  language: 'en',
  conversationHistory: [],

  setOpen: (val) => set({ isOpen: val }),
  setListening: (val) => set({ isListening: val }),
  setProcessing: (val) => set({ isProcessing: val }),
  setSpeaking: (val) => set({ isSpeaking: val }),
  setTranscript: (val) => set({ transcript: val }),
  setResponse: (val) => set({ response: val }),
  setLanguage: (val) => set({ language: val }),

  highlightProducts: (ids) => {
    set({ highlightedProductIds: ids });
    // Auto-clear after 8 seconds
    setTimeout(() => {
      const currentIds = get().highlightedProductIds;
      // Only clear if same ids
      if (JSON.stringify(currentIds) === JSON.stringify(ids)) {
        set({ highlightedProductIds: [] });
      }
    }, 8000);
  },

  highlightCategory: (id) => {
    set({ highlightedCategoryId: id });
    setTimeout(() => set({ highlightedCategoryId: null }), 5000);
  },

  triggerScroll: (section) => {
    set({ scrollToSection: section });
    setTimeout(() => set({ scrollToSection: null }), 100);
  },

  addToConversation: (entry) => {
    set({ conversationHistory: [...get().conversationHistory, entry] });
  },

  reset: () =>
    set({
      transcript: '',
      response: '',
      highlightedProductIds: [],
      highlightedCategoryId: null,
    }),
}));
