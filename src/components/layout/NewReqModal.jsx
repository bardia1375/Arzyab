/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import api from "config/config.json";

// Components
import { Field } from "components/common/Field";
// import DatePicker from "components/common/datePicker/month";
import DatePicker from "components/common/datePickerMobile/month";

// Styled Elements
import { Button } from "components/common";
import styled from "styled-components";
import moment from "moment-jalaali";
import { errorMessage, successMessage } from "services/toast";
import LoadingSpinner from "components/common/publicTable/loading/LoadingSpinner";
import TimePickerMobile from "components/common/timePickerMobile/TimePickerMobile";
import { Title, TitleBody } from "./EditRequestModal";

// Images

export const NewReqModal = ({
  setTrafficModal,
  setFilter,
  setMsgCount,
  title,
  items,
}) => {
  const { Token } = useSelector((state) => state.auth);
  const info = JSON.parse(localStorage.getItem("personsData"));
  const [requestList, setRequestList] = useState(null);
  const [requestShow, setRequestShow] = useState("");
  const [error, setError] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [loading, setLoading] = useState(false);
  moment.loadPersian({ dialect: "persian-modern" });
  const day = new Date();
  const [template, setTemplate] = useState({
    description: "",
    date_to: moment(day).format("jYYYY-jMM-jDD"),
    date_from: moment(day).format("jYYYY-jMM-jDD"),
    time_to: moment(day).format("HH:mm"),
    time_from: moment(day).format("HH:mm"),
  });

  useEffect(() => {
    if (setFilter !== undefined) {
      setFilter("newReq");
    }
    setLoading(true);
    axios
      .get(`${api.api}/v1/users/${info.UserId}/requests/types`, {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      })
      .then((res) => {
        setRequestList(res.data.data.request_types);
        setLoading(false);
      });
  }, []);

  const selectedType = (e) => {
    if (e !== undefined) {
      setTemplate({
        description: "",
        date_to: moment(day).format("jYYYY-jMM-jDD"),
        date_from: moment(day).format("jYYYY-jMM-jDD"),
        time_to: moment(day).format("HH:mm"),
        time_from: moment(day).format("HH:mm"),
      });
      setRequestShow(e);
    }
  };

  const inputHandler = (e) => {
    switch (e.target.name) {
      case "description":
        setTemplate({ ...template, description: e.target.value });
        break;
      // case "time_from":
      //   setTemplate({ ...template, time_from: e.target.value });
      //   break;
      // case "time_to":
      //   setTemplate({ ...template, time_to: e.target.value });
      //   break;
      default:
        break;
    }
  };

  const dateHandler = (e, type) => {
    if (e.length > 0) {
      if (type === "from") {
        setTemplate({ ...template, date_from: e });
      } else {
        setTemplate({ ...template, date_to: e });
      }
    }
  };

  const diffTime = new Date(template.date_to) - new Date(template.date_from);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  // const lengthHandler = (time, type) => {
  //   if (time.length === 1) {
  //     return `0${time}`;
  //   } else if (time === 24 && type === "hour") {
  //     return "00";
  //   } else {
  //     return time;
  //   }
  // };

  const submit = () => {
    setLoadingSubmit(true);
    if (diffDays < 0) {
      setError("تاریخ انتخاب شده اشتباه می‌باشد!");
      setLoadingSubmit(false);
    }
    if (
      !diff_minutes(startTime, endTime) &&
      !requestShow.Title?.includes("روزانه") &&
      template.date_to === template.date_from
    ) {
      setError("ساعت انتخاب شده اشتباه می‌باشد!");
      setLoadingSubmit(false);
    } else {
      let finallData;
      if (!requestShow.Title?.includes("روزانه")) {
        finallData = {
          request: {
            sender: {
              user_id: info.UserId,
              position_id: info.PositionId,
            },
            position_id: info.PositionId,
            type_id: requestShow.Unique,
            values: {
              date_from: moment(template.date_from, "jYYYY-jMM-jDD").format(
                "YYYY-MM-DD"
              ),
              date_to: moment(template.date_to, "jYYYY-jMM-jDD").format(
                "YYYY-MM-DD"
              ),
              time_from: startTime,
              time_to: endTime,
            },
            description: template.description,
          },
        };
      } else {
        finallData = {
          request: {
            sender: {
              user_id: info.UserId,
              position_id: info.PositionId,
            },
            position_id: info.PositionId,
            type_id: requestShow.Unique,
            values: {
              date_from: moment(template.date_from, "jYYYY-jMM-jDD").format(
                "YYYY-MM-DD"
              ),
              date_to: moment(template.date_to, "jYYYY-jMM-jDD").format(
                "YYYY-MM-DD"
              ),
            },
            description: template.description,
          },
        };
      }
      axios
        .post(
          `${api.api}/v1/requests`,

          finallData,
          {
            headers: {
              Authorization: `Bearer ${Token}`,
            },
          }
        )
        .then((response) => {
          if (response.data.code === 400) {
            errorMessage(response.data.data.notice.message);
            setLoadingSubmit(false);
          } else {
            axios
              .post(
                `${api.api}/v1/extensions/default`,
                {
                  personnel_id: info.UserId,
                },
                {
                  headers: {
                    Authorization: `Bearer ${Token}`,
                  },
                }
              )
              .then((res) => {
                setMsgCount({
                  me: res.data.data[1].msg,
                  recieve: res.data.data[0].msg,
                });
                setLoadingSubmit(false);
                setFilter("all");
                setTrafficModal(false);
                successMessage(".درخواست شما با موفقیت ثبت شد");
              });
          }
        });
    }
  };

  useEffect(() => {
    if (!(diffDays < 0)) {
      setError("");
    }
  }, [diffDays]);

  useEffect(() => {
    if (items !== undefined) {
      setTemplate({
        ...template,
        date_from: moment(items.date.split(" ")[0], "YYYY-MM-DD").format(
          "jYYYY-jMM-jDD"
        ),
        date_to: moment(items.date.split(" ")[0], "YYYY-MM-DD").format(
          "jYYYY-jMM-jDD"
        ),
      });
    }
  }, [items]);

  function diff_minutes(time1, time2) {
    let item1 = time1.split(":")[0] * 3600 + time1.split(":")[1] * 60;
    let item2 = time2.split(":")[0] * 3600 + time2.split(":")[1] * 60;

    return Math.round(item2 - item1) >= 0;
  }

  return (
    <>
      <Overlay></Overlay>
      <Body>
        <div style={{ width: "70%", margin: "20px" }}>
          <CustomButton>
            <Span>{!title ? "ثبت درخواست جدید" : title}</Span>
          </CustomButton>
        </div>
        <WidthBody>
          {loading || !requestList ? (
            <LoadingSpinner />
          ) : (
            <TitleBody>
              <Title>نوع درخواست</Title>
              <Field
                // label={"نوع درخواست :"}
                dropDownColor={"rgba(86, 172, 194, 0.6)"}
                dropData={requestList.map((item) => ({
                  Title: item.full_label,
                  Unique: item.id,
                }))}
                firstData={title}
                type={"dropdown"}
                onClick={(e) => selectedType(e)}
              />
            </TitleBody>
          )}
          {requestShow !== "" && (
            // <div style={{ margin: "40px 0" }}>
            <WidthBody>
              <TitleBody>
                <Title>تاریخ شروع</Title>
                <DatePicker
                  value={template.date_from ? template.date_from : ""}
                  onChange={(e) => dateHandler(e, "from")}
                  // label={"تاریخ شروع :"}
                />
              </TitleBody>
              <TitleBody>
                <Title>تاریخ پایان</Title>
                <DatePicker
                  error={diffDays < 0}
                  value={template.date_to ? template.date_to : ""}
                  onChange={(e) => dateHandler(e, "to")}
                  // label={"تاریخ پایان :"}
                />
              </TitleBody>
              {!requestShow.Title?.includes("روزانه") && (
                <>
                  <TitleBody>
                    <Title>زمان شروع</Title>
                    <TimePickerMobile
                      value={template.time_from ? template.time_from : "00:00"}
                      onChange={setStartTime}
                    />
                  </TitleBody>
                  <TitleBody>
                    <Title>زمان پایان</Title>
                    <TimePickerMobile
                      value={template.time_to ? template.time_to : "00:00"}
                      onChange={setEndTime}
                    />
                  </TitleBody>
                  <div
                    style={{
                      position: "relative",
                      display: "flex",
                      gap: "15px",
                    }}
                  >
                    <Title>توضیحات</Title>{" "}
                    <TextArea
                      value={template.description ? template.description : ""}
                      name="description"
                      onChange={(e) => inputHandler(e)}
                      style={{
                        width: "100%",
                        backgroundColor: "white",
                        fontSize: "16px",
                      }}
                    />
                  </div>
                </>
              )}
              {error && (
                <div
                  style={{
                    position: "relative",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: "20px",
                      color: "red",
                    }}
                  >
                    {error}
                  </div>
                </div>
              )}
              {/* </div> */}
            </WidthBody>
          )}
        </WidthBody>
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "100%",
            justifyContent: "space-evenly",
            alignItems: "flex-end",
            margin: "20px 0",
          }}
        >
          {loadingSubmit ? (
            <div
              style={{
                marginBottom: "20px",
                position: "relative",
                width: "100%",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              >
                <LoadingSpinner />
              </div>
            </div>
          ) : (
            <>
              {requestShow && (
                <div>
                  <Button onClick={submit}>ثبت</Button>
                </div>
              )}
              <div>
                <Button variant="cancel" onClick={() => setTrafficModal(false)}>
                  لغو
                </Button>
              </div>
            </>
          )}
        </div>
      </Body>
    </>
  );
};

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: ${({ overlayWidth }) => (overlayWidth ? overlayWidth : "100%")};
  height: ${({ overlayHeight }) => (overlayHeight ? overlayHeight : "100%")};
  background-color: #fff1;
  z-index: 4;
  backdrop-filter: blur(10px);
  transition: 300ms;
`;

export const Body = styled.div`
  @media (min-width: 500px) {
    width: 450px;
  }
  height: 80%;
  width: 90vw;
  color: black;
  /* background-color: #193774; */
  /* background-image: linear-gradient(to bottom, #112a6a, #2d588b); */
  position: fixed;
  top: ${({ top }) => (top ? top : "50%")};
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 4;
  transition: 500ms;
  display: flex;
  flex-direction: column;
  /* justify-content: space-between; */
  /* display: flex; */
  align-items: center;
  /* padding-bottom: 20vh; */
  /* gap: 50px; */
  background-color: #ecfcfc;
  border-radius: 30px;
  padding: 10px;
  font-size: 4vw;
  @media (min-width: 500px) {
    font-size: 16px;
  }
`;

export const Header = styled.div`
  margin: 20px;
  border-bottom: 1px solid #37b3b8;
  width: 100%;
  display: flex;
  justify-content: center;
  padding-bottom: 15px;
`;

export const TextArea = styled.textarea`
  border: 1px solid lightGrey;
  border-radius: 8px;
  padding: 10px;
`;

export const CustomButton = styled.div`
  color: ${({ color }) => (color ? color : "white")};
  border: ${({ border, color }) => (border ? `1px solid ${color}` : "none")};
  display: flex;
  justify-content: center;
  align-items: center;
  height: 6vh;
  border-radius: 30px;
  background-image: ${({ noBackground }) =>
    noBackground ? "none" : "linear-gradient(to left, #ff8080, #ffb931)"};
  box-shadow: ${({ border }) =>
    border ? "none" : "0px 5px 20px -2px rgba(0, 0, 0, 0.3)"};
  position: relative;
  & > img {
    width: 15px;
    position: absolute;
    left: ${({ left }) => (left ? left : "none")};
    right: ${({ right }) => (right ? right : "none")};
  }
`;

export const WidthBody = styled.div`
  @media (max-width: 300px) {
    width: 100%;
  }
`;

export const Span = styled.span`
  font-size: 5vw;
  @media (min-width: 500px) {
    font-size: 20px;
  }
`;
