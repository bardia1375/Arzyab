import { createSlice } from "@reduxjs/toolkit";
import myApi from "config/axios";

const initialState = {
  loading: false,
  items: null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setLoading: () => {
      return {
        loading: true,
      };
    },
    setProfile: (state, { payload }) => {
      return {
        items: payload,
        loading: false,
      };
    },
  },
});

export const { setProfile, setLoading } = profileSlice.actions;

export default profileSlice.reducer;

// fetch employees
export function fetchProfile(Token) {
  return async (dispatch) => {
    dispatch(setLoading());
    myApi
      .get("v1/user?includes%5B0%5D=profile.company", {
        headers: { Authorization: `Bearer ${Token}` },
      })
      .then((response) => {
        dispatch(setProfile(response.data.data.user));
      });
  };
}
