import React from "react";

const CustomLabel = ({ children, ...props }) => {
  // Default styles
  const defaultStyles = {
    color: "var(--grey-900)",
    fontFamily: "Satoshi-bold",
  };

  const mergedStyles = { ...defaultStyles, ...props.style };

  return (
    <label htmlFor={props.htmlFor} style={mergedStyles}>
      {children}
    </label>
  );
};

export default CustomLabel;
