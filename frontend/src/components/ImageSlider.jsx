import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import ImageViewer from "react-simple-image-viewer";
import { useState, useEffect } from "react";
import Loading from "./Loading";
import { API_BASE_URL } from "../config/api";

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
        const res = await fetch(`${API_BASE_URL}/images/slider-images`);
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
    return <Loading message="Loading images..." minHeight="50vh" />;
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
              <div className="slide-img-container" style={{ aspectRatio: '16/9', width: '100%', overflow: 'hidden' }}>
                <img
                  className="slide-img"
                  src={img}
                  alt="slider"
                  loading={index === 0 ? "eager" : "lazy"}
                  width="100%"
                  height="100%"
                  style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                  onClick={(e) => {
                    const swiper = e.target.closest(".swiper")?.swiper;
                    openViewer(swiper.realIndex);
                  }}
                />
              </div>
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
          className="image-viewer"
          backgroundStyle={{
            zIndex: 10000
          }}
        />

      )}
    </>
  );
}

export default ImageSlider;