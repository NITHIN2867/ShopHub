import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import Home from './pages/Home';
import Products from './pages/Products';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Orders from './pages/Orders';
import AdminDashboard from './pages/AdminDashboard';
import { useAuthStore } from './store/authStore';
import { ChatProvider } from './context/ChatContext';

function App() {
  const { isAuthenticated, isAdmin, initAuth } = useAuthStore();

  useEffect(() => {
    initAuth();
  }, [initAuth]);

  return (
    <ChatProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Header />

          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route
                path="/cart"
                element={isAuthenticated() ? <Cart /> : <Navigate to="/login" />}
              />
              <Route
                path="/orders"
                element={isAuthenticated() ? <Orders /> : <Navigate to="/login" />}
              />
              <Route
                path="/admin"
                element={isAuthenticated() && isAdmin() ? <AdminDashboard /> : <Navigate to="/login" />}
              />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>

          <Footer />
          <Chatbot />
        </div>
      </Router>
    </ChatProvider>
  );
}

export default App;
