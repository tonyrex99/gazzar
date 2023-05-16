import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Grid } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
import "../global.css";
const { useBreakpoint } = Grid;

const CTA = ({
  backgroundColor,
  backgroundImage,
  closeComponent,
  closeColor,
  description,
  extraStyles,
  image,
  imageContainerStyle,
  imageStyle,
  mdBreakpointComponent,
  onClick,
  title,
  titleCentered,
  titleFontSize,
  buttonLabel,
  buttonComponent,
  height,
  width,
  collapsedChecker,
  buttonStyle,
  ...rest
}) => {
  const screens = useBreakpoint();

  const containerStyle = {
    backgroundImage: backgroundImage && `url(${backgroundImage})`,
    backgroundSize: "cover",
    position: "relative",
    height: height || "163px",
    width: width || "221px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: backgroundColor,

    alignItems: "center",
    ...extraStyles,
  };

  const titleStyle = {
    textAlign: titleCentered ? "center" : "left",
    fontSize: titleFontSize,
    overflow: "hidden",
    ...extraStyles,
  };
  const [isOpen, setisOpen] = useState(true);
  function handleClose() {
    setisOpen(false);
  }

  return (
    <>
      {isOpen && (
        <>
          {!screens.md || collapsedChecker ? (
            mdBreakpointComponent
          ) : (
            <div style={containerStyle} {...rest}>
              <div
                onClick={handleClose}
                style={{
                  position: "absolute",
                  top: 11,
                  left: 11,
                  cursor: "pointer",
                }}
              >
                {closeComponent ? (
                  closeComponent
                ) : (
                  <CloseCircleOutlined
                    style={{
                      color: "#ffffff",
                      fontSize: "20px",
                    }}
                  />
                )}
              </div>

              {title && <h2 style={titleStyle}>{title}</h2>}
              {image && typeof image === "string" ? (
                <div style={imageContainerStyle}>
                  <img src={image} alt="CTA" style={imageStyle} />
                </div>
              ) : (
                <div style={imageContainerStyle}>{image}</div>
              )}

              <div style={{ flex: 1 }}>
                {description && (
                  <div
                    style={{
                      flex: 1,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      textAlign: "center",
                      fontStyle: "Satoshi",
                      fontSize: "12px",
                      fontWeight: "bold",
                      paddingLeft: "24.5px",
                      paddingRight: "24.5px",
                      color: "#ffffff",
                    }}
                  >
                    {description}
                  </div>
                )}
                <Button
                  style={buttonStyle}
                  onClick={onClick}
                  type="primary"
                  size={screens.md ? "large" : "middle"}
                  icon={buttonComponent}
                >
                  {buttonLabel}
                </Button>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};
CTA.propTypes = {
  backgroundColor: PropTypes.string,
  backgroundImage: PropTypes.string,
  closeComponent: PropTypes.node,
  closeColor: PropTypes.string,
  description: PropTypes.string,
  extraStyles: PropTypes.object,
  image: PropTypes.string,
  mdBreakpointComponent: PropTypes.node,
  onClick: PropTypes.func,
  title: PropTypes.string,
  titleCentered: PropTypes.bool,
  titleFontSize: PropTypes.string,
  buttonLabel: PropTypes.string,
  buttonComponent: PropTypes.node,
  onClose: PropTypes.func,
  height: PropTypes.string,
  width: PropTypes.string,
  collapsedChecker: PropTypes.bool,
};

CTA.defaultProps = {
  closeColor: "#ffffff",
  titleCentered: true,
  titleFontSize: "28px",
  buttonLabel: "Call to Action",
  buttonComponent: null,
  imageContainerStyle: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 90,
    height: 90,
    marginTop: 18,
    marginBottom: 10,
  },
  imageStyle: {
    maxWidth: "100%",
    maxHeight: "100%",
  },
  buttonStyle: {
    borderRadius: "4px",
    background: "#ffffff",
    padding: "8px 62px",
    margin: "19px 15.5px 18px 15.5px",
    textAlign: "center",
    color: "#083167",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    width: "190px",
    height: "30px",
    fontWeight: "bold",
    fontFamily: "Satoshi",
    fontSize: "12px",
  },
};

export default CTA;
