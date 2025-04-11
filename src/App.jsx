import { Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect } from "react"; // ✅ Add useEffect
import AOS from "aos"; // ✅ Import AOS
import "aos/dist/aos.css"; // ✅ Import AOS CSS

import ProductDetail from "./pages/ProductDetail";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Footer from "./components/Footer";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();

  const showNavbar = location.pathname !== "/";

  // ✅ Initialize AOS
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <>
      {showNavbar && <Navbar setSearchTerm={setSearchTerm} />}

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home searchTerm={searchTerm} />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>

      {showNavbar && <Footer />}
    </>
  );
}

export default App;
