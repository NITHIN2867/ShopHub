export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-slate-900 to-slate-950 text-white mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">About ShopHub</h3>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-blue-400 transition duration-300">About Us</a></li>
              <li><a href="#" className="hover:text-blue-400 transition duration-300">Careers</a></li>
              <li><a href="#" className="hover:text-blue-400 transition duration-300">Press</a></li>
              <li><a href="#" className="hover:text-blue-400 transition duration-300">Blog</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Help</h3>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-blue-400 transition duration-300">Contact Us</a></li>
              <li><a href="#" className="hover:text-blue-400 transition duration-300">Track Orders</a></li>
              <li><a href="#" className="hover:text-blue-400 transition duration-300">FAQ</a></li>
              <li><a href="#" className="hover:text-blue-400 transition duration-300">Returns</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Policy</h3>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-blue-400 transition duration-300">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-blue-400 transition duration-300">Terms of Service</a></li>
              <li><a href="#" className="hover:text-blue-400 transition duration-300">Shipping Policy</a></li>
              <li><a href="#" className="hover:text-blue-400 transition duration-300">Refund Policy</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Connect</h3>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-blue-400 transition duration-300">Facebook</a></li>
              <li><a href="#" className="hover:text-blue-400 transition duration-300">Twitter</a></li>
              <li><a href="#" className="hover:text-blue-400 transition duration-300">Instagram</a></li>
              <li><a href="#" className="hover:text-blue-400 transition duration-300">LinkedIn</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">&copy; 2025 ShopHub. All rights reserved.</p>
            <div className="flex gap-4 mt-4 md:mt-0 text-gray-400 text-sm">
              <span className="hover:text-blue-400 transition duration-300">Secure Shopping Guaranteed</span>
              <span className="hover:text-blue-400 transition duration-300">100% Authentic Products</span>
              <span className="hover:text-blue-400 transition duration-300">Fast Delivery</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
