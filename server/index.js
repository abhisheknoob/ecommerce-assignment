
const express = require('express');
const got = require('got');
const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

// Proxy: list products (optionally by category)
app.get('/api/products', async (req, res) => {
  try {
    // support ?limit= and ?sort= etc by passing to fakestoreapi if provided
    const qs = new URLSearchParams(req.query).toString();
    const url = `https://fakestoreapi.com/products${qs ? '?'+qs : ''}`;
    const response = await got(url, { responseType: 'json' });
    res.json(response.body);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Proxy: get single product
app.get('/api/products/:id', async (req, res) => {
  try {
    const url = `https://fakestoreapi.com/products/${req.params.id}`;
    const response = await got(url, { responseType: 'json' });
    res.json(response.body);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Proxy: get categories
app.get('/api/categories', async (req, res) => {
  try {
    const url = 'https://fakestoreapi.com/products/categories';
    const response = await got(url, { responseType: 'json' });
    res.json(response.body);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server listening on port ${PORT}`);
});
