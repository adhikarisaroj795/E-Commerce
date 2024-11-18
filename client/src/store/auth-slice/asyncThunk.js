import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const registerUser = createAsyncThunk(
  "/auth/register",
  async (FormData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:3921/api/v1/auth/register",
        FormData,
        {
          withCredentials: true,
        }
      );
      return response.data; // For fulfilled action
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

export const loginUser = createAsyncThunk(
  "/auth/login",
  async (FormData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:3921/api/v1/auth/login",
        FormData,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue({ message: error.message });
    }
  }
);
export const checkAuth = createAsyncThunk(
  "/auth/checkauth",
  async (FormData, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "http://localhost:3921/api/v1/auth/check-auth",

        {
          withCredentials: true,
          headers: {
            "Cache-Control":
              "no-store, no-cache, must-revalidate, proxy-revalidate",
            Expires: "0",
          },
        }
      );
      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue({ message: error.message });
    }
  }
);
