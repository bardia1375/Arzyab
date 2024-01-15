import DateNavHeader from "components/DateNavHeader/DateNavHeader";
import Card from "components/common/Card";
import moment from "moment-jalaali";
import React, { useEffect, useRef, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import MapComponent from "../Dashboard/MapComponent";
import { Button } from "components/common";
import imageData from "../../../../assets/images/header/user.png";
export const MyDiagram = () => {
  // Data for the pie chart
  const today = new Date();
  const [ImageData, setImageData] = useState(imageData);
  console.log("");
  const [date, setDate] = useState(moment(today).format("jYYYY-jMM-jDD"));
  const clickPointsRef = useRef([]);

  const x = JSON.parse(localStorage.getItem("users"));
  const Users = x?.filter((res) => res?.Date == date)[0]?.persons;
  const Attendance = Users.map((el) => el.Attendance);
  console.log("infoinfo", Attendance);
  const navigate = useNavigate();
  let leave = 0;
  let presence = 0;
  let mission = 0;
  let absence = 0;
  for (let index = 0; index < Attendance.length; index++) {
    if (Attendance[index] === "مرخصی") {
      leave++;
      continue;
    }
    if (Attendance[index] === "حضور") {
      presence++;
      continue;
    }
    if (Attendance[index] === "ماموریت") {
      mission++;
      continue;
    }
    if (Attendance[index] === "غیبت") {
      absence++;
      continue;
    }
  }

  const chartData = {
    // series: [leave, presence, mission, absence],
    series: [absence, presence, leave, mission],
    options: {
      chart: {
        type: "donut",
        events: {
          dataPointSelection: (event, chartContext, config) => {
            const clickedSeriesValue =
              chartData.options.labels[config.dataPointIndex];
            console.log(`Clicked series value: ${clickedSeriesValue}`);
            if (clickedSeriesValue == "مرخصی") {
              navigate("/diagram/leave", {
                state: { Title: "مرخصی", date: date },
              });
            } else if (clickedSeriesValue == "ماموریت") {
              navigate("/diagram/mission", {
                state: { Title: "ماموریت", date: date },
              });
            } else if (clickedSeriesValue == "حضور") {
              navigate("/diagram/present", {
                state: { Title: "حضور", date: date },
              });
            } else if (clickedSeriesValue == "غیبت") {
              navigate("/diagram/absence", {
                state: { Title: "غیبت", date: date },
              });
            }
          },
        },
        style: {
          fontFamily: "Yekan Bach", // Specify your font family
        },
      },
      plotOptions: {
        pie: {
          donut: {
            size: "55%",
          },
          dataLabels: {
            formatter: function (val) {
              return val + " نفر"; // Add ' نفر' to the label
            },
          },
          style: {
            fontFamily: "Yekan Bach", // Specify your font family
          },
        },
      },

      labels: ["غیبت", "حضور", "مرخصی", "ماموریت"],
      dataLabels: {
        enabled: true,
        formatter: function (val, opts) {
          console.log("opts.w.config", opts.w.config.series[opts.seriesIndex]);
          return (
            opts.w.config.labels[opts.seriesIndex] +
            ": " +
            `${opts.w.config.series[opts.seriesIndex]} نفر`
          );
        },
        style: {
          fontFamily: "Yekan Bach", // Specify your font family
        },
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  };
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
  const orderInformation = [
    {
      id: 1,
      day: "چهارشنبه",
      date: "4 بهمن",
      bg: "#fff",
      text: "ساعت 12 تا 15",
    },
    {
      id: 1,
      day: "سه‌شنبه",
      date: "3 بهمن",
      bg: "#fff",
      text: "ساعت 12 تا 15",
    },
  ];

  console.log("orderInformation", orderInformation);
  const [selected, setselected] = useState("جاری");
  const [form, setForm] = useState(0);
  const [isEraser, setIsEraser] = useState(false);

  const getSelectedTitle = (data) => {
    setselected(data);
  };

  // const [imageData, setImageData] = useState("");
  const canvasRef = useRef(null);
  const isDrawingRef = useRef(false);
  const [bardia, setBardia] = useState([]);
  useEffect(() => {
    // Retrieve the image data from local storage
    const savedImage = localStorage.getItem("savedImage");
    console.log("savedImagesavedImage", savedImage);
    // Update the state with the retrieved image data
    if (savedImage) {
      setBardia(savedImage);
    }

    // Draw on the canvas
    drawOnCanvas(savedImage);
  }, []); // Empty dependency array ensures this runs once on component mount

  const drawOnCanvas = (imageSrc) => {
    const canvas = canvasRef.current;

    if (!canvas) {
      console.error("Canvas element not found.");
      return;
    }

    const ctx = canvas.getContext("2d");

    const img = new Image();
    img.src = ImageData;

    img.onload = () => {
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };
  };

  const handleMouseDown = (event) => {
    isDrawingRef.current = true;
    const canvas = canvasRef.current;

    if (!canvas) {
      console.error("Canvas element not found.");
      return;
    }

    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const handleMouseMove = (event) => {
    if (!isDrawingRef.current) return;

    const canvas = canvasRef.current;

    if (!canvas) {
      console.error("Canvas element not found.");
      return;
    }

    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    if (isEraser) {
      // Erase pixels by clearing a rectangle
      ctx.clearRect(x - 5, y - 5, 10, 10);
    } else {
      // Draw with the selected color
      ctx.lineTo(x, y);
      ctx.strokeStyle = "red";
      ctx.lineWidth = 2;
      ctx.stroke();
    }
  };

  const handleMouseUp = () => {
    isDrawingRef.current = false;
  };
  const toggleEraser = () => {
    setIsEraser((prevIsEraser) => !prevIsEraser);
  };
  const saveToLocalStorage = () => {
    const canvas = canvasRef.current;

    if (!canvas) {
      console.error("Canvas element not found.");
      return;
    }

    const imageDataUrl = canvas.toDataURL();
    localStorage.setItem("savedImage", imageDataUrl);
    setImageData(imageDataUrl);
  };
  return (
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
                  {mergedArray && selected === "درخواست‌های باز" ? (
                    mergedArray.map((el, index) => {
                      return (
                        <Item>
                          <div>
                            <MapComponent
                              centerMap={[el.Latitude, el.Longitude]}
                            />
                          </div>
                          <div>
                            <span style={{ fontWeight: "bold" }}> آدرس : </span>
                            {el.Address}
                          </div>

                          <div>
                            <span style={{ fontWeight: "bold" }}>
                              {" "}
                              کد سفارش:{" "}
                            </span>
                            14502
                          </div>
                          <div>
                            <span style={{ fontWeight: "bold" }}> تاریخ: </span>{" "}
                            {el.date} 1402
                          </div>
                          <div>
                            <span style={{ fontWeight: "bold" }}> زمان: </span>
                            {`${el.day} ${el.text}`}
                          </div>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <Button onClick={(el) => setForm(1)}>شروع</Button>
                            <Button>مسیریابی</Button>
                          </div>
                        </Item>
                      );
                    })
                  ) : form == 1 ? (
                    orderInformation.map((el, index) => {
                      return (
                        <Item>
                          <div>کد سفارش: 11273</div>
                          <div>{el.date} 1402</div>

                          <div>
                            {`
                  زمان: ${el.day}  ${el.text}
                `}
                          </div>
                        </Item>
                      );
                    })
                  ) : form == 2 ? (
                    <div>asdas</div>
                  ) : (
                    <div>sdfsd</div>
                  )}
                </Items>
              </Card>
            </>
          ) : form == 1 ? (
            <Card height="calc(100vh - 300px)">
              <MapComponent height="calc(100vh - 400px)" />
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
          ) : form == 2 ? (
            <Card height="calc(100vh - 300px)">
              <div>
                <div>
                  <button onClick={toggleEraser}>
                    {isEraser ? "Disable Eraser" : "Enable Eraser"}
                  </button>
                  <button onClick={saveToLocalStorage}>
                    Save to Local Storage
                  </button>
                </div>
                {true ? (
                  <div>
                    <canvas
                      ref={canvasRef}
                      width="400"
                      height="400"
                      style={{ border: "1px solid black" }}
                      onMouseDown={handleMouseDown}
                      onMouseMove={handleMouseMove}
                      onMouseUp={handleMouseUp}
                      onMouseOut={handleMouseUp}
                    />

                    {/* <img src={bardia} width="240px" alt="Saved Image" /> */}
                  </div>
                ) : (
                  <p>No image available</p>
                )}
              </div>
            </Card>
          ) : (
            <Card height="calc(100vh - 300px)">asdas</Card>
          )}
        </>
      }
    </div>
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
