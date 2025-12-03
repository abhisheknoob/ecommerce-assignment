import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchProducts, fetchCategories } from '../api';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadCategories();
    loadProducts();
  }, []);

  async function loadCategories() {
    try {
      const cats = await fetchCategories();
      setCategories(cats);
    } catch (e) {
      console.error(e);
    }
  }

  async function loadProducts(category = '') {
    setLoading(true);
    try {
      const q = category ? `/category/${encodeURIComponent(category)}` : '';
      const res = await fetch(`https://fakestoreapi.com/products${q}`);
      const data = await res.json();
      setProducts(data);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  }

  const onCategoryClick = (cat) => {
    const selected = selectedCategory === cat ? '' : cat;
    setSelectedCategory(selected);
    loadProducts(selected);
    const url = selected ? `/?category=${encodeURIComponent(selected)}` : '/';
    window.history.pushState({}, '', url);
  };

  const grid = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 };

  return (
    <div>
      <h2>Products</h2>
      <div style={{ marginBottom: 12 }}>
        <strong>Categories:</strong>
        {categories.map(cat => (
          <button key={cat} onClick={() => onCategoryClick(cat)} style={{ marginLeft: 8 }}>{cat}</button>
        ))}
      </div>
      {loading ? <div>Loading...</div> : (
        <div style={grid}>
          {products.map(p => (
            <div key={p.id} style={{ border: '1px solid #ddd', padding: 12, borderRadius: 8 }}>
              <Link to={`/product/${p.id}/details`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <img src={p.image} alt={p.title} style={{ width: '100%', height: 160, objectFit: 'contain' }} />
                <h4 style={{ fontSize: 16 }}>{p.title}</h4>
              </Link>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>${p.price}</div>
                <Link to={`/product/${p.id}/details`}><button>Add</button></Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
