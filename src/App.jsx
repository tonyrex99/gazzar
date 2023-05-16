import {
  AppstoreOutlined,
  BarChartOutlined,
  ShopOutlined,
  TeamOutlined,
  UserOutlined,
  CommentOutlined,
  LogoutOutlined,
  FolderOutlined,
  ShoppingOutlined,
  ShoppingCartOutlined,
  DesktopOutlined,
  SettingOutlined,
  LinkOutlined,
  BellOutlined,
  BookOutlined,
  EllipsisOutlined,
  WhatsAppOutlined,
  FacebookFilled,
  FacebookOutlined,
  TwitterCircleFilled,
  DownOutlined,
  InstagramFilled,
} from "@ant-design/icons";
import {
  Layout,
  Menu,
  theme,
  Grid,
  Button,
  Avatar,
  Dropdown,
  Card,
  Input,
  Tooltip,
  Table,
  DatePicker,
  Statistic,
  message,
  Space,
  Drawer,
  Modal,
} from "antd";
import React, { useState, useEffect, useRef } from "react";
import "./dashboard.css";
import "./App.css";
import CTA from "./components/CTA";
import { CDBAlert } from "cdbreact";
import YellowStar from "./components/YellowStar";
import Graph from "./components/Graph";
import OrderTable from "./components/PendingOrders";
import CountUp from "react-countup";
import PostList from "./components/Notification";
import { CopyToClipboard } from "react-copy-to-clipboard";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);
const dateFormat = "DD-MM-YYYY";
const { RangePicker } = DatePicker;
const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;
const items = [
  { name: "Overview", icon: AppstoreOutlined },
  { name: "Statistics", icon: BarChartOutlined },
  { name: "Products", icon: ShoppingOutlined },
  { name: "Customers", icon: TeamOutlined },
  { name: "Feedbacks", icon: CommentOutlined },
  { name: "Orders", icon: FolderOutlined },
  { name: "Store", icon: ShopOutlined },
  { name: "Profile", icon: UserOutlined },
].map((option, index) => ({
  key: option.name,
  icon: React.createElement(option.icon, { style: { fontSize: "24px" } }),
  label: <div>{option.name}</div>,
}));

const { useBreakpoint } = Grid;
const dummyData = [
  {
    name: "Product 1",
    image: "https://xsgames.co/randomusers/avatar.php?g=pixel&key=1",
    price: "N5,000",
    quantity: "12pcs",
  },
  {
    name: "Product 2",
    image: "https://xsgames.co/randomusers/avatar.php?g=pixel&key=2",
    price: "N6,000",
    quantity: "10pcs",
  },
  {
    name: "Product 3",
    image: "https://xsgames.co/randomusers/avatar.php?g=pixel&key=3",
    price: "N4,000",
    quantity: "15pcs",
  },
  {
    name: "Product 4",
    image: "https://xsgames.co/randomusers/avatar.php?g=pixel&key=4",
    price: "N8,000",
    quantity: "8pcs",
  },
  {
    name: "Product 5",
    image: "https://xsgames.co/randomusers/avatar.php?g=pixel&key=5",
    price: "N3,000",
    quantity: "20pcs",
  },
];
const App = () => {
  const screens = useBreakpoint();
  const [current, setCurrent] = useState("Overview");
  const [collapsed, setCollapsed] = useState(false);

  const onClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };

  return (
    <Layout hasSider>
      {
        <Sider
          width={268}
          theme="light"
          style={{
            overflow: "auto",
            height: "100vh",
            position: "fixed",
            left: 0,
            top: 0,
            bottom: 0,
            borderWidth: "0px 1px 0px 0px",
            borderColor: "#ccc",
            borderStyle: "solid",
            zIndex: 9,
          }}
          collapsible
          breakpoint="md"
          onBreakpoint={(broken) => {
            setCollapsed(false);
          }}
          onCollapse={(collapsed) => {
            setCollapsed(collapsed);
            console.log("collapsed is", collapsed);
          }}
          collapsed={collapsed}
        >
          <div
            style={{
              height: 32,
              margin: 16,
              background: "rgba(255, 255, 255, 0.2)",
              alignContent: "center",
              justifyContent: "center",

              display: "flex",
              marginTop: 71,
            }}
          >
            <div
              className="logo"
              style={{
                width: 32,
                height: 32,

                background: "#083167",
                borderRadius: 4,
                flexGrow: 0,
                order: 0,
              }}
            />
            {!collapsed && (
              <div
                style={{
                  fontSize: 24,
                  fontFamily: "Satoshi",
                  fontWeight: 700,
                  textAlign: "center",
                  height: 32,
                  width: 83,
                  alignContent: "center",
                  justifyContent: "center",
                  padding: 2,
                  marginLeft: 19,
                }}
              >
                Gazzar.
              </div>
            )}
          </div>
          <Menu
            theme="light"
            mode="inline"
            defaultSelectedKeys={["4"]}
            onClick={onClick}
            selectedKeys={current}
            style={{
              maxWidth: "250px",
              borderWidth: "0px",
              maxHeight: "1035px",
            }}
          >
            {items.map((item) => (
              <Menu.Item
                key={item.key}
                icon={
                  <>
                    {current.includes(item.key) && (
                      <div
                        style={{
                          backgroundColor: "var(--primary-navy-blue)",
                          width: 4,
                          height: 40,
                          marginLeft: 5,
                          position: "absolute",
                          marginTop: -5,
                          right: 0,
                          left: -5,
                          borderRadius: 100,
                          display: "flex",
                          alignSelf: "center",
                        }}
                      />
                    )}
                    {item.icon}
                  </>
                }
                selected={current.includes(item.key)}
                style={{
                  paddingTop: 5,
                  height: !collapsed ? 45 : 60,
                  display: "flex",
                  ...(current.includes(item.key)
                    ? {
                        color: "var(--primary-navy-blue)",
                        backgroundColor: "#e6ebfa",
                      }
                    : {
                        color: "#5b5e69",
                      }),
                }}
                className="sidebar-main-menu-time"
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <div style={{ fontSize: "var(--link-text-size )" }}>
                    {item.label}
                  </div>
                </div>
              </Menu.Item>
            ))}
          </Menu>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 20,
              flexDirection: "column",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              <CTA
                backgroundColor="var(--primary-navy-blue)"
                description="Upgrade to Gazzar pro to unlock more features today!"
                extraStyles={{ borderRadius: "6px" }}
                image={<YellowStar size={24} />}
                mdBreakpointComponent={
                  <MyMdComponent onClick={() => alert("Clicked!")} />
                }
                onClick={() => alert("Clicked!")}
                titleCentered={false}
                titleFontSize="36px"
                buttonLabel="Upgrade Now"
                collapsedChecker={collapsed}
              />
            </div>
            <div
              style={{
                width: 224.5,
                background: "var(--grey-500)",
                height: 1,
                marginTop: 23,
              }}
            />
            <Menu mode="inline">
              <SubMenu
                icon={
                  <Avatar
                    src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=1"
                    size={39}
                    style={{ marginLeft: "-10px" }}
                  />
                }
                title={
                  <div className="user-option-sidebar">
                    Omo Ope Ventures
                    <div className="user-option-sidebar-email">
                      omoope01@gmail.com
                    </div>
                  </div>
                }
                popupClassName="blue-arrow"
              >
                <Menu.Item icon={<SettingOutlined />}>Submenu Item 1</Menu.Item>
                <Menu.Item icon={<SettingOutlined />}>Submenu Item 2</Menu.Item>
                <Menu.Item icon={<SettingOutlined />}>Submenu Item 3</Menu.Item>
              </SubMenu>
              <Menu.Item
                onClick={() => {
                  alert("helloo");
                }}
                icon={
                  <LogoutOutlined
                    style={{
                      fontSize: 20,
                      strokeWidth: "30",
                      stroke: "rgba(227,0,0,1)",
                    }}
                  />
                }
                style={{
                  backgroundColor: "rgba(227,0,0,8%)",
                  color: "rgba(227,0,0,1)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  height: "40px",
                  fontFamily: "Satoshi",
                  fontWeight: "medium",
                  fontSize: "18px",
                  height: "60px",
                }}
              >
                Logout
              </Menu.Item>
            </Menu>
          </div>
        </Sider>
      }
      <Layout>
        <Header
          style={{
            backgroundColor: "#fff",
            position: "fixed",
            top: 0,
            zIndex: 1,
            borderBottom: "1px solid #ccc",
            width: "100%",
            marginLeft: collapsed ? 80 : 240,
            height: collapsed && 64,
          }}
          className="header-container"
        >
          <div
            className="nav-header"
            style={{
              height: "100%",
              background: "#fff",
              borderRadius: 4,
              flexGrow: 0,
              order: 0,
              padding: "24px 0px",
              display: "flex",
            }}
          >
            <div
              style={{
                marginLeft: 40,
                fontFamily: "Satoshi",
                fontWeight: 900,
                fontSize: 32,
                display: "flex",
                alignItems: "center",
                padding: "7.5px 0px",
                justifyContent: "space-between",
              }}
            >
              {!screens.xs && (
                <div style={{ position: "fixed", marginLeft: "-22px" }}>
                  {current}
                </div>
              )}
              <div
                style={{
                  flexGrow: 1,
                  textAlign: "right",
                  position: "fixed",
                  right: 40,
                }}
                className="action-buttons"
              >
                <CircularButtons />
              </div>
            </div>
          </div>
        </Header>
        <Layout
          className="layout-container"
          style={{ paddingLeft: collapsed ? 79 : 262, backgroundColor: "#fff" }}
        >
          <Content
            style={{
              margin: "24px 16px 0",
              paddingTop: "80px",
              backgroundColor: "#fff",
            }}
          >
            {/*<CDBAlert color="primary">
              A simple alert built with contrast design
            </CDBAlert>
          */}
            <Dashboard />
          </Content>
        </Layout>

        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Gazzar Design ©2023 Created by Gazzar
        </Footer>
      </Layout>
    </Layout>
  );
};
export default App;

function Dashboard() {
  const cardData = [
    { title: "No. of orders", value: "12", icon: ShoppingCartOutlined },
    { title: "Products sold", value: "124", icon: ShoppingOutlined },
    { title: "New customers", value: "648", icon: UserOutlined },
    { title: "Page visits", value: "39", icon: DesktopOutlined },
  ];

  const [selectedFilter, setselectedFilter] = useState("This Week");

  const [showGraph, setShowGraph] = useState(false);
  const [NewDimensions, setNewDimensions] = useState({});
  const [formattedFromDate, setFormattedFromDate] = useState(null);
  const [formattedToDate, setFormattedToDate] = useState(null);
  const [graphSum, setGraphSum] = useState("");
  const timeoutRef = useRef(null);

  const debouncedChangeSum = (value) => {
    clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      setGraphSum(Number(value));
    }, 2000);
  };

  const handleDebounceGraph = (value) => {
    debouncedChangeSum(value);
  };

  function setRange(value) {
    const [newFromDate, newToDate] = value ? value : [null, null];
    if (newFromDate) {
      const formattedFrom = newFromDate.format("DD/MM/YYYY");
      setFormattedFromDate(formattedFrom);
    } else {
      setFormattedFromDate("");
    }

    if (newToDate) {
      const formattedTo = newToDate.format("DD/MM/YYYY");
      setFormattedToDate(formattedTo);
    } else {
      setFormattedToDate("");
    }
  }

  useEffect(() => {
    setShowGraph(false);

    const timeoutId = setTimeout(() => {
      setShowGraph(true);
    }, 1);

    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    // select the element you want to observe
    const divToObserve = document.querySelector("#chart");

    // create a new instance of ResizeObserver
    const resizeObserver = new ResizeObserver((entries) => {
      // loop through the entries array
      for (const entry of entries) {
        // get the new width and height of the element
        const newWidth = entry.contentRect.width;
        const newHeight = entry.contentRect.height;

        // update the minWidth state with the new width
        setNewDimensions({ width: newWidth, height: newHeight });
      }
    });

    // observe the element
    resizeObserver.observe(divToObserve);

    return () => resizeObserver.disconnect();
  }, []);
  const [rotate, setRotate] = useState(false);

  function TopProducts({ data = dummyData }) {
    return (
      <div
        className="card"
        style={{
          minHeight: "482px",
          padding: `25px 35px`,
          width: "100%",
          maxWidth: "417px",
          borderRadius: 10,
        }}
      >
        <div
          style={{
            fontFamily: "Satoshi",
            fontWeight: "Bold",
            fontSize: "1.5rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            marginBottom: "1rem",
          }}
        >
          <div
            style={{ alignSelf: "flex-start", position: "relative", top: -10 }}
          >
            Top selling products
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            maxHeight: "382px",
            overflowY: "auto",
            paddingRight: "0.5rem",
            boxSizing: "border-box",
          }}
        >
          {data.map((product) => (
            <div
              key={product.name}
              style={{
                display: "flex",
                flexDirection: "row",
                margin: "0.5rem 0",
                alignItems: "center",
                borderBottom: "1px solid var(--grey-500)",
                paddingBottom: 13,
              }}
            >
              <Avatar src={product.image} size={45} />
              <div
                style={{
                  fontSize: "1rem",
                  fontWeight: "Medium",
                  color: "#000000",
                  marginLeft: "1rem",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  fontFamily: "Satoshi",
                }}
              >
                {product.name}
                <div
                  className="user-option-sidebar-email"
                  style={{ marginTop: 3 }}
                >
                  {product.price}
                </div>
              </div>
              <div
                style={{
                  fontFamily: "Satoshi",
                  fontWeight: "bold",
                  fontSize: "1rem",
                  marginLeft: "auto",
                }}
              >
                {product.quantity}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  function rotateArrow() {
    setRotate(!rotate);
  }
  const formatter = (value) => <CountUp end={value} separator="," />;
  function currentLabel() {
    let label;
    switch (selectedFilter) {
      case "This Week":
        label = "Weekly";
        break;
      case "Last 7 Days":
        label = "7 Days";
        break;
      case "This Month":
        label = "Monthly";
        break;
      case "Last 30 Days":
        label = "30 Days";
        break;
      case "Last Month":
        label = "Last Month";
        break;
      case "Custom":
        label = selectedFilter;
        break;
      default:
        label = selectedFilter;
        break;
    }
    return label;
  }
  const [open, setOpen] = useState(false);
  const handleOpenChange = (flag) => {
    setOpen(flag);
  };
  return (
    <>
      <div className="dashboard-container" style={{ borderRadius: 10 }}>
        {cardData.map((data, index) => (
          <div className="card" key={index} style={{ flexDirection: "row" }}>
            <div className="card-icon-container">
              <data.icon className="card-icon" />
            </div>

            <div className="card-content" style={{ alignItems: "flex-start" }}>
              <p>{data.title}</p>
              <div>
                <Statistic
                  value={data.value}
                  formatter={formatter}
                  valueStyle={{
                    fontSize: 36,
                    color: "var(--grey-1100)",
                    fontFamily: "Satoshi",
                    fontWeight: "bold",
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div
        className="dashboard-container"
        style={{
          flexDirection: "row",
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <div
          id="chart"
          className="graph card"
          style={{
            maxHeight: "482px",
            padding: showGraph && `25px 35px`,
            flexDirection: "column",
            borderRadius: 10,
          }}
        >
          <div
            className="card-content"
            style={{ alignSelf: "flex-start", margin: "13px" }}
          >
            <div
              style={{
                fontSize: 20,
                fontFamily: "Satoshi",
                fontWeight: "bold",
              }}
            >
              Amount made
            </div>
            <div>
              <Statistic
                value={graphSum}
                formatter={formatter}
                prefix={<div>N</div>}
                valueStyle={{
                  fontSize: 32,
                  color: "var(--primary-navy-blue)",
                  fontFamily: "Satoshi",
                  fontWeight: "bold",
                }}
              />
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              flex: 1,
              width: "100%",
              justifyItems: "center",
              paddingLeft: 8,
              paddingRight: 28,
            }}
          >
            <div
              style={{
                fontFamily: "Satoshi",
                fontWeight: "Medium",
                fontSize: 15,
                color: "#5f6165",
                display: "flex",
                alignItems: "center",
              }}
            >
              20 February 2022
            </div>
            <div>
              <Dropdown.Button
                placement="bottomLeft"
                trigger={["click"]}
                open={open}
                onOpenChange={handleOpenChange}
                dropdownRender={() => (
                  <TableComponent
                    selected={selectedFilter}
                    onSelected={setselectedFilter}
                    setRange={setRange}
                    onApply={handleOpenChange}
                  />
                )}
                buttonsRender={([leftButton, rightButton]) => [
                  <Tooltip title="Filter" key="leftButton">
                    {leftButton}
                  </Tooltip>,
                  React.createElement(
                    "div",
                    {
                      className:
                        "ant-btn css-dev-only-do-not-override-ed5zg0 ant-btn-default ant-btn-icon-only ant-btn-compact-item ant-btn-compact-last-item ant-dropdown-trigger",
                      style: {
                        width: "auto",
                        backgroundColor: "var(--grey-700)",
                        flexDirection: "row",
                        display: "flex",
                        alignItems: "center",
                        padding: "4px 15px",
                        fontSize: "14px",
                        fontFamily: "Satoshi",
                        fontWeight: "500",
                        color: "var(--primary-navy-blue)",
                      },
                      onClick: rotateArrow,
                    },
                    currentLabel(),
                    React.createElement(DownOutlined, {
                      style: {
                        marginLeft: "10px",
                        fontSize: "10px",
                        color: "var(--primary-navy-blue)",
                        transform: rotate ? "rotate(180deg)" : undefined,
                      },
                    })
                  ),
                ]}
              >
                <div
                  style={{
                    color: "var(--grey-700)",
                    fontSize: 14,
                    fontWeight: 500,
                    fontFamily: "Satoshi",
                  }}
                >
                  Filter
                </div>
              </Dropdown.Button>
            </div>
          </div>

          <Graph
            width={NewDimensions.width}
            height={NewDimensions.height - 150}
            range={[formattedFromDate, formattedToDate]}
            changeSum={handleDebounceGraph}
          />
        </div>
        <TopProducts />
        <OrderTable />
      </div>
    </>
  );
}

const TableComponent = ({ selected, onSelected, setRange, onApply }) => {
  const now = dayjs();

  const [fromDate, setFromDate] = useState(now.startOf("week"));
  const [toDate, setToDate] = useState(now);
  const [startDate, setStartDate] = useState(fromDate);
  const [endDate, setEndDate] = useState(toDate);
  const getRangePreset = (preset) => {
    let from, to;

    switch (preset) {
      case "This Week":
        from = now.startOf("week");
        to = now;
        break;
      case "Last 7 days":
        from = now.subtract(6, "day");
        to = now;
        break;
      case "This Month":
        from = now.startOf("month");
        to = now;
        break;
      case "Last 30 days":
        from = now.subtract(29, "day");
        to = now;
        break;
      case "Last Month":
        from = now.subtract(1, "month").startOf("month");
        to = now.subtract(1, "month").endOf("month");
        break;
      default:
        from = fromDate;
        to = toDate;
        break;
    }

    if (from && to) {
      setRange([from, to]);

      return [from, to];
    }
    return null;
  };

  useEffect(() => {
    const [newFromDate, newToDate] = getRangePreset(selected) || [null, null];
    setFromDate(newFromDate);

    setToDate(newToDate);

    setRange([newFromDate, newToDate]);
    console.log("from date: ", fromDate, " to date: ", toDate);
  }, [selected]);

  const columns = [
    {
      dataIndex: "thisWeek",
      key: "thisWeek",
      render(text, record) {
        return {
          props: {
            style: {
              background: selected === text && "var(--navy-blue-50)",
              color:
                selected === text ? "var(--navy-blue-400)" : "var(--grey-900)",
            },
          },
          children: (
            <div
              style={{ justifyContent: "center", display: "flex" }}
              onClick={() => onSelected(text)}
            >
              {text}
            </div>
          ),
        };
      },
    },
    {
      dataIndex: "last7Days",
      key: "last7Days",
      render(text, record) {
        return {
          props: {
            style: {
              background: selected === text && "var(--navy-blue-50)",
              color:
                selected === text ? "var(--navy-blue-400)" : "var(--grey-900)",
            },
          },
          children: (
            <div
              style={{ justifyContent: "center", display: "flex" }}
              onClick={() => onSelected(text)}
            >
              {text}
            </div>
          ),
        };
      },
    },
    {
      dataIndex: "thisMonth",
      key: "thisMonth",
      render(text, record) {
        return {
          props: {
            style: {
              background: selected === text && "var(--navy-blue-50)",
              color:
                selected === text ? "var(--navy-blue-400)" : "var(--grey-900)",
            },
          },
          children: (
            <div
              style={{ justifyContent: "center", display: "flex" }}
              onClick={() => {
                onSelected(text);
              }}
            >
              {text}
            </div>
          ),
        };
      },
    },
  ];

  const data = [
    {
      key: "1",
      thisWeek: "This Week",
      last7Days: "Last 7 days",
      thisMonth: "This Month",
    },

    {
      key: "2",
      thisWeek: "Last 30 days",
      last7Days: "Last Month",
      thisMonth: "Custom",
    },
  ];

  const datePickerContainerRef = useRef(null);

  const [startDateString, setStartDateString] = useState(
    dayjs(fromDate).format("DD/MM/YYYY")
  );
  const [endDateString, setEndDateString] = useState(
    dayjs(toDate).format("DD/MM/YYYY")
  );
  const handleTodayClick = () => {
    const today = dayjs();
    const todayStr = dayjs().format("DD/MM/YYYY");
    if (endDate != today) {
      setEndDate(today);
      setEndDateString(todayStr);
    } else {
      setStartDate(today);
      setStartDateString(todayStr);
    }
  };
  const disabledDate = (current) => {
    return current && current > dayjs().endOf("day");
  };

  return (
    <div
      style={{
        position: "relative",
        height: "100%",
        flexDirection: "column",
        display: "flex",
        backgroundColor: "#ffffff",
        borderRadius: "8px 8px 8px 8px",
        padding: "35px 32px",
        boxShadow:
          "0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05)",
      }}
    >
      <div
        style={{ fontFamily: "Satoshi", fontWeight: "Medium", fontStyle: 11 }}
      >
        Show report for
      </div>
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        bordered
        size="small"
      />
      {selected == "Custom" && (
        <div>
          <RangePicker
            style={{
              marginTop: 15,
              display: "flex",
            }}
            format={[
              "Do MMM YYYY",
              "DD/MM/YYYY",
              "DD/MM/YY",
              "DD-MM-YYYY",
              "DD-MM-YY",
            ]}
            bordered={false}
            getPopupContainer={() => datePickerContainerRef.current}
            open
            popupClassName="date-range"
            value={[startDate, endDate]}
            disabledDate={disabledDate}
            onChange={(dateParsed, dateString) => {
              if (Array.isArray(dateParsed)) {
                const [start, end] = dateParsed;
                setStartDate(start);
                setEndDate(end);
                const formattedStartDate = dayjs(start).format("DD/MM/YYYY");
                const formattedEndDate = dayjs(end).format("DD/MM/YYYY");
                setStartDateString(formattedStartDate);
                setEndDateString(formattedEndDate);
              } else {
                setStartDate(null);
                setEndDate(null);
                setStartDateString(null);
                setEndDateString(null);
              }
            }}
            renderExtraFooter={() => {
              return (
                <div
                  style={{
                    alignSelf: "center",
                    width: 279,
                    height: 43,
                    justifyContent: "center",
                    alignItems: "center",
                    display: "flex",
                  }}
                >
                  <Button
                    style={{
                      width: 123,
                      height: 43,
                      marginRight: 61,
                      border: 0,
                      color: "var(--grey-900)",
                    }}
                    onClick={handleTodayClick}
                  >
                    TODAY
                  </Button>
                  <Button
                    style={{
                      color:
                        startDate != null && endDate != null
                          ? "#fff"
                          : "var(--grey-900)",
                      background:
                        startDate && endDate
                          ? "var(--primary-navy-blue)"
                          : "var(--grey-200)",

                      borderRadius: 5,
                      width: 123,
                      height: 43,
                      border: 0,
                    }}
                    disabled={startDate && endDate ? false : true}
                    onClick={() => {
                      setRange([startDate, endDate]);
                      onApply(false);
                    }}
                  >
                    APPLY
                  </Button>
                </div>
              );
            }}
          />
          <div
            style={{
              height: "inherit",
              justifyContent: "center",
              display: "flex",
              flexDirection: "column-reverse",
            }}
            ref={datePickerContainerRef}
          ></div>
        </div>
      )}
    </div>
  );
};

const MyMdComponent = ({ onClick }) => {
  const divStyle = {};

  const hoverDivStyle = {
    backgroundColor: "var(--primary-navy-blue)",
    padding: "5px",
    borderRadius: "10px",
  };

  const [currentStyle, setcurrentStyle] = useState(divStyle);
  function handleMouseEnter() {
    setcurrentStyle(hoverDivStyle);
  }
  function handleMouseLeave() {
    setcurrentStyle(divStyle);
  }

  return (
    <div
      style={currentStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      <YellowStar size={24} />
    </div>
  );
};

const buttonStyle = {
  width: "50px",
  height: "50px",
  borderRadius: "50%",
  margin: "3px",
  border: "1px solid var(--grey-600)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#fff",
};

const CircularButtons = () => {
  const [openNotif, setNotifOpen] = useState(false);
  const [openTodo, setTodoOpen] = useState(false);

  const showNotifDrawer = () => {
    setNotifOpen(true);
  };
  const onNotifClose = () => {
    setNotifOpen(false);
  };
  const showTodoDrawer = () => {
    setTodoOpen(true);
  };
  const onTodoClose = () => {
    setTodoOpen(false);
  };

  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
  const showLinkModal = () => {
    setIsLinkModalOpen(true);
  };
  const handleLinkOk = () => {
    setIsLinkModalOpen(false);
  };
  const handleLinkCancel = () => {
    setIsLinkModalOpen(false);
  };
  const screens = useBreakpoint();
  const copyLink = "https://" + "izzy-graffix" + ".gazzar.com";
  const [messageApi, contextHolder] = message.useMessage();

  return (
    <div
      className="action-buttons"
      style={{
        display: "flex",
        flexDirection: "row",
        overflow: "auto",
      }}
    >
      <Button
        style={buttonStyle}
        icon={<BookOutlined />}
        onClick={showTodoDrawer}
      />
      <Button
        style={buttonStyle}
        icon={<LinkOutlined style={{ transform: "rotate(45deg)" }} />}
        onClick={showLinkModal}
      />
      <Button
        style={buttonStyle}
        onClick={showNotifDrawer}
        icon={<BellOutlined />}
      />
      <Button style={buttonStyle} icon={<ShopOutlined />} />
      <Button style={buttonStyle} icon={<EllipsisOutlined />} />
      <Drawer
        key="notification"
        className="action-drawer"
        title="Notifications"
        placement="right"
        onClose={onNotifClose}
        open={openNotif}
      >
        <PostList />
      </Drawer>
      <Drawer
        key="todolist"
        className="action-drawer"
        title="To-do list"
        placement="right"
        onClose={onTodoClose}
        open={openTodo}
      >
        <PostList />
      </Drawer>
      <Modal
        centered
        title={
          <div
            style={{ fontSize: 28, fontFamily: "Satoshi", fontWeight: "Bold" }}
          >
            Share your store's link
          </div>
        }
        open={isLinkModalOpen}
        onOk={handleLinkOk}
        onCancel={handleLinkCancel}
        footer={[]}
        width={729}
      >
        {contextHolder}
        <div
          style={{
            padding: "89px 82px 82px 82px",
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              height: 70,
              display: "flex",
              justifyContent: "center",
              background: "#f3f3f3",
              padding: 26,
              borderRadius: 11,
              width: !screens.sm ? 300 : 564,
            }}
          >
            <Space.Compact style={{ width: "100%" }}>
              <Input
                id="copy-link"
                disabled
                style={{
                  background: "#f3f3f3",
                  height: 35,
                  alignSelf: "center",
                  border: 0,
                  color: "black",
                }}
                value={copyLink}
              />
              <CopyToClipboard
                text={copyLink}
                onCopy={() => {
                  messageApi.open({
                    type: "success",
                    content: "Link Copied!",
                  });
                }}
              >
                <Button
                  key="copylink"
                  style={{
                    height: 35,
                    alignSelf: "center",
                    background: "var(--primary-navy-blue)",
                    borderRadius: 6,
                    fontSize: 12,
                    fontFamily: "Satoshi",
                    fontWeight: "Bold",
                  }}
                  type="primary"
                >
                  Copy Link
                </Button>
              </CopyToClipboard>
            </Space.Compact>
          </div>
          <div
            style={{
              marginTop: 24,
              alignSelf: "center",
              display: "flex",
              alignItems: "center",
            }}
          >
            <div
              style={{
                fontFamily: "Satoshi",
                fontWeight: "Medium",
                fontSize: 20,
                marginRight: 26,
              }}
            >
              Share via
            </div>
            <FacebookOutlined
              style={{
                fontSize: 28,
                color: "#ffffff",
                background: "#3b5998",
                alignItems: "center",
                justifyContent: "center",
                display: "flex",
                width: 45,
                height: 45,
                borderRadius: "100%",
                marginRight: 10,
              }}
            />
            <WhatsAppOutlined
              style={{
                fontSize: 28,
                color: "#ffffff",
                background: "#27d467",
                alignItems: "center",
                justifyContent: "center",
                display: "flex",
                width: 45,
                height: 45,
                borderRadius: "100%",
                paddingLeft: 2,
                marginRight: 10,
              }}
            />
            <TwitterCircleFilled
              size={45}
              style={{ fontSize: 45, color: "#00aced", marginRight: 10 }}
            />
            <InstagramFilled
              style={{
                fontSize: 27,
                color: "#fff",
                background: "#ff47cb",
                alignItems: "center",
                justifyContent: "center",
                display: "flex",
                width: 45,
                height: 45,
                borderRadius: "100%",
                marginRight: 10,
              }}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};
