import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import logo1 from '../images/abstract01.jpg';
import logo2 from '../images/abstract02.jpg';
import logo3 from '../images/abstract03.jpg';
import logo4 from '../images/abstract04.jpg';

const images = [
    { src: logo1 },
    { src: logo2 },
    { src: logo3 },
    { src: logo4 },
  ];

const Carousel = () => {
  var settings = {
    customPaging: function (i) {
        return (
          <a >
            <img style={{width: "100%"}} src={images[i].src} />
          </a>
        );
      },
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <Slider {...settings}>
      {images.map((img) => (
            <div>
              <img style={{width: "100%", height:"850px"}} src={img.src} />
            </div>
          ))}
    </Slider>
  );
};

export default Carousel;
