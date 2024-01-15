import { createSlice } from "@reduxjs/toolkit";
import myApi from "config/axios";

const initialState = {
  loading: false,
  header: null,
  payload: null,
};

const workReportSlice = createSlice({
  name: "work-report",
  initialState,
  reducers: {
    setLoading: () => {
      return {
        loading: true,
      };
    },
    setHeader: (state, { payload }) => {
      return {
        header: payload,
        loading: false,
      };
    },
    setPayload: (state, { payload }) => {
      return {
        payload: payload,
        loading: false,
      };
    },
  },
});

export const { setHeader, setPayload, setLoading } = workReportSlice.actions;

export default workReportSlice.reducer;

// fetch employees
export function fetchWorkReport(Token, data) {
  return async (dispatch) => {
    dispatch(setLoading());
    myApi
      .post("/v1/ta/reports/103/run", data, {
        headers: { Authorization: `Bearer ${Token}` },
      })
      .then((res) => {
        dispatch(setHeader(res.data.data.header.payload));
        dispatch(setPayload(res.data.data.payload[0].body));
      });
  };
}
