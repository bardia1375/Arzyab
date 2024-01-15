// Components
import { useState } from "react";

// Styles
import { Widgets } from "assets/styles/home/widget";

// Images
import Leave from "assets/images/common/dashboard/leave.svg";
import SelectedLeave from "assets/images/common/dashboard/selected-leave.svg";
import SelectedMission from "assets/images/common/dashboard/selected-mission.svg";
import SelectedWorkout from "assets/images/common/dashboard/selected-workout.svg";
import Mission from "assets/images/common/dashboard/mission.svg";
import Workout from "assets/images/common/dashboard/workout.svg";
import Arrow from "assets/images/common/arrows/red-down.svg";

export const WorkReport = () => {
  // States && Hooks
  const [selectedTitle, setSelectedTitle] = useState("");
  const [selectedReport, setSelectedReport] = useState("مرخصی‌ها");

  const convertToSeconds = (time) => {
    const arr = time.split(":");
    let x = 0;
    arr.map((item, index) => (x += item * (3600 / 60 ** index)));
    return x;
  };

  function toDateTime(totalSeconds) {
    const totalMinutes = Math.floor(totalSeconds / 60);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}:${(minutes + "").length === 1 ? `0${minutes}` : minutes}`;
  }

  const total = "36:00";
  const worked = "16:00";
  const absent = "02:00";
  const notWorked =
    convertToSeconds(total) -
    (convertToSeconds(worked) + convertToSeconds(absent));

  return (
    <Widgets.DashboardBody>
      <div
        style={{
          height: "100%",
          overflowY: "auto",
          overflowX: "hidden",
          padding: "10px",
        }}
      >
        <Widgets.DashboardHeader>
          <Widgets.TitleStyle
            onClick={() => {
              setSelectedTitle("امروز");
            }}
            selected={selectedTitle === "امروز"}
          >
            امروز
          </Widgets.TitleStyle>
          <Widgets.TitleStyle
            selected={selectedTitle === "این ماه"}
            onClick={() => {
              setSelectedTitle("این ماه");
            }}
          >
            این ماه
          </Widgets.TitleStyle>
        </Widgets.DashboardHeader>
        <div
          style={{ display: "flex", justifyContent: "center", width: "100%" }}
        >
          <Widgets.Widget>
            <Widgets.HeaderWidget>
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                }}
              >
                <div
                  style={{
                    border: "1px solid #e4e4e4",
                    borderBottom: "none",
                    borderTopLeftRadius: "1.5vh",
                    borderTopRightRadius: "1.5vh",
                    width: "100%",
                    height: "50%",
                  }}
                />
              </div>
            </Widgets.HeaderWidget>
            <Widgets.UpperWidget
              selectedReport={selectedReport}
              height={(notWorked / convertToSeconds(total)) * 100}
            >
              {toDateTime(notWorked)}
            </Widgets.UpperWidget>
            <Widgets.LowerWidget
              selectedReport={selectedReport}
              height={
                (convertToSeconds(worked) / convertToSeconds(total)) * 100
              }
            >
              {worked}
            </Widgets.LowerWidget>
          </Widgets.Widget>
        </div>
        <Widgets.StatusTypes>
          <Widgets.StatusList>
            <Widgets.StatusItem
              onClick={() => {
                setSelectedReport("مرخصی‌ها");
              }}
              selected={selectedReport === "مرخصی‌ها"}
            >
              {selectedReport === "مرخصی‌ها" ? (
                <img
                  style={{ fill: "red" }}
                  width={40}
                  src={SelectedLeave}
                  alt=""
                />
              ) : (
                <img style={{ fill: "red" }} width={40} src={Leave} alt="" />
              )}
              مرخصی‌ها
            </Widgets.StatusItem>
            <Widgets.StatusItem
              onClick={() => {
                setSelectedReport("کارکرد من");
              }}
              selected={selectedReport === "کارکرد من"}
            >
              {selectedReport === "کارکرد من" ? (
                <img
                  style={{ fill: "red" }}
                  width={28}
                  src={SelectedWorkout}
                  alt=""
                />
              ) : (
                <img width={28} src={Workout} alt="" />
              )}
              کارکرد من
            </Widgets.StatusItem>
            <Widgets.StatusItem
              onClick={() => {
                setSelectedReport("مأموریت‌ها");
              }}
              selected={selectedReport === "مأموریت‌ها"}
            >
              {selectedReport === "مأموریت‌ها" ? (
                <img
                  style={{ fill: "red" }}
                  width={40}
                  src={SelectedMission}
                  alt=""
                />
              ) : (
                <img width={40} src={Mission} alt="" />
              )}
              مأموریت‌ها
            </Widgets.StatusItem>
          </Widgets.StatusList>
          <Widgets.TotalTime>
            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
              }}
            >
              <div
                style={{
                  fontSize: "20px",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  transform: "translateY(8px)",
                  color: "grey",
                }}
              >
                85:00 |
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-end",
                  fontSize: "50px",
                  color: "#ff4d4d",
                }}
              >
                78:12
              </div>
            </div>
            <img width={15} src={Arrow} alt="" />
          </Widgets.TotalTime>
        </Widgets.StatusTypes>
      </div>
    </Widgets.DashboardBody>
  );
};
