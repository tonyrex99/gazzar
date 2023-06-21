import { SearchNFilter } from "../components/SearchNFilter";
import ProductsTable from "../components/ProductsTable";
import CustomerDetails from "../components/CustomerDetails";
import { useState, useEffect } from "react";
import { Empty } from "antd";
import { EmptySvg } from "../assets/icons/CustomIcons";
import { CustomButton } from "../assets/icons/CustomButtons";
import { CustomIcon } from "../assets/icons/CustomIcons";
import FilterCustomers from "../components/FilterCustomers";
import { useDispatch, useSelector } from "react-redux";
import {
  addCustomer,
  removeCustomer,
  updateCustomer,
} from "../features/customers/CustomersSlice";

const options = {
  style: "decimal",
};

export function Customers() {
  const dispatch = useDispatch();
  const [isCustomerDetailsOpen, setIsCustomerDetailsOpen] = useState(false);
  const [customerData, setCustomerData] = useState({});
  const generatedCustomers = useSelector((state) => state.customers);

  const [multipleSelectedCustomer, setMultipleSelectedCustomer] = useState([]);
  const [allProductsNumber, setAllProductsNumber] = useState(
    Object.keys(generatedCustomers).length
  );
  const [searchValue, setsearchValue] = useState("");
  const [isFilterOpen, setisFilterOpen] = useState(false);
  const [filter, setfilter] = useState({});
  const Defcolumns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
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
      title: "No. of Orders",
      dataIndex: "NoOrders",
      key: "no-orders",
      align: "center",
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
      title: "Amount spent",
      dataIndex: "amountSpent",
      key: "amount-spent",
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
          {"₦ " + text.toLocaleString("en-NG", options)}
        </div>
      ),
    },

    {
      title: "Date joined",
      dataIndex: "date",
      key: "date",
      align: "center",
      style: { textAlign: "center" },
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
      title: "Phone number",
      dataIndex: "phone",
      key: "phone",
      render: (text) => (
        <div
          style={{
            color: "#000000",
            fontSize: 16,
            fontFamily: "Satoshi-Bold",
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
  function updateProducts(newCustomer, action) {
    if (action === "add") {
      dispatch(updateCustomer(newCustomer));
    } else if (action === "delete") {
      dispatch(removeCustomer(newCustomer.key));
    }
  }

  const removeSelectedCustomers = () => {
    multipleSelectedCustomer.forEach((customer) => {
      dispatch(removeCustomer(customer.key));
    });
    setMultipleSelectedCustomer([]);
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

  if (isCustomerDetailsOpen) {
    return (
      <CustomerDetails
        data={customerData}
        onBackClick={() => setIsCustomerDetailsOpen(false)}
        modifyActiveCustomer={updateProducts}
        //changeCategories={setProdCategories}
      />
    );
  }

  return (
    <div style={{ display: "flex", width: "100%" }}>
      <ProductsTable
        handleTableSelect={(data) => {
          setMultipleSelectedCustomer(data);
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
                No customers found
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
                setIsCustomerDetailsOpen(true);
                setCustomerData({});
              }}
              showFilter
            >
              {multipleSelectedCustomer.length > 0 && (
                <CustomButton
                  type="primary"
                  icon={<CustomIcon name="Trash" />}
                  title={
                    multipleSelectedCustomer.length === allProductsNumber.length
                      ? "Delete All"
                      : multipleSelectedCustomer.length > 0
                      ? `Delete (${multipleSelectedCustomer.length})`
                      : "Delete"
                  }
                  iconPosition="left"
                  width={"auto"}
                  style={{
                    height: 49,
                    backgroundColor:
                      multipleSelectedCustomer.length > 0 &&
                      "rgba(240,72,72,0.15)",
                    color:
                      multipleSelectedCustomer.length > 0 && "var(--warning)",

                    fontWeight: "bold",
                    marginRight: 12,
                    border: "1px solid var(--grey-500)",
                    marginBottom: 10,
                  }}
                  onClick={(event) => {
                    event.stopPropagation();
                    removeSelectedCustomers();
                  }}
                  disabled={multipleSelectedCustomer.length < 1}
                />
              )}
            </SearchNFilter>
          );
        }}
        data={filterCustomers(
          { title: searchValue, ...filter },
          generatedCustomers
        )}
        columns={Defcolumns}
        showPagination
        handleProductClick={(record) => {
          setIsCustomerDetailsOpen(true);
          setCustomerData(record);
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
