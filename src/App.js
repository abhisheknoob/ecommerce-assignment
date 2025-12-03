import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import ProductDetail from './components/ProductDetail';
import CartPage from './components/CartPage';
import { CartProvider } from './context/CartContext';

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <header style={{ padding: 12, borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ fontWeight: 700 }}><Link to="/" style={{ textDecoration: 'none' }}>ShopDemo</Link></div>
          <nav>
            <Link to="/cart">Cart</Link>
          </nav>
        </header>
        <main style={{ padding: 12, paddingBottom: 80 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id/details" element={<ProductDetail />} />
            <Route path="/cart" element={<CartPage />} />
          </Routes>
        </main>
      </BrowserRouter>
    </CartProvider>
  );
}
