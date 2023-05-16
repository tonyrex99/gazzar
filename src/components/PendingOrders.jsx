import { Table } from "antd";

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
    render: (text) => <div style={{ alignSelf: "center" }}>{text}</div>,
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

const dummyData = [
  {
    key: "1",
    name: (
      <div
        style={{ fontFamily: "Satoshi", fontWeight: "Regular", fontSize: 16 }}
      >
        Nike shoes
      </div>
    ),
    qty: Math.floor(Math.random() * 20) + 1, // generate random quantity between 1 and 20
    status: <button>Completed</button>,
    totalAmount: "N " + (Math.floor(Math.random() * 5000) + 5000), // generate random amount between N5000 and N9999
  },
  {
    key: "2",
    name: (
      <div
        style={{ fontFamily: "Satoshi", fontWeight: "Regular", fontSize: 16 }}
      >
        Adidas t-shirt
      </div>
    ),
    qty: Math.floor(Math.random() * 20) + 1,
    status: <button>Processing</button>,
    totalAmount: "N " + (Math.floor(Math.random() * 5000) + 5000),
  },
  {
    key: "3",
    name: (
      <div
        style={{ fontFamily: "Satoshi", fontWeight: "Regular", fontSize: 16 }}
      >
        Puma socks
      </div>
    ),
    qty: Math.floor(Math.random() * 20) + 1,
    status: <button>Cancelled</button>,
    totalAmount: "N " + (Math.floor(Math.random() * 5000) + 5000),
  },
  {
    key: "4",
    name: (
      <div
        style={{ fontFamily: "Satoshi", fontWeight: "Regular", fontSize: 16 }}
      >
        Reebok shorts
      </div>
    ),
    qty: Math.floor(Math.random() * 20) + 1,
    status: <button>Completed</button>,
    totalAmount: "N " + (Math.floor(Math.random() * 5000) + 5000),
  },
  {
    key: "5",
    name: (
      <div
        style={{ fontFamily: "Satoshi", fontWeight: "Regular", fontSize: 16 }}
      >
        Under Armour cap
      </div>
    ),
    qty: Math.floor(Math.random() * 20) + 1,
    status: <button>Processing</button>,
    totalAmount: "N " + (Math.floor(Math.random() * 5000) + 5000),
  },
];

const OrderTable = ({ data = dummyData }) => {
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
            fontFamily: "Satoshi",
            fontWeight: "Bold",
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
          dataSource={data}
          style={{
            padding: "30px 0px 0px 0px",
          }}
          bordered={false}
          size="middle"
        />
      </div>
    </div>
  );
};

export default OrderTable;
