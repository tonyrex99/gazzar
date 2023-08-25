import { Router } from "express";
import swaggerUI from "swagger-ui-express";

import { authenticateWithToken } from "../middlewares/auth.js";
import { handle404, handleError } from "../middlewares/errors.js";
import authRouter from "./auth.js";
import productRouter from "./product.js";
import imageRouter from "./image.js";
import customerRouter from "./customer.js";
import feedbackRouter from "./feedback.js";
import orderRouter from "./order.js";
import orderDetailsRouter from "./orderdetails.js";
import storeTemplateRouter from "./storetemplate.js";
import storeDataRouter from "./storedata.js";
import storeProfileRouter from "./storeprofile.js";
import storesRouter from "./stores.js";
import deliveryLocationRouter from "./deliverylocation.js";
import pickupLocationRouter from "./pickuplocation.js";
import todoListRouter from "./todolist.js";
import notificationsRouter from "./notifications.js";
import cartRouter from "./cart.js";
import cartDetailsRouter from "./cartdetails.js";
import urls from "../urls.js";
import spec from "../openapi.js";

const router = Router();

// Swagger API docs
const swaggerSpecPath = `${urls.swagger.path}/${urls.swagger.spec}`;
const swaggerUIOptions = {
  swaggerOptions: {
    url: swaggerSpecPath,
  },
};
router.get(swaggerSpecPath, (req, res) => res.json(spec));
router.use(
  urls.swagger.path,
  swaggerUI.serve,
  swaggerUI.setup(null, swaggerUIOptions)
);

// Authentication
router.use(authenticateWithToken);
router.use(urls.apiPrefix + urls.auth.path, authRouter);

// CRUD API
router.use(urls.apiPrefix + urls.product.path, productRouter);
router.use(urls.apiPrefix + urls.image.path, imageRouter);
router.use(urls.apiPrefix + urls.customer.path, customerRouter);
router.use(urls.apiPrefix + urls.feedback.path, feedbackRouter);
router.use(urls.apiPrefix + urls.order.path, orderRouter);
router.use(urls.apiPrefix + urls.orderDetails.path, orderDetailsRouter);
router.use(urls.apiPrefix + urls.storeTemplate.path, storeTemplateRouter);
router.use(urls.apiPrefix + urls.storeData.path, storeDataRouter);
router.use(urls.apiPrefix + urls.storeProfile.path, storeProfileRouter);
router.use(urls.apiPrefix + urls.stores.path, storesRouter);
router.use(urls.apiPrefix + urls.deliveryLocation.path, deliveryLocationRouter);
router.use(urls.apiPrefix + urls.pickupLocation.path, pickupLocationRouter);
router.use(urls.apiPrefix + urls.todoList.path, todoListRouter);
router.use(urls.apiPrefix + urls.notifications.path, notificationsRouter);
router.use(urls.apiPrefix + urls.cart.path, cartRouter);
router.use(urls.apiPrefix + urls.cartDetails.path, cartDetailsRouter);

// Redirect browsers from index to API docs
router.get("/", (req, res, next) => {
  if (req.accepts("text/html")) {
    res.redirect(urls.swagger.path);
  } else {
    next();
  }
});

// Error handlers
router.use(handle404);
router.use(handleError);

export default router;
