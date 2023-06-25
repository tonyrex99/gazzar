import React from "react";
import { Carousel, Grid } from "antd";
import LeftBackgroundImage from "./assets/slideshow/slideBg.png";
import Slide1 from "./assets/slideshow/slide1.png";
import Slide2 from "./assets/slideshow/slide2.png";
import Slide3 from "./assets/slideshow/slide3.png";
import "./login.css";
import { useState } from "react";

export default function WelcomeLeft({ content, successSlide, key }) {
  const screens = Grid.useBreakpoint();

  const slides = [
    {
      image: Slide1,
      title: "Manage your business digitally.",
      description:
        "Save yourself the stress of manually documenting various aspects of your business. Customers, sales, and store products can be managed with Gazzar.",
    },
    {
      image: Slide2,
      title: "Setup your store website.",
      description:
        "Having a customized website makes your business stand out as a professional, and it also makes it easier for your customers to see all your products.",
    },
    {
      image: Slide3,
      title: "Business analytics.",
      description:
        "See simplified metrics of how your business is performing and get tips on how to improve your sales.",
    },
  ];
  const [currentSlides, setcurrentSlides] = useState(
    content ? content : slides
  );
  return (
    <div
      key={key}
      style={{
        display: "flex",
        backgroundImage: `url(${LeftBackgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        flexDirection: "column",
        width: screens.lg ? "50%" : "100%",
      }}
    >
      <div
        style={{
          fontFamily: "Satoshi-Bold",
          fontSize: 36,
          alignSelf: "flex-start",
          marginTop: 76,
          marginLeft: 48,
          marginBottom: 20,
          color: "white",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: 32,
            borderRadius: 5,
            height: 32,
            marginRight: 15,
            background: "var(--secondary-gold)",
          }}
        />
        Gazzar
      </div>
      {screens.sm && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            width: currentSlides.length < 2 ? "100%" : "80%",
            marginRight: 100,
            flexDirection: "column",
          }}
        >
          {currentSlides.length === 1 ? (
            <div
              style={{
                width: "inherit",
                marginRight: 200,
                marginLeft: 100,
              }}
            >
              <img
                src={currentSlides[0].image}
                width={currentSlides[0].width}
                height={currentSlides[0].height}
                style={{
                  alignSelf: "center",
                  justifySelf: "center",
                  width: "100%",
                  maxWidth: currentSlides[0].width || 533,
                  minHeight: 103,
                  minWidth: 255,
                  marginLeft: currentSlides.length < 2 && 50,
                  marginBottom: 20,
                }}
              />
              <div
                style={{
                  fontFamily: "Satoshi-Bold",
                  fontSize: 40,
                  color: "white",
                  marginLeft: currentSlides.length < 2 && 50,
                }}
              >
                {currentSlides[0].title}
              </div>
              <div
                style={{
                  fontFamily: "Satoshi-Regular",
                  fontSize: 20,
                  color: "#8398b3",
                  marginBottom: 100,
                  marginTop: 25,
                  marginLeft: currentSlides.length < 2 && 50,
                }}
              >
                {currentSlides[0].description}
              </div>
            </div>
          ) : (
            <Carousel
              autoplay
              className="login-slides-carousel"
              style={{
                width: "inherit",
                marginLeft: 200,
              }}
            >
              {currentSlides.map((slide, index) => (
                <div key={index}>
                  <div>
                    <img
                      src={slide.image}
                      width={slide.width || (index === 2 ? 533 : 469)}
                      height={slide.height || (index === 2 ? 312 : 255)}
                      style={{
                        alignSelf: "center",
                        justifySelf: "center",
                        width: "100%",
                        maxWidth: index === 2 ? 469 : 533,
                        minHeight: 103,
                        minWidth: 255,
                        marginLeft: currentSlides.length < 2 && 50,
                      }}
                    />
                  </div>
                  <div
                    style={{
                      fontFamily: "Satoshi-Bold",
                      fontSize: 40,
                      color: "white",
                      marginLeft: currentSlides.length < 2 && 50,
                    }}
                  >
                    {slide.title}
                  </div>
                  <div
                    style={{
                      fontFamily: "Satoshi-Regular",
                      fontSize: 20,
                      color: "#8398b3",
                      marginBottom: 100,
                      marginTop: 25,
                      marginLeft: currentSlides.length < 2 && 50,
                    }}
                  >
                    {slide.description}
                  </div>
                </div>
              ))}
            </Carousel>
          )}
        </div>
      )}
    </div>
  );
}
