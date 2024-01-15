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
import { successMessage } from "services/toast";

export const ApproveModal = ({
  type,
  onClose,
  items,
  notShowDeletebox,
  DeleteHandler,
  approveModal,
  setSelectedTitle,
  setMsgCount,
  personnelId,
}) => {
  // Hooks

  // States
  // eslint-disable-next-line no-unused-vars
  const [deleteCause, setDeleteCause] = useState(null);
  const { Token } = useSelector((state) => state.auth);

  // Handlers
  const closeModalHandler = () => onClose(false);

  const [template, settemplate] = useState({
    approved_request_id: approveModal.id,
    acceptance: approveModal.approve,
    description: "",
  });

  const inputHandler = (e) => {
    settemplate({ ...template, description: e.target.value });
  };

  console.log("template",template);
  const confirmHandler = () => {
    axios
      .put(`${api.api}/v1/requests/approve`, template, {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      })
      .then((res) => {
        setSelectedTitle("صندوق دریافتی");
        successMessage("عملیات با موفقیت انجام شد.");
        axios
          .post(
            `${api.api}/v1/extensions/default`,
            {
              personnel_id: personnelId,
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
            closeModalHandler();
          });
      });
  };

  return (
    <>
      <Overlay />
      {!notShowDeletebox ? (
        <SModal>
          {/* <ListStyles.CloseBadge
            onClick={closeModalHandler}
            src={Close}
            alt="Close"
          /> */}
          <ListStyles.DeleteContainer>
            <ListStyles.TopSide>
              <Typography size="lg" weight="light">
                درصورت لزوم توضیحات را وارد کنید
              </Typography>
              <ListStyles.BottomSide>
                <Typography size="lg" weight="light">
                  توضیحات:
                </Typography>
                <textarea
                  onChange={(e) => inputHandler(e)}
                  style={{ border: "1px solid lightgrey" }}
                />
              </ListStyles.BottomSide>
              <div>
                {/* <ConfirmButton onClick={confirmHandler} variant="bordered">
                  <Typography>تأیید</Typography>
                </ConfirmButton>
                <ConfirmButton onClick={closeModalHandler}>
                  <Typography>لغو</Typography>
                </ConfirmButton> */}
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
`;
