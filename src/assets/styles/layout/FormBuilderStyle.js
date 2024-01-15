import styled, { css } from "styled-components";
import { GlobalStyles } from "assets/styles/global";

export const SContainer = styled.div`
  position: relative;
  ${GlobalStyles.container}
  box-shadow: inset 0px -30px 99px #0000000A, 0px 8px 36px #A0BDC180;
  background: #fff;
  border-radius: 24px;
  padding: 24px;
`;

export const ContainerBody = styled.div`
  border-radius: 10px 0 10px 10px;
  padding: 10px;
  background: linear-gradient(180deg, #f6f6f6 0%, #faf9f8 71%, #ffffff 100%);
`;

export const Line = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  align-content: center;
`;

export const FormItemAction = styled.div`
  position: absolute;
  left: 0rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  width: ${({ oneButton, collapse }) => (oneButton && !collapse ? 0 : "60px")};
  display: ${({ noButton, collapse, whenCollapse }) =>
    noButton && collapse === whenCollapse ? "none" : "flex"};
  height: 0px;
  padding: ${({ oneButton, collapse }) =>
    oneButton && !collapse ? "15px 15px" : "15px 6px"};
  border: ${({ isDeleteMode }) =>
    isDeleteMode ? "none" : "1px solid #e4e4e4"};
  border-radius: 18px;
  margin-top: 18px;
  margin-left: 10px;

  & > img {
    width: 21px;
    height: 21px;
    transition: 300ms;
    cursor: pointer;

    display: ${({ isDeleteMode }) => (isDeleteMode ? "none" : null)};

    &:hover {
      transform: scale(1.1);
    }
  }
`;

export const CollapseBody = styled.div`
  display: flex;
  position: relative;
  /* position: ${({ isDeleteMode }) => (isDeleteMode ? null : "relative")}; */
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  align-content: center;
  height: 100%;
  width: 100%;
  border-radius: 12px;
  border: ${({ isCollapse }) => (isCollapse ? "2px solid #ff4d4d" : "none")};
  box-shadow: ${({ isCollapse }) =>
    !isCollapse ? "0px 3px 9px #00000029" : "none"};
  background: ${({ isCollapse }) =>
    !isCollapse ? "#F5F5F5 0% 0% no-repeat padding-box" : "white"};
  margin: 5px 0;
  opacity: 1;
  ${({ isDeleteMode }) =>
    isDeleteMode
      ? css`
          z-index: ${({ theme }) => theme.z.listItem};
        `
      : css``};
`;

export const ListBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 10px;
  overflow-y: auto;
  height: 100%;
  background-color: white;
`;

export const InputTextName = styled.input`
  min-width: 50px;
  ::placeholder {
    text-align: ${({ placeholderTextAlign }) =>
      placeholderTextAlign ? placeholderTextAlign : "right"};
    text-align: ${({ textAlign }) => (textAlign ? textAlign : null)};
    font: normal normal 300 17px Yekan Bakh;
    letter-spacing: -0.6px;
    color: #9e9e9e;
  }
  :focus {
    border: ${({ noBorderOnFocus, noBorderOnFocusTime }) =>
      noBorderOnFocus || noBorderOnFocusTime ? null : "1px solid red"};
  }
  :checked + span {
    color: #666666;
  }

  :checked {
    border: none;
    outline: 1px solid red;
  }
  color: #000;
  width: ${({ width }) => (width ? width : "100%")};

  height: 28px;
  margin: ${({ noMargin }) => (noMargin ? null : "5px 20px 5px 0px")};
  background: #ffffff 0% 0% no-repeat padding-box;
  /* border: 1px solid #cbcbcb; */
  border: ${({ noBorderOnFocus, value, type, borderColor }) =>
    ((type === "number"
      ? parseInt(noBorderOnFocus?.Max)
      : noBorderOnFocus?.Max) < (type === "number" ? parseInt(value) : value) ||
      (type === "number" ? parseInt(value) : value) <
        (type === "number"
          ? parseInt(noBorderOnFocus?.Min)
          : noBorderOnFocus?.Min)) &&
    value.length > 0
      ? "1px solid red"
      : borderColor
      ? "1px solid red"
      : "1px solid #cbcbcb"};
  border-radius: 6px;
  opacity: 1;

  @media (max-width: 1400px) {
    width: 100%;
  }

  ${(props) => {
    switch (props.page) {
      case "spiderChart":
        return css`
          margin: 0 8px 0px 0px;
        `;

      default:
        break;
    }
  }}
`;

export const InputBody = styled.div`
  display: flex;
  flex-direction: row;
  margin: 5px;
  flex-wrap: nowrap;
  white-space: nowrap;
  justify-content: flex-start;
  align-items: center;
  align-content: center;
`;

export const CheckMark = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  height: 25px;
  width: 25px;
  border: 1px solid #9e9e9e;
  border-radius: 4px;
  :hover {
    background-color: #ccc;
  }
  :after {
    content: "";
    position: absolute;
    display: none;
  }
  ::after {
    left: 9px;
    top: 5px;
    width: 5px;
    height: 10px;
    border: solid white;
    border-width: 0 3px 3px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
  }
`;

export const LabelContainer = styled.label`
  display: block;
  position: relative;
  /* padding-left: 35px; */
  padding-right: 35px;
  /* margin-left: 30px; */
  padding-top: 3px;
  cursor: pointer;
  /* font-size: 24px/37px; */
  font: normal normal medium 24px/37px Yekan Bakh;
  color: #9e9e9e;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  display: inline-block;
`;

export const InputCheckBox = styled.input`
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
  :checked + p + span {
    background-color: ${({ color }) => (color ? color : "#666666")};
    border-radius: 4px;
    border: none;
  }

  :checked + p + span::after {
    display: block;
  }

  :checked + p {
    color: ${({ color }) => (color ? color : "#666666")};
  }
`;

// export const Icons = styled.div`
//   display: flex;
//   margin-right: 5px;
//   border: 1px solid #ccc;
//   width: 42px;
//   height: 42px;
//   text-align: center;
//   align-items: center;
//   justify-content: center;
//   padding: 5px;
//   border-radius: 100%;
// `;

export const VerticalLine = styled.div`
  position: absolute;
  margin-right: 49px;
  border-left: 1px solid
    ${({ enableMode }) => (enableMode ? "#75C9DB" : "#ccc")};
  height: 40px;
  /* margin: 5px; */
`;

export const Features = styled.img`
  cursor: ${({ enableMode }) => (enableMode ? "pointer" : "auto")};
  margin: 0 5px;
  width: 40px;
  height: 40px;
  transition: transform 0.2s; /* Animation */
  :hover {
    /* transform: scale(1.1); */
  }
`;

export const ButtonStyle = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
`;

export const AddButton = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-end !important;
  align-items: center;
  align-content: center;
  width: 100%;
`;

export const CollapseTextBody = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: space-evenly;
  align-items: flex-start;
  align-content: center;
  padding: 10px;
  height: 100%;
  width: 100%;
  border-radius: 12px;
  opacity: 1;
  > :first-child {
    padding-left: 4.2rem;
  }
`;

export const ColumnNumberBody = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  align-content: center;
  padding: 10px;
  min-height: 20vh;
  height: 100%;
  width: 100%;
  border-radius: 12px;
  opacity: 1;
  > :first-child {
    padding-left: 4.2rem;
  }
`;

export const Main = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  align-content: center;
  padding: 10px;
  min-height: 32vh;

  background: linear-gradient(#f5f5f5, white);
  /* background: #f5f5f5 0% 0% no-repeat padding-box; */
  height: 100%;
  width: 100%;
  border-radius: 12px;
  opacity: 1;
  > :first-child {
    padding-left: 4.2rem;
  }
`;

export const NotCollapseTextBody = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: space-evenly;
  align-items: flex-start;
  align-content: center;
  padding: 10px;
  height: 100%;
  width: 100%;
  border-radius: 12px;
  opacity: 1;
  ${({ isDeleteMode }) =>
    isDeleteMode
      ? css`
          /* position: absolute; */
          /* top: 50px;
          left: 50%;
          transform: translateX(-50%); */
          z-index: ${({ theme }) => theme.z.listItem};
          /* height: 70px;
          width: 90%;
          border-radius: 12px;
          border: ${({ isCollapse }) =>
            isCollapse ? "2px solid #ff4d4d" : "none"};
          box-shadow: ${({ isCollapse }) =>
            !isCollapse ? "0px 3px 9px #00000029" : "none"};
          background: ${({ isCollapse }) =>
            !isCollapse ? "#F5F5F5 0% 0% no-repeat padding-box" : "white"}; */
        `
      : css``};
`;

export const NotCollapseMainBody = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: space-evenly;
  align-items: flex-start;
  align-content: center;
  padding: 10px;
  height: 100%;
  width: 100%;
  border-radius: 12px;
  opacity: 1;
`;

// export const Revert = styled.div`
//   div > input {
//     all: revert;
//   }
// `;

export const HrStyle = styled.hr`
  width: 100%;
  height: 1px;
  background-color: #ff4d4d;
  border: none;
  margin: 5px 0;
`;

export const SpliceLineStyle = styled.hr`
  width: 100%;
  height: 3px;
  background-color: #ff4d4d;
  border: none;
  margin: 5px 0;
`;

export const LineText = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: ${({ justifyContent }) =>
    justifyContent ? justifyContent : "space-between"};
  align-items: center;
  align-content: center;
`;

export const LineButton = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: ${({ justifyContent }) =>
    justifyContent ? justifyContent : "flex-start"};
  align-items: center;
  align-content: center;
`;

export const FormPlace = styled.div`
  width: 100%;
  min-height: 10vh;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  align-content: center;
`;

export const HelpMessage = styled.div`
  position: absolute;
  right: -3px;
  margin-bottom: 55px;

  text-align: center;
  white-space: nowrap;
  & > span {
    background-color: #ccc;
    padding: 0 5px;
    border-radius: 20px;
    width: 100%;
  }
`;

export const HelpMessageCartabel = styled.div`
  position: absolute;
  right: -3px;
  top: -25px;

  text-align: center;
  white-space: nowrap;
  & > span {
    background-color: #ccc;
    padding: 0 5px;
    border-radius: 20px;
    width: 100%;
  }
`;

export const QuestionIcon = styled.img`
  cursor: pointer;
  transition: transform 0.2s; /* Animation */
  :hover {
    transform: scale(1.1);
  }
`;

export const ColumnNumber = styled.div`
  padding: ${({ grid }) => (grid > 1 ? "10px" : null)};
  gap: ${({ grid }) => (grid > 1 ? "10px" : null)};
  width: 100%;
  margin-top: ${({ grid, mode, title }) =>
    grid > 1 && mode !== "showMode"
      ? "50px"
      : grid > 1 && mode === "showMode" && title
      ? "50px"
      : null};
  display: grid;
  align-items: center;
  justify-content: space-around;
  text-align: center;
  grid-template-columns: ${({ grid }) =>
    grid ? `repeat(${grid}, 1fr)` : "repeat(4, 4fr) 1fr"};
`;

export const DetailMode = styled.div`
  gap: 20px;
  width: 100%;
  margin-top: ${({ grid }) => (grid > 1 ? "50px" : null)};
  display: grid;
  align-items: center;
  justify-content: space-around;
  text-align: center;
  margin: 10px;
  margin-top: 40px;
`;

export const CardTitle = styled.div`
  position: absolute;
  right: 10px;
  top: 9px;
`;

export const CardOneTitle = styled.div`
  position: absolute;
  padding-bottom: 20px;
  right: 10px;
  top: 18px;
`;

/* Customize radio button */
export const LabelRadio = styled.label`
  display: block;
  position: relative;
  margin-right: 10px;
  padding-right: 35px;
  cursor: pointer;
  color: #9e9e9e;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  & > p {
    margin-top: 2px;
  }
`;

export const InputRadio = styled.input`
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;

  :checked + p + span {
    background-color: white;
    border-radius: 50%;
    border: 1px solid ${({ color }) => (color ? color : "#2196f3")};
  }

  :checked + p + span::after {
    display: block;
  }

  :checked + p {
    color: ${({ color }) => (color ? color : "#2196f3")};
  }
`;

export const SpanRadio = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  right: 0;
  height: 25px;
  width: 25px;
  background-color: white;
  border-radius: 50%;
  border: 1px solid #9e9e9e;

  :hover {
    background-color: #ccc;
  }
  :after {
    content: "";
    position: absolute;
    display: none;
  }
  ::after {
    left: 6px;
    top: 6px;
    width: 11px;
    height: 11px;
    border-radius: 50%;
    background: ${({ color }) => (color ? color : "#2196f3")};
  }
`;

export const CardImage = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  box-shadow: inset 0px -30px 99px #0000000a, 0px 8px 36px #a0bdc180;
  background-color: white;
  margin: 10px;
  width: 200px;
  height: 200px;
  text-align: justify;

  & > img {
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    object-fit: cover;
    min-height: 120px;
  }
`;
export const ParagraphContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  margin: 5px;
  & > p {
    text-indent: 0px;
    text-align: center;
  }
`;

export const Time = styled.div`
  background-color: #fff;
  border: 2px solid #37abbb;
  position: absolute;
  right: 0;
  left: 0;
  top: -70px;
  padding-bottom: 16px;
  bottom: 0;
  z-index: 1;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-radius: 4px;
`;
