import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import ImageViewer from "react-simple-image-viewer";
import { useState, useEffect } from "react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./ImageSlider.css";

function ImageSlider() {
  const [imgs, setImgs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    async function fetchSliderImages() {
      try {
        const res = await fetch("http://localhost:5000/slider-images");
        const data = await res.json();
        setImgs(data.data || data);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }

    }
    fetchSliderImages();
  }, []);

  const openViewer = (realIndex) => {
    if (window.innerWidth <= 768) return;
    setCurrentIndex(realIndex);
    setIsOpen(true);
  };

  const closeViewer = () => setIsOpen(false);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading faculty...</p>
      </div>
    );
  }

  return (
    <>
      <div className="img-slider">
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 5000 }}
          pagination={{ clickable: true }}
          navigation
          onSlideChange={(swiper) => {
            setCurrentIndex(swiper.realIndex);
          }}
        >
          {imgs.map((img, index) => (
            <SwiperSlide key={index}>
              <img
                className="slide-img"
                src={img}
                alt="slider"
                onClick={(e) => {
                  const swiper = e.target.closest(".swiper")?.swiper;
                  openViewer(swiper.realIndex);
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {isOpen && (
        <ImageViewer
          src={imgs}
          currentIndex={currentIndex}
          disableScroll={false}
          closeOnClickOutside={true}
          onClose={closeViewer}
        />
      )}
    </>
  );
}

export default ImageSlider;