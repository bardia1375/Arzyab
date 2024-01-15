/* eslint-disable react-hooks/exhaustive-deps */
// Components
import React, { useEffect, useState } from "react";
import LoadingSpinner from "components/common/publicTable/loading/LoadingSpinner";
import { useSelector } from "react-redux";
import moment from "moment-jalaali";
import { setTraffic } from "routes/Auth/Module";
import { MessageModal } from "../../../../assets/styles/layout/modals/MessageModal";

// Styles
import { Messages } from "assets/styles/home/messages";

// Images
import Arrow from "assets/images/common/arrows/orange-arrow-down.svg";
import myApi from "config/axios";

export const Container = () => {
  // States && Hooks
  const { Token, Traffic } = useSelector((state) => state.auth);
  const [requestList, setRequestList] = useState([]);
  const [showList, setShowList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [amount, setAmount] = useState(0);
  const [msgModal, setMsgModal] = useState({ status: false, item: null });
  const info = JSON.parse(localStorage.getItem("personsData"));

  // Get data from server and set it
  useEffect(() => {
    setLoading(true);
    myApi
      .get(
        `/v1/portal/post?includes[0]=category&filter_groups[0][filters][0][key]=user_id&filter_groups[0][filters][0][value]=${info?.UserId}&filter_groups[0][filters][0][operator]=in&page=0&limit=10`,
        {
          headers: {
            Authorization: `Bearer ${Token}`,
          },
        }
      )
      .then((res) => {
        setAmount(res.data.meta.total_pages - 1);
        setRequestList(res.data.data.posts);
        setLoading(false);
      });
  }, [Traffic]);

  // Control pagination
  useEffect(() => {
    if (page > 0) {
      setLoading(true);
      myApi
        .get(
          `/v1/portal/post?includes[0]=category&filter_groups[0][filters][0][key]=user_id&filter_groups[0][filters][0][value]=${info?.UserId}&filter_groups[0][filters][0][operator]=in&page=${page}&limit=10`,
          {
            headers: {
              Authorization: `Bearer ${Token}`,
            },
          }
        )
        .then((res) => {
          setAmount(res.data.meta.total_pages - 1);
          setRequestList([...requestList, ...res.data.data.posts]);
          setLoading(false);
        });
    }
  }, [page]);

  // Set selected objects to be shown
  useEffect(() => {
    setTraffic(true);
    if (requestList?.length > 0) {
      let list = requestList?.map((item) => {
        return {
          id: item.id,
          date: item.created_at,
          title: item.title,
          shortDescription: item.short_desc,
          description: item.description,
        };
      });
      setTraffic(false);
      setShowList(list);
    } else if (requestList?.length === 0) {
      setTraffic(false);
      setShowList([]);
    }
  }, [requestList]);

  // Increase page by one
  const ShowMore = () => {
    setPage(page + 1);
  };

  return (
    <div>
      {msgModal.status && (
        <MessageModal items={msgModal.item} onClose={setMsgModal} />
      )}
      <Messages.RequestBody style={{ marginTop: "80px" }}>
        <Messages.RequestHeader>
          <Messages.TitleStyle selected={true}>پیام‌های من</Messages.TitleStyle>
        </Messages.RequestHeader>
        <Messages.NewRequest>
          <div style={{ height: "100%", width: "100%" }}>
            <Messages.ListOFRequests>
              {showList.length > 0
                ? showList.map((item, index) => (
                    <Messages.RequestCard
                      onClick={() => setMsgModal({ status: true, item: item })}
                      key={index}
                    >
                      <Messages.RequestCardInfo
                      // read={item.status === "waiting"}
                      >
                        <div style={{ width: "100%" }}>
                          <Messages.RequestDate>
                            {`${moment(item.date).format("dddd")} - ${moment(
                              item.date
                            ).format("jYYYY/jMM/jDD")}`}{" "}
                            - {moment(item.date).format("HH:mm:ss")}
                          </Messages.RequestDate>
                          <Messages.RequestTitle>
                            {item.title}
                          </Messages.RequestTitle>
                        </div>
                      </Messages.RequestCardInfo>
                      <Messages.RequestDesc>
                        {item.shortDescription}
                      </Messages.RequestDesc>
                    </Messages.RequestCard>
                  ))
                : !loading && (
                    <div style={{ textAlign: "center" }}>پیامی موجود نیست.</div>
                  )}
              {amount !== page && !loading && showList.length > 0 && (
                <div style={{ paddingBottom: "20px", cursor: "pointer" }}>
                  <Messages.CustomButton
                    left="20px"
                    color="#e98425"
                    noBackground={true}
                    border={true}
                    onClick={ShowMore}
                  >
                    <>نمایش بیشتر</>
                    <img src={Arrow} alt="" />
                  </Messages.CustomButton>
                </div>
              )}
            </Messages.ListOFRequests>
            {loading && <LoadingSpinner />}
          </div>
        </Messages.NewRequest>
      </Messages.RequestBody>
    </div>
  );
};
