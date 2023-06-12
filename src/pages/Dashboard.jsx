import {
  ShopOutlined,
  LogoutOutlined,
  SettingOutlined,
  LinkOutlined,
  BellOutlined,
  BookOutlined,
  EllipsisOutlined,
  WhatsAppOutlined,
  FacebookOutlined,
  TwitterCircleFilled,
  InstagramFilled,
} from "@ant-design/icons";
import {
  Layout,
  Menu,
  Grid,
  Button,
  Avatar,
  Input,
  DatePicker,
  message,
  Space,
  Drawer,
  Modal,
} from "antd";
import React, { useState, useEffect } from "react";
import "./../dashboard.css";
import "./../App.css";
import CTA from "../components/CTA";
import YellowStar from "../components/YellowStar";
import PostList from "../components/Notification";
import { CopyToClipboard } from "react-copy-to-clipboard";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { Outlet, useLocation, Link } from "react-router-dom";
dayjs.extend(customParseFormat);
import { CustomIcon } from "../assets/icons/CustomIcons";
const dateFormat = "DD-MM-YYYY";
const { RangePicker } = DatePicker;
const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

const { useBreakpoint } = Grid;

const Dashboard = () => {
  const location = useLocation();
  const screens = useBreakpoint();
  const [current, setCurrent] = useState("Overview");
  const [collapsed, setCollapsed] = useState(false);

  const onClick = (e) => {
    setCurrent(e.key);
  };

  useEffect(() => {
    // Update header title based on the current location
    const currentPath = location.pathname;
    let title = "";

    switch (currentPath) {
      case "/dashboard":
      case "/dashboard/":
        title = "Overview";
        break;
      case "/dashboard/overview":
      case "/dashboard/overview/":
        title = "Overview";
        break;
      case "/dashboard/statistics":
      case "/dashboard/statistics/":
        title = "Statistics";
        break;
      case "/dashboard/products":
      case "/dashboard/products/":
        title = "Products";
        break;
      case "/dashboard/contact":
      case "/dashboard/contact/":
        title = "Contact";
        break;
      case "/dashboard/store":
      case "/dashboard/store/":
        title = "Store";
        break;
      case "/dashboard/orders":
      case "/dashboard/orders/":
        title = "Orders";
        break;
      case "/dashboard/feedbacks":
      case "/dashboard/feedbacks/":
        title = "Feedbacks";
        break;
      case "/dashboard/customers":
      case "/dashboard/customers/":
        title = "Customers";
        break;
      case "/dashboard/profile":
      case "/dashboard/profile/":
        title = "Profile";
        break;
      default:
        title = "";
        break;
    }

    document.title = `Gazzar | ${title}`;
    setCurrent(title);
  }, [location]);
  const items = [
    { name: "Overview", icon: "Dashboard" },
    { name: "Statistics", icon: "Statistics" },
    { name: "Products", icon: "Handbag" },
    { name: "Customers", icon: "Users" },
    { name: "Feedbacks", icon: "Feedback" },
    { name: "Orders", icon: "Folder" },
    { name: "Store", icon: "Store" },
    { name: "Profile", icon: "Profile" },
  ].map((option, index) => ({
    key: option.name,
    icon: (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginLeft: -5,
        }}
      >
        {current.includes(option.name) && (
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
        {React.createElement(CustomIcon, {
          style: { fontSize: "24px" },
          name: option.icon,
        })}
      </div>
    ),
    label: (
      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ fontSize: "var(--link-text-size )" }}>
          <Link to={"/dashboard/" + String(option.name).toLowerCase()}>
            {option.name}
          </Link>
        </div>
      </div>
    ),
    style: {
      paddingTop: 5,
      height: !collapsed ? 45 : 60,
      display: "flex",
      ...(current.includes(option.name)
        ? {
            color: "var(--primary-navy-blue)",
            backgroundColor: "#e6ebfa",
          }
        : {
            color: "#5b5e69",
          }),
    },
  }));

  const secondMenuItems = [
    {
      key: "userdeets",
      icon: (
        <Avatar
          src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=1"
          size={39}
          style={{ marginLeft: "-10px" }}
        />
      ),
      label: (
        <div className="user-option-sidebar">
          Omo Ope Ventures
          <div className="user-option-sidebar-email">omoope01@gmail.com</div>
        </div>
      ),
      style: {
        height: !collapsed ? 45 : 60,
        display: "flex",
        alignItems: "center",
      },
      popupClassName: "blue-arrow",
      children: [
        {
          key: "1",
          icon: <SettingOutlined />,
          label: "Submenu Item 1",
        },
        {
          key: "2",
          icon: <SettingOutlined />,
          label: "Submenu Item 2",
        },
        {
          key: "3",
          icon: <SettingOutlined />,
          label: "Submenu Item 3",
        },
      ],
    },
    {
      key: "logout",
      onClick: () => {
        alert("helloo");
      },
      icon: (
        <CustomIcon
          name="Logout"
          style={{
            fontSize: 20,
          }}
        />
      ),
      label: "Logout",
      style: {
        backgroundColor: "rgba(227,0,0,8%)",
        color: "rgba(227,0,0,1)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        fontFamily: "Satoshi",
        fontWeight: "medium",
        fontSize: "18px",
        height: "60px",
      },
    },
  ];
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
            onClick={onClick}
            selectedKeys={current}
            style={{
              maxWidth: "250px",
              borderWidth: "0px",
              maxHeight: "1035px",
            }}
            items={items}
          />

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
            <Menu mode="inline" items={secondMenuItems} />
          </div>
        </Sider>
      }
      <Layout>
        <Header
          style={{
            backgroundColor: "#fff",
            position: "fixed",
            top: 0,
            zIndex: 9,
            borderBottom: "1px solid #ccc",
            width: "100%",
            marginLeft: collapsed ? 80 : 267,
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
                  right: screens.xs ? 10 : 40,
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
            <Outlet />
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
export default Dashboard;
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
  width: "54px",
  height: "54px",
  borderRadius: "50%",
  margin: "3px",
  border: "2px solid var(--grey-600)",
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
        icon={<CustomIcon name="Todo" style={{ fontSize: 24 }} />}
        onClick={showTodoDrawer}
      />
      <Button
        style={buttonStyle}
        icon={
          <LinkOutlined style={{ transform: "rotate(45deg)", fontSize: 22 }} />
        }
        onClick={showLinkModal}
      />
      <Button
        style={buttonStyle}
        onClick={showNotifDrawer}
        icon={<BellOutlined style={{ fontSize: 22 }} />}
      />
      <Button
        style={buttonStyle}
        icon={<ShopOutlined style={{ fontSize: 22 }} />}
      />
      <Button
        style={buttonStyle}
        icon={
          <EllipsisOutlined
            style={{ fontSize: 22, strokeWidth: 50, stroke: "black" }}
          />
        }
      />
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
