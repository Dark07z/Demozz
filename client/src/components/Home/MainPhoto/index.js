import React, { useEffect, useState, useRef } from "react";
import Hls from "hls.js";
import "./sliderMain.css";

const MainPhoto = () => {
  const slides = [
    {
      id: 1,
      desktopImage:
        "https://static.nike.com/a/images/f_auto/dpr_2.0,cs_srgb/w_3000,c_limit/82fb4552-d2d4-48b8-af7d-6623bebf5f50/nike-just-do-it.png",
      overline: "",
      title: "WELCOME TO THE DARK SIDE OF\nFUTEBOL",
      description: "Brasil Futebol x Jordan Brand. Consider this a warning.",
      buttons: ["Shop"],
      mediaType: "image",
    },
    {
      id: 2,
      videoUrl: "https://api.nike.com/content/asset_video_manifest/v1/6389081378112",
      overline: "",
      title: "AIR MAX 95",
      description: "Above the Influence",
      buttons: ["Shop", "Watch"],
      mediaType: "video",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const videoRefs = useRef([]);

  useEffect(() => {
    const autoSlide = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, 10000);

    return () => clearInterval(autoSlide);
  }, [slides.length]);

  useEffect(() => {
    slides.forEach((slide, idx) => {
      if (slide.mediaType !== "video") return;
      const video = videoRefs.current[idx];
      if (!video) return;
      const src = slide.videoUrl;
      if (Hls.isSupported()) {
        if (video._hlsInstance) return;
        const hls = new Hls();
        hls.loadSource(src);
        hls.attachMedia(video);
        video._hlsInstance = hls;
      }
    });

  }, [slides]);

  useEffect(() => {
    videoRefs.current.forEach((v, idx) => {
      if (idx === activeIndex) {
        v.muted = true;
        v.play();
      } else {
        try {
          v.pause();
        } catch (e) {}
      }
    });
  }, [activeIndex]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % slides.length);
  };

  const handleDotClick = (index) => {
    if (index === activeIndex) return;
    setActiveIndex(index);
  };

  return (
    <section className="main-hero-slider">
      <div className="hero-media">
        <div
          className="hero-media-track"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div key={slide.id} className="hero-media-slide">
              {slide.mediaType === "image" ? (
                <img
                  className="hero-desktop hidden lg:block xl:block md:block"
                  src={slide.desktopImage}
                  alt={slide.title}
                />
              ) : slide.mediaType === "video" ? (
                <video
                  ref={(el) => (videoRefs.current[index] = el)}
                  className="hero-video"
                  autoPlay={index === activeIndex}
                  muted
                  loop
                  playsInline
                  preload="metadata"
                >
                  <source src={slide.videoUrl} type="application/x-mpegURL" />
                </video>
              ) : null}
            </div>
          ))}
        </div>
      </div>

      <div className="hero-caption-wrapper">
        <div
          className="hero-caption-track"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {slides.map((slide) => (
            <div key={`caption-${slide.id}`} className="hero-caption">
              {slide.overline ? <p className="hero-overline">{slide.overline}</p> : null}
              <h2 className="hero-title">{slide.title}</h2>
              <p className="hero-description">{slide.description}</p>
              <div className="hero-buttons">
                {slide.buttons.map((label) => (
                  <button key={label} type="button">
                    {label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="hero-controls">
          <div className="hero-dots">
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                type="button"
                role="tab"
                className={activeIndex === index ? "dot active" : "dot"}
                onClick={() => handleDotClick(index)}
              >
              </button>
            ))}
          </div>

          <div className="hero-arrows">
            <button type="button" onClick={handlePrev}>
              <i className="fa-solid fa-chevron-left"></i>
            </button>
            <button type="button" onClick={handleNext}>
              <i className="fa-solid fa-chevron-right"></i>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainPhoto;
