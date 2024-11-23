import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const fetchAllFilteredProducts = createAsyncThunk(
  "/products/fetchAllProducts",

  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "http://localhost:3921/api/v1/shop/products/get"
      );

      return response?.data; // For fulfilled action
    } catch (error) {
      // Pass the response data (or custom message) to rejected action
      if (error.response) {
        // Server responded with a status other than 2xx
        return rejectWithValue(error.response.data);
      }
      // Fallback for network errors or other unexpected cases
      return rejectWithValue({ message: error.message });
    }
  }
);
