/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

// Components
import { Button } from "components/common";
import moment from "moment-jalaali";
import LoadingSpinner from "components/common/publicTable/loading/LoadingSpinner";

// Styled Elements
import styled from "styled-components";
import myApi from "config/axios";

// Images

const cause = {
  159: "عادی",
  162: "مرخصی",
  168: "مأموریت",
};

export const DetailModal = ({ onClose, items }) => {
  const [loading, setLoading] = useState(false);
  const [showData, setShowData] = useState(null);
  const { Token } = useSelector((state) => state.auth);
  moment.loadPersian({ dialect: "persian-modern" });

  useEffect(() => {
    setLoading(true);
    if (items) {
      myApi
        .get(`/v1/ta/clockings/${items}`, {
          headers: {
            Authorization: `Bearer ${Token}`,
          },
        })
        .then((res) => {
          setShowData(res.data.data.clocking);
          setLoading(false);
        });
    }
  }, [items]);

  return (
    <>
      <Overlay />
      <Body>
        <>
          <div style={{ width: "auto", margin: "20px", whiteSpace: "nowrap" }}>
            <CustomButton>
              {/* <Span>{"درخواست : " + items?.title}</Span> */}
              <Span>مشاهده جزییات</Span>
            </CustomButton>
          </div>
          {loading || showData === null ? (
            <LoadingSpinner />
          ) : (
            <>
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  overflow: "auto",
                }}
              >
                <WidthBody>
                  <TitleBody>
                    <Title>وضعیت درخواست</Title>
                    <Subject>
                      {showData?.status === "accepted"
                        ? "تأیید شده"
                        : showData?.status === "rejected"
                        ? "رد شده"
                        : "در انتظار بررسی"}
                    </Subject>
                  </TitleBody>
                  {showData?.entry_type ? (
                    <TitleBody>
                      <Title>نوع درخواست</Title>
                      <Subject>
                        {showData?.entry_type === "out" ? "خروج" : "ورود"}
                      </Subject>
                    </TitleBody>
                  ) : null}
                  {showData?.type_id ? (
                    <TitleBody>
                      <Title>علت درخواست</Title>
                      <Subject>{cause[showData?.type_id]}</Subject>
                    </TitleBody>
                  ) : null}
                  <TitleBody
                  // style={{ flexDirection: "column", alignItems: "flex-start" }}
                  >
                    <Title>کد درخواست</Title>

                    <Subject>{showData?.id}</Subject>
                  </TitleBody>
                  {showData?.datetime ? (
                    <TitleBody>
                      <Title>تاریخ ثبت درخواست</Title>
                      <Subject>
                        {moment(showData?.datetime, "YYYY-MM-DD").format(
                          "jYYYY-jMM-jDD"
                        )}
                      </Subject>
                    </TitleBody>
                  ) : null}
                  {showData?.date_from ? (
                    <TitleBody>
                      <Title>از تاریخ</Title>
                      <Subject>
                        {moment(showData?.date_from, "YYYY-MM-DD").format(
                          "jYYYY-jMM-jDD"
                        )}
                      </Subject>
                    </TitleBody>
                  ) : null}
                  {showData?.date_to ? (
                    <TitleBody>
                      <Title>تا تاریخ</Title>
                      <Subject>
                        {moment(showData?.date_to, "YYYY-MM-DD").format(
                          "jYYYY-jMM-jDD"
                        )}
                      </Subject>
                    </TitleBody>
                  ) : null}
                  {showData?.time_from ? (
                    <TitleBody>
                      <Title>از ساعت</Title>
                      <Subject>
                        {moment(showData?.time_from, "YYYY-MM-DD").format(
                          "jYYYY-jMM-jDD"
                        )}
                      </Subject>
                    </TitleBody>
                  ) : null}
                  {showData?.time_to ? (
                    <TitleBody>
                      <Title>تا ساعت</Title>
                      <Subject>
                        {moment(showData?.time_to, "YYYY-MM-DD").format(
                          "jYYYY-jMM-jDD"
                        )}
                      </Subject>
                    </TitleBody>
                  ) : null}

                  <div
                    style={{
                      borderBottom: "1px solid grey",
                      width: "100%",
                      margin: "10px 0",
                    }}
                  />
                </WidthBody>
                {showData?.picture ? (
                  <div
                    style={{
                      textAlign: "center",
                      transform: "scaleX(-1)",
                      WebkitTransform: "scaleX(-1)",
                    }}
                  >
                    <ImageTest src={showData?.picture} alt="selfie" />
                  </div>
                ) : (
                  <div
                    style={{
                      textAlign: "center",
                    }}
                  >
                    <span>تصویری ثبت نشده است</span>
                  </div>
                )}
              </div>
              <Button
                style={{ margin: "10px 0" }}
                variant="cancel"
                onClick={() => onClose(null)}
              >
                بستن
              </Button>
            </>
          )}
        </>
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
  height: 80%;
  width: 90vw;
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
  border-radius: 20px;
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
  padding: 0 10px;
  line-height: 25px;
  & > img {
    width: 15px;
    position: absolute;
    left: ${({ left }) => (left ? left : "none")};
    right: ${({ right }) => (right ? right : "none")};
  }
`;

export const WidthBody = styled.div`
  padding: 20px;
  width: 100%;
  /* height: 300vh; */
  /* overflow: auto; */
`;

export const Span = styled.span`
  font-size: 5vw;
  @media (min-width: 500px) {
    font-size: 20px;
  }
`;

export const Manager = styled.div`
  /* width: 95%; */
  display: flex;
  background-color: ${({ type }) =>
    type === "rejected" ? "red" : type === "accepted" ? "#0a9132" : "#fd8802"};
  border: 1px solid
    ${({ type }) =>
      type === "rejected"
        ? "#eb2727"
        : type === "waiting"
        ? "#ff9419"
        : "#03c23d"};
  color: #e0e0e0;
  padding: 5px;
  border-radius: 16px;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
  /* position: absolute; */
  bottom: 60px;
  font-size: 3vw;
  margin: 5px 0;
  @media (min-width: 500px) {
    font-size: 15px;
  }
`;

export const Title = styled.span`
  font-weight: bold;
  font-size: 4vw;
  @media (min-width: 500px) {
    font-size: 15px;
  }
`;

export const Subject = styled.span`
  font-size: 4vw;
  @media (min-width: 500px) {
    font-size: 15px;
  }
`;

export const TitleBody = styled.div`
  display: flex;
  align-items: center;
  margin: 5px 0;
  gap: 10px;
`;

export const ImageTest = styled.img`
  width: 320px;
  height: 240px;
  object-fit: contain;
`;
