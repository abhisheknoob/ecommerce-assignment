import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchProductById } from '../api';
import { CartContext } from '../context/CartContext';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const store = useContext(CartContext);

  useEffect(() => {
    async function load() {
      const p = await fetchProductById(id);
      setProduct(p);
    }
    load();
  }, [id]);

  if (!product) return <div>Loading...</div>;

  return (
    <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
      <img src={product.image} alt={product.title} style={{ width: 300, height: 300, objectFit: 'contain' }} />
      <div style={{ flex: 1 }}>
        <h2>{product.title}</h2>
        <p>{product.description}</p>
        <div style={{ fontSize: 20, marginBottom: 12 }}>${product.price}</div>
        <button onClick={() => { store.add(product); alert('Added to cart'); }}>Add to MyCart</button>
        <div style={{ marginTop: 12 }}><Link to="/">Back to Home</Link></div>
      </div>
    </div>
  );
}
