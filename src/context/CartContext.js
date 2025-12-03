import React, { createContext } from 'react';
import cartStore from '../stores/cartStore';

export const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  return <CartContext.Provider value={cartStore}>{children}</CartContext.Provider>;
};
