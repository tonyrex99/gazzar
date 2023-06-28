import { ImageScroller } from "../ImageScroller";
import { Empty, Image, Carousel, Pagination, Modal, Button } from "antd";
import { NavLink } from "react-router-dom";
import { faker } from "@faker-js/faker";
import { useState, useEffect } from "react";
import { EmptySvg } from "../../../assets/icons/CustomIcons";
import { useSelector } from "react-redux";
import brokenImageFallback from "../../../assets/broken-image-fallback.png";
import imageFallback from "../../../assets/no-image-fallback.svg";
import bannerImage from "../../../assets/storeBannerImage.png";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";

import { CustomButton } from "../../../assets/icons/CustomButtons";
export default function HomePage() {
  const [searchValue, setsearchValue] = useState("");
  const [currentPage, setcurrentPage] = useState(1);
  const [currentPageSize, setCurrentPageSize] = useState(10);
  const [Categories, setCategories] = useState([
    { title: "Shoes" },
    { title: "Clothes" },
    { title: "Bags" },
  ]);
  const [isProductModalOpen, setisProductModalOpen] = useState(false);
  const [selectedProduct, setselectedProduct] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedProductImage, setselectedProductImage] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [incrementButton, setincrementButton] = useState(1);

  useEffect(() => {
    const data = localStorage.getItem("GazzarDemoCart");
    const parsedCart = JSON.parse(data);
    if (data) {
      setCartItems(parsedCart);
    }
  }, []);

  const onChange = (page) => {
    setcurrentPage(page);
  };
  const onSizeChange = (page, pageSize) => {
    setCurrentPageSize(pageSize);
    setcurrentPage(page);
  };

  const myProducts = useSelector((state) => state.products);

  function filterProducts(data) {
    const filteredProducts = data.filter(
      (product) => product.category == selectedCategory
    );

    if (filteredProducts < 1) {
      return myProducts;
    }
    return filteredProducts;
  }

  function filterByTitle(data) {
    const filterTitle = searchValue;
    const filteredProducts = data.filter((product) => {
      const productTitle = product.title.toLowerCase();
      const filterKeywords = filterTitle.toLowerCase().split(" ");
      return filterKeywords.some((keyword) => productTitle.includes(keyword));
    });
    return filteredProducts;
  }

  const filteredProducts = filterByTitle(filterProducts(myProducts));

  const startIndex = (currentPage - 1) * currentPageSize;
  const endIndex = startIndex + currentPageSize;
  const displayedProducts = filteredProducts.slice(startIndex, endIndex);
  const handleClick = (title) => {
    setSelectedCategory(title);
  };
  const buttons = Categories.map((button, index) => (
    <CustomButton
      key={index}
      type={selectedCategory == button.title && "primary"}
      className={selectedCategory != button.title && "unselected-filter"}
      title={
        button.title +
        (selectedCategory == button.title
          ? ` (${filteredProducts.length})`
          : "")
      }
      width={"auto"}
      style={{ height: 49, fontWeight: 100, marginRight: 12, marginBottom: 10 }}
      onClick={(event) => {
        event.stopPropagation();
        handleClick(button.title);
      }}
    />
  ));

  const addToCart = (product) => {
    setincrementButton(!incrementButton);
    // Check if cart already exists in localStorage
    const existingCart = localStorage.getItem("GazzarDemoCart");
    if (existingCart) {
      // Parse the existing cart from JSON string
      const cart = JSON.parse(existingCart);
      // Check if the product is already in the cart
      const localExistingProduct = cartItems.find(
        (item) => item.key === product.key
      );
      const existingProduct = cart.find((item) => item.key === product.key);
      if (existingProduct) {
        // Increase the quantity of the existing product in the cart
        localExistingProduct.quantity += 1;
        existingProduct.quantity += 1;
      } else {
        // Add the product to the cart
        const tempData = cartItems;
        setCartItems([
          ...tempData,
          {
            key: product.key,
            title: product.title,
            quantity: 1,
            image: product.imageSrc[0],
            price: product.price,
          },
        ]);
        cart.push({
          key: product.key,
          title: product.title,
          quantity: 1,
          image: product.imageSrc[0],
          price: product.price,
        });
      }
      // Update the cart in localStorage
      localStorage.setItem("GazzarDemoCart", JSON.stringify(cart));
    } else {
      // Create a new cart in localStorage and add the product
      const cart = [
        {
          key: product.key,
          title: product.title,
          quantity: 1,
          image: product.imageSrc[0],
          price: product.price,
        },
      ];
      setCartItems([
        {
          key: product.key,
          title: product.title,
          quantity: 1,
          image: product.imageSrc[0],
          price: product.price,
        },
      ]);
      localStorage.setItem("GazzarDemoCart", JSON.stringify(cart));
    }
  };
  const decrementFromCart = (product) => {
    setincrementButton(!incrementButton);

    const existingCart = localStorage.getItem("GazzarDemoCart");
    if (existingCart) {
      const cart = JSON.parse(existingCart);
      const localExistingProduct = cartItems.find(
        (item) => item.key === product.key
      );
      const existingProduct = cart.find((item) => item.key === product.key);
      if (existingProduct && existingProduct.quantity > 1) {
        localExistingProduct.quantity -= 1;
        existingProduct.quantity -= 1;
        // Update the cart in localStorage
        localStorage.setItem("GazzarDemoCart", JSON.stringify(cart));
        // Update the cartItems state
        setCartItems([...cartItems]);
      } else {
        // Remove the product from the cart
        const updatedCart = cart.filter((item) => item.key !== product.key);
        setCartItems(cartItems.filter((item) => item.key !== product.key));
        localStorage.setItem("GazzarDemoCart", JSON.stringify(updatedCart));
      }
    }
  };

  const checkQuantity = (product) => {
    const localExistingProduct = cartItems.find(
      (item) => item.key === product.key
    );
    if (localExistingProduct) {
      return localExistingProduct.quantity;
    } else {
      return 0;
    }
  };

  const handleQuantityChange = (product, type) => {
    const updatedItems = cartItems.map((item) => {
      if (item.key === product.key) {
        if (type == "add") {
          addToCart(product);
        } else {
          decrementFromCart(product);
        }
      }
    });
  };

  return (
    <div className="layout">
      <div
        style={{
          display: "flex",
          backgroundImage: `url(${bannerImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          flexDirection: "column",
          width: "auto",
          height: "auto",
          color: "white",
          fontSize: 63.36,
          fontFamily: "Satoshi-Black",
          paddingTop: 115,
          paddingLeft: 164,
        }}
      >
        <div style={{ marginBottom: 47 }}>
          I sell shoes, clothes, <br /> bags and other clothing <br />
          accessories.
        </div>
        <a href="#products">
          <Button
            style={{
              padding: "20px 67px",
              border: "2px solid white",
              width: "241px",
              height: "64px",
              background: "transparent",
              color: "white",
              fontFamily: "Satoshi-Bold",
              fontSize: 23,
              marginBottom: 90,
              alignItems: "center",
              display: "flex",
            }}
          >
            Shop now
          </Button>
        </a>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          overflowX: "scroll",
          marginTop: 20,
          marginLeft: 75,
        }}
      >
        <CustomButton
          title={`All (${myProducts.length})`}
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
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <div
          id="products"
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            width: "100%",
            justifyContent: "center",
            marginTop: 46,
          }}
        >
          {displayedProducts.length > 0 ? (
            displayedProducts.map((product, index) => (
              <div
                key={index}
                className="product-title"
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  // alignItems: "center",
                  height: "330px",
                  borderRadius: 7,
                  padding: "10px 12px",
                  border: "1px solid var(--grey-600)",
                  overflow: "auto",
                  flexDirection: "column",
                  marginRight: 14,
                  marginBottom: 23,
                }}
                onClick={() => {
                  setselectedProduct(product);
                  setselectedProductImage(product.imageSrc[0].src);
                  setisProductModalOpen(true);
                }}
              >
                <div
                  style={{
                    position: "relative",
                    top: 16,
                    width: 183,
                    height: 133,
                    borderRadius: 8,
                    marginBottom: 17,
                    alignSelf: "center",
                    //   marginTop: -200,
                  }}
                >
                  <Carousel key={index} dots={false}>
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
                </div>
                <div
                  style={{
                    width: 188,
                    height: 87,
                    position: "relative",
                    alignSelf: "center",
                  }}
                >
                  <div
                    style={{
                      fontSize: 14,
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
                        fontSize: 12,
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
                  </div>
                </div>

                {checkQuantity(product) ? (
                  <Button.Group
                    style={{
                      marginTop: 17,
                      // marginBottom: 24,
                      height: 48,
                      alignSelf: "center",
                    }}
                    key={incrementButton}
                  >
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
                      onClick={(event) => {
                        event.stopPropagation();
                        handleQuantityChange(product, "reduce");
                      }}
                    />

                    <div
                      style={{
                        marginLeft: 18,
                        marginRight: 18,
                      }}
                    >
                      {checkQuantity(product)}
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
                      onClick={(event) => {
                        event.stopPropagation();
                        handleQuantityChange(product, "add");
                      }}
                    />
                  </Button.Group>
                ) : (
                  <CustomButton
                    title="Add to cart"
                    type="primary"
                    width={203}
                    style={{
                      marginTop: 17,
                      marginBottom: 24,
                      height: 48,
                    }}
                    onClick={(event) => {
                      event.stopPropagation();
                      addToCart(product);
                    }}
                  />
                )}
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
        <Pagination
          showSizeChanger
          onShowSizeChange={onSizeChange}
          style={{
            border: "1px solid #dedede",
            borderRadius: 8,
            padding: "13px 36px 13px 36px",
            width: "auto",
            alignSelf: "center",
          }}
          current={currentPage}
          onChange={onChange}
          total={filteredProducts.length}
          showTotal={(total, range) =>
            `${range[0]}-${range[1]} of ${total} products`
          }
        />
      </div>
      <Modal
        open={isProductModalOpen}
        footer={null}
        style={{
          width: "100%",
          display: "flex",
          padding: 20,
          justifyContent: "center",
        }}
        maskStyle={{ background: "rgba(255,255,255,0.8)" }}
        onCancel={() => setisProductModalOpen(false)}
      >
        <div
          style={{
            border: "1px solid #2b2b2b",
            display: "flex",

            height: "100%",
            borderRadius: 12,
            flexDirection: "column",
            padding: "48px 26px",
          }}
        >
          <div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: 418,
                marginRight: 20,
                justifyContent: "center",
              }}
            >
              <Image
                src={selectedProduct && selectedProductImage}
                width={418}
                height={418}
              />

              <ImageScroller
                images={selectedProduct.imageSrc}
                width={103}
                height={103}
                carouselWidth={356}
                carouselHeight={109}
                dots={false}
                arrows
                onClick={(data) => setselectedProductImage(data)}
                containerStyle={{
                  padding: 30, //backgroundColor: "red"
                }}
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                height: "100%",
                maxWidth: 571,
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
                {selectedProduct.title}
              </div>
              <div style={{ fontSize: 40, fontFamily: "Satoshi-Bold" }}>
                ₦{new Intl.NumberFormat().format(selectedProduct.price)}
              </div>
              <div style={{ fontSize: 18, fontFamily: "Satoshi-Medium" }}>
                {selectedProduct.qtyLeft} in stock
              </div>
              {checkQuantity(selectedProduct) ? (
                <Button.Group
                  style={{
                    marginTop: 17,
                    // marginBottom: 24,
                    height: 48,
                    alignSelf: "center",
                  }}
                  key={incrementButton}
                >
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
                    onClick={(event) => {
                      event.stopPropagation();
                      //  handleQuantityChange(product.key, -1);
                    }}
                  />

                  <div
                    style={{
                      marginLeft: 18,
                      marginRight: 18,
                    }}
                  >
                    {checkQuantity(selectedProduct)}
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
                    onClick={(event) => {
                      event.stopPropagation();
                      handleIncreaseQuantity(selectedProduct);
                    }}
                  />
                </Button.Group>
              ) : (
                <CustomButton
                  title="Add to cart"
                  type="primary"
                  // width={203}
                  style={{
                    marginTop: 233,
                    marginBottom: 24,
                    display: "flex",
                    height: 48,
                    width: "100%",
                  }}
                  onClick={() => addToCart(selectedProduct)}
                />
              )}
            </div>
          </div>

          <div
            style={{
              fontFamily: "Satoshi-Bold",
              fontSize: 32,
              marginBottom: 24,
            }}
          >
            Product Description
          </div>

          <div
            style={{
              borderRadius: 12,
              background: "var(--grey-100)",
              fontSize: 18,
              fontFamily: "Satoshi-Regular",
              width: "auto",
              maxWidth: 836,
              display: "flex",

              padding: "24px 32px",
              height: "auto",
            }}
          >
            {selectedProduct.description}
          </div>
        </div>
      </Modal>
    </div>
  );
}
