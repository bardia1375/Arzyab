import React from "react";
// Styled Elements
import {
  NumberRelativeBox,
  SingleDayNumberContainerDatePicker,
} from "assets/styles/layout/Calendar";
import { Typography } from "components/common";
import Calendar from "../classes/Calendar";
import moment from "moment-jalaali";

const Day = ({
  column,
  day,
  month,
  year,
  comingDate,
  setSelectedDay,
  changeMode,
  setComingDate,
}) => {
  // const popupRef = useRef();
  // const [height, setHeight] = useState(0);

  const clickHanlder = () => {
    let selectedDay = moment(`${year}-${month}-${day}`, "jYYYY-jMM-jDD").format(
      "jYYYY-jMM-jDD"
    );
    setSelectedDay(selectedDay);
    changeMode(false);
    setComingDate();
  };

  // const mouseEnterHandler = () => {
  // setHeight(popupRef.current.clientHeight);
  // };
  return (
    <NumberRelativeBox column={column}>
      <SingleDayNumberContainerDatePicker
        mode={
          Calendar(year, month, day).isToday(comingDate)
            ? "coming date"
            : Calendar(year, month, day).isPublicHoliday()
            ? "public holiday"
            : "work day"
        }
        isSelected={
          Calendar(year, month, day).isToday(comingDate) ? true : false
        }
        onClick={clickHanlder}
        // onMouseEnter={mouseEnterHandler}
      >
        <Typography size="base" weight="medium">
          {day}
        </Typography>
      </SingleDayNumberContainerDatePicker>
      {/* {
        <DayNumberPopup
          style={{ right: "-14px" }}
          ref={popupRef}
          height={height}
          mode={
            Calendar(year, month, day).isToday(comingDate)
              ? "coming date"
              : Calendar(year, month, day).isPublicHoliday()
              ? "public holiday"
              : "work day"
          }
        >
          <div>
            <Typography size="sm" weight="medium">
              {Calendar(year, month, day).isPublicHoliday() ? "تعطیل" : ""}
            </Typography>
            <Typography size="xs" weight="light">
              {`${year}/${month}/${day}`}
            </Typography>
          </div>
          <div>
            <Typography size="xs" weight="light">
            </Typography>
          </div>
        </DayNumberPopup>
      } */}
    </NumberRelativeBox>
  );
};

export default Day;
