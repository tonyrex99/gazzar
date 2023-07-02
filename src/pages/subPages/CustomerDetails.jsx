import {
  Input,
  InputNumber,
  Image,
  message,
  Table,
  Empty,
  ConfigProvider,
  Form,
} from "antd";
import { LeftOutlined } from "@ant-design/icons";
import { CustomButton } from "../../assets/icons/CustomButtons";
import { useState, useRef, useEffect } from "react";
import { CustomIcon } from "../../assets/icons/CustomIcons";

import "./product-details.css";
import { EmptySvg } from "../../assets/icons/CustomIcons";
import CustomLabel from "../../components/CustomLabel";
import ConfirmModal from "../../components/ConfirmModal";
export default function CustomerDetails({
  data,
  onBackClick,
  modifyActiveCustomer,
}) {
  const [customerName, setcustomerName] = useState(data?.name);
  const [customerPhone, setcustomerPhone] = useState(data?.phone);
  const [customerEmail, setcustomerEmail] = useState(data?.email);
  const [customerLocation, setcustomerLocation] = useState(data?.location);
  const [customerRecentOrders, setcustomerRecentOrders] = useState(
    data?.recentOrder
  );
  const [customerStats, setcustomerStats] = useState({
    noOrders: data?.NoOrders,
    amountSpent: data?.amountSpent,

    mostPurchased: data?.mostPurchased,
  });

  const [formValidation, setFormValidation] = useState(true);
  const [dateCreated, setdateCreated] = useState(data?.date);
  const [isModalOpen, setisModalOpen] = useState(false);

  const [isSaved, setisSaved] = useState(
    Object.keys(data).length === 0 ? false : true
  );

  useEffect(() => {
    form.setFieldsValue({
      name: customerName,
      phone: customerPhone,
      email: customerEmail,
      location: customerLocation,
    });
  }, []);

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
              src={product.imageUrl}
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
                {product.productName}
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
          product?.amount.toLocaleString("en-NG", {
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
    const formattedDate = `${new Date()
      .getDate()
      .toString()
      .padStart(2, "0")}/${(new Date().getMonth() + 1)
      .toString()
      .padStart(2, "0")}/${new Date().getFullYear()}`;

    Object.keys(data).length < 1 &&
      ((editedData.data = formattedDate),
      setdateCreated(formattedDate),
      (editedData.amountSpent = 0));

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
      <ConfirmModal
        isOpen={isModalOpen}
        confirm={() => {
          form.resetFields();
          deleteProduct();
        }}
        setIsOpen={() => setisModalOpen(false)}
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
              {!isSaved ? "Add new customer" : "Customer details"}
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
              onClick={() => setisModalOpen(false)}
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
                width: 612,
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                }}
              >
                <div
                  style={{
                    color: "var(--primary-navy-blue)",
                    fontFamily: "Satoshi-Bold",
                    fontSize: 20,
                    marginBottom: 31,
                  }}
                >
                  Personal Details
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                  }}
                >
                  <Form.Item
                    name="name"
                    label={
                      <CustomLabel htmlFor="customerName">
                        Customer name
                      </CustomLabel>
                    }
                    rules={[
                      {
                        required: true,
                        message: "Please input your customer name!",
                      },
                    ]}
                    hasFeedback
                  >
                    <Input
                      id="customerName"
                      style={{
                        height: 53,
                        marginTop: 2,

                        width: "100%",
                      }}
                      value={customerName}
                      onChange={(event) => {
                        setcustomerName(event.target.value);
                      }}
                      allowClear={true}
                    />
                  </Form.Item>
                  <div>
                    <Form.Item
                      name="phone"
                      label={
                        <CustomLabel htmlFor="customerPhone">
                          Phone number
                        </CustomLabel>
                      }
                      rules={[
                        {
                          required: true,
                          message: "Please input your customer phone number!",
                        },
                      ]}
                      hasFeedback
                    >
                      <InputNumber
                        id="customerPhone"
                        style={{
                          height: 53,
                          marginTop: 2,

                          width: "100%",
                          alignItems: "center",
                          fontSize: 16,
                          display: "flex",
                        }}
                        value={customerPhone}
                        onChange={(value) => {
                          setcustomerPhone(value);
                        }}
                        allowClear={true}
                      />
                    </Form.Item>
                  </div>

                  <div>
                    <Form.Item
                      name="email"
                      label={
                        <CustomLabel htmlFor="customerEmail">
                          E-mail
                        </CustomLabel>
                      }
                      rules={[
                        {
                          required: true,
                          message: "Please input your customer email!",
                        },
                      ]}
                      hasFeedback
                    >
                      <Input
                        id="customerEmail"
                        style={{
                          height: 53,
                          marginTop: 2,

                          width: "100%",
                        }}
                        value={customerEmail}
                        onChange={(event) => {
                          setcustomerEmail(event.target.value);
                        }}
                        allowClear={true}
                      />
                    </Form.Item>
                  </div>

                  <div style={{ marginBottom: 27 }}>
                    <Form.Item
                      name="location"
                      label={
                        <CustomLabel htmlFor="customerLocation">
                          Location
                        </CustomLabel>
                      }
                      rules={[
                        {
                          required: true,
                          message: "Please input your customer location!",
                        },
                      ]}
                      hasFeedback
                    >
                      <Input.TextArea
                        id="customerLocation"
                        rows={5}
                        style={{
                          marginTop: 2,

                          width: "100%",
                        }}
                        value={customerLocation}
                        onChange={(event) => {
                          setcustomerLocation(event.target.value);
                        }}
                        allowClear={true}
                      />
                    </Form.Item>
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
                  marginBottom: 46,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div
                    style={{
                      color: "var(--primary-navy-blue)",
                      fontFamily: "Satoshi-Bold",
                      fontSize: 20,
                      marginBottom: 31,
                    }}
                  >
                    Stats
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
                      <div>No. of Orders:</div>
                      <div>Amount spent:</div>

                      <div>Most purchased item:</div>

                      <div>Date added:</div>
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
                            customerStats?.amountSpent?.toLocaleString(
                              "en-NG",
                              {
                                style: "decimal",
                              }
                            )}
                      </div>

                      <div>{customerStats?.mostPurchased}</div>

                      <div>{dateCreated}</div>
                    </div>
                  </div>
                </div>
              </div>

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
                    color: "var(--primary-navy-blue)",
                    fontFamily: "Satoshi-Bold",
                    fontSize: 20,
                    marginBottom: 34,
                  }}
                >
                  Recent orders
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
                            No order yet
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Form>
  );
}
