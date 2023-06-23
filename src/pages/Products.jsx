import {
  Input,
  Pagination,
  Modal,
  Image,
  Carousel,
  DatePicker,
  Select,
  InputNumber,
  Empty,
} from "antd";
import {
  SearchOutlined,
  AppstoreFilled,
  StopOutlined,
  StarFilled,
  PlusOutlined,
  BarsOutlined,
  CheckCircleFilled,
  DeleteOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { CustomIcon, EmptySvg } from "../assets/icons/CustomIcons";
import { CustomButton } from "../assets/icons/CustomButtons";
import { useState, useCallback, useEffect } from "react";
import ProductsTable from "../components/ProductsTable";
import { SearchNFilter } from "../components/SearchNFilter";
import ProductDetails from "./subPages/ProductDetails";
import imageFallback from "../assets/no-image-fallback.svg";
import brokenImageFallback from "../assets/broken-image-fallback.png";
import { useLongPress } from "use-long-press";
import FilterProducts from "../components/FilterProducts";
import { useDispatch, useSelector } from "react-redux";
import {
  addProduct,
  removeProduct,
  updateProduct,
} from "../features/products/ProductsSlice";
const ProductList = ({
  pageNumber,
  itemsPerPage,
  data,
  filter,
  categoryFilter,
  setSelected,
  openProdDetails,
  handleMultipleSelected,
  multipleSelected,
  setProductsNumber,
  displayMode,
  handleTableSelect,
  setAllProductsNumber,
}) => {
  const [isLongPressActive, setLongPressActive] = useState(false);
  const [editMode, setEditMode] = useState(true);
  const startIndex = (pageNumber - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Apply filters to the product list
  let filteredProducts = data.slice();

  // Filter by title
  if (filter && filter.filterTitle) {
    const { filterTitle } = filter;
    filteredProducts = filteredProducts.filter((product) => {
      const productTitle = product.title.toLowerCase();
      const filterKeywords = filterTitle.toLowerCase().split(" ");
      return filterKeywords.some((keyword) => productTitle.includes(keyword));
    });
  }
  // Filter by date range
  if (filter && filter.filterDate) {
    const currentDate = new Date();
    const { filterDate } = filter;

    if (filterDate.includes(",")) {
      const [startDate, endDate] = filterDate.split(",");

      if (startDate) {
        const startDateTime = startDate.startsWith("+")
          ? new Date(
              currentDate.getTime() + parseInt(startDate.slice(1)) * 86400000
            ) // Adding days
          : new Date(startDate);
        filteredProducts = filteredProducts.filter(
          (product) => new Date(product.createdAt) >= startDateTime
        );
      }

      if (endDate) {
        const endDateTime = endDate.startsWith("+")
          ? new Date(
              currentDate.getTime() + parseInt(endDate.slice(1)) * 86400000
            ) // Adding days
          : new Date(endDate);
        filteredProducts = filteredProducts.filter(
          (product) => new Date(product.createdAt) <= endDateTime
        );
      }
    } else {
      const dateTime = filterDate.startsWith("+")
        ? new Date(
            currentDate.getTime() + parseInt(filterDate.slice(1)) * 86400000
          ) // Adding days
        : new Date(filterDate);
      filteredProducts = filteredProducts.filter(
        (product) => new Date(product.createdAt) >= dateTime
      );
    }
  }

  // Filter by price
  if (filter && filter.filterPriceFrom && filter.filterPriceTo) {
    const { filterPriceFrom, filterPriceTo } = filter;
    filteredProducts = filteredProducts.filter(
      (product) =>
        product.price >= filterPriceFrom && product.price <= filterPriceTo
    );
  }

  // Filter by quantity sold
  if (filter && filter.filterQuantitySold) {
    const { filterQuantitySold } = filter;
    filteredProducts = filteredProducts.filter(
      (product) => product.qtySold >= filterQuantitySold
    );
  }
  setAllProductsNumber(filteredProducts.length);

  // Filter by category
  if (categoryFilter) {
    filteredProducts = filteredProducts.filter(
      (product) => product.category == categoryFilter
    );
  }

  const displayedProducts = filteredProducts.slice(startIndex, endIndex);

  setProductsNumber(filteredProducts.length);
  const handleProductClick = (product) => {
    if (editMode) {
      handleMultipleSelected(product);
    } else {
      setSelected(product);
      openProdDetails();
    }
  };
  const handleChildClick = (e) => {
    e.stopPropagation();
  };

  function replaceDimensions(url) {
    return url.replace("440/550", "183/133");
  }
  const callback = useCallback(
    (event, product) => {
      if (isLongPressActive) {
        handleMultipleSelected(product.context);
        setEditMode(true);
      }
    },
    [isLongPressActive]
  );
  useEffect(() => {
    if (multipleSelected.length === 0) {
      setEditMode(false);
    }
  }, [multipleSelected]);

  const bind = useLongPress(callback, {
    onStart: () => setLongPressActive(true),
    onFinish: () => {
      setTimeout(() => setLongPressActive(false), 500); // Wait half a second before setting back to true
    },
    onCancel: () => setLongPressActive(false),
    threshold: 500,
    captureEvent: true,
    cancelOutsideElement: true,
    detect: "pointer",
  });

  const isObjectInArray = (array, key) => {
    return array.some((item) => item.key === key);
  };
  return displayMode ? (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        width: "100%",
      }}
    >
      {displayedProducts.length > 0 ? (
        displayedProducts.map((product, index) => (
          <div
            {...bind(product)}
            onClick={(event) => {
              event.stopPropagation();
              if (!isLongPressActive) {
                handleProductClick(product);
              }
            }}
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
                <Carousel autoplay={true} effect={"fade"}>
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
              {isObjectInArray(multipleSelected, product.key) && (
                <div
                  style={{
                    background: "white",
                    opacity: 0.5, // Adjust opacity to make it slightly visible
                    height: "100%",
                    width: "100%",
                    position: "absolute",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    top: 0,
                    left: 0,
                    zIndex: 1, // Ensure it appears behind other content
                  }}
                >
                  <CheckCircleFilled
                    style={{ fontSize: 100, color: "var(--primary-navy-blue)" }}
                  />
                </div>
              )}
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
                        fontFamily: "Satoshi-Medium",
                        marginBottom: 4,
                      }}
                    >
                      <StarFilled style={{ color: "white" }} /> Top selling
                    </div>
                  )}
                  {product?.qtyLeft < 1 && (
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
                        fontFamily: "Satoshi-Medium",
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
                  fontFamily: "Satoshi-Medium",
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
                    fontFamily: "Satoshi-Regular",
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
                    fontFamily: "Satoshi-Bold",
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
                      fontFamily: "Satoshi-Medium",
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
        ))
      ) : (
        <div style={{ marginBottom: 50, width: "100%", height: "100%" }}>
          <Empty
            description={
              <div
                style={{
                  fontFamily: "Satoshi-Medium",
                  fontSize: 16,
                  color: "var(--secondary-gold)",
                }}
              >
                {" "}
                No products to display {`\u{1F625}`}{" "}
              </div>
            }
            image={<EmptySvg />}
          />
        </div>
      )}
    </div>
  ) : (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        width: "100%",
        justifyContent: "flex-start",
      }}
    >
      <ProductsTable
        data={filteredProducts}
        pageNumber={pageNumber}
        itemsPerPage={itemsPerPage}
        handleTableSelect={handleTableSelect}
        TableSelected={multipleSelected}
        handleProductClick={handleProductClick}
      />
    </div>
  );
};
export function Products() {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageSize, setCurrentPageSize] = useState(10);
  const [displayMode, setdisplayMode] = useState(1);
  const [isNewCategory, setisNewCategory] = useState(false);
  const [addCategory, setAddCategory] = useState("");
  const [selectedProduct, setSelectedProduct] = useState({});
  const [multipleSelectedProduct, setMultipleSelectedProduct] = useState([]);
  const [isProdDetailsOpen, setIsProdDetailsOpen] = useState(false);
  const generatedProducts = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const [Categories, setCategories] = useState([
    { title: "Shoes" },
    { title: "Clothes" },
    { title: "Bags" },
  ]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [totalProducts, setTotalProducts] = useState(generatedProducts.length);
  const [searchValue, setSearchValue] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [currentFilter, setcurrentFilter] = useState({});
  const [allProductsNumber, setAllProductsNumber] = useState(
    generatedProducts.length
  );
  function onSearch(value) {
    setSearchValue(value);
  }
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
    setSelectedCategory(title);
  };
  function updateProducts(newProduct, action) {
    if (action === "add") {
      // Dispatch the addProduct action with the new product
      dispatch(updateProduct(newProduct));
    } else if (action === "delete") {
      // Dispatch the removeProduct action with the key of the product to remove
      dispatch(removeProduct(newProduct.key));
    }
  }

  0;
  function setProductsNumber(data) {
    setTotalProducts(data);
  }

  const buttons = Categories.map((button, index) => (
    <CustomButton
      key={index}
      type={selectedCategory == button.title && "primary"}
      className={selectedCategory != button.title && "unselected-filter"}
      title={
        button.title +
        (selectedCategory == button.title ? ` (${totalProducts})` : "")
      }
      width={"auto"}
      style={{ height: 49, fontWeight: 100, marginRight: 12, marginBottom: 10 }}
      onClick={(event) => {
        event.stopPropagation();
        handleClick(button.title);
      }}
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
  const handleProductLongPress = (product) => {
    const existingIndex = multipleSelectedProduct.findIndex(
      (item) => item.key === product.key
    );

    if (existingIndex !== -1) {
      const updatedList = multipleSelectedProduct.filter(
        (item, index) => index !== existingIndex
      );
      setMultipleSelectedProduct(updatedList);
    } else {
      setMultipleSelectedProduct((prevState) => [...prevState, product]);
    }
  };

  const handleTableSelect = (data) => {
    setMultipleSelectedProduct(data);
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

  function transformArray(array) {
    return array.map((item) => {
      const { title } = item;
      return { label: title, value: title };
    });
  }

  const removeSelectedProducts = () => {
    multipleSelectedProduct.forEach((product) => {
      dispatch(removeProduct(product.key));
    });
    setMultipleSelectedProduct([]);
  };

  return (
    <div
      className="dashboard-container"
      style={{ flexDirection: "column", alignItems: "normal" }}
      onClick={(event) => {
        setMultipleSelectedProduct([]);
        event.stopPropagation();
      }}
    >
      <SearchNFilter
        showFilter
        addItemLabel={"Add new product"}
        addItemClick={handleProdDetails}
        onSearchChange={onSearch}
        searchValue={searchValue}
        onFilterClick={() => {
          setIsFilterOpen(!isFilterOpen);
        }}
        isFilterActive={currentFilter}
        otherComponent={
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-between",
              width: "100%",
              marginTop: 49,

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
                  title={`All (${allProductsNumber})`}
                  type={selectedCategory == "" && "primary"}
                  width={"auto"}
                  style={{
                    height: 49,
                    fontWeight: 100,
                    marginRight: 12,
                    marginBottom: 10,
                  }}
                  className={selectedCategory != "" && "unselected-filter"}
                  onClick={(event) => {
                    event.stopPropagation();
                    setSelectedCategory("");
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
                onClick={(event) => {
                  event.stopPropagation();
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
              onClick={(event) => {
                event.stopPropagation();
                setdisplayMode(!displayMode);
              }}
            />
          </div>
        }
      >
        {
          <CustomButton
            type="primary"
            icon={<CustomIcon name="Trash" />}
            title={
              multipleSelectedProduct.length === allProductsNumber.length
                ? "Delete All"
                : multipleSelectedProduct.length > 0
                ? `Delete (${multipleSelectedProduct.length})`
                : "Delete"
            }
            iconPosition="left"
            width={"auto"}
            style={{
              height: 49,
              backgroundColor:
                multipleSelectedProduct.length > 0 && "rgba(240,72,72,0.15)",
              color: multipleSelectedProduct.length > 0 && "var(--warning)",

              fontWeight: "bold",
              marginRight: 12,
              border: "1px solid var(--grey-500)",
              marginBottom: 10,
            }}
            onClick={(event) => {
              event.stopPropagation();
              removeSelectedProducts();
            }}
            disabled={multipleSelectedProduct.length < 1}
          />
        }
      </SearchNFilter>

      <FilterProducts
        isOpen={isFilterOpen}
        onCancel={() => {
          setIsFilterOpen(!isFilterOpen);
        }}
        currentSelectedCategory={selectedCategory}
        Categories={transformArray(Categories)}
        onApply={(value) => {
          setcurrentFilter(value);
          setIsFilterOpen(!isFilterOpen);
        }}
        onClear={() => {
          setcurrentFilter({});
          setIsFilterOpen(!isFilterOpen);
        }}
        changeCurrentSelectedCategory={handleClick}
      />

      <div
        style={{
          flexDirection: "row",
          display: "flex",
          flexWrap: "wrap",
          marginTop: 36,
          justifyContent: "flex-start",
        }}
      >
        <ProductList
          pageNumber={currentPage}
          itemsPerPage={currentPageSize}
          data={generatedProducts}
          setSelected={handleProductClick}
          openProdDetails={handleProdDetails}
          multipleSelected={multipleSelectedProduct}
          handleMultipleSelected={handleProductLongPress}
          categoryFilter={selectedCategory}
          setProductsNumber={setProductsNumber}
          displayMode={displayMode}
          handleTableSelect={handleTableSelect}
          filter={{ filterTitle: searchValue, ...currentFilter }}
          setAllProductsNumber={(value) => setAllProductsNumber(value)}
        />
      </div>
      <div
        onClick={(event) => {
          event.stopPropagation();
        }}
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
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
          showTotal={(total, range) =>
            `${range[0]}-${range[1]} of ${total} products`
          }
        />
      </div>

      {/** add category modal */}
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
              onClick={(event) => {
                event.stopPropagation();
                addToCategories();
              }}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}
