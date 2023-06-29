import { CustomButton } from "../../../assets/icons/CustomButtons";
import TileEffect from "../../../assets/gazzarSite/Effect.png";
import Laptop from "../../../assets/gazzarSite/Laptop.png";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";
import { RightOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
export default function MainSite() {
  const items = [
    {
      label: <a href="https://www.antgroup.com">1st menu item</a>,
      key: "0",
    },
    {
      label: <a href="https://www.aliyun.com">2nd menu item</a>,
      key: "1",
    },
    {
      type: "divider",
    },
    {
      label: "3rd menu item",
      key: "3",
    },
  ];

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          display: "flex",
          //width: "100%",
          height: "100%",
          flexDirection: "row",
          margin: "66px 78px",
          boxShadow: " 0px 4px 58px 0px rgba(0, 0, 0, 0.05)",
          borderRadius: 24,
          padding: "26px 32px",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div
          style={{
            fontSize: 28,
            color: "var(--gray-dark)",
            display: "flex",
            flexDirection: "row",
            fontWeight: 700,
          }}
        >
          <div
            style={{
              marginRight: 16,
              borderRadius: 4,
              background: "var(--primary-navy-blue)",
              width: 32,
              height: 32,
            }}
          />
          Gazzar.
        </div>

        <div
          style={{
            //  width: 573,
            height: 27,
            fontFamily: "Satoshi",
            fontWeight: 500,
            color: "#2b2b2b",
            fontSize: 20,
            fontStyle: "normal",
            lineHeight: "normal",
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "nowrap",
            overflow: "hidden",
            gap: 22,
          }}
        >
          <Dropdown
            menu={{
              items,
            }}
            trigger={["click"]}
          >
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                Features
                <DownOutlined />
              </Space>
            </a>
          </Dropdown>
          <Dropdown
            menu={{
              items,
            }}
            trigger={["click"]}
          >
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                Company
                <DownOutlined style={{ marginRight: 22 }} />
              </Space>
            </a>
          </Dropdown>
          <Dropdown
            menu={{
              items,
            }}
            trigger={["click"]}
          >
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                Pricing
                <DownOutlined />
              </Space>
            </a>
          </Dropdown>
          <Dropdown
            menu={{
              items,
            }}
            trigger={["click"]}
          >
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                Learn
                <DownOutlined />
              </Space>
            </a>
          </Dropdown>
        </div>

        <div style={{ display: "flex", flexDirection: "row", width: 294 }}>
          <Link to="/login">
            <CustomButton
              title="Login"
              type="tertiary"
              style={{ width: 112, height: 57, fontSize: 20, marginRight: 16 }}
            />
          </Link>
          <Link to="/register">
            <CustomButton
              title="Get Started"
              type="primary"
              style={{ width: 166, height: 57, fontSize: 20 }}
            />
          </Link>
        </div>
      </div>

      <div
        style={{
          backgroundImage: `url(${TileEffect})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          height: "100%",
          flexDirection: "column",
          marginLeft: 169,
          marginTop: 130,
          gap: 35,
          marginBottom: 336,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 70,
            fontFamily: "Satoshi",
            fontWeight: 700,
            fontStyle: "normal",
            height: "100%",
          }}
        >
          Manage your business <br /> more efficiently.
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 26,
            fontFamily: "Satoshi-Medium",
            fontWeight: 400,
            fontStyle: "normal",
          }}
        >
          Gazzar helps you analyze and keep track of your business <br />
          growth. Setup your online store in just 3 minutes.
        </div>

        <CustomButton
          icon={<RightOutlined style={{ fontSize: 18 }} />}
          iconPosition={"right"}
          title="Get Started"
          type="primary"
          style={{
            width: 245,
            height: 79,
            padding: "20px 40px",
            fontSize: 26,
            fontWeight: 500,
            lineHeight: "151.5%",
            justifyContent: "space-between",
          }}
        />
      </div>

      <div
        style={{
          background: "var(--primary-navy-blue)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <img
          src={Laptop}
          width={"72.57%"}
          height={"72.57%"}
          style={{
            display: "flex",
            position: "relative",
            right: "-10%",
            // alignSelf: "left",
            marginTop: "-14%",
          }}
        />
        <div
          style={{
            marginTop: 100,
            display: "flex",
            alignSelf: "center",
            gap: 29,
            flexDirection: "column",
          }}
        >
          <div
            style={{
              background: " rgba(255, 255, 255, 0.09)",
              borderRadius: 43,
              padding: "10px 31px",
              textAlign: "center",
              fontSize: 26,
              fontFamily: "Satoshi-Light",
              fontWeight: 400,
              lineHeight: "151.5%",
              color: "white",

              display: "flex",
              alignSelf: "center",
            }}
          >
            OUR GOAL IS SIMPLE
          </div>

          <div
            style={{
              fontFamily: "Satoshi",
              fontWeight: 700,
              fontSize: 60,
              display: "flex",
              color: "white",
              alignSelf: "center",
              textAlign: "center",
            }}
          >
            Helping you level up <br /> your business.
          </div>
          <div
            style={{
              fontFamily: "Satoshi-Light",

              fontSize: 26,
              display: "flex",
              lineHeight: "151.5%",
              textAlign: "center",
              alignSelf: "center",
              color: "white",
              paddingBottom: 50,
            }}
          >
            With different tools aimed at helping you scale up, Gazzar’s <br />
            the best match for helping you with that!
          </div>
        </div>
      </div>

      <div
        style={{
          background: "#f9f9f9",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          paddingTop: 100,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            padding: "35px 40px",
            boxShadow: "10px 24px 104px 0px rgba(0, 0, 0, 0.07)",
          }}
        >
          <div
            style={{
              width: 579,
              height: 660,
              //minWidth: 0,
              //minHeight: 0,
              display: "flex",
              borderRadius: 15,
              background: "var(--primary-navy-blue)",
              marginRight: 80,
            }}
          />

          <div style={{ display: "flex", flexDirection: "column", gap: 47 }}>
            <div
              style={{
                fontSize: 60,
                textAlign: "left",
                fontFamily: "Satoshi-Bold",
              }}
            >
              Create <br /> Your Own <br /> Online Store
            </div>

            <div
              style={{
                fontSize: 26,
                textAlign: "left",

                fontFamily: "Satoshi-Medium",
              }}
            >
              Create an online store for your <br />
              business, so users can easily <br />
              see what you sell and buy
              <br /> products from you.{" "}
            </div>

            <CustomButton
              icon={<RightOutlined style={{ fontSize: 18 }} />}
              iconPosition={"right"}
              title="Get Started"
              type="secondary"
              style={{
                width: 245,
                height: 79,
                padding: "20px 40px",
                fontSize: 26,
                fontWeight: 500,
                lineHeight: "151.5%",
                justifyContent: "space-between",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
