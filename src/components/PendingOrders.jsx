import { Table, Select } from "antd";
import { useState } from "react";

const OrderTable = ({ data }) => {
  const [dummyData, setDummyData] = useState([
    {
      key: "1",
      name: (
        <div
          style={{ fontFamily: "Satoshi-Regular", fontSize: 16 }}
        >
          Nike shoes
        </div>
      ),
      qty: Math.floor(Math.random() * 20) + 1, // generate random quantity between 1 and 20
      status: "Completed",
      totalAmount: "N " + (Math.floor(Math.random() * 5000) + 5000), // generate random amount between N5000 and N9999
    },
    {
      key: "2",
      name: (
        <div
          style={{ fontFamily: "Satoshi-Regular", fontSize: 16 }}
        >
          Adidas t-shirt
        </div>
      ),
      qty: Math.floor(Math.random() * 20) + 1,
      status: "Processing",
      totalAmount: "N " + (Math.floor(Math.random() * 5000) + 5000),
    },
    {
      key: "3",
      name: (
        <div
          style={{ fontFamily: "Satoshi-Regular", fontSize: 16 }}
        >
          Puma socks
        </div>
      ),
      qty: Math.floor(Math.random() * 20) + 1,
      status: "Processing",
      totalAmount: "N " + (Math.floor(Math.random() * 5000) + 5000),
    },
    {
      key: "4",
      name: (
        <div
          style={{ fontFamily: "Satoshi-Regular", fontSize: 16 }}
        >
          Reebok shorts
        </div>
      ),
      qty: Math.floor(Math.random() * 20) + 1,
      status: "Completed",
      totalAmount: "N " + (Math.floor(Math.random() * 5000) + 5000),
    },
    {
      key: "5",
      name: (
        <div
          style={{ fontFamily: "Satoshi-Regular", fontSize: 16 }}
        >
          Under Armour cap
        </div>
      ),
      qty: Math.floor(Math.random() * 20) + 1,
      status: "Processing",
      totalAmount: "N " + (Math.floor(Math.random() * 5000) + 5000),
    },
  ]);
  const [selectKey, setSelectKey] = useState(false);
  function setDataStatus(value, record) {
    var tempdata = dummyData;
    var newKey = Number(record.key) - 1;

    tempdata[newKey].status = value;

    setDummyData(tempdata);
    setSelectKey((prevKey) => !prevKey);
  }
  const statusColor = (value) => {
    switch (value) {
      case "Completed":
        return "#def3d9";
      case "Processing":
        return "#fff4de";
      case "Incomplete":
        return "#fde4e4";
      default:
        return "";
    }
  };
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Qty",
      dataIndex: "qty",
      key: "qty",
      align: "center",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      align: "center",
      style: { textAlign: "center" },
      render: (text, record) => (
        <div style={{ alignSelf: "center" }}>
          <Select
            key={selectKey}
            className="super-select-class"
            bordered={false}
            defaultValue={text}
            style={{
              width: 116,
              background: statusColor(dummyData[Number(record.key) - 1].status),
              borderRadius: 30,
              border: 0,
            }}
            onChange={(value) => setDataStatus(value, record)}
            options={[
              {
                value: "Completed",
                label: <div style={{ color: "var(--success)" }}>Completed</div>,
              },
              {
                value: "Processing",
                label: (
                  <div style={{ color: "var(--secondary-gold)" }}>
                    Processing
                  </div>
                ),
              },

              {
                value: "Incomplete",
                label: (
                  <div style={{ color: "var(--warning)" }}>Incomplete</div>
                ),
              },
            ]}
          />
        </div>
      ),
    },
    {
      title: "Total amount",
      dataIndex: "totalAmount",
      key: "totalAmount",
      align: "center",
      style: { textAlign: "center" },
      render: (text) => (
        <div style={{ color: "var(--primary-navy-blue)", alignSelf: "center" }}>
          {text}
        </div>
      ),
    },
  ];

  return (
    <div
      className="order-table"
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "30px 37px 0",
        backgroundColor: "#ffffff",
        flexDirection: "column",
        width: "100%",
        borderRadius: 10,
        border: "2px solid var(--grey-400)",
        minWidth: 320,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            flexDirection: "row",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontFamily: "Satoshi-Bold",
            fontSize: 24,
          }}
        >
          <div>Pending Orders</div>
          <div>
            <a href="#" style={{ textDecoration: "underline", fontSize: 16 }}>
              See all
            </a>
          </div>
        </div>
        <Table
          columns={columns}
          dataSource={dummyData}
          style={{
            padding: "30px 0px 0px 0px",
            marginBottom: 30,
          }}
          bordered={false}
          size="middle"
          pagination={false}
        />
      </div>
    </div>
  );
};

export default OrderTable;
