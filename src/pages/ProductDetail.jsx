import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [activeImage, setActiveImage] = useState("");

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data);
        setActiveImage(data.thumbnail); // default main image

        // Fetch related products
        fetch(`https://dummyjson.com/products/category/${data.category}`)
          .then(res => res.json())
          .then(rel => {
            // exclude current product
            const filtered = rel.products.filter(p => p.id !== data.id);
            setRelated(filtered.slice(0, 4)); // just 4 related items
          });
      });
  }, [id]);

  if (!product) return <p style={{ textAlign: "center" }}>Loading...</p>;

  return (
    <div style={{ padding: "40px" }}>
      {/* Product Info */}
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        gap: "40px",
        flexWrap: "wrap",
        marginBottom: "40px"
      }}>
        {/* Image + Gallery */}
        <div>
          <img
            src={activeImage}
            alt={product.title}
            style={{
              width: "320px",
              height: "320px",
              objectFit: "cover",
              borderRadius: "10px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
            }}
          />

          {/* Thumbnails */}
          <div style={{ marginTop: "10px", display: "flex", gap: "10px", flexWrap: "wrap" }}>
            {product.images?.map((img, index) => (
              <img
                key={index}
                src={img}
                alt=""
                onClick={() => setActiveImage(img)}
                style={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "6px",
                  objectFit: "cover",
                  border: img === activeImage ? "2px solid #1f2937" : "1px solid #ccc",
                  cursor: "pointer"
                }}
              />
            ))}
          </div>
        </div>

        {/* Info + Actions */}
        <div style={{ maxWidth: "500px" }}>
          <h2 style={{ marginBottom: "10px" }}>{product.title}</h2>
          <p style={{ color: "#666", marginBottom: "15px" }}>{product.description}</p>
          <p style={{ fontWeight: "bold", fontSize: "18px", color: "#16a34a" }}>₹{product.price}</p>
          <p>⭐ {product.rating} / 5</p>

          <button
            onClick={() => addToCart(product)}
            style={{
              marginTop: "20px",
              padding: "10px 20px",
              backgroundColor: "#1f2937",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer"
            }}
          >
            Add to Cart
          </button>

          <br />
          <button
            onClick={() => navigate("/home")}
            style={{
              marginTop: "10px",
              padding: "8px 16px",
              backgroundColor: "#e2e8f0",
              color: "#1f2937",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer"
            }}
          >
            ⬅️ Back to Home
          </button>
        </div>
      </div>

      {/* Related Items */}
      {related.length > 0 && (
        <div style={{ marginTop: "30px" }}>
          <h3>Related Products</h3>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: "20px",
            marginTop: "15px"
          }}>
            {related.map((item) => (
              <div
                key={item.id}
                onClick={() => navigate(`/product/${item.id}`)}
                style={{
                  cursor: "pointer",
                  border: "1px solid #ddd",
                  padding: "10px",
                  borderRadius: "8px",
                  backgroundColor: "#fff",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                  transition: "transform 0.2s ease"
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.03)"}
                onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
              >
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  style={{
                    width: "100%",
                    height: "130px",
                    objectFit: "cover",
                    borderRadius: "6px",
                    marginBottom: "10px"
                  }}
                />
                <p style={{ fontWeight: "bold" }}>{item.title.slice(0, 25)}...</p>
                <p style={{ color: "#16a34a" }}>₹{item.price}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
