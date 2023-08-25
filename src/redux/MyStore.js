import { configureStore } from "@reduxjs/toolkit";
import MyProductReducer from "./MyProductSlice";
import MyCartReducer from "./MyCartSlice";
import thunkMiddleware from "redux-thunk";

export const mystore = configureStore({
  reducer: {
    product: MyProductReducer,
    cart: MyCartReducer,
  },
  middleware: [thunkMiddleware],
});
