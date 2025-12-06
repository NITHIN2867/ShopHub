import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FiShoppingCart, FiUser, FiLogOut, FiMenu, FiX, FiSearch, FiChevronDown, FiBell, FiMessageCircle, FiTrendingUp, FiDownload } from 'react-icons/fi';
import { useAuthStore } from '../store/authStore';
import { useCartStore } from '../store/cartStore';
import { useChat } from '../context/ChatContext';
import { useState, useRef, useEffect } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMoreDropdownOpen, setIsMoreDropdownOpen] = useState(false);
  const [isCartAnimating, setIsCartAnimating] = useState(false);
  const [prevCartCount, setPrevCartCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef(null);
  const moreDropdownRef = useRef(null);
  const { user, logout, isAdmin } = useAuthStore();
  const { getCartCount } = useCartStore();
  const { openChat } = useChat();
  const navigate = useNavigate();
  const location = useLocation();
  const cartCount = getCartCount();

  // Trigger animation when cart count changes
  useEffect(() => {
    if (cartCount > prevCartCount) {
      setIsCartAnimating(true);
      const timer = setTimeout(() => setIsCartAnimating(false), 600);
      return () => clearTimeout(timer);
    }
    setPrevCartCount(cartCount);
  }, [cartCount, prevCartCount]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
      if (moreDropdownRef.current && !moreDropdownRef.current.contains(event.target)) {
        setIsMoreDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setIsDropdownOpen(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  return (
    <header className="header-navbar sticky top-0 z-50">
      <div className="w-full px-4 py-2">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Logo - Left */}
          <Link to="/" className="hover:opacity-90 transition flex-shrink-0">
            <img src="/shophub-logo.svg" alt="ShopHub Logo" className="h-12 w-auto" />
          </Link>

          {/* Search Bar - Center */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 mx-6">
            <div className="relative w-full max-w-xl">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for products, brands and more"
                className="w-full px-4 py-2 pr-12 rounded-lg text-gray-800 focus:outline-none font-medium focus:ring-2 focus:ring-blue-300 text-sm"
              />
              <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2">
                <FiSearch className="text-blue-600 text-xl" />
              </button>
            </div>
          </form>

          {/* Right Side Actions - Right */}
          <div className="hidden md:flex items-center gap-8 flex-shrink-0">
            {/* More Dropdown */}
            <div 
              className="relative" 
              ref={moreDropdownRef}
              onMouseEnter={() => setIsMoreDropdownOpen(true)}
              onMouseLeave={() => setIsMoreDropdownOpen(false)}
            >
              <button className="text-white font-medium hover:opacity-90 transition flex items-center gap-1">
                More
                <FiChevronDown className="text-lg" />
              </button>

              {/* More Dropdown Menu */}
              {isMoreDropdownOpen && (
                <div className="absolute top-full right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 overflow-hidden backdrop-blur-sm">
                  <div className="p-3 space-y-1">
                    <button
                      onClick={() => {
                        // Handle Notification Preferences
                        setIsMoreDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:text-blue-600 transition-all duration-200 rounded-lg border-l-4 border-l-transparent hover:border-l-blue-600"
                    >
                      <FiBell className="text-xl" />
                      <span className="font-medium">Notification Preferences</span>
                    </button>
                    <button
                      onClick={() => {
                        openChat();
                        setIsMoreDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:text-blue-600 transition-all duration-200 rounded-lg border-l-4 border-l-transparent hover:border-l-blue-600"
                    >
                      <FiMessageCircle className="text-xl" />
                      <span className="font-medium">24x7 Customer Care</span>
                    </button>
                    <button
                      onClick={() => {
                        // Handle Advertise
                        setIsMoreDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:text-blue-600 transition-all duration-200 rounded-lg border-l-4 border-l-transparent hover:border-l-blue-600"
                    >
                      <FiTrendingUp className="text-xl" />
                      <span className="font-medium">Advertise</span>
                    </button>
                    <button
                      onClick={() => {
                        // Handle Download App
                        setIsMoreDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:text-blue-600 transition-all duration-200 rounded-lg border-l-4 border-l-transparent hover:border-l-blue-600"
                    >
                      <FiDownload className="text-xl" />
                      <span className="font-medium">Download App</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {!user ? (
              <>
                <Link to="/login" className="text-white font-medium hover:opacity-90 transition">
                  Login
                </Link>
                <Link to="/signup" className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition duration-300 shadow-lg">
                  Sign Up
                </Link>
              </>
            ) : (
              <>
                <Link to="/cart" className="relative group">
                  <FiShoppingCart className="text-2xl text-white hover:opacity-80 transition" />
                  {cartCount > 0 && (
                    <span className={`absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center transition-all shadow-lg ${
                      isCartAnimating ? 'scale-125 animate-pulse' : 'scale-100'
                    }`}>
                      {cartCount}
                    </span>
                  )}
                </Link>

                <div className="flex items-center gap-4 relative" ref={dropdownRef}>
                  <span className="text-sm text-white font-medium">Hi, {user.name}</span>
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="cursor-pointer hover:opacity-80 transition"
                  >
                    <FiUser className="text-2xl text-white" />
                  </button>

                  {/* Custom Dropdown Menu */}
                  {isDropdownOpen && (
                    <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 z-50 overflow-hidden">
                      <Link
                        to="/profile"
                        onClick={() => setIsDropdownOpen(false)}
                        className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition"
                      >
                        Profile
                      </Link>
                      <Link
                        to="/orders"
                        onClick={() => setIsDropdownOpen(false)}
                        className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition border-t border-gray-100"
                      >
                        My Orders
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 transition border-t border-gray-100 flex items-center gap-2"
                      >
                        <FiLogOut className="text-lg" />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <FiX className="text-2xl" /> : <FiMenu className="text-2xl" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-blue-400 pt-4 flex flex-col gap-4">
            <Link to="/" className="text-white hover:opacity-80 transition font-medium">
              Home
            </Link>
            <Link to="/products" className="text-white hover:opacity-80 transition font-medium">
              Products
            </Link>
            {user && (
              <>
                <Link to="/cart" className="text-white hover:opacity-80 transition flex items-center gap-2 font-medium">
                  <FiShoppingCart /> Cart {cartCount > 0 && `(${cartCount})`}
                </Link>
                <Link to="/profile" className="text-white hover:opacity-80 transition font-medium">
                  Profile
                </Link>
                <Link to="/orders" className="text-white hover:opacity-80 transition font-medium">
                  My Orders
                </Link>
                {isAdmin() && (
                  <Link to="/admin" className="text-white hover:opacity-80 transition font-medium">
                    Admin Panel
                  </Link>
                )}
                <button onClick={handleLogout} className="text-red-200 hover:text-red-100 transition text-left font-medium">
                  Logout
                </button>
              </>
            )}
            {!user && (
              <>
                <Link to="/login" className="text-white hover:opacity-80 transition font-medium">
                  Login
                </Link>
                <Link to="/signup" className="bg-white text-blue-600 px-6 py-2 rounded-lg hover:bg-gray-100 transition text-center font-semibold">
                  Sign Up
                </Link>
              </>
            )}
          </nav>
        )}
      </div>
    </header>
  );
}
