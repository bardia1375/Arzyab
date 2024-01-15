/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import api from "config/config.json";

// Components
import { Button } from "components/common";
import moment from "moment-jalaali";
import LoadingSpinner from "components/common/publicTable/loading/LoadingSpinner";

// Styled Elements
import styled from "styled-components";

export const DetailRequestModal = ({ setModalType, items }) => {
  console.log("items", items);
  const { Token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [approver, setApprover] = useState([]);
  const [key, setKey] = useState(null);
  moment.loadPersian({ dialect: "persian-modern" });

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${api.api}/v1/requests/${items.id}/state_diagram`, {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      })
      .then((res) => {
        setApprover(res.data.data.state_diagram);
        setLoading(false);
      });
    axios
      .get(
        `${api.api}/v1/requests/${items.id}?includes[0]=type.rule&includes[1]=senderUser.profile&includes[2]=senderPosition&includes[3]=values&includes[4]=writs&includes[5]=position&includes[6]=user.profile&includes[7]=form.fields`,
        // `${api.api}/v1/requests/received/${items.id}?includes%5B0%5D=request.type.rule&includes%5B1%5D=request.senderUser.profile&includes%5B2%5D=request.senderPosition&includes%5B3%5D=request.values&includes%5B4%5D=request.writs&includes%5B5%5D=request.position&includes%5B6%5D=request.user.profile&includes%5B7%5D=request.form.fields`,
        {
          headers: {
            Authorization: `Bearer ${Token}`,
          },
        }
      )
      .then((res) => {
        console.log("resres", res);
        setKey(res.data.data.request.key);
      });
  }, []);

  return (
    <>
      <Overlay />
      <Body>
        {loading ? (
          <LoadingSpinner />
        ) : key ? (
          <>
            <div
              style={{ width: "auto", margin: "20px", whiteSpace: "nowrap" }}
            >
              <CustomButton>
                <Span>{"درخواست : " + items?.title}</Span>
              </CustomButton>
            </div>
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
                    {items?.status === "accepted"
                      ? "تأیید شده"
                      : items?.status === "rejected"
                      ? "رد شده"
                      : "در انتظار بررسی"}
                  </Subject>
                </TitleBody>
                <TitleBody
                  style={{
                    flexDirection: "column",
                    alignItems: "flex-start",
                  }}
                >
                  <Title>کد درخواست</Title>

                  <Subject>{key}</Subject>
                </TitleBody>
                <div
                  style={{
                    borderBottom: "1px solid grey",
                    width: "100%",
                    margin: "10px 0",
                  }}
                />
                {items.date_from ? (
                  <TitleBody>
                    <Title>تاریخ شروع</Title>
                    <Subject>
                      {moment(items?.date_from, "YYYY-MM-DD").format(
                        "jYYYY-jMM-jDD"
                      )}
                    </Subject>
                  </TitleBody>
                ) : null}
                {items.date_to ? (
                  <TitleBody>
                    <Title>تاریخ پایان</Title>
                    <Subject style={{ transform: " translateY(2px)" }}>
                      {moment(items?.date_to, "YYYY-MM-DD").format(
                        "jYYYY-jMM-jDD"
                      )}
                    </Subject>
                  </TitleBody>
                ) : null}

                {items?.timeFrom ? (
                  <TitleBody>
                    <Title>زمان شروع</Title>
                    <Subject style={{ transform: " translateY(2px)" }}>
                      {items?.timeFrom}
                    </Subject>
                  </TitleBody>
                ) : null}
                {items?.timeTo ? (
                  <TitleBody>
                    <Title>زمان پایان</Title>
                    <Subject>{items?.timeTo}</Subject>
                  </TitleBody>
                ) : null}
                {items?.description ? (
                  <TitleBody style={{ alignItems: "flex-start" }}>
                    <Title>توضیحات</Title>
                    {items?.description}
                    {/* <Subject></Subject> */}
                  </TitleBody>
                ) : null}
              </WidthBody>
              <div
                style={{
                  width: "100%",
                  padding: "5px",
                }}
              >
                {approver?.map((item, index) => (
                  <div key={item.ApproverId}>
                    <Manager type={item.status}>
                      <div style={{ textAlign: "center", width: "100%" }}>
                        مرحله {index + 1}
                      </div>
                      <div
                        style={{
                          width: "100%",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <div>
                          {item?.position.name} :{" "}
                          {`${item?.user.first_name} ${item?.user.last_name}`}
                        </div>
                        {item.accepted_date ? (
                          <div
                            style={{
                              backgroundColor: "#4d4a4a",
                              padding: "6px",
                              borderRadius: "12px",
                            }}
                          >
                            {`${
                              item?.accepted_date?.split("T")[1]?.split(":")[0]
                            }:${
                              item?.accepted_date?.split("T")[1]?.split(":")[1]
                            }`}{" "}
                            {moment(
                              item?.accepted_date?.split("T")[0],
                              "YYYY-MM-DD"
                            ).format("jYYYY-jMM-jDD")}
                          </div>
                        ) : (
                          <div
                            style={{
                              backgroundColor: "#4d4a4a",
                              padding: "6px",
                              borderRadius: "12px",
                            }}
                          >
                            در انتظار بررسی
                          </div>
                        )}
                      </div>
                    </Manager>
                  </div>
                ))}
              </div>
            </div>
            <Button
              style={{ margin: "10px 0" }}
              variant="cancel"
              onClick={() => setModalType({ type: "", item: {} })}
            >
              بستن
            </Button>
          </>
        ) : (
          <div
            style={{
              position: "absolute",
              top: " 50%",
              left: " 50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            داده‌ای جهت نمایش وجود ندارد!
          </div>
        )}
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
