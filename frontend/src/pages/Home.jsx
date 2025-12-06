import { useEffect, useState } from 'react';
import { productService } from '../services/api';
import ProductCard from '../components/ProductCard';
import OfferCarousel from '../components/OfferCarousel';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await productService.getAllProducts(1, 8, '', search);
      setProducts(response.data.products);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await productService.getCategories();
      setCategories(response.data);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleCategoryClick = (category) => {
    navigate(`/products?category=${category}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Spacer */}
      <div className="h-4 md:h-6 bg-gray-50"></div>

      {/* Offer Carousel */}
      <OfferCarousel />

      {/* Hero Section - Full Width */}
      <div className="hero-section text-white py-8 w-full">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-white">Welcome to ShopHub</h1>
          <p className="text-base md:text-lg text-blue-100">Shop for millions of products at incredible prices</p>
        </div>
      </div>

      {/* Categories Section */}
      <div className="bg-gradient-to-r from-white via-blue-50 to-white py-8 border-b border-gray-100 shadow-sm">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-slate-900 to-blue-600 bg-clip-text text-transparent">Shop by Category</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <button
              onClick={() => navigate('/products')}
              className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-gradient-to-r hover:from-blue-50 hover:to-cyan-50 transition text-center font-semibold text-gray-700 hover:text-blue-600"
            >
              All Products
            </button>
            {categories.map(category => (
              <button
                key={category}
                onClick={() => handleCategoryClick(category)}
                className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-gradient-to-r hover:from-blue-50 hover:to-cyan-50 transition text-center font-semibold text-gray-700 hover:text-blue-600"
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Products Section */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-slate-900 to-blue-600 bg-clip-text text-transparent">Featured Products</h2>
        
        {loading ? (
          <div className="flex items-center justify-center h-96">
            <div className="text-2xl text-gray-600">Loading products...</div>
          </div>
        ) : products.length === 0 ? (
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-12 rounded-lg text-center border border-blue-100 shadow-sm">
            <p className="text-2xl text-gray-600">No products found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}

        {/* View All Button */}
        <div className="text-center mt-12">
          <button
            onClick={() => navigate('/products')}
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-blue-800 transition shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            View All Products
          </button>
        </div>
      </div>
    </div>
  );
}
