import { SearchNFilter } from "../components/SearchNFilter";
import ProductsTable from "../components/ProductsTable";
export function Customers() {
  const generateRandomProducts = (count) => {
    const products = [];

    function getRandomNumber(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const randomCategory = ["Shoes", "Clothes", "Bags"];
    const numCategories = getRandomNumber(0, randomCategory.length); // Generate a random number of categories

    for (let i = 0; i < count; i++) {
      const randomTitle = `XL brown hoodie ${i + 1}`;
      const randomDescription = "0901 234 5655";
      const randomPrice =
        "N " + new Intl.NumberFormat().format(getRandomNumber(1000, 20000));

      const qtySold = getRandomNumber(0, 99);
      const qtyLeft = getRandomNumber(0, 99);

      const categories = [];
      for (let j = 0; j < numCategories; j++) {
        const randomIndex = getRandomNumber(0, randomCategory.length - 1);
        const category = randomCategory[randomIndex];
        categories.push(category);
      }

      const product = {
        key: i.toString(), // Add a unique key property
        name: randomTitle,
        phone: randomDescription,
        actions: "...",
        amountSpent: randomPrice,
        NoOrders: qtySold,
        date: qtyLeft,
        category: categories,
      };

      products.push(product);
    }

    return products;
  };

  const generatedProducts = generateRandomProducts(100);
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
          {text}
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
  return (
    <div>
      <div style={{ height: 40 }} />
      <ProductsTable
        title={() => {
          return <SearchNFilter addItemLabel={"Add new customer"} />;
        }}
        data={generatedProducts}
        columns={Defcolumns}
        showPagination
      />
    </div>
  );
}
