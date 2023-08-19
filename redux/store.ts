import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import ioSlice from "./ioSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    io: ioSlice,
  },
});
