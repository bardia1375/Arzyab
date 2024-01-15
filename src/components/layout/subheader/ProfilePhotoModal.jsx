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
import { useEffect } from "react";

export const ProfilePhotoModal = ({ onClose, image, setImage }) => {
  // Hooks

  // States
  // eslint-disable-next-line no-unused-vars
  const [deleteCause, setDeleteCause] = useState(null);
  const { Token } = useSelector((state) => state.auth);
  const [changeImage, setChangeImage] = useState({ queryImage: "" });
  // const [template, setTemplate] = useState(null);
  const info = JSON.parse(localStorage.getItem("personsData"));

  useEffect(() => {
    if (image !== null) {
      setChangeImage({ queryImage: image });
    }
  }, []);

  // Handlers
  const closeModalHandler = () => onClose(false);

  const deleteHandler = () => {
    setChangeImage({ queryImage: "" });
  };

  const photoHandler = (event) => {
    let reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);

    reader.onload = () => {
      setChangeImage({
        queryImage: reader.result,
      });
    };
    // if (event.target.files && event.target.files[0]) {
    //   setTemplate(event.target.files[0]);
    //   setChangeImage(URL.createObjectURL(event.target.files[0]));
    // } else {
    //   setChangeImage(null);
    // }
  };

  const confirmHandler = () => {
    axios
      .put(
        `${api.api}/v1/MobileApp/Users/Avatar/${info.UserId}`,
        {
          user: {
            profile: {
              avatar: JSON.stringify(changeImage.queryImage),
            },
          },
        },
        {
          headers: {
            Authorization: `Bearer ${Token}`,
          },
          params: {
            Id: info.UserId,
          },
        }
      )
      .then((res) => {
        setImage(changeImage.queryImage);
        window.localStorage.setItem(
          "personsData",
          JSON.stringify({
            ...info,
            Avatar: JSON.stringify(changeImage.queryImage),
          })
        );
        onClose(false);
      });
  };

  return (
    <>
      <Overlay />
      <SModal>
        <Body>
          <ListStyles.TopSide>
            <Typography size="lg" weight="light">
              جهت بارگذاری عکس برروی دایره کلیک کنید.
            </Typography>
            {!!changeImage.queryImage ? (
              <Label
                style={{
                  width: "115px",
                  height: "115px",
                  border: "2px solid #ff8080",
                  borderRadius: "50%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                }}
                htmlFor="file"
              >
                <img
                  style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                  src={changeImage.queryImage}
                  alt=""
                />
              </Label>
            ) : (
              <Label
                style={{
                  width: "115px",
                  height: "115px",
                  border: "2px solid #ff8080",
                  borderRadius: "50%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                }}
                htmlFor="file"
              >
                <h2>
                  {`${info?.FirstName}`.charAt(0)}{" "}
                  {`${info?.LastName}`.charAt(0)}
                </h2>
              </Label>
            )}
            <input
              id="file"
              type="file"
              accept="/image/*"
              style={{ visibility: "hidden" }}
              onChange={(event) => photoHandler(event)}
            />
            <div>
              {(!!changeImage.queryImage || image !== null) && (
                <RequestCardStatusItem
                  onClick={confirmHandler}
                  type="acceptButton"
                >
                  تأیید
                </RequestCardStatusItem>
              )}
              <RequestCardStatusItem onClick={deleteHandler} type="important">
                حذف
              </RequestCardStatusItem>
              <RequestCardStatusItem
                onClick={closeModalHandler}
                type="rejectButton"
              >
                لغو
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

export const Label = styled.label`
  img {
    display: none;
  }

  img[src] {
    display: block;
  }
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
