import { SearchNFilter } from "../components/SearchNFilter";
import ProductsTable from "../components/ProductsTable";
import { faker } from "@faker-js/faker";
import CustomerDetails from "../components/CustomerDetails";
import { useState, useEffect } from "react";
import { Empty } from "antd";
import { EmptySvg } from "../assets/icons/CustomIcons";
import { CustomButton } from "../assets/icons/CustomButtons";
import { CustomIcon } from "../assets/icons/CustomIcons";
import FilterCustomers from "../components/FilterCustomers";
function formatDate(date) {
  const day = date.getDate();
  const month = date.getMonth() + 1; // Months are zero-indexed
  const year = date.getFullYear();

  return `${day.toString().padStart(2, "0")}/${month
    .toString()
    .padStart(2, "0")}/${year}`;
}
const options = {
  style: "decimal",
};
const generateRandomCustomers = (count) => {
  const customers = [];

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

    const customer = {
      key: i.toString(),
      name: randomName,
      phone: randomPhone,
      actions: "...",
      amountSpent: randomAmount,
      mostPurchased: faker.commerce.productName(),
      NoOrders: noOrders,
      date: randomDate,
      recentOrder: RandomRecentOrder,
      email: faker.internet.email(),
      location: faker.location.streetAddress({ useFullAddress: true }),
    };

    customers.push(customer);
  }

  return customers;
};

export function Customers() {
  const [isCustomerDetailsOpen, setIsCustomerDetailsOpen] = useState(false);
  const [customerData, setCustomerData] = useState({});
  const [generatedCustomers, setGeneratedCustomers] = useState(
    generateRandomCustomers(100)
  );
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
            fontFamily: "Satoshi",
            fontWeight: "Regular",
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
            fontFamily: "Satoshi",
            fontWeight: "Regular",
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
            fontFamily: "Satoshi",
            fontWeight: "Bold",
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
            fontFamily: "Satoshi",
            fontWeight: "Regular",
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
            fontFamily: "Satoshi",
            fontWeight: "Bold",
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
            fontFamily: "Satoshi",
            fontWeight: "Regular",
          }}
        >
          {text}
        </div>
      ),
    },
  ];
  function updateProducts(newCustomer, action) {
    const updatedCustomers = [...generatedCustomers]; // Create a copy of the generatedCustomers array

    if (action === "add") {
      const index = updatedCustomers.findIndex(
        (product) => product.key === newCustomer.key
      );

      if (index !== -1) {
        updatedCustomers[index] = newCustomer;
      } else {
        // Generate a new key for the new product based on its index
        const newIndex = updatedCustomers.length + 1;

        // Create a new product object with the provided values and additional properties
        const customerToAdd = {
          ...newCustomer,
          key: newIndex.toString(),
        };

        updatedCustomers.push(customerToAdd);
      }
    } else if (action === "delete") {
      const index = updatedCustomers.findIndex(
        (product) => product.key === newCustomer.key
      );

      if (index !== -1) {
        updatedCustomers.splice(index, 1);
      }
    }

    setGeneratedCustomers(updatedCustomers);
    setAllProductsNumber(Object.keys(generatedCustomers).length);
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

  const removeSelectedCustomers = () => {
    const updateCustomers = generatedCustomers.filter(
      (customer) =>
        !multipleSelectedCustomer.some(
          (selected) => selected.key === customer.key
        )
    );
    setGeneratedCustomers(updateCustomers);
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
                  fontFamily: "Satoshi",
                  fontWeight: "Medium",
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
