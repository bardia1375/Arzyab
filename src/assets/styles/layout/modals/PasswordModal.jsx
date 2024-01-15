import { useState } from "react";

// Components
import { Typography } from "components/common";

// Styled Elements
import { ListStyles } from "assets/styles/home/employees";

// Images
import styled, { css } from "styled-components";
import axios from "axios";
import api from "config/config.json";
import { useSelector } from "react-redux";
import { errorMessage, successMessage } from "services/toast";
import { ToastContainer } from "react-toastify";

export const PasswordModal = ({ onClose, notShowDeletebox }) => {
  // Hooks

  // States
  // eslint-disable-next-line no-unused-vars
  const [deleteCause, setDeleteCause] = useState(null);
  const { Token } = useSelector((state) => state.auth);

  // Handlers
  const closeModalHandler = () => onClose(false);

  const [template, settemplate] = useState({
    old_password: "",
    new_password: "",
    new_password_confirmation: "",
  });
  const [errorMsg, setErrorMsg] = useState("");

  const inputHandler = (e) => {
    settemplate({ ...template, [e.target.id]: e.target.value });
  };

  const confirmHandler = (e) => {
    e.preventDefault(e);
    let error = false;
    Object.keys(template).forEach(function (key) {
      if (template[key].length === 0) {
        error = true;
        setErrorMsg("لطفا تمام اطلاعات را وارد نمایید!");
      }
    });
    if (template["new_password"] !== template["new_password_confirmation"]) {
      if (!error) {
        setErrorMsg("کلمه عبور یکسان نیست!");
      }
      error = true;
    }
    if (!error) {
      axios
        .post(
          `${api.api}/V1/MobileApp/Login/Password/Reset`,
          {
            ...template,
          },
          {
            headers: {
              Authorization: `Bearer ${Token}`,
            },
          }
        )
        .then((res) => {
          if (res.data.code === 400) {
            errorMessage(res.data.data.notice.message);
            onClose(false);
          } else {
            successMessage(".تغییر رمز با موفقیت انجام شد");
            setErrorMsg("");
            onClose(false);
          }
        });
    }
  };

  return (
    <>
      <Overlay />
      {!notShowDeletebox ? (
        <SModal>
          <ListStyles.DeleteContainer>
            <ListStyles.TopSide>
              <Typography size="lg" weight="light">
                تغییر رمز ورود
              </Typography>
              <ListStyles.BottomSide>
                <span style={{ whiteSpace: "nowrap" }}>کلمه عبور قبلی:</span>
                <input
                  required
                  onInvalid={(e) =>
                    e.target.setCustomValidity(
                      "لطفا کلمه عبور قبلی خود را وارد نمایید!"
                    )
                  }
                  onInput={(e) => e.target.setCustomValidity("")}
                  type="password"
                  id="old_password"
                  onChange={(e) => inputHandler(e)}
                  style={{ border: "1px solid lightgrey" }}
                />
              </ListStyles.BottomSide>
              <ListStyles.BottomSide>
                <span style={{ whiteSpace: "nowrap" }}>کلمه عبور جدید:</span>
                <input
                  required
                  onInvalid={(e) =>
                    e.target.setCustomValidity(
                      "لطفا کلمه عبور جدید خود را وارد نمایید!"
                    )
                  }
                  onInput={(e) => e.target.setCustomValidity("")}
                  type="password"
                  id="new_password"
                  onChange={(e) => inputHandler(e)}
                  style={{ border: "1px solid lightgrey" }}
                />
              </ListStyles.BottomSide>
              <ListStyles.BottomSide>
                <span style={{ whiteSpace: "nowrap" }}>
                  تکرار کلمه عبور جدید:
                </span>
                <input
                  required
                  onInvalid={(e) =>
                    e.target.setCustomValidity(
                      "لطفا کلمه عبور جدید خود را تکرار فرمایید!"
                    )
                  }
                  onInput={(e) => e.target.setCustomValidity("")}
                  type="password"
                  id="new_password_confirmation"
                  onChange={(e) => inputHandler(e)}
                  style={{ border: "1px solid lightgrey" }}
                />
              </ListStyles.BottomSide>
              <div style={{ color: "red" }}>{errorMsg}</div>
              <div>
                <RequestCardStatusItem
                  onClick={confirmHandler}
                  type="acceptButton"
                >
                  تأیید
                </RequestCardStatusItem>
                <RequestCardStatusItem
                  onClick={closeModalHandler}
                  type="rejectButton"
                >
                  لغو
                </RequestCardStatusItem>
              </div>
            </ListStyles.TopSide>
          </ListStyles.DeleteContainer>
          <ToastContainer />
        </SModal>
      ) : null}
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

export const SModal = styled.div`
  position: fixed;
  top: ${({ top }) => (top ? top : "50%")};
  left: ${({ left }) => (left ? left : "50%")};
  transform: translate(-50%, -50%);
  z-index: 4;
  transition: 500ms;
`;

export const RequestCardStatusItem = styled.button`
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
`;
