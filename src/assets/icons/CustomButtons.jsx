import { Button } from "antd";
import PropTypes from "prop-types";
import "./icons.css";

export function CustomButton({
  title,
  icon,
  iconPosition,
  style,
  className,
  size,
  height,
  width,
  type,
  ...props
}) {
  let buttonContent = null;
  let buttonClassName = className;

  if (icon && !title) {
    buttonContent = icon;
  } else if (icon && title) {
    const iconElement = <div>{icon}</div>;
    const titleElement = <div>{title}</div>;
    if (iconPosition === "left") {
      buttonContent = (
        <div style={{ display: "flex", alignItems: "center" }}>
          {iconElement}
          <div style={{ marginLeft: 5 }}>{titleElement}</div>
        </div>
      );
    } else {
      buttonContent = (
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ marginRight: 5 }}>{titleElement}</div>
          {iconElement}
        </div>
      );
    }
  } else {
    buttonContent = title;
  }

  if (type) {
    const lowercaseType = type.toLowerCase();
    if (lowercaseType === "primary") {
      buttonClassName =
        size === "big" ? "primary-button-big" : "primary-button-small";
    } else if (lowercaseType === "secondary") {
      buttonClassName =
        size === "big" ? "secondary-button-big" : "secondary-button-small";
    } else if (lowercaseType === "tertiary") {
      buttonClassName =
        size === "big" ? "tertiary-button-big" : "tertiary-button-small";
    }
  }

  return (
    <Button
      className={buttonClassName}
      style={{
        ...style,
        width: width ? width : size === "big" ? 415 : icon && !title ? 63 : 169,

        alignItems: "center",
        display: "flex",
        justifyContent: "center",
        fontFamily: "Satoshi",
      }}
      {...props}
    >
      {buttonContent}
    </Button>
  );
}

CustomButton.propTypes = {
  title: PropTypes.node,
  icon: PropTypes.node,
  iconPosition: PropTypes.oneOf(["left", "right"]),
  style: PropTypes.object,
  className: PropTypes.string,
  size: PropTypes.oneOf(["big", "small"]),
  width: PropTypes.node,
  type: PropTypes.oneOf(["primary", "secondary", "tertiary"]),
};
