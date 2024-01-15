import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// Components
import { Modal, ConfirmButton, Typography, Dropdown } from "components/common";

// Styled Elements
import { ListStyles } from "assets/styles/home/employees";

// Images
import Close from "assets/images/common/close/white-color-red-bg.svg";
import Arrow from "assets/images/common/arrows/red-down.svg";
import { useNavigate } from "react-router-dom";

export const DeleteModal = ({
  type,
  onClose,
  items,
  notShowDeletebox,
  fetchDeleteData,
  navigateAddress,
  setCurrentPage,
  setBoxes,
  hoverDetail,
  deleteTest,
  deleteItems,
  liness,
  boxes,
}) => {
  // Hooks

  const dispatch = useDispatch();
  // States
  const [deleteCause, setDeleteCause] = useState(null);
  const { Token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  // Handlers
  const deleteCauseChangeHandler = (text) => setDeleteCause(text);

  const closeModalHandler = () => onClose(false);

  const confirmHandler = () => {
    // if (deleteCause === null) return;
    // eslint-disable-next-line no-unused-vars
    const template = {
      ...items,
      deleteCause: deleteCause,
      deleteTime: new Date().toLocaleDateString("fa-IR"),
    };
    if (fetchDeleteData !== undefined) {
      dispatch(
        fetchDeleteData(Token, items[items.length - (hoverDetail ? 2 : 1)])
      );
    }
    setCurrentPage(1);
    navigate(navigateAddress);
  };
  return (
    <Modal>
      {!notShowDeletebox ? (
        <>
          <ListStyles.CloseBadge
            onClick={closeModalHandler}
            src={Close}
            alt="Close"
          />
          <ListStyles.DeleteContainer>
            <ListStyles.TopSide>
              <Typography size="xl" weight="light">
                آیا از حذف این {type} مطمئنید؟
              </Typography>
              <div>
                <ConfirmButton onClick={confirmHandler} variant="bordered">
                  <Typography>بله</Typography>
                </ConfirmButton>
                <ConfirmButton onClick={closeModalHandler}>
                  <Typography>خیر</Typography>
                </ConfirmButton>
              </div>
            </ListStyles.TopSide>
            {type === "کارمند" ? (
              <ListStyles.BottomSide>
                <Typography size="xl" weight="light">
                  علت حذف:
                </Typography>
                <Dropdown
                  firstData="انتخاب کنید"
                  dropData={["پایان دوره خدمت", "اخراج", "استعفا", "سایر"]}
                  imageSrc={Arrow}
                  setSelectedState={deleteCauseChangeHandler}
                />
              </ListStyles.BottomSide>
            ) : null}
          </ListStyles.DeleteContainer>
        </>
      ) : null}
    </Modal>
  );
};
