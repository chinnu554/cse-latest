import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./ImageSlider.css";
import slideImg1 from '../assets/slider1.png'
import slideImg2 from '../assets/slider2.png'
import slideImg3 from '../assets/slider3.png'

function ImageSlider() {
  return (
    <>
    <div className="img-slider">
    <Swiper
      modules={[Autoplay, Pagination, Navigation]}
      spaceBetween={20}
      slidesPerView={1}
      loop={true}
      autoplay={{ delay: 5000 }}
      pagination={{ clickable: true }}
      navigation
      className="slider"
    >
      <SwiperSlide>
        <img className="slide-img" src={slideImg1} alt="slide 1" />
      </SwiperSlide>

      <SwiperSlide>
        <img className="slide-img" src={slideImg2} alt="slide 2" />
      </SwiperSlide>

      <SwiperSlide>
        <img className="slide-img" src={slideImg3} alt="slide 3" />
      </SwiperSlide>
    </Swiper>

    </div>
    </>
  );
}

export default ImageSlider;
