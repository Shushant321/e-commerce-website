import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "../styles/BannerSlider.css";

import banner1 from "../assets/img1.jpg";
import banner2 from "../assets/img2.jpg";
import banner3 from "../assets/img3.jpg";
import banner4 from "../assets/img4.jpg";
import banner5 from "../assets/img5.png";
import banner6 from "../assets/img6.jpg";
import banner7 from "../assets/img7.png";

const BannerSlider = () => {
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setImages([banner1, banner2, banner3, banner4, banner5, banner6, banner7]);
      setLoading(false);
    }, 2000);
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    arrows: true,
  };

  return (
    <div className="amazon-banner-wrapper">
      <div className="banner-container">
        {loading ? (
          <div className="shimmer-banner" />
        ) : (
          <Slider {...settings}>
            {images.map((img, idx) => (
              <img key={idx} src={img} alt={`Banner ${idx}`} className="amazon-banner-img" />
            ))}
          </Slider>
        )}
      </div>
    </div>
  );
};

export default BannerSlider;
