import OrderTable from "../components/PendingOrders";
import { Tabs } from "antd";
import { useState, useEffect } from "react";
import { Sales } from "../components/Sales";
import { extractObjectsByOrderType } from "../services/services";
import {
  addOrder,
  removeOrder,
  updateOrder,
} from "../features/orders/OrdersSlice";
import { useDispatch, useSelector } from "react-redux";

export function Orders() {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders);
  const [activeTabKey, setactiveTabKey] = useState("1");
  const [isOrderDetailsOpen, setisOrderDetailsOpen] = useState(false);
  const [onlineSalesData, setonlineSalesData] = useState(
    extractObjectsByOrderType(orders, "Online")
  );
  const [offlineSalesData, setofflineSalesData] = useState(
    extractObjectsByOrderType(orders, "Offline")
  );
  const [multipleSelectedOnline, setMultipleSelectedOnline] = useState([]);
  const [multipleSelectedOffline, setMultipleSelectedOffline] = useState([]);

  const getTabStyle = (tabKey) => {
    const activeTabStyle = {
      padding: "21px 59px 29px 59px",
      fontSize: 18,
      fontFamily: "Satoshi",
      color: "var(--primary-navy-blue)",
      borderBottom: "5px solid red",
    };
    const inActiveTabStyle = {
      padding: "25px 40px",
      fontSize: 18,
      fontFamily: "Satoshi",
      color: "var(--grey-800)",
    };
    return tabKey === activeTabKey ? activeTabStyle : inActiveTabStyle;
  };

  const items = [
    {
      key: "1",
      label: "Online sales",
      //  children: <Sales />,
    },
    {
      key: "2",
      label: "Offline sales",
    },
  ].map((option) => ({
    key: option.key,
    label: <div style={getTabStyle(option.key)}>{option.label}</div>,
    children: option.children,
  }));

  return (
    <div>
      {isOrderDetailsOpen == false && (
        <Tabs
          key={activeTabKey}
          items={items}
          tabBarStyle={{
            width: "auto",
            height: 74,
            marginTop: 46,
            marginBottom: 26,
          }}
          activeKey={activeTabKey}
          onChange={(value) => setactiveTabKey(value)}
        />
      )}{" "}
      {activeTabKey === "1" ? (
        <Sales
          setDetailsStatus={(data) => setisOrderDetailsOpen(data)}
          data={onlineSalesData}
          setNewData={(data) => setonlineSalesData(data)}
          multipleSelectedOrder={multipleSelectedOnline}
          setmultipleSelectedOrder={(data) => setMultipleSelectedOnline(data)}
        />
      ) : (
        <Sales
          setDetailsStatus={(data) => setisOrderDetailsOpen(data)}
          data={offlineSalesData}
          setNewData={(data) => setofflineSalesData(data)}
          multipleSelectedOrder={multipleSelectedOffline}
          setmultipleSelectedOrder={(data) => setMultipleSelectedOffline(data)}
        />
      )}
    </div>
  );
}
