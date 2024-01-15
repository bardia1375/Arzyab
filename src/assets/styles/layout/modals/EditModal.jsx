/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import api from "config/config.json";

// Components
import { Field } from "components/common/Field";

// Styled Elements
import { Button, Typography } from "components/common";
import styled from "styled-components";
import moment from "moment-jalaali";
import { ToastContainer } from "react-toastify";
import { successMessage } from "services/toast";
import LoadingSpinner from "components/common/publicTable/loading/LoadingSpinner";
import { Traffics } from "assets/styles/home/traffics";

// Images

export const EditModal = ({ setModalType, setMsgCount, title, items }) => {
  const { Token } = useSelector((state) => state.auth);
  const info = JSON.parse(localStorage.getItem("personsData"));
  // const [requestList, setRequestList] = useState([]);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  moment.loadPersian({ dialect: "persian-modern" });
  // const day = new Date();
  // const [template, setTemplate] = useState({
  //   description: "",
  //   date_to: "",
  //   date_from: "",
  //   time_to: "",
  //   time_from: "",
  // });
  const cause = ["عادی", "مرخصی", "مأموریت"];
  const type = ["ورود", "خروج"];
  const [entryType, setEntryType] = useState("");
  const [entryCause, setEntryCause] = useState("");

  useEffect(() => {
    axios
      .get(`${api.api}/v1/users/${info.UserId}/requests/types`, {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      })
      .then((res) => {
        // setRequestList(res.data.data.request_types);
      });
  }, []);

  const selectedType = (e, type) => {
    if (type === "type") {
      setEntryType(e);
    } else if (type === "cause") {
      setEntryCause(e);
    }
    // if (e !== undefined) {
    //   setTemplate({
    //     description: "",
    //     date_to: "",
    //     date_from: "",
    //     time_to: "",
    //     time_from: "",
    //   });
    //   setRequestShow(e);
    // }
  };

  //   const inputHandler = (e) => {
  //     switch (e.target.name) {
  //       case "description":
  //         setTemplate({ ...template, description: e.target.value });
  //         break;
  //       // case "time_from":
  //       //   setTemplate({ ...template, time_from: e.target.value });
  //       //   break;
  //       // case "time_to":
  //       //   setTemplate({ ...template, time_to: e.target.value });
  //       //   break;
  //       default:
  //         break;
  //     }
  //   };

  //   const dateHandler = (e, type) => {
  //     if (e.length > 0) {
  //       if (type === "from") {
  //         setTemplate({ ...template, date_from: e });
  //       } else {
  //         setTemplate({ ...template, date_to: e });
  //       }
  //     }
  //   };

  //   const diffTime = new Date(template.date_to) - new Date(template.date_from);
  //   const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  //   const lengthHandler = (time, type) => {
  //     if (time.length === 1) {
  //       return `0${time}`;
  //     } else if (time === 24 && type === "hour") {
  //       return "00";
  //     } else {
  //       return time;
  //     }
  //   };

  const submit = () => {
    setLoadingSubmit(true);
    axios
      .put(
        `${api.api}/v1/ta/clockings/${items.id}`,
        {
          clocking: {
            datetime: items.date,
            description: null,
            entry_type: entryType === "ورود" ? "in" : "out",
            type_id:
              entryCause === "مأموریت"
                ? 168
                : entryCause === "مرخصی"
                ? 162
                : 159,
            user_id: info.UserId,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${Token}`,
          },
        }
      )
      .then((res) => {
        setLoadingSubmit(false);
        setModalType(null);
        successMessage("تردد شما با موفقیت تغییر یافت.");
      });
  };

  //   useEffect(() => {
  //     if (!(diffDays < 0)) {
  //       setError("");
  //     }
  //   }, [diffDays]);

  //   useEffect(() => {
  //     if (items !== undefined) {
  //       setTemplate({
  //         ...template,
  //         time_from: items.timeFrom,
  //         time_to: items.timeTo,
  //         description: items.description,
  //         date_from: moment(items.date_from, "YYYY-MM-DD").format(
  //           "jYYYY-jMM-jDD"
  //         ),
  //         date_to: moment(items.date_to, "YYYY-MM-DD").format("jYYYY-jMM-jDD"),
  //       });
  //       setRequestShow({
  //         Title: items.title,
  //         Unique: requestList.filter((item) => item.full_label === items.title)[0]
  //           ?.id,
  //       });
  //     }
  //   }, []);

  return (
    <>
      <Overlay />
      <Body>
        <div style={{ width: "auto", margin: "20px" }}>
          <CustomButton>
            <Span>{"ویرایش تردد"}</Span>
          </CustomButton>
        </div>
        <WidthBody>
          <TitleBody>
            <Title>نوع تردد</Title>
            <Field
              dropDownColor={"rgba(86, 172, 194, 0.6)"}
              //   dropData={type.map((item) => ({
              //     Title: item.full_label,
              //     Unique: item.id,
              //   }))}
              dropData={type}
              firstData={items.entryType}
              type={"dropdown"}
              onClick={(e) => selectedType(e, "type")}
            />
          </TitleBody>
          <TitleBody>
            <Title>علت تردد</Title>
            <Field
              dropDownColor={"rgba(86, 172, 194, 0.6)"}
              //   dropData={type.map((item) => ({
              //     Title: item.full_label,
              //     Unique: item.id,
              //   }))}
              dropData={cause}
              firstData={items.entryCause}
              type={"dropdown"}
              onClick={(e) => selectedType(e, "cause")}
            />
          </TitleBody>
          {/* <TitleBody>
            <Title>تاریخ شروع</Title>
            <DatePicker
              value={template.date_from ? template.date_from : ""}
              onChange={(e) => dateHandler(e, "from")}
            />
          </TitleBody>
          <TitleBody>
            <Title>تاریخ پایان</Title>

            <DatePicker
              error={diffDays < 0}
              value={template.date_to ? template.date_to : ""}
              onChange={(e) => dateHandler(e, "to")}
            />
          </TitleBody> */}
          {/* {!requestShow.Title?.includes("روزانه") && (
            <>
              <TitleBody>
                <Title>زمان شروع</Title>
                <Field
                  value={template.time_from ? template.time_from : "00:00"}
                  onChange={setStartTime}
                  type="time"
                />
              </TitleBody>
              <TitleBody>
                <Title>زمان پایان</Title>
                <Field
                  value={template.time_to ? template.time_to : "00:00"}
                  onChange={setEndTime}
                  type="time"
                />
              </TitleBody>
            </>
          )} */}
          {/* <div
            style={{
              position: "relative",
              display: "flex",
              gap: "15px",
            }}
          >
            <Title>توضیحات</Title>
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
          </div> */}
          <div>
            <Traffics.RequestCard>
              <Traffics.RequestCardInfo>
                <div style={{ width: "100%" }}>
                  <div
                    style={{
                      display: "flex",
                      color: "#9c9c9c",
                      fontWeight: "400",
                      fontSize: "1.8vh",
                      alignItems: "center",
                    }}
                  >
                    {`${moment(
                      items.date_from
                        ? items.date_from
                        : items.date
                        ? items.date
                        : items.datetime
                    ).format("dddd")} - ${moment(
                      items.date_from
                        ? items.date_from
                        : items.date
                        ? items.date
                        : items.datetime
                    ).format("jYYYY/jMM/jDD")}`}{" "}
                    -{" "}
                    {items.time_from
                      ? moment(items.time_from, "HH:mm:ss").format("HH:mm:ss")
                      : moment(items.date ? items.date : items.datetime).format(
                          "HH:mm:ss"
                        )}
                  </div>
                  <Typography size="base" color={"grey"}>
                    {items.entryType}{" "}
                    <span
                      style={{
                        color: "#E67205",
                        width: "100%",
                        textAlign: "center",
                      }}
                    >
                      {items.entryCause}
                    </span>
                  </Typography>
                </div>
                <div>
                  {items.status === "waiting" ? (
                    <Traffics.RequestCardStatusItem type="waiting">
                      در انتظار بررسی
                    </Traffics.RequestCardStatusItem>
                  ) : items.status === "rejected" ? (
                    <Traffics.RequestCardStatusItem type="waiting">
                      رد شده
                    </Traffics.RequestCardStatusItem>
                  ) : (
                    <Traffics.RequestCardStatusItem type="waiting">
                      تأیید شده
                    </Traffics.RequestCardStatusItem>
                  )}
                </div>
                {/* <Image
                      onClick={() => editHandler(item)}
                      width={20}
                      src={Pen}
                      alt=""
                    /> */}
              </Traffics.RequestCardInfo>
            </Traffics.RequestCard>
          </div>
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
              <div>
                <Button onClick={submit}>ثبت</Button>
              </div>
              <div>
                <Button variant="cancel" onClick={() => setModalType(null)}>
                  بستن
                </Button>
              </div>
            </>
          )}
        </div>
        <ToastContainer />
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
  padding: 0 50px;
  line-height: 25px;
  & > img {
    width: 15px;
    position: absolute;
    left: ${({ left }) => (left ? left : "none")};
    right: ${({ right }) => (right ? right : "none")};
  }
`;

export const WidthBody = styled.div`
  padding: 20px;
  width: 100%;
  height: 300vh;
  overflow: auto;
`;

export const Span = styled.span`
  font-size: 5vw;
  @media (min-width: 500px) {
    font-size: 20px;
  }
`;

export const Manager = styled.div`
  width: 95%;
  display: flex;
  background-color: #962323;
  border: 1px solid #eb2727;
  color: #c7c7c7;
  padding: 5px;
  border-radius: 5px;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  bottom: 60px;
  font-size: 3vw;
  @media (min-width: 500px) {
    font-size: 15px;
  }
`;

export const Title = styled.span`
  font-weight: bold;
  font-size: 4vw;
  @media (min-width: 500px) {
    font-size: 15px;
  }
`;

export const Subject = styled.span`
  font-size: 4vw;
  @media (min-width: 500px) {
    font-size: 15px;
  }
`;

export const TitleBody = styled.span`
  display: flex;
  align-items: center;
  margin: 5px 0;
  gap: 10px;
`;
