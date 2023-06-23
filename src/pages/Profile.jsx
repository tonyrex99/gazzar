import { Tabs } from "antd";
import { useState } from "react";
import ProfileInfo from "./subPages/ProfileInfo";
import Transactions from "./subPages/Transactions";
import Delivery from "./subPages/Delivery";
import Plans from "./subPages/Plans";
import Security from "./subPages/Security";

export function Profile() {
  const [activeTabKey, setactiveTabKey] = useState("1");

  const getTabStyle = (tabKey) => {
    const activeTabStyle = {
      padding: "25px 40px",

      fontSize: 18,
      fontFamily: "Satoshi-Medium",
      color: "var(--primary-navy-blue)",
      borderBottom: "5px solid red",
    };
    const inActiveTabStyle = {
      padding: "25px 40px",
      fontSize: 18,
      fontFamily: "Satoshi-Regular",
      color: "var(--grey-800)",
    };
    return tabKey === activeTabKey ? activeTabStyle : inActiveTabStyle;
  };

  const items = [
    {
      label: "Profile information",
      children: <ProfileInfo />,
      key: "1",
    },
    {
      label: "Transactions",
      key: "2",
      children: <Transactions />,
    },
    {
      label: "Security",
      key: "3",
      children: <Security />,
      disabled: true,
    },
    {
      label: "Plans",
      key: "4",
      children: <Plans />,
      disabled: true,
    },
    {
      label: "Delivery",
      key: "5",
      children: <Delivery />,
    },
  ].map((option) => ({
    key: option.key,
    label: <div style={getTabStyle(option.key)}>{option.label}</div>,
    disabled: option.disabled,
    children: (
      <div
        style={{
          display: "flex",
          paddingTop: "10px",
          paddingBottom: "40px",
          width: "100%",
        }}
      >
        {option.children}
      </div>
    ),
  }));

  return (
    <div
      className="shadowy"
      style={{
        padding: " 26px 55px",
        margin: "70px 22px",
        width: "100%",
        display: "flex",
        border: "1px solid var(--grey-400)",
        borderRadius: 20,
      }}
    >
      <Tabs
        items={items}
        tabBarStyle={{
          width: "auto",
          height: 74,
          marginTop: 46,
          marginBottom: 26,
        }}
        activeKey={activeTabKey}
        onChange={(value) => setactiveTabKey(value)}
        style={{ width: "100%" }}
      />
    </div>
  );
}
