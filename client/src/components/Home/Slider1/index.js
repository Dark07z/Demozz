import React, { useRef, useState } from "react";
import Slider from "react-slick";
import "./Slider1.css";

const Slider1 = () => {
  const sliderRef = useRef();
  const products = [
    {
      name: "Nike Astrograbber Leather",
      category: "Women's shoes",
      price: "3,519,000₫",
      image:
        "https://static.nike.com/a/images/q_auto:eco/t_product_v1/f_auto/dpr_1.0/h_594,c_limit/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/59e7dabe-2741-4c89-a3bd-08f02eee03db/W+NIKE+ASTROGRABBER+LTHR.png",
      alt: "Nike Astrograbber Leather",
    },
    {
      name: "KD18 'Warning Label'",
      category: "Basketball Shoes",
      price: "4,409,000₫",
      image:
        "https://static.nike.com/a/images/q_auto:eco/t_product_v1/f_auto/dpr_1.0/h_594,c_limit/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/9f66ddc2-d965-4eb1-bb52-ab9d59f5fde9/KD18+GI.png",
      alt: "KD18 Warning Label",
    },
    {
      name: "Nike Energy",
      category: "Men's Dri-FIT Soccer Long-Sleeve Football Top",
      price: "1,839,000₫",
      image:
        "https://static.nike.com/a/images/q_auto:eco/t_product_v1/f_auto/dpr_1.0/h_594,c_limit/c02b51ec-5470-4468-bf7d-2cbcd0dcb41f/AS+M+NK+DF+ENERGY+TOP+LS.png",
      alt: "Nike Energy",
    },
    {
      name: "Nike",
      category: "Women's Golf Polo Dress",
      price: "2,499,000₫",
      image:
        "https://static.nike.com/a/images/q_auto:eco/t_product_v1/f_auto/dpr_1.0/w_594,c_limit/dec81d47-4188-405f-a126-37c47c665e87/zoomx-vaporfly-next-2-yol-yarış-ayakkabısı-wttWqR.png",
      alt: "Nike",
    },
    {
      name: "Nike Victory",
      category: "Women's Dri-FIT Short-Sleeve Golf Polo",
      price: "1,379,000₫",
      image:
        "https://static.nike.com/a/images/q_auto:eco/t_product_v1/f_auto/dpr_1.0/h_594,c_limit/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/86d40528-5d48-4d89-8bca-a47331c869a2/AS+W+NK+DF+VCTRY+SS+POLO.png",
      alt: "Nike Victory",
    },
  ];
  const [currentSlide, setCurrentSlide] = useState(0);
  const slidesToShow = 3;
  const maxIndex = Math.max(products.length - slidesToShow, 0);

  const isPrevDisabled = currentSlide === 0;
  const isNextDisabled = currentSlide >= maxIndex;

  const settings = {
    dots: false,
    infinite: false,
    speed: 400,
    slidesToShow: 3,
    slidesToScroll: 1,
    draggable: false,
    arrows: false,
    afterChange: (index) => setCurrentSlide(index),
  };
  return (
    <div className="slider1-section mb-20">
      <div className="flex justify-between items-end mr-10 mb-5 mt-10">
        <span className="text-2xl">The Green Edit</span>
        <div className="Slider-Buttons">
          <button
            className={isPrevDisabled ? "is-disabled" : ""}
            disabled={isPrevDisabled}
            onClick={() => {
              if (!isPrevDisabled) sliderRef.current?.slickPrev();
            }}
          >
            <i className="fa-solid fa-chevron-left"></i>
          </button>
          <button
            className={isNextDisabled ? "is-disabled" : ""}
            disabled={isNextDisabled}
            onClick={() => {
              if (!isNextDisabled) sliderRef.current?.slickNext();
            }}
          >
            <i className="fa-solid fa-chevron-right"></i>
          </button>
        </div>
      </div>

      <Slider ref={sliderRef} {...settings}>
        {products.map((product) => (
          <div key={product.name} className="hover:opacity-70 duration-300 cursor-pointer">
            <img src={product.image} alt={product.alt} />
            <div className="mt-4 flex flex-col">
              <span>{product.name}</span>
              <span className="opacity-50">{product.category}</span>
              <span className="mr-10">{product.price}</span>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Slider1;
