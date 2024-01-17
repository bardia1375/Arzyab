import Card from "components/common/Card";
import React, { useContext } from "react";
import MapComponent from "../Dashboard/MapComponent";
import { Button } from "components/common";
import MyContext from "./context/MyContext";

function DetailJob({ setForm, item }) {
  const { myValue, setMyValue, bardia, setBardia } = useContext(MyContext);
  console.log("myValuemyValue", myValue);
  return (
    <Card height="calc(100vh - 300px)">
      <MapComponent
        height="calc(100vh - 400px)"
        centerMap={[myValue.Latitude, myValue.Longitude]}
      />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
          marginTop: "32px",
          width: "100%",
          justifyContent: "center",
        }}
      >
        <Button onClick={() => setForm(2)}>ثبت خرابی</Button>
        <Button onClick={() => setForm(0)}> پایان</Button>
      </div>
    </Card>
  );
}

export default DetailJob;
