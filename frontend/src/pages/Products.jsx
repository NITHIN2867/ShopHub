import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { productService } from '../services/api';
import ProductCard from '../components/ProductCard';
import { FiFilter, FiSearch } from 'react-icons/fi';

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [priceRange, setPriceRange] = useState([0, 100000]);

  useEffect(() => {
    // Update search and category from URL params on component mount
    const categoryParam = searchParams.get('category');
    const searchParam = searchParams.get('search');
    
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
    if (searchParam) {
      setSearch(searchParam);
    }
  }, [searchParams]);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [page, selectedCategory, search, priceRange]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await productService.getAllProducts(
        page,
        12,
        selectedCategory,
        search
      );
      
      // Filter products by price range
      const filteredProducts = response.data.products.filter(product => 
        product.price >= priceRange[0] && product.price <= priceRange[1]
      );
      
      setProducts(filteredProducts);
      setTotalPages(response.data.pagination.pages);
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
    setPage(1);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Header Section */}
      <div className="hero-section text-white py-8 w-full">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-white drop-shadow-lg">Our Products</h1>
          <p className="text-base md:text-lg text-blue-100 drop-shadow-md">Browse our complete collection of products</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar - Categories */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-b from-white to-gray-50 p-6 rounded-xl shadow-md hover:shadow-lg sticky top-24 border border-gray-100">
              <div className="flex items-center gap-2 mb-6">
                <FiFilter className="text-2xl text-blue-600" />
                <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Filters</h2>
              </div>

              {/* Price Range Filter */}
              <div className="mb-8 pb-8 border-b border-gray-200">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">Price Range</h3>
                <div className="space-y-4">
                  {/* Min Price */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Min: ₹{priceRange[0].toLocaleString()}
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="100000"
                      step="1000"
                      value={priceRange[0]}
                      onChange={(e) => {
                        const newMin = parseInt(e.target.value);
                        if (newMin <= priceRange[1]) {
                          setPriceRange([newMin, priceRange[1]]);
                          setPage(1);
                        }
                      }}
                      className="w-full h-2 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg appearance-none cursor-pointer accent-blue-600 hover:accent-blue-700"
                    />
                  </div>

                  {/* Max Price */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Max: ₹{priceRange[1].toLocaleString()}
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="100000"
                      step="1000"
                      value={priceRange[1]}
                      onChange={(e) => {
                        const newMax = parseInt(e.target.value);
                        if (newMax >= priceRange[0]) {
                          setPriceRange([priceRange[0], newMax]);
                          setPage(1);
                        }
                      }}
                      className="w-full h-2 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg appearance-none cursor-pointer accent-blue-600 hover:accent-blue-700"
                    />
                  </div>

                  {/* Price Display */}
                  <div className="mt-4 p-3 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border border-blue-100">
                    <p className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                      ₹{priceRange[0].toLocaleString()} - ₹{priceRange[1].toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-800">Categories</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => handleCategoryChange('')}
                    className={`block w-full text-left px-3 py-2 rounded-lg transition-all duration-200 ${
                      selectedCategory === ''
                        ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md'
                        : 'text-gray-700 hover:bg-blue-50 border-l-4 border-l-transparent hover:border-l-blue-600'
                    }`}
                  >
                    All Products
                  </button>
                  {categories.map(category => (
                    <button
                      key={category}
                      onClick={() => handleCategoryChange(category)}
                      className={`block w-full text-left px-3 py-2 rounded-lg transition-all duration-200 ${
                        selectedCategory === category
                          ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md'
                          : 'text-gray-700 hover:bg-blue-50 border-l-4 border-l-transparent hover:border-l-blue-600'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {loading ? (
              <div className="flex items-center justify-center h-96">
                <div className="text-2xl text-gray-600">Loading products...</div>
              </div>
            ) : products.length === 0 ? (
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-12 rounded-lg text-center border border-blue-100 shadow-sm">
                <p className="text-2xl text-gray-600">No products found</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map(product => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex gap-2 justify-center mt-8 flex-wrap">
                    <button
                      onClick={() => setPage(Math.max(1, page - 1))}
                      disabled={page === 1}
                      className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition shadow-md hover:shadow-lg"
                    >
                      Previous
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                      <button
                        key={p}
                        onClick={() => setPage(p)}
                        className={`px-4 py-2 rounded-lg transition-all shadow-sm ${
                          page === p
                            ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md'
                            : 'bg-gray-100 hover:bg-gray-200 border border-gray-300 text-gray-700'
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                    <button
                      onClick={() => setPage(Math.min(totalPages, page + 1))}
                      disabled={page === totalPages}
                      className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition shadow-md hover:shadow-lg"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
