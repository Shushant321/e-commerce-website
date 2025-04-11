
import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";


// 1️⃣ Create context
const CartContext = createContext();

// 2️⃣ Custom hook to use cart
export const useCart = () => useContext(CartContext);

// 3️⃣ CartProvider component
export const CartProvider = ({ children }) => {
  // 🔄 Load cart from localStorage initially
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem("cartItems");
    return saved ? JSON.parse(saved) : [];
  });

  // 💾 Sync cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // ➕ Add item to cart
  const addToCart = (product) => {
    setCartItems(prev => [...prev, product]);
    toast.success();
  };

  // ❌ Remove item by ID
  const removeFromCart = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
    toast.info();
  };

  // 🧹 Clear the cart
  const clearCart = () => setCartItems([]);

  // 4️⃣ Provide context values
  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
