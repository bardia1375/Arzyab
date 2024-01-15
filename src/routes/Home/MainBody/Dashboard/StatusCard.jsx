import React from "react";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LoadingSpinner from "components/common/publicTable/loading/LoadingSpinner";
import { Traffics } from "assets/styles/home/traffics";
import moment from "moment-jalaali";
import { Typography } from "components/common";

// Styles
import { Dashboard } from "assets/styles/home/dashboard";

// Images
import Leave from "assets/images/common/dashboard/leave.svg";
import Mission from "assets/images/common/dashboard/mission.svg";
import piechart from "assets/images/common/dashboard/piechart-svgrepo.svg";
import plan from "assets/images/common/dashboard/plan-svgrepo.svg";
import DarkGreyWorkout from "assets/images/common/dashboard/grey-workout.svg";
import Arrow from "assets/images/common/arrows/red-down.svg";
import OrangeArrow from "assets/images/common/dashboard/orange-arrow.svg";
import LeftArrow from "assets/images/common/dashboard/left-arrow.svg";
import SelectedLeave from "assets/images/common/dashboard/selected-leave.svg";
import SelectedMission from "assets/images/common/dashboard/selected-mission.svg";
import SelectedWorkout from "assets/images/common/dashboard/selected-workout.svg";
import myApi from "config/axios";
import { useSelector } from "react-redux";
import Card from "components/common/Card";

function StatusCard({
  lastTraffics,
  lastLeaves,
  lastAssignments,
  setEditModal,
  selectedTitle,
  dayShow,
  monthShow,
  date,
  setRequestModal,
  selectedReport,
  setSelectedReport,
}) {
  // States && Hooks
  const navigate = useNavigate();
  const location = useLocation();
  const ref = useRef();
  const info = JSON.parse(localStorage.getItem("personsData"));
  const [dateLoading, setDateLoading] = useState(false);
  const { Token } = useSelector((state) => state.auth);
  const [collapse, setCollapse] = useState(false);
  const [lastShow, setLastShow] = useState(lastTraffics);
  const [openOption, setOpenOption] = useState("");
  const [types, setTypes] = useState(null);
  const TravelTime = localStorage.getItem("TravelTime");

  // Getting types from api
  useEffect(() => {
    myApi
      .get(`/v1/Types`, {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      })
      .then((res) => {
        setTypes(res.data.data.types);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Open collapse functionality with smooth effect
  function openCollapse() {
    setCollapse(!collapse);
    var growDiv = document.getElementById("grow");
    if (growDiv.clientHeight) {
      growDiv.style.height = 0;
    } else {
      var wrapper = document.querySelector(".measuringWrapper");
      growDiv.style.height = wrapper.clientHeight + "px";
    }
  }

  // Total time shown in collapse
  const totalTimeShow = () => {
    if (selectedTitle === "امروز") {
      if (selectedReport === "مرخصی‌ها") {
        return `${!!dayShow?.remain_leave ? dayShow?.remain_leave : "00:00"} |`;
      } else if (selectedReport === "کارکرد من") {
        return `${
          !!dayShow?.total_activity ? dayShow?.total_activity : "00:00"
        } |`;
      } else {
        return ``;
      }
    } else {
      if (selectedReport === "مرخصی‌ها") {
        return `${
          !!monthShow?.remain_leave ? monthShow?.remain_leave : "00:00"
        } |`;
      } else if (selectedReport === "کارکرد من") {
        return `${
          !!monthShow?.total_activity ? monthShow?.total_activity : "00:00"
        } |`;
      } else {
        return ``;
      }
    }
  };

  // Used time shown in collapse
  const usedTimeShow = () => {
    if (selectedTitle === "امروز") {
      if (selectedReport === "مرخصی‌ها") {
        return !!dayShow?.hourly_leave ? dayShow?.hourly_leave : "00:00";
      } else if (selectedReport === "کارکرد من") {
        return !!dayShow?.activity ? dayShow?.activity : "00:00";
      } else {
        return !!dayShow?.hourly_assignment
          ? dayShow?.hourly_assignment
          : "00:00";
      }
    } else {
      if (selectedReport === "مرخصی‌ها") {
        return !!monthShow?.hourly_leave ? monthShow?.hourly_leave : "00:00";
      } else if (selectedReport === "کارکرد من") {
        return !!monthShow?.activity ? monthShow?.activity : "00:00";
      } else {
        return !!monthShow?.hourly_assignment
          ? monthShow?.hourly_assignment
          : "00:00";
      }
    }
  };

  // Edit option handler for each traffic in collapse
  const optionHandler = (id) => {
    if (openOption === id) {
      setOpenOption("");
    } else {
      setOpenOption(id);
    }
  };

  // Auto close function for edit option of each traffic in collapse
  useEffect(() => {
    const closeOption = (e) => {
      if (ref.current && !ref.current.contains(e.target) && openOption) {
        setOpenOption(false);
      }
    };
    document.body.addEventListener("click", closeOption);
    return () => document.body.removeEventListener("click", closeOption);
  }, [openOption]);

  useEffect(() => {
    if (selectedReport === "کارکرد من") {
      setLastShow(lastTraffics);
    } else if (selectedReport === "مأموریت‌ها") {
      setLastShow(lastAssignments);
    } else {
      setLastShow(lastLeaves);
    }
  }, [selectedReport, lastTraffics, lastAssignments, lastLeaves]);
  const Timer = () => {
    const Time = TravelTime.split(":");
    return (
      <div>
        <span>{Time[0]}ساعت</span>
        <span>{Time[1]}دقیقه</span>
      </div>
    );
  };
  return (
    <Dashboard.StatusTypes>
      {location.pathname === "/home" ? (
        <Dashboard.StatusList>
          {[
            { title: "درخواست‌های من", Url: "/order" },
            // { title: "برنامه هفتگی", Url: "/weeklyPlan" },
            ,
          ].map((item, index) => (
            <Dashboard.StatusItem
              key={index}
              onClick={() => {
                navigate(item.Url);
                // setSelectedReport(item.title);
                // collapse && openCollapse();
                // setDateLoading(true);
                // setTimeout(() => {
                //   setDateLoading(false);
                // }, 500);
              }}
              selected={selectedReport === item.title}
            >
              {selectedReport === item.title ? (
                <img
                  style={{
                    width: `${item.title === "کارکرد من" ? "6vw" : "30px"}`,
                    maxWidth: `${item.title === "کارکرد من" ? "28px" : "30px"}`,
                  }}
                  src={
                    item.title === "درخواست‌های من"
                      ? SelectedLeave
                      : item.title === "زمان ارسال"
                      ? SelectedMission
                      : SelectedWorkout
                  }
                  alt=""
                />
              ) : (
                <img
                  style={{
                    width: `${item.title === "کارکرد من" ? "6vw" : "8vw"}`,
                    maxWidth: `${item.title === "کارکرد من" ? "28px" : "30px"}`,
                  }}
                  src={
                    item.title === "درخواست‌های من"
                      ? Leave
                      : item.title === "زمان ارسال"
                      ? Mission
                      : item.title === "سفارش ها"
                      ? piechart
                      : plan
                  }
                  alt=""
                />
              )}
              {item.title}
            </Dashboard.StatusItem>
          ))}
        </Dashboard.StatusList>
      ) : (
        <Card color={"#fff"} margin={"12px 0"} height={"100%"}>
          <div style={{ display: "flex", gap: "8px" }}>
            <div>مدت زمان سفر شما: </div>
            <div> {Timer()}</div>
          </div>
          <div> مسیر حرکتی شما در نقشه بالا با رنگ سبز مشخص شده است.</div>
        </Card>
      )}
      {/* <Dashboard.TotalTime>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "70%",
          }}
        >
          <Dashboard.TotalTimeNumber>
            {totalTimeShow()}
          </Dashboard.TotalTimeNumber>
          <Dashboard.TotalWorkNumber>
            {usedTimeShow()}
          </Dashboard.TotalWorkNumber>
        </div>
        {dateLoading ? (
          <div
            style={{
              display: "grid",
              placeItems: "center",
            }}
          >
            <LoadingSpinner size={30} />
          </div>
        ) : (
          <img
            style={{
              cursor: "pointer",
              rotate: `${collapse ? "180deg" : "0deg"}`,
              transition: "500ms",
            }}
            onClick={openCollapse}
            width={15}
            src={Arrow}
            alt=""
          />
        )}
      </Dashboard.TotalTime>

      <Dashboard.Collapse id="grow" collapse={collapse}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "20px",
            gap: "20px",
          }}
          className="measuringWrapper"
        >
          {dateLoading ? (
            <div
              style={{
                display: "grid",
                placeItems: "center",
              }}
            >
              <LoadingSpinner size={30} />
            </div>
          ) : (
            <>
              {selectedReport === "کارکرد من" && selectedTitle === "امروز" && (
                <>
                  <Dashboard.CollapseDetail>
                    <Dashboard.CollapseItem
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        color: "#353232",
                        gap: "5px",
                        borderBottom: "2px solid grey",
                        paddingBottom: "10px",
                        marginBottom: "10px",
                      }}
                    >
                      <img width={23} src={DarkGreyWorkout} alt="" />
                      <div>ساعت کارکرد {info?.Position}</div>
                    </Dashboard.CollapseItem>
                    <Dashboard.CollapseItem
                      style={{
                        display: "flex",
                        gap: "5px",
                        justifyContent: "center",
                        alignItems: "center",
                        color: "#353232",
                      }}
                    >
                      {dayShow?.countor?.working_hours?.length === 0 ? (
                        <div>ساعت کاری تعریف نشده.</div>
                      ) : (
                        ["شروع", "پایان", "مجموع"].map((item, index) => (
                          <div
                            key={index}
                            style={{
                              borderLeft: index !== 2 && "2px solid grey",
                              paddingLeft: index !== 2 && "5px",
                            }}
                          >
                            {item}{" "}
                            {index === 0
                              ? dayShow?.countor?.working_hours[0]?.from
                              : index === 1
                              ? dayShow?.countor?.working_hours[0]?.to
                              : dayShow?.countor?.working_hours[0]?.value}
                          </div>
                        ))
                      )}
                    </Dashboard.CollapseItem>
                  </Dashboard.CollapseDetail>
                  {(selectedTitle === "امروز"
                    ? dayShow?.countor?.items
                    : monthShow?.countor?.items
                  )?.map((item, index) => (
                    <Dashboard.CollapseDetail
                      key={index}
                      style={{
                        cursor: `${item.convert_to_writ ? "pointer" : "auto"}`,
                        backgroundColor: "white",
                        border: `1px solid ${item.color}`,
                        borderRadius: "32px",
                        maxWidth: "max-content",
                        padding: "10px 30px",
                      }}
                      onClick={() =>
                        item.convert_to_writ &&
                        setRequestModal({
                          type: "Edit",
                          item: {
                            date_from: moment(date, "jYYYY-jMM-jDD").format(
                              "YYYY-MM-DD"
                            ),
                            date_to: moment(date, "jYYYY-jMM-jDD").format(
                              "YYYY-MM-DD"
                            ),
                            timeFrom: item.from,
                            timeTo: item.to,
                            key: item.key,
                          },
                        })
                      }
                    >
                      <Dashboard.CollapseItem
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "5px",
                          color: item.color,
                        }}
                      >
                        {item.item} {item.value}
                        {item.item !== "کارکرد"
                          ? ` ( از ${item.from} تا ${item.to} )`
                          : ""}
                      </Dashboard.CollapseItem>
                    </Dashboard.CollapseDetail>
                  ))}
                </>
              )}

              <Dashboard.CollapseDetail
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                <Dashboard.CardTitle>
                  <div style={{ display: "flex", gap: "10px" }}>
                    <img src={LeftArrow} alt="" />
                    <span>
                      {selectedReport === "کارکرد من"
                        ? "ترددهای"
                        : selectedReport === "مأموریت‌ها"
                        ? "مأموریت‌های"
                        : "مرخصی‌های"}{" "}
                      {selectedTitle === "امروز" ? "من" : "ماه جاری"}
                    </span>
                  </div>
                  <span
                    onClick={() =>
                      setRequestModal({
                        type: "Edit",
                        item: {
                          title: "اصلاح تردد",
                          date_from:
                            date.split("-").length === 3
                              ? moment(date, "jYYYY-jMM-jDD").format(
                                  "YYYY-MM-DD"
                                )
                              : moment().format("YYYY-MM-DD"),
                          date_to:
                            date.split("-").length === 3
                              ? moment(date, "jYYYY-jMM-jDD").format(
                                  "YYYY-MM-DD"
                                )
                              : moment().format("YYYY-MM-DD"),
                        },
                      })
                    }
                    style={{ fontSize: "30px", cursor: "pointer" }}
                  >
                    +
                  </span>
                </Dashboard.CardTitle>
                {lastShow?.length === 0 ? (
                  <div style={{ textAlign: "center" }}>
                    {selectedReport === "کارکرد من"
                      ? "ترددی"
                      : selectedReport === "مأموریت‌ها"
                      ? "مأموریتی"
                      : "مرخصی‌"}{" "}
                    ثبت نشده است!
                  </div>
                ) : (
                  lastShow?.map((item, index) => (
                    <Traffics.RequestCard key={index}>
                      <Traffics.RequestCardInfo>
                        <div style={{ width: "100%" }}>
                          <div
                            style={{
                              display: "flex",
                              color: "#9c9c9c",
                              fontWeight: "400",
                              fontSize: "1.8vh",
                              alignItems: "center",
                            }}
                          >
                            {`${moment(
                              item.datetime ? item.datetime : item.date_from
                            ).format("dddd")} - ${moment(
                              item.datetime ? item.datetime : item.date_from
                            ).format("jYYYY/jMM/jDD")}`}{" "}
                            -{" "}
                            {moment(
                              item.datetime ? item.datetime : item.date_from
                            ).format("HH:mm:ss")}
                          </div>
                          <Typography size="base" color={"grey"}>
                            {item.entry_type === "out" ? "خروج" : "ورود"}{" "}
                            <span
                              style={{
                                color: "#E67205",
                                width: "100%",
                                textAlign: "center",
                              }}
                            >
                              {
                                types?.filter((x) => x.id === item.type_id)[0]
                                  .full_label
                              }
                            </span>
                          </Typography>
                        </div>
                        <div>
                          {item.status === "waiting" ? (
                            <Traffics.RequestCardStatusItem type="waiting">
                              در انتظار بررسی
                            </Traffics.RequestCardStatusItem>
                          ) : null}
                        </div>
                        {openOption && openOption === item.id && (
                          <Traffics.OptionMenu ref={ref}>
                            <Traffics.OptionItem
                              style={{
                                position: "relative",
                              }}
                              onClick={() => {
                                setEditModal(item);
                              }}
                            >
                              <div>ویرایش</div>
                            </Traffics.OptionItem>
                          </Traffics.OptionMenu>
                        )}
                        <Traffics.Option onClick={() => optionHandler(item.id)}>
                          ⋮
                        </Traffics.Option>
                      </Traffics.RequestCardInfo>
                    </Traffics.RequestCard>
                  ))
                )}
                <Dashboard.AllTrafficsButton
                  onClick={() =>
                    navigate(
                      `${
                        selectedReport === "کارکرد من"
                          ? "/"
                          : selectedReport === "مأموریت‌ها"
                          ? "/assignments"
                          : "/leaves"
                      }`
                    )
                  }
                  style={{ marginTop: "20px" }}
                >
                  همۀ{" "}
                  {selectedReport === "کارکرد من"
                    ? "ترددها"
                    : selectedReport === "مأموریت‌ها"
                    ? "مأموریت‌ها"
                    : "مرخصی‌ها"}
                  <img
                    style={{ position: "absolute", left: "20px" }}
                    src={OrangeArrow}
                    alt=""
                  />
                </Dashboard.AllTrafficsButton>
              </Dashboard.CollapseDetail>
            </>
          )}
        </div>
      </Dashboard.Collapse> */}
    </Dashboard.StatusTypes>
  );
}

export default StatusCard;
