import { Routes, Route, useLocation } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import About from './pages/About';

// Keying routes on pathname re-triggers the animate-page animation on each navigation
function AnimatedRoutes() {
  const location = useLocation();
  return (
    <Routes location={location} key={location.pathname}>
      <Route path="/"             element={<Home />} />
      <Route path="/products"     element={<Products />} />
      <Route path="/products/:id" element={<ProductDetails />} />
      <Route path="/cart"         element={<Cart />} />
      <Route path="/checkout"     element={<Checkout />} />
      <Route path="/about"        element={<About />} />
      {/* Catch-all */}
      <Route path="*"             element={<Home />} />
    </Routes>
  );
}

export default function App() {
  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <main id="main-content" className="flex-1">
          <AnimatedRoutes />
        </main>
        <Footer />
      </div>
    </CartProvider>
  );
}
