import browseTemplates from "../assets/Templates.svg";
import defaultTemplates from "../assets/default-template.svg";
import addImage from "../assets/add-image.svg";

import { CustomButton } from "../assets/icons/CustomButtons";
import { Form, Input, Select, Space, Divider, Button, message } from "antd";
import { PlusOutlined, InboxOutlined } from "@ant-design/icons";
import CustomLabel from "../components/CustomLabel";
import { useRef, useState, useEffect } from "react";
import ImageUploader from "../components/ImageUploader";

import "./store.css";
export function Store() {
  const [userTagline, setuserTagline] = useState("");
  const [storeDescription, setstoreDescription] = useState("");
  const [productsPerPage, setproductsPerPage] = useState("10");
  const [name, setName] = useState("");

  const profileFormRef = useRef(null);
  const productsPerPageRef = useRef(null);
  const [form] = Form.useForm();
  const [items, setItems] = useState([
    "10",
    "20",
    "30",
    "40",
    "50",
    "100",
    "150",
    "200",
  ]);

  let index = 0;
  const addItem = (e) => {
    e.preventDefault();

    // Check if the name contains a number or a number in string form
    const containsNumber = /\d/.test(name);

    if (containsNumber) {
      setItems([...items, name || `New item ${index++}`]);
      setName("");
      setproductsPerPage(parseInt(name));

      setTimeout(() => {
        productsPerPageRef.current?.focus();
      }, 0);
    } else {
      message.error("Value must be a number");
    }
  };

  const onNameChange = (event) => {
    setName(event.target.value);
  };

  const uploadImage = (
    <div
      style={{
        width: 494,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        flexGrow: 1, // Added flexGrow property
      }}
    >
      <img
        src={addImage}
        width={81}
        height={81}
        style={{ alignSelf: "center" }}
      />

      <div style={{ color: "#484848", padding: 13 }}>
        Drag and drop product image(s) <br />
        here, or click to{" "}
        <span
          style={{
            fontFamily: "Satoshi-Bold",
            color: "var(--primary-navy-blue)",
          }}
        >
          select image
        </span>
      </div>
    </div>
  );
  return (
    <div
      style={{
        padding: "44px 33px",
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        {/* Default store template */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            border: "1px solid var(--grey-500)",
            borderRadius: 10,
            flex: 1,
            marginRight: 33,
            minWidth: 280,
            marginBottom: 37,
          }}
          className="shadowy"
        >
          <div style={{ padding: "27px 31px" }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div
                style={{
                  fontSize: 20,

                  fontFamily: "Satoshi-Bold",
                  marginBottom: 11,
                }}
              >
                Default store template
              </div>
              <div
                style={{
                  fontSize: 12,
                  fontFamily: "Satoshi-Regular",
                  color: "var(--grey-900)",
                }}
              >
                This is the default storefront template your store will have you
                can always <br /> change it when you{" "}
                <span
                  style={{
                    color: "var(--primary-navy-blue)",
                    fontFamily: "Satoshi-Bold",
                  }}
                >
                  upgrade your plan.
                </span>
              </div>
            </div>
            <img
              src={defaultTemplates}
              style={{
                marginTop: 21,
                display: "flex",
                maxWidth: "100%",
                height: "auto",
              }}
              alt="Default Template"
            />
          </div>
        </div>

        {/* Browse store front templates */}
        <div
          className="shadowy"
          style={{
            borderRadius: 10,
            backgroundImage: `url(${browseTemplates})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            display: "flex",
            flex: 1,
            minWidth: 270,
            maxHeight: 463,
            minHeight: 393,
          }}
        >
          <div style={{ padding: "63px 57px" }}>
            <div
              style={{
                minWidth: 230,
                color: "#ffffff",
                fontSize: 33.16,

                fontFamily: "Satoshi-Black",
              }}
            >
              Browse store front templates.
            </div>
            <div
              style={{
                maxWidth: 420,
                minWidth: 230,
                color: "#ffffff",
                fontSize: 18.37,

                fontFamily: "Satoshi-Regular",
              }}
            >
              Explore different themes for your design and give your business a
              professional look!
            </div>
          </div>
        </div>
      </div>

      <Form
        ref={profileFormRef}
        name="control-ref"
        form={form}
        layout="vertical"
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
            border: "1px solid var(--grey-500)",
            borderRadius: 10,
            marginTop: 33,
            padding: "40px 33px",
            width: "100%",
          }}
          className="shadowy"
        >
          {/* Edit template contents */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                fontSize: 20,
                fontFamily: "Satoshi-Bold",
                marginBottom: 11,
              }}
            >
              Edit template contents
            </div>
            <div
              style={{
                fontSize: 12,
                fontFamily: "Satoshi-Regular",
                color: "var(--grey-900)",
              }}
            >
              You can edit the contents of your storefront here and edit the way{" "}
              <br />
              your products are presented.
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 41,
              flexWrap: "wrap",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
                flexWrap: "wrap",
                marginRight: 40,
              }}
            >
              <div>
                <Form.Item
                  name="tagline"
                  label={
                    <CustomLabel
                      htmlFor="userTagline"
                      style={{ color: "#000000", fontFamily: "Satoshi-Bold" }}
                    >
                      Tagline
                    </CustomLabel>
                  }
                  tagline
                  rules={[
                    {
                      required: true,
                      message: "Please input your store tagline!",
                    },
                  ]}
                  hasFeedback
                >
                  <Input
                    id="userTagline"
                    style={{
                      height: 53,
                      marginTop: 2,

                      width: "100%",
                    }}
                    placeholder="Write your tagline here e.g welcome to XYZ store"
                    value={userTagline}
                    onChange={(event) => {
                      setuserTagline(event.target.value);
                    }}
                    allowClear={true}
                  />
                </Form.Item>
              </div>
              <div>
                <Form.Item
                  name="description"
                  label={
                    <CustomLabel
                      htmlFor="storeDescription"
                      style={{ color: "#000000", fontFamily: "Satoshi-Bold" }}
                    >
                      Description field
                    </CustomLabel>
                  }
                  tagline
                  rules={[
                    {
                      required: true,
                      message: "Please input your store description!",
                    },
                  ]}
                  hasFeedback
                >
                  <Input.TextArea
                    id="storeDescription"
                    style={{
                      marginTop: 2,

                      width: "100%",
                      height: 248,
                    }}
                    rows={11}
                    placeholder="Let your customers know a little about your store"
                    value={storeDescription}
                    onChange={(event) => {
                      setstoreDescription(event.target.value);
                    }}
                    allowClear={true}
                  />
                </Form.Item>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
              <div>
                <div
                  style={{
                    fontFamily: "Satoshi-Bold",
                    fontSize: 16,
                    marginBottom: 24,
                  }}
                >
                  Header image
                </div>
                <ImageUploader
                  addProductImage={(data) => console.log(data)}
                  customArea={uploadImage}
                  maxFiles={1}
                  disableURL
                />
              </div>
              <div>
                <Select
                  className="product-category"
                  size="large"
                  value={productsPerPage}
                  onChange={(value) => {
                    setproductsPerPage(parseInt(value));
                  }}
                  style={{
                    width: "100%",
                    color: "var(--grey-400)",
                    marginTop: -30,
                  }}
                  dropdownRender={(menu) => (
                    <>
                      {menu}
                      <Divider
                        style={{
                          margin: "8px 0",
                        }}
                      />
                      <Space
                        style={{
                          padding: "0 8px 4px",
                        }}
                      >
                        <Input
                          placeholder="Please enter item"
                          ref={productsPerPageRef}
                          value={name}
                          onChange={onNameChange}
                        />

                        <CustomButton
                          title="Add item"
                          icon={<PlusOutlined />}
                          onClick={addItem}
                        />
                      </Space>
                    </>
                  )}
                  options={
                    items &&
                    items.map((item) => ({
                      label: item,
                      value: item,
                    }))
                  }
                />
              </div>
            </div>
          </div>
          <CustomButton
            title="Save Changes"
            type="primary"
            width={415}
            style={{
              height: 64,
              maxWidth: 315,
              minWidth: 200,
              alignSelf: "center",
              marginTop: 57,
            }}
          />
        </div>
      </Form>
    </div>
  );
}
