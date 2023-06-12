import { Table, Radio } from "antd";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
const ProductsTable = ({
  data,
  pageNumber,
  itemsPerPage,

  columns,
  showPagination,
  handleTableSelect,
  TableSelected,
  handleProductClick,
  ...props
}) => {
  const Defcolumns = [
    {
      title: "Name",
      dataIndex: "title",
      key: "name",
      render: (text) => (
        <div
          style={{
            color: "#575757",
            fontSize: 16,
            fontFamily: "Satoshi",
            fontWeight: "Regular",
          }}
        >
          {text}
        </div>
      ),
    },
    {
      title: "Qty sold",
      dataIndex: "qtySold",
      key: "qty-sold",
      align: "center",
      render: (text) => (
        <div
          style={{
            color: "#575757",
            fontSize: 16,
            fontFamily: "Satoshi",
            fontWeight: "Regular",
          }}
        >
          {text}
        </div>
      ),
    },
    {
      title: "Qty left",
      dataIndex: "qtyLeft",
      key: "qty-left",
      align: "center",
      render: (text) => (
        <div
          style={{
            color: "#575757",
            fontSize: 16,
            fontFamily: "Satoshi",
            fontWeight: "Bold",
          }}
        >
          {text}
        </div>
      ),
    },

    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      align: "center",
      style: { textAlign: "center" },
      render: (text) => (
        <div
          style={{
            color: "var(--primary-navy-blue)",
            alignSelf: "center",
            fontSize: 16,
            fontFamily: "Satoshi",
            fontWeight: "Bold",
          }}
        >
          ₦ {new Intl.NumberFormat().format(text)}
        </div>
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (text) => (
        <div
          style={{
            color: "#575757",
            fontSize: 16,
            fontFamily: "Satoshi",
            fontWeight: "Regular",
          }}
        >
          {text}
        </div>
      ),
    },
  ];
  function extractKeys(objects) {
    return objects.map((obj) => obj.key);
  }
  const startIndex = (pageNumber - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const [selectedRowKeys, setSelectedRowKeys] = useState(
    TableSelected && extractKeys(TableSelected)
  );

  const onSelectChange = (newSelectedRowKeys, selectedRows) => {
    setSelectedRowKeys(newSelectedRowKeys);
    handleTableSelect(selectedRows);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
      {
        key: "odd",
        text: "Select Odd Row",
        onSelect: (changeableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return false;
            }
            return true;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
      {
        key: "even",
        text: "Select Even Row",
        onSelect: (changeableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return true;
            }
            return false;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
    ],
  };
  return (
    <div
      className="order-table"
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "30px 17px 10px 28px",
        backgroundColor: "#ffffff",
        flexDirection: "column",
        borderRadius: 10,
        border: "2px solid var(--grey-400)",
        minWidth: 320,
        marginBottom: 12,
        width: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "column",
        }}
      >
        <Table
          columns={columns ? columns : Defcolumns}
          rowSelection={{
            ...rowSelection,
          }}
          dataSource={showPagination ? data : data.slice(startIndex, endIndex)}
          style={{
            marginBottom: 30,
          }}
          bordered={false}
          size="middle"
          pagination={showPagination ? true : false}
          onRow={(record, rowIndex) => {
            return {
              onClick: () => handleProductClick(record),
            };
          }}
          {...props}
        />
      </div>
    </div>
  );
};

export default ProductsTable;

ProductsTable.propTypes = {
  data: PropTypes.array,
  filter: PropTypes.array,
  categoryFilter: PropTypes.array,
  pageNumber: PropTypes.number,
  itemsPerPage: PropTypes.number,
};
