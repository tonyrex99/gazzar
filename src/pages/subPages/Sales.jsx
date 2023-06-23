import { SearchNFilter } from "../../components/SearchNFilter";
import ProductsTable from "../../components/ProductsTable";
import OrderDetails from "./OrderDetails";
import { useState, useEffect } from "react";
import { Empty } from "antd";
import { EmptySvg } from "../../assets/icons/CustomIcons";
import { CustomButton } from "../../assets/icons/CustomButtons";
import FilterCustomers from "../../components/FilterCustomers";
import { CustomIcon } from "../../assets/icons/CustomIcons";
const options = {
  style: "decimal",
};
export function Sales({
  setDetailsStatus,
  data,
  setNewData,
  multipleSelectedOrder,
  setmultipleSelectedOrder,
}) {
  const [isOrderDetailsOpen, setIsOrderDetailsOpen] = useState(false);
  const [orderData, setorderData] = useState({});
  const [allProductsNumber, setAllProductsNumber] = useState(
    Object.keys(data).length
  );
  const [searchValue, setsearchValue] = useState("");
  const [isFilterOpen, setisFilterOpen] = useState(false);
  const [filter, setfilter] = useState({});

  useEffect(() => {
    setDetailsStatus(isOrderDetailsOpen);
  }, [isOrderDetailsOpen]);
  const formatDate = (dateString) => {
    const [month, day, year] = dateString.split("/");
    const formattedDate = new Date(year, month - 1, day).toLocaleDateString(
      "en-GB",
      {
        day: "numeric",
        month: "long",
        year: "numeric",
      }
    );

    return formattedDate.replace(
      /\b(\d{1,2})\b/g,
      (match) =>
        match +
        (match.length === 1
          ? "st"
          : match.length === 2 && match[0] === "1"
          ? "th"
          : match[match.length - 1] === "1"
          ? "st"
          : match[match.length - 1] === "2"
          ? "nd"
          : match[match.length - 1] === "3"
          ? "rd"
          : "th")
    );
  };

  const Defcolumns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "ID",
      render: (text) => (
        <div
          style={{
            color: "#000000",
            fontSize: 16,
            fontFamily: "Satoshi-Regular",
          }}
        >
          {text}
        </div>
      ),
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (text) => (
        <div
          style={{
            color: "#000000",
            fontSize: 16,
            fontFamily: "Satoshi-Regular",
          }}
        >
          {formatDate(text)}
        </div>
      ),
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
      align: "center",
      render: (text) => (
        <div
          style={{
            color: "var(--primary-navy-blue)",
            alignSelf: "center",
            fontSize: 16,
            fontFamily: "Satoshi-Bold",
          }}
        >
          {"₦ " + (text && text.toLocaleString("en-NG", options))}
        </div>
      ),
    },

    {
      title: "Customer",
      dataIndex: "name",
      key: "customer",

      render: (text) => (
        <div
          style={{
            color: "#000000",
            fontSize: 16,
            fontFamily: "Satoshi-Regular",
          }}
        >
          {text}
        </div>
      ),
    },
    {
      title: `\u00A0 \u00A0 \u00A0 \u00A0 \u00A0  Status`,
      dataIndex: "status",
      key: "status",
      //   align: "center",
      render: (text) => (
        <div
          style={{
            color:
              text === "Incomplete"
                ? "var(--warning)"
                : text === "Completed"
                ? "var(--success)"
                : "var(--secondary-gold)",
            fontSize: 12,
            fontFamily: "Satoshi-Bold",
            padding: "10px 24px",
            width: 114,
            borderRadius: 29,
            backgroundColor:
              text === "Incomplete"
                ? "#fde4e4"
                : text === "Completed"
                ? "#def3d9"
                : "#fff4de",

            textAlign: "center",
          }}
        >
          {text}
        </div>
      ),
    },
    {
      title: "...",
      dataIndex: "actions",
      key: "actions",
      render: (text) => (
        <div
          style={{
            fontSize: 16,
            fontFamily: "Satoshi-Regular",
          }}
        >
          {text}
        </div>
      ),
    },
  ];
  function updateProducts(newOrder, action) {
    const updatedOrders = [...data]; // Create a copy of the data array

    if (action === "add") {
      const index = updatedOrders.findIndex(
        (product) => product.key === newOrder.key
      );

      if (index !== -1) {
        updatedOrders[index] = newOrder;
      } else {
        // Generate a new key for the new product based on its index
        const newIndex = updatedOrders.length + 1;

        // Create a new product object with the provided values and additional properties
        const orderToAdd = {
          ...newOrder,
          key: newIndex.toString(),
        };

        updatedOrders.push(orderToAdd);
      }
    } else if (action === "delete") {
      const index = updatedOrders.findIndex(
        (product) => product.key === newOrder.key
      );

      if (index !== -1) {
        updatedOrders.splice(index, 1);
      }
    }

    setNewData(updatedOrders);
    setAllProductsNumber(Object.keys(data).length);
  }
  if (isOrderDetailsOpen) {
    return (
      <OrderDetails
        data={orderData}
        onBackClick={() => setIsOrderDetailsOpen(false)}
        modifyActiveCustomer={updateProducts}
        //changeCategories={setProdCategories}
      />
    );
  }

  const removeSelectedCustomers = () => {
    const updateCustomers = data.filter(
      (customer) =>
        !multipleSelectedOrder.some((selected) => selected.key === customer.key)
    );
    setNewData(updateCustomers);
    setmultipleSelectedOrder([]);
  };
  function changeSearchValue(value) {
    setsearchValue(value);
  }
  function filterCustomers(filter, customers) {
    return customers.filter((customer) => {
      // Filter by title
      if (filter.title) {
        const filterKeywords = filter.title.toLowerCase().split(" ");
        const customerName = customer.name.toLowerCase();
        if (!filterKeywords.some((keyword) => customerName.includes(keyword))) {
          return false;
        }
      }

      // Filter by dateCreated
      if (filter.dateCreated) {
        const currentDate = new Date().setHours(0, 0, 0, 0); // Get current date at midnight
        const [startDate, endDate] = filter.dateCreated.split(",");

        if (startDate) {
          const startDateTime = new Date(startDate).setHours(0, 0, 0, 0);
          if (customer.createdAt < startDateTime) {
            return false;
          }
        }

        if (endDate) {
          const endDateTime = new Date(endDate).setHours(23, 59, 59, 999);
          if (customer.createdAt > endDateTime) {
            return false;
          }
        }
      }

      // Filter by amountSpent
      if (filter.amountSpent) {
        const [minAmount, maxAmount] = filter.amountSpent
          .split(",")
          .map(parseFloat);
        const customerAmount = customer.amountSpent;
        if (minAmount && maxAmount) {
          if (customerAmount < minAmount || customerAmount > maxAmount) {
            return false;
          }
        } else if (minAmount) {
          if (customerAmount < minAmount) {
            return false;
          }
        } else if (maxAmount) {
          if (customerAmount > maxAmount) {
            return false;
          }
        }
      }

      // Filter by location
      if (filter.location) {
        const filterLocation = filter.location.toLowerCase();
        const customerLocation = customer.location.toLowerCase();
        if (!customerLocation.includes(filterLocation)) {
          return false;
        }
      }

      // Filter by NoOrders
      if (filter.NoOrders) {
        const filterNoOrders = parseInt(filter.NoOrders);
        const customerNoOrders = customer.NoOrders;
        if (customerNoOrders !== filterNoOrders) {
          return false;
        }
      }

      return true;
    });
  }

  return (
    <div style={{ display: "flex", width: "100%" }}>
      <ProductsTable
        handleTableSelect={(data) => {
          setmultipleSelectedOrder(data);
        }}
        empty={() => (
          <Empty
            description={
              <div
                style={{
                  fontFamily: "Satoshi-Medium",
                  fontSize: 16,
                  color: "var(--secondary-gold)",
                }}
              >
                No orders found
              </div>
            }
            image={<EmptySvg />}
          />
        )}
        title={() => {
          return (
            <SearchNFilter
              onFilterClick={() => setisFilterOpen(!isFilterOpen)}
              isFilterActive={filter}
              onSearchChange={changeSearchValue}
              searchValue={searchValue}
              addItemLabel={"Add new customer"}
              addItemClick={() => {
                setIsOrderDetailsOpen(true);
                setorderData({});
              }}
              showFilter
            >
              {multipleSelectedOrder.length > 0 && (
                <CustomButton
                  type="primary"
                  icon={<CustomIcon name="Trash" />}
                  title={
                    multipleSelectedOrder.length === allProductsNumber.length
                      ? "Delete All"
                      : multipleSelectedOrder.length > 0
                      ? `Delete (${multipleSelectedOrder.length})`
                      : "Delete"
                  }
                  iconPosition="left"
                  width={"auto"}
                  style={{
                    height: 49,
                    backgroundColor:
                      multipleSelectedOrder.length > 0 &&
                      "rgba(240,72,72,0.15)",
                    color: multipleSelectedOrder.length > 0 && "var(--warning)",

                    fontFamily: "Satoshi-Bold",
                    marginRight: 12,
                    border: "1px solid var(--grey-500)",
                    marginBottom: 10,
                  }}
                  onClick={(event) => {
                    event.stopPropagation();
                    removeSelectedCustomers();
                  }}
                  disabled={multipleSelectedOrder.length < 1}
                />
              )}
            </SearchNFilter>
          );
        }}
        data={filterCustomers({ title: searchValue, ...filter }, data)}
        columns={Defcolumns}
        showPagination
        handleProductClick={(record) => {
          setIsOrderDetailsOpen(true);
          setorderData(record);
        }}
      />
      <FilterCustomers
        isOpen={isFilterOpen}
        onCancel={() => setisFilterOpen(false)}
        onClear={() => setfilter({})}
        onApply={(data) => setfilter(data)}
      />
    </div>
  );
}
