import React from "react";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/Cart.css";

const Cart = () => {
  const { cartItems, removeFromCart, clearCart } = useCart();
  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  const handleRemove = (id) => {
    removeFromCart(id);
    toast.info("❌ Item removed from cart");
  };

  const handleCheckout = () => {
    const confirmed = window.confirm("Are you sure you want to place this order?");
    if (confirmed) {
      clearCart();
      toast.success("✅ Order placed successfully!");
    } else {
      toast.info("🛑 Order cancelled");
    }
  };

  return (
    <div className="cart-container">
      <h2 className="cart-title">🛒 Your Cart</h2>

      {cartItems.length === 0 ? (
        <p className="cart-empty">Cart is empty :) </p>
      ) : (
        <>
          <div className="cart-items-wrapper">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.thumbnail} alt={item.title} className="cart-item-img" />
                <div className="cart-item-info">
                  <h3>{item.title}</h3>
                  <p>Price: ₹{item.price}</p>
                  <button className="cart-remove-btn" onClick={() => handleRemove(item.id)}>
                    ❌ Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-total">
            <h3>Total: ₹{total.toFixed(2)}</h3>
            <button className="cart-checkout-btn" onClick={handleCheckout}>
              ✅ Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
