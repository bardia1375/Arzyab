// App.js
import React from "react";
import ComponentA from "./ComponentA";
import MyContextProvider from "./context/MyContextProvider";
import { MyDiagram } from "./Container";
const ContainerContext = () => {
  return (
    <MyContextProvider>
      <MyDiagram />
    </MyContextProvider>
  );
};

export default ContainerContext;
