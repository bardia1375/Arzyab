/* eslint-disable react-hooks/exhaustive-deps */
// Components
import React, { useEffect, useState } from "react";
import LoadingSpinner from "components/common/publicTable/loading/LoadingSpinner";
import { useSelector } from "react-redux";
import moment from "moment-jalaali";
import { Typography } from "components/common";
import { setTraffic } from "routes/Auth/Module";
import { NewReqModal } from "components/layout/NewReqModal";
import { useRef } from "react";
import { PeriodModal } from "../../../../assets/styles/layout/modals/PeriodModal";
import { EditModal } from "../../../../assets/styles/layout/modals/EditModal";
import DatePicker from "components/common/datePickerMobile/month";

// Style
import { Traffics } from "assets/styles/home/traffics";

// Images
import Arrow from "assets/images/common/arrows/orange-arrow-down.svg";
import myApi from "config/axios";
import { errorMessage, successMessage } from "services/toast";
import { DeleteModal } from "components/common/DeleteModal";
import { DetailModal } from "../MyTraffics/DetailModal";
import Card from "components/common/Card";
import { TrafficModalTest } from "components/layout/TrafficModalTest";
import styled from "styled-components";
import { TrafficModalTest2 } from "components/layout/TrafficModalTest2";

export const MyClocking = () => {
  // States && Hooks
  moment.loadPersian({ dialect: "persian-modern" });
  const ref = useRef();

  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);

  const info = JSON.parse(localStorage.getItem("users"));

  const [trafficModal, setTrafficModal] = useState(true);
  const [loadingCheck, setLoadingCheck] = useState(false);
  const [locations, setLocations] = useState({});
  const [takeImage, setTakeImage] = useState("");
  // Getting types from api
  // useEffect(() => {
  //   myApi
  //     .get(`/v1/Types`, {
  //       headers: {
  //         Authorization: `Bearer ${Token}`,
  //       },
  //     })
  //     .then((res) => {
  //       setTypes(res.data.data.types);
  //     });
  // }, []);

  // Increasing page by one
  const increasePage = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 5000);
  }, [takeImage]);
  const trafficModalController = () => {
    if (trafficModal) {
      setTrafficModal(false);
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocations({
            lat: position.coords.latitude,
            long: position.coords.longitude,
          });
        },
        (error) => {
          setLocations({
            error: "دسترسی به موقعیت مکانی شما امکان پذیر نیست.",
          });
        }
      );
      setTrafficModal(true);
    }
  };
  console.log("takeImage", takeImage);
  // const presentHandler = (type=159, imageUrl) => {
  //   if (!!locations.error) {
  //     console.log("Location Error! :(");
  //   } else {
  //     if (
  //       !permission &&
  //       !image &&
  //       codeList.some((x) => x === info.CompanyCode)
  //     ) {
  //       setPermission(true);
  //       setCameraButton(true);
  //       setTypeKind(type);
  //     } else {
  //       let entryTypes = entryType === "in" ? "out" : "in";
  //       setLoading(true);
  //       loader(true);
  //       axios
  //         .get(
  //           `${api.api}/v1/ta/clockings?filter_groups[0][filters][0][key]=user_id&filter_groups[0][filters][0][value][0]=${info.UserId}&filter_groups[0][filters][0][operator]=in&sort[0][key]=datetime&sort[0][direction]=DESC&limit=1&page=0`,
  //           {
  //             headers: {
  //               Authorization: `Bearer ${token}`,
  //             },
  //           }
  //         )
  //         .then((res) => {
  //           if (
  //             res.data.data.clockings[0].datetime.split(" ")[1] ===
  //             jMoment().format("HH:mm:00")
  //           ) {
  //             errorMessage("!لطفا یک دقیقه منتظر بمانید");
  //             setImage(null);
  //             setLoading(false);
  //             loader(false);
  //           } else {
  //             dispatch(setTraffic(true));
  //             axios
  //               .post(
  //                 `${api.api}/v1/ta/clockings`,
  //                 {
  //                   clocking: {
  //                     latitude: locations.lat,
  //                     longitude: locations.long,
  //                     type_id: type,
  //                     user_id: info.UserId,
  //                     picture: imageUrl,
  //                     //   entry_type: type !== 159 ? "out" : entryTypes,
  //                     entry_type: entryTypes,
  //                     datetime: `${finallDate
  //                       .reverse()
  //                       .join("-")} ${date.getHours()}:${date.getMinutes()}`,
  //                     key: (
  //                       CRC32.str(
  //                         `*${info.UserId},${finallDate.reverse().join("-")},${
  //                           date.getHours() < 10
  //                             ? `0${date.getHours()}`
  //                             : date.getHours()
  //                         }:${
  //                           date.getMinutes() < 10
  //                             ? `0${date.getMinutes()}`
  //                             : date.getMinutes()
  //                         },${type},${
  //                           entryTypes === "in" ? "1" : "0"
  //                           // type !== 159 ? "0" : entryTypes === "in" ? "1" : "0"
  //                         },${!!locations.lat ? locations.lat : "35.66"},${
  //                           !!locations.long ? locations.long : "51.4"
  //                         }*`
  //                       ) >>> 0
  //                     ).toString(16),
  //                   },
  //                 },
  //                 {
  //                   headers: {
  //                     Authorization: `Bearer ${token}`,
  //                   },
  //                 }
  //               )
  //               .then((res) => {
  //                 if (199 < res.data.code && res.data.code < 400) {
  //                   setLoading(false);
  //                   loader(false);
  //                   dispatch(setTraffic(false));
  //                   setTrafficModal(false);
  //                   successMessage(".تردد شما با موفقیت ثبت شد");
  //                 } else {
  //                   setLoading(false);
  //                   loader(false);
  //                   dispatch(setTraffic(false));
  //                   setTrafficModal(false);
  //                   errorMessage(res.data.data.notice.message);
  //                 }
  //               });
  //           }
  //         });
  //     }
  //   }
  // };    

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        width: "100%",
        alignItems: "flex-end",
        justifyContent: "center",
      }}
    >
      {/* {returnModal && (
        <ReturnModal
          type={"مرخصی"}
          ReturnHandler={fetchReturnData}
          items={returnModal}
          onClose={setReturnModal}
        />
      )} */}{" "}
      {trafficModal && (
        <TrafficModalTest2
          setTakeImage={setTakeImage}
          setTrafficModal={setTrafficModal}
          trafficModal={trafficModal}
          loc={locations}
          loader={setLoadingCheck}
        />
      )}
      <Card height="calc(100vh - 250px)" margin="24px 0 0 0">
        <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
        </div>
      </Card>
    </div>
  );
};
