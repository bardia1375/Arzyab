// Routes
import { Navigate } from "react-router-dom";
import MainBodyRoutes from "routes/Home/MainBody/routes";

// Components
import Home from "routes/Home/Home";

const routes = [
  {
    name: "home",
    path: "/",
    element: <Home />,
    children: [{ ...MainBodyRoutes }],
  },

  {
    path: "*",
    element: <Navigate to="/home" />,
  },
];

export default routes;
