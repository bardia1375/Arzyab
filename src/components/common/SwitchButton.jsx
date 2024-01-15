/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";

function SwitchButton({ innerTextSwitch }) {
  const [innerText, setInnerText] = useState(innerTextSwitch);
  const [toggleStatus, setToggleStatus] = useState(false);
  useEffect(() => {
    setInnerText(innerTextSwitch);
  }, [innerTextSwitch]);
  const changeToggle = () => {
    if (innerText === "خیر") {
      setInnerText("بله");
      setToggleStatus(true);
    } else if (innerText === "بسته") {
      setInnerText("باز");
      setToggleStatus(true);
    } else if (innerText === "باز") {
      setInnerText("بسته");
      setToggleStatus(false);
    } else {
      setInnerText("خیر");
      setToggleStatus(false);
    }
  };
  return (
    <div style={{ height: "40px", display: "flex", alignItems: "center" }}>
      <Container toggleStatus={toggleStatus} onClick={changeToggle}>
        <InnerCircle toggleStatus={toggleStatus}>
          {/* <img
          width={15}
          height={15}
          src={toggleStatus ? Tick : Line}
          alt="Tick"
        /> */}
        </InnerCircle>
        <InnerText toggleStatus={toggleStatus}>{innerText}</InnerText>
      </Container>
    </div>
  );
}

export default SwitchButton;

const Container = styled.div`
  display: flex;
  color: white;
  justify-content: space-between;
  flex-direction: ${({ toggleStatus }) =>
    toggleStatus ? "row-reverse" : "row"};
  /* width: 70px; */
  min-width: 80px;
  height: 30px;
  border-radius: 30px;
  background-color: ${({ toggleStatus }) =>
    toggleStatus ? "#37B3B8" : " #CBCBCB"};
  align-items: center;
  cursor: pointer;
`;

const InnerCircle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: white;
  border-radius: 100%;
  width: 23px;
  height: 23px;
  margin: ${({ toggleStatus }) => (toggleStatus ? "0 0 0 5px" : "0 5px 0 0")};
`;

const InnerText = styled.div`
  margin: 10px;
`;
