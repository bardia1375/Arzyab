import { useState } from "react";

// Components
import { Modal, ConfirmButton, Typography, Dropdown } from "components/common";

// Styled Elements
import { ListStyles } from "assets/styles/home/employees";

// Images
import Close from "assets/images/common/close/white-color-red-bg.svg";
import Arrow from "assets/images/common/arrows/red-down.svg";

export const ReturnModal = ({
  type,
  onClose,
  items,
  notShowReturnbox,
  ReturnHandler,
}) => {
  // Hooks

  // States
  // eslint-disable-next-line no-unused-vars
  const [returnCause, setReturnCause] = useState(null);

  // Handlers
  const returnCauseChangeHandler = (text) => setReturnCause(text);

  const closeModalHandler = () => onClose(null);

  const confirmHandler = (id) => {
    ReturnHandler(id);
    // onClose(null);
  };

  return (
    <Modal>
      {!notShowReturnbox ? (
        <>
          <ListStyles.CloseBadge
            onClick={closeModalHandler}
            src={Close}
            alt="Close"
          />
          <ListStyles.DeleteContainer>
            <ListStyles.TopSide>
              <Typography size="lg" weight="light">
                آیا از بازگرداندن این {type} مطمئنید؟
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
                  setSelectedState={returnCauseChangeHandler}
                />
              </ListStyles.BottomSide>
            ) : null}
          </ListStyles.DeleteContainer>
        </>
      ) : null}
    </Modal>
  );
};
