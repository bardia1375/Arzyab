import React, { useContext } from "react";
import MapComponent from "../Dashboard/MapComponent";
import { Button } from "components/common";
import styled from "styled-components";
import MyContext from "./context/MyContext";

function OpenJob({ item, setForm }) {
  const {
    myValue,
    setMyValue,
    bardia,
    setBardia,
    setShowNavigation,
    showNavigation,
  } = useContext(MyContext);

  const start = (item) => {
    return setForm(1), setMyValue(item);
  };
  const navigation = () => {
    return setShowNavigation(true);
  };
  return (
    <Item>
      <div>
        <MapComponent centerMap={[item.Latitude, item.Longitude]} />
      </div>
      <div>
        <span style={{ fontWeight: "bold" }}> آدرس : </span>
        {item.Address}
      </div>

      <div>
        <span style={{ fontWeight: "bold" }}> کد سفارش: </span>
        14502
      </div>
      <div>
        <span style={{ fontWeight: "bold" }}> تاریخ: </span> {item.Date} 1402
      </div>
      <div>
        <span style={{ fontWeight: "bold" }}> زمان: </span>
        {`${item.day} ${item.text}`}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Button onClick={(el) => start(item)}>شروع</Button>
        <Button onClick={(el) => setShowNavigation(true)}>مسیریابی</Button>
      </div>
    </Item>
  );
}

export default OpenJob;
export const Item = styled.div`
  border-radius: 8px;
  margin-top: 8px;
  gap: 16px;
  border: 2px solid gray;
  padding: 4px 8px;
  white-space: noWrap;
  overflow: hidden;
  // font-size: 2vh;
  div {
    display: flex;
  }
`;
