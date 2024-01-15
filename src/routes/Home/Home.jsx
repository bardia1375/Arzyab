import { Outlet } from "react-router-dom";

// Components
import { MainLayout } from "components/layout";
import React from "react";
const Home = () => {
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
};

export default Home;
