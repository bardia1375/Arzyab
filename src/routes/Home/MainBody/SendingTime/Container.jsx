import Card from "components/common/Card";
import { Overlay } from "components/common/Modal";
import { AddressCard, TitleCard } from "components/layout/TrafficModalTest2";
import React, { useEffect, useState } from "react";
import SendingTime from "./SendingTime";

export const SendingTimeWrapper = () => {
  const [showMap, setShowMap] = useState(false);
  const openTime = (el) => {
    setShowMap(1);
    getItem(el);
  };
  const [Address, setAddress] = useState(
    JSON.parse(localStorage.getItem("savedAddress"))
  );
  console.log("Address234234234", Address);
  const [getDay, setGetDay] = useState([]);
  const [getTime, setGetTime] = useState([]);
  const timeInformation=JSON.parse(localStorage.getItem("timeInformation"))
  const dateInformation=JSON.parse(localStorage.getItem("dateInformation"))
  useEffect(()=>{
    setGetDay(dateInformation?dateInformation:[])
  },[])
  useEffect(()=>{
    setGetTime(timeInformation?timeInformation:[])
  },[])

  const savedLatitude = localStorage.getItem("savedLatitude");
  const savedLongitude = localStorage.getItem("savedLongitude");
  const [getAddress,setGetAddress]=useState([])
  const getItem = (el) => {
    console.log("4564",el);
    setGetAddress(el)
  };
  console.log("getDaygetDay", getDay);
  // Save data to localStorage when it changes
  // useEffect(() => {
  //   localStorage.setItem("timeAndDateOrder", JSON.stringify(getDay));
  //   localStorage.setItem("timeAndDateOrder", JSON.stringify(getTime));
  //   localStorage.setItem("savedAddress", JSON.stringify(Address));
  // }, [getDay, getTime, Address]);
  return (
    <div
      style={{
        zIndex: 3,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: "50px 0 0 0",
      }}
    >
      <Card color={"#fff"}>
        {showMap == 1 && (
          <SendingTime
            setShowMap={setShowMap}
            setGetDay={setGetDay}
            setGetTime={setGetTime}
            getDay={getDay}
            getTime={getTime}
            getAddress={getAddress}
          />
        )}
        {showMap == 2 && (
          <div
            style={{
              overflowY: "scroll",
              overflowX: "hidden",
              height: "100%",
            }}
          >
            efveververve
          </div>
        )}

        {showMap == 0 && (
          <>
            <TitleCard>
              <div>آدرس جدید:</div>
              <div className="newAddress" onClick={openTime}>
                + آدرس جدید
              </div>
            </TitleCard>
            {Address?.map((el, index) => (
              <AddressCard onClick={() => openTime(el)}>
                <div>عنوان: {el?.addressTitle}</div>
                <div>{el?.Address}</div>
                <div>{el?.details}</div>
                <div>شماره تماس: {el?.phoneNumber}</div>
              </AddressCard>
            ))}
          </>
        )}
      </Card>
    </div>
  );
};
