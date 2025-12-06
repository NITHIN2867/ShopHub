import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { productService, cartService } from '../services/api';
import { useAuthStore } from '../store/authStore';
import { useCartStore } from '../store/cartStore';
import { FiStar, FiShoppingCart, FiArrowLeft } from 'react-icons/fi';
import { getProductImage } from '../utils/imageMap';
import ProductCard from '../components/ProductCard';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { addToCart } = useCartStore();
  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [adding, setAdding] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await productService.getProductById(id);
      setProduct(response.data);
      
      // Fetch similar products from same category
      fetchSimilarProducts(response.data.category);
    } catch (error) {
      console.error('Failed to fetch product:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSimilarProducts = async (category) => {
    try {
      const response = await productService.getAllProducts(1, 6, category);
      // Filter out current product and limit to 4 products
      const similar = response.data.products.filter(p => p._id !== id).slice(0, 4);
      setSimilarProducts(similar);
    } catch (error) {
      console.error('Failed to fetch similar products:', error);
    }
  };

  const handleAddToCart = () => {
    if (!user) {
      navigate('/login');
      return;
    }

    try {
      setAdding(true);
      addToCart({
        id: product._id,
        _id: product._id,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        image: getProductImage(product.name),
        quantity: parseInt(quantity)
      });
      setMessage('✓ Product added to cart!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Failed to add to cart');
      console.error('Failed to add to cart:', error);
    } finally {
      setAdding(false);
    }
  };

  const handleBuyNow = () => {
    if (!user) {
      navigate('/login');
      return;
    }

    try {
      setAdding(true);
      addToCart({
        id: product._id,
        _id: product._id,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        image: getProductImage(product.name),
        quantity: parseInt(quantity)
      });
      // Redirect to cart after adding
      setTimeout(() => navigate('/cart'), 300);
    } catch (error) {
      setMessage('Failed to proceed');
      console.error('Failed to proceed:', error);
      setAdding(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-2xl text-gray-600">Loading product...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-2xl text-gray-600">Product not found</div>
      </div>
    );
  }

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-gray-100 py-4 px-4">
      <div className="container mx-auto max-w-5xl">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-4 font-semibold text-sm"
        >
          <FiArrowLeft className="text-lg" />
          Back
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-4 md:p-6 rounded-lg shadow-lg">
          {/* Image Section */}
          <div>
            <div className="relative bg-gray-100 rounded-lg overflow-hidden mb-3">
              <img
                src={getProductImage(product.name)}
                alt={product.name}
                className="w-full h-auto object-cover"
              />
              {discount > 0 && (
                <div className="absolute top-3 right-3 bg-red-600 text-white px-3 py-1 rounded-lg font-bold text-sm">
                  {discount}% OFF
                </div>
              )}
            </div>

            {/* Additional Images */}
            {product.images && product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {product.images.map((image, index) => (
                  <img
                    key={index}
                    src={image.url}
                    alt={`${product.name}-${index}`}
                    className="w-20 h-20 object-cover rounded-lg cursor-pointer border-2 border-gray-300 hover:border-blue-600"
                  />
                ))}
              </div>
            )}
          </div>

          {/* Product Info Section */}
          <div>
            {/* Category and Title */}
            <p className="text-xs text-gray-500 mb-1">{product.category}</p>
            <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-3">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <FiStar
                    key={i}
                    className={`text-sm ${
                      i < Math.round(product.rating)
                        ? 'text-yellow-400 fill-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-gray-600">
                ({product.reviewCount} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="mb-3 pb-3 border-b">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl font-bold text-gray-900">
                  ₹{product.price.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <>
                    <span className="text-sm text-gray-500 line-through">
                      ₹{product.originalPrice.toLocaleString()}
                    </span>
                    <span className="text-sm text-red-600 font-bold">
                      {discount}% OFF
                    </span>
                  </>
                )}
              </div>
              <p className="text-xs text-gray-600">
                Free Delivery | Cash on Delivery Available
              </p>
            </div>

            {/* Description */}
            <div className="mb-4">
              <p className="text-sm text-gray-700 line-clamp-2">
                {product.description}
              </p>
            </div>

            {/* SKU and Stock */}
            <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm text-gray-600">SKU</p>
                <p className="font-semibold">{product.sku || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Stock Available</p>
                <p className="font-semibold">{product.stock} units</p>
              </div>
            </div>

            {/* Tags */}
            {product.tags && product.tags.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-semibold mb-2">Tags:</h3>
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity and Add to Cart */}
            <div className="flex gap-4 mb-2">
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100"
                >
                  −
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-16 px-4 py-2 text-center border-l border-r border-gray-300"
                  min="1"
                  max={product.stock}
                />
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={adding || product.stock === 0}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-lg font-bold text-white transition ${
                  product.stock === 0
                    ? 'bg-gray-400 cursor-not-allowed'
                    : adding
                    ? 'bg-gray-400'
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                <FiShoppingCart className="text-xl" />
                {product.stock === 0
                  ? 'Out of Stock'
                  : adding
                  ? 'Adding...'
                  : 'Add to Cart'}
              </button>
            </div>

            {/* Buy Now Button */}
            <button
              onClick={handleBuyNow}
              disabled={adding || product.stock === 0}
              className={`w-full py-3 px-6 rounded-lg font-bold text-white transition mb-6 ${
                product.stock === 0
                  ? 'bg-gray-400 cursor-not-allowed'
                  : adding
                  ? 'bg-gray-400'
                  : 'bg-orange-600 hover:bg-orange-700'
              }`}
            >
              {adding ? 'Processing...' : '🛒 Buy Now'}
            </button>

            {message && (
              <div className={`p-4 rounded-lg text-white font-semibold ${
                message.includes('Failed') ? 'bg-red-600' : 'bg-green-600'
              }`}>
                {message}
              </div>
            )}
          </div>
        </div>

        {/* Similar Products Section */}
        {similarProducts.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Similar Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {similarProducts.map(similarProduct => (
                <ProductCard key={similarProduct._id} product={similarProduct} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
