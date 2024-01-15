import { useState } from "react";

// Components
import { Modal, ConfirmButton, Typography, Dropdown } from "components/common";

// Styled Elements
import { ListStyles } from "assets/styles/home/employees";

// Images
import Close from "assets/images/common/close/white-color-red-bg.svg";
import Arrow from "assets/images/common/arrows/red-down.svg";

export const DeleteModal = ({
  type,
  onClose,
  items,
  notShowDeletebox,
  DeleteHandler,
  deleted,
}) => {
  // Hooks

  // States
  // eslint-disable-next-line no-unused-vars
  const [deleteCause, setDeleteCause] = useState(null);

  // Handlers
  const deleteCauseChangeHandler = (text) => setDeleteCause(text);

  const closeModalHandler = () => onClose(null);

  const confirmHandler = (id) => {
    DeleteHandler(id);
    // onClose(null);
    if (deleted) {
      onClose(null);
      deleted(true);
    }
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
              <Typography size="lg" weight="light">
                آیا از حذف این {type} مطمئنید؟
              </Typography>
              <div>
                <ConfirmButton
                  onClick={() => confirmHandler(items?.id)}
                  variant="bordered"
                >
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
