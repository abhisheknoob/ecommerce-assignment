# E-commerce

This is a frontend-only React project that uses functional components, React Router, MobX + Context for cart state,
and fetches data directly from https://fakestoreapi.com (no backend/proxy).

## How to run locally
1. Run `npm install`
2. Run `npm start` (this uses react-scripts)

API endpoints used directly from frontend:
- https://fakestoreapi.com/products
- https://fakestoreapi.com/products/categories
- https://fakestoreapi.com/products/category/:category
- https://fakestoreapi.com/products/:id

## Notes
- All API calls are made directly from the browser to the fakestoreapi.com.
- Inline styles are used for responsiveness.
- MobX store persists cart in localStorage.
- Cypress scaffold included under `cypress/e2e`.
