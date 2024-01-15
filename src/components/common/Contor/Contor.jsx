/* eslint-disable react-hooks/exhaustive-deps */
import moment from "moment-jalaali";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

let counter = 0;
function Contor({ selectedTitle, dataShow }) {
  const [selectedMode, setSelectedMode] = useState("کارکرد");
  // const start = 8;
  // const end = 11;
  // const [end, setEnd] = useState(9);
  // const [absentEnd, setAbsentEnd] = useState(9);
  // const date = new Date();
  // const [time, setTime] = useState(date.toLocaleTimeString());

  const getRange = (s, f, devider) => {
    let finisher;
    if (s > 12 && f < 12) {
      finisher = 24 * 30;
    } else {
      if (f < 12 && s > f) {
        finisher = (f + 12) * 30;
      } else {
        finisher = f * 30;
      }
    }
    let starter = s * 30;
    let x = [starter];
    let z = starter;
    for (let index = 0; index < (finisher - starter) / devider; index++) {
      x.push((z += devider));
    }
    return x;
  };
  // const absent = getRange(start, 9, 3);
  // const present = getRange(9 + 0.3, absentEnd, 1);
  // const totalRange = getRange(8, 5, 4);
  // useEffect(() => {
  //   setTimeout(() => setTime(date.toLocaleTimeString()), 1000);
  // }, [date.toLocaleTimeString()]);
  // moment.loadPersian({ dialect: "persian-modern" });
  // useEffect(() => {
  //   if (
  //     (time.length > 0 && parseInt(time.split(":")[0]) < 4) ||
  //     (parseInt(time.split(":") === 4) && parseInt(time.split(":")[1]) < 50) ||
  //     time.split(":")[2].includes("AM") ||
  //     (time.split(":")[2].includes("PM") && parseInt(time.split(":")[0]) === 12)
  //   ) {
  //     setEnd(
  //       parseInt(time.split(":")[0]) +
  //         converter(parseInt([time.split(":")[1]])) * 0.01
  //     );
  //     setAbsentEnd(
  //       parseInt(time.split(":")[0]) +
  //         converter(parseInt([time.split(":")[1]])) * 0.01
  //     );
  //   } else {
  //     setAbsentEnd(5);
  //     setEnd(null);
  //   }
  // }, [time]);

  // const mockData = [
  //   {
  //     start: 6,
  //     end: 8,
  //     mode: "اضافه کاری",
  //     color: "green",
  //     solid: false,
  //   },
  //   {
  //     start: 8,
  //     end: 10,
  //     mode: "کارکرد",
  //     color: "blue",
  //     solid: true,
  //   },
  //   {
  //     start: 10,
  //     end: 11,
  //     mode: "غیبت",
  //     color: "red",
  //     solid: false,
  //   },
  //   {
  //     start: 11,
  //     end: 14,
  //     mode: "مأموریت",
  //     color: "orange",
  //     solid: false,
  //   },
  //   {
  //     start: 14,
  //     end: 17,
  //     mode: "کارکرد",
  //     color: "blue",
  //     solid: true,
  //   },
  //   {
  //     start: 18,
  //     end: 20,
  //     mode: "اضافه کاری",
  //     color: "green",
  //     solid: false,
  //   },
  // ];

  // const totalHours = (list) => {
  //   let total = 0;
  //   list.map((item) => {
  //     total += changeTimeFormat(item.To) - changeTimeFormat(item.From);
  //   });
  //   return Math.abs(total);
  // };

  const changeModeHandler = (mode) => {
    setSelectedMode(mode);
  };

  const converter = (x) => {
    return (x * 100) / 60;
  };
  const changeTimeFormat = (time) => {
    return parseInt(time.split(":")[0]) + converter(time.split(":")[1]) / 100;
  };

  const autoChange = () => {
    setSelectedMode(dataShow.Countor.Items[counter].Item);
    if (counter === dataShow.Countor.Items.length - 1) {
      counter = 0;
      // if (
      //   dataShow.Countor.Items[counter].Item === dataShow.Countor.Items[0].Item
      // ) {
      //   counter = 1;
      // }
    } else {
      // if (
      //   dataShow.Countor.Items[counter].Item ===
      //   dataShow.Countor.Items[counter + 1].Item
      // ) {
      //   counter++;
      // }
      counter++;
    }
  };

  return (
    <ContorBody>
      {Array.from({ length: 12 }, (_, i) => i + 1).map((item) => (
        <Number key={item} degree={30 * item}>
          <div>{item}</div>
        </Number>
      ))}
      <InnerBody>
        {dataShow.Countor.Items.map((item) => {
          return getRange(
            changeTimeFormat(item.From),
            changeTimeFormat(item.To),
            item.Stype === "dash" ? 1 : 3
          ).map((range, index) => (
            <FillUp
              padding={180 < range && range < 540 ? 20 : 0}
              key={index}
              degree={range}
            >
              <div
                // id={item.mode}
                onClick={() => changeModeHandler(item.Item)}
                style={{
                  borderLeft: `${item.Stype === "dash" ? "5px" : "2px"} solid ${
                    item.Color
                  }`,
                  // backgroundImage:
                  //   "linear-gradient(180deg, #d7ebee, #e4f3f4)d",
                  // backdropFilter: "blur(5px)",
                  height: "15px",
                  padding: "1px",
                  zIndex: `${selectedMode === item.Item ? "5" : "1"}`,
                  position: "absolute",
                  top: `${180 <= range && range <= 540 ? 0 : "20px"}`,
                  scale: `${selectedMode === item.Item ? 1.2 : 1}`,
                  boxShadow: `${
                    selectedMode === item.Item
                      ? "2px 0px 6px #00000033"
                      : "none"
                  }`,
                }}
              ></div>
            </FillUp>
          ));
        })}

        {/* {end !== null && (
          #ff4d4d
          <>
            {present?.map((item, index) => (
              <FillUp key={index} degree={item}>
                <div
                  style={{
                    border: "2px solid #5a6163",
                    height: "15px",
                    boxShadow: "0px 4px 10px -1px rgba(0, 0, 0, 0.3)",
                  }}
                ></div>
              </FillUp>
            ))}
            <FillUp degree={present[present.length - 1] + 2}>
              <div
                style={{
                  borderLeft: "2px solid #183573",
                  height: "20px",
                  marginTop: "-2.7px",
                  marginLeft: "5px",
                }}
              />
            </FillUp>
          </>
        )} */}
        <TotalTime onClick={autoChange}>
          {dataShow.Countor.WorkHours.map((item) => {
            return getRange(
              changeTimeFormat(item.From),
              changeTimeFormat(item.To),
              item.Stype !== "dash" ? 1 : 3
            )?.map((range, index) => (
              <FillUp key={index} degree={range}>
                <div
                  style={{
                    borderLeft: `${
                      item.Stype === "dash" ? "2px" : "5px"
                    } solid ${item.Color}`,
                    position: "absolute",
                    top: `${180 <= range && range <= 540 ? 0 : "20px"}`,
                    height: "15px",
                  }}
                ></div>
              </FillUp>
            ));
          })}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <div
            //  style={{ color: "#ff4d4d" }}
            >
              {/* {totalHours(
                dataShow.Countor.Items.filter(
                  (item) => item.Item === selectedMode
                )
              )} */}
              {
                dataShow.Countor.Items.filter(
                  (item) => item.Item === selectedMode
                )[0].Value
              }
            </div>
            <div style={{ borderBottom: "1px solid #c8c8c8", width: "150%" }} />
            <div style={{ color: "#c8c8c8" }}>
              {
                dataShow.Countor.Items.filter(
                  (item) => item.Item === selectedMode
                )[0]?.Item
              }
            </div>
          </div>
        </TotalTime>
      </InnerBody>
    </ContorBody>
  );
}

export default Contor;

export const ContorBody = styled.div`
  width: 70vw;
  height: 70vw;
  max-width: 300px;
  max-height: 300px;
  background-color: #f4fbfd;
  border-radius: 50%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  -o-user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
`;

export const Number = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  text-align: center;
  color: #3bb5ba;
  font-size: 1rem;
  transform: rotate(var(--roation));
  --roation: ${({ degree }) => `${degree}deg`};
  & > div {
    transform: ${({ degree }) => `rotate(-${degree}deg)`};
  }
`;

export const InnerBody = styled.div`
  background-image: linear-gradient(180deg, #d7ebee, #e4f3f4);
  border-radius: 50%;
  width: 75%;
  height: 75%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const FillUp = styled.div`
  --roation: ${({ degree }) => `${degree}deg`};
  position: absolute;
  height: 100%;
  text-align: center;
  transform: rotate(var(--roation));
  color: #3bb5ba;
  font-size: 1rem;
  cursor: pointer;
  /* padding: ${({ padding }) => (padding ? `${padding}px` : 0)}; */
`;

export const TotalTime = styled.div`
  width: 70%;
  height: 70%;
  background-color: white;
  background-image: linear-gradient(to bottom, #e7e7e7, white 60.71%);
  border-radius: 50%;
  box-shadow: -1px 2px 5px -2px rgba(0, 0, 0, 0.3);
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
