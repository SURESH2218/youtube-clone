import { configureStore } from "@reduxjs/toolkit";
import appSlice from "./appSlice";
import searchSlice from "./searchSlice";

const reduxstore = configureStore({
  reducer: {
    app: appSlice,
    search: searchSlice,
  },
});

export default reduxstore;
