import { Input, Carousel, Image, Select, Switch, Modal } from "antd";
import {
  PlusOutlined,
  CloseCircleOutlined,
  RightOutlined,
  LeftOutlined,
} from "@ant-design/icons";
import { CustomButton } from "../assets/icons/CustomButtons";
import React, { useState, useEffect, useRef } from "react";
import { CustomIcon } from "../assets/icons/CustomIcons";
import ImageUploader from "./ImageUploader";
const { Option } = Select;
import "./switch.css";
export default function ProductDetails({
  data,
  onBackClick,
  categories,
  imageFallback,
}) {
  const handleAddCategory = () => {
    // Logic for adding a new category
  };
  const [isImageEdit, setisImageEdit] = useState(false);
  const [productImages, setproductImages] = useState(data?.imageSrc);
  function handleModifyImage(data) {
    setproductImages(data);
  }
  function ImageModal({ onCancel, visible, productImages, modifyImage }) {
    const [images, setImages] = useState([]);

    useEffect(() => {
      setImages(productImages);
    }, [productImages]);

    const handleCancel = () => {
      onCancel();
    };

    const removeImage = (id) => {
      setImages((prevImages) => prevImages.filter((image) => image.id !== id));
    };

    const rearrangeImages = (startIndex, endIndex) => {
      const rearrangedImages = Array.from(images);
      const [removedImage] = rearrangedImages.splice(startIndex, 1);
      rearrangedImages.splice(endIndex, 0, removedImage);

      // Update the IDs based on the new order
      const updatedImages = rearrangedImages.map((image, index) => ({
        ...image,
        id: index + 1,
      }));

      setImages(updatedImages);
    };

    function saveChanges() {
      modifyImage(images);
      onCancel();
    }

    return (
      <div>
        <Modal
          onCancel={handleCancel}
          footer={null}
          open={visible}
          centered
          width={"auto"}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flexWrap: "wrap",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 30,
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              {images.map((image, index) => (
                <div
                  key={image.id}
                  style={{
                    position: "relative",
                    display: "inline-block",
                    marginRight: 10,
                  }}
                  draggable={true}
                  onDragStart={(e) => {
                    e.dataTransfer.setData("index", index);
                  }}
                  onDragOver={(e) => {
                    e.preventDefault();
                  }}
                  onDrop={(e) => {
                    const startIndex = Number(e.dataTransfer.getData("index"));
                    const endIndex = index;
                    rearrangeImages(startIndex, endIndex);
                  }}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    width={200}
                    height={200}
                  />

                  <div
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      opacity: 0,
                      cursor: "pointer",
                      width: 200,
                      height: 200,
                      transition: "filter 0.3s ease",
                      background: "rgba(0, 0, 0, 0.5)",
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.opacity = 1;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.opacity = 0;
                      e.currentTarget.style.filter = "none";
                    }}
                  >
                    <CloseCircleOutlined
                      style={{
                        color: "red",
                        fontSize: 20,
                        position: "absolute",
                        top: 10,
                        right: 10,
                      }}
                      onClick={() => {
                        removeImage(image.id);
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <CustomButton
              title={"Save changes"}
              type="primary"
              width={174}
              iconPosition="left"
              style={{
                height: 49,
                fontWeight: 100,
                marginBottom: 10,
                marginTop: 20,
              }}
              onClick={saveChanges}
            />
          </div>
        </Modal>
      </div>
    );
  }
  const MyCarousel = ({ productImages }) => {
    const carouselRef = useRef(null);
    const prevArrow = (
      <LeftOutlined
        onClick={() => carouselRef.current.prev()}
        style={{
          fontSize: "24px",
          marginLeft: 14,
          background: "rgba(255,255,255,0.28)",
          width: 41,
          height: 41,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 100,
          color: "var(--grey-1000)",
        }}
      />
    );

    const nextArrow = (
      <RightOutlined
        style={{
          fontSize: "24px",
          marginRight: 14,
          background: "rgba(255,255,255,0.28)",
          width: 41,
          height: 41,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 100,
          color: "var(--grey-1000)",
        }}
        onClick={() => carouselRef.current.next()}
      />
    );

    return (
      <div style={{ marginTop: -50 }}>
        <div
          style={{
            position: "relative",
            top: 280,
            zIndex: 1,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {prevArrow}
          {nextArrow}
        </div>
        <Image.PreviewGroup>
          <Carousel ref={carouselRef} style={{ width: 400, height: 550 }}>
            {productImages.map((item, index) => (
              <div key={index} style={{ borderRadius: 13 }}>
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={400}
                  height={550}
                  style={{ borderRadius: 13 }}
                  fallback={imageFallback}
                />
              </div>
            ))}
          </Carousel>
        </Image.PreviewGroup>
      </div>
    );
  };

  return (
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
              fontFamily: "Satoshi",
              fontWeight: "Bold",
              fontSize: 24,
            }}
          >
            Product Details
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "row" }}>
          <CustomButton
            title={"Save changes"}
            type="primary"
            width={174}
            iconPosition="left"
            style={{ height: 49, fontWeight: 100, marginBottom: 10 }}
          />
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        {/* Left Section */}
        <div style={{ flex: 1, marginTop: -40 }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: 400,
                height: 550,
              }}
            >
              <CustomButton
                width={48}
                type="primary"
                icon={
                  <CustomIcon
                    name="Edit"
                    style={{
                      color: "#ffffff",
                      width: 17,
                      height: 48,
                    }}
                  />
                }
                style={{
                  borderRadius: 100,
                  position: "relative",
                  top: 60,
                  alignSelf: "flex-end",
                  right: 20,
                  zIndex: 1,
                  height: 48,
                }}
                onClick={() => setisImageEdit(!isImageEdit)}
              />

              <ImageModal
                visible={isImageEdit}
                onCancel={() => setisImageEdit(!isImageEdit)}
                productImages={productImages}
                modifyImage={handleModifyImage}
              />
              <MyCarousel productImages={productImages} />
            </div>
          </div>

          <CustomButton
            icon={<PlusOutlined style={{ fontSize: 18, marginTop: 4 }} />}
            type="tertiary"
            size="big"
            title="Add image"
            iconPosition="left"
            style={{
              height: 64,
              fontSize: 15,
              fontWeight: "Medium",
              marginTop: 70,
              marginBottom: 43,
            }}
          />
          <div
            style={{
              border: "1px solid var(--grey-600)",
              width: 408,
              borderRadius: 7,
              padding: "28px 22px",
            }}
          >
            <div
              style={{
                color: "#000000",
                fontFamily: "Satoshi",
                fontWeight: "Bold",
                fontSize: 20,
                marginBottom: 30,
              }}
            >
              Product Availability
            </div>
            <div
              style={{
                color: "var(--grey-900)",
                fontFamily: "Satoshi",
                fontWeight: "Bold",
                marginBottom: 10,
              }}
            >
              Quantity Left in Stock
            </div>
            <div>
              <Select defaultValue="1" style={{ width: 351 }}>
                {/* Options for quantity */}
                <Option value="1">1</Option>
                <Option value="2">2</Option>
                {/* Add more options here */}
              </Select>
            </div>
            <div
              style={{
                marginTop: 24,
                color: "var(--grey-900)",
                fontFamily: "Satoshi",
                fontWeight: "Bold",
                display: "flex",
                alignItems: "center",
              }}
            >
              Display in Store
              <Switch size="small" style={{ marginLeft: 13 }} />
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div>
              <label
                htmlFor="productName"
                style={{
                  color: "var(--grey-900)",
                  fontFamily: "Satoshi",
                  fontWeight: "Bold",
                }}
              >
                Product Name
              </label>
              <Input
                id="productName"
                style={{ height: 53, marginTop: 10, marginBottom: 25 }}
                defaultValue={data?.title}
              />
            </div>
            <div>
              <label
                htmlFor="price"
                style={{
                  color: "var(--grey-900)",
                  fontFamily: "Satoshi",
                  fontWeight: "Bold",
                }}
              >
                Price
              </label>
              <Input
                id="price"
                prefix="$"
                style={{ height: 53, marginTop: 10, marginBottom: 25 }}
                defaultValue={data?.price}
              />
            </div>
            <div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <label
                  htmlFor="productCategory"
                  style={{
                    color: "var(--grey-900)",
                    fontFamily: "Satoshi",
                    fontWeight: "Bold",
                  }}
                >
                  Product Category
                </label>
                <a href="#" onClick={handleAddCategory}>
                  <PlusOutlined /> Add Category
                </a>
              </div>

              <Select
                defaultValue={data?.category}
                style={{
                  width: "100%",
                  marginBottom: 25,
                  marginTop: 10,
                }}
                size="large"
              >
                {/* Options for duration unit */}
                {categories.map((option, key) => (
                  <Option key={key} value={option.title}>
                    {option.title}
                  </Option>
                ))}
              </Select>
            </div>
            <div>
              <label
                htmlFor="deliveryDuration"
                style={{
                  color: "var(--grey-900)",
                  fontFamily: "Satoshi",
                  fontWeight: "Bold",
                }}
              >
                Delivery Duration
              </label>
              <div
                style={{
                  display: "flex",
                  marginTop: 10,
                  marginBottom: 25,
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    border: "1px solid var(--grey-600)",
                    borderRadius: 11,
                    paddingLeft: 28,
                  }}
                >
                  <div
                    style={{
                      fontSize: 16,
                      fontFamily: "Satoshi",
                      fontWeight: "Medium",
                      color: "var(--grey-800)",
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    No.
                    <div
                      style={{
                        fontSize: 25,
                        fontFamily: "Satoshi",
                        fontWeight: "Medium",
                        color: "var(--grey-800)",
                        marginLeft: 10,
                        marginTop: -5,
                      }}
                    >
                      |
                    </div>
                  </div>
                  <Select
                    defaultValue="1"
                    style={{
                      width: 186.12,
                      textAlign: "center",
                    }}
                    size="large"
                    bordered={false}
                  >
                    {/* Options for quantity */}
                    <Option value="1"> 1</Option>
                    <Option value="2">2</Option>
                    {/* Add more options here */}
                  </Select>
                </div>
                <Select defaultValue="days" style={{ width: 254 }} size="large">
                  {/* Options for duration unit */}
                  <Option value="days">Days</Option>
                  <Option value="weeks">Weeks</Option>
                  <Option value="months">Months</Option>
                  <Option value="minutes">Minutes</Option>
                </Select>
              </div>
            </div>
            <div>
              <label
                htmlFor="quantity"
                style={{
                  color: "var(--grey-900)",
                  fontFamily: "Satoshi",
                  fontWeight: "Bold",
                }}
              >
                Quantity
              </label>
              <div
                style={{
                  display: "flex",
                  marginTop: 10,
                  marginBottom: 25,
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    border: "1px solid var(--grey-600)",
                    borderRadius: 11,
                    paddingLeft: 28,
                  }}
                >
                  <div
                    style={{
                      fontSize: 16,
                      fontFamily: "Satoshi",
                      fontWeight: "Medium",
                      color: "var(--grey-800)",
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    No.
                    <div
                      style={{
                        fontSize: 25,
                        fontFamily: "Satoshi",
                        fontWeight: "Medium",
                        color: "var(--grey-800)",
                        marginLeft: 10,
                        marginTop: -5,
                      }}
                    >
                      |
                    </div>
                  </div>
                  <Select
                    defaultValue="1"
                    style={{
                      width: 186.12,
                      textAlign: "center",
                    }}
                    size="large"
                    bordered={false}
                  >
                    {/* Options for quantity */}
                    <Option value="1"> 1</Option>
                    <Option value="2">2</Option>
                    {/* Add more options here */}
                  </Select>
                </div>
                <Select
                  defaultValue="pieces"
                  style={{ width: 254 }}
                  size="large"
                >
                  {/* Options for quantity unit */}
                  <Option value="pieces">Pieces</Option>
                  <Option value="boxes">Boxes</Option>
                  {/* Add more options here */}
                </Select>
              </div>
            </div>
            <div>
              <label
                htmlFor="description"
                style={{
                  color: "var(--grey-900)",
                  fontFamily: "Satoshi",
                  fontWeight: "Bold",
                }}
              >
                Description
              </label>
              <Input.TextArea
                id="description"
                rows={7}
                style={{ marginTop: 10 }}
                defaultValue={data?.description}
              />
            </div>
            <div
              style={{
                border: "1px solid var(--grey-600)",
                borderRadius: 7,
                padding: "16px 22px",
                marginTop: 25,
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  color: "var(--grey-900)",
                  fontFamily: "Satoshi",
                  fontWeight: "Bold",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                Set Delivery Options for this Product?
              </div>
              <Switch />
            </div>
          </div>
        </div>
        <ImageUploader />
      </div>
    </div>
  );
}
