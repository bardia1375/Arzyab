// Components
import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { Typography } from "components/common";
import { PeriodModal } from "../../../../assets/styles/layout/modals/PeriodModal";
import LoadingSpinner from "components/common/publicTable/loading/LoadingSpinner";
import moment from "moment-jalaali";
import Fa from "config/fa.json";
import { fetchWorkReport } from "./Module";

// Styles
import { WorkReportStyle } from "assets/styles/home/work-report";

export const WorkReport = () => {
  const info = JSON.parse(localStorage.getItem("personsData"));
  moment.loadPersian({ dialect: "persian-modern" });
  const { Token } = useSelector((state) => state.auth);
  const { header, payload, loading } = useSelector((state) => state.workReport);
  const dispatch = useDispatch();
  const [selectedTitle, setSelectedTitle] = useState("ماه جاری");
  const [headerList, setHeaderList] = useState([]);
  const [payloadList, setPayloadList] = useState([]);
  const [showList, setShowList] = useState([]);
  const [periodModal, setPeriodModal] = useState(false);
  const [date, setDate] = useState({
    from: moment(moment().format("jYYYY/jMM/01"), "jYYYY/jMM/jDD").format(
      "YYYY-MM-DD"
    ),
    to: moment().format("YYYY-MM-DD"),
  });

  useEffect(() => {
    if (!!payload) {
      setPayloadList(payload);
    }
    if (!!header) {
      setHeaderList(header);
    }
  }, [header, payload]);

  function isEmpty(obj) {
    return Object.keys(obj).length === 0;
  }

  useEffect(() => {
    if (isEmpty(date)) {
      dispatch(
        fetchWorkReport(Token, {
          date_from: moment(
            moment().format("jYYYY/jMM/01"),
            "jYYYY/jMM/jDD"
          ).format("YYYY-MM-DD"),
          date_to: moment().format("YYYY-MM-DD"),
          year: "1401",
          positions: [info?.PositionId],
          type: "default",
        })
      );
    } else {
      dispatch(
        fetchWorkReport(Token, {
          date_from: date.from,
          date_to: date.to,
          year: "1401",
          positions: [info?.PositionId],
          type: "default",
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date]);

  useEffect(() => {
    if (payloadList?.length > 0 && headerList?.length > 0) {
      let list = payloadList.map((item) => {
        let payloadBody = Object.keys(item.payload).map((key, index) => {
          return {
            key: item.payload[key],
            value:
              Fa[
                headerList
                  .filter((item) => item.key === key)[0]
                  ?.value.replace(/_/g, " ")
              ] === undefined
                ? headerList
                    .filter((item) => item.key === key)[0]
                    ?.value.replace(/_/g, " ")
                : Fa[
                    headerList
                      .filter((item) => item.key === key)[0]
                      ?.value.replace(/_/g, " ")
                  ],
          };
        });
        return payloadBody;
      });
      setShowList(list);
    } else if (payloadList?.length === 0) {
      setShowList([]);
    }
  }, [headerList, payloadList]);

  return (
    <>
      {periodModal && (
        <PeriodModal
          setSelectedTitle={setSelectedTitle}
          setDate={setDate}
          onClose={setPeriodModal}
        />
      )}
      <WorkReportStyle.RequestBody style={{ marginTop: "80px" }}>
        <WorkReportStyle.RequestHeader>
          <WorkReportStyle.TitleStyle
            onClick={() => {
              if (selectedTitle !== "ماه جاری") {
                setSelectedTitle("ماه جاری");
                setDate({
                  from: moment(
                    moment().format("jYYYY/jMM/01"),
                    "jYYYY/jMM/jDD"
                  ).format("YYYY-MM-DD"),
                  to: moment().format("YYYY-MM-DD"),
                });
              }
            }}
            selected={selectedTitle === "ماه جاری"}
          >
            ماه جاری
          </WorkReportStyle.TitleStyle>
          <WorkReportStyle.TitleStyle
            onClick={() => {
              setSelectedTitle("دوره انتخابی");
              setPeriodModal(true);
            }}
            selected={selectedTitle === "دوره انتخابی"}
          >
            دوره انتخابی
          </WorkReportStyle.TitleStyle>
        </WorkReportStyle.RequestHeader>
        <WorkReportStyle.NewRequest>
          <div style={{ height: "100%", width: "100%" }}>
            {loading ? (
              <LoadingSpinner />
            ) : (
              <WorkReportStyle.ListOFRequests>
                {showList.map((item, index) => (
                  <WorkReportStyle.RequestCard key={index}>
                    <WorkReportStyle.RequestCardInfo>
                      {item.map((item, index) => (
                        <div key={index}>
                          <Typography size="base" color={"grey"}>
                            {item.entryType}{" "}
                            <span
                              style={{
                                color: "#E67205",
                                width: "100%",
                                textAlign: "center",
                              }}
                            >
                              {item.value}
                            </span>{" "}
                            : <span>{item.key}</span>
                          </Typography>
                        </div>
                      ))}
                      <div>
                        {item.status === "waiting" ? (
                          <WorkReportStyle.RequestCardStatusItem type="waiting">
                            در انتظار بررسی
                          </WorkReportStyle.RequestCardStatusItem>
                        ) : null}
                      </div>
                    </WorkReportStyle.RequestCardInfo>
                  </WorkReportStyle.RequestCard>
                ))}
              </WorkReportStyle.ListOFRequests>
            )}
          </div>
        </WorkReportStyle.NewRequest>
        <ToastContainer />
      </WorkReportStyle.RequestBody>
    </>
  );
};
