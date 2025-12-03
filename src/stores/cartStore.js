import { makeAutoObservable } from 'mobx';

class CartStore {
  items = [];

  constructor() {
    makeAutoObservable(this);
    try {
      const raw = localStorage.getItem('cart_v3');
      if (raw) this.items = JSON.parse(raw);
    } catch (e) {}
  }

  add(product) {
    const idx = this.items.findIndex(i => i.product.id === product.id);
    if (idx >= 0) this.items[idx].qty += 1;
    else this.items.push({ product, qty: 1 });
    this._persist();
  }

  changeQty(productId, qty) {
    const idx = this.items.findIndex(i => i.product.id === productId);
    if (idx >= 0) {
      this.items[idx].qty = qty;
      this._persist();
    }
  }

  get total() {
    return this.items.reduce((s, it) => s + it.product.price * it.qty, 0);
  }

  get count() {
    return this.items.reduce((s, it) => s + it.qty, 0);
  }

  _persist() {
    try {
      localStorage.setItem('cart_v3', JSON.stringify(this.items));
    } catch (e) {}
  }
}

const store = new CartStore();
export default store;
