import { createSlice } from "@reduxjs/toolkit";
import { io } from "socket.io-client";

const initialState = {
  socket: io.connect("http://localhost:8000"),
  isConnected: true,
};

export const ioSlice = createSlice({
  name: "io",
  initialState,
  reducers: {
    setSocktConnect: (state, palyload) => {
      state.socket = palyload.payload;
    },
  },
});

export const { setSocktConnect } = ioSlice.actions;
export default ioSlice.reducer;
