import { useEffect, useState, useRef } from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import BannerSlider from "../components/BannerSlider";

// ✅ Utility function to fly image
const flyToCart = (imageEl, cartEl) => {
  const imgRect = imageEl.getBoundingClientRect();
  const cartRect = cartEl.getBoundingClientRect();

  const flyingImg = imageEl.cloneNode(true);
  flyingImg.style.position = "fixed";
  flyingImg.style.left = `${imgRect.left}px`;
  flyingImg.style.top = `${imgRect.top}px`;
  flyingImg.style.width = `${imgRect.width}px`;
  flyingImg.style.height = `${imgRect.height}px`;
  flyingImg.style.transition = "all 1s ease-in-out";
  flyingImg.style.zIndex = 1000;
  flyingImg.style.borderRadius = "8px";
  document.body.appendChild(flyingImg);

  setTimeout(() => {
    flyingImg.style.left = `${cartRect.left}px`;
    flyingImg.style.top = `${cartRect.top}px`;
    flyingImg.style.width = "0px";
    flyingImg.style.height = "0px";
    flyingImg.style.opacity = "0.5";
  }, 20);

  setTimeout(() => {
    flyingImg.remove();
  }, 1000);
};

const Home = ({ searchTerm }) => {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const cartIconRef = useRef(); // ✅ Ref to cart icon

  useEffect(() => {
    fetch("https://dummyjson.com/products?limit=100")
      .then(res => res.json())
      .then(data => setProducts(data.products));
  }, []);

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ padding: "20px" }}>

      {!searchTerm && <BannerSlider />}

      {searchTerm ? (
        <h2 style={{ margin: "30px 0", textAlign: "center" }}>
          🔍 Showing results for: <i>{searchTerm}</i>
        </h2>
      ) : (
        <h2 style={{ margin: "30px 0", textAlign: "center" }}>
          
        </h2>
      )}

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: '20px'
        }}
      >
        {filteredProducts.map((product) => (
          <Link
            key={product.id}
            to={`/product/${product.id}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div
              data-aos="slide-up"
              style={{
                border: '1px solid #ddd',
                borderRadius: '10px',
                padding: '10px',
                boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                backgroundColor: '#fff',
                transition: 'transform 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.06)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              <img
                src={product.thumbnail}
                alt={product.title}
                style={{
                  width: '100%',
                  height: '160px',
                  objectFit: 'cover',
                  borderRadius: '8px'
                }}
              />
              <h4 style={{ margin: "10px 0" }}>{product.title}</h4>
              <p style={{ fontWeight: "bold", color: "#16a34a" }}>₹{product.price}</p>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  const img = e.currentTarget.closest("div").querySelector("img");
                  flyToCart(img, cartIconRef.current); // ✅ Fly effect
                  addToCart(product); // ✅ Then add
                }}
                style={{
                  padding: "6px 12px",
                  background: "#1f2937",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer"
                }}
              >
                Add to Cart
              </button>
            </div>
          </Link>
        ))}
      </div>

      {/* Cart icon ref to pass to navbar */}
      <div style={{ display: "none" }}>
        <div ref={cartIconRef}></div>
      </div>
    </div>
  );
};

export default Home;
