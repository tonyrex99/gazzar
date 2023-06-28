import { createSlice } from "@reduxjs/toolkit";
import { generateRandomProducts } from "../../services/services";

// Generate initial Products data
const initialProducts = generateRandomProducts(100);

const ProductsSlice = createSlice({
  name: "products",
  initialState: initialProducts,
  reducers: {
    addProduct: (state, action) => {
      state.push(action.payload);
    },
    removeProduct: (state, action) => {
      const ProductKey = action.payload;
      return state.filter((Product) => Product.key !== ProductKey);
    },
    removeProductsByKeys: (state, action) => {
      const ProductObjects = action.payload;
      const ProductKeysToRemove = ProductObjects.map((Product) => Product.key);
      return state.filter(
        (Product) => !ProductKeysToRemove.includes(Product.key)
      );
    },
    updateProduct: (state, action) => {
      const updatedProduct = action.payload;
      const ProductIndex = state.findIndex(
        (Product) => Product.key === updatedProduct.key
      );
      if (ProductIndex !== -1) {
        state[ProductIndex] = updatedProduct;
      } else {
        state.push(updatedProduct);
      }
    },
  },
});

// Export actions
export const {
  addProduct,
  removeProduct,
  removeProductsByKeys,
  updateProduct,
} = ProductsSlice.actions;

// Export reducer
export default ProductsSlice.reducer;
