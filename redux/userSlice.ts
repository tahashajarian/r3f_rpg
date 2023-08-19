import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  isLogin: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setName: (state, payload) => {
      const name = payload.payload;
      if (name) {
        state.name = payload.payload;
        state.isLogin = true;
      }
    },
    setLogin: (state, payload) => {
      state.isLogin = payload.payload;
    },
  },
});

export const { setName, setLogin } = userSlice.actions;
export default userSlice.reducer;
