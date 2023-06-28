import { faker } from "@faker-js/faker";

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
export const generateRandomCustomers = (count) => {
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
        imageUrl: faker.image.urlPicsumPhotos({ width: 440, height: 550 }),
      },
      {
        productName: faker.commerce.productName(),
        quantity: faker.number.int({ min: 0, max: 50 }),
        amount: faker.number.int({ min: 1000, max: 9900 }),
        color: faker.color.human(),
        size: faker.number.int({ min: 10, max: 50 }),
        imageUrl: faker.image.urlPicsumPhotos({ width: 440, height: 550 }),
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

export const generateRandomProducts = (count) => {
  const products = [];

  function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const randomCategory = ["Shoes", "Clothes", "Bags"];
  function getRandomValues(count, array) {
    const result = [];
    const maxCount = Math.min(count, array.length);

    // Pick at least one element from the array
    const randomIndex = Math.floor(Math.random() * array.length);
    result.push(array[randomIndex]);

    // Pick remaining values randomly
    for (let i = 1; i < maxCount; i++) {
      let newIndex;

      do {
        newIndex = Math.floor(Math.random() * array.length);
      } while (result.includes(array[newIndex])); // Ensure unique values

      result.push(array[newIndex]);
    }

    return result;
  }

  for (let i = 0; i < count; i++) {
    const randomTitle = faker.commerce.productName();
    const randomDescription = faker.lorem.sentence();
    const randomPrice = getRandomNumber(1000, 20000);
    const randomImageSrc = [];
    const numberOfImages = 5;

    for (let i = 1; i <= numberOfImages; i++) {
      randomImageSrc.push({
        id: i,
        src: faker.image.urlPicsumPhotos({ width: 440, height: 550 }),
        alt: randomTitle,
      });
    }

    const randomTopSelling = Math.random() < 0.5;
    const visibleInStore = Math.random() < 0.5;
    const qtySold = getRandomNumber(0, 99);
    const qtyLeft = getRandomNumber(0, 99);
    const randomOutOfStock = qtyLeft === 0;

    const categories = getRandomValues(1, randomCategory);

    const product = {
      key: i.toString(), // Add a unique key property
      title: randomTitle,
      description: randomDescription,
      topSelling: randomTopSelling,
      outOfStock: randomOutOfStock,
      price: randomPrice,
      imageSrc: randomImageSrc,
      qtySold: qtySold,
      qtyLeft: qtyLeft,
      category: categories,
      visibleInStore: visibleInStore,
      createdAt: new Date().toLocaleDateString("en-GB"),
      size: "22",
      color: "red",
      quantity: 1,
    };

    products.push(product);
  }

  return products;
};

export const generateRandomOrders = (count) => {
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
        title: faker.commerce.productName(),
        quantity: faker.number.int({ min: 0, max: 50 }),
        price: faker.number.int({ min: 1000, max: 9900 }),
        color: faker.color.human(),
        size: faker.number.int({ min: 10, max: 50 }),
        imageSrc: "https://loremflickr.com/320/240/laptop",
      },
      {
        title: faker.commerce.productName(),
        quantity: faker.number.int({ min: 0, max: 50 }),
        price: faker.number.int({ min: 1000, max: 9900 }),
        color: faker.color.human(),
        size: faker.number.int({ min: 10, max: 50 }),
        imageSrc: "https://loremflickr.com/320/240/laptop",
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
    const orderType = ["Offline", "Online"];

    const randomStatus = faker.helpers.arrayElement(statuses);
    const randomType = faker.helpers.arrayElement(orderType);
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
      orderType: randomType,
    };

    customers.push(customer);
  }

  return customers;
};

export function extractObjectsByOrderType(objects, orderType) {
  const extractedObjects = [];

  for (const object of objects) {
    if (object.orderType === orderType) {
      extractedObjects.push(object);
    }
  }

  return extractedObjects;
}
