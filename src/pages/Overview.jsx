import {
  UserOutlined,
  ShoppingOutlined,
  ShoppingCartOutlined,
  DesktopOutlined,
} from "@ant-design/icons";
import { Grid, Avatar, Statistic } from "antd";
import React from "react";
import "./../dashboard.css";
import "./../App.css";
import OrderTable from "./../components/PendingOrders";
import CountUp from "react-countup";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { GraphContainer } from "../components/GraphContainer";
dayjs.extend(customParseFormat);

const { useBreakpoint } = Grid;
const dummyData = [
  {
    name: "Product 1",
    image: "https://xsgames.co/randomusers/avatar.php?g=pixel&key=1",
    price: "N5,000",
    quantity: "12pcs",
  },
  {
    name: "Product 2",
    image: "https://xsgames.co/randomusers/avatar.php?g=pixel&key=2",
    price: "N6,000",
    quantity: "10pcs",
  },
  {
    name: "Product 3",
    image: "https://xsgames.co/randomusers/avatar.php?g=pixel&key=3",
    price: "N4,000",
    quantity: "15pcs",
  },
  {
    name: "Product 4",
    image: "https://xsgames.co/randomusers/avatar.php?g=pixel&key=4",
    price: "N8,000",
    quantity: "8pcs",
  },
  {
    name: "Product 5",
    image: "https://xsgames.co/randomusers/avatar.php?g=pixel&key=5",
    price: "N3,000",
    quantity: "20pcs",
  },
];
export default function Overview() {
  const cardData = [
    { title: "No. of orders", value: "12", icon: ShoppingCartOutlined },
    { title: "Products sold", value: "124", icon: ShoppingOutlined },
    { title: "New customers", value: "648", icon: UserOutlined },
    { title: "Page visits", value: "39", icon: DesktopOutlined },
  ];

  function TopProducts({ data = dummyData }) {
    return (
      <div
        className="card"
        style={{
          minHeight: "482px",
          padding: `25px 35px`,
          width: "100%",
          maxWidth: "417px",
          borderRadius: 10,
          flexDirection: "column",
        }}
      >
        <div
          style={{
            fontFamily: "Satoshi",
            fontWeight: "Bold",
            fontSize: "1.5rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            marginBottom: "1rem",
          }}
        >
          <div style={{ alignSelf: "center", position: "relative", top: -10 }}>
            Top selling products
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            maxHeight: "382px",
            overflowY: "auto",
            paddingRight: "0.5rem",
            boxSizing: "border-box",
          }}
        >
          {data.map((product) => (
            <div
              key={product.name}
              style={{
                display: "flex",
                flexDirection: "row",
                margin: "0.5rem 0",
                alignItems: "center",
                borderBottom: "1px solid var(--grey-500)",
                paddingBottom: 13,
              }}
            >
              <Avatar src={product.image} size={45} />
              <div
                style={{
                  fontSize: "1rem",
                  fontWeight: "Medium",
                  color: "#000000",
                  marginLeft: "1rem",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  fontFamily: "Satoshi",
                }}
              >
                {product.name}
                <div
                  className="user-option-sidebar-email"
                  style={{ marginTop: 3 }}
                >
                  {product.price}
                </div>
              </div>
              <div
                style={{
                  fontFamily: "Satoshi",
                  fontWeight: "bold",
                  fontSize: "1rem",
                  marginLeft: "auto",
                }}
              >
                {product.quantity}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const formatter = (value) => <CountUp end={value} separator="," />;

  return (
    <>
      <div
        className="dashboard-container"
        style={{ borderRadius: 10, marginBottom: -60 }}
      >
        {cardData.map((data, index) => (
          <div className="card" key={index} style={{ flexDirection: "row" }}>
            <div className="card-icon-container">
              <data.icon className="card-icon" />
            </div>

            <div className="card-content" style={{ alignItems: "flex-start" }}>
              <p>{data.title}</p>
              <div>
                <Statistic
                  value={data.value}
                  formatter={formatter}
                  valueStyle={{
                    fontSize: 36,
                    color: "var(--grey-1100)",
                    fontFamily: "Satoshi",
                    fontWeight: "bold",
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div
        className="dashboard-container"
        style={{
          flexDirection: "row",
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <GraphContainer title={"Amount made"} />

        {/*  <AltGraph
            width={NewDimensions.width}
            height={NewDimensions.height - 150}
            range={[formattedFromDate, formattedToDate]}
            changeSum={handleDebounceGraph}
          />
                  */}
        <TopProducts />
        <OrderTable />
      </div>
    </>
  );
}
