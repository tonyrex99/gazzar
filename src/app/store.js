import { configureStore } from "@reduxjs/toolkit";
import CustomersReducer from "../features/customers/CustomersSlice";
import ProductsReducer from "../features/products/ProductsSlice";
import OrdersReducer from "../features/orders/OrdersSlice";
export default configureStore({
  reducer: {
    customers: CustomersReducer,
    products: ProductsReducer,
    orders: OrdersReducer,
  },
});
