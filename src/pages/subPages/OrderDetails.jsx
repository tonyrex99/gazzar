import {
  Input,
  InputNumber,
  Image,
  message,
  Table,
  Empty,
  ConfigProvider,
  Select,
  Form,
} from "antd";
import {
  LeftOutlined,
  WarningFilled,
  InfoCircleFilled,
} from "@ant-design/icons";
import { CustomButton } from "../../assets/icons/CustomButtons";
import { useState, useRef } from "react";
import { CustomIcon } from "../../assets/icons/CustomIcons";

import "./product-details.css";
import { EmptySvg } from "../../assets/icons/CustomIcons";
import CustomLabel from "../../components/CustomLabel";
import SelectModalComponent from "../../components/selectModalComponent";
import { useSelector } from "react-redux";
import { faker } from "@faker-js/faker";
import { randomDate } from "../../services/services";
export default function OrderDetails({
  data,
  onBackClick,
  modifyActiveCustomer,
}) {
  const [customerName, setcustomerName] = useState(data?.name);
  const [customerPhone, setcustomerPhone] = useState(data?.phone);
  const [customerEmail, setcustomerEmail] = useState(data?.email);
  const [customerLocation, setcustomerLocation] = useState(data?.location);
  const [orderID, setorderID] = useState(data?.id);
  const [customerRecentOrders, setcustomerRecentOrders] = useState(
    data?.recentOrder
  );
  const [customerStats, setcustomerStats] = useState({
    noOrders: data?.NoOrders,
    amountSpent: data?.amountSpent,

    mostPurchased: data?.mostPurchased,
  });
  const [orderStatus, setorderStatus] = useState(data?.status || "Processing");

  const [formValidation, setFormValidation] = useState(true);
  const [dateCreated, setdateCreated] = useState(data?.date);
  const [isCustomerModalOpen, setisCustomerModalOpen] = useState(false);
  const [isSaved, setisSaved] = useState(
    Object.keys(data).length === 0 ? false : true
  );
  const [isModalOpen, setisModalOpen] = useState(false);
  const customerFormRef = useRef(null);
  const productTableColumns = [
    {
      title: "Product",
      dataIndex: "product",
      key: "product",
      render: (text) => (
        <div
          style={{
            fontSize: 16,
            fontFamily: "Satoshi-Regular",
          }}
        >
          {text}
        </div>
      ),
    },
    {
      title: "Qty",
      dataIndex: "qty",
      key: "qty",
      render: (text) => (
        <div
          style={{
            fontSize: 16,
            fontFamily: "Satoshi-Regular",
          }}
        >
          {text}
        </div>
      ),
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (text) => (
        <div
          style={{
            fontSize: 16,
            fontFamily: "Satoshi-Regular",
          }}
        >
          {text}
        </div>
      ),
    },
  ];
  const renderedProducts =
    customerRecentOrders &&
    customerRecentOrders.map((product, index) => {
      return {
        key: index,
        product: (
          <div style={{ display: "flex", flexDirection: "row" }}>
            <Image
              src={
                Array.isArray(product.imageSrc)
                  ? product.imageSrc[0].src
                  : product.imageSrc
              }
              width={57}
              height={57}
              style={{ borderRadius: 7 }}
            />

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginLeft: 13,
              }}
            >
              <div
                style={{
                  fontFamily: "Satoshi-Medium",
                  fontSize: 16,
                  color: "#000000",
                }}
              >
                {product.title}
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  fontFamily: "Satoshi-Medium",
                  fontSize: 14,
                  color: "var(--color-darkslategray-100)",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ display: "flex", marginRight: 4 }}>
                  Size: {product?.size}
                </div>
                <div>Color: {product?.color}</div>
              </div>
            </div>
          </div>
        ),
        qty: product?.quantity,
        amount:
          "₦ " +
          product?.price.toLocaleString("en-NG", {
            style: "decimal",
          }),
      };
    });
  const [form] = Form.useForm();
  function checkData(arg) {
    if (arg === "fault") {
      if (!customerName) {
        return "customer name";
      }
      if (!customerPhone) {
        return "customer phone";
      }
      if (!customerEmail) {
        return "customer E-mail";
      }
      if (!customerLocation) {
        return "customer location";
      }
    } else {
      return customerPhone && customerName && customerEmail && customerLocation;
    }
  }

  function saveProduct() {
    const editedData = { ...data };

    editedData.name = customerName;
    editedData.phone = customerPhone;
    editedData.email = customerEmail;
    editedData.location = customerLocation;
    editedData.status = orderStatus;
    editedData.recentOrder = customerRecentOrders;
    if (Object.keys(data).length < 1 && !isSaved) {
      const randomString = faker.string.alphanumeric({
        length: 6,
        casing: "upper",
      });
      const randomLetters = faker.string.alphanumeric({
        length: 3,
        casing: "upper",
      });
      let newDate = randomDate();
      editedData.date = newDate;
      setdateCreated(newDate);
      editedData.total = 0;
      let newID = `${randomString}-${randomLetters}`;
      setorderID(newID);
      editedData.id = newID;
      editedData.type = "Online";
    }

    if (checkData()) {
      modifyActiveCustomer(editedData, "add");

      message.success(
        `Customer saved successfully! \u{1F389}  \u{1F389} \u{1F389} `
      );
      setisSaved(true);
    } else {
      setFormValidation(false);
      message.error(`Please fill in appropriate data! `);
    }
  }

  function deleteProduct() {
    // If data.key exists, set the display and other variables to undefined
    setcustomerName(undefined);
    setcustomerPhone(undefined);
    setcustomerEmail(undefined);
    setcustomerLocation(undefined);
    setcustomerRecentOrders(undefined);
    setdateCreated(undefined);
    setisSaved(false);

    if (data?.key) {
      modifyActiveCustomer({ ...data }, "delete");
    }
    message.success(
      `Product deleted successfully! \u{1F389}  \u{1F389} \u{1F389} `
    );
  }

  return (
    <Form
      ref={customerFormRef}
      name="control-ref"
      form={form}
      layout="vertical"
    >
      <SelectModalComponent
        onSave={(value) => {
          let updatedOrders = [];

          if (customerRecentOrders && customerRecentOrders.length > 0) {
            updatedOrders = customerRecentOrders.filter((existingValue) => {
              const newValue = value.find(
                (item) => item.key === existingValue.key
              );
              return newValue ? newValue.quantity > 0 : true;
            });
          }

          value.forEach((newValue) => {
            if (newValue.quantity > 0) {
              const existingIndex = updatedOrders.findIndex(
                (existingValue) => existingValue.key === newValue.key
              );

              if (existingIndex !== -1) {
                // Replace existing object with the same key
                updatedOrders[existingIndex] = newValue;
              } else {
                updatedOrders.push(newValue);
              }
            }
          });

          setcustomerRecentOrders(updatedOrders);
        }}
        onActionButtonClick={() => console.log("action button clicked")}
        searchPlaceholder={"Search product"}
        onCancel={() => setisModalOpen(!isModalOpen)}
        isOpen={isModalOpen}
        title="Select product"
        actionButton={"New product"}
        data={useSelector((state) => state.products)}
      />

      <SelectModalComponent
        onSave={(data) => {
          let value = data[0];
          setcustomerEmail(value?.email);
          setcustomerName(value?.name);
          setcustomerLocation(value?.location);
          setcustomerPhone(value?.phone);
        }}
        onActionButtonClick={() => console.log("action button clicked")}
        searchPlaceholder={"Search customer"}
        onCancel={() => setisCustomerModalOpen(!isCustomerModalOpen)}
        isOpen={isCustomerModalOpen}
        title="Select customer"
        actionButton={"New customer"}
        data={useSelector((state) => state.customers)}
      />

      <div
        style={{
          flexDirection: "column",
          display: "flex",
          justifyContent: "space-evenly",
          padding: "30px",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "auto",
            paddingTop: 20,
            paddingBottom: 10,

            position: "sticky",
            top: 108,
            zIndex: 2,
            background: "white",
            marginBottom: 30,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <CustomButton
              width={58}
              style={{
                height: 58,
                background: "#ffffff",
                color: "var(--grey-900)",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                borderRadius: 100,
                border: "1px solid var(--grey-600)",
                justifyContent: "center",
              }}
              onClick={onBackClick}
              icon={<LeftOutlined style={{ fontSize: 20 }} />}
            />

            <div
              style={{
                color: "#000000",

                marginLeft: 30,
                fontFamily: "Satoshi-Bold",
                fontSize: 24,
              }}
            >
              {!isSaved ? "Add new order" : "Order details"}
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "row" }}>
            <CustomButton
              title={!isSaved ? "Save" : "Save changes"}
              type="primary"
              width={174}
              iconPosition="left"
              style={{
                height: 49,
                fontWeight: 100,
                marginBottom: 10,
                marginRight: 12,
              }}
              onClick={saveProduct}
              htmlType="submit"
            />
            <CustomButton
              type="primary"
              icon={<CustomIcon name="Trash" />}
              title={"Delete"}
              iconPosition="left"
              width={152}
              style={{
                height: 49,
                backgroundColor: "rgba(240,72,72,0.15)",
                color: "var(--warning)",
                fontFamily: "Satoshi-Medium",

                border: "1px solid var(--grey-500)",
              }}
              onClick={() => {
                form.resetFields();
                deleteProduct();
              }}
            />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "auto",
            padding: "33px 26px",

            background: "white",
            marginBottom: 32,
            border: "1px solid var(--grey-500)",
            borderRadius: 10,
            alignItems: "center",
            height: 88,
          }}
        >
          <div
            style={{
              color: "var(--grey-500)",
              fontFamily: "Satoshi-Regular",
              fontSize: "16px",
            }}
          >
            Order ID: {orderID}
          </div>

          <div
            style={{
              color: "var(--grey-500)",
              fontFamily: "Satoshi-Regular",
              fontSize: "16px",
            }}
          >
            Date: {data?.date}
          </div>

          <div
            style={{
              color: "var(--grey-500)",
              fontFamily: "Satoshi-Regular",
              fontSize: "16px",
            }}
          >
            EDD:
          </div>

          <div
            style={{
              color: "var(--grey-500)",
              fontFamily: "Satoshi-Regular",
              fontSize: "16px",
            }}
          >
            Shipping type:
          </div>

          <div
            style={{
              color: "var(--grey-500)",
              fontFamily: "Satoshi-Regular",
              fontSize: "16px",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            Status:{" "}
            <Select
              className="super-select-class"
              bordered={false}
              value={orderStatus}
              style={{
                marginLeft: 8,
                color:
                  orderStatus === "Incomplete"
                    ? "var(--warning)"
                    : orderStatus === "Completed"
                    ? "var(--success)"
                    : "var(--secondary-gold)",
                fontSize: 12,
                fontFamily: "Satoshi-Bold",
                padding: "7px 24px",

                borderRadius: 29,
                backgroundColor:
                  orderStatus === "Incomplete"
                    ? "#fde4e4"
                    : orderStatus === "Completed"
                    ? "#def3d9"
                    : "#fff4de",

                textAlign: "center",
              }}
              onChange={(value) => setorderStatus(value)}
              options={[
                {
                  value: "Completed",
                  label: (
                    <div style={{ color: "var(--success)" }}>Completed</div>
                  ),
                },
                {
                  value: "Processing",
                  label: (
                    <div style={{ color: "var(--secondary-gold)" }}>
                      Processing
                    </div>
                  ),
                },

                {
                  value: "Incomplete",
                  label: (
                    <div style={{ color: "var(--warning)" }}>Incomplete</div>
                  ),
                },
              ]}
            />
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          {/* Left Section */}

          <div style={{ marginBottom: 46 }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                borderRadius: 13,
                border: "1px solid var(--grey-400)",
                padding: "22px 20px",
                width: 666,
              }}
            >
              {" "}
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginBottom: 24,
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    color: "var(--primary-navy-blue)",
                    fontFamily: "Satoshi-Bold",
                    fontSize: 20,
                  }}
                >
                  Ordered items
                </div>
                {!isSaved && (
                  <a
                    style={{
                      color: "var(--primary-navy-blue)",
                      fontFamily: "Satoshi-Medium",
                      fontSize: 14,
                    }}
                    onClick={() => setisModalOpen(!isModalOpen)}
                  >
                    <u> Add product</u>
                  </a>
                )}
              </div>
              <div style={{ marginBottom: 20 }}>
                <ConfigProvider
                  renderEmpty={() => (
                    <Empty
                      description={
                        <div
                          style={{
                            fontFamily: "Satoshi-Medium",
                            fontSize: 16,
                            color: "var(--secondary-gold)",
                          }}
                        >
                          No products added
                        </div>
                      }
                      image={<EmptySvg />}
                    />
                  )}
                >
                  <Table
                    columns={productTableColumns}
                    dataSource={renderedProducts}
                  />
                </ConfigProvider>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <div
                    style={{
                      marginRight: 22,
                      display: "flex",
                      justifyContent: "space-between",
                      flexDirection: "column",
                      height: 187,
                      color: "var(--grey-900)",
                      fontFamily: "Satoshi-Regular",
                      fontSize: 16,
                    }}
                  >
                    <div>Gross total:</div>
                    <div>Shipping fee:</div>

                    <div>Discount:</div>

                    <div>Net total:</div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      flexDirection: "column",
                      height: 187,
                    }}
                  >
                    <div>{customerStats?.noOrders}</div>
                    <div>
                      {customerStats?.amountSpent &&
                        "₦ " +
                          customerStats?.amountSpent?.toLocaleString("en-NG", {
                            style: "decimal",
                          })}
                    </div>

                    <div>{customerStats?.mostPurchased}</div>

                    <div>{dateCreated}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Right Section */}
          <div style={{ width: 443, display: "flex" }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: 13,
                  border: "1px solid var(--grey-400)",
                  padding: "22px 20px",
                  width: 443,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginBottom: 24,
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      color: "var(--primary-navy-blue)",
                      fontFamily: "Satoshi-Bold",
                      fontSize: 20,
                    }}
                  >
                    Customer details
                  </div>
                  <a
                    style={{
                      color: "var(--primary-navy-blue)",
                      fontFamily: "Satoshi-Medium",
                      fontSize: 14,
                    }}
                    onClick={() => setisCustomerModalOpen(!isCustomerModalOpen)}
                  >
                    <u> Edit</u>
                  </a>
                </div>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <div
                    style={{
                      marginRight: 22,
                      display: "flex",
                      justifyContent: "space-between",
                      flexDirection: "column",
                      height: 187,
                      color: "var(--grey-900)",
                      fontFamily: "Satoshi-Regular",
                      fontSize: 16,
                    }}
                  >
                    <div>Name:</div>
                    <div>E-mail:</div>

                    <div>Phone number:</div>

                    <div>Address:</div>
                  </div>
                  <div
                    style={{
                      marginRight: 22,
                      display: "flex",
                      justifyContent: "space-between",
                      flexDirection: "column",
                      height: 187,
                      color: "var(--grey-900)",
                      fontFamily: "Satoshi-Regular",
                      fontSize: 16,
                    }}
                  >
                    <div>{customerName}</div>
                    <div>{customerEmail}</div>

                    <div>{customerPhone}</div>

                    <div> {customerLocation} </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Form>
  );
}
