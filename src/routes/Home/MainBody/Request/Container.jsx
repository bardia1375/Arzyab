/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
// Components
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import LoadingSpinner from "components/common/publicTable/loading/LoadingSpinner";
import moment from "moment-jalaali";
import { NewReqModal } from "components/layout/NewReqModal";
import { DetailRequestModal } from "components/layout/DetailRequestModal";
import { EditRequestModal } from "components/layout/EditRequestModal";

// Style
import { Request } from "assets/styles/home/request";
import { ApproveModal } from "../../../../assets/styles/layout/modals/ApproveModal";

//Images
import ReqPic from "assets/images/common/button/new-req.svg";
import Arrow from "assets/images/common/arrows/orange-arrow-down.svg";
import { Inbox } from "./Inbox";
import { RequestCard } from "./RequestCard";
import myApi from "config/axios";
import { DeleteModal } from "components/common/DeleteModal";
import { errorMessage, successMessage } from "services/toast";

export const Container = () => {
  // States && Hooks
  moment.loadPersian({ dialect: "persian-modern" });
  const { Token } = useSelector((state) => state.auth);
  const info = JSON.parse(localStorage.getItem("personsData"));
  const [selectedTitle, setSelectedTitle] = useState("درخواست‌های من");
  const [requestList, setRequestList] = useState([]);
  const [showList, setShowList] = useState(null);
  const [types, setTypes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newReqModal, setNewReqModal] = useState(false);
  const [page, setPage] = useState(0);
  const [amount, setAmount] = useState(0);
  const [filter, setFilter] = useState("all");
  const [deleted, setDeleted] = useState(false);
  const [msgCount, setMsgCount] = useState({ me: 0, recieve: 0 });
  const [modalType, setModalType] = useState({ type: "", item: {} });
  const [approveModal, setApproveModal] = useState({
    state: false,
    id: "",
    approve: "",
  });

  // Getting Types and list of requests from api
  useEffect(() => {
    if (filter === "all" && selectedTitle === "درخواست‌های من") {
      setLoading(true);
      myApi
        .get(`/v1/types`, {
          headers: {
            Authorization: `Bearer ${Token}`,
          },
        })
        .then((res) => {
          let x = res.data.data.types.map((item) => {
            if (item.module_id === 3) {
              return item;
            }
          });
          console.log("xx",x);
          setTypes(x.filter((item) => item !== undefined));
        });
      myApi
        .get(
          `/v1/user/requests/posted?sort[0][key]=created_at&sort[0][direction]=DESC&limit=10&page=0`,
          {
            headers: {
              Authorization: `Bearer ${Token}`,
            },
          }
        )
        .then((res) => {
          setAmount(res.data.meta.total_pages - 1);
          setPage(0);
          setRequestList(res.data.data.requests);
          setLoading(false);
        });
    }
  }, [Token, filter, modalType, deleted]);
  console.log(types);
  // Control pagination
  useEffect(() => {
    if (page > 0) {
      setLoading(true);
      filter === "all"
        ? myApi
            .get(
              `/v1/user/requests/posted?sort[0][key]=created_at&sort[0][direction]=DESC&limit=10&page=${page}`,
              {
                headers: {
                  Authorization: `Bearer ${Token}`,
                },
              }
            )
            .then((res) => {
              setRequestList([...requestList, ...res.data.data.requests]);
              setLoading(false);
            })
        : myApi
            .get(
              `/v1/user/requests/posted?filter_groups[0][filters][0][key]=status&filter_groups[0][filters][0][value][0]=${filter}&filter_groups[0][filters][0][operator]=in&sort[0][key]=created_at&sort[0][direction]=DESC&limit=10&page=${page}
      `,
              {
                headers: {
                  Authorization: `Bearer ${Token}`,
                },
              }
            )
            .then((res) => {
              setRequestList([...requestList, ...res.data.data.requests]);
              setAmount(res.data.meta.total_pages - 1);
              setLoading(false);
            });
    }
  }, [page]);

  // Setting selected data for show
  useEffect(() => {
    if (types.length > 0 && requestList.length > 0) {
      let list = requestList.map((item) => {
        return {
          title: types.filter((type) => type.id === item.type_id)[0]
            ?.full_label,
          date: item.created_at,
          status: item.status,
          timeFrom:
            item.values === undefined
              ? item.request.values.time_from
              : item.values.time_from,
          timeTo:
            item.values === undefined
              ? item.request.values.time_to
              : item.values.time_to,
          typeId:
            item.values === undefined
              ? item.request.type_id
              : item.values.type_id,
          description: item.description,
          date_from:
            item.values === undefined
              ? item.request.values.date_from
              : item.values.date_from,
          date_to:
            item.values === undefined
              ? item.request.values.date_to
              : item.values.date_to,
          senderInfo:
            item.values === undefined
              ? `${item.request.position.name} (${item.request.user.profile.first_name} ${item.request.user.profile.last_name})`
              : "",
          id: item.id,
        };
      });
      setShowList(list);
    } else if (requestList.length === 0) {
      setShowList([]);
    }
  }, [requestList, types]);

  // Increasing page by one
  const increasePage = () => {
    setPage(page + 1);
  };

  // Control which title is selected and which service should be called(onClick)
  const filterHandler = (type, title) => {
    if (title === "درخواست‌های من") {
      setPage(0);
      setRequestList([]);
      setShowList([]);
      setFilter(type);
      setLoading(true);
      type === "all"
        ? myApi
            .get(
              `/v1/user/requests/posted?sort[0][key]=created_at&sort[0][direction]=DESC&limit=10&page=0`,
              {
                headers: {
                  Authorization: `Bearer ${Token}`,
                },
              }
            )
            .then((res) => {
              setRequestList(res.data.data.requests);
              setAmount(res.data.meta.total_pages - 1);
              setLoading(false);
            })
        : myApi
            .get(
              `/v1/user/requests/posted?filter_groups[0][filters][0][key]=status&filter_groups[0][filters][0][value][0]=${type}&filter_groups[0][filters][0][operator]=in&sort[0][key]=created_at&sort[0][direction]=DESC&limit=10&page=0
      `,
              {
                headers: {
                  Authorization: `Bearer ${Token}`,
                },
              }
            )
            .then((res) => {
              setRequestList(res.data.data.requests);
              setAmount(res.data.meta.total_pages - 1);
              setLoading(false);
            });
    }
  };

  // New request modal handler
  const newRequest = () => {
    setNewReqModal(true);
  };
  console.log("showlit", showList);
  console.log("requestList", requestList);
  // With Changing of title get data from api
  useEffect(() => {
    setFilter("all");
    if (selectedTitle === "درخواست‌های من") {
      setLoading(true);
      myApi
        .get(
          `/v1/user/requests/posted?sort[0][key]=created_at&sort[0][direction]=DESC&limit=10&page=0`,
          {
            headers: {
              Authorization: `Bearer ${Token}`,
            },
          }
        )
        .then((res) => {
          setRequestList(res.data.data.requests);
          setAmount(res.data.meta.total_pages - 1);
          setLoading(false);
        });
    } else if (selectedTitle === "صندوق دریافتی") {
      setLoading(true);
      myApi
        .get(
          `/v1/user/requests/received?includes[0]=request.position&includes[1]=request.user.profile&filter_groups[0][filters][0][key]=status&filter_groups[0][filters][0][value][0]=waiting&filter_groups[0][filters][0][operator]=in&sort[0][key]=created_at&sort[0][direction]=DESC&limit=10&page=0`,
          {
            headers: {
              Authorization: `Bearer ${Token}`,
            },
          }
        )
        .then((res) => {
          setRequestList(res.data.data.received_requests);
          setAmount(res.data.meta.total_pages - 1);
          setLoading(false);
        });
    }
  }, [selectedTitle]);

  // Getting counts of unread cards
  useEffect(() => {
    myApi
      .post(
        `/v1/extensions/default`,
        {
          personnel_id: info.UserId,
        },
        {
          headers: {
            Authorization: `Bearer ${Token}`,
          },
        }
      )
      .then((res) => {
        setMsgCount({
          me: res.data.data[1].msg,
          recieve: res.data.data[0].msg,
        });
      });
  }, []);

  // Delete traffic api call
  const fetchDeleteData = (id) => {
    myApi
      .delete(
        `/v1/Requests/${id}`,
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
        setDeleted(false);
        if (res.data.code === 200) {
          successMessage(res.data.message);
        } else {
          errorMessage(res.data.data.notice.message);
        }
      });
  };

  return (
    <Request.RequestBody>
      {newReqModal && (
        <NewReqModal
          setMsgCount={setMsgCount}
          setFilter={setFilter}
          setTrafficModal={setNewReqModal}
        />
      )}
      {modalType?.type === "Watch" && (
        <DetailRequestModal
          items={modalType?.item}
          setMsgCount={setMsgCount}
          setModalType={setModalType}
          setTrafficModal={setNewReqModal}
        />
      )}
      {modalType?.type === "Edit" && (
        <EditRequestModal
          items={modalType?.item}
          setMsgCount={setMsgCount}
          setModalType={setModalType}
          setTrafficModal={setNewReqModal}
        />
      )}
      {modalType?.type === "Delete" && (
        <DeleteModal
          type={"تردد"}
          onClose={setModalType}
          items={modalType?.item}
          DeleteHandler={fetchDeleteData}
          deleted={setDeleted}
          // navigateAddress={navigateAddress}
          // setCurrentPage={setCurrentPage}

          // items={modalType.item}
          // setMsgCount={setMsgCount}
          // setModalType={setModalType}
          // setTrafficModal={setNewReqModal}
        />
      )}
      {approveModal.state && (
        <ApproveModal
          setSelectedTitle={setSelectedTitle}
          approveModal={approveModal}
          onClose={setApproveModal}
          setMsgCount={setMsgCount}
          personnelId={info.UserId}
        />
      )}
      <Request.RequestHeader>
        <Request.TitleStyle
          onClick={() => {
            if (selectedTitle !== "درخواست‌های من") {
              setLoading(true);
              setSelectedTitle("درخواست‌های من");
              setShowList([]);
            }
          }}
          selected={selectedTitle === "درخواست‌های من"}
        >
          درخواست‌های من
          {msgCount.me !== 0 && (
            <Request.Notif>
              {msgCount.me > 99 ? "99+" : msgCount.me}
            </Request.Notif>
          )}
        </Request.TitleStyle>
        <Request.TitleStyle
          selected={selectedTitle === "صندوق دریافتی"}
          onClick={() => {
            if (selectedTitle !== "صندوق دریافتی") {
              setLoading(true);
              setSelectedTitle("صندوق دریافتی");
              setShowList([]);
            }
          }}
        >
          صندوق دریافتی
          {msgCount.recieve !== 0 && (
            <Request.Notif>
              {msgCount.recieve > 99 ? "99+" : msgCount.recieve}
            </Request.Notif>
          )}
        </Request.TitleStyle>
      </Request.RequestHeader>
      <Request.NewRequest>
        {selectedTitle === "درخواست‌های من" && (
          <div style={{ width: "100%", cursor: "pointer" }}>
            <Request.CustomButton right="20px" onClick={newRequest}>
              <span style={{ fontSize: "3vh" }}>درخواست جدید</span>
              <img src={ReqPic} alt="" />
            </Request.CustomButton>
          </div>
        )}
        <div style={{ height: "100%", width: "100%" }}>
          {selectedTitle !== "صندوق دریافتی" && (
            <Request.Status>
              <Request.StatusItem
                selected={filter === "all"}
                onClick={() => {
                  filterHandler("all", selectedTitle);
                }}
              >
                همه
              </Request.StatusItem>
              <Request.StatusItem
                selected={filter === "accepted"}
                onClick={() => {
                  filterHandler("accepted", selectedTitle);
                }}
              >
                تأیید شده
              </Request.StatusItem>
              <Request.StatusItem
                selected={filter === "waiting"}
                onClick={() => {
                  filterHandler("waiting", selectedTitle);
                }}
              >
                دردست‌بررسی
              </Request.StatusItem>
              <Request.StatusItem
                selected={filter === "rejected"}
                onClick={() => {
                  filterHandler("rejected", selectedTitle);
                }}
              >
                رد شده
              </Request.StatusItem>
            </Request.Status>
          )}
          {showList?.length === 0 && !showList && !loading ? (
            <div style={{ textAlign: "center", marginTop: "50px" }}>
              داده‌ای برای نمایش وجود ندارد!
            </div>
          ) : selectedTitle === "درخواست‌های من" ? (
            <Request.ListOFRequests>
              {showList?.map((item, index) => (
                <RequestCard
                  key={index}
                  item={item}
                  setModalType={setModalType}
                />
              ))}
              {amount !== page && !loading && showList?.length > 0 && (
                <div style={{ paddingBottom: "20px" }}>
                  <Request.CustomButton
                    left="20px"
                    color="#e98425"
                    noBackground={true}
                    border={true}
                    onClick={increasePage}
                  >
                    <>نمایش بیشتر</>
                    <img src={Arrow} alt="" />
                  </Request.CustomButton>
                </div>
              )}
            </Request.ListOFRequests>
          ) : (
            <Request.ListOFRequests>
              {showList?.length > 0
                ? showList?.map((item, index) => (
                    <Inbox
                      key={index}
                      item={item}
                      // index={index}
                      types={types}
                      setApproveModal={setApproveModal}
                      setSelectedTitle={setSelectedTitle}
                    />
                  ))
                : !loading && (
                    <div style={{ textAlign: "center" }}>
                      درخواستی ارسال نشده است.
                    </div>
                  )}
              {amount !== page && !loading && showList?.length > 0 && (
                <div style={{ paddingBottom: "20px" }}>
                  <Request.CustomButton
                    left="20px"
                    color="#e98425"
                    noBackground={true}
                    border={true}
                    onClick={increasePage}
                  >
                    <>نمایش بیشتر</>
                    <img src={Arrow} alt="" />
                  </Request.CustomButton>
                </div>
              )}
            </Request.ListOFRequests>
          )}

          {loading && <LoadingSpinner />}
        </div>
      </Request.NewRequest>
      {/* <ToastContainer /> */}
    </Request.RequestBody>
  );
};
