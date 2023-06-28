import React, { useRef } from "react";
import { Carousel, Button, Image, Row, Space } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

export function ImageScroller({
  images,
  width,
  height,
  slidesToShow,
  slidesToScroll,
  carouselWidth,
  carouselHeight,
  containerStyle,
  onClick,
  ...props
}) {
  const imageSliderRef = useRef(null);
  const SampleNextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "block",
          //  background: "yellow",
          fontSize: 21,
          //width: "auto",
          height: "auto",
          marginTop: -25,
          marginLeft: -20,
        }}
        onClick={onClick}
      >
        <RightOutlined
          onClick={onClick}
          style={{
            color: "var(--primary-navy-blue)",
            fontSize: 30,
            stroke: "var(--primary-navy-blue)",
            strokeWidth: 50,
          }}
        />
      </div>
    );
  };

  const SamplePrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "block",
          //     background: "green",
          fontSize: 21,
          height: "auto",
          marginTop: -25,
          marginLeft: -10,
        }}
        onClick={onClick}
      >
        <LeftOutlined
          onClick={onClick}
          style={{
            color: "var(--primary-navy-blue)",
            fontSize: 30,
            stroke: "var(--primary-navy-blue)",
            strokeWidth: 50,
          }}
        />
      </div>
    );
  };
  const settings = {
    slidesToShow: slidesToShow || 3.2,
    slidesToScroll: slidesToScroll || 1.3,

    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <div
      className="carousel-container"
      style={{
        width: carouselWidth,
        height: carouselHeight,
        ...containerStyle,
      }}
    >
      <Carousel {...props} {...settings} ref={imageSliderRef}>
        {images.map((image, index) => (
          <div key={index} className="carousel-image">
            <img
              key={image.key}
              src={image.src}
              alt={image.alt}
              style={{ width, height, borderRadius: 8 }}
              onClick={onClick(image.src)}
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
}
