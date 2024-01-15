import { createSlice } from "@reduxjs/toolkit";
import myApi from "config/axios";
import moment from "moment-jalaali";

const initialState = {
  loading: false,
  dashboard: null,
  clocking: null,
  leaves: null,
  assignments: null,
  dailyAssignment: null,
  day: null,
  month: null,
  users: [
    {
      name: "محمود عباسی",
      Code: "444",
    },
    {
      name: "رضا منیری",
      Code: "123",
    },
    {
      name: "ابوالفضل آقاسی",
      Code: "453",
    },
    {
      name: "محمود کریمی",
      Code: "323",
    },
    {
      name: "سینا باباجانی",
      Code: "333",
    },
    {
      name: "رضا بنیادی",
      Code: "22",
    },
    {
      name: "سعید کاظمی",
      Code: "11",
    },
    // 10 more items added below with male names:
    {
      name: "ناصر حسینی",
      Code: "555",
    },
    {
      name: "علی زمانی",
      Code: "666",
    },
    {
      name: "حسن علیزاده",
      Code: "777",
    },
    {
      name: "محمدرضا محمدی",
      Code: "888",
    },
    {
      name: "علی اکبری",
      Code: "999",
    },
    {
      name: "محمد رحیمیان",
      Code: "101",
    },
    {
      name: "حسن اسدی",
      Code: "202",
    },
    {
      name: "حمیدرضا حسینی",
      Code: "303",
    },
    {
      name: "مصطفی محمدزاده",
      Code: "404",
    },
    {
      name: "محمدرضا اکبری",
      Code: "505",
    },
  ],
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setLoading: () => {
      return {
        loading: true,
      };
    },
    setDashboard: (state, { payload }) => {
      return {
        dashboard: payload,
        loading: false,
      };
    },
    setUsers: (state, { payload }) => {
      console.log("payloadf",payload);
      return {
        ...state,
        users: payload,
        loading: false,
      };
    },
    setDay: (state, { payload }) => {
      return {
        day: payload,
        loading: false,
      };
    },
    setMonth: (state, { payload }) => {
      return {
        month: payload,
        loading: false,
      };
    },
    setLastTraffic: (state, { payload }) => {
      return {
        clocking: payload,
        loading: false,
      };
    },
    setLastLeave: (state, { payload }) => {
      return {
        leaves: payload,
        loading: false,
      };
    },
    setLastAssignment: (state, { payload }) => {
      return {
        assignments: payload,
        loading: false,
      };
    },
    setDailyAssignment: (state, { payload }) => {
      return {
        dailyAssignment: payload,
        loading: false,
      };
    },
  },
});

export const {
  setDashboard,
  setUsers,
  setDay,
  setMonth,
  setDailyAssignment,
  setLastTraffic,
  setLastLeave,
  setLastAssignment,
  setLoading,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;

// fetch employees
export function fetchDashboard(Token) {
  return async (dispatch) => {
    dispatch(setLoading());
    myApi
      .get("V1/Dashboard", {
        headers: { Authorization: `Bearer ${Token}` },
      })
      .then((response) => {
        dispatch(setDashboard(response.data.data));
      });
  };
}
// fetch users
export function fetchUsers(Token, data) {
  console.log("datadata",data);
  return async (dispatch) => {
    await dispatch(setUsers(data));
  };
}
// fetch last traffic
export function fetchLastTraffic(Token, date) {
  return async (dispatch) => {
    dispatch(setLoading());
    myApi
      .get(
        `/v1/ta/clockings?filter_groups[0][filters][1][key]=datetime&filter_groups[0][filters][1][value][0]=${
          date.split("-").length === 3
            ? moment(date, "jYYYY-jMM-jDD").format("YYYY-MM-DD")
            : moment(`${date}-01`, "jYYYY-jMM-jDD").format("YYYY-MM-DD")
        } 00:00:00&filter_groups[0][filters][1][value][1]=${
          date.split("-").length === 3
            ? moment(
                `${date.split("-")[0]}-${date.split("-")[1]}-${parseInt(
                  date.split("-")[2]
                )}`,
                "jYYYY-jMM-jDD"
              ).format("YYYY-MM-DD")
            : moment(
                `${moment().format("jYYYY-jMM-jDD").split("-")[0]}-${
                  moment().format("jYYYY-jMM-jDD").split("-")[1]
                }-${parseInt(moment().format("jYYYY-jMM-jDD").split("-")[2])}`,
                "jYYYY-jMM-jDD"
              ).format("YYYY-MM-DD")
        } 23:59:59&filter_groups[0][filters][1][operator]=bt&sort[0][key]=datetime&sort[0][direction]=DESC&limit=10&page=0`,
        {
          headers: { Authorization: `Bearer ${Token}` },
        }
      )
      .then((res) => {
        dispatch(setLastTraffic(res.data?.data?.clockings));
      });
  };
}
// fetch last leave
export function fetchLastLeaves(Token, date) {
  return async (dispatch) => {
    dispatch(setLoading());
    myApi
      .get(
        `/v1/MobileApp/GetMyLeave?filter_groups[0][filters][1][key]=datetime&filter_groups[0][filters][1][value][0]=${
          date.split("-").length === 3
            ? moment(date, "jYYYY-jMM-jDD").format("YYYY-MM-DD")
            : moment(`${date}-01`, "jYYYY-jMM-jDD").format("YYYY-MM-DD")
        } 00:00:00&filter_groups[0][filters][1][value][1]=${
          date.split("-").length === 3
            ? moment(
                `${date.split("-")[0]}-${date.split("-")[1]}-${parseInt(
                  date.split("-")[2]
                )}`,
                "jYYYY-jMM-jDD"
              ).format("YYYY-MM-DD")
            : moment(
                `${moment().format("jYYYY-jMM-jDD").split("-")[0]}-${
                  moment().format("jYYYY-jMM-jDD").split("-")[1]
                }-${parseInt(moment().format("jYYYY-jMM-jDD").split("-")[2])}`,
                "jYYYY-jMM-jDD"
              ).format("YYYY-MM-DD")
        } 23:59:59&filter_groups[0][filters][1][operator]=bt&sort[0][key]=datetime&sort[0][direction]=DESC&limit=10&page=0`,
        {
          headers: { Authorization: `Bearer ${Token}` },
        }
      )
      .then((res) => {
        dispatch(setLastLeave(res.data.data));
      });
  };
}
// fetch last assignment
export function fetchLastAssignment(Token, date) {
  return async (dispatch) => {
    dispatch(setLoading());
    myApi
      .get(
        `/v1/MobileApp/GetMyAssignment?filter_groups[0][filters][1][key]=datetime&filter_groups[0][filters][1][value][0]=${
          date.split("-").length === 3
            ? moment(date, "jYYYY-jMM-jDD").format("YYYY-MM-DD")
            : moment(`${date}-01`, "jYYYY-jMM-jDD").format("YYYY-MM-DD")
        } 00:00:00&filter_groups[0][filters][1][value][1]=${
          date.split("-").length === 3
            ? moment(
                `${date.split("-")[0]}-${date.split("-")[1]}-${parseInt(
                  date.split("-")[2]
                )}`,
                "jYYYY-jMM-jDD"
              ).format("YYYY-MM-DD")
            : moment(
                `${moment().format("jYYYY-jMM-jDD").split("-")[0]}-${
                  moment().format("jYYYY-jMM-jDD").split("-")[1]
                }-${parseInt(moment().format("jYYYY-jMM-jDD").split("-")[2])}`,
                "jYYYY-jMM-jDD"
              ).format("YYYY-MM-DD")
        } 23:59:59&filter_groups[0][filters][1][operator]=bt&sort[0][key]=datetime&sort[0][direction]=DESC&limit=10&page=0`,
        {
          headers: { Authorization: `Bearer ${Token}` },
        }
      )
      .then((res) => {
        dispatch(setLastAssignment(res.data.data));
      });
  };
}

// fetch Day
export function fetchDashboardForDay(Token, day) {
  return async (dispatch) => {
    dispatch(setLoading());
    myApi
      .get("V1/MobileApp/DashboardForDay", {
        headers: { Authorization: `Bearer ${Token}` },
        params: {
          Day: day,
        },
      })
      .then((res) => {
        dispatch(setDay(res.data.data));
      });
  };
}

// fetch Month
export function fetchDashboardForMonth(Token, year, month) {
  return async (dispatch) => {
    dispatch(setLoading());
    myApi
      .get("V1/MobileApp/DashboardForMonth", {
        headers: { Authorization: `Bearer ${Token}` },
        params: {
          Year: year,
          Month: month,
        },
      })
      .then((res) => {
        dispatch(setMonth(res.data.data));
      });
  };
}

// fetch assignments
export function fetchMyAssignments(Token, start, end) {
  return async (dispatch) => {
    dispatch(setLoading());
    myApi
      .get("V1/MobileApp/GetMyAssignment", {
        headers: { Authorization: `Bearer ${Token}` },
        params: {
          StartDate: start,
          EndDate: end,
        },
      })
      .then((res) => {
        // dispatch(setDailyAssignment(res.data.data));
      });
  };
}
