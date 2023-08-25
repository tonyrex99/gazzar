export default {
  apiPrefix: "/api/v1",
  swagger: {
    path: "/api/docs",
    spec: "openapi.json",
  },
  auth: {
    path: "/auth",
    login: "/login",
    logout: "/logout",
    changePassword: "/password",
    register: "/register",
  },
  product: {
    path: "/product",
  },
  image: {
    path: "/image",
  },
  customer: {
    path: "/customer",
  },
  feedback: {
    path: "/feedback",
  },
  order: {
    path: "/order",
  },
  orderDetails: {
    path: "/order-details",
  },
  storeTemplate: {
    path: "/store-template",
  },
  storeData: {
    path: "/store-data",
  },
  storeProfile: {
    path: "/store-profile",
  },
  stores: {
    path: "/stores",
  },
  deliveryLocation: {
    path: "/delivery-location",
  },
  pickupLocation: {
    path: "/pickup-location",
  },
  todoList: {
    path: "/todo-list",
  },
  notifications: {
    path: "/notifications",
  },
  cart: {
    path: "/cart",
  },
  cartDetails: {
    path: "/cart-details",
  },
};
