/* eslint-disable array-callback-return */
// Components
// import NewCalendarHeader from "./NewCalendarHeader";
// import NewCalendarBody from "./NewCalendarBody";
// Styled Elements
import {
  DayNameContainerDatePicker,
  DayNumberContainerDatepicker,
  MonthContainer,
  MonthName,
} from "assets/styles/layout/Calendar";
import { Typography } from "..";
import React, { useEffect, useState } from "react";
import Day from "./day";
import Calendar from "../classes/Calendar";
import moment from "moment-jalaali";
import styled from "styled-components";
import LeftArrow from "assets/images/common/arrows/white-left.svg";
import { Field } from "../Field";
import { useRef } from "react";
import { ModalPicker } from "../datePickerMobile/modalPicker";

const DatePicker = ({ value, label, placeHolder, onChange, error }) => {
  const [mode, setMode] = useState(false);
  const [monthMode, setMonthMode] = useState(false);
  const [yearMode, setYearMode] = useState(false);
  const [year, setYear] = useState(moment().format("jYYYY"));
  const [month, setMonth] = useState(moment().format("jM") - 1);
  const [selectedDay, setSelectedDay] = useState("");
  const [comingDate, setComingDate] = useState();
  const [input, setInput] = useState("");
  const ref = useRef();
  // let year = moment().format("jYYYY");
  // let month = moment().format("jM") - 1;
  useEffect(() => {
    if (onChange !== undefined) {
      onChange(selectedDay);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDay]);
  useEffect(() => {
    if (
      (value !== undefined && value !== null && value.includes("-")) ||
      value === ""
    ) {
      setSelectedDay(value);
    }
  }, [value]);
  const lastMonth = () => {
    if (month !== 0) {
      setMonth(month - 1);
    } else {
      setYear(parseInt(year) - 1);
      setMonth(11);
    }
  };
  const nextMonth = () => {
    if (month !== 11) {
      setMonth(month + 1);
    } else {
      setYear(parseInt(year) + 1);
      setMonth(0);
    }
  };
  const modeHandler = () => {
    if (mode) {
      setMode(false);
      setComingDate();
    } else {
      setMode(true);
    }
  };
  const todayHandler = () => {
    setComingDate(moment().format("jYYYY-jMM-jDD"));
    setYear(moment().format("jYYYY"));
    setMonth(moment().format("jM") - 1);
  };
  const yearChangeHandler = () => {
    if (yearMode) {
      setYearMode(false);
    } else {
      setInput(year);
      setMonthMode(false);
      setYearMode(true);
    }
  };
  const monthChangeHandler = () => {
    if (monthMode) {
      setMonthMode(false);
    } else {
      setInput(monthName);
      setYearMode(false);
      setMonthMode(true);
    }
  };
  const inputChangeHandler = (event) => {
    // const { value } = event?.target;
    setSelectedDay(event);
  };
  const inputDropDownHandler = (event) => {
    setMonthMode(false);
    setInput(event);
  };
  const inputYearHandler = (event) => {
    const { value } = event?.target;
    setInput(value);
  };
  const goToYear = () => {
    if (!isNaN(+input)) {
      setYear(input);
      setMode(true);
      setYearMode(false);
    } else {
      setYearMode(false);
    }
  };
  useEffect(() => {
    if (input.length > 0) {
      setMode(true);
    }
    switch (input) {
      case "فروردین":
        setMonth(0);
        break;
      case "اردیبهشت":
        setMonth(1);
        break;
      case "خرداد":
        setMonth(2);
        break;
      case "تیر":
        setMonth(3);
        break;
      case "مرداد":
        setMonth(4);
        break;
      case "شهریور":
        setMonth(5);
        break;
      case "مهر":
        setMonth(6);
        break;
      case "آبان":
        setMonth(7);
        break;
      case "آذر":
        setMonth(8);
        break;
      case "دی":
        setMonth(9);
        break;
      case "بهمن":
        setMonth(10);
        break;
      case "اسفند":
        setMonth(11);
        break;
      default:
        break;
    }
  }, [input]);
  // useEffect(() => {
  //   const closeDropDown = (e) => {
  //     if (mode && ref.current && !ref.current.contains(e.target)) {
  //       setMode(false);
  //       setYearMode(false);
  //       setMonthMode(false);
  //     }
  //   };
  //   document.body.addEventListener("click", closeDropDown);

  //   return () => document.body.removeEventListener("click", closeDropDown);
  // }, [mode]);

  const monthDetail = Calendar(year, month).getFirstLastDayOfMonth()[0];
  let numberOfDays = Calendar().makeMonthDays(monthDetail.endDay.date);
  let monthName = monthDetail.month;
  const startOfMonthDay = Calendar(year, month, 1).getDayNumber() + 1;

  return (
    <div style={{ position: "relative" }} ref={ref}>
      {mode && (
        <ModalPicker
          setMode={setMode}
          mode={mode}
          onChange={inputChangeHandler}
        />
      )}
      {!mode && (
        <Field
          onClick={modeHandler}
          placeholderTextAlign={"center"}
          value={selectedDay}
          placeHolder={placeHolder}
          name={"Day"}
          label={label}
          // color="darkGray"
          borderColor={error}
          type={"text"}
          autoComplete="off"
        />
      )}
    </div>
  );
};

export default DatePicker;

const TodayButton = styled.button`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 27px;
  padding: 2px 20px;
  color: white;
  border-radius: 10px;
  width: 155px;
  background: linear-gradient(90deg, #ff8080 0%, #ffd011 100%);
  :hover {
    background: linear-gradient(90deg, #fc2b2b 0%, #ffcd00 100%);
  }
`;

// const EraseButton = styled.button`
//   margin-top: 10px;
//   cursor: pointer;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   height: 27px;
//   padding: 2px 20px;
//   color: white;
//   border-radius: 10px;
//   width: 155px;
//   background: linear-gradient(90deg, grey 0%, #666666 100%);
//   :hover {
//     background: linear-gradient(90deg, grey 0%, #797979 100%);
//   }
// `;

const HeaderTitle = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  align-content: center;
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  align-content: center;
  width: 100%;
  padding: 0 10px;
  cursor: auto;
`;

const YearInputBody = styled.div`
  display: ${({ yearMode }) => (!yearMode ? "none" : "flex")};
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  align-content: center;
  width: 100%;
  padding: 10px 10px;
  background: linear-gradient(262deg, #ababab 0%, #676767 100%);
  top: 40px;
  z-index: -1;
  position: absolute;
  white-space: nowrap;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
  & > button {
    cursor: pointer;
  }
`;

const MonthInputBody = styled.div`
  display: ${({ monthMode }) => (!monthMode ? "none" : "flex")};

  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  align-content: center;
  width: 100%;
  padding: 10px 10px;
  background: linear-gradient(262deg, #ababab 0%, #676767 100%);
  top: 40px;
  z-index: -1;
  position: absolute;
  white-space: nowrap;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
  & > button {
    cursor: pointer;
  }
`;
