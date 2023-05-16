import React from "react";
import { StarFilled, PlusCircleFilled } from "@ant-design/icons";
import { Badge } from "antd";

const YellowStar = ({ size }) => {
  const starSize = size + "px";
  const circleSize = size + 10;

  const circleStyle = {
    backgroundColor: "rgba(255, 197, 78, 0.25)",
    borderRadius: "50%",
    height: `${circleSize}px`,
    width: `${circleSize}px`,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };
  return (
    <div style={circleStyle}>
      <StarFilled
        style={{ fontSize: starSize, color: "#FFC54E", opacity: 1 }}
      />
    </div>
  );
};

export default YellowStar;
