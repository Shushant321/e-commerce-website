import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./../styles/Navbar.css";

// ✅ Step 1: Accept setSearchTerm as a prop
const Navbar = ({ setSearchTerm , cartIconRef }) => {
  const { cartItems } = useCart();
  const user = JSON.parse(localStorage.getItem("app_user"));
  const username = user?.name || "Guest";

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("app_user");
    window.location.href = "/"; // Force redirect to login
  };

  return (
    <nav className="navbar">
      <div className="navbar__left">
        <Link to="/home" className="navbar__home navbar__link"> Home </Link>
        <Link to="/cart" ref={cartIconRef} className="navbar__cart navbar__link">
          🛒Cart <span>{cartItems.length}</span>
        </Link>
      </div>

      <div className="navbar__searchWrapper">
        <input
          type="text"
          placeholder="Search products..."
          className="navbar__search"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="navbar__searchBtn">🔍</button>
      </div>

      <div className="navbar__right">
        <span className="navbar__welcome"> Hello, {username}</span>
        <button onClick={handleLogout} className="navbar__logout ">
          🚪 Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
