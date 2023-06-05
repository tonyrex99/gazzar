import { Input, Button, Pagination, Modal, Image, Carousel } from "antd";
import {
  SearchOutlined,
  AppstoreFilled,
  StopOutlined,
  StarFilled,
  PlusOutlined,
  BarsOutlined,
} from "@ant-design/icons";
import { CustomIcon } from "../assets/icons/CustomIcons";
import { CustomButton } from "../assets/icons/CustomButtons";
import { useState } from "react";
import ProductsTable from "../components/ProductsTable";
import { SearchNFilter } from "../components/SearchNFilter";
import ProductDetails from "../components/ProductDetails";
import imageFallback from "../assets/no-image-fallback.svg";
import brokenImageFallback from "../assets/broken-image-fallback.png";
import { faker } from "https://cdn.skypack.dev/@faker-js/faker";

const generateRandomProducts = (count) => {
  const products = [];

  function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const randomCategory = ["Shoes", "Clothes", "Bags"];
  function getRandomValues(count, array) {
    const result = [];
    const maxCount = Math.min(count, array.length);

    // Pick at least one element from the array
    const randomIndex = Math.floor(Math.random() * array.length);
    result.push(array[randomIndex]);

    // Pick remaining values randomly
    for (let i = 1; i < maxCount; i++) {
      let newIndex;

      do {
        newIndex = Math.floor(Math.random() * array.length);
      } while (result.includes(array[newIndex])); // Ensure unique values

      result.push(array[newIndex]);
    }

    return result;
  }

  for (let i = 0; i < count; i++) {
    const randomTitle = faker.commerce.productName();
    const randomDescription = faker.lorem.sentence();
    const randomPrice = getRandomNumber(1000, 20000);
    const randomImageSrc = [];
    const numberOfImages = 5;

    for (let i = 1; i <= numberOfImages; i++) {
      randomImageSrc.push({
        id: i,
        src: `https://picsum.photos/id/${getRandomNumber(0, 800)}/440/550`,
        alt: `Image ${i}`,
      });
    }

    const randomTopSelling = Math.random() < 0.5;
    const visibleInStore = Math.random() < 0.5;
    const qtySold = getRandomNumber(0, 99);
    const qtyLeft = getRandomNumber(0, 99);
    const randomOutOfStock = qtyLeft === 0;

    const categories = getRandomValues(1, randomCategory);

    const product = {
      key: i.toString(), // Add a unique key property
      title: randomTitle,
      description: randomDescription,
      topSelling: randomTopSelling,
      outOfStock: randomOutOfStock,
      price: randomPrice,
      imageSrc: randomImageSrc,
      qtySold: qtySold,
      qtyLeft: qtyLeft,
      category: categories,
      visibleInStore: visibleInStore,
    };

    products.push(product);
  }

  return products;
};

const ProductList = ({
  pageNumber,
  itemsPerPage,
  data,
  filter,
  categoryFilter,
  setSelected,
  openProdDetails,
}) => {
  const startIndex = (pageNumber - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedProducts = data.slice(startIndex, endIndex);
  const handleProductClick = (product) => {
    setSelected(product);
    openProdDetails();
  };
  const handleChildClick = (e) => {
    e.stopPropagation();
  };

  return (
    <>
      {displayedProducts.map((product, index) => (
        <div
          onClick={() => handleProductClick(product)}
          key={index}
          className="product-title"
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            height: "281px",
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
            onClick={(e) => handleChildClick(e)}
          >
            <Image.PreviewGroup>
              <Carousel dots={false} autoplay={true} effect={"fade"}>
                {product?.imageSrc ? (
                  product.imageSrc.map((image, index) => (
                    <div key={index} style={{ borderRadius: 8 }}>
                      <Image
                        key={index}
                        src={image?.src}
                        alt={product?.title}
                        width={183}
                        height={133}
                        style={{ borderRadius: 8 }}
                        fallback={brokenImageFallback}
                      />
                    </div>
                  ))
                ) : (
                  <div key={index} style={{ borderRadius: 8 }}>
                    <Image
                      src={imageFallback}
                      alt={product?.title}
                      width={183}
                      height={133}
                      style={{ borderRadius: 8 }}
                      fallback={brokenImageFallback}
                    />
                  </div>
                )}
              </Carousel>
            </Image.PreviewGroup>

            {(product?.topSelling || product?.outOfStock) && (
              <div style={{ position: "absolute", top: 12, left: 12 }}>
                {product?.topSelling && (
                  <div
                    style={{
                      backgroundColor: "var(--secondary-gold)",
                      color: "white",
                      padding: "4px 8px",
                      borderRadius: 20,
                      fontSize: 10,
                      height: 22,
                      width: 79,
                      border: "1px solid white",
                      fontFamily: "Satoshi",
                      fontWeight: "Medium",
                      marginBottom: 4,
                    }}
                  >
                    <StarFilled style={{ color: "white" }} /> Top selling
                  </div>
                )}
                {product?.outOfStock && (
                  <div
                    style={{
                      backgroundColor: "var(--warning)",
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
                    <StopOutlined style={{ color: "white" }} /> Sold out
                  </div>
                )}
              </div>
            )}
          </div>
          <div style={{ width: 188, height: 87, position: "relative" }}>
            <div
              style={{
                fontSize: 18,
                fontFamily: "Satoshi",
                fontWeight: "Medium",
                color: "var(--grey-1100)",
                marginTop: 10,
                width: 200,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {product?.title}
            </div>

            <div>
              <div
                style={{
                  fontSize: 13,
                  fontFamily: "Satoshi",
                  fontWeight: "Regular",
                  color: "var(--color-darkslategray-100)",
                  marginBottom: 8,
                }}
              >
                {product?.description && product?.description.length > 50
                  ? product?.description.slice(0, 47) + "..."
                  : product?.description}
              </div>

              <div
                style={{
                  color: "var(--primary-navy-blue)",
                  fontSize: 20,
                  fontFamily: "Satoshi",
                  fontWeight: "Bold",
                }}
              >
                ₦ {new Intl.NumberFormat().format(product?.price)}
              </div>
              <div
                style={{
                  position: "absolute",
                  bottom: -10,
                  left: 0,
                  width: "100%",
                  height: "80%",
                  background: "rgba(255, 255, 255, 0.86)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  opacity: 0,
                  transition: "opacity 0.3s ease",
                  cursor: "pointer",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.opacity = 1;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = 0;
                }}
              >
                <div
                  style={{
                    fontSize: 16,
                    fontFamily: "Satoshi",
                    fontWeight: "Medium",
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
                        height: 28,
                        width: 83,
                        background: "var(--grey-100)",
                        borderRadius: 100,
                        border: "1px solid var(--grey-600)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        fontFamily: "Satoshi",
                        fontSize: 14,
                        fontWeight: "Regular",
                        color: "var(--grey-800)",
                        marginRight: 10,
                      }}
                    >
                      <div
                        style={{
                          fontWeight: "Bold",
                          color: "var(--success)",
                          marginRight: 7,
                        }}
                      >
                        {product?.qtySold}
                      </div>
                      Sold
                    </div>
                    <div
                      style={{
                        height: 28,
                        width: 83,
                        background: "var(--grey-100)",
                        borderRadius: 100,
                        border: "1px solid var(--grey-600)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        fontFamily: "Satoshi",
                        fontSize: 14,
                        fontWeight: "Regular",
                        color: "var(--grey-800)",
                      }}
                    >
                      <div
                        style={{
                          fontWeight: "Bold",
                          color: "var(--warning)",
                          marginRight: 7,
                        }}
                      >
                        {product?.qtyLeft}
                      </div>
                      Left
                    </div>
                  </div>
                </div>
              </div>
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
  const [displayMode, setdisplayMode] = useState(1);
  const [isNewCategory, setisNewCategory] = useState(false);
  const [addCategory, setAddCategory] = useState("");
  const [selectedProduct, setSelectedProduct] = useState({});
  const [isProdDetailsOpen, setIsProdDetailsOpen] = useState(false);
  const spawnproduct = generateRandomProducts(100);
  const [generatedProducts, setGeneratedProducts] = useState(spawnproduct);
  const [Categories, setCategories] = useState([
    { title: "Shoes" },
    { title: "Clothes" },
    { title: "Bags" },
  ]);
  function setProdCategories(value) {
    setCategories(value);
  }
  const addToCategories = () => {
    if (addCategory.length > 1) {
      let currentCategories = Categories;
      let newCategory = { title: addCategory };
      currentCategories.push(newCategory);
      setProdCategories(currentCategories);
      setisNewCategory(!isNewCategory);
    }
  };

  const handleClick = (title) => {
    alert(`Hello world ${title}`);
  };
  function updateProducts(newProduct) {
    const updatedProducts = generatedProducts;
    const index = updatedProducts.findIndex(
      (product) => product.key === newProduct.key
    );

    if (index !== -1) {
      updatedProducts[index] = newProduct;
    } else {
      // Generate a new key for the new product based on its index
      const newIndex = updatedProducts.length + 1;

      // Create a new product object with the provided values and additional properties
      const productToAdd = {
        ...newProduct,
        key: newIndex.toString(),
        topSelling: false,
        outOfStock: false,
        qtySold: 0,
      };

      updatedProducts.push(productToAdd);
    }

    setGeneratedProducts(updatedProducts);
  }

  const totalProducts = generatedProducts.length;
  const buttons = Categories.map((button, index) => (
    <CustomButton
      key={index}
      className="unselected-filter"
      title={button.title}
      width={88}
      style={{ height: 49, fontWeight: 100, marginRight: 12, marginBottom: 10 }}
      onClick={() => handleClick(button.title)}
    />
  ));
  const onChange = (page) => {
    setCurrentPage(page);
  };

  const onSizeChange = (page, pageSize) => {
    setCurrentPageSize(pageSize);
    setCurrentPage(page);
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };
  function backClick() {
    setSelectedProduct({});
    setIsProdDetailsOpen(!isProdDetailsOpen);
  }
  function handleProdDetails() {
    setIsProdDetailsOpen(!isProdDetailsOpen);
  }
  if (isProdDetailsOpen) {
    return (
      <ProductDetails
        data={selectedProduct}
        onBackClick={backClick}
        categories={Categories}
        modifyActiveProduct={updateProducts}
        changeCategories={setProdCategories}
      />
    );
  }
  return (
    <div className="dashboard-container" style={{ flexDirection: "column" }}>
      <SearchNFilter
        showFilter
        addItemLabel={"Add new product"}
        addItemClick={handleProdDetails}
      />
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
            overflowX: "scroll",
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              overflowX: "scroll",
            }}
          >
            <CustomButton
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
          </div>
          <CustomButton
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
              setisNewCategory(!isNewCategory);
            }}
          />
        </div>

        <CustomButton
          className="add-category"
          title={displayMode ? "List view" : "Table view"}
          width={124}
          icon={
            displayMode ? (
              <AppstoreFilled style={{ fontSize: 19, marginLeft: 5 }} />
            ) : (
              <BarsOutlined style={{ fontSize: 19, marginLeft: 5 }} />
            )
          }
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
            setdisplayMode(!displayMode);
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
        {displayMode ? (
          <ProductList
            pageNumber={currentPage}
            itemsPerPage={currentPageSize}
            data={generatedProducts}
            categoryFilter={Categories}
            setSelected={handleProductClick}
            openProdDetails={handleProdDetails}
          />
        ) : (
          <ProductsTable
            data={generatedProducts}
            pageNumber={currentPage}
            itemsPerPage={currentPageSize}
            categoryFilter={Categories}
          />
        )}
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
      <Modal
        title={
          <div
            style={{
              fontFamily: "Satoshi",
              fontWeight: "Bold",
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
              fontFamily: "Satoshi",
              fontWeight: "Bold",
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
  );
}
