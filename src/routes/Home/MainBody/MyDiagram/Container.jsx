import DateNavHeader from "components/DateNavHeader/DateNavHeader";
import Card from "components/common/Card";
import moment from "moment-jalaali";
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import MapComponent from "../Dashboard/MapComponent";

export const MyDiagram = () => {
  // Data for the pie chart
  const today = new Date();

  const [date, setDate] = useState(moment(today).format("jYYYY-jMM-jDD"));

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

  const getSelectedTitle = (data) => {
    setselected(data);
  };
  return (
    <div style={{ marginTop: "32px" }}>
      <DateNavHeader getDate={getDate} getSelectedTitle={getSelectedTitle} />

      <Card height="calc(100vh - 300px)">
        
        <Items>

          {mergedArray && selected === "درخواست‌های باز"
            ? mergedArray.map((el, index) => {
                return (
                  <Item>    
                   <div>   <MapComponent  centerMap={[el.Latitude,el.Longitude]}/></div>
                   <div>
                      <span style={{ fontWeight: "bold" }}> آدرس : </span>
                      {el.Address}
                    </div>                 

                    <div>
                      <span style={{ fontWeight: "bold" }}> کد سفارش: </span>
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

                  </Item>
                );
              })
            : orderInformation.map((el, index) => {
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
              })}
        </Items>
      </Card>
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
