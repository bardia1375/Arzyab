import React from "react";
import { Navigate } from "react-router-dom";

import Login from "./Login";
import Reset from "./Reset";

// eslint-disable-next-line import/no-anonymous-default-export
export default [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/password/reset",
    element: <Reset />,
  },
  {
    path: "*",
    element: <Navigate to="/login" replace />,
  },
];
