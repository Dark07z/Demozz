import React, { useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Slider2.css";

const Slider2 = () => {
  const sliderRef = useRef();
  const sportCards = [
    {
      title: "Running",
      alt: "Running",
      image:
        "https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/h_710,c_limit/1f6dcd2f-749b-412d-938b-abac8e505a10/nike-just-do-it.png",
    },
    {
      title: "Football",
      alt: "Football",
      image:
        "https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/h_710,c_limit/d6b91c33-af3b-4b08-811b-07f65e94c12c/nike-just-do-it.png",
    },
    {
      title: "Basketball",
      alt: "Basketball",
      image:
        "https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/h_710,c_limit/a6e005d8-11ca-4684-895e-2a6c9116ea43/nike-just-do-it.png",
    },
    {
      title: "Gym & Training",
      alt: "Gym & Training",
      image:
        "https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/h_710,c_limit/edf91243-2922-4f9e-95e4-df7f45d38f0b/nike-just-do-it.png",
    },
    {
      title: "Yoga",
      alt: "Yoga",
      image:
        "https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/h_710,c_limit/97703c04-744f-415d-934a-0ea52d4cbb25/nike-just-do-it.png",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const slidesToShow = 3;

  const maxIndex = Math.max(sportCards.length - slidesToShow, 0);

  const isPrevDisabled = currentSlide === 0;
  const isNextDisabled = currentSlide >= maxIndex;

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    draggable: false,
    arrows: true,
    afterChange: (index) => setCurrentSlide(index),
  };
  return (
    <div className="secondary-slider mb-20">
      <div className="flex justify-between items-end mr-10 mb-3">
        <span className="sm:text-2xl">Shop by Sport</span>
        <div className="Slider-Buttons">
          <button
            className={isPrevDisabled ? "is-disabled" : ""}
            disabled={isPrevDisabled}
            onClick={() => {
              if (!isPrevDisabled) sliderRef.current.slickPrev();
            }}
          >
            <i className="fa-solid fa-chevron-left"></i>
          </button>
          <button
            className={isNextDisabled ? "is-disabled" : ""}
            disabled={isNextDisabled}
            onClick={() => {
              if (!isNextDisabled) sliderRef.current.slickNext();
            }}
          >
            <i className="fa-solid fa-chevron-right"></i>
          </button>
        </div>
      </div>

      <Slider ref={sliderRef} {...settings}>
        {sportCards.map((item) => (
          <div key={item.title} className="sport-card hover:opacity-90 duration-300 cursor-pointer">
            <img src={item.image} alt={item.alt} />
            <div className="sport-title">{item.title}</div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Slider2;
