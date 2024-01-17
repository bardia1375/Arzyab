import { Button } from "components/common";
import React, { useContext } from "react";
import MapComponent from "../Dashboard/MapComponent";
import styled, { css } from "styled-components";
import MyContext from "./context/MyContext";

function DoneJob({ showImage, setShowImage, item, bardia }) {
  const savedImage = (item) => {
    console.log("item.id", item.id);
  };
  const { myValue, setMyValue } = useContext(MyContext);
  console.log("bardia234234", item.Latitude);
  return (
    <Item onClick={() => savedImage(item)}>
      <div>
        <MapComponent centerMap={[item.Latitude, item.Longitude]} />
      </div>
      <img src={bardia} width="100px" />
      <div>
        <span style={{ fontWeight: "bold" }}> آدرس : </span>
        {item.Address}
      </div>

      <div>
        <span style={{ fontWeight: "bold" }}> کد سفارش: </span>
        {myValue}
      </div>
      <div>
        <span style={{ fontWeight: "bold" }}> تاریخ: </span> {item.date} 1402
      </div>
      <div>
        <span style={{ fontWeight: "bold" }}> زمان: </span>
        {`${item.day} ${item.text}`}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        {/* <Button onClick={(el) => setForm(1)}>شروع</Button> */}
        <Button onClick={() => setShowImage(true)}>عکس های گرفته شده</Button>
      </div>
    </Item>
  );
}

export default DoneJob;

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
