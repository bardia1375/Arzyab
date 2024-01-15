/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import api from "config/config.json";

// Components
// import DatePicker from "components/common/datePicker/month";
import DatePicker from "components/common/datePickerMobile/month";
import LoadingSpinner from "components/common/publicTable/loading/LoadingSpinner";
import { Button } from "components/common";
import moment from "moment-jalaali";

// Styled Elements
import styled from "styled-components";

// Images

export const PeriodModal = ({
  onClose,
  setDate,
  setSelectedTitle,
  selectedTitle,
}) => {
  const { Token } = useSelector((state) => state.auth);
  const info = JSON.parse(localStorage.getItem("personsData"));
  // eslint-disable-next-line no-unused-vars
  const [requestList, setRequestList] = useState([]);
  const [error, setError] = useState("");
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  moment.loadPersian({ dialect: "persian-modern" });
  const day = new Date();
  const [template, setTemplate] = useState({
    date_to: moment(day).format("jYYYY-jMM-jDD"),
    date_from: moment(day).format("jYYYY-jMM-jDD"),
  });

  useEffect(() => {
    // setFilter("newReq");
    axios
      .get(`${api.api}/v1/users/${info.UserId}/requests/types`, {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      })
      .then((res) => {
        setRequestList(res.data.data.request_types);
      });
  }, []);

  // const selectedType = (e) => {
  //   if (e !== undefined) {
  //     setTemplate({
  //       description: "",
  //       date_to: moment(day).format("jYYYY-jMM-jDD"),
  //       date_from: moment(day).format("jYYYY-jMM-jDD"),
  //       time_to: "",
  //       time_from: "",
  //     });
  //     setRequestShow(e);
  //   }
  // };

  // const inputHandler = (e) => {
  //   switch (e.target.name) {
  //     case "description":
  //       setTemplate({ ...template, description: e.target.value });
  //       break;
  //     default:
  //       break;
  //   }
  // };

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
      setLoadingSubmit(false);
      setError("تاریخ انتخاب شده اشتباه می‌باشد!");
    } else {
      setDate({
        from: moment(template.date_from, "jYYYY-jMM-jDD").format("YYYY-MM-DD"),
        to: moment(template.date_to, "jYYYY-jMM-jDD").format("YYYY-MM-DD"),
      });
      setLoadingSubmit(false);
      onClose(false);
    }
  };

  useEffect(() => {
    if (!(diffDays < 0)) {
      setError("");
    }
  }, [diffDays]);

  return (
    <>
      <Overlay
      // overlayWidth={overlayWidth}
      // overlayHeight={overlayHeight}
      ></Overlay>
      <Body>
        {/* <Header>ثبت درخواست جدید</Header> */}
        <div style={{ width: "70%", margin: "20px" }}>
          <CustomButton>
            <span style={{ fontSize: "3vh" }}>انتخاب بازۀ دستی</span>
          </CustomButton>
        </div>
        <div>
          {/* <Field
            label={"نوع درخواست :"}
            dropDownColor={"rgba(86, 172, 194, 0.6)"}
            dropData={requestList.map((item) => ({
              Title: item.full_label,
              Unique: item.id,
            }))}
            type={"dropdown"}
            onClick={(e) => selectedType(e)}
          /> */}
          {/* {requestShow !== "" && ( */}
          <div style={{ margin: "40px 0" }}>
            <DatePicker
              value={template.date_from ? template.date_from : ""}
              onChange={(e) => dateHandler(e, "from")}
              label={"تاریخ شروع :"}
            />
            <DatePicker
              error={diffDays < 0}
              value={template.date_to ? template.date_to : ""}
              onChange={(e) => dateHandler(e, "to")}
              label={"تاریخ پایان :"}
            />
            {/* </div> */}
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
          </div>
        </div>
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
                <Button onClick={submit}>تأیید</Button>
              </div>
              <div>
                <Button
                  variant="cancel"
                  onClick={() => {
                    onClose(false);
                    setDate({});
                    setSelectedTitle(
                      selectedTitle ? selectedTitle : "ماه جاری"
                    );
                  }}
                >
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
  height: 50%;
  width: 90%;
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
  & > img {
    width: 15px;
    position: absolute;
    left: ${({ left }) => (left ? left : "none")};
    right: ${({ right }) => (right ? right : "none")};
  }
`;
