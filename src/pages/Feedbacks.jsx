import { SearchNFilter } from "../components/SearchNFilter";
import ProductsTable from "../components/ProductsTable";
import { faker } from "@faker-js/faker";
import { Rate } from "antd";
export function Feedbacks() {
  const generateRandomProducts = (count) => {
    const products = [];

    function getRandomNumber(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const randomCategory = ["Shoes", "Clothes", "Bags"];
    const numCategories = getRandomNumber(0, randomCategory.length); // Generate a random number of categories

    for (let i = 0; i < count; i++) {
      const randomPrice =
        "N " + new Intl.NumberFormat().format(getRandomNumber(1000, 20000));

      const qtySold = getRandomNumber(0, 99);
      const randomPhone = faker.phone.number("0#0# ### ####");
      const qtyLeft = getRandomNumber(0, 5);

      const categories = [];
      for (let j = 0; j < numCategories; j++) {
        const randomIndex = getRandomNumber(0, randomCategory.length - 1);
        const category = randomCategory[randomIndex];
        categories.push(category);
      }

      const product = {
        key: i.toString(), // Add a unique key property
        review: faker.commerce.productDescription(),
        phone: randomPhone,
        actions: "View",
        date: randomPrice,
        NoOrders: qtySold,
        rating: qtyLeft,
        email: faker.internet.email(),
      };

      products.push(product);
    }

    return products;
  };

  const generatedProducts = generateRandomProducts(100);
  const Defcolumns = [
    {
      title: "Review",
      dataIndex: "review",
      key: "review",
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
      title: "Customer email",
      dataIndex: "email",
      key: "email",
      render: (text) => (
        <div
          style={{
            color: "var(--primary-navy-blue)",
            fontSize: 16,
            fontFamily: "Satoshi-Medium",
          }}
        >
          <u> {text}</u>
        </div>
      ),
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
      align: "center",
      render: (text) => (
        <div
          style={{
            color: "var(--primary-navy-blue)",
            alignSelf: "center",
            fontSize: 16,
            fontFamily: "Satoshi",

            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Rate
            disabled
            value={text}
            onClick={(event) => event.stopPropagation()}
            style={{
              color: "var(--secondary-gold)",
            }}
          />
          <div
            style={{
              marginLeft: 10,
              fontFamily: "Satoshi-Regular",
              color: "#000000",
            }}
          >
            {" "}
            {text}.0
          </div>
        </div>
      ),
    },

    {
      title: "Action",
      dataIndex: "actions",
      key: "action",
      align: "center",
      render: (text) => (
        <div
          style={{
            fontSize: 16,
            fontFamily: "Satoshi-Bold",
            color: "var(--primary-navy-blue)",
          }}
        >
          <u> {text}</u>
        </div>
      ),
    },
  ];
  return (
    <div>
      <ProductsTable
        title={() => {
          return (
            <>
              {" "}
              <SearchNFilter showFilter /> <div style={{ height: 20 }} />
            </>
          );
        }}
        data={generatedProducts}
        columns={Defcolumns}
        showPagination
        handleTableSelect={(data) =>
          console.log("selected feedbacks is: ", data)
        }
        handleProductClick={(data) =>
          console.log("clicked feedback is: ", data)
        }
      />
    </div>
  );
}
