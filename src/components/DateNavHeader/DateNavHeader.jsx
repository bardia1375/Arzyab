import React, { useState } from "react";
import { Dashboard } from "assets/styles/home/dashboard";
import PrimaryArrow from "assets/images/common/arrows/primary-down-bold.svg";
import moment from "moment-jalaali";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ModalPicker } from "components/common/datePickerMobile/modalPicker";
import Calendar from "components/common/classes/Calendar";

// Header title for decreasing size of bundle
let dayLimit = 60;
let monthLimit = 12;
const DateNavHeader = ({ getDate, getSelectedTitle }) => {
  // States && Hooks
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { Token } = useSelector((state) => state.auth);
  const { day, month, clocking, leaves, assignments, loading } = useSelector(
    (state) => state.dashboard
  );
  const today = new Date();
  const [selectedTitle, setSelectedTitle] = useState("درخواست‌های باز");
  const [collapse, setCollapse] = useState(false);
  const [datePicker, setDatePicker] = useState(false);
  const [dayShow, setDayShow] = useState(null);
  const [monthShow, setMonthShow] = useState(null);
  const [date, setDate] = useState(moment(today).format("jYYYY-jMM-jDD"));
  // Decrease date of time frame for monthly or daily
  const decreaseDate = () => {
    let changeableDate = date.split("-");
    let year = parseInt(changeableDate[0]);
    let month = parseInt(changeableDate[1]);
    let day = parseInt(changeableDate[2]);
    if (day - 1 !== 0 && !!day) {
      setDayShow(null);
      setMonthShow(null);
      setDate(
        `${year}-${month < 10 ? `0${month}` : month}-${
          day - 1 < 10 ? `0${day - 1}` : day - 1
        }`
      );
      dayLimit -= 1;
    } else if (month - 1 !== 0) {
      setDayShow(null);
      setMonthShow(null);
      setDate(
        `${year}-${month - 1 < 10 ? `0${month - 1}` : month - 1}${
          !!day
            ? `-${
                Calendar(year, month - 2).getFirstLastDayOfMonth()[0].endDay
                  .date
              }`
            : ""
        }`
      );
      !!day ? (dayLimit -= 1) : (monthLimit -= 1);
    } else {
      setDayShow(null);
      setMonthShow(null);
      setDate(`${year - 1}-${12}${!!day ? `-${29}` : ""}`);
      !!day ? (dayLimit -= 1) : (monthLimit -= 1);
    }
  };

  // Increase date of time frame for monthly or daily
  const increaseDate = () => {
    let changeableDate = date.split("-");
    let year = parseInt(changeableDate[0]);
    let month = parseInt(changeableDate[1]);
    let day = parseInt(changeableDate[2]);
    if (
      day + 1 <=
        Calendar(year, month - 1).getFirstLastDayOfMonth()[0].endDay.date &&
      !!day
    ) {
      setDayShow(null);
      setMonthShow(null);
      setDate(
        `${year}-${month < 10 ? `0${month}` : month}-${
          day + 1 < 10 ? `0${day + 1}` : day + 1
        }`
      );
      dayLimit += 1;
    } else if (month + 1 <= 12) {
      setDayShow(null);
      setMonthShow(null);
      setDate(
        `${year}-${month + 1 < 10 ? `0${month + 1}` : month + 1}${
          !!day ? `-01` : ""
        }`
      );
      !!day ? (dayLimit += 1) : (monthLimit += 1);
    } else {
      setDayShow(null);
      setMonthShow(null);
      setDate(`${year + 1}-01${!!day ? `-01` : ""}`);
      !!day ? (dayLimit += 1) : (monthLimit += 1);
    }
  };

  // Header title for decreasing size of bundle
  const HeaderTitle = () => {
    // return ["امروز", "این ماه"].map((item, index) => (
    return ["درخواست‌های باز", "درخواست‌های انجام شده"].map((item, index) => (
      <Dashboard.TitleStyle
        key={index}
        style={{ cursor: "pointer" }}
        onClick={() => {
          if (selectedTitle !== item) {
            localStorage.setItem("selectedTitle", item);
            getSelectedTitle(item);
            setDayShow(null);
            setMonthShow(null);
            setSelectedTitle(item);
            collapse && openCollapse();
            setDate(
              moment(today).format(
                item === "امروز" ? "jYYYY-jMM-jDD" : "jYYYY-jMM"
              )
            );
            dayLimit = 60;
            monthLimit = 12;
          }
        }}
        selected={selectedTitle === item}
      >
        {item === "درخواست‌های باز" ? "درخواست‌های باز" : "درخواست‌های انجام شده"}
      </Dashboard.TitleStyle>
    ));
  };
  function openCollapse() {
    setCollapse(!collapse);
    var growDiv = document.getElementById("grow");
    if (growDiv.clientHeight) {
      growDiv.style.height = 0;
    } else {
      var wrapper = document.querySelector(".measuringWrapper");
      growDiv.style.height = wrapper.clientHeight + "px";
    }
  }
  const changeDate = (date) => {
    if (!!date) {
      getDate(date);
    }
    if (date.split("-").length === 3) {
      return () => setDatePicker(true);
    } else {
      return null;
    }
  };

  return (
    <>
      {datePicker && (
        <ModalPicker
          setMode={setDatePicker}
          mode={datePicker}
          onChange={setDate}
          dateController={setDayShow}
        />
        // <DatePicker  onChange={setDate} setModalType={setDatePicker} />
      )}
      <Dashboard.DashboardHeader>
        <HeaderTitle
          selectedTitle={selectedTitle}
          setDayShow={setDayShow}
          setMonthShow={setMonthShow}
          setDate={setDate}
          today={today}
          dayLimit={dayLimit}
          monthLimit={monthLimit}
        />
      </Dashboard.DashboardHeader>
      {/* <Dashboard.DashboardHeader>
        <img
          onClick={dayLimit !== 0 && monthLimit !== 0 ? decreaseDate : null}
          style={{
            rotate: "-90deg",
            cursor: "pointer",
            padding: "5px",
            opacity: `${dayLimit !== 0 && monthLimit !== 0 ? 1 : 0.5}`,
          }}
          src={PrimaryArrow}
          alt=""
        />
        <Dashboard.TitleStyle onClick={changeDate(date)}>
          {date.split("-").length === 3
            ? `${date.split("-")[2]} ${moment(date, "jYYYY-jMM-jDD").format(
                "jMMMM"
              )} ${date.split("-")[0]}`
            : `${moment(date, "jYYYY-jMM").format("jMMMM")} ${
                date.split("-")[0]
              }`}
        </Dashboard.TitleStyle>
        <img
          style={{
            rotate: "90deg",
            cursor: "pointer",
            padding: "5px",
            opacity: `${
              date.split("-").length === 3
                ? moment(date, "jYYYY-jMM-jDD").format("jYYYY-jMM-jDD") ===
                  moment(today).format("jYYYY-jMM-jDD")
                  ? 0.5
                  : 1
                : moment(date, "jYYYY-jMM").format("jYYYY-jMM") ===
                  moment(today).format("jYYYY-jMM")
                ? 0.5
                : 1
            }`,
          }}
          onClick={
            date.split("-").length === 3
              ? moment(date, "jYYYY-jMM-jDD").format("jYYYY-jMM-jDD") ===
                moment(today).format("jYYYY-jMM-jDD")
                ? null
                : increaseDate
              : moment(date, "jYYYY-jMM").format("jYYYY-jMM") ===
                moment(today).format("jYYYY-jMM")
              ? null
              : increaseDate
          }
          src={PrimaryArrow}
          alt=""
        />
      </Dashboard.DashboardHeader> */}
    </>
  );
};

export default DateNavHeader;
