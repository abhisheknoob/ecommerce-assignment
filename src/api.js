export const fetchProducts = async (query='') => {
  const q = query ? `?${query}` : '';
  const res = await fetch(`https://fakestoreapi.com/products${q}`);
  if (!res.ok) throw new Error('Failed to fetch products');
  return res.json();
}

export const fetchProductById = async (id) => {
  const res = await fetch(`https://fakestoreapi.com/products/${id}`);
  if (!res.ok) throw new Error('Failed to fetch product');
  return res.json();
}

export const fetchCategories = async () => {
  const res = await fetch('https://fakestoreapi.com/products/categories');
  if (!res.ok) throw new Error('Failed to fetch categories');
  return res.json();
}
