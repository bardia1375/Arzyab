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

// Style
import { Traffics } from "assets/styles/home/traffics";

// Images
import Arrow from "assets/images/common/arrows/orange-arrow-down.svg";
import myApi from "config/axios";
import { DeleteModal } from "components/common/DeleteModal";
import { errorMessage, successMessage } from "services/toast";
import { ReturnModal } from "components/common/ReturnModal";
import { DetailModal } from "./DetailModal";

const cause = {
  159: "عادی",
  162: "مرخصی",
  168: "مأموریت",
};
export const MyTraffics = () => {
  // States && Hooks
  moment.loadPersian({ dialect: "persian-modern" });
  const ref = useRef();
  const [selectedTitle, setSelectedTitle] = useState("ترددهای من");
  const { Token, Traffic, Permission } = useSelector((state) => state.auth);
  const [requestList, setRequestList] = useState([]);
  const [showList, setShowList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [amount, setAmount] = useState(0);
  const [requestModal, setRequestModal] = useState(false);
  const [openOption, setOpenOption] = useState("");
  const [editModal, setEditModal] = useState(null);
  const [periodModal, setPeriodModal] = useState(false);
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

  // Fetch data from api
  useEffect(() => {
    setLoading(true);
    myApi
      .get(
        `/v1/ta/clockings?filter_groups[0][filters][0][key]=user_id&filter_groups[0][filters][0][value][0]=${info.UserId}&filter_groups[0][filters][0][operator]=in&sort[0][key]=datetime&sort[0][direction]=DESC&limit=10&page=0`,
        {
          headers: {
            Authorization: `Bearer ${Token}`,
          },
        }
      )
      .then((res) => {
        setAmount(res.data.meta?.total_pages - 1);
        setRequestList(res.data?.data?.clockings);
        setLoading(false);
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
            `/v1/ta/clockings?filter_groups[0][filters][1][key]=datetime&filter_groups[0][filters][1][value][0]=${date.from} 00:00:00&filter_groups[0][filters][1][value][1]=${date.to} 23:59:59&filter_groups[0][filters][1][operator]=bt&sort[0][key]=datetime&sort[0][direction]=DESC&limit=10&page=${page}`,
            {
              headers: {
                Authorization: `Bearer ${Token}`,
              },
            }
          )
          .then((res) => {
            setAmount(res.data.meta?.total_pages - 1);
            setRequestList([...requestList, ...res.data?.data?.clockings]);
            setLoading(false);
          });
      } else {
        myApi
          .get(
            `/v1/ta/clockings?filter_groups[0][filters][0][key]=user_id&filter_groups[0][filters][0][value][0]=${info.UserId}&filter_groups[0][filters][0][operator]=in&sort[0][key]=datetime&sort[0][direction]=DESC&limit=10&page=${page}`,
            {
              headers: {
                Authorization: `Bearer ${Token}`,
              },
            }
          )
          .then((res) => {
            setAmount(res.data.meta?.total_pages - 1);
            setRequestList([...requestList, ...res.data?.data?.clockings]);
            setLoading(false);
          });
      }
    }
  }, [page]);

  // Setting data shown
  useEffect(() => {
    setLoading(true);
    setTraffic(true);
    if (requestList.length > 0) {
      let list = requestList.map((item) => {
        return {
          id: item.id,
          date: item.datetime,
          entryType: item.entry_type === "out" ? "خروج" : "ورود",
          entryCause: cause[item.type_id],
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
          `/v1/ta/clockings?filter_groups[0][filters][1][key]=datetime&filter_groups[0][filters][1][value][0]=${date.from} 00:00:00&filter_groups[0][filters][1][value][1]=${date.to} 23:59:59&filter_groups[0][filters][1][operator]=bt&sort[0][key]=datetime&sort[0][direction]=DESC&limit=10&page=0`,
          {
            headers: {
              Authorization: `Bearer ${Token}`,
            },
          }
        )
        .then((res) => {
          setAmount(res.data.meta?.total_pages - 1);
          setPage(0);
          setRequestList(res.data?.data?.clockings);
          setLoading(false);
        });
    } else if (selectedTitle === "ترددهای من") {
      myApi
        .get(
          `/v1/ta/clockings?filter_groups[0][filters][0][key]=user_id&filter_groups[0][filters][0][value][0]=${info.UserId}&filter_groups[0][filters][0][operator]=in&sort[0][key]=datetime&sort[0][direction]=DESC&limit=10&page=0`,
          {
            headers: {
              Authorization: `Bearer ${Token}`,
            },
          }
        )
        .then((res) => {
          setAmount(res.data.meta?.total_pages - 1);
          setPage(0);
          setRequestList(res.data?.data?.clockings);
          setLoading(false);
        });
    }
  }, [date, selectedTitle, deleteModal, editModal, returnModal]);

  // Delete traffic api call
  const fetchDeleteData = (id) => {
    myApi
      .delete(
        `/V1/Ta/Clockings/${id}`,
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

  // Return traffic api call
  const fetchReturnData = (id) => {
    myApi
      .put(
        `/V1/Ta/Clockings/${id}/Restore`,
        {},
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
        setReturnModal(null);
      });
  };

  console.log(Permission);

  return (
    <div>
      {periodModal && (
        <PeriodModal
          setSelectedTitle={setSelectedTitle}
          selectedTitle={"ترددهای من"}
          setDate={setDate}
          onClose={setPeriodModal}
        />
      )}
      {requestModal && (
        <NewReqModal
          title="اصلاح تردد"
          items={requestModal}
          setTrafficModal={setRequestModal}
        />
      )}
      {detailModal && (
        <DetailModal items={detailModal.id} onClose={setDetailModal} />
      )}
      {editModal && <EditModal items={editModal} setModalType={setEditModal} />}
      {deleteModal && (
        <DeleteModal
          type={"تردد"}
          DeleteHandler={fetchDeleteData}
          items={deleteModal}
          onClose={setDeleteModal}
        />
      )}
      {returnModal && (
        <ReturnModal
          type={"تردد"}
          ReturnHandler={fetchReturnData}
          items={returnModal}
          onClose={setReturnModal}
        />
      )}
      <Traffics.RequestBody style={{ marginTop: "80px" }}>
        <Traffics.RequestHeader>
          <Traffics.TitleStyle
            onClick={() => {
              if (selectedTitle !== "ترددهای من") {
                setSelectedTitle("ترددهای من");
                setDate({});
                setPage(0);
                setShowList([]);
              }
            }}
            selected={selectedTitle === "ترددهای من"}
          >
            همۀ ترددها
          </Traffics.TitleStyle>
          <Traffics.TitleStyle
            onClick={() => {
              setSelectedTitle("ترددهای انتخابی");
              setPeriodModal(true);
              setShowList([]);
              setPage(0);
            }}
            selected={selectedTitle === "ترددهای انتخابی"}
          >
            دوره انتخابی
          </Traffics.TitleStyle>
        </Traffics.RequestHeader>
        <Traffics.NewRequest>
          <div style={{ height: "100%", width: "100%" }}>
            <Traffics.ListOFRequests>
              {showList?.length === 0 && !loading ? (
                <div style={{ textAlign: "center" }}>ترددی ثبت نشده است.</div>
              ) : (
                showList?.map((item, index) => (
                  <Traffics.RequestCard
                    deleted={item.deleted_at ? true : false}
                    key={index}
                  >
                    <Traffics.RequestCardInfo
                      deleted={item.deleted_at ? true : false}
                    >
                      <div
                        style={{ width: "100%" }}
                        onClick={() => setDetailModal(item)}
                      >
                        <div
                          style={{
                            display: "flex",
                            color: `${item.deleted_at ? "white" : "#9c9c9c"}`,
                            fontWeight: "400",
                            fontSize: "1.8vh",
                            alignItems: "center",
                          }}
                        >
                          {`${moment(item.date).format("dddd")} - ${moment(
                            item.date
                          ).format("jYYYY/jMM/jDD")}`}{" "}
                          - {moment(item.date).format("HH:mm:ss")}
                        </div>
                        <Typography
                          size="base"
                          color={`${item.deleted_at ? "white" : "grey"}`}
                        >
                          {item.entryType}{" "}
                          <span
                            style={{
                              color: `${
                                item.deleted_at ? "#fafd20" : "#E67205"
                              }`,
                              width: "100%",
                              textAlign: "center",
                            }}
                          >
                            {item.entryCause}
                          </span>
                        </Typography>
                      </div>
                      <div>
                        {item.status === "waiting" ? (
                          <Traffics.RequestCardStatusItem
                            deleted={item.deleted_at ? true : false}
                            type="waiting"
                          >
                            در انتظار بررسی
                          </Traffics.RequestCardStatusItem>
                        ) : null}
                      </div>
                      {openOption && openOption === item.id && (
                        <Traffics.OptionMenu ref={ref}>
                          {item.deleted_at ? (
                            <Traffics.OptionItem
                              disabled={
                                !Permission?.some(
                                  (item) => item === "Clocking@restore"
                                )
                              }
                              onClick={
                                Permission?.some(
                                  (item) => item === "Clocking@restore"
                                )
                                  ? () => setReturnModal(item)
                                  : null
                              }
                            >
                              بازگردانی
                            </Traffics.OptionItem>
                          ) : (
                            <>
                              <Traffics.OptionItem
                                disabled={
                                  !Permission?.some(
                                    (item) => item === "Clocking@destroy"
                                  )
                                }
                                onClick={
                                  Permission?.some(
                                    (item) => item === "Clocking@destroy"
                                  )
                                    ? () => setDeleteModal(item)
                                    : null
                                }
                              >
                                حذف
                              </Traffics.OptionItem>
                              <Traffics.OptionItem
                                disabled={
                                  !Permission?.some(
                                    (item) => item === "Clocking@update"
                                  )
                                }
                                style={{
                                  position: "relative",
                                }}
                                onClick={
                                  Permission?.some(
                                    (item) => item === "Clocking@update"
                                  )
                                    ? () => {
                                        setEditModal(item);
                                      }
                                    : null
                                }
                              >
                                <div>ویرایش</div>
                              </Traffics.OptionItem>
                            </>
                          )}
                        </Traffics.OptionMenu>
                      )}
                      <Traffics.Option
                        style={{ padding: "0 5px" }}
                        onClick={() => optionbHandler(item.id)}
                      >
                        ⋮
                      </Traffics.Option>
                    </Traffics.RequestCardInfo>
                  </Traffics.RequestCard>
                ))
              )}
              {amount !== page && !loading && showList.length > 0 && (
                <div style={{ paddingBottom: "20px", cursor: "pointer" }}>
                  <Traffics.CustomButton
                    left="20px"
                    color="#e98425"
                    noBackground={true}
                    border={true}
                    onClick={increasePage}
                  >
                    <>نمایش بیشتر</>
                    <img src={Arrow} alt="" />
                  </Traffics.CustomButton>
                </div>
              )}
            </Traffics.ListOFRequests>
            {loading && <LoadingSpinner />}
          </div>
        </Traffics.NewRequest>
      </Traffics.RequestBody>
    </div>
  );
};
