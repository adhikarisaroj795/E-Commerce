import { createSlice } from "@reduxjs/toolkit";
import { fetchAllProducts } from "./asyncThunk.js";

const initialState = {
  isLoading: false,
  productList: [],
};
const AdminProductSlice = createSlice({
  name: "adminProducts",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        console.log(action.payload);
        (state.isLoading = false), (state.productList = action.payload);
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        (state.isLoading = false), (state.productList = []);
      });
  },
});

export default AdminProductSlice.reducer;
