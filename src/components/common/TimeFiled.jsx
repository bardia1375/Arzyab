/* eslint-disable react-hooks/exhaustive-deps */
import { FormBuilderStyle } from "assets/styles/layout";
import React, { useEffect, useRef, useState } from "react";
import orangeArrow from "assets/images/common/arrows/orange-right.svg";
import styled from "styled-components";
import TimeFiledIcon from "assets/images/item-actions/TimeFiledIcon.svg";
import TimeFiledIconBlue from "assets/images/item-actions/TimeFiledIconBlue.svg";

function TimeFiled({ open, setOpen, onChange, value }) {
  const ref = useRef();
  const [hour, setHour] = useState("0");
  const [minutes, setMinutes] = useState("0");

  useEffect(() => {
    const closeDropDown = (e) => {
      if (
        ref.current &&
        !ref.current.contains(e.target) &&
        setOpen !== undefined
      ) {
        setOpen(!open);
      }
    };
    document.body.addEventListener("click", closeDropDown);
    return () => document.body.removeEventListener("click", closeDropDown);
  }, [open]);

  useEffect(() => {
    if (!!value) {
      setHour(
        value.split(":")[0][0] === "0"
          ? value.split(":")[0][1]
          : value.split(":")[0]
      );
      setMinutes(
        value.split(":")[1][0] === "0"
          ? value.split(":")[1][1]
          : value.split(":")[1]
      );
    }
  }, [value]);

  const handleClick = () => {
    setOpen(!open);
  };
  const handleClickUp = (el, type) => {
    switch (type) {
      case "upHour":
        setHour((prev) => (+prev > 22 ? 0 : +prev + 1));
        break;
      case "downHour":
        setHour((prev) => (+prev < 1 ? 23 : +prev - 1));
        break;
      case "upMinutes":
        setMinutes((prev) => (+prev > 58 ? 0 : +prev + 1));
        break;
      case "downMinutes":
        setMinutes((prev) => (+prev < 1 ? 59 : +prev - 1));
        break;

      default:
        break;
    }
  };
  const handleChangeMinutes = (event) => {
    let max = 59;
    const value = Math.max(0, Math.min(max, Number(event.target.value)));
    setMinutes(value);
  };
  const handleChangeHours = (event) => {
    let max = 23;
    const value = Math.max(0, Math.min(max, Number(event.target.value)));
    setHour(value);
  };

  useEffect(() => {
    if (onChange !== undefined) {
      onChange(
        `${hour < 10 ? `0${hour}` : `${hour}`}:${
          minutes < 10 ? `0${minutes}` : `${minutes}`
        }`
      );
    }
  }, [hour, minutes]);

  return (
    <>
      <Label style={{ zIndex: `${open ? 3 : 0}` }} htmlFor={`select3`}>
        <img
          width={12}
          height={20}
          src={open ? TimeFiledIconBlue : TimeFiledIcon}
          alt="ColorPicker"
          // fill="darkgrey"
        />
      </Label>

      <Line
        style={{
          border: `1px solid ${open ? "#37ABBB" : "darkgrey"}`,
          zIndex: `${open ? 2 : 0}`,
        }}
      ></Line>
      <Main
        onClick={handleClick}
        style={{
          color: `${open ? "#37ABBB" : "black"}`,
          zIndex: `${open ? 2 : 0}`,
        }}
      >
        {/* {hour}:{minutes} */}
        {hour < 10 ? `0${hour}` : `${hour}`}:
        {minutes < 10 ? `0${minutes}` : `${minutes}`}
      </Main>

      {open ? (
        <FormBuilderStyle.Time open={open} ref={ref}>
          <div
            style={{
              border: "1px solid #37ABBB",
              borderRadius: "32px",
              padding: "0 4px",
            }}
          >
            <div
              onClick={(el) => handleClickUp(el, "upMinutes")}
              style={{ cursor: "pointer" }}
            >
              <img
                width={12}
                height={12}
                style={{ transform: "rotate(-90deg) " }}
                src={orangeArrow}
                alt="orange-right"
              />
            </div>
            <div
              style={{
                width: "100%",
                height: "2px",
                backgroundColor: "#37ABBB",
              }}
            ></div>
            <div
              onClick={(el) => handleClickUp(el, "downMinutes")}
              style={{ cursor: "pointer" }}
            >
              <img
                width={12}
                height={12}
                style={{ transform: "rotate(90deg) translateX(7px)" }}
                src={orangeArrow}
                alt="orange-right"
              />
            </div>
          </div>
          <span style={{ fontSize: "1.3rem" }}>
            {/* {minutes < 10 ? `0${minutes}` : `${minutes}`} */}
            <input
              value={minutes}
              onChange={(e) => handleChangeMinutes(e)}
              style={{ width: "28px", direction: "ltr" }}
            />
          </span>
          <span style={{ fontSize: "1.5rem", color: "#37ABBB" }}>:</span>
          <span style={{ fontSize: "1.3rem" }}>
            {/* {hour < 10 ? `0${hour}` : `${hour}`} */}

            <input
              value={hour}
              onChange={(e) => handleChangeHours(e)}
              style={{ width: "28px" }}
            />
          </span>

          <div
            style={{
              border: "1px solid #37ABBB",
              borderRadius: "32px",
              padding: "0 4px",
            }}
          >
            <div
              onClick={(el) => handleClickUp(el, "upHour")}
              style={{ cursor: "pointer" }}
            >
              <img
                width={12}
                height={12}
                style={{ transform: "rotate(-90deg) " }}
                src={orangeArrow}
                alt="orange-right"
              />
            </div>
            <div
              style={{
                width: "100%",
                height: "2px",
                backgroundColor: "#37ABBB",
              }}
            ></div>
            <div
              onClick={(el) => handleClickUp(el, "downHour")}
              style={{ cursor: "pointer" }}
            >
              <img
                width={12}
                height={12}
                style={{ transform: "rotate(90deg) translateX(7px)" }}
                src={orangeArrow}
                alt="orange-right"
              />
            </div>
          </div>
        </FormBuilderStyle.Time>
      ) : null}
    </>
  );
}

export default TimeFiled;

export const Label = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3;
  img {
    height: 100%;
    margin: 0 8px;
    position: absolute;
    right: -1px;
    top: -1px;
    cursor: pointer;
  }
`;

export const Line = styled.div`
  height: 18px;
  width: 1px;
  position: absolute;
  right: 26px;
  z-index: 2;
`;

export const Main = styled.div`
  width: 100%;
  direction: ltr;
  padding-left: 8px;
  /* z-index: 2; */
`;
