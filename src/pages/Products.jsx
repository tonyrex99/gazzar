import { Input, Button, Pagination } from "antd";
import {
  SearchOutlined,
  AppstoreFilled,
  StopOutlined,
  StarFilled,
  PlusOutlined,
} from "@ant-design/icons";
import { TuneIcon } from "../assets/icons/CustomIcons";
import { CustomButtton } from "../assets/icons/CustomButtons";
import { useState } from "react";
const Categories = [
  { title: "Shoes" },
  { title: "Clothes" },
  { title: "Bags" },
];

const handleClick = (title) => {
  alert(`Hello world ${title}`);
};

const buttons = Categories.map((button, index) => (
  <CustomButtton
    key={index}
    className="unselected-filter"
    title={button.title}
    width={88}
    style={{ height: 49, fontWeight: 100, marginRight: 12, marginBottom: 10 }}
    onClick={() => handleClick(button.title)}
  />
));

const generateRandomProducts = (count) => {
  const products = [];

  for (let i = 0; i < count; i++) {
    const randomTitle = `XL brown hoodie ${i + 1}`;
    const randomDescription =
      "Super comfortable brown hoodie, available for both male and female";
    const randomPrice = "N8,350";
    const randomImageSrc =
      "https://ng.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/57/6414122/1.jpg?2313";
    const randomTopSelling = Math.random() < 0.5; // Randomly assign true or false
    const randomOutOfStock = Math.random() < 0.5; // Randomly assign true or false

    const product = {
      title: randomTitle,
      description: randomDescription,
      topSelling: randomTopSelling,
      outOfStock: randomOutOfStock,
      price: randomPrice,
      imageSrc: randomImageSrc,
    };

    products.push(product);
  }

  return products;
};

const generatedProducts = generateRandomProducts(100);

const totalProducts = generatedProducts.length;
const ProductList = ({ pageNumber, itemsPerPage }) => {
  const startIndex = (pageNumber - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedProducts = generatedProducts.slice(startIndex, endIndex);
  return (
    <>
      {displayedProducts.map((product, index) => (
        <div
          key={index}
          className="product-title"
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            height: "auto",
            borderRadius: 7,
            padding: "16px 14.5px",
            border: "1px solid var(--grey-600)",
            overflow: "auto",
            flexDirection: "column",
            marginRight: 14,
            marginBottom: 23,
          }}
        >
          <div
            style={{
              position: "relative",
              width: 183,
              height: 133,
              borderRadius: 8,
            }}
          >
            <img
              src={product.imageSrc}
              alt={product.title}
              style={{ width: "100%", height: "100%" }}
            />
            {(product.topSelling || product.outOfStock) && (
              <div
                style={{
                  position: "absolute",
                  top: 12,
                  left: 12,
                  backgroundColor: product.outOfStock
                    ? "var(--warning)"
                    : "var(--secondary-gold)",
                  color: "white",
                  padding: "4px 8px",
                  borderRadius: 20,
                  fontSize: 10,
                  height: 22,
                  width: 77,
                  border: "1px solid white",
                  fontFamily: "Satoshi",
                  fontWeight: "Medium",
                }}
              >
                {product.outOfStock ? (
                  <StopOutlined style={{ color: "white" }} />
                ) : (
                  <StarFilled style={{ color: "white" }} />
                )}
                {product.outOfStock ? " Sold out" : " Top selling"}
              </div>
            )}
          </div>
          <div style={{ width: 188, height: 87 }}>
            <div
              style={{
                fontSize: 18,
                fontFamily: "Satoshi",
                fontWeight: "Medium",
                color: "var(--grey-1100)",
              }}
            >
              {product.title}
            </div>
            <div
              style={{
                fontSize: 13,
                fontFamily: "Satoshi",
                fontWeight: "Regular",
                color: "var(--color-darkslategray-100)",
                marginBottom: 8,
              }}
            >
              {product.description}
            </div>
            <div
              style={{
                color: "var(--primary-navy-blue)",
                fontSize: 20,
                fontFamily: "Satoshi",
                fontWeight: "Bold",
              }}
            >
              {product.price}
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
export function Products() {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageSize, setCurrentPageSize] = useState(10);

  const onChange = (page) => {
    setCurrentPage(page);
  };

  const onSizeChange = (page, pageSize) => {
    setCurrentPageSize(pageSize);
    setCurrentPage(page);
  };

  return (
    <div className="dashboard-container" style={{ flexDirection: "column" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          flexWrap: "wrap",
          position: "sticky",
          top: 115,
          zIndex: 2,
          background: "white",
        }}
      >
        <div
          style={{
            height: 52,
            width: 427,
            background: "#f5f4f6",
            color: "var(--grey-500)",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            paddingLeft: 23,
            borderRadius: 8,
            border: "1px solid var(--grey-500)",
            marginBottom: 10,
          }}
        >
          <SearchOutlined style={{ fontSize: 20, color: "#7c7c8d" }} />
          <Input
            style={{
              height: 52,
              background: "#f5f4f6",
              color: "#7c7c8d",
              fontSize: 16,
              fontFamily: "Satoshi",
            }}
            placeholder="Search or type"
            size="large"
            bordered={false}
          />
        </div>

        <div
          style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
        >
          <Button
            icon={
              <TuneIcon
                style={{
                  color: "var(--grey-800)",
                  width: 17,
                  height: 17,
                }}
              />
            }
            style={{
              marginRight: 15,
              width: 101,
              height: 49,
              alignItems: "center",
              display: "flex",
              color: "var(--grey-800)",
              background: "var(--grey-200)",
              borderRadius: 8,
              border: "1px solid var(--grey-800)",
              marginBottom: 10,
            }}
          >
            Filter
          </Button>
          <CustomButtton
            icon={<PlusOutlined />}
            title="Add new product"
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
          justifyContent: "space-between",
          width: "100%",
          marginTop: 49,
          position: "sticky",
          top: 175,
          zIndex: 3,
          background: "white",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
          }}
        >
          <CustomButtton
            title="All (74)"
            type="primary"
            width={88}
            style={{
              height: 49,
              fontWeight: 100,
              marginRight: 12,
              marginBottom: 10,
            }}
            onClick={() => {
              alert("hello word anime");
            }}
          />
          {buttons}
          <CustomButtton
            icon={<PlusOutlined />}
            className="add-category"
            title="Add category"
            width={150.78}
            iconPosition="left"
            style={{
              height: 49,
              fontWeight: 100,
              marginRight: 12,
              marginBottom: 10,
            }}
            onClick={() => {
              alert("hello word anime");
            }}
          />
        </div>

        <CustomButtton
          className="add-category"
          title="List view"
          width={124}
          icon={<AppstoreFilled style={{ fontSize: 19, marginLeft: 5 }} />}
          iconPosition="right"
          style={{
            height: 49,
            fontWeight: 100,
            marginRight: 12,
            border: 0,
            background: "var(--grey-300)",
            color: "var(--grey-800)",
          }}
          onClick={() => {
            alert("hello word anime");
          }}
        />
      </div>
      <div
        style={{
          flexDirection: "row",
          display: "flex",
          flexWrap: "wrap",
          marginTop: 36,
          justifyContent: "flex-start",
        }}
      >
        <ProductList pageNumber={currentPage} itemsPerPage={currentPageSize} />
      </div>
      <Pagination
        showSizeChanger
        onShowSizeChange={onSizeChange}
        style={{
          border: "1px solid #dedede",
          borderRadius: 8,
          padding: "13px 36px 13px 36px",
        }}
        current={currentPage}
        onChange={onChange}
        total={totalProducts}
      />
      ;
    </div>
  );
}
