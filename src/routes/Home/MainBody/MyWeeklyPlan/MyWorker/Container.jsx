import Card from "components/common/Card";
import { Field } from "components/common/Field";
import React, { useEffect, useState } from "react";
import profile from "assets/images/profilephoto/302321278.jpg";
import { Button, Dropdown } from "components/common";
import { useNavigate, useParams } from "react-router";
import moment from "moment";

export const MyWorker = () => {
  const today = new Date();
  const { id } = useParams();
  console.log(id);
  const x = JSON.parse(localStorage.getItem("users"));
  const Users = x?.filter((res) => res?.Date == id)[0]?.persons;
  const [itemDropdown, setItemDropdown] = useState([]);

  const worker = Users?.filter((el) => el?.location === itemDropdown);

  const setSelectedState = (item) => {
    setItemDropdown(item.Title);
  };
  const workerHandler = () => {
    console.log("worker", Users);
    console.log("worker", worker);
    return worker?.map((el) => (
      <Card color="#def0f2">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "8px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              gap: "8px",
            }}
          >
            <img
              src={profile}
              width="50px"
              height="50px"
              style={{
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            />
            <div>
              <h4>{el.name}</h4>
              <p>{el.code}</p>
            </div>
          </div>
          <div
            style={{
              background: `${
                el.State === "تایید"
                  ? "#27C29B"
                  : el.State === "عدم تایید"
                  ? "#FA4B24"
                  : "#FFBF00"
              }`,
              borderRadius: "8px",
              padding: "4px 16px",
              color: "#fff",
            }}
          >
            {el.State}
          </div>
        </div>
      </Card>
    ));
  };
  return (
    <div
      style={{
        height: "100%",
      }}
    >
      <Card height="calc(100vh - 250px)" margin="24px 0 0 0">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          {/* <Field
            type={"dropdown"}
            label={"انتخاب محدوده"}
            firstData={"انتخاب کنید"}
            dropData={["بهشتی", "شریعتی", "ولی‌عصر"]}
          ></Field> */}
          <Dropdown
            type={"عمومی"}
            title={"انتخاب محدوده"}
            firstData={"انتخاب کنید"}
            setSelectedState={setSelectedState}
            dropData={[
              { id: 0, Title: "بهشتی" },
              { id: 1, Title: "شریعتی" },
              { id: 2, Title: "ولی‌عصر" },
            ]}
          />
          {worker?.length !== 0 ? (
            workerHandler()
          ) : (
            <div
              style={{
                position: "absolute",
                top: "50%" /* position the top  edge of the element at the middle of the parent */,
                left: " 50%" /* position the left edge of the element at the middle of the parent */,

                transform: "translate(-50%, -50%)",
              }}
            >
              داده‌ای جهت نمایش وجود ندارد
            </div>
          )}
          {/* <Card color="#def0f2">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "8px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  gap: "8px",
                }}
              >
                <img
                  src={profile}
                  width="50px"
                  height="50px"
                  style={{
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                />
                <div>
                  <h4>علی مرتضوی</h4>
                  <p>398</p>
                </div>
              </div>
              <div
                style={{
                  background: "#27C29B",
                  borderRadius: "8px",
                  padding: "4px 16px",
                  color: "#fff",
                }}
              >
                تایید
              </div>
            </div>
          </Card>
          <Card color="#def0f2">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "8px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  gap: "8px",
                }}
              >
                <img
                  src={profile}
                  width="50px"
                  height="50px"
                  style={{
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                />
                <div>
                  <h4>رضا موسوی</h4>
                  <p>398</p>
                </div>
              </div>
              <div
                style={{
                  background: "#FA4B24",
                  borderRadius: "8px",
                  padding: "4px 16px",
                  color: "#fff",
                }}
              >
                عدم تایید
              </div>
            </div>
          </Card>
          <Card color="#def0f2">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "8px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  gap: "8px",
                }}
              >
                <img
                  src={profile}
                  width="50px"
                  height="50px"
                  style={{
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                />
                <div>
                  <h4>رضا موسوی</h4>
                  <p>398</p>
                </div>
              </div>
              <div
                style={{
                  background: "#FA4B24",
                  borderRadius: "8px",
                  padding: "4px 16px",
                  color: "#fff",
                }}
              >
                عدم تایید
              </div>
            </div>
          </Card>
          <Card color="#def0f2">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "8px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  gap: "8px",
                }}
              >
                <img
                  src={profile}
                  width="50px"
                  height="50px"
                  style={{
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                />
                <div>
                  <h4>رضا موسوی</h4>
                  <p>398</p>
                </div>
              </div>
              <div
                style={{
                  background: "#FA4B24",
                  borderRadius: "8px",
                  padding: "4px 16px",
                  color: "#fff",
                }}
              >
                عدم تایید
              </div>
            </div>
          </Card>
          <Card color="#def0f2">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "8px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  gap: "8px",
                }}
              >
                <img
                  src={profile}
                  width="50px"
                  height="50px"
                  style={{
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                />
                <div>
                  <h4>علی مرتضوی</h4>
                  <p>398</p>
                </div>
              </div>
              <div
                style={{
                  background: "#FFBF00",
                  borderRadius: "8px",
                  padding: "4px 16px",
                  color: "#fff",
                }}
              >
                در انتظار بررسی
              </div>
            </div>
          </Card>
          <Card color="#def0f2">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "8px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  gap: "8px",
                }}
              >
                <img
                  src={profile}
                  width="50px"
                  height="50px"
                  style={{
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                />
                <div>
                  <h4>علی مرتضوی</h4>
                  <p>398</p>
                </div>
              </div>
              <div
                style={{
                  background: "#27C29B",
                  borderRadius: "8px",
                  padding: "4px 16px",
                  color: "#fff",
                }}
              >
                تایید
              </div>
            </div>
          </Card>
          <Card color="#def0f2">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "8px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  gap: "8px",
                }}
              >
                <img
                  src={profile}
                  width="50px"
                  height="50px"
                  style={{
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                />
                <div>
                  <h4>علی مرتضوی</h4>
                  <p>398</p>
                </div>
              </div>
              <div
                style={{
                  background: "#27C29B",
                  borderRadius: "8px",
                  padding: "4px 16px",
                  color: "#fff",
                }}
              >
                تایید
              </div>
            </div>
          </Card> */}
        </div>
      </Card>
    </div>
  );
};
