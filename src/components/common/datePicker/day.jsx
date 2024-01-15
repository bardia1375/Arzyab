import React, { useState } from "react";
// Styled Elements
import {
  NumberRelativeBox,
  SingleDayNumberContainerDatePicker,
} from "assets/styles/layout/Calendar";
import { Modal, Typography } from "components/common";
import Calendar from "../classes/Calendar";
import moment from "moment-jalaali";
import Card from "../Card";
import { Field } from "../Field";
import profile from "assets/images/profilephoto/302321278.jpg";
import { useNavigate } from "react-router";
const Day = ({
  column,
  day,
  month,
  year,
  comingDate,
  setSelectedDay,
  changeMode,
  setComingDate,
  mobile,
}) => {
  // const popupRef = useRef();
  // const [height, setHeight] = useState(0);
  const [mode, setMode] = useState(false);
  const navigate = useNavigate();
  const clickHanlder = () => {
    let selectedDay = moment(`${year}-${month}-${day}`, "jYYYY-jMM-jDD").format(
      "jYYYY-jMM-jDD"
    );
    setSelectedDay(selectedDay);
    changeMode(false);
    setComingDate();
    // setMode(!mode);
    navigate(`/weeklyPlan/${selectedDay}`);
  };

  // const mouseEnterHandler = () => {
  // setHeight(popupRef.current.clientHeight);
  // };
  return (
    <NumberRelativeBox column={column}>
      <SingleDayNumberContainerDatePicker
        style={{ padding: `${mobile && "5px"}` }}
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
      {false && (
        <Modal>
          <Card color="#efefefef">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                gap: "8px",
              }}
            >
              <Field
                type={"dropdown"}
                label={"انتخاب محدوده"}
                firstData={"انتخاب کنید"}
                dropData={["بهشتی", "شریعتی", "ولی‌عصر"]}
              ></Field>
              <Card>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "8px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-start",
                      gap: "8px",
                    }}
                  >
                    <img
                      src={profile}
                      width="50px"
                      height="50px"
                      style={{
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    />
                    <div>
                      <h4>علی مرتضوی</h4>
                      <p>398</p>
                    </div>
                  </div>
                  <div
                    style={{
                      background: "#27C29B",
                      borderRadius: "8px",
                      padding: "4px 16px",
                      color: "#fff",
                    }}
                  >
                    تایید
                  </div>
                </div>
              </Card>
              <Card>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "8px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-start",
                      gap: "8px",
                    }}
                  >
                    <img
                      src={profile}
                      width="50px"
                      height="50px"
                      style={{
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    />
                    <div>
                      <h4>رضا موسوی</h4>
                      <p>398</p>
                    </div>
                  </div>
                  <div
                    style={{
                      background: "#FA4B24",
                      borderRadius: "8px",
                      padding: "4px 16px",
                      color: "#fff",
                    }}
                  >
                    عدم تایید
                  </div>
                </div>
              </Card>
              <Card>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "8px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-start",
                      gap: "8px",
                    }}
                  >
                    <img
                      src={profile}
                      width="50px"
                      height="50px"
                      style={{
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    />
                    <div>
                      <h4>علی مرتضوی</h4>
                      <p>398</p>
                    </div>
                  </div>
                  <div
                    style={{
                      background: "#27C29B",
                      borderRadius: "8px",
                      padding: "4px 16px",
                      color: "#fff",
                    }}
                  >
                    تایید
                  </div>
                </div>
              </Card>
              <Card>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "8px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-start",
                      gap: "8px",
                    }}
                  >
                    <img
                      src={profile}
                      width="50px"
                      height="50px"
                      style={{
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    />
                    <div>
                      <h4>علی مرتضوی</h4>
                      <p>398</p>
                    </div>
                  </div>
                  <div
                    style={{
                      background: "#27C29B",
                      borderRadius: "8px",
                      padding: "4px 16px",
                      color: "#fff",
                    }}
                  >
                    تایید
                  </div>
                </div>
              </Card>
            </div>
          </Card>
        </Modal>
      )}

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
