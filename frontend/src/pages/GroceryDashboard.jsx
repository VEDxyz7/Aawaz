import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '@/components/grocery/Header';
import CategoryGrid from '@/components/grocery/CategoryGrid';
import ProductGrid from '@/components/grocery/ProductGrid';
import AIAssistant from '@/components/ai/AIAssistant';
import { toast } from 'sonner';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export default function GroceryDashboard() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [cart, setCart] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      fetchProducts(selectedCategory);
    } else {
      fetchProducts();
    }
  }, [selectedCategory]);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${API}/categories`);
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
      toast.error('Failed to load categories');
    }
  };

  const fetchProducts = async (category = null) => {
    try {
      const url = category ? `${API}/products?category=${category}` : `${API}/products`;
      const response = await axios.get(url);
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Failed to load products');
    }
  };

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    toast.success(`${product.name} added to cart`);
  };

  const filteredProducts = searchQuery
    ? products.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : products;

  return (
    <div className="app-container min-h-screen">
      <Header 
        cart={cart} 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      
      <main className="max-w-7xl mx-auto px-4 py-6 space-y-8">
        <CategoryGrid 
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
        
        <div>
          <h2 className="text-2xl font-bold mb-4 text-gray-900">
            {selectedCategory ? `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}` : 'All Products'}
          </h2>
          <ProductGrid 
            products={filteredProducts}
            onAddToCart={addToCart}
          />
        </div>
      </main>

      <AIAssistant />
    </div>
  );
}