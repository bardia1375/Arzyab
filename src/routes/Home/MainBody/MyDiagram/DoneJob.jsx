import { Button } from "components/common";
import React, { useContext, useState } from "react";
import MapComponent from "../Dashboard/MapComponent";
import styled, { css } from "styled-components";
import MyContext from "./context/MyContext";

function DoneJob({ showImage, setShowImage, item, NewImage,setForm,form
}) {
  const savedImage = (item) => {
    console.log("item.id", item.id);
  };
  const NewUsers = JSON.parse(localStorage.getItem("NewUsers"));
  const [Users,setUsers]=useState(NewUsers)
 console.log("UsersUsersUsers",Users);
  const { myValue, setNewImage } = useContext(MyContext);
  console.log("NewImage234234", item);
 const handleImage=(el)=>{
  setForm(4)
  setNewImage(el)
 }
  return (
    <Item onClick={() => savedImage(item)}>
      <div>
        <MapComponent centerMap={[item.Latitude, item.Longitude]} />
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr 1fr 1fr",gap:"8px"}}>
      {item.image.map((el)=>(
        <div onClick={()=>handleImage(el)}><img src={el} width="60px" height="60px"/></div>
      ))}</div>

      {/* <img src={NewImage} width="100px" /> */}
      <div>
        <span style={{ fontWeight: "bold" }}> آدرس : </span>
        {item.Address}
      </div>

      <div>
        <span style={{ fontWeight: "bold" }}> کد سفارش: </span>
        
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
        {/* <Button onClick={() => setShowImage(true)}>عکس های گرفته شده</Button> */}
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
