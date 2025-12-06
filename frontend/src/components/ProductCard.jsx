import { FiStar } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';
import { useState } from 'react';
import { getProductImage } from '../utils/imageMap';

export default function ProductCard({ product }) {
  const [isAdding, setIsAdding] = useState(false);
  const { addToCart } = useCartStore();
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <Link to={`/product/${product._id}`}>
      <div className="bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden h-full flex flex-col border border-gray-100">
        {/* Image Container */}
        <div className="relative overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 h-48 md:h-56">
          <img
            src={getProductImage(product.name)}
            alt={product.name}
            className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
          />

          {discount > 0 && (
            <div className="absolute top-3 right-3 bg-gradient-to-r from-red-500 to-rose-600 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
              {discount}% OFF
            </div>
          )}

          {product.stock === 0 && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center backdrop-blur-sm">
              <span className="text-white font-bold text-lg">Out of Stock</span>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="p-4 flex-1 flex flex-col justify-between">
          <div>
            <h3 className="text-sm md:text-base font-semibold text-gray-800 line-clamp-2 mb-2">
              {product.name}
            </h3>

            <p className="text-xs text-gray-500 mb-3 line-clamp-1">
              {product.category}
            </p>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <FiStar
                    key={i}
                    className={`text-sm ${
                      i < Math.round(product.rating)
                        ? 'text-amber-400 fill-amber-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-gray-600">
                ({product.reviewCount} reviews)
              </span>
            </div>
          </div>

          {/* Price */}
          <div className="mb-3">
            <div className="flex items-center gap-2">
              <span className="text-lg md:text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                ₹{product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-gray-500 line-through">
                  ₹{product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsAdding(true);
              addToCart({
                id: product._id,
                _id: product._id,
                name: product.name,
                price: product.price,
                originalPrice: product.originalPrice,
                image: product.images?.[0]?.url,
                quantity: 1
              });
              setTimeout(() => setIsAdding(false), 500);
            }}
            className={`w-full py-2 px-4 rounded-lg font-semibold transition-all duration-300 shadow-sm hover:shadow-md ${
              product.stock === 0
                ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                : isAdding
                ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white scale-105'
                : 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800'
            }`}
            disabled={product.stock === 0}
          >
            {isAdding ? '✓ Added' : product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </Link>
  );
}
