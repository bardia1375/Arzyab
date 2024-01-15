import { Request } from "assets/styles/home/request";
import { Traffics } from "assets/styles/home/traffics";
import { Typography } from "components/common";
import moment from "moment-jalaali";
import { useEffect, useRef, useState } from "react";

export const RequestCard = ({ item, setModalType }) => {
  const ref = useRef();
  const [openOption, setOpenOption] = useState("");
  const optionbHandler = (id) => {
    if (openOption === id) {
      setOpenOption("");
    } else {
      setOpenOption(id);
    }
  };

  const optionHandler = (type, item) => {
    setOpenOption("");
    setModalType({ type, item });
  };

  // Auto close functionality for option
  useEffect(() => {
    const closeDropDown = (e) => {
      if (ref.current && !ref.current.contains(e.target) && openOption) {
        setOpenOption("");
      }
    };
    document.body.addEventListener("click", closeDropDown);
    return () => document.body.removeEventListener("click", closeDropDown);
  }, [openOption]);

  return (
    <Request.RequestCard>
      <Request.RequestCardInfo onClick={() => optionHandler("Watch", item)}>
        <Typography size="xl" color={"grey"}>
          {item.title}
        </Typography>
        <div
          style={{
            display: "flex",
            color: "#9c9c9c",
            fontWeight: "400",
            fontSize: "1.8vh",
            alignItems: "center",
          }}
        >
          {item.date_from ? (
            <>
              {moment(item.date_from).format("dddd")}{" "}
              {moment(item.date_from).format("jDD")}{" "}
              {moment(item.date_from).format("jMMMM")}{" "}
              {moment(item.date_from).format("jYYYY")}
            </>
          ) : (
            <>
              {moment(item.date).format("dddd")}{" "}
              {moment(item.date).format("jDD")}{" "}
              {moment(item.date).format("jMMMM")}{" "}
              {moment(item.date).format("jYYYY")}
            </>
          )}
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
        <Request.RequestCardStatus>
          {item.status === "accepted" ? (
            <Request.RequestCardStatusItem type="accepted">
              تأیید شده
            </Request.RequestCardStatusItem>
          ) : item.status === "waiting" ? (
            <Request.RequestCardStatusItem type="waiting">
              در انتظار بررسی
            </Request.RequestCardStatusItem>
          ) : (
            <Request.RequestCardStatusItem type="rejected">
              رد شده
            </Request.RequestCardStatusItem>
          )}
        </Request.RequestCardStatus>
      </Request.RequestCardInfo>
      {openOption && openOption === item.id && item.status === "waiting" && (
        <Traffics.OptionMenu ref={ref}>
          {/* <Traffics.OptionItem onClick={() => optionHandler("Watch", item)}>
            مشاهده
          </Traffics.OptionItem> */}

          <>
            <Traffics.OptionItem
              // disabled
              onClick={() => optionHandler("Delete", item)}
            >
              حذف
            </Traffics.OptionItem>
            <Traffics.OptionItem onClick={() => optionHandler("Edit", item)}>
              ویرایش
            </Traffics.OptionItem>
          </>
        </Traffics.OptionMenu>
      )}
      {item.status === "waiting" && (
        <Request.Option onClick={() => optionbHandler(item.id)}>
          ⋮
        </Request.Option>
      )}
    </Request.RequestCard>
  );
};
