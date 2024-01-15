/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
import { useEffect, useRef, useState } from "react";

// Components
// Styled Elements
import styled, { css } from "styled-components";

// Images
import Person from "assets/images/common/dashboard/person.svg";
import RightArrows from "assets/images/common/dashboard/right-arrows.svg";
import FingerPrint from "assets/images/common/dashboard/finger-print.svg";
import LeftArrows from "assets/images/common/dashboard/left-arrows.svg";
import axios from "axios";
import api from "config/config.json";
import LoadingSpinner from "components/common/publicTable/loading/LoadingSpinner";
import jMoment from "moment-jalaali";
import { errorMessage, successMessage } from "services/toast";
import { setTraffic } from "routes/Auth/Module";
import { useDispatch } from "react-redux";

export const TrafficModal = ({ setTrafficModal, trafficModal }) => {
  // Codes of companies which can use camera option
  const codeList = [17325];
  const token = localStorage.getItem("tickmentAd_AccessToken");
  const info = JSON.parse(localStorage.getItem("personsData"));
  const [entryType, setEntryType] = useState("");
  const [loading, setLoading] = useState(false);
  const [cameraButton, setCameraButton] = useState(false);
  const [locations, setLocations] = useState({});
  const dispatch = useDispatch();
  // const [presentStatus, setPresentStatus] = useState(
  //   localStorage.getItem("present")
  // );
  const date = new Date();
  var CRC32 = require("crc-32");

  const nowDate = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);

  const swapper = (x) => {
    let data = x.replace(/T.*/, "").split("/");
    let temp = data[0];
    data[0] = data[1];
    data[1] = temp;
    return data;
  };
  const finallDate = swapper(nowDate);

  const videoRef = useRef(null);

  const [stream, setStream] = useState(null);
  const canvasRef = useRef(null);
  const [image, setImage] = useState(null);
  const [permission, setPermission] = useState(false);
  const [typeKind, setTypeKind] = useState("");
  const [cameraOn, setCameraOn] = useState(false);

  // useEffect(() => {
  //   async function getMedia() {
  //     try {
  //       const stream = await navigator.mediaDevices.getUserMedia({
  //         video: true,
  //       });
  //       videoRef.current.srcObject = stream;
  //       videoRef.current.style.transform = "scaleX(-1)";
  //       setCameraButton(true);
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   }
  //   getMedia();
  // }, []);

  // function takePicture() {
  //   const video = videoRef.current;
  //   const canvas = canvasRef.current;
  //   const context = canvas?.getContext("2d");
  //   context.drawImage(video, 0, 0, 320, 240);
  //   const dataUrl = canvas.toDataURL("image/webp"); // Set quality to 0 for lowest quality

  //   // Calculate and log the approximate file size in kilobytes (KB)
  //   // const fileSizeKB = Math.round(dataUrl.length / 1.37);

  //   setImage(dataUrl);
  //   setPermission(false);
  //   setCameraButton(false);

  //   // Stop the camera stream
  //   const stream = video.srcObject;
  //   const tracks = stream.getTracks();
  //   tracks.forEach((track) => track.stop());

  //   presentHandler(typeKind, dataUrl);
  // }

  useEffect(() => {
    let stream;

    async function getMedia() {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        videoRef.current.srcObject = stream;
        videoRef.current.style.transform = "scaleX(-1)";
        setCameraButton(true);
      } catch (err) {
        console.error(err);
      }
    }

    getMedia();

    return () => {
      if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

  function takePicture() {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    context.drawImage(video, 0, 0, 320, 240);
    const dataUrl = canvas.toDataURL("image/webp");

    setImage(dataUrl);
    setPermission(false);
    setCameraButton(false);

    presentHandler(typeKind, dataUrl);
  }

  const presentHandler = (type, imageUrl) => {
    if (!!locations.error) {
      console.log("Location Error! :(");
    } else {
      if (
        !permission &&
        !image &&
        codeList.some((x) => x === info.CompanyCode)
      ) {
        setPermission(true);
        setTypeKind(type);
        // errorMessage("!ابتدا تصویر خود را ثبت کنید");
      } else {
        let entryTypes = entryType === "in" ? "out" : "in";
        setLoading(true);
        axios
          .get(
            `${api.api}/v1/ta/clockings?filter_groups[0][filters][0][key]=user_id&filter_groups[0][filters][0][value][0]=${info.UserId}&filter_groups[0][filters][0][operator]=in&sort[0][key]=datetime&sort[0][direction]=DESC&limit=1&page=0`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((res) => {
            if (
              res.data.data.clockings[0].datetime.split(" ")[1] ===
              jMoment().format("HH:mm:00")
            ) {
              errorMessage("!لطفا یک دقیقه منتظر بمانید");
              setLoading(false);
            } else {
              dispatch(setTraffic(true));
              axios
                .post(
                  `${api.api}/v1/ta/clockings`,
                  {
                    clocking: {
                      latitude: locations.lat,
                      longitude: locations.long,
                      type_id: type,
                      user_id: info.UserId,
                      // picture: "",
                      picture: JSON.stringify(imageUrl),
                      entry_type: type !== 159 ? "out" : entryTypes,
                      datetime: `${finallDate
                        .reverse()
                        .join("-")} ${date.getHours()}:${date.getMinutes()}`,
                      key: (
                        CRC32.str(
                          `*${info.UserId},${finallDate.reverse().join("-")},${
                            date.getHours() < 10
                              ? `0${date.getHours()}`
                              : date.getHours()
                          }:${
                            date.getMinutes() < 10
                              ? `0${date.getMinutes()}`
                              : date.getMinutes()
                          },${type},${
                            type !== 159 ? "0" : entryTypes === "in" ? "1" : "0"
                          },${!!locations.lat ? locations.lat : "35.66"},${
                            !!locations.long ? locations.long : "51.4"
                          }*`
                        ) >>> 0
                      ).toString(16),
                    },
                  },
                  {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  }
                )
                .then((res) => {
                  setLoading(false);
                  dispatch(setTraffic(false));
                  setTrafficModal(false);
                  successMessage("تردد شما با موفقیت ثبت شد.");
                });
            }
          });
      }
    }
  };

  useEffect(() => {
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        axios
          .get(
            `${api.api}/v1/ta/clockings?filter_groups[0][filters][0][key]=user_id&filter_groups[0][filters][0][value][0]=${info.UserId}&filter_groups[0][filters][0][operator]=in&sort[0][key]=datetime&sort[0][direction]=DESC&limit=1&page=0`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((res) => {
            if (
              res.data.data.clockings[0].datetime.split(" ")[0] !==
              jMoment().format("YYYY-MM-DD")
            ) {
              setEntryType("out");
            } else {
              setEntryType(res.data.data.clockings[0].entry_type);
            }
            setLoading(false);
          });
        setLocations({
          lat: position.coords.latitude,
          long: position.coords.longitude,
        });
      },
      (error) => {
        axios
          .get(
            `${api.api}/v1/ta/clockings?filter_groups[0][filters][0][key]=user_id&filter_groups[0][filters][0][value][0]=${info.UserId}&filter_groups[0][filters][0][operator]=in&sort[0][key]=datetime&sort[0][direction]=DESC&limit=1&page=0`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((res) => {
            if (
              res.data.data.clockings[0].datetime.split(" ")[0] !==
              jMoment().format("YYYY-MM-DD")
            ) {
              setEntryType("out");
            } else {
              setEntryType(res.data.data.clockings[0].entry_type);
            }
            setLoading(false);
          });
        setLocations({ error: "دسترسی به موقعیت مکانی شما امکان پذیر نیست." });
      }
    );
  }, []);

  return (
    <>
      <Overlay
      // overlayWidth={overlayWidth}
      // overlayHeight={overlayHeight}
      ></Overlay>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          visibility: `${permission ? "visible" : "hidden"}`,
          position: "absolute",
          zIndex: "4",
          top: "45%",
          transform: "translate(0,-50%)",
          // height: "100%",
          // width: "100%",
        }}
      >
        {/* <video ref={videoRef} autoPlay /> */}
        {/* {stream && ( */}
        {/* <div> */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            position: "relative",
          }}
        >
          <video
            // style={{ marginTop: "50px" }}
            ref={videoRef}
            srcobject={stream}
            autoPlay
          />
          {cameraButton && (
            <button
              style={{
                color: "black",
                backgroundColor: "white",
                width: "50px",
                height: "50px",
                borderRadius: "50%",
                bottom: "0",
                left: "46%",
                position: "absolute",
                zIndex: "1",
                cursor: "pointer",
                marginBottom: "10px",
              }}
              onClick={takePicture}
            >
              {/* Take Picture */}
            </button>
          )}
          {/* <div
              style={{
                color: "white",
                backgroundColor: "black",
                width: "100%",
                height: "40px",
                top: "0",
                position: "absolute",
                textAlign: "center",
                zIndex: "1",
              }}
              // onClick={takePicture}
            ></div> */}
          {/* <button
              style={{
                color: "white",
                // backgroundColor: "black",
                width: "20%",
                height: "40px",
                top: "0",
                right: "15%",
                position: "absolute",
                textAlign: "center",
                zIndex: "1",
                cursor: "pointer",
                marginTop: "10px",
                fontSize: "large",
              }}
              // onClick={takePicture}
            >
              بستن دوربین
            </button> */}
        </div>
        <div
          style={{
            display: "none",
          }}
        >
          <canvas ref={canvasRef} width={320} height={240} />
          {image && <img src={image} alt="User's selfie" />}
        </div>
        {/* </div> */}
        {/* )} */}
      </div>
      <Body>
        <LocationError>{locations?.error}</LocationError>
        {loading || entryType === "" ? (
          <></>
        ) : (
          <>
            <Circle
              disabled={!!locations.error}
              onClick={() => presentHandler(168)}
            >
              مأموریت
            </Circle>
            <Circle
              disabled={!!locations.error}
              onClick={() => presentHandler(162)}
            >
              مرخصی
            </Circle>
          </>
        )}
        <>
          <SelectedActions>
            {/* <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "1vw",
              }}
            >
              <img
                style={{ marginRight: "20px" }}
                width={25}
                src={Person}
                alt=""
              />
              <img src={RightArrows} alt="" />
            </div> */}
            {loading || entryType === "" ? (
              <Selected left={50}>
                <LoadingSpinner />
              </Selected>
            ) : (
              <Selected left={50}>
                <SelectedItem
                  // left={61}
                  disabled={!!locations.error || entryType === "in"}
                  suggest={entryType === "out"}
                  type={"enter"}
                  onClick={() => presentHandler(159)}
                >
                  ورود
                </SelectedItem>
                <SelectedItem
                  // left={38}
                  disabled={!!locations.error || entryType === "out"}
                  suggest={entryType === "in"}
                  type={"exit"}
                  onClick={() => presentHandler(159)}
                >
                  خروج
                </SelectedItem>
              </Selected>
            )}
            {/* <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "1vw",
              }}
            >
              <img src={LeftArrows} alt="" />
              <img
                style={{ marginLeft: "20px" }}
                width={20}
                src={FingerPrint}
                alt=""
              />
            </div> */}
          </SelectedActions>
        </>
      </Body>
    </>
  );
};

export const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: ${({ overlayWidth }) => (overlayWidth ? overlayWidth : "100%")};
  height: ${({ overlayHeight }) => (overlayHeight ? overlayHeight : "100%")};
  background-color: #fff1;
  z-index: 2;
  backdrop-filter: blur(15px);
  transition: 300ms;
`;

export const Body = styled.div`
  height: 100%;
  width: 100%;
  color: black;
  /* background-color: #193774; */
  /* background-image: linear-gradient(to bottom, #112a6a, #2d588b); */
  position: absolute;
  top: ${({ top }) => (top ? top : "50%")};
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  transition: 500ms;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-bottom: 23vh;
  gap: 50px;
`;

export const Circle = styled.div`
  user-select: none;
  -o-user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  box-shadow: -1px 10px 20px -2px rgba(0, 0, 0, 0.3);
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  background-image: ${({ disabled }) =>
    disabled
      ? "linear-gradient(to bottom left, darkgrey, darkgrey)"
      : "linear-gradient(to bottom left, #3eb4c0, #55d4dc)"};
`;

export const Selected = styled.div`
  user-select: none;
  -o-user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  position: absolute;
  top: 50%;
  left: ${({ left }) => `${left}%`};
  transform: translate(-50%, -50%);
  z-index: 3;
`;

export const SelectedItem = styled.div`
  user-select: none;
  -o-user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: 600;
  font-size: 2.5vh;
  box-shadow: ${({ suggest }) =>
    suggest
      ? "-1px 0px 20px 0px rgb(255, 67, 67)"
      : "-1px 10px 20px -2px rgba(0, 0, 0, 0.3)"};

  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  ${({ type }) => {
    switch (type) {
      case "enter":
        return css`
          background-image: ${({ disabled }) =>
            disabled
              ? "linear-gradient(to bottom left, darkgrey, darkgrey)"
              : "linear-gradient(to bottom left, #1788a7, #024f81)"};
        `;
      case "exit":
        return css`
          background-image: ${({ disabled }) =>
            disabled
              ? "linear-gradient(to bottom left, darkgrey, darkgrey)"
              : "linear-gradient(to bottom left, #1788a7, #024f81)"};
          // ? "linear-gradient(to bottom left, darkgrey, darkgrey)"
          // : "linear-gradient(to bottom left,rgb(255, 109, 109),#ff4d4d)"};
        `;
      default:
        break;
    }
  }}/* 
  position: absolute;
  top: 50%;
  left: ${({ left }) => `${left}%`};
  transform: translate(-50%, -50%);
  z-index: 3; */
`;

export const SelectedActions = styled.div`
  background-color: #e5f2f2;
  border-radius: 36px;
  width: 95%;
  height: 60px;
  /* padding: 0 10px; */
  /* gap: 3vh; */
  /* display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  overflow: auto;
  margin-top: 10px; */
  /* z-index: 2; */
  display: flex;
  justify-content: space-between;
  position: relative;
  /* padding: 20px; */
`;

export const LocationError = styled.div`
  position: absolute;
  top: 10vh;
  color: #000;
  font-weight: bold;
  font-size: 3vw;
  @media (min-width: 500px) {
    font-size: 15px;
  }
  animation: blinkingText 2s infinite;
  @keyframes blinkingText {
    0% {
      color: #ef0a1a;
    }
    25% {
      color: #254878;
    }
    50% {
      color: #ef0a1a;
    }
    75% {
      color: #254878;
    }
    100% {
      color: #ef0a1a;
    }
  }
`;
