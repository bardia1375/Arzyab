/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

// Redux
import { changeInformationMethodStatus } from "routes/Home/Employees/Module";

// Components
import { DeleteModal } from "./deleteModal/DeleteModal";
import { TickItem } from "components/employees/TickItem";
import { Typography } from "..";
import { CloneModal } from "./cloneModal/CloneModal";

// Styled Elements
import { PublicTableComponent } from ".";

// Images
import Mail from "assets/images/item-actions/mail.svg";
import Copy from "assets/images/item-actions/copy.svg";
import Pen from "assets/images/item-actions/pen.svg";
import Trash from "assets/images/item-actions/trash-white-color-red-bg.svg";
import TrashRed from "assets/images/item-actions/trash-red-color-white-bg.svg";
import Recovery from "assets/images/item-actions/recovery.svg";
import Setting from "assets/images/item-actions/setting.svg";
import Status from "assets/images/item-actions/status.svg";
import Inner from "assets/images/item-actions/inner.svg";
import Outer from "assets/images/item-actions/outer.svg";
import DisabledInner from "assets/images/item-actions/disabled-inner.svg";
import DisabledOuter from "assets/images/item-actions/disabled-outer.svg";
import { useEffect } from "react";
import { Field } from "../Field";

export const ListItem = ({
  page,
  description,
  hoverDetail,
  navigateAddress,
  navigateDetailAddress,
  navigateEditAddress,
  items,
  column,
  statusObjStyle,
  setCurrentPage,
  currentPage,
  fetchDeleteData,
  fetchRecoverData,
  fetchCloneData,
  hoverActionItems,
  recoveryButton,
  mailButton,
  copyButton,
  penButton,
  trashButton,
  trashRedButton,
  settingButton,
  innerButton,
  outerButton,
  hoverMode,
  editDisplayed,
  noBorderButton,
  checkBox,
  checkBoxHandler,
  listChecker,
  noCheckHandler,
  editStarter,
  startersNoRemove,
}) => {
  // Hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  // States
  const [isHover, setIsHover] = useState(hoverActionItems ? false : true);
  const [isHoverDetail, setIsHoverDetail] = useState(
    hoverDetail ? false : true
  );
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const deleteModeChangeHandler = (bool) => setIsDeleteMode(bool);
  const [isCloneMode, setIsCloneMode] = useState(false);
  const cloneModeChangeHandler = (bool) => setIsCloneMode(bool);
  const { Token } = useSelector((state) => state.auth);
  // Redux
  const changeStatusHandler = (method) =>
    dispatch(
      changeInformationMethodStatus({
        unique: items[items.length - (hoverDetail ? 2 : 1)],
        method,
      })
    );
  const recoverData = () => {
    dispatch(
      fetchRecoverData(
        Token,
        items[items.length - (hoverDetail ? 2 : 1)],
        currentPage
      )
    );
    setCurrentPage(1);
  };
  // Navigators
  const goToDetailPageHandler = () => {
    if (editDisplayed !== undefined) {
      const template = {
        Displayed: true,
        Unique: items[items.length - (hoverDetail ? 2 : 1)],
      };
      dispatch(editDisplayed(Token, template));
    }
    if (navigateDetailAddress) {
      navigate(
        `${navigateDetailAddress}${
          items[items.length - (hoverDetail ? 2 : 1)]
        }`,
        {
          state: {
            from: location.pathname,
            currentPage: currentPage,
          },
        }
      );
    }
  };
  const goToEditPageHandler = () =>
    navigate(
      `${navigateEditAddress}${items[items.length - (hoverDetail ? 2 : 1)]}`,
      {
        state: {
          ...items,
          from: location.pathname,
          currentPage: currentPage,
        },
      }
    );
  // const goToSendMessagePageHandler = () =>
  //   navigate("/employees/send-message", { state: { ...items } });

  useEffect(() => {
    if (isDeleteMode && hoverMode) {
      setIsHover(false);
    }
    if (isDeleteMode) {
      setIsHoverDetail(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDeleteMode]);

  const handleOverChange = () => {
    if (!isDeleteMode && hoverActionItems) {
      setIsHover(true);
    } else if (!isDeleteMode && hoverDetail) {
      setIsHoverDetail(true);
    }
  };
  const handleOutChange = () => {
    if (hoverActionItems) {
      setIsHover(false);
    } else if (hoverDetail) {
      setIsHoverDetail(false);
    }
  };

  const [listExist, setListExist] = useState(false);
  useEffect(() => {
    let checker = 0;
    listChecker?.map((item) => {
      if (item.unique === items[items.length - 1]) {
        checker += 1;
      }
    });
    if (checker > 0) {
      setListExist(true);
    } else {
      setListExist(false);
    }
  }, [listChecker]);

  return (
    <div style={{ position: "relative" }}>
      {isDeleteMode && (
        <DeleteModal
          type={page}
          onClose={deleteModeChangeHandler}
          items={items}
          fetchDeleteData={fetchDeleteData}
          navigateAddress={navigateAddress}
          setCurrentPage={setCurrentPage}
          hoverDetail={hoverDetail}
        />
      )}
      {isCloneMode && (
        <CloneModal
          type={page}
          fetchCloneData={fetchCloneData}
          setCurrentPage={setCurrentPage}
          navigateAddress={navigateAddress}
          onClose={cloneModeChangeHandler}
          unique={items[items.length - (hoverDetail ? 2 : 1)]}
        />
      )}
      <PublicTableComponent.ListItem
        onMouseOver={handleOverChange}
        onMouseLeave={handleOutChange}
        statusObjStyle={statusObjStyle}
        page={page}
        grid={page !== "گزارش‌ها" ? column : column - 1}
        isDeleteMode={isDeleteMode}
      >
        {checkBox && (
          <div
            style={{
              position: "absolute",
              right: "-8%",
              bottom: "50%",
              transform: "translate(-50%,-50%)",
            }}
          >
            <Field
              onChange={(e) =>
                // noCheckHandler && noCheckHandler !== items[items.length - 1]
                //   ? () => {}
                // :
                listExist && startersNoRemove
                  ? () => {}
                  : noCheckHandler
                  ? editStarter({
                      name: e.target.value,
                      unique: items[items.length - 1],
                      position: items[items.length - 2],
                    })
                  : checkBoxHandler({
                      name: e.target.value,
                      unique: items[items.length - 1],
                      position: items[items.length - 2],
                    })
              }
              checked={listExist}
              value={items[0]}
              type={"checkbox"}
            />
          </div>
        )}
        {items?.map((item, index) =>
          (
            hoverDetail
              ? index !== items.length - 1 && index !== items.length - 2
              : index !== items.length - 1
          ) ? (
            <Typography
              cursor={"pointer"}
              key={index}
              onClick={goToDetailPageHandler}
              weight="light"
              statusType={
                items.length - (hoverDetail ? 3 : 2) === index &&
                isHover &&
                hoverMode
                  ? true
                  : false
              }
            >
              {items.length - (hoverDetail ? 3 : 2) === index &&
              isHover &&
              hoverMode ? (
                <PublicTableComponent.ListItemActions type={"status"}>
                  <img
                    src={Status}
                    alt="Status"
                    onClick={goToEditPageHandler}
                  />
                </PublicTableComponent.ListItemActions>
              ) : (
                item
              )}
            </Typography>
          ) : null
        )}
        {page === "کارمند" ? (
          <div>
            <PublicTableComponent.TickContainer>
              <TickItem
                isDeleteMode={isDeleteMode}
                title="پیامک"
                status={false}
                // status={informationMethod?.withMessage}
                onToggle={changeStatusHandler.bind(null, "withMessage")}
              />
              <TickItem
                isDeleteMode={isDeleteMode}
                title="ایمیل"
                status={false}
                // status={informationMethod?.withEmail}
                onToggle={changeStatusHandler.bind(null, "withEmail")}
              />
              <TickItem
                isDeleteMode={isDeleteMode}
                title=" واتس اپ"
                status={false}
                // status={informationMethod?.withWhatsapp}
                onToggle={changeStatusHandler.bind(null, "withWhatsapp")}
              />
            </PublicTableComponent.TickContainer>
          </div>
        ) : null}
        {hoverDetail && isHoverDetail && (
          <PublicTableComponent.HoverDetail>
            توضیحات:
            <Typography size="sm">
              {items[items.length - 1]
                ? items[items.length - 1]
                : "توضیحاتی ثبت نشده است!"}
            </Typography>
          </PublicTableComponent.HoverDetail>
        )}
        <PublicTableComponent.HoverActions>
          {isHover
            ? !isDeleteMode &&
              page !== "گزارش‌ها" && (
                <PublicTableComponent.ListItemActions
                  noBorderButton={noBorderButton}
                >
                  {recoveryButton && (
                    <img src={Recovery} alt="Recovery" onClick={recoverData} />
                  )}

                  {mailButton && (
                    <img
                      src={Mail}
                      alt="Mail"
                      // onClick={goToSendMessagePageHandler}
                    />
                  )}

                  {copyButton && (
                    <img
                      src={Copy}
                      alt="Copy"
                      onClick={cloneModeChangeHandler.bind(null, true)}
                    />
                  )}

                  {penButton && (
                    <img src={Pen} alt="Pen" onClick={goToEditPageHandler} />
                  )}

                  {innerButton &&
                    items[items.length - (hoverDetail ? 3 : 2)] === "متصل" && (
                      <img
                        src={Inner}
                        alt="Inner"
                        onClick={goToEditPageHandler}
                      />
                    )}
                  {outerButton &&
                    items[items.length - (hoverDetail ? 3 : 2)] === "متصل" && (
                      <img
                        src={Outer}
                        alt="Outer"
                        onClick={goToEditPageHandler}
                      />
                    )}
                  {innerButton &&
                    items[items.length - (hoverDetail ? 3 : 2)] !== "متصل" && (
                      <img
                        src={DisabledInner}
                        alt="Inner"
                        onClick={goToEditPageHandler}
                      />
                    )}
                  {outerButton &&
                    items[items.length - (hoverDetail ? 3 : 2)] !== "متصل" && (
                      <img
                        src={DisabledOuter}
                        alt="Outer"
                        onClick={goToEditPageHandler}
                      />
                    )}
                  {settingButton && (
                    <img
                      src={Setting}
                      alt="Setting"
                      onClick={goToEditPageHandler}
                    />
                  )}

                  {trashButton && (
                    <img
                      src={Trash}
                      alt="Trash"
                      onClick={deleteModeChangeHandler.bind(null, true)}
                    />
                  )}
                  {trashRedButton && (
                    <img
                      src={TrashRed}
                      alt="TrashRed"
                      onClick={deleteModeChangeHandler.bind(null, true)}
                    />
                  )}
                </PublicTableComponent.ListItemActions>
              )
            : // <img src={Dots} alt="Dots" height={25} />
              !isDeleteMode && (
                <PublicTableComponent.Dots>⋮</PublicTableComponent.Dots>
              )}
        </PublicTableComponent.HoverActions>
      </PublicTableComponent.ListItem>
    </div>
  );
};
