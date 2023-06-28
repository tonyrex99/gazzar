import { CustomButton } from "../../../assets/icons/CustomButtons";
import { CustomIcon } from "../../../assets/icons/CustomIcons";
import { Button } from "antd";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [incrementButton, setincrementButton] = useState(1);
  useEffect(() => {
    // Retrieve the cart data from localStorage
    const cart = localStorage.getItem("GazzarDemoCart");
    if (cart) {
      setCartItems(JSON.parse(cart));
    }
  }, []);

  const handleDeleteItem = (index) => {
    // Create a copy of the cartItems array
    const updatedCartItems = [...cartItems];
    // Remove the item at the specified index
    updatedCartItems.splice(index, 1);
    // Update the cartItems state
    setCartItems(updatedCartItems);
    // Update the localStorage
    localStorage.setItem("GazzarDemoCart", JSON.stringify(updatedCartItems));
  };

  function calculateCartTotal() {
    const temp = localStorage.getItem("GazzarDemoCart");
    const cart = JSON.parse(temp);
    let total = 0;

    if (cart && cart.length > 0) {
      for (let i = 0; i < cart.length; i++) {
        const item = cart[i];
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
      }
    }

    return total;
  }

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
  // Calculate the total value of the items in the cart

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
        <div style={{ display: "flex", flexDirection: "column" }}>
          {cartItems.length > 0 ? (
            cartItems.map((item, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  //width: "40%",
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
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        width: "100%",
                      }}
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
                        <img
                          width={100}
                          height={100}
                          src={item.image.src}
                          alt={item.title.alt}
                          style={{ borderRadius: 5 }}
                        />
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
                        {item.title}
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
                        ₦
                        {new Intl.NumberFormat().format(
                          item.price * item.quantity
                        )}
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
                        <div>{item.discount}</div>
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
                      />
                    }
                    onClick={() => handleDeleteItem(index)}
                    style={{ border: 0 }}
                  />

                  <div>
                    <Button.Group
                      key={incrementButton}
                      style={{ display: "flex", alignItems: "center" }}
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
                          handleQuantityChange(item, "reduce");
                        }}
                      />

                      <div
                        style={{
                          marginLeft: 18,
                          marginRight: 18,
                        }}
                      >
                        {item.quantity}
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
                          handleQuantityChange(item, "add");
                        }}
                      />
                    </Button.Group>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div>No items in the cart.</div>
          )}
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
            maxHeight: 237,
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
            {cartItems.length >= 1
              ? cartItems.length + " Items"
              : "Empty Cart!"}
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
            <div
              key={incrementButton}
              style={{ fontFamily: "Satoshi-Bold", fontSize: 16 }}
            >
              ₦ {new Intl.NumberFormat().format(calculateCartTotal())}
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
            onClick={() => localStorage.removeItem("GazzarDemoCart")}
          />
        </div>
      </div>
    </div>
  );
}
