import { configureStore } from "@reduxjs/toolkit";

import authSlice from "routes/Auth/Module";

import mainBodySlice from "routes/Home/MainBody/Module";
import dashboardSlice from "routes/Home/MainBody/Dashboard/Module";
import profileSlice from "routes/Home/MainBody/MyProfile/Module";
import workReportSlice from "routes/Home/MainBody/WorkReport/Module";

const store = configureStore({
  reducer: {
    auth: authSlice,
    employees: mainBodySlice,
    dashboard: dashboardSlice,
    profile: profileSlice,
    workReport: workReportSlice,
  },
});

export default store;
