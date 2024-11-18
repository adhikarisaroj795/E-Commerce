import { createSlice } from "@reduxjs/toolkit";
import { checkAuth, loginUser, registerUser } from "./asyncThunk";

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        (state.isLoading = false), (state.user = action.payload);
        state.isAuthenticated = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        (state.isLoading = false), (state.user = action.payload);
        state.isAuthenticated = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        (state.isLoading = false),
          (state.user = action.payload.status ? action.payload.user : null);
        state.isAuthenticated = action.payload.status;
      })
      .addCase(loginUser.rejected, (state, action) => {
        (state.isLoading = false), (state.user = action.payload);
        state.isAuthenticated = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        (state.isLoading = false),
          (state.user = action.payload.status ? action.payload.user : null);
        state.isAuthenticated = action.payload.status;
      })
      .addCase(checkAuth.rejected, (state, action) => {
        (state.isLoading = false), (state.user = action.payload);
        state.isAuthenticated = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export const { setUser } = authSlice.actions;

export default authSlice.reducer;
