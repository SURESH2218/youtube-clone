import { configureStore } from "@reduxjs/toolkit";
import appSlice from "./appSlice";

const reduxstore = configureStore({
  reducer: {
    app: appSlice,
  },
});

export default reduxstore;
