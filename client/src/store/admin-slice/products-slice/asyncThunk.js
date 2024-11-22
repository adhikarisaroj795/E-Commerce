import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addNewProduct = createAsyncThunk(
  "/products/addnewproduct",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:3921/api/v1/admin/products/add",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
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
export const fetchAllProducts = createAsyncThunk(
  "/products/fetchAllProducts",

  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "http://localhost:3921/api/v1/admin/products/get"
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
export const editProduct = createAsyncThunk(
  "/products/editProduct",
  async ({ formData, id }, { rejectWithValue }) => {
    try {
      console.log(FormData, "data from thunk");

      const response = await axios.put(
        `http://localhost:3921/api/v1/admin/products/edit/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
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
export const deleteProduct = createAsyncThunk(
  "/products/deleteProduct",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `http://localhost:3921/api/v1/admin/products/delete/${id}`
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
