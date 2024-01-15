import { Request } from "assets/styles/home/request";
import { Typography } from "components/common";
import { DetailRequestModal } from "components/layout/DetailRequestModal";
import moment from "moment-jalaali";
import { useState } from "react";

export const Inbox = ({ item, types, setApproveModal, setSelectedTitle }) => {
  const [modalType, setModalType] = useState({ type: "", item: {} });

  return (
    <Request.RequestCard>
      {modalType.type === "Watch" && (
        <DetailRequestModal
          items={modalType.item}
          // setMsgCount={setMsgCount}
          setModalType={setModalType}
          // setTrafficModal={setNewReqModal}
        />
      )}
      <Request.RequestCardInfo
        onClick={() =>
          setModalType({
            type: "Watch",
            item: {
              ...item,
              title: types.filter((type) => type.id === item.typeId)[0]
                ?.full_label,
            },
          })
        }
      >
        <Typography size="base" color={"grey"}>
          <span style={{ color: "#E67205" }}>درخواست کننده </span>{" "}
          {item.senderInfo}
        </Typography>
        <Typography size="base" color={"grey"}>
          <span style={{ color: "#E67205" }}>نوع درخواست</span>{" "}
          {types.filter((type) => type.id === item.typeId)[0]?.full_label}
        </Typography>
        {item?.description && (
          <Typography size="sm" color={"grey"}>
            <span style={{ color: "#E67205" }}>توضیحات</span> {item.description}
          </Typography>
        )}
        <Typography size="sm" color={"grey"}>
          <span style={{ color: "#E67205" }}>جزئیات :</span>{" "}
          <div
            style={{
              display: "flex",
              color: "#9c9c9c",
              fontWeight: "400",
              fontSize: "1.8vh",
              alignItem: "center",
            }}
          >
            {item.date_from &&
              item.date_to &&
              `${moment(item.date_from).format("dddd")} ${moment(
                item.date_from
              ).format("jYYYY/jMM/jDD")} - ${moment(item.date_to).format(
                "dddd"
              )} ${moment(item.date_to).format("jYYYY/jMM/jDD")}`}
            {item.timeFrom && item.timeTo && (
              <>
                <div
                  style={{
                    borderLeft: "1px solid lightgrey",
                    height: "2vh",
                    margin: "0 5px",
                    width: "1px",
                  }}
                ></div>
                ساعت {item.timeTo} - {item.timeFrom}
              </>
            )}
          </div>
        </Typography>
        {/* <div
          style={{
            display: "flex",
            color: "#9c9c9c",
            fontWeight: "400",
            fontSize: "1.8vh",
            alignItem: "center",
          }}
        >
          {moment(item.date).format("dddd")} -
          {moment(item.date).format("jYYYY/jMM/jDD")} -
          {moment(item.date).format("HH:mm:ss")}
        </div> */}
        <Request.RequestCardStatus justify={"space-around"}>
          <Request.RequestCardStatusItem
            onClick={(event) => {
              setApproveModal({
                state: true,
                id: item.id,
                approve: "accepted",
              });
              setSelectedTitle("");
              event.stopPropagation();
            }}
            type="acceptButton"
          >
            تأیید
          </Request.RequestCardStatusItem>
          <Request.RequestCardStatusItem
            onClick={(event) => {
              setApproveModal({
                state: true,
                id: item.id,
                approve: "rejected",
              });
              event.stopPropagation();
            }}
            type="rejectButton"
          >
            رد
          </Request.RequestCardStatusItem>
        </Request.RequestCardStatus>
      </Request.RequestCardInfo>
    </Request.RequestCard>
  );
};
