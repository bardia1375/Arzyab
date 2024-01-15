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

export const MyWeeklyPlan = () => {
  // States && Hooks
  moment.loadPersian({ dialect: "persian-modern" });
  const ref = useRef();
  const [selectedTitle, setSelectedTitle] = useState("ترددهای من");
  const { Token, Traffic } = useSelector((state) => state.auth);
  const [requestList, setRequestList] = useState([]);
  const [showList, setShowList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [amount, setAmount] = useState(0);
  const [requestModal, setRequestModal] = useState(false);
  const [openOption, setOpenOption] = useState("");
  const [editModal, setEditModal] = useState(null);
  const [periodModal, setPeriodModal] = useState(false);
  const [types, setTypes] = useState(null);
  const [deleteModal, setDeleteModal] = useState(null);
  const [returnModal, setReturnModal] = useState(null);
  const [detailModal, setDetailModal] = useState(null);
  const info = JSON.parse(localStorage.getItem("personsData"));
  const [date, setDate] = useState({
    // from: moment(moment().format("jYYYY/jMM/01"), "jYYYY/jMM/jDD").format(
    //   "YYYY-MM-DD"
    // ),
    // to: moment().format("YYYY-MM-DD"),
  });

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

  // Fetch data from api
  useEffect(() => {
    setLoading(true);
    myApi
      .get(`/v1/Types`, {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      })
      .then((res) => {
        setTypes(res.data.data.types);
        myApi
          .get(
            `/v1/MobileApp/GetMyLeave?filter_groups[0][filters][0][key]=user_id&filter_groups[0][filters][0][value][0]=${info.UserId}&filter_groups[0][filters][0][operator]=in&sort[0][key]=datetime&sort[0][direction]=DESC&limit=10&page=0`,
            {
              headers: {
                Authorization: `Bearer ${Token}`,
              },
            }
          )
          .then((res) => {
            setAmount(res.data.meta.total_pages - 1);
            setRequestList(res.data.data);
            setLoading(false);
          });
      });
  }, [Traffic]);
  // }, [Traffic, editModal, returnModal, deleteModal]);

  // Control pagination
  useEffect(() => {
    if (page > 0) {
      setLoading(true);
      if (!!date.from) {
        myApi
          .get(
            `/v1/MobileApp/GetMyLeave?filter_groups[0][filters][1][key]=datetime&filter_groups[0][filters][1][value][0]=${date.from} 00:00:00&filter_groups[0][filters][1][value][1]=${date.to} 23:59:59&filter_groups[0][filters][1][operator]=bt&sort[0][key]=datetime&sort[0][direction]=DESC&limit=10&page=${page}`,
            {
              headers: {
                Authorization: `Bearer ${Token}`,
              },
            }
          )
          .then((res) => {
            setAmount(res.data.meta.total_pages - 1);
            setRequestList([...requestList, ...res.data.data]);
            setLoading(false);
          });
      } else {
        myApi
          .get(
            `/v1/MobileApp/GetMyLeave?filter_groups[0][filters][0][key]=user_id&filter_groups[0][filters][0][value][0]=${info.UserId}&filter_groups[0][filters][0][operator]=in&sort[0][key]=datetime&sort[0][direction]=DESC&limit=10&page=${page}`,
            {
              headers: {
                Authorization: `Bearer ${Token}`,
              },
            }
          )
          .then((res) => {
            setAmount(res.data.meta.total_pages - 1);
            setRequestList([...requestList, ...res.data.data]);
            setLoading(false);
          });
      }
    }
  }, [page]);

  // Setting data shown
  useEffect(() => {
    setLoading(true);
    setTraffic(true);
    if (requestList.length > 0 && types) {
      let list = requestList.map((item) => {
        return {
          id: item.id,
          date_from: item.date_from,
          date_to: item.date_to,
          time_from: item.time_from,
          time_to: item.time_to,
          // entryType: types?.filter((x) => x.id === item.type_id)[0].full_label,
          entryCause: types?.filter((x) => x.id === item.type_id)[0].full_label,
          status: item.status,
          deleted_at: item.deleted_at,
        };
      });
      setLoading(false);
      setTraffic(false);
      setShowList(list);
    } else if (requestList.length === 0) {
      setLoading(false);
      setTraffic(false);
      setShowList([]);
    }
  }, [requestList]);

  // Increasing page by one
  const increasePage = () => {
    setPage(page + 1);
  };

  // Option handler for each card
  const optionbHandler = (id) => {
    if (openOption === id) {
      setOpenOption("");
    } else {
      setOpenOption(id);
    }
  };

  // Auto close functionality for option
  useEffect(() => {
    const closeDropDown = (e) => {
      if (ref.current && !ref.current.contains(e.target) && openOption) {
        setOpenOption(false);
      }
    };
    document.body.addEventListener("click", closeDropDown);
    return () => document.body.removeEventListener("click", closeDropDown);
  }, [openOption]);

  // Getting data from api with selected title
  useEffect(() => {
    setLoading(true);
    if (!!date.from) {
      myApi
        .get(
          `/v1/MobileApp/GetMyLeave?filter_groups[0][filters][1][key]=datetime&filter_groups[0][filters][1][value][0]=${date.from} 00:00:00&filter_groups[0][filters][1][value][1]=${date.to} 23:59:59&filter_groups[0][filters][1][operator]=bt&sort[0][key]=datetime&sort[0][direction]=DESC&limit=10&page=0`,
          {
            headers: {
              Authorization: `Bearer ${Token}`,
            },
          }
        )
        .then((res) => {
          setAmount(res.data.meta.total_pages - 1);
          setPage(0);
          setRequestList(res.data.data);
          setLoading(false);
        });
    } else if (selectedTitle === "ترددهای من") {
      myApi
        .get(
          `/v1/MobileApp/GetMyLeave?filter_groups[0][filters][0][key]=user_id&filter_groups[0][filters][0][value][0]=${info.UserId}&filter_groups[0][filters][0][operator]=in&sort[0][key]=datetime&sort[0][direction]=DESC&limit=10&page=0`,
          {
            headers: {
              Authorization: `Bearer ${Token}`,
            },
          }
        )
        .then((res) => {
          setAmount(res.data.meta.total_pages - 1);
          setPage(0);
          setRequestList(res.data.data);
          setLoading(false);
        });
    }
  }, [date, selectedTitle, editModal, returnModal, deleteModal]);

  // Delete traffic api call
  const fetchDeleteData = (id) => {
    myApi
      .delete(
        `/V1/Ta/Writs/${id}`,
        // {
        //   Id: id,
        // },
        {
          headers: {
            Authorization: `Bearer ${Token}`,
          },
        }
      )
      .then((res) => {
        if (res.data.code === 200) {
          successMessage(res.data.message);
        } else {
          errorMessage(res.data.data.notice.message);
        }
        setDeleteModal(null);
      });
  };

  return (
    <div>
 
      <Traffics.RequestBody style={{ marginTop: "80px" }}>
        <Card>
          <DatePicker />
        </Card>
      </Traffics.RequestBody>
    </div>
  );
};
