import styled, { css } from "styled-components";
import { Container } from "./Container.styled";

export const ListContainer = styled(Container)`
  flex: 1;
  height: 100%;
  padding: 20px 40px;
  background-color: #fff;
  box-shadow: inset 0px -30px 99px #0000000a, 0px 8px 36px #a0bdc180;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
  color: #fff;

  & > button {
    display: flex;
    gap: 20px;
    padding: 2px 15px;
    border-radius: 20px;
    background: linear-gradient(252deg, #37abb8 0%, #71fbff 100%);
    transition: 400ms ease-in-out;
    cursor: pointer;
    &:hover {
      transform: scale(1.15);
    }

    & > img {
      width: 15px;
    }
  }
`;

export const CalendarList = styled.div`
  background: linear-gradient(180deg, #f6f6f6 0%, #faf9f8 71%, #ffffff 100%);
  border-radius: 12px;
  padding: 12px;
  overflow-y: hidden;
`;

export const CalendarListHeader = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1.75fr) 2fr;
  padding: 6px;
  margin-bottom: 18px;
  text-align: center;
  background-color: #fff;
  color: #9e9e9e;

  & > *:last-child {
    margin-right: 80px;
    text-align: right;
  }
`;

export const CalendarListBody = styled.div``;

export const CalendarListItemContainer = styled.div`
  position: relative;
  z-index: ${(props) => (props.isDeleteMode ? "2" : "1")};
  display: grid;
  grid-template-columns: repeat(3, 1.75fr) 2fr;
  align-items: center;
  padding: 6px;
  margin-bottom: 18px;
  border-radius: 12px;
  text-align: center;
  background: ${(props) =>
    props.isDeleteMode
      ? "#ff4d4d"
      : "linear-gradient(267deg, #808080 0%, #bababa 100%)"};
  color: #f9f8f7;
  box-shadow: 0px 7px 15px #00000033;
`;

export const CalendarLastItem = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 36px;
`;

export const CalendarListItemActions = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px 6px;
  border: 1px solid #cbcbcb;
  border-radius: 18px;

  & > img {
    width: 22px;
    cursor: pointer;
    transition: 300ms;
    &:hover {
      transform: scale(1.15);
    }
  }
`;

// === Calendar Delete ===
export const CalendarDeleteContainer = styled.div`
  position: relative;
  padding: 30px 100px;
  border-radius: 12px;
  border: 1px solid #cbcbcb;
  background-color: #fff;
  box-shadow: inset 0px -30px 99px #0000000d, 0px 24px 65px #a0bdc180;
  color: ${(props) => props.theme.color.red};
`;

export const CloseImage = styled.img`
  position: absolute;
  top: -8px;
  left: -12px;
  width: 30px;
  height: 30px;
  cursor: pointer;
  transition: 300ms ease;
  &:hover {
    transform: scale(1.05);
  }
`;

export const DeleteButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;

  & > button {
    padding: 5px 60px;
    border-radius: 20px;
    opacity: 0.9;
    transition: 300ms ease;
    cursor: pointer;

    &:first-child {
      border: 1px solid #ff8080;
      background-color: #fff;
      color: #ff8080;
      &:hover {
        border: 1px solid #ff4d4d;
        color: #ff4d4d;
      }
    }

    &:last-child {
      border: 1px solid #fff;
      background-color: #ff8080;
      color: #fff;
      &:hover {
        background-color: #ff4d4d;
      }
    }
  }
`;

// === Calendar Add ===
export const CalendarAddContainer = styled(CalendarDeleteContainer)`
  width: clamp(400px, 30vw, 800px);
  padding: 30px;
  text-align: center;
  color: #8e8e8e;

  & > span {
    color: ${(props) => props.theme.color.secondary};
  }
`;

export const CalendarAddForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 30px;
  text-align: right;
`;

export const CalendarNameField = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  & > label {
    color: ${(props) => props.theme.color.red};
  }

  & > input {
    flex: 1;
    border: 1px solid ${(props) => props.theme.color.red};
    border-radius: 6px;
    padding: 4px 8px;
    font-size: 1.2rem;

    &::placeholder {
      color: #cbcbcb;
    }
  }
`;

export const CalendarDescriptionField = styled(CalendarNameField)`
  & > label {
    color: #9e9e9e;
  }

  & > input {
    border: 1px solid #cbcbcb;
    border-radius: 6px;
  }
`;

export const CalendarAddButtons = styled(DeleteButtonsContainer)`
  justify-content: flex-end;
  gap: 10px;
  & > button {
    padding: 2px 36px;
    &:first-child {
      border: 1px solid #37b3b8;
      color: #37b3b8;
      &:hover {
        border: 1px solid #37b3b8;
        color: #37b3b8;
      }
    }

    &:last-child {
      border: 1px solid #fff;
      background: linear-gradient(252deg, #37abb8 0%, #71fbff 100%);
    }
  }
`;

// === NEW CALENDAR FOLDER ===
export const NewCalendarContainer = styled(Container)`
  flex: 1;
  height: 100%;
  padding: 30px;
  background-color: #fff;
  box-shadow: inset 0px -30px 99px #0000000a, 0px 8px 36px #a0bdc180;
  border: 1px solid #cbcbcb;
`;

export const NewCalendarHeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 20px 50px;
  border-radius: 12px;
  background: #f5f5f5 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 9px #00000029;
`;

export const NewCalendarName = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  & > span {
    color: #ff4d4d;
  }

  & > div {
    width: 50%;
    display: flex;
    align-items: center;
    height: 30px;
    padding: 0 30px;
    border-radius: 6px;
    border: 1px solid #ff4d4d;
    color: #333;
    background-color: #fff;
  }
`;

export const NewCalendarDescription = styled(NewCalendarName)`
  & > span {
    color: #666666;
  }

  & > div {
    flex: 1;
    border: 1px solid #6e6d6d;
    color: #6e6d6d;
    background-color: #fff;
  }
`;

// === Calendar Body ===
export const NewCalenadarBodyContainer = styled.div`
  -webkit-user-select: none; /* Safari */
  -ms-user-select: none; /* IE 10 and IE 11 */
  user-select: none; /* Standard syntax */
  position: relative;
  margin-top: 70px;
  padding: 30px;
  border-radius: 12px;
  border: 3px solid #ff4d4d;
  background: linear-gradient(180deg, #f6f6f6 0%, #faf9f8 86%, #ffffff 100%);
`;

export const CalendarYear = styled.div`
  position: absolute;
  top: -25px;
  left: 50%;
  transform: translate(-50%, 0);
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 50px;
  width: 275px;
  border-radius: 12px;
  background: linear-gradient(239deg, #ff4d4d 0%, #ff8080 100%);
  box-shadow: 0px 7px 15px #00000033;
  color: #fff;
`;

export const ConfigureButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  width: 180px;
  height: 45px;
  border-radius: 20px;
  background: linear-gradient(90deg, #ff8080 0%, #ffd011 100%);
  color: #fff8f7;
  cursor: pointer;
  transition: 300ms ease-in-out;
  &:hover {
    background: linear-gradient(90deg, #fc2b2b 0%, #ffcd00 100%);
  }
`;
export const CalendarActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  & > div {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 6px;
    border-radius: 32px;
  }
`;

export const ArrowsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 6px 12px;
  border-radius: 24px;
  border: 1px solid #37b3b8;
  height: 40px;

  & > img {
    width: 18px;
    height: 18px;

    &:first-child {
      transform: rotate(270deg);
    }
    &:last-child {
      transform: rotate(90deg);
    }
  }

  /* Spacer */
  & > span {
    display: block;
    height: 100%;
    width: 1px;
    background-color: #37b3b8;
  }
`;

// Seasson and Month Container

export const SeassonContainer = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  padding: 30px;
  padding-top: 100px;
  margin-bottom: 80px;
  border-radius: 12px;
  background-color: #fff;
  &:last-child {
    margin-bottom: 10px;
  }

  & > img {
    position: absolute;
    top: -50px;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 50%;
    padding: 6px;
    background-color: #fff;
  }
`;

export const MonthContainer = styled.div`
  position: relative;
  padding: 24px 12px 12px;
  border-radius: 12px;
  background: linear-gradient(180deg, #f6f6f6 0%, #faf9f8 71%, #ffffff 100%);
  box-shadow: 0px 6px 9px #00000017;
`;

export const MonthName = styled.div`
  z-index: ${({ isSelected }) => (isSelected > 0 ? "2" : "1")};
  position: absolute;
  top: -20px;
  right: 10px;
  display: flex;
  justify-content: center;
  height: 50px;
  width: 200px;
  border-radius: 12px;
  background: linear-gradient(262deg, #ababab 0%, #676767 100%);
  box-shadow: 0px 7px 15px #00000033;
  color: #fff;
`;

export const DayNameContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  justify-content: center;
  align-items: center;
  padding: 8px 0;
  border-radius: 8px;
  text-align: center;
  background-color: #fff;
  color: #9e9e9e;
  z-index: ${({ isSelected }) => (isSelected > 0 ? "2" : "0")};
`;

export const DayNameContainerDatePicker = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  justify-content: center;
  align-items: center;
  padding-top: 10px;
  border-radius: 8px;
  text-align: center;
  background-color: #fff;
  color: #9e9e9e;
  z-index: ${({ isSelected }) => (isSelected > 0 ? "2" : "0")};
`;

export const DayNumberContainer = styled.div`
  display: grid;
  grid-template-rows: repeat(5, 1fr);
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
  margin: 16px 0;
`;

export const DayNumberContainerDatepicker = styled.div`
  display: grid;
  grid-template-rows: repeat(5, 1fr);
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
  margin: 2px 0;
`;

export const NumberRelativeBox = styled.div`
  position: relative;
  grid-column: ${({ column }) => (column ? column : "auto")};
`;

export const SingleDayNumberContainer = styled.div`
  position: relative;
  z-index: ${({ isSelected }) => (isSelected ? "2" : "0")};
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 4px;
  border-radius: 6px;
  border: 1px solid #e4e4e4;
  transition: transform 500ms;
  cursor: pointer;
  ${({ mode, isSelected }) => {
    let textColor;
    let hoverStyles;
    if (!isSelected) {
      switch (mode) {
        case "work day":
          textColor = "#9e9e9e";
          hoverStyles = css`
            background: linear-gradient(210deg, #75c9db 0%, #04165d 100%);
          `;
          break;
        case "non-working day":
          textColor = "#966c5a";
          hoverStyles = css`
            background: linear-gradient(196deg, #bf9685 0%, #966c5a 100%);
          `;
          break;
        case "public holiday":
          textColor = "#ff4d4d";
          hoverStyles = css`
            background: linear-gradient(216deg, #ff8080 0%, #ff4d4d 100%);
          `;
          break;
        case "coming date":
          textColor = "brown";
          hoverStyles = css`
            background: linear-gradient(216deg, yellow 0%, black 100%);
          `;
          break;
        case "company holiday":
          textColor = "#daa210";
          hoverStyles = css`
            background: linear-gradient(
              172deg,
              #ffc326 0%,
              #ff7c00 87%,
              #e67205 100%
            );
          `;
          break;
        case "ramadan day":
          textColor = "#37b3b8";
          hoverStyles = css`
            background: linear-gradient(216deg, #37abb8 0%, #71fbff 100%);
          `;
          break;
        default:
          break;
      }
    } else {
      textColor = "#fff";
    }

    let selectedStyles = isSelected
      ? css`
          background-color: #9e9e9e;
          transform: scale(1.05);
        `
      : css`
          background-color: #fff;
          transform: scale(1);
        `;
    return css`
      color: ${textColor};
      ${selectedStyles}
      &:hover {
        color: #fff;
        transform: scale(1.05);
        ${hoverStyles}
        /* it's for show popup */
        & + div {
          display: block;
        }
      }
    `;
  }};
`;

export const SingleDayNumberContainerDatePicker = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  border: 1px solid #e4e4e4;
  transition: transform 500ms;
  cursor: pointer;
  ${({ mode, isSelected }) => {
    let textColor;
    let hoverStyles;
    if (!isSelected) {
      switch (mode) {
        case "work day":
          textColor = "#9e9e9e";
          hoverStyles = css`
            background: linear-gradient(210deg, #75c9db 0%, #04165d 100%);
          `;
          break;
        case "non-working day":
          textColor = "#966c5a";
          hoverStyles = css`
            background: linear-gradient(196deg, #bf9685 0%, #966c5a 100%);
          `;
          break;
        case "public holiday":
          textColor = "#ff4d4d";
          hoverStyles = css`
            background: linear-gradient(216deg, #ff8080 0%, #ff4d4d 100%);
          `;
          break;
        case "coming date":
          textColor = "brown";
          hoverStyles = css`
            background: linear-gradient(216deg, yellow 0%, black 100%);
          `;
          break;
        case "company holiday":
          textColor = "#daa210";
          hoverStyles = css`
            background: linear-gradient(
              172deg,
              #ffc326 0%,
              #ff7c00 87%,
              #e67205 100%
            );
          `;
          break;
        case "ramadan day":
          textColor = "#37b3b8";
          hoverStyles = css`
            background: linear-gradient(216deg, #37abb8 0%, #71fbff 100%);
          `;
          break;
        default:
          break;
      }
    } else {
      textColor = "#fff";
    }

    let selectedStyles = isSelected
      ? css`
          background-color: #9e9e9e;
          transform: scale(1.05);
        `
      : css`
          background-color: #fff;
          transform: scale(1);
        `;
    return css`
      color: ${textColor};
      ${selectedStyles}
      &:hover {
        color: #fff;
        transform: scale(1.05);
        ${hoverStyles}
        /* it's for show popup */
        & + div {
          display: block;
        }
      }
    `;
  }};
`;

export const DayNumberPopup = styled.div`
  position: absolute;
  z-index: 3;
  bottom: ${({ height }) => `-${height + 12}px`};
  right: 0%;
  display: none;

  & > div {
    padding: 4px 8px;
    width: 180px;
    min-height: 30px;
  }

  ${({ mode, hasDiscription }) => {
    let descriptionColor;
    let bgColor;
    switch (mode) {
      case "work day":
        descriptionColor = "#183573";
        bgColor = "linear-gradient(257deg, #75C9DB 0%, #04165D 100%)";
        break;
      case "coming date":
        descriptionColor = "#183573";
        bgColor = "linear-gradient(257deg, #75C9DB 0%, #04165D 100%)";
        break;
      case "non-working day":
        descriptionColor = "#966c5a";
        bgColor = "linear-gradient(235deg, #BF9685 0%, #966C5A 100%)";
        break;
      case "public holiday":
        descriptionColor = "#FF4D4D";
        bgColor = "linear-gradient(81deg, #FF4D4D 0%, #FF8080 100%)";
        break;
      case "company holiday":
        descriptionColor = "#E67205";
        bgColor =
          "linear-gradient(122deg, #FFC326 0%, #FF7C00 87%, #E67205 100%)";
        break;
      case "ramadan day":
        descriptionColor = "#37b3b8";
        bgColor = "linear-gradient(216deg, #37ABB8 0%, #71FBFF 100%)";
        break;
      default:
        break;
    }
    const beforStyles = css`
      content: "";
      position: absolute;
      z-index: 1;
      top: -16px;
      right: 18px;
      border: 8px solid transparent;
      border-bottom: 8px solid ${descriptionColor};
    `;

    if (!hasDiscription) {
      return css`
        & > div:first-child {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-radius: 6px;
          background: ${bgColor};
          color: #fff;
        }

        &::before {
          ${beforStyles}
        }
      `;
    }

    // Returned Styles
    return css`
      & > div:first-child {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-radius: 6px 6px 0 0;
        background: ${bgColor};
        color: #fff;
      }

      & > div:last-child {
        display: flex;
        border-radius: 0 0 6px 6px;
        background-color: #fff;
        box-shadow: 0px 3px 6px #00000012;
        color: ${descriptionColor};
      }

      &::before {
        ${beforStyles}
      }
    `;
  }}
`;

// Set Calendar Modal
export const CloseModalIcon = styled.img`
  position: absolute;
  top: -5px;
  left: -5px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  cursor: pointer;
  transition: 500ms;
  &:hover {
    transform: scale(1.1);
  }
`;

export const SetCalendarModalContainer = styled.div`
  position: relative;
  border-radius: 24px;
  border: 2px solid #e9e9e9;
  color: #e67205;
  background: linear-gradient(
    135deg,
    #c7c7c7 0%,
    #e5e5e5 41%,
    #f8f8f8 76%,
    #ffffff 100%
  );
  box-shadow: 2px 2px 2px #00000033;
`;

export const ModalTopSide = styled.div`
  padding: 25px 50px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const ModalBottomSide = styled.div`
  padding: 25px 50px;
  border-top: 2px solid #e9e9e9;

  /* Input Container */
  & > div:first-child {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 20px;

    & > label {
      color: #9e9e9e;
    }

    & > input {
      flex: 1;
      padding: 2px 8px;
      border-radius: 4px;
      font-size: 16px;
      border: 1px solid #bababa;
      background: #fff;
      color: #9e9e9e;
    }
  }

  & > div:last-child {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;

    & > button:first-child {
      padding: 0px 50px;
      border-radius: 20px;
      border: 1px solid #e67205;
      color: #e67205;
      background: transparent;
      cursor: pointer;
    }

    & > button:last-child {
      padding: 0px 50px;
      border-radius: 20px;
      border: 1px solid transparent;
      color: #f9f8f7;
      background: linear-gradient(90deg, #ff8080 0%, #ffd011 100%);
      cursor: pointer;
      transition: 500ms;
      &:hover {
        background: linear-gradient(90deg, #fc2b2b 0%, #ffcd00 100%);
      }
    }
  }
`;

// Edit Calendar
export const EditCalendarContainer = styled(NewCalendarContainer)`
  padding: 30px;
`;

export const EditCalendarHeaderContainer = styled.div`
  background: linear-gradient(180deg, #f6f6f6 0%, #faf9f8 86%, #ffffff 100%);
  padding: 25px 30px;
  border-bottom: 2px solid #cbcbcb;
  border-radius: 12px 12px 0 0;

  & > div:first-child {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    align-items: center;
    padding: 10px 0;
    margin-bottom: 20px;
    border-radius: 12px;
    text-align: center;
    background: #fff;
    color: #9e9e9e;
  }

  & > div:last-child {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    align-items: center;
    padding: 10px 0;
    border-radius: 12px;
    text-align: center;
    color: #fff;
    background: linear-gradient(267deg, #808080 0%, #bababa 100%);
    box-shadow: 0px 7px 15px #00000033;
  }
`;

export const EditCalendarBody = styled(NewCalenadarBodyContainer)``;

export const EditCalendarYear = styled(CalendarYear)``;
