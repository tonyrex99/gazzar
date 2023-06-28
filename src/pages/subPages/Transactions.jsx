import { useDispatch, useSelector } from "react-redux";
import gazzarCard from "../../assets/gazzar-card.svg";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import { useState } from "react";

export default function Transactions() {
  const [balanceVisible, setbalanceVisible] = useState(true);
  return (
    <div style={{ display: "flex", width: "100%", flexDirection: "column" }}>
      <div
        className="shadowy"
        style={{
          display: "flex",

          borderRadius: 10,
          backgroundImage: `url(${gazzarCard})`,
          backgroundSize: "cover",
          backgroundPosition: "center",

          flex: 1,
          minWidth: 270,
          maxWidth: 465,
          padding: "29px 31px",

          minHeight: 266,
          fontFamily: "Satoshi-Bold",
          fontSize: 48,
          flexDirection: "column",
          color: "#FFFFFF",
        }}
      >
        <div
          style={{
            fontFamily: "Satoshi-Regular",
            fontSize: 16,
            color: "#8398B3",
          }}
        >
          {" "}
          {balanceVisible ? (
            <EyeOutlined
              style={{ marginRight: 17.5, color: "#8398B3" }}
              onClick={() => setbalanceVisible(!balanceVisible)}
            />
          ) : (
            <EyeInvisibleOutlined
              style={{ marginRight: 17.5, color: "#8398B3" }}
              onClick={() => setbalanceVisible(!balanceVisible)}
            />
          )}{" "}
          Gazzar wallet balance
        </div>
        <div> &#8358; {balanceVisible ? "250,000" : "***,***"}</div>
      </div>

      <div
        className="shadowy"
        style={{
          display: "inline-block",
          flexDirection: "column",
          marginTop: 118,
          borderRadius: 10,
          border: "1px solid var(--grey-400)",
          padding: "24px 37px 19px 26px",
          width: 353,
        }}
      >
        <div
          style={{ fontFamily: "Satoshi-Bold", fontSize: 23, marginBottom: 9 }}
        >
          0123456789
        </div>

        <div
          style={{
            fontFamily: "Satoshi-Regular",
            fontSize: 18,
            color: "var(--grey-900)",
            marginBottom: 17,
          }}
        >
          United Bank for Africa
        </div>

        <div
          style={{
            fontFamily: "Satoshi-Bold",
            fontSize: 19,
            color: "var(--primary-navy-blue)",
            marginBottom: 26,
          }}
        >
          Sanni Muiz Dolapo
        </div>

        <div
          style={{
            background: "var(--grey-500)",

            height: 2,
          }}
        />

        <div
          style={{
            fontFamily: "Satoshi-Regular",
            fontSize: 18,
            color: "var(--grey-800)",
            marginTop: 5,
          }}
        >
          Set as primary account
        </div>
      </div>
    </div>
  );
}
