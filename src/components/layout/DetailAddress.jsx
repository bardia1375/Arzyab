import React, { useReducer, useState } from "react";
import { TitleCard } from "./TrafficModalTest2";
import MapComponent from "routes/Home/MainBody/Dashboard/MapComponent";
import { Field } from "components/common/Field";
import { Button } from "components/common";
import Card from "components/common/Card";
import { ConfigureButton } from "assets/styles/layout/Calendar";
import { useEffect } from "react";
const initialValue = {
  Location: [],
  Address: "",
  details: "",
  addressTitle: "",
  phoneNumber: "",
};
const reducerMethod = (state, action) => {
  console.log("state", state);
  console.log("action", action.payload);
  switch (action.type) {
    case "AddAddress":
      return {
        ...state,
        Address: action.payload.address,
      };
    case "AddDetails":
      return {
        ...state,
        details: action.payload.details,
      };
    case "AddAddressTitle":
      return {
        ...state,
        addressTitle: action.payload.addressTitle,
      };
    case "AddPhoneNumber":
      return {
        ...state,
        phoneNumber: action.payload.phoneNumber,
      };
    case "Location":
      return {
        ...state,
        Location: action.payload.Location,
      };
    default:
      return state;
  }
};
function DetailAddress({
  setShowMap,
  setAddress,
  Address,
  showMap,
  getAddress,
  MapPositions,
  setMapPositions,
  setArraysOfMap
}) {
  const savedLatitude = localStorage.getItem("savedLatitude");
  const savedLongitude = localStorage.getItem("savedLongitude");
  console.log("savedLatitude1", savedLatitude, savedLongitude);

  useEffect(() => {
    console.log("savedLatitude2", savedLatitude, savedLongitude);
  }, [savedLatitude, savedLongitude]);
  const [detail, setDetail] = useState([]);

  const [state, dispatch] = useReducer(reducerMethod, initialValue);
  const [loading, setLoading] = useState(false);
  // useEffect to log MapPositions after it has been updated
  const mapPosition = JSON.parse(
    localStorage.getItem("positionDraggableMarker")
  );
  // useEffect(()=>{
  //   localStorage.setItem(
  //     "savedAddress",
  //  JSON.stringify(Address))
  // console.log("AddressAddress",Address);
  // },[loading])

  const onSubmit = () => {
    console.log("initialValue", state);
    console.log("mapPositionmapPositionmapPosition123", MapPositions);
    // setMapPositions((prev) => [...prev, mapPosition]);
    setArraysOfMap((prev) => [...prev, mapPosition]);
    // Save the state object to localStorage as a JSON string
    const stateObj = {
      Address: state.Address,
      details: state.details,
      addressTitle: state.addressTitle,
      phoneNumber: state.phoneNumber,
      Latitude:savedLatitude,
      Longitude:savedLongitude
    };
    setLoading(true);
    // setAddress((prev) => [...prev, stateObj]);
    getAddress(stateObj);
    //   localStorage.setItem(
    //     "savedAddress",
    //  JSON.stringify(Address))
    console.log("AddressAddress", Address);

    // localStorage.setItem("savedAddress", JSON.stringify(stateObj));
    setShowMap(0);
    console.log("State object saved to localStorage:", stateObj);
  };

  useEffect(() => {
    dispatch({
      type: "Location",
      payload: { Location: [savedLatitude, savedLongitude] },
    });
  }, [savedLatitude, savedLongitude]);
  console.log("MapPositionsMapPositionsMapPositions", MapPositions);

  useEffect(() => {
    console.log("MapPositionsMapPositionsMapPositions", MapPositions);
  }, [mapPosition[0]]);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        // height: "100%",
        overflowX: "hidden",
        overflowY: "scroll",
      }}
    >
      <div
        style={{
          width: "100%",
          position: "relative",
          borderRadius: "16px",
          overflow: "hidden",
        }}
      >
        <MapComponent
          MapPositions={MapPositions}
          setMapPositions={setMapPositions}
          Search={false}
          setShowMap={setShowMap}
          detail={detail}
          savedLongitude={savedLongitude}
          savedLatitude={savedLatitude}
        />
        <Button
          radius="0"
          display="flex"
          style={{
            position: "absolute",
            bottom: "0",
            right: 0,
            left: 0,
            zIndex: "1000000",
          }}
          onClick={() => setShowMap(1)}
        >
          ویرایش لوکیشن
        </Button>
      </div>
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          marginBottom: "32px",
        }}
      >
        <Field
          onChange={(e) =>
            dispatch({
              type: "AddAddress",
              payload: { address: e.target.value },
            })
          }
          value={state.Address}
          noMargin
          type={"text"}
          label={"نشانی"}
          width={"100%"}
        ></Field>
        <Field
          noMargin
          value={state.details}
          type={"text"}
          label={"جزییات "}
          onChange={(e) =>
            dispatch({
              type: "AddDetails",
              payload: { details: e.target.value },
            })
          }
          placeHolder={"مثال: پلاک۳ -واحد۴"}
        ></Field>
        <Field
          noMargin
          type={"text"}
          value={state.addressTitle}
          label={"عنوان آدرس"}
          onChange={(e) =>
            dispatch({
              type: "AddAddressTitle",
              payload: { addressTitle: e.target.value },
            })
          }
          placeHolder={"مثال: خانه"}
        ></Field>
        <Field
          onChange={(e) =>
            dispatch({
              type: "AddPhoneNumber",
              payload: { phoneNumber: e.target.value },
            })
          }
          noMargin
          type={"text"}
          value={state.phoneNumber}
          label={"شماره تماس (اختیاری)"}
        ></Field>
      </div>
      <div style={{ width: "100%", position: "absolute", bottom: 0 }}>
        <Button
          width="100%"
          padding="4px 0"
          display="flex"
          radius="8px"
          onClick={onSubmit}
        >
          تایید و ساخت آدرس
        </Button>
      </div>
    </div>
  );
}

export default DetailAddress;
