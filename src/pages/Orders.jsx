import OrderTable from "../components/PendingOrders";
import { Tabs } from "antd";
import { useState, useEffect } from "react";
import { Sales } from "../components/Sales";
import { faker } from "@faker-js/faker";
function formatDate(date) {
  const day = date.getDate();
  const month = date.getMonth() + 1; // Months are zero-indexed
  const year = date.getFullYear();

  return `${day.toString().padStart(2, "0")}/${month
    .toString()
    .padStart(2, "0")}/${year}`;
}

const generateRandomCustomers = (count, startingKey = 1) => {
  const customers = [];
  let currentKey = startingKey;

  for (let i = 0; i < count; i++) {
    const randomName = faker.person.fullName();
    const randomPhone = faker.phone.number("0#0# ### ####");
    const randomAmount = faker.number.int({ min: 1000, max: 100000 });
    const noOrders = faker.number.int({ min: 0, max: 99 });
    const randomStartDate = faker.date.between({
      from: "2022-01-01",
      to: "2023-12-31",
    });
    const randomDate = formatDate(randomStartDate);
    const RandomRecentOrder = [
      {
        productName: faker.commerce.productName(),
        quantity: faker.number.int({ min: 0, max: 50 }),
        amount: faker.number.int({ min: 1000, max: 9900 }),
        color: faker.color.human(),
        size: faker.number.int({ min: 10, max: 50 }),
        imageUrl: "https://loremflickr.com/320/240/laptop",
      },
      {
        productName: faker.commerce.productName(),
        quantity: faker.number.int({ min: 0, max: 50 }),
        amount: faker.number.int({ min: 1000, max: 9900 }),
        color: faker.color.human(),
        size: faker.number.int({ min: 10, max: 50 }),
        imageUrl: "https://loremflickr.com/320/240/laptop",
      },
    ];
    const randomString = faker.string.alphanumeric({
      length: 6,
      casing: "upper",
    });
    const randomLetters = faker.string.alphanumeric({
      length: 3,
      casing: "upper",
    });
    const statuses = ["Completed", "Processing", "Incomplete"];
    const randomStatus = faker.helpers.arrayElement(statuses);

    const customer = {
      key: randomName + randomPhone,
      name: randomName,
      id: `${randomString}-${randomLetters}`,
      actions: "...",
      total: randomAmount,
      mostPurchased: faker.commerce.productName(),
      NoOrders: noOrders,
      date: randomDate,
      recentOrder: RandomRecentOrder,
      status: randomStatus,
      location: faker.location.streetAddress({ useFullAddress: true }),
    };

    customers.push(customer);
    currentKey++;
  }

  return customers;
};

export function Orders() {
  const [activeTabKey, setactiveTabKey] = useState("1");
  const [isOrderDetailsOpen, setisOrderDetailsOpen] = useState(false);
  const [onlineSalesData, setonlineSalesData] = useState(
    generateRandomCustomers(100)
  );
  const [offlineSalesData, setofflineSalesData] = useState(
    generateRandomCustomers(50)
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

  useEffect(() => {
    if (activeTabKey === "1") {
      //    setMultipleSelectedOffline([]);
      let tempData = onlineSalesData;
      setonlineSalesData(tempData);
    } else {
      //      setMultipleSelectedOnline([]);
      let tempData1 = offlineSalesData;
      setofflineSalesData(tempData1);
    }
  }, [activeTabKey]);

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
            marginBottom: 56,
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
          multipleSelectedCustomer={multipleSelectedOnline}
          setMultipleSelectedCustomer={(data) =>
            setMultipleSelectedOnline(data)
          }
        />
      ) : (
        <Sales
          setDetailsStatus={(data) => setisOrderDetailsOpen(data)}
          data={offlineSalesData}
          setNewData={(data) => setofflineSalesData(data)}
          multipleSelectedCustomer={multipleSelectedOffline}
          setMultipleSelectedCustomer={(data) =>
            setMultipleSelectedOffline(data)
          }
        />
      )}
    </div>
  );
}
