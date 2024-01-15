/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import styled from "styled-components";

let counter = 0;
function Contor24({ selectedTitle, dataShow }) {
  const [selectedMode, setSelectedMode] = useState({ item: "", from: "" });
  useEffect(() => {
    let countChecker = 0;
    dataShow?.countor.items.map((item, index) => {
      if (item.item === "کارکرد") {
        countChecker = index;
      }
    });
    if (countChecker === 0) {
      setSelectedMode({
        item: dataShow?.countor.items[0]?.item,
        from: dataShow?.countor.items[0]?.from,
      });
    } else {
      setSelectedMode({
        item: dataShow?.countor.items[countChecker]?.item,
        from: dataShow?.countor.items[countChecker]?.from,
      });
    }
  }, [dataShow]);

  const getRange = (s, f, devider) => {
    let finisher;
    if (s > 12 && f < 12) {
      finisher = 24 * 15;
    } else {
      if (f < 12 && s > f) {
        finisher = (f + 12) * 15;
      } else {
        finisher = f * 15;
      }
    }
    let starter = s * 15 + 3;
    let x = [starter];
    let z = starter;
    for (let index = 0; index < (finisher - starter) / devider; index++) {
      x.push((z += devider));
    }
    return x;
  };

  const changeModeHandler = (mode, from) => {
    setSelectedMode({ item: mode, from: from });
  };

  const converter = (x) => {
    return (x * 100) / 60;
  };

  // Check for counter to be in correct position
  useEffect(() => {
    if (counter > dataShow?.countor.items.length - 1) {
      counter = 0;
    }
  }, [dataShow]);

  const autoChange = () => {
    if (
      selectedMode.item === dataShow?.countor.items[counter]?.item &&
      selectedMode.from === dataShow?.countor.items[counter]?.from
    ) {
      if (counter === dataShow?.countor.items.length - 1) {
        counter = 0;
      } else {
        counter++;
      }
    }
    setSelectedMode({
      item: dataShow?.countor.items[counter]?.item,
      from: dataShow?.countor.items[counter]?.from,
    });
    if (counter === dataShow?.countor.items.length - 1) {
      counter = 0;
    } else {
      counter++;
    }
  };
  const [minutes, setMinutes] = useState(0);
  const [hover, setHover] = useState(0);

  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     setMinutes((prev) => prev + 1);

  //     if (minutes === 59) {
  //       setMinutes(0);
  //       setHover((prev) => prev + 1);
  //     }

  //     if (hover === 23) {
  //       setHover(0);
  //     }
  //   }, 1000);

  //   // Cleanup the interval on component unmount
  //   return () => clearInterval(intervalId);
  // }, [minutes, hover]);

  return (
    <ContorBody>
      <TotalTime
        onClick={dataShow?.countor.items.length === 0 ? null : autoChange}
      >
        {dataShow?.countor.items.length === 0 || !dataShow ? (
          <div style={{ textAlign: "center", color: "grey" }}>
            <div> تایمر خاموش است!</div>
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              textAlign: "center",
              // width: "100%",
            }}
          >
            <div>{<div>{`${hover}:${minutes}`}</div>}</div>
            <div
              style={{
                borderBottom: "1px solid #c8c8c8",
                width: "100%",
                // maxWidth: "100%",
              }}
            />
            <Tooltip style={{ color: "#c8c8c8" }}>تایمر</Tooltip>
          </div>
        )}
      </TotalTime>
    </ContorBody>
  );
}

export default Contor24;

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
  width: 82%;
  height: 82%;
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
  cursor: ${({ cursor }) => (cursor === "off" ? "auto" : "pointer")};
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

export const Tooltip = styled.div`
  position: relative;
  display: inline-block;
  & > span {
    width: 120px;
    background-color: grey;
    color: #fff;
    text-align: center;
    padding: 5px 0;
    border-radius: 6px;
    position: absolute;
    z-index: 1;
    top: 100%;
    left: 50%;
    margin-left: -60px;
    opacity: 0;
    transition: opacity 1s;
  }
  &:hover > span {
    opacity: 1;
  }
`;
export const TooltipText = styled.span``;
