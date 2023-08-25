import swaggerJsDoc from "swagger-jsdoc";

import {
  loginSchema,
  registerSchema,
  changePasswordSchema,
  userSchema,
} from "./schemas/auth.js";
import productSchema from "./schemas/product.js";
import imageSchema from "./schemas/image.js";
import customerSchema from "./schemas/customer.js";
import feedbackSchema from "./schemas/feedback.js";
import orderSchema from "./schemas/order.js";
import orderDetailsSchema from "./schemas/orderdetails.js";
import storeTemplateSchema from "./schemas/storetemplate.js";
import storeDataSchema from "./schemas/storedata.js";
import storeProfileSchema from "./schemas/storeprofile.js";
import storesSchema from "./schemas/stores.js";
import deliveryLocationSchema from "./schemas/deliverylocation.js";
import pickupLocationSchema from "./schemas/pickuplocation.js";
import todoListSchema from "./schemas/todolist.js";
import notificationsSchema from "./schemas/notifications.js";
import cartSchema from "./schemas/cart.js";
import cartDetailsSchema from "./schemas/cartdetails.js";

export const definition = {
  openapi: "3.0.0",
  info: {
    title: "Gazzar",
    version: "0.0.1",
    description: "A REST+JSON API service",
  },
  servers: [
    {
      url: "/api/v1",
      description: "API v1",
    },
  ],
  components: {
    schemas: {
      Product: productSchema,
      Image: imageSchema,
      Customer: customerSchema,
      Feedback: feedbackSchema,
      Order: orderSchema,
      OrderDetails: orderDetailsSchema,
      StoreTemplate: storeTemplateSchema,
      StoreData: storeDataSchema,
      StoreProfile: storeProfileSchema,
      Stores: storesSchema,
      DeliveryLocation: deliveryLocationSchema,
      PickupLocation: pickupLocationSchema,
      TodoList: todoListSchema,
      Notifications: notificationsSchema,
      Cart: cartSchema,
      CartDetails: cartDetailsSchema,
      loginSchema,
      registerSchema,
      changePasswordSchema,
      User: userSchema,
    },
    securitySchemes: {
      BearerAuth: {
        type: "http",
        description: "Simple bearer token",
        scheme: "bearer",
        bearerFormat: "simple",
      },
    },
  },
};

const options = {
  definition,
  apis: ["./src/api/routes/*.js"],
};

const spec = swaggerJsDoc(options);

export default spec;
