import { createSlice } from "@reduxjs/toolkit";
import { generateRandomCustomers } from "../../services/services";

// Generate initial customers data
const initialCustomers = generateRandomCustomers(100);

const customersSlice = createSlice({
  name: "customers",
  initialState: initialCustomers,
  reducers: {
    addCustomer: (state, action) => {
      state.push(action.payload);
    },
    removeCustomer: (state, action) => {
      const customerKey = action.payload;
      return state.filter((customer) => customer.key !== customerKey);
    },
    removeCustomersByKeys: (state, action) => {
      const customerObjects = action.payload;
      const customerKeysToRemove = customerObjects.map(
        (customer) => customer.key
      );
      return state.filter(
        (customer) => !customerKeysToRemove.includes(customer.key)
      );
    },
    updateCustomer: (state, action) => {
      const updatedCustomer = action.payload;
      const customerIndex = state.findIndex(
        (customer) => customer.key === updatedCustomer.key
      );
      if (customerIndex !== -1) {
        state[customerIndex] = updatedCustomer;
      } else {
        state.push(updatedCustomer);
      }
    },
  },
});

// Export actions
export const {
  addCustomer,
  removeCustomer,
  removeCustomersByKeys,
  updateCustomer,
} = customersSlice.actions;

// Export reducer
export default customersSlice.reducer;
