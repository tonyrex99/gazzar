import { createSlice } from "@reduxjs/toolkit";
import { generateRandomOrders } from "../../services/services";

// Generate initial Orders data
const initialOrders = generateRandomOrders(100);

const OrdersSlice = createSlice({
  name: "orders",
  initialState: initialOrders,
  reducers: {
    addOrder: (state, action) => {
      state.push(action.payload);
    },
    removeOrder: (state, action) => {
      const OrderKey = action.payload;
      return state.filter((Order) => Order.key !== OrderKey);
    },
    removeOrdersByKeys: (state, action) => {
      const OrderObjects = action.payload;
      const OrderKeysToRemove = OrderObjects.map((Order) => Order.key);
      return state.filter((Order) => !OrderKeysToRemove.includes(Order.key));
    },
    updateOrder: (state, action) => {
      const updatedOrder = action.payload;
      const OrderIndex = state.findIndex(
        (Order) => Order.key === updatedOrder.key
      );
      if (OrderIndex !== -1) {
        state[OrderIndex] = updatedOrder;
      } else {
        state.push(updatedOrder);
      }
    },
  },
});

// Export actions
export const { addOrder, removeOrder, removeOrdersByKeys, updateOrder } =
  OrdersSlice.actions;

// Export reducer
export default OrdersSlice.reducer;
