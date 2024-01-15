import Card from "components/common/Card";
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { useLocation, useNavigate } from "react-router-dom";
import profile from "assets/images/profilephoto/302321278.jpg";
import { Field } from "components/common/Field";
import { Dropdown } from "components/common";

export const MyDiagramInfo = () => {
  // Data for the pie chart
  const navigate = useNavigate();
  const { state } = useLocation();
  const date = localStorage.getItem("date");

  const { Title } = state; // Read values passed on state
  console.log("TitleTitle", Title);
  const setSelectedState = (data) => {
    if (data.Title == "ماموریت") {
      navigate("/diagram/misiion", { state: { Title: "ماموریت", date } });
    } else if (data.Title == "حضور") {
      navigate("/diagram/present", { state: { Title: "حضور", date } });
    } else if (data.Title == "مرخصی") {
      navigate("/diagram/leave", { state: { Title: "مرخصی", date } });
    } else if (data.Title == "غیبت") {
      navigate("/diagram/absence", { state: { Title: "غیبت", date } });
    }
  };
  const x = JSON.parse(localStorage.getItem("users"));
  const info = x?.filter((res) => res?.Date == date)[0]?.persons;

  console.log("datedatedate", date);
  console.log("infoinfoinfo", info);
  const [AttendaceArray, setAttendaceArray] = useState([]);
  useEffect(() => {
    const Attendace = info.filter((el) => el.Attendance === Title);
    setAttendaceArray(Attendace);
  }, [Title]);
  const PersonelsHandler = () => {
    return AttendaceArray.map((Personel) => (
      <Card color="#def0f2">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            // background: "rgb(0, 227, 150)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <img
              src={profile}
              width="50px"
              height="50px"
              style={{
                borderRadius: "50%",
              }}
            />

            <div
              style={{
                textAlign: "center",
              }}
            >
              <h4>{Personel.name}</h4>
              <p>کدپرسنلی: {Personel.Code} </p>
            </div>
          </div>
        </div>
      </Card>
    ));
  };

  return (
    <div>
      <Card height="calc(100vh - 250px)" margin="24px 0 0 0">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          <Dropdown
            type={"عمومی"}
            title={"انتخاب وضعیت"}
            firstData={"انتخاب کنید"}
            setSelectedState={setSelectedState}
            dropData={[
              { id: 0, Title: "حضور" },
              { id: 1, Title: "مرخصی" },
              { id: 2, Title: "ماموریت" },
              { id: 3, Title: "غیبت" },
            ]}
          />
          {/* <div style={{ position: "absolute", top: "8px", right: "20px" }}>
            <span>{date}</span>
          </div> */}

          {AttendaceArray.length !== 0 ? (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr ",
                gap: "8px",
              }}
            >
              {PersonelsHandler()}
            </div>
          ) : (
            <div
              style={{
                position: "absolute",
                top: "50%" /* position the top  edge of the element at the middle of the parent */,
                left: " 50%" /* position the left edge of the element at the middle of the parent */,

                transform: "translate(-50%, -50%)",
              }}
            >
              داده ای جهت نمایش وجود ندارد.
            </div>
          )}
        </div>
      </Card>{" "}
    </div>
  );
};
