import { forwardRef, useEffect, useRef, useState } from "react";

// Components
import { Modal, ConfirmButton, Typography, Dropdown } from "components/common";

// Styled Elements
import { ListStyles } from "assets/styles/home/employees";

// Images
import Close from "assets/images/common/close/white-color-red-bg.svg";
import LeftArrow from "assets/images/common/arrows/white-left.svg";

import Arrow from "assets/images/common/arrows/red-down.svg";
import { Field } from "../Field";
import Calendar from "../classes/Calendar";
import moment from "moment-jalaali";
import styled from "styled-components";
import Day from "../datePicker/day";

export const ModalPicker = ({
  type,
  onClose,
  value,
  onChange,
  label,
  placeHolder,
  items,
  mode,
  setMode,
  notShowDeletebox,
  DeleteHandler,
  dateController,
}) => {
  // Hooks

  // States
  // eslint-disable-next-line no-unused-vars
  const [deleteCause, setDeleteCause] = useState(null);

  // Handlers
  const deleteCauseChangeHandler = (text) => setDeleteCause(text);

  const closeModalHandler = () => onClose(false);

  // const [mode, setMode] = useState(false);
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
  // useEffect(() => {
  //   if (onChange !== undefined) {
  //     onChange(selectedDay);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [selectedDay]);
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
    if (dateController) {
      dateController(null);
    }
    setMode(false);
    setComingDate();
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
    const { value } = event?.target;
    setSelectedDay(value);
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
    <Modal>
      <>
        {/* <Field
          // onClick={modeHandler}
          onChange={inputChangeHandler}
          placeholderTextAlign={"center"}
          value={selectedDay}
          placeHolder={placeHolder}
          name={"Day"}
          label={label}
          // color="darkGray"
          type={"text"}
          autoComplete="off"
        /> */}
        <div
          ref={ref}
          style={{
            // marginTop: "10px",
            // left: "-10px",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "100vw",
            maxWidth: "500px",
            height: "50vh",
            zIndex: "1",
          }}
        >
          <MonthContainer>
            <MonthName>
              <Header>
                <HeaderTitle style={{ cursor: "pointer" }} onClick={lastMonth}>
                  <img
                    style={{
                      rotate: "180deg",
                    }}
                    src={LeftArrow}
                    alt="RightArrow"
                  />
                </HeaderTitle>
                <HeaderTitle>
                  <div
                    onClick={yearChangeHandler}
                    style={{ alignItems: "center", cursor: "pointer" }}
                  >
                    {year}
                  </div>
                  <YearInputBody yearMode={yearMode}>
                    <button onClick={goToYear}>برو به سال</button>
                    <Field
                      name={"year"}
                      type={"text"}
                      value={input}
                      onChange={inputYearHandler}
                    />
                  </YearInputBody>
                  <MonthInputBody monthMode={monthMode}>
                    <Field
                      // width={"110px"}
                      onClick={inputDropDownHandler}
                      // value={input}
                      name="SortBy"
                      // color="darkGray"
                      dropDownColor={"darkGray"}
                      type="dropdown"
                      dropData={[
                        "فروردین",
                        "اردیبهشت",
                        "خرداد",
                        "تیر",
                        "مرداد",
                        "شهریور",
                        "مهر",
                        "آبان",
                        "آذر",
                        "دی",
                        "بهمن",
                        "اسفند",
                      ]}
                      firstData={monthName}
                    />
                  </MonthInputBody>

                  <div
                    onClick={monthChangeHandler}
                    style={{ alignItems: "center", cursor: "pointer" }}
                  >
                    {monthName}
                  </div>
                </HeaderTitle>
                <img
                  onClick={nextMonth}
                  src={LeftArrow}
                  alt="LeftArrow"
                  style={{ cursor: "pointer" }}
                />
              </Header>
            </MonthName>
            <DayNameContainerDatePicker>
              <Typography size="lg" weight="medium">
                ش
              </Typography>
              <Typography size="lg" weight="medium">
                ی
              </Typography>
              <Typography size="lg" weight="medium">
                د
              </Typography>
              <Typography size="lg" weight="medium">
                س
              </Typography>
              <Typography size="lg" weight="medium">
                چ
              </Typography>
              <Typography size="lg" weight="medium">
                پ
              </Typography>
              <Typography size="lg" weight="medium">
                ج
              </Typography>
            </DayNameContainerDatePicker>
            <DayNumberContainerDatepicker>
              {numberOfDays?.map((key, index) => {
                return (
                  <Day
                    mobile={true}
                    setComingDate={setComingDate}
                    setSelectedDay={onChange}
                    changeMode={modeHandler}
                    key={index}
                    column={index + 1 === 1 ? startOfMonthDay : "auto"}
                    day={index + 1}
                    month={month + 1}
                    year={year}
                    comingDate={comingDate}
                  />
                );
              })}
            </DayNumberContainerDatepicker>
            <div style={{ display: "flex", gap: "200px" }}>
              <TodayButton onClick={todayHandler}>
                <Typography>روز جاری</Typography>
              </TodayButton>
              <CloseButton onClick={() => setMode(false)}>
                <Typography>بستن</Typography>
              </CloseButton>
            </div>
            {/* <EraseButton onClick={eraseHandler}>
                <Typography>پاک کردن</Typography>
              </EraseButton> */}
          </MonthContainer>
        </div>
      </>
    </Modal>
  );
};

export const MonthContainer = styled.div`
  position: relative;
  padding: 24px 12px 12px;
  border-radius: 12px;
  background: linear-gradient(180deg, #f6f6f6 0%, #faf9f8 71%, #ffffff 100%);
  box-shadow: 0px 6px 9px #00000017;
`;

export const MonthName = styled.div`
  z-index: ${({ isSelected }) => (isSelected > 0 ? "2" : "1")};
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  top: -10px;
  display: flex;
  justify-content: center;
  height: 50px;
  width: 90%;
  border-radius: 12px;
  background: linear-gradient(262deg, #ababab 0%, #676767 100%);
  box-shadow: 0px 7px 15px #00000033;
  color: #fff;
`;

export const DayNameContainerDatePicker = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  justify-content: center;
  align-items: center;
  /* padding-top: 10px; */
  border-radius: 8px;
  text-align: center;
  background-color: #fff;
  color: #9e9e9e;
  z-index: ${({ isSelected }) => (isSelected > 0 ? "2" : "0")};
`;

export const DayNumberContainerDatepicker = styled.div`
  display: grid;
  grid-template-rows: repeat(5, 1fr);
  grid-template-columns: repeat(7, 1fr);
  gap: 5px;
  margin: 10px 0;
`;

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

const TodayButton = styled.button`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 27px;
  padding: 2px 0;
  margin-top: 10px;
  color: white;
  border-radius: 10px;
  width: 100%;
  background: linear-gradient(90deg, #ff8080 0%, #ffd011 100%);
  :hover {
    background: linear-gradient(90deg, #fc2b2b 0%, #ffcd00 100%);
  }
`;

const CloseButton = styled.button`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 27px;
  padding: 2px 0;
  margin-top: 10px;
  color: white;
  border-radius: 10px;
  width: 100%;
  background: linear-gradient(90deg, #424242 0%, #b9b9b9 100%);
  :hover {
    background: linear-gradient(90deg, #000000 0%, #b9b9b9 100%);
  }
`;
