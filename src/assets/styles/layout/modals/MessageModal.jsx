import { useState } from "react";
import { useSelector } from "react-redux";

// Components
import { Typography } from "components/common";

// Styled Elements
import { ListStyles } from "assets/styles/home/employees";
import styled, { css } from "styled-components";

// Images

export const MessageModal = ({ onClose, items }) => {
  // Hooks

  // States
  const { Token } = useSelector((state) => state.auth);

  // Handlers
  const closeModalHandler = () => onClose(false);

  return (
    <>
      <Overlay />
      <SModal>
        <Body>
          <ListStyles.TopSide>
            <Header>
              <Typography size="lg" weight="light">
                {items?.title}
              </Typography>
            </Header>
            <div>{items?.description}</div>
            <div>
              <RequestCardStatusItem
                onClick={closeModalHandler}
                type="important"
              >
                بستن
              </RequestCardStatusItem>
            </div>
          </ListStyles.TopSide>
        </Body>
      </SModal>
    </>
  );
};

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: ${({ overlayWidth }) => (overlayWidth ? overlayWidth : "100vw")};
  height: ${({ overlayHeight }) => (overlayHeight ? overlayHeight : "100vh")};
  background-color: #fff1;
  z-index: 4;
  backdrop-filter: blur(5px);
  transition: 300ms;
`;

export const Body = styled.div`
  border-radius: 20px;
  border: 2px solid #cbcbcb;
  background-color: ${({ theme }) => theme.color.white};
  box-shadow: inset 0px -30px 40px #00000017, 0px 24px 65px #a0bdc180;
`;

export const Header = styled.span`
  width: 100%;
  background-color: #ecfcfc;
  text-align: center;
`;

export const SModal = styled.div`
  position: fixed;
  top: ${({ top }) => (top ? top : "50%")};
  left: ${({ left }) => (left ? left : "50%")};
  transform: translate(-50%, -50%);
  z-index: 4;
  transition: 500ms;
  width: 95%;
  max-width: 450px;
`;

export const RequestCardStatusItem = styled.div`
  ${({ type }) => {
    let style;
    switch (type) {
      case "waiting":
        style = css`
          border: 1px solid #9c9c9c;
          padding: 8px 20px;
          border-radius: 30px;
          color: #9c9c9c;
          white-space: nowrap;
          box-shadow: 0px 5px 10px -7px rgba(0, 0, 0, 0.3);
        `;
        break;
      case "important":
        style = css`
          border: 1px solid #e98425;
          padding: 8px 30px;
          border-radius: 30px;
          color: #e98425;
          white-space: nowrap;
          box-shadow: 0px 5px 10px -7px rgba(0, 0, 0, 0.3);
        `;
        break;
      case "accepted":
        style = css`
          border: 1px solid #26417b;
          padding: 8px 35px;
          border-radius: 30px;
          color: rgba(0, 133, 167, 0.6);
          white-space: nowrap;
          box-shadow: 0px 5px 10px -7px rgba(0, 0, 0, 0.3);
          background: rgba(214, 238, 244, 0.95);
          border: 1px solid rgba(86, 172, 194, 0.6);
        `;
        break;
      case "acceptButton":
        style = css`
          border: 1px solid #26417b;
          padding: 8px 35px;
          border-radius: 30px;
          color: white;
          white-space: nowrap;
          box-shadow: 0px 5px 10px -7px rgba(0, 0, 0, 0.3);
          background: rgba(0, 133, 167, 0.6);
          border: 1px solid rgba(86, 172, 194, 0.6);
        `;
        break;
      case "rejectButton":
        style = css`
          border: 1px solid #ff4d4d;
          padding: 8px 35px;
          border-radius: 30px;
          color: white;
          background-color: #ff4d4d;
          white-space: nowrap;
          box-shadow: 0px 5px 10px -7px rgba(0, 0, 0, 0.3);
        `;
        break;
      case "rejected":
        style = css`
          border: 1px solid #ff4d4d;
          padding: 8px 35px;
          border-radius: 30px;
          color: #ff4d4d;
          white-space: nowrap;
          box-shadow: 0px 5px 10px -7px rgba(0, 0, 0, 0.3);
        `;
        break;
      default:
        style = css``;
        break;
    }
    return style;
  }};
  cursor: pointer;
  font-size: 2vh;
`;
