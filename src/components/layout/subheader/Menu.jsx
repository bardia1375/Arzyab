/* eslint-disable eqeqeq */
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

// Components

// Styled Elements
import styled from "styled-components";

// Images
import Msg from "assets/images/item-actions/mail.svg";
import Setting from "assets/images/header/setting.svg";
import Web from "assets/images/menu/web.svg";
import Power from "assets/images/header/power.svg";
import Refresh from "assets/images/header/refresh.svg";
import MyTraffic from "assets/images/menu/my-traffic.svg";
import MyCoworker from "assets/images/menu/my-coworker.svg";
import WorkReport from "assets/images/menu/work-report.svg";
import MyShift from "assets/images/menu/my-shift.svg";
import CloseIcon from "assets/images/menu/close.svg";
import { setAuthentication } from "routes/Auth/Module.js";
import { useDispatch } from "react-redux";
import { PasswordModal } from "assets/styles/layout/modals/PasswordModal";
import { useState } from "react";
import { useEffect } from "react";
import { ProfilePhotoModal } from "./ProfilePhotoModal";

export const Menu = ({ setOpenModal, openModal }) => {
  const info = JSON.parse(localStorage.getItem("personsData"));
  const [image, setImage] = useState(null);
  const [photoModal, setPhotoModal] = useState(false);
  const [passwordModal, setPasswordModal] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    dispatch(setAuthentication(false));
  };

  const clickHandler = (path) => {
    navigate(path);
    setOpenModal(false);
  };

  useEffect(() => {
    if (info?.Avatar) {
      setImage(info?.Avatar);
    }
  }, [info]);

  return (
    <>
      {openModal && (
        <Overlay
          onClick={() => setOpenModal(false)}
          // overlayWidth={overlayWidth}
          // overlayHeight={overlayHeight}
        ></Overlay>
      )}
      <Body openModal={openModal}>
        {photoModal && (
          <ProfilePhotoModal
            setImage={setImage}
            image={image}
            onClose={setPhotoModal}
          />
        )}
        {passwordModal && <PasswordModal onClose={setPasswordModal} />}
        <div>
          <HeaderLine>
            <HeaderIcons>
              <img
                onClick={() => setOpenModal(false)}
                src={CloseIcon}
                alt="CloseIcon"
                width={40}
                style={{ marginRight: "10px", cursor: "pointer" }}
              />
              <Icons>
                <img
                  style={{
                    backgroundColor: "white",
                    borderRadius: "100%",
                    padding: "3px",
                  }}
                  width={31}
                  src={Setting}
                  alt="Setting"
                />
                <img src={Refresh} alt="Refresh" />
                <img
                  style={{ cursor: "pointer" }}
                  src={Power}
                  alt="Power"
                  onClick={logout}
                />
              </Icons>
            </HeaderIcons>
            {image ? (
              <img
                src={image}
                alt="UserImage"
                style={{
                  padding: "2px",
                  border: "2px solid #ff8080",
                  borderRadius: "100%",
                  marginLeft: "40px",
                  width: "9.5vh",
                  height: "9.5vh",
                  cursor: "pointer",
                }}
                onClick={() => setPhotoModal(true)}
              />
            ) : (
              <div
                style={{
                  borderRadius: "100%",
                  marginLeft: "40px",
                  width: "9.5vh",
                  height: "9.5vh",
                  backgroundColor: "white",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                }}
                onClick={() => setPhotoModal(true)}
              >
                <h2>
                  {`${info?.FirstName}`.charAt(0)}{" "}
                  {`${info?.LastName}`.charAt(0)}
                </h2>
              </div>
            )}
            {/* <img
              src={Avatar}
              alt="UserImage"
              //   width={65}
              //   height={65}
              style={{
                padding: "2px",
                border: "2px solid #ff8080",
                borderRadius: "100%",
                marginLeft: "40px",
                width: "9.5vh",
                height: "9.5vh",
              }}
            /> */}
          </HeaderLine>
          <InfoPerson>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                alignContent: "center",
                textAlign: "right",
                minWidth: "80%",
              }}
            >
              {info?.FirstName} {info?.LastName}
              <div
                style={{
                  borderLeft: `${
                    !!info?.FirstName || !!info?.LastName
                      ? "1px solid white"
                      : null
                  }`,
                  height: "15px",
                  margin: "0 10px",
                  marginTop: "2px",
                }}
              />
              {info?.Position}
            </div>
            <div style={{ position: "relative" }}>
              {/* <MsgNoti>2</MsgNoti> */}
              <img
                onClick={() => clickHandler("/messages")}
                width={30}
                alt=""
                src={Msg}
                style={{ cursor: "pointer" }}
              />
            </div>
          </InfoPerson>
          <InfoPlace>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                alignContent: "center",
                textAlign: "right",
                minWidth: "70%",
              }}
            >
              {info?.CompanyName}
              {/* <div
                style={{
                  borderLeft: "1px solid grey",
                  height: "15px",
                  margin: "0 10px",
                  marginTop: "2px",
                }}
              />
              79690090 */}
            </div>
          </InfoPlace>
        </div>
        <div>
          <MenuList>

            <Item onClick={() => clickHandler("/")}>
              <img width={25} src={MyTraffic} alt={"MyTraffic"} /> درخواست‌های
              من
            </Item>

            {/* <Item>
              <img width={25} src={MyShift} alt={"MyShift"} /> شیفت‌های من
            </Item> */}
            <Item onClick={() => setPasswordModal(true)}>تغییر رمز ورود</Item>
            {/* <Item>
              <img width={25} src={MyCoWorker} alt={"MyCoWorker"} /> همکاران من
            </Item>
            <Item>
              <img width={25} src={WorkReminder} alt={"WorkReminder"} /> یادآوری
              کارها
            </Item>
            <Item>
              <img width={25} src={Tikment} alt={"Tikment"} /> تیکمنت
            </Item> */}
          </MenuList>
        </div>
        <Footer>
          {/* <img src={Twitter} alt="Twitter" width={35} />
          <img src={Telegram} alt="Telegram" width={30} />
          <img src={Instagram} alt="Instagram" width={30} />
          <img src={Aparat} alt="Aparat" width={30} /> */}
          <a
            href="https://jahangostarpars.com"
            target="_blank"
            rel="noreferrer"
          >
            <img src={Web} alt="Web" width={30} />
          </a>
        </Footer>
      </Body>
    </>
  );
};

Menu.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.node,
  badge: PropTypes.node,
};

export const HeaderIcons = styled.div`
  width: 60%;
  /* padding-right: 30px; */
  height: 8vh;
  /* margin-top: 30px; */
  border-top-left-radius: 40px;
  border-bottom-left-radius: 40px;
  background: rgba(255, 255, 255, 0.14);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  /* backdrop-filter: blur(0px);
  -webkit-backdrop-filter: blur(0px); */
  border: 1px solid #6883a9;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const HeaderLine = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
`;

export const Icons = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

export const InfoPerson = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  margin: 20px 0 10px;
  padding: 15px 20px;
  background: rgba(255, 255, 255, 0.14);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  /* backdrop-filter: blur(0px);
  -webkit-backdrop-filter: blur(0px); */
  border: 1px solid #6883a9;
  font-size: 15px;
`;

export const InfoPlace = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: lightGrey;
  font-size: 12px;
  letter-spacing: -0.4px;
`;

export const MenuList = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  color: white;
  padding: 32px;
  gap: 28px;
  font-weight: 300;
  font-size: 3vh;
  /* height: 55vh; */
  /* overflow: auto; */
`;

export const Item = styled.div`
  width: auto;
  gap: 10px;
  display: flex;
  align-items: center;
  height: 35px;
  font-size: 20px;
  cursor: pointer;
`;

export const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: ${({ overlayWidth }) => (overlayWidth ? overlayWidth : "100%")};
  height: ${({ overlayHeight }) => (overlayHeight ? overlayHeight : "100%")};
  background-color: #fff1;
  z-index: 2;
  backdrop-filter: blur(5px);
  transition: 300ms;
`;

export const Body = styled.div`
  /* background-color: #193774; */
  height: 100vh;
  width: 80%;
  background-image: linear-gradient(to bottom, #112a6a, #2d588b);
  position: absolute;
  top: ${({ top }) => (top ? top : "0")};
  right: ${({ openModal }) => (openModal ? "0" : "-1000px")};
  /* left: ${({ openModal }) => (openModal ? "60%" : "150%")}; */
  /* transform: translate(-50%, -50%); */
  z-index: 2;
  transition: right 500ms;
  transition-timing-function: ease-out;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: auto;
`;

export const Footer = styled.div`
  user-select: none;
  -o-user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  gap: 3.5vw;
  padding: 16px;
`;

export const MsgNoti = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  background-color: #ff8800;
  width: 22px;
  height: 22px;
  top: -10px;
  left: -10px;
  border-radius: 50%;
`;
