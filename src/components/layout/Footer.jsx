// Components
// import { Typography, Spacer } from "components/common";

// Styled Elements
import { FooterStyles } from "assets/styles/layout";

// Images
import Home from "assets/images/footer/home.svg";
import Message from "assets/images/footer/back-arrow.svg";
import SelectedHome from "assets/images/footer/home-selected.svg";
import SelectedMessage from "assets/images/footer/back-selected.svg";
import LongArrow from "assets/images/common/arrows/long-arrow.svg";
import Close from "assets/images/common/dashboard/close.svg";
import styled from "styled-components";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { TrafficModalTest } from "./TrafficModalTest";
import LoadingSpinner from "components/common/publicTable/loading/LoadingSpinner";
import moment from "moment-jalaali";
import { successMessage } from "services/toast";

export const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selected, setSelected] = useState("");
  const [trafficModal, setTrafficModal] = useState(false);
  const [Timer, setTimer] = useState(false);

  const [loadingCheck, setLoadingCheck] = useState(false);

  useEffect(() => {
    if (location.pathname.includes("home")) {
      setSelected("Home");
    } else if (location.pathname.includes("request")) {
      setSelected("Message");
    } else {
      setSelected("");
    }
  }, [location.pathname]);

  const [locations, setLocations] = useState({});
  const [startTime, setStartTime] = useState(moment().format("HH:mm"));
  const [endTime, setEndTime] = useState(moment().format("HH:mm"));
  const [showModal, setShowModal] = useState(false);
  const trafficModalController = (date) => {
    if (Timer) {
      const end = date;
      setEndTime(end);
      successMessage("زمان شما با موفقیت متوقف شد.");
      setTrafficModal(false);
      localStorage.setItem("endTime", moment().format("HH:mm"));
      setTimer(false);
      navigate("sendingTime");
      // const timeDifferenceInMinutes = endTime.diff(startTime, "minutes");
      // console.log("timeDifferenceInMinutes", timeDifferenceInMinutes);
    } else {
      setTimer(true);
      localStorage.setItem("dateForTimer", moment().format("jYYYY-jMM-jDD"));
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocations({
            lat: position.coords.latitude,
            long: position.coords.longitude,
          });
        },
        (error) => {
          setLocations({
            error: "دسترسی به موقعیت مکانی شما امکان پذیر نیست.",
          });
        }
      );
      setStartTime(moment().format("HH:mm"));
      console.log("startTime", startTime);
      localStorage.setItem("startTime", moment().format("HH:mm"));
      successMessage("زمان شما از همین لحظه شروع شد.");
      // setTrafficModal(true);
    }
  };
  useEffect(() => {
    const start = localStorage.getItem("startTime");
    const end = localStorage.getItem("endTime");
    const dateForTimer = localStorage.getItem("dateForTimer");
    const getMinutesSinceMidnight = (time) => {
      if (time) {
        const [hours, minutes] = time?.split(":").map(Number);
        return hours * 60 + minutes;
      }
    };
    console.log("endMinutesend", end);

    const startMinutes = getMinutesSinceMidnight(start);
    const endMinutes = getMinutesSinceMidnight(end);
    console.log("startMinutes", startMinutes);
    console.log("endMinutes", endMinutes);
    const timeDifferenceMinutes = endMinutes - startMinutes;
    console.log("date", dateForTimer);
    console.log(
      "moment().format(jYYYY-jMM-jDD)",
      moment().format("jYYYY-jMM-jDD")
    );
    // Calculate hours and remaining minutes
    if (
      (startMinutes < endMinutes || startMinutes == endMinutes) &&
      dateForTimer == moment().format("jYYYY-jMM-jDD")
    ) {
      const hours = Math.floor(timeDifferenceMinutes / 60);
      const remainingMinutes = timeDifferenceMinutes % 60;
      localStorage.setItem("TravelTime", `${hours}:${remainingMinutes}`);
      console.log("Time difference in minutes:", timeDifferenceMinutes);
      console.log(
        "Time difference in hours and minutes:",
        `${hours} hours and ${remainingMinutes} minutes`
      );
    }

    // // Compare start and end times
    // if (startMinutes < endMinutes || startMinutes == endMinutes) {
    //   // Do something when start time is greater than end time
    //   console.log("End time is greater than end time");
    // } else {
    //   return;
    // }
    // console.log(start, end);
  }, [endTime, startTime]);

  return (
    <FooterStyles.AppbottomHead>
      {trafficModal && (
        <TrafficModalTest
          setTrafficModal={setTrafficModal}
          trafficModal={trafficModal}
          loc={locations}
          loader={setLoadingCheck}
        />
      )}
      <FooterStyles.Tikmentfooter>
        <FooterStyles.HomeBody
          onClick={
            !loadingCheck
              ? () => {
                  setTrafficModal(false);
                  setSelected("Home");
                  navigate("/home");
                }
              : null
          }
          selected={selected === "Home"}
        >
          <FooterStyles.Home
            src={selected === "Home" ? SelectedHome : Home}
            alt="Home"
          />
        </FooterStyles.HomeBody>
        {/* </ButtonAction> */}

        {/* <Circle
          Timer={Timer}
          onClick={
            loadingCheck
              ? null
              : () => trafficModalController(moment().format("HH:mm:ss"))
          }
        >
          {loadingCheck ? (
            <LoadingSpinner />
          ) : Timer ? (
            <h3 style={{ color: "white" }}>پایان</h3>
          ) : (
            <h3 style={{ color: "white" }}>شروع</h3>
          )}
        </Circle> */}
        {/* <FooterStyles.Footericon src={Telegram} alt="Telegram" /> */}
        <FooterStyles.MessagesBody
          onClick={
            !loadingCheck
              ? () => {
                  setTrafficModal(false);
                  setSelected("Message");
                  navigate(-1);
                }
              : null
          }
          selected={selected === "Message"}
        >
          <FooterStyles.Messages
            src={selected === "Message" ? SelectedMessage : Message}
            alt="Message"
          />
          {/* <div
            style={{
              width: "8px",
              height: "8px",
              backgroundColor: "#ff4d4d",
              borderRadius: "50%",
              position: "absolute",
              top: "5px",
              right: "20px",
            }}
          /> */}
        </FooterStyles.MessagesBody>
      </FooterStyles.Tikmentfooter>
      <ToastContainer />
    </FooterStyles.AppbottomHead>
  );
};

export const Circle = styled.div`
  width: ${({ Timer }) => (Timer ? "70px" : "80px")};
  height: ${({ Timer }) => (Timer ? "70px" : "80px")};
  border-radius: 50%;
  position: absolute;
  top: 0%;
  left: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translate(-50%, -50%);
  cursor: pointer;
  /* background-color: #41b9c4; */
  background-image: ${({ Timer }) =>
    Timer
      ? "linear-gradient(to bottom left, #ff8b71, #ffa74a);"
      : "linear-gradient(to bottom left, #3fb6c1, #54d3db);"};
  box-shadow: -1px 10px 20px -2px rgba(0, 0, 0, 0.3);
`;

export const Arrow = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  display: flex;
  transform: translate(-50%, -50%);
`;

export const ButtonAction = styled.div`
  /* width: 50px; */
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80%;
  /* width: 100px; */
  /* padding: 20px 50px 0 50px; */
  /* padding-left: 50px;
  padding-right: 50px; */
  margin-top: 20px;
  cursor: pointer;
  :hover {
    /* padding-left: 50px;
    padding-right: 50px; */
    background-color: red;
  }
`;
