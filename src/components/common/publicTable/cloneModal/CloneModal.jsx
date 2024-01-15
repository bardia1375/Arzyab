import { useState } from "react";

// Components
import { Modal, ConfirmButton, Typography } from "components/common";

// Styled Elements
import { ListStyles } from "assets/styles/home/employees";

// Images
import Close from "assets/images/common/close/white-color-red-bg.svg";
import { useNavigate } from "react-router-dom";
import { Field } from "components/common/Field";
import { useDispatch, useSelector } from "react-redux";

export const CloneModal = ({
  type,
  onClose,
  unique,
  navigateAddress,
  fetchCloneData,
  setCurrentPage,
}) => {
  // Hooks
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { Token } = useSelector((state) => state.auth);
  // States
  // eslint-disable-next-line no-unused-vars
  const [cause, setCause] = useState(null);
  const [name, setName] = useState("");

  // Handlers
  // const deleteCauseChangeHandler = (text) => setCause(text);
  const closeModalHandler = () => onClose(false);
  // const changePageHandler = (path, opt) => navigate(path, opt);
  const [inputFieldError, setInputFieldError] = useState(false);
  // const [dropDownFieldError, setDropDownInputFieldError] = useState(false);
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
    if (!/^\s*$/.test(name)) {
      const template = {
        Name: name,
        Unique: unique,
      };
      if (fetchCloneData !== undefined) {
        dispatch(fetchCloneData(Token, template));
      }
      setCurrentPage(1);
      setInputFieldError(false);
      navigate(navigateAddress);
    } else {
      setInputFieldError(true);
    }
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
            آیا از ایجاد الگوی مشابه اطمینان دارید؟
          </Typography>
          <ListStyles.BodyForm>
            <ListStyles.ItemForm color="red">
              <Typography>نام {type}</Typography>
              <Field
                size={1000}
                placeHolder={`نام ${type} خود را بنویسید.`}
                type="text"
                onChange={handleChange}
              />
            </ListStyles.ItemForm>
            {inputFieldError && <p>لطفا مقادیر لازم را وارد نمایید</p>}
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
              bg="secondary"
              borderStyle={"none"}
            >
              <Typography>ایجاد {type}</Typography>
            </ConfirmButton>
          </ListStyles.AddButton>
        </ListStyles.TopSide>
      </ListStyles.AddContainer>
    </Modal>
  );
};
