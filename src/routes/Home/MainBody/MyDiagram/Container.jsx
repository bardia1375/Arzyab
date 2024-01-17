import DateNavHeader from "components/DateNavHeader/DateNavHeader";
import Card from "components/common/Card";
import moment from "moment-jalaali";
import React, { useContext, useEffect, useRef, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import MapComponent from "../Dashboard/MapComponent";
import { Button } from "components/common";
import imageData from "../../../../assets/images/header/user.png";
import DoneJob from "./DoneJob";
import DrawImage from "./DrawImage";
import OpenJob from "./OpenJob";
import MyContextProvider from "./context/MyContextProvider";
import MyContext from "./context/MyContext";
import LoadingSpinner from "components/common/publicTable/loading/LoadingSpinner";
import { TrafficModalTest } from "components/layout/TrafficModalTest";
import DetailJob from "./DetailJob";
export const MyDiagram = () => {
  // Data for the pie chart
  const today = new Date();
  const [ImageData, setImageData] = useState(imageData);
  const [showImage, setShowImage] = useState(false);
  console.log("");

  const [date, setDate] = useState(moment(today).format("jYYYY-jMM-jDD"));
  const clickPointsRef = useRef([]);
  const x = JSON.parse(localStorage.getItem("users"));
  const Users = x?.filter((res) => res?.Date == date)[0]?.persons;
  const navigate = useNavigate();
  moment.loadPersian({ dialect: "persian-modern" });
  const ref = useRef();

  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);

  const info = JSON.parse(localStorage.getItem("users"));

  const [trafficModal, setTrafficModal] = useState(true);
  const [loadingCheck, setLoadingCheck] = useState(false);
  const [locations, setLocations] = useState({});
  const [takeImage, setTakeImage] = useState("");
  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 5000);
  }, [takeImage]);

  const getDate = (date) => {
    console.log("date", date);
    setDate(date);
    localStorage.setItem("date", date);
  };
  const timeInformation = JSON.parse(localStorage.getItem("timeInformation"));
  const dateInformation = JSON.parse(localStorage.getItem("dateInformation"));
  console.log("timeInformation", timeInformation);
  console.log("dateInformation", dateInformation);
  const mergedArray = dateInformation?.map((dateInformationItem, index) => ({
    ...dateInformationItem,
    ...timeInformation[index],
  }));
  const [orderInformation, setOrderInformation] = useState([]);
  const [bardia, setBardia] = useState("");

  useEffect(() => {
    const information = JSON.parse(localStorage.getItem("users"));
    console.log("information", information);
    setOrderInformation(information);
  }, [bardia]);

  console.log("orderInformation", orderInformation);
  const [selected, setselected] = useState("درخواست‌های باز");
  const [form, setForm] = useState(0);
  const [isEraser, setIsEraser] = useState(false);

  const getSelectedTitle = (data) => {
    setselected(data);
  };

  // const [imageData, setImageData] = useState("");
  const canvasRef = useRef(null);
  const isDrawingRef = useRef(false);

  useEffect(() => {
    // Retrieve the image data from local storage
    const savedImage = localStorage.getItem("savedImage");
    console.log("savedImagesavedImage", savedImage);
    // Update the state with the retrieved image data
    if (savedImage) {
      setBardia(savedImage);
    }
  }, []); // Empty dependency array ensures this runs once on component mount

  return (
    <MyContextProvider>
      <div style={{ marginTop: "32px" }}>
        {
          <>
            {form == 0 ? (
              <>
                <DateNavHeader
                  getDate={getDate}
                  getSelectedTitle={getSelectedTitle}
                />
                <Card height="calc(100vh - 300px)">
                  <Items>
                    {orderInformation && selected === "درخواست‌های باز"
                      ? orderInformation.map((el, index) => {
                          return <OpenJob item={el} setForm={setForm} />;
                        })
                      : orderInformation.map((el, index) => {
                          return (
                            <DoneJob
                              orderInformation={orderInformation}
                              bardia={el.bardia}
                              item={el}
                              showImage={showImage}
                              setShowImage={setShowImage}
                              setForm={setForm}
                            />
                          );
                        })}
                  </Items>
                </Card>
              </>
            ) : form == 1 ? (
              <DetailJob setForm={setForm} />
            ) : form == 2 ? (
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  width: "100%",
                  alignItems: "flex-end",
                  justifyContent: "center",
                }}
              >
                {/* {returnModal && (
                <ReturnModal
                  type={"مرخصی"}
                  ReturnHandler={fetchReturnData}
                  items={returnModal}
                  onClose={setReturnModal}
                />
              )} */}{" "}
                {trafficModal && (
                  <TrafficModalTest
                    setTakeImage={setTakeImage}
                    setTrafficModal={setTrafficModal}
                    trafficModal={trafficModal}
                    loc={locations}
                    loader={setLoadingCheck}
                    setForm={setForm}
                  />
                )}
                {/* <Card height="calc(100vh - 250px)" margin="24px 0 0 0">
                <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
                  {true && (
                    <img
                      src={takeImage}
                      alt="Captured Preview"
                      style={{ width: "100%", marginTop: "10px" }}
                    />
                  )}
                  {loading ? (
                    <LoadingSpinner />
                  ) : (
                    <Card color="orange">
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          margin: "24px",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <div>عکس گرفته شده مطابقت دارد با:</div>
                        <div>کاربر: سید بردیا شمسی</div>
                        <div>با شماره پرسنلی: 440</div>
                      </div>
                    </Card>
                  )}
                </div>
              </Card> */}
              </div>
            ) : form == 3 ? (
              <DrawImage
                setBardia={setBardia}
                imageData={imageData}
                setOrderInformation={setOrderInformation}
                orderInformation={orderInformation}
                takeImage={takeImage}
              />
            ) : (
              <Card height="calc(100vh - 300px)"></Card>
            )}
          </>
        }
      </div>
    </MyContextProvider>
  );
};
export const Items = styled.div`
  border-radius: 8px;
  gap: 16px;
`;
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
