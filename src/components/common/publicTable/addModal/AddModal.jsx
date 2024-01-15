import { useState } from "react";

// Components
import { Modal, ConfirmButton, Typography, Dropdown } from "components/common";

// Styled Elements
import { ListStyles } from "assets/styles/home/employees";

// Images
import Close from "assets/images/common/close/white-color-red-bg.svg";
import { useNavigate } from "react-router-dom";
import SecondaryArrow from "assets/images/common/arrows/secondary-down.svg";
import { Field } from "components/common/Field";

export const AddModal = ({
  dropData,
  addModalDescription,
  type,
  onClose,
  navigateNewAddress,
}) => {
  // Hooks
  const navigate = useNavigate();
  // States
  // eslint-disable-next-line no-unused-vars
  const [cause, setCause] = useState(null);
  const [name, setName] = useState("");
  // Handlers
  const deleteCauseChangeHandler = (text) => setCause(text);
  const closeModalHandler = () => onClose(false);
  const [inputFieldError, setInputFieldError] = useState(false);
  const [dropDownFieldError, setDropDownInputFieldError] = useState(false);
  // const confirmHandler = () => {
  //   if (deleteCause === null) return;
  //   const template = {
  //     ...items,
  //     deleteCause: deleteCause,
  //     deleteTime: new Date().toLocaleDateString("fa-IR"),
  //   };
  //   dispatch(deleteEmployee(items.id));
  //   dispatch(addDeletedEmployee(template));
  //   closeModalHandler();
  // };

  const handleChange = (event) => {
    setName(event.target.value);
  };
  const confirmHandler = () => {
    // if (type !== "فرم") {
    //   if (
    //     (name.length > 0 && !dropData) ||
    //     (name.length > 0 && dropData && cause !== null)
    //   ) {
    //     setInputFieldError(false);
    //     setDropDownInputFieldError(false);
    //     navigate(navigateNewAddress, { state: { name, cause } });
    //   } else {
    //     if (name.length === 0) {
    //       setInputFieldError(true);
    //     } else {
    //       setInputFieldError(false);
    //     }
    //     if (cause === null) {
    //       setDropDownInputFieldError(true);
    //     } else {
    //       setDropDownInputFieldError(false);
    //     }
    //   }
    // } else {
    if (name.length > 0) {
      setInputFieldError(false);
      setDropDownInputFieldError(false);
      navigate(navigateNewAddress, { state: { name, cause } });
    } else {
      if (name.length === 0) {
        setInputFieldError(true);
      } else {
        setInputFieldError(false);
      }
      // if (cause === null) {
      //   setDropDownInputFieldError(true);
      // } else {
      //   setDropDownInputFieldError(false);
      // }
    }
    // }
  };

  return (
    <Modal>
      <ListStyles.CloseBadge
        onClick={closeModalHandler}
        src={Close}
        alt="Close"
      />
      <ListStyles.AddContainer>
        <ListStyles.TopSide>
          <Typography size="xl" weight="medium">
            ساخت {type} جدید
          </Typography>
          <ListStyles.BodyForm>
            <ListStyles.ItemForm color="red">
              <Typography>نام {type}</Typography>
              <ListStyles.InputTextName
                placeholder={`نام ${type} خود را بنویسید.`}
                type="text"
                onChange={handleChange}
              />
            </ListStyles.ItemForm>
            {inputFieldError && <p>لطفا مقادیر لازم را وارد نمایید</p>}
            {dropData && (
              <div style={{ position: "relative" }}>
                <ListStyles.AddBottomSide />
                <ListStyles.ItemForm color="borderGray">
                  <Typography>نوع {type}</Typography>
                  <Dropdown
                    type="ساعت کاری"
                    firstData=""
                    dropData={dropData}
                    imageSrc={SecondaryArrow}
                    setSelectedState={deleteCauseChangeHandler}
                  />
                </ListStyles.ItemForm>
                {dropDownFieldError && (
                  <p>لطفا یکی از گزینه هارا انتخاب کنید</p>
                )}
              </div>
            )}
            {addModalDescription && (
              <div style={{ position: "relative" }}>
                <ListStyles.AddBottomSide />
                <ListStyles.ItemForm color="borderGray">
                  <Typography>توضیحات</Typography>
                  <Field type={"text"} size={1000} noMargin />
                </ListStyles.ItemForm>
                {dropDownFieldError && (
                  <p>لطفا یکی از گزینه هارا انتخاب کنید</p>
                )}
              </div>
            )}
          </ListStyles.BodyForm>
          <ListStyles.AddButton>
            <ConfirmButton
              onClick={closeModalHandler}
              variant="bordered"
              color="secondary"
            >
              <Typography>لغو</Typography>
            </ConfirmButton>
            <ConfirmButton
              onClick={confirmHandler}
              // onClick={() => changePageHandler(navigateAddress)}
              variant="linear"
              color="white"
              noBorderColor={true}
              shadow={"0px 7px 15px grey"}
              bg="secondary"
              height={"26px"}
            >
              <Typography>ایجاد {type}</Typography>
            </ConfirmButton>
          </ListStyles.AddButton>
        </ListStyles.TopSide>
      </ListStyles.AddContainer>
    </Modal>
  );
};
