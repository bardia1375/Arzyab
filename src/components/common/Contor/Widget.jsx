/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";

function Widget({ dataShow, selectedReport }) {
  let notWorked;
  const [volume, setVolume] = useState({
    total: 0,
    item1: 0,
    item2: 0,
    color1: "fff",
    color2: "fff",
  });
  // const convertToSeconds = (time) => {
  //   const arr = time.split(":");
  //   let x = 0;
  //   arr.map((item, index) => (x += item * (3600 / 60 ** index)));
  //   return x;
  // };

  function toDateTime(totalSeconds) {
    const totalMinutes = Math.floor(totalSeconds / 60);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${(hours + "").length === 1 ? `0${hours}` : hours}:${
      (minutes + "").length === 1 ? `0${minutes}` : minutes
    }`;
  }

  //   const total = toDateTime(dataShow.Total );
  //   const worked = toDateTime(
  //     dataShow?.info?.filter((item) => item.Title === "کارکرد")[0].Total
  //   );
  //   const leave = toDateTime(
  //     dataShow?.info?.filter((item) => item.Title === "مرخصی")[0].Total
  //   );
  //   const combiner = () => {
  //     let total = 0;
  //     dataShow.info.map((item) => (total += item.Total));
  //     return total;
  //   };

  useEffect(() => {
    if (!!dataShow) {
      setVolume({
        total: dataShow?.total,
        item1: dataShow?.item1,
        item2: dataShow?.item2,
        color1: dataShow?.color1,
        color2: dataShow?.color2,
      });
    } else {
      setVolume({
        total: 0,
        item1: 0,
        item2: 0,
        color1: "fff",
        color2: "fff",
      });
    }
  }, [dataShow]);

  if (volume.item1 === 0 && volume.item2 === 0 && volume.total === 0) {
    notWorked = 0;
  } else {
    notWorked = volume.total - (volume.item1 + volume.item2);
  }

  return (
    <WidgetBody
      style={{ opacity: `${selectedReport === "مأموریت‌ها" ? 0.5 : 1}` }}
    >
      <HeaderWidget>
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
          }}
        >
          <div
            style={{
              border: "1px solid #e4e4e4",
              borderBottom: "none",
              borderTopLeftRadius: "1.5vh",
              borderTopRightRadius: "1.5vh",
              width: "100%",
              height: "50%",
            }}
          />
        </div>
      </HeaderWidget>
      {notWorked !== 0 ? (
        <UpperWidget
          height={notWorked === 0 ? 0 : (notWorked / volume.total) * 100}
          borderBottomRadius={volume.item1 === 0 && volume.item2 === 0}
        >
          {toDateTime(notWorked)}
        </UpperWidget>
      ) : null}
      {volume.total !== 0 && (volume.item1 !== 0 || volume.item2 !== 0) ? (
        <LowerWidget
          height={
            volume.total === 0
              ? 0
              : ((volume.item1 + volume.item2) / volume.total) * 100
          }
        >
          {volume.item1 !== 0 ? (
            <UpperWidgetItems
              borderBottomRadius={volume.item2 === 0}
              borderTopRadius={notWorked === 0}
              height={
                volume.item1 + volume.item2 === 0
                  ? 0
                  : (volume.item1 / (volume.item1 + volume.item2)) * 100
              }
              bgColor={volume.color1}
            >
              {toDateTime(volume.item1)}
            </UpperWidgetItems>
          ) : null}
          {volume.item2 !== 0 ? (
            <LowerWidgetItems
              height={
                volume.item1 + volume.item2 === 0
                  ? 0
                  : (volume.item2 / (volume.item1 + volume.item2)) * 100
              }
              bgColor={volume.color2}
            >
              {toDateTime(volume.item2)}
            </LowerWidgetItems>
          ) : null}
        </LowerWidget>
      ) : null}
    </WidgetBody>
  );
}

export default Widget;

export const WidgetBody = styled.div`
  width: 22vw;
  height: 55vw;
  background-color: #f6f6f6;
  border: 1px solid #e4e4e4;
  border-radius: 4vh;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 10px;
  padding: 8px;
  margin: 5vh;
  z-index: 1;
  font-size: 3vw;
  @media (min-width: 500px) {
    font-size: 16px;
    width: 110px;
    height: 275px;
  }
`;

export const HeaderWidget = styled.div`
  width: 7vw;
  height: 7vw;
  background-color: #f6f6f6;
  border-radius: 1.5vh;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  top: 0;
  z-index: 0;
  @media (min-width: 500px) {
    width: 35px;
    height: 35px;
  }
`;

export const UpperWidget = styled.div`
  width: 100%;
  height: ${({ height }) => `${height}%`};
  min-height: 15px;
  border-top-left-radius: 3vh;
  border-top-right-radius: 3vh;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  z-index: 1;
  background-color: #bbbbbb;
  border-bottom-left-radius: ${({ borderBottomRadius }) =>
    borderBottomRadius && "3vh"};
  border-bottom-right-radius: ${({ borderBottomRadius }) =>
    borderBottomRadius && "3vh"};
`;

export const LowerWidget = styled.div`
  width: 100%;
  height: ${({ height }) => `${height}%`};
  border-bottom-left-radius: 3vh;
  border-bottom-right-radius: 3vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  z-index: 1;
`;

export const UpperWidgetItems = styled.div`
  width: 100%;
  height: ${({ height }) => `${height}%`};
  min-height: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  z-index: 1;
  background-color: ${({ bgColor }) => bgColor};
  border-bottom-left-radius: ${({ borderBottomRadius }) =>
    borderBottomRadius && "3vh"};
  border-bottom-right-radius: ${({ borderBottomRadius }) =>
    borderBottomRadius && "3vh"};
  border-top-left-radius: ${({ borderTopRadius }) => borderTopRadius && "3vh"};
  border-top-right-radius: ${({ borderTopRadius }) => borderTopRadius && "3vh"};
`;

export const LowerWidgetItems = styled.div`
  width: 100%;
  height: ${({ height }) => `${height}%`};
  min-height: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  z-index: 1;
  background-color: ${({ bgColor }) => bgColor};
  border-bottom-left-radius: 3vh;
  border-bottom-right-radius: 3vh;
`;
