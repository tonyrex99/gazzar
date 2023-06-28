import { Layout, Menu, Avatar, Input, Button } from "antd";
import { Link, Outlet, NavLink } from "react-router-dom";
import { useState } from "react";
import { EllipsisOutlined, SearchOutlined } from "@ant-design/icons";
import bannerImage from "../../assets/storeBannerImage.png";
import { useSelector } from "react-redux";
import { CustomButton } from "../../assets/icons/CustomButtons";
export default function StorePreview() {
  const [current, setCurrent] = useState("");
  const [searchValue, setsearchValue] = useState("");
  const [currentPage, setcurrentPage] = useState(1);
  const [currentPageSize, setCurrentPageSize] = useState(10);
  const [Categories, setCategories] = useState([
    { title: "Shoes" },
    { title: "Clothes" },
    { title: "Bags" },
  ]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const buttonStyle = {
    width: "58px",
    height: "58px",
    borderRadius: "50%",
    margin: "3px",
    border: "2px solid var(--grey-600)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  };
  const onClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };

  const onChange = (page) => {
    setcurrentPage(page);
  };
  const onSizeChange = (page, pageSize) => {
    setCurrentPageSize(pageSize);
    setcurrentPage(page);
  };
  const items = [
    {
      label: "Home",
    },

    {
      label: "About",
    },
    {
      label: "Cart",
    },
  ].map((option, index) => ({
    label: (
      <NavLink
        to={`/store/${option.label.toLowerCase()}`}
        className={({ isActive, isPending }) => {
          if (isActive) {
            setCurrent(option.label);
            document.title = `MyStore | ${option.label}`;
          }
        }}
      >
        <div
          style={{
            alignItems: "center",
            fontFamily: "Satoshi-Medium",
            fontSize: 18,
          }}
        >
          {option.label}
        </div>
      </NavLink>
    ),
    key: option.label,
    style: {},
  }));

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
  return (
    <div className="layout">
      <Layout.Header
        style={{
          display: "flex",
          alignItems: "center",
          background: "white",
          justifyContent: "space-between",
          width: "100%",
          paddingLeft: 167,
          paddingRight: 167,
          paddingTop: 34,
          paddingBottom: 34,
          position: "fixed",
          top: 0,
          zIndex: 10000,
          borderBottom: "2px solid var(--grey-400)",
        }}
      >
        <Link to="/dashboard">
          <Avatar
            src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=1"
            size={39}
            style={{ alignSelf: "left" }}
          />
        </Link>
        <Menu
          onClick={onClick}
          selectedKeys={current}
          mode="horizontal"
          items={items}
          style={{
            width: "40%",
            alignSelf: "center",
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <div
            style={{
              height: 52,
              width: 320,
              background: "#f5f4f6",
              color: "var(--grey-500)",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              paddingLeft: 23,
              borderRadius: 8,
              border: "1px solid var(--grey-500)",
              marginBottom: 10,
              marginTop: 12,
              marginRight: 12,
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
              onChange={(event) => setsearchValue(event.target.value)}
              value={searchValue}
            />
          </div>
          <Button
            style={buttonStyle}
            icon={
              <EllipsisOutlined
                style={{ fontSize: 22, strokeWidth: 50, stroke: "black" }}
              />
            }
          />
        </div>
      </Layout.Header>

      <Outlet />
      <Layout.Footer style={{ textAlign: "center" }}>
        Powered by Gazzar ©2023
      </Layout.Footer>
    </div>
  );
}
