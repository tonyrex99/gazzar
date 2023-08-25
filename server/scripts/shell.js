import repl from "repl";

import config from "../src/utils/config.js";
import app from "../src/app.js";
import mongoInit from "../src/models/init.js";
import User from "../src/models/user.js";
import Product from "../src/models/product.js";
import Image from "../src/models/image.js";
import Customer from "../src/models/customer.js";
import Feedback from "../src/models/feedback.js";
import Order from "../src/models/order.js";
import OrderDetails from "../src/models/orderdetails.js";
import StoreTemplate from "../src/models/storetemplate.js";
import StoreData from "../src/models/storedata.js";
import StoreProfile from "../src/models/storeprofile.js";
import Stores from "../src/models/stores.js";
import DeliveryLocation from "../src/models/deliverylocation.js";
import PickupLocation from "../src/models/pickuplocation.js";
import TodoList from "../src/models/todolist.js";
import Notifications from "../src/models/notifications.js";
import Cart from "../src/models/cart.js";
import CartDetails from "../src/models/cartdetails.js";
import UserService from "../src/services/user.js";
import ProductService from "../src/services/product.js";
import ImageService from "../src/services/image.js";
import CustomerService from "../src/services/customer.js";
import FeedbackService from "../src/services/feedback.js";
import OrderService from "../src/services/order.js";
import OrderDetailsService from "../src/services/orderdetails.js";
import StoreTemplateService from "../src/services/storetemplate.js";
import StoreDataService from "../src/services/storedata.js";
import StoreProfileService from "../src/services/storeprofile.js";
import StoresService from "../src/services/stores.js";
import DeliveryLocationService from "../src/services/deliverylocation.js";
import PickupLocationService from "../src/services/pickuplocation.js";
import TodoListService from "../src/services/todolist.js";
import NotificationsService from "../src/services/notifications.js";
import CartService from "../src/services/cart.js";
import CartDetailsService from "../src/services/cartdetails.js";

const main = async () => {
  await mongoInit(config.DATABASE_URL);
  process.stdout.write("Database and Express app initialized.\n");
  process.stdout.write("Autoimported modules: config, app, models, services\n");

  const r = repl.start("> ");
  r.context.config = config;
  r.context.app = app;
  r.context.models = {
    User,
    Product,
    Image,
    Customer,
    Feedback,
    Order,
    OrderDetails,
    StoreTemplate,
    StoreData,
    StoreProfile,
    Stores,
    DeliveryLocation,
    PickupLocation,
    TodoList,
    Notifications,
    Cart,
    CartDetails,
  };
  r.context.services = {
    UserService,
    ProductService,
    ImageService,
    CustomerService,
    FeedbackService,
    OrderService,
    OrderDetailsService,
    StoreTemplateService,
    StoreDataService,
    StoreProfileService,
    StoresService,
    DeliveryLocationService,
    PickupLocationService,
    TodoListService,
    NotificationsService,
    CartService,
    CartDetailsService,
  };

  r.on("exit", () => {
    process.exit();
  });

  r.setupHistory(".shell_history", () => {});
};

main();
