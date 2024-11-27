import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllFilteredProducts = createAsyncThunk(
  "/products/fetchAllProducts",
  async (
    { filterParams, sortParams = "price-lowtohigh" },
    { rejectWithValue }
  ) => {
    try {
      const query = new URLSearchParams({
        ...filterParams,
        sortBy: sortParams,
      });

      const response = await axios.get(
        `http://localhost:3921/api/v1/shop/products/get?${query}`
      );

      return response?.data || {};
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      }

      return rejectWithValue({ message: error.message });
    }
  }
);
export const fetchProductDetails = createAsyncThunk(
  "/products/fetchProductDetails",
  async (id, { rejectWithValue }) => {
    console.log("i am called");
    try {
      const response = await axios.get(
        `http://localhost:3921/api/v1/shop/products/get/${id}`
      );
      console.log(response.data);

      return response?.data || {};
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      }

      return rejectWithValue({ message: error.message });
    }
  }
);
