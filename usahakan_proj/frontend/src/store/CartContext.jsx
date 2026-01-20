import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });
  const [cartSelected, setCartSelected] = useState(() => {
    const saved = localStorage.getItem("cartSelected");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("cartSelected", JSON.stringify(cartSelected));
  }, [cartSelected, cart]);

  const addToCart = (item) => {
    setCart((prev) => [...prev, item]);
    console.log("cart added");
  };

  const removeFromCart = (indexToRemove) => {
    setCartSelected((prevSelectedCart) =>
      prevSelectedCart
        .filter((item) => item.indexIn !== indexToRemove)
        .map((item) => ({
          ...item,
          indexIn:
            item.indexIn > indexToRemove ? item.indexIn - 1 : item.indexIn,
        }))
    );
    setCart((prevCart) =>
      prevCart.filter((_, index) => index !== indexToRemove)
    );
  };

  const clearCart = () => setCart([]);

  const newSelected = (index, item) => {
    setCartSelected((prev) => {
      const exist = prev.some((item) => item.indexIn === index);
      // console.log(index, item);
      if (exist) {
        return prev.filter((item) => item.indexIn !== index);
      } else {
        return [...prev, { ...item, indexIn: index }];
      }
    });
  };
  console.log(cartSelected);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        cartSelected,
        newSelected,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => useContext(CartContext);

export { CartProvider, useCart };
