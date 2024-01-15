/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useRef, useState } from "react";
import styled, { keyframes } from "styled-components";
import { useEffect } from "react";
import moment from "moment-jalaali";
import { decodeToken } from "services/decodeToken";
// Images

function useTime() {
  const [time, setTime] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

export const EmployeesListHelper = () => {
  const [isShowedFilters, setIsShowedFilters] = useState(false);

  const showFiltersToggleHandler = () =>
    setIsShowedFilters((prevState) => !prevState);

  const date = new Date();
  // const [time, setTime] = useState("00:00:00");
  // useEffect(() => {
  //   setTimeout(() => setTime(date.toLocaleTimeString("fa-IR")), 1000);
  // }, [date.toLocaleTimeString("fa-IR")]);
  moment.loadPersian({ dialect: "persian-modern" });
  const day = moment().format("dddd");
  const dates = moment().format("jDD");
  const month = moment().format("jMMMM");
  const year = moment().format("jYYYY");

  const info = JSON.parse(localStorage.getItem("personsData"));

  const nameWrapperRef = useRef();
  const nameRef = useRef();
  const [animation, setAnimation] = useState({
    positionSize: 0,
    positionHasAnimation: false,
    nameSize: 0,
    nameHasAnimation: false,
  });

  const time = useTime();

  // Motion Effect for name and position
  useEffect(() => {
    if (nameRef.current?.offsetWidth > nameWrapperRef.current?.offsetWidth) {
      setAnimation((prev) => ({
        ...prev,
        positionSize:
          nameRef.current?.offsetWidth -
          nameWrapperRef.current?.offsetWidth +
          20,
        positionHasAnimation: true,
      }));
    }
    if (nameRef.current?.offsetWidth > nameWrapperRef.current?.offsetWidth) {
      setAnimation((prev) => ({
        ...prev,
        nameSize:
          nameRef.current?.offsetWidth -
          nameWrapperRef.current?.offsetWidth +
          20,
        nameHasAnimation: true,
      }));
    }
  }, [nameRef.current?.offsetWidth]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        padding: "0 10px",
        width: "100%",
        position: "relative",
        // maxWidth: "1400px",
      }}
    >
      {/* <PageHeaderBody> */}
      <Info>
        <div
          style={{
            fontSize: "14px",
            letterSpacing: "-0.4px",
          }}
        >
          <FullInfoBody ref={nameWrapperRef}>
            <FullInfo
              hasAnimation={animation.nameHasAnimation}
              moveSize={animation.nameSize}
              ref={nameRef}
              isHead={false}
            >
              {info?.FirstName} {info?.LastName}
            </FullInfo>
          </FullInfoBody>
        </div>
        <div
          style={{
            fontSize: "10px",
            letterSpacing: "-0.3px",
            display: "flex",
            flexDirection: "row",
            gap: "5px",
          }}
        >
          <div>{info?.CompanyName}</div>
          {/* <div style={{ borderLeft: "1px solid lightGrey" }} />
            <div>{info.Position}</div> */}
        </div>
      </Info>
      {/* <Slicer /> */}
      <Clock>
        <div
          style={{
            color: "#37B3B8",
            fontSize: "30px",
            letterSpacing: "-0.75px",
          }}
        >
          {time.toLocaleTimeString("fa-IR")}
        </div>
        <div
          style={{
            fontSize: "10px",
            letterSpacing: "-0.3px",
            marginTop: "-15px",
          }}
        >
          {day} {dates} {month} {year}
        </div>
      </Clock>
      {/* </PageHeaderBody> */}
    </div>
  );
};

const PageHeaderBody = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  width: 100%;
  padding: 0 20px;
`;

const Info = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 5px;
  white-space: nowrap;
  text-align: left;
  min-height: 60px;
`;

const Clock = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  white-space: nowrap;
  text-align: left;
  min-height: 60px;
`;

const Slicer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 100%;
  border-left: 0.5px solid #e4e4e4;
`;

const breatheAnimation = (x) => keyframes`
0%   { transform: translate(0, 0) }
100% { transform: translate(${x}px, 0)}  `;
const FullInfoBody = styled.div`
  overflow: hidden;
  width: 100%;
`;
const FullInfo = styled.p`
  /* margin: 0 auto; */
  /* padding: 10px; */
  animation-name: ${({ hasAnimation, moveSize }) =>
    hasAnimation ? breatheAnimation(moveSize) : "d"};
  animation-duration: 5s;
  animation-iteration-count: infinite;
  animation-fill-mode: linear;
  /* font-size: 15px; */

  width: max-content;
`;
