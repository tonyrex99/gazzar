import { CustomButton } from "../../../assets/icons/CustomButtons";
import { CustomIcon } from "../../../assets/icons/CustomIcons";
import { Button } from "antd";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
export default function CartPage() {
  return (
    <div
      style={{
        border: "1px solid #2b2b2b",
        borderRadius: 12,
        display: "flex",
        //    width: "100%",
        height: "100%",
        flexDirection: "column",
        padding: "17px 35px 64px 47px",
        margin: "120px 50px",
        alignSelf: "center",
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      <div
        style={{
          fontFamily: "Satoshi-Black",
          fontSize: 48,
          display: "flex",
          width: "100%",
        }}
      >
        Cart
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-between",
          flexWrap: "wrap",
          marginTop: 40,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "40%",
            maxHeight: "197px",
            height: "auto",
            border: "1px solid #ced6e1",
            borderRadius: 12,

            padding: "24px 40px",
            justifyContent: "space-between",
            marginBottom: 20,
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                marginBottom: "20px",
                width: "100%",
              }}
            >
              <div
                style={{ display: "flex", flexDirection: "row", width: "100%" }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",

                    alignItems: "space-between",
                    justifyContent: "space-between",
                    marginRight: 23,
                  }}
                >
                  <img width={100} height={100} src="facebook.com" />
                </div>
                <div
                  style={{
                    fontFamily: "Satoshi-Black",
                    fontSize: 28,
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",

                    alignSelf: "left",
                  }}
                >
                  Airforce 1s
                </div>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignSelf: "right",
                height: "100%",
              }}
            >
              <div
                style={{
                  display: "flex",
                  fontFamily: "Satoshi-Bold",
                  fontSize: 18,
                  height: "100%",
                  alignItems: "flex-start",
                  flexDirection: "column",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    width: "100%",

                    justifyContent: "flex-end",
                  }}
                >
                  30,000
                </div>
                <div
                  style={{
                    display: "flex",
                    fontFamily: "Satoshi-Regular",
                    fontSize: 16,
                    marginTop: "10px",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      fontFamily: "Satoshi-Regular",
                      fontSize: 14,
                      color: "var(--grey-800)",
                      marginRight: 8,
                    }}
                  >
                    Discount:
                  </div>
                  <div> 20%</div>
                </div>
              </div>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Button
              icon={
                <CustomIcon
                  name="Trash"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 32.17,
                    height: 32.17,
                    background: "#fcdada",
                    color: "var(--warning)",
                    borderRadius: 100,
                  }}
                  // onClick={() => updateLocations(location, "delete")}
                />
              }
              style={{ border: 0 }}
            />

            <div>
              <Button.Group style={{ display: "flex", alignItems: "center" }}>
                <CustomButton
                  type={"primary"}
                  icon={
                    <MinusOutlined
                      style={{
                        stroke: "white",
                        strokeWidth: 100,
                        fontSize: 10,
                        color: "white",
                      }}
                    />
                  }
                  width={2}
                  style={{
                    borderRadius: 5,

                    height: 25,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  //  onClick={(event) => {
                  //  event.stopPropagation();
                  // handleQuantityChange(product.key, -1);
                  // }}
                />

                <div
                  style={{
                    marginLeft: 18,
                    marginRight: 18,
                  }}
                >
                  2
                </div>
                <CustomButton
                  type={"primary"}
                  icon={
                    <PlusOutlined
                      style={{
                        stroke: "white",
                        strokeWidth: 100,
                        fontSize: 10,
                        color: "white",
                      }}
                    />
                  }
                  width={2}
                  style={{
                    borderRadius: 5,

                    height: 25,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  //  onClick={(event) => {
                  //  event.stopPropagation();
                  // handleQuantityChange(product.key, -1);
                  // }}
                />
              </Button.Group>
            </div>
          </div>
        </div>

        <div
          style={{
            borderRadius: 12,
            background: "var(--grey-100)",
            width: "100%",
            maxWidth: 335,
            padding: "16px 25px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              fontFamily: "Satoshi-Bold",
              fontSize: 20,
              marginBottom: 19,
            }}
          >
            {" "}
            Summary
          </div>
          <div
            style={{
              fontFamily: "Satoshi-Bold",
              fontSize: 16,
              marginBottom: 14,
            }}
          >
            3 items
          </div>
          <div
            style={{
              display: "flex",
              width: "100%",
              height: 2,
              background: "#d9d9d9",
              marginBottom: 12,
            }}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              justifyContent: "space-between",
              marginBottom: 24,
            }}
          >
            <div style={{ fontFamily: "Satoshi-Regular", fontSize: 14 }}>
              Subtotal
            </div>
            <div style={{ fontFamily: "Satoshi-Bold", fontSize: 16 }}>
              30,000
            </div>
          </div>

          <CustomButton
            title="Checkout"
            type="primary"
            style={{
              marginBottom: 16,
              display: "flex",
              height: 48,
              width: "100%",
              fontSize: 20,
            }}
          />
        </div>
      </div>
    </div>
  );
}
