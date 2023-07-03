import {
  Input,
  InputNumber,
  Carousel,
  Image,
  Select,
  Switch,
  Modal,
  message,
  Divider,
  Space,
  Button,
} from "antd";
import {
  PlusOutlined,
  CloseCircleOutlined,
  RightOutlined,
  LeftOutlined,
  WarningFilled,
  InfoCircleFilled,
} from "@ant-design/icons";
import { CustomButton } from "../../assets/icons/CustomButtons";
import { useState, useEffect, useRef } from "react";
import { CustomIcon } from "../../assets/icons/CustomIcons";
import ImageUploader from "../../components/ImageUploader";

import imageFallback from "../../assets/no-image-fallback.svg";
import brokenImageFallback from "../../assets/broken-image-fallback.png";
const { Option } = Select;
import "./product-details.css";
import DeliveryOption from "../../components/DeliveryOption";
import ConfirmModal from "../../components/ConfirmModal";
export default function ProductDetails({
  data,
  onBackClick,
  categories,
  changeCategories,
  modifyActiveProduct,
}) {
  const [isImageEdit, setisImageEdit] = useState(false);
  const [productImages, setproductImages] = useState(data?.imageSrc);
  const [addImageModal, setaddImageModal] = useState(false);
  const [productName, setproductName] = useState(data?.title);
  const [productPrice, setproductPrice] = useState(data?.price);
  const [productCategory, setproductCategory] = useState(data?.category);
  const [deliveryDuration, setdeliveryDuration] = useState(
    data?.deliveryDuration
  );
  const [productQuantityRate, setproductQuantityRate] = useState(data?.qtyRate);
  const [productDescription, setproductDescription] = useState(
    data?.description
  );
  const [deliveryOptions, setdeliveryOptions] = useState(data?.deliveryOptions);
  const [isdeliveryOpen, setisdeliveryOpen] = useState(false);
  const [displayInStore, setdisplayInStore] = useState(data?.visibleInStore);
  const [quantityLeft, setquantityLeft] = useState(data?.qtyLeft);
  const [customQuantity, setCustomQuantity] = useState("");
  const [isNewCategory, setisNewCategory] = useState(false);
  const [addCategory, setAddCategory] = useState("");
  const [formValidation, setFormValidation] = useState(true);
  const [isModalOpen, setisModalOpen] = useState(false);

  const [isSaved, setisSaved] = useState(
    Object.keys(data).length === 0 ? false : true
  );
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
  const [name, setName] = useState("");
  const qtyInStockRef = useRef(null);
  const onNameChange = (event) => {
    setName(event.target.value);
  };
  let index = 0;
  const addItem = (e) => {
    e.preventDefault();

    // Check if the name contains a number or a number in string form
    const containsNumber = /\d/.test(name);

    if (containsNumber) {
      setItems([...items, name || `New item ${index++}`]);
      setName("");
      setquantityLeft(parseInt(name));

      setTimeout(() => {
        qtyInStockRef.current?.focus();
      }, 0);
    } else {
      message.error("Value must be a number");
    }
  };

  const handleAddCategory = () => {
    setisNewCategory(!isNewCategory);
  };
  const addToCategories = () => {
    if (addCategory.length > 1) {
      let currentCategories = categories;
      let newCategory = { title: addCategory };
      currentCategories.push(newCategory);
      changeCategories(currentCategories);
      setisNewCategory(!isNewCategory);
    }
  };
  function handleModifyImage(data) {
    setproductImages(data);
  }
  function checkData(arg) {
    if (arg === "fault") {
      if (!productImages) {
        return "product image(s)";
      }
      if (!productName) {
        return "product name";
      }
      if (!productPrice) {
        return "product price";
      }
      if (!productCategory) {
        return "product category";
      }
      if (!productDescription) {
        return "product description";
      }
    } else {
      return (
        productImages &&
        productName &&
        productPrice &&
        productCategory &&
        productDescription
      );
    }
  }

  function saveProduct() {
    const editedData = { ...data };
    editedData.imageSrc = productImages;
    editedData.title = productName;
    editedData.price = productPrice;
    editedData.category = productCategory;
    editedData.deliveryDuration = deliveryDuration;
    editedData.qtyRate = productQuantityRate;
    editedData.description = productDescription;
    editedData.deliveryOptions = deliveryOptions;
    editedData.visibleInStore = displayInStore;
    editedData.qtyLeft = quantityLeft;
    if (checkData()) {
      modifyActiveProduct(editedData, "add");

      message.success(
        `Product saved successfully! \u{1F389}  \u{1F389} \u{1F389} `
      );
      setisSaved(true);
    } else {
      setFormValidation(false);
      message.error(
        `Please fill in appropriate data for ${checkData("fault")}! `
      );
    }
  }

  function deleteProduct() {
    // If data.key exists, set the display and other variables to undefined
    setproductName(undefined);
    setproductPrice(undefined);
    setproductCategory(undefined);
    setdeliveryDuration(undefined);
    setproductQuantityRate(undefined);
    setproductDescription(undefined);
    setdeliveryOptions(undefined);
    setdisplayInStore(undefined);
    setquantityLeft(undefined);
    setproductImages(undefined);
    if (data?.key) {
      modifyActiveProduct({ ...data }, "delete");
    }
    message.success(
      `Product deleted successfully! \u{1F389}  \u{1F389} \u{1F389} `
    );
  }

  const addProductImage = (newImages) => {
    setproductImages((prevImages) => {
      if (prevImages) {
        return [...prevImages, ...newImages];
      } else {
        return [...newImages];
      }
    });
  };

  function saveDeliveryOption(data) {
    setdeliveryOptions(data);
  }

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
      <ConfirmModal
        isOpen={isModalOpen}
        confirm={deleteProduct}
        setIsOpen={() => setisModalOpen(false)}
        type="product"
      />
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
            {!isSaved ? "Add new product" : "Product details"}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "row" }}>
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
              marginRight: 12,
              border: "1px solid var(--grey-500)",
            }}
            onClick={() => setisModalOpen(true)}
          />
          <CustomButton
            title={!isSaved ? "Save" : "Save changes"}
            type="primary"
            width={174}
            iconPosition="left"
            style={{ height: 49, fontWeight: 100, marginBottom: 10 }}
            onClick={saveProduct}
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
              {productImages && productImages.length > 0 && (
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
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
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
              )}
              {typeof productImages === "object" &&
                Object.keys(productImages).length !== 0 && (
                  <EditImageModal
                    visible={isImageEdit}
                    onCancel={() => setisImageEdit(!isImageEdit)}
                    productImages={productImages}
                    modifyImage={handleModifyImage}
                  />
                )}

              <MyCarousel productImages={productImages} />
            </div>
          </div>

          <CustomButton
            icon={<PlusOutlined style={{ fontSize: 18, marginTop: 4 }} />}
            type="tertiary"
            size="big"
            title="Add image"
            iconPosition="left"
            width={400}
            style={{
              height: 64,
              fontSize: 15,
              fontWeight: "Medium",
              marginTop: 70,
              marginBottom: 43,
            }}
            onClick={() => setaddImageModal(!addImageModal)}
          />
          <Modal
            onCancel={() => {
              setaddImageModal(!addImageModal);
            }}
            footer={null}
            open={addImageModal}
            centered
            width={"auto"}
          >
            <ImageUploader addProductImage={addProductImage} />
          </Modal>
          <div
            style={{
              border: "1px solid var(--grey-600)",
              width: 408,
              borderRadius: 7,
              padding: "28px 22px",
              marginBottom: 30,
            }}
          >
            <div
              style={{
                color: "#000000",
                fontFamily: "Satoshi-Bold",
                fontSize: 20,
                marginBottom: 30,
              }}
            >
              Product Availability
            </div>
            <div
              style={{
                color: "var(--grey-900)",
                fontFamily: "Satoshi-Bold",
                marginBottom: 10,
              }}
            >
              Quantity Left in Stock
            </div>
            <div>
              <Select
                className="product-category"
                size="large"
                value={quantityLeft}
                onChange={(value) => {
                  setquantityLeft(parseInt(value));
                }}
                style={{ width: 351 }}
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
                        ref={qtyInStockRef}
                        value={name}
                        onChange={onNameChange}
                      />
                      <Button
                        type="text"
                        icon={<PlusOutlined />}
                        onClick={addItem}
                      >
                        Add item
                      </Button>
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
            <div
              style={{
                marginTop: 24,
                color: "var(--grey-900)",
                fontFamily: "Satoshi-Bold",
                display: "flex",
                alignItems: "center",
              }}
            >
              Display in Store
              <Switch
                size="small"
                style={{ marginLeft: 13 }}
                checked={displayInStore}
                onChange={() => {
                  setdisplayInStore(!displayInStore);
                }}
              />
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
                  fontFamily: "Satoshi-Bold",
                }}
              >
                Product Name
              </label>
              <Input
                id="productName"
                style={{ height: 53, marginTop: 10, marginBottom: 25 }}
                value={productName}
                onChange={(event) => {
                  setproductName(event.target.value);
                }}
                status={
                  !productName
                    ? "error"
                    : !formValidation && !productName
                    ? "warning"
                    : null
                }
                suffix={
                  !productName ? (
                    <InfoCircleFilled />
                  ) : !formValidation && !productName ? (
                    <WarningFilled />
                  ) : null
                }
                allowClear={true}
              />
            </div>
            <div>
              <label
                htmlFor="price"
                style={{
                  color: "var(--grey-900)",
                  fontFamily: "Satoshi-Bold",
                }}
              >
                Price
              </label>
              <div
                style={{
                  marginTop: 10,
                  marginBottom: 25,
                }}
              >
                <InputNumber
                  id="price"
                  prefix="₦"
                  style={{
                    height: 53,
                    width: "100%",
                    alignItems: "center",
                    fontSize: 16,
                    display: "flex",
                  }}
                  value={productPrice}
                  onChange={(value) => {
                    setproductPrice(value);
                  }}
                  status={
                    !productPrice
                      ? "error"
                      : !formValidation && !productPrice
                      ? "warning"
                      : null
                  }
                  suffix={
                    !productPrice ? (
                      <InfoCircleFilled />
                    ) : !formValidation && !productPrice ? (
                      <WarningFilled />
                    ) : null
                  }
                  formatter={(value) =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                  min={0.01}
                />
              </div>
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
                    fontFamily: "Satoshi-Bold",
                  }}
                >
                  Product Category
                </label>
                <a href="#" onClick={handleAddCategory}>
                  <PlusOutlined /> Add Category
                </a>
                <Modal
                  title={
                    <div
                      style={{
                        fontFamily: "Satoshi-Bold",
                        fontSize: 25,
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      Add new Category
                    </div>
                  }
                  open={isNewCategory}
                  onCancel={() => setisNewCategory(!isNewCategory)}
                  footer={""}
                  centered
                >
                  <div>
                    <div
                      style={{
                        marginTop: 41,
                        fontFamily: "Satoshi-Bold",
                        fontSize: 16,
                      }}
                    >
                      Name category
                    </div>
                    <div>
                      <Input
                        style={{
                          height: 63,
                          borderRadius: 11,
                          border: "1px solid var(--grey-800)",
                          marginTop: 10,
                        }}
                        value={addCategory}
                        onChange={(e) => {
                          setAddCategory(e.target.value);
                        }}
                        status={!addCategory && "warning"}
                        suffix={!addCategory && <InfoCircleFilled />}
                        allowClear={true}
                      />
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        marginTop: 68,
                      }}
                    >
                      <CustomButton
                        title="Save"
                        type="primary"
                        width={272}
                        onClick={addToCategories}
                      />
                    </div>
                  </div>
                </Modal>
              </div>

              <Select
                className="product-category"
                value={productCategory}
                onChange={(value) => {
                  setproductCategory(value);
                }}
                style={{
                  width: "100%",
                  marginBottom: 25,
                  marginTop: 10,
                }}
                size="large"
              >
                {/* Options for duration unit */}
                {categories &&
                  categories.map((option, key) => (
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
                  fontFamily: "Satoshi-Bold",
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
                      fontFamily: "Satoshi-Medium",
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
                        fontFamily: "Satoshi-Medium",
                        color: "var(--grey-800)",
                        marginLeft: 10,
                        marginTop: -5,
                      }}
                    >
                      |
                    </div>
                  </div>
                  <Select
                    className="product-category"
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
                  className="product-category"
                  defaultValue="days"
                  style={{ width: 254 }}
                  size="large"
                >
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
                  fontFamily: "Satoshi-Bold",
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
                      fontFamily: "Satoshi-Medium",
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
                        fontFamily: "Satoshi-Medium",
                        color: "var(--grey-800)",
                        marginLeft: 10,
                        marginTop: -5,
                      }}
                    >
                      |
                    </div>
                  </div>
                  <Select
                    className="product-category"
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
                  className="product-category"
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
                  fontFamily: "Satoshi-Bold",
                }}
              >
                Description
              </label>
              <Input.TextArea
                id="description"
                rows={7}
                style={{ marginTop: 10 }}
                value={productDescription}
                onChange={(event) => {
                  setproductDescription(event.target.value);
                }}
                status={
                  !productDescription
                    ? "error"
                    : !formValidation && !productDescription
                    ? "warning"
                    : null
                }
                suffix={
                  !productDescription ? (
                    <InfoCircleFilled />
                  ) : !formValidation && !productDescription ? (
                    <WarningFilled />
                  ) : null
                }
                allowClear={true}
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
                  fontFamily: "Satoshi-Bold",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                Set Delivery Options for this Product?
              </div>
              <Switch
                checked={deliveryOptions ? true : false}
                onClick={() =>
                  deliveryOptions
                    ? setdeliveryOptions(false)
                    : setisdeliveryOpen(!isdeliveryOpen)
                }
              />
              <DeliveryOption
                isOpen={isdeliveryOpen}
                onCancel={() => setisdeliveryOpen(!isdeliveryOpen)}
                onSave={saveDeliveryOption}
                currentSelected={deliveryOptions}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
function EditImageModal({ onCancel, visible, productImages, modifyImage }) {
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
              maxWidth: 800,
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
                <img src={image.src} alt={image.alt} width={200} height={200} />

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
  const [currentSlide, setCurrentSlide] = useState(0);
  const handleBeforeChange = (from, to) => {
    setCurrentSlide(to);
  };
  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.goTo(currentSlide, true);
    }
  }, [currentSlide]);
  const prevArrow = (
    <LeftOutlined
      onClick={() => carouselRef.current.prev()}
      style={{
        fontSize: "16px",
        marginLeft: 14,
        background: "rgba(255,255,255,0.28)",
        width: 41,
        height: 41,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 100,
        color: "var(--grey-1000)",
        strokeWidth: "100px",
        stroke: "black",
        strokeLinecap: "round",
        strokeLinejoin: "round",
      }}
    />
  );

  const nextArrow = (
    <RightOutlined
      style={{
        fontSize: "16px",
        marginRight: 14,
        background: "rgba(255,255,255,0.28)",
        width: 41,
        height: 41,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 100,
        color: "var(--grey-1000)",
        strokeWidth: "100px",
        stroke: "black",
        strokeLinecap: "round",
        strokeLinejoin: "round",
      }}
      onClick={() => carouselRef.current.next()}
    />
  );

  return (
    <div style={{ marginTop: productImages ? -50 : 50 }}>
      {productImages && productImages.length > 0 && (
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
      )}
      <Image.PreviewGroup>
        <Carousel
          className="product-details-carousel"
          ref={carouselRef}
          style={{
            width: 400,
            height: 550,
          }}
          beforeChange={handleBeforeChange}
        >
          {productImages && productImages.length > 0 ? (
            productImages &&
            productImages.map((item, index) => (
              <div key={index} style={{ borderRadius: 13 }}>
                <Image
                  src={item?.src}
                  alt={item?.alt}
                  width={400}
                  height={550}
                  style={{ borderRadius: 13 }}
                  fallback={brokenImageFallback}
                />
              </div>
            ))
          ) : (
            <div
              style={{
                borderRadius: 13,
              }}
            >
              <Image
                src={imageFallback}
                alt="Fallback Image"
                width={400}
                height={550}
                style={{ borderRadius: 13 }}
              />
            </div>
          )}
        </Carousel>
      </Image.PreviewGroup>
    </div>
  );
};
