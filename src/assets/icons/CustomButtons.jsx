import { Button } from "antd";
import PropTypes from "prop-types";
import "./icons.css";

export function CustomButtton({
  title,
  icon,
  iconPosition,
  style,
  className,
  size,
  width,
  type,
  ...props
}) {
  let buttonContent = null;
  let buttonClassName = className; // Default button className

  if (icon && !title) {
    // Only icon is passed, no title
    buttonContent = icon;
  } else if (icon && title) {
    // Both icon and title are passed
    const iconElement = <span>{icon}</span>;
    const titleElement = <span>{title}</span>;
    if (iconPosition === "left") {
      // Icon should prefix the title
      buttonContent = (
        <>
          {iconElement}
          <span style={{ marginLeft: 12 }}>{titleElement}</span>
        </>
      );
    } else {
      // Icon should suffix the title
      buttonContent = (
        <>
          <span style={{ marginRight: 12 }}>{titleElement}</span>
          {iconElement}
        </>
      );
    }
  } else {
    // Only title is passed, no icon
    buttonContent = title;
  }

  // Update className based on the type prop
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
      }}
      {...props}
    >
      {buttonContent}
    </Button>
  );
}

CustomButtton.propTypes = {
  title: PropTypes.node, // The title prop can be any valid React node
  icon: PropTypes.node, // The icon prop can be any valid React node
  iconPosition: PropTypes.oneOf(["left", "right"]), // The iconPosition prop can only be "left" or "right"
  style: PropTypes.object, // The style prop should be an object
  className: PropTypes.string, // The className prop should be a string
  size: PropTypes.oneOf(["big", "small"]),
  width: PropTypes.number,
  type: PropTypes.oneOf(["primary", "secondary", "tertiary"]), // The type prop can only be "primary", "secondary", or "tertiary"
  // Additional props validation can be added as needed
};
