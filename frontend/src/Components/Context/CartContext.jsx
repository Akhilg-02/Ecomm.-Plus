import { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    setCart((prevCart) => [...prevCart, item]);
  };

  const value = {
    cart,
    setCart,
    addToCart,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
