import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { observer } from 'mobx-react-lite';

const CartPage = observer(() => {
  const store = useContext(CartContext);
  const container = { paddingBottom: 80 };
  return (
    <div style={container}>
      <h2>Your Cart</h2>
      {store.items.length === 0 ? <div>Cart is empty</div> : (
        <div>
          {store.items.map(it => (
            <div key={it.product.id} style={{ display: 'flex', alignItems: 'center', gap: 12, borderBottom: '1px solid #eee', padding: 8 }}>
              <img src={it.product.image} alt="" style={{ width: 60, height: 60, objectFit: 'contain' }} />
              <div style={{ flex: 1 }}>
                <div>{it.product.title}</div>
                <div>${it.product.price} x {it.qty}</div>
              </div>
              <div>
                <button onClick={() => store.changeQty(it.product.id, Math.max(1, it.qty - 1))}>-</button>
                <button onClick={() => store.changeQty(it.product.id, it.qty + 1)}>+</button>
              </div>
            </div>
          ))}
          <div style={{ marginTop: 12 }}>Total items: {store.count} | Total: ${store.total.toFixed(2)}</div>
        </div>
      )}
    </div>
  );
});

export default CartPage;
