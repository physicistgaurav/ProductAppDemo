import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Alert } from "react-native";

export const fetchDataFromApi = createAsyncThunk(
  "product/fetchDataFromApi",
  async () => {
    try {
      const response = await axios.get("https://dummyjson.com/products");
      console.log("Response", JSON.stringify(response, null, 2));

      const dataWithQty = response.data.products.map((item) => ({
        ...item,
        qty: 0,
      }));

      return dataWithQty;
    } catch (error) {
      throw error;
    }
  }
);

const myProductSlice = createSlice({
  name: "Product",
  initialState: {
    data: [],
    isFetching: false,
  },
  reducers: {
    addMyProducts: (state, action) => {
      state.data.push(action.payload);
    },
    increaseQty: (state, action) => {
      const myindex = state.data.findIndex(
        (item) => item.id === action.payload
      );
      if (myindex !== -1) {
        state.data[myindex].qty += 1;
      }
    },
    decreaseQty: (state, action) => {
      const myindex = state.data.findIndex(
        (item) => item.id === action.payload
      );
      if (myindex !== -1 && state.data[myindex].qty > 0) {
        state.data[myindex].qty -= 1;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDataFromApi.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(fetchDataFromApi.fulfilled, (state, action) => {
        state.isFetching = false;
        state.data = action.payload;
      })
      .addCase(fetchDataFromApi.rejected, (state) => {
        state.isFetching = false;
      });
  },
});

export const { addMyProducts, increaseQty, decreaseQty } =
  myProductSlice.actions;

export default myProductSlice.reducer;
