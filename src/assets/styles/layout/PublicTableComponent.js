import styled, { css } from "styled-components";
import { GlobalStyles } from "assets/styles/global";

// const grid4 = css`
// display: grid;
// grid-template-columns: repeat(4, 4fr) 1fr;
// align-items: center;
// `;

export const SContainer = styled.div`
  position: relative;
  ${GlobalStyles.container}
  background: #fff;
  box-shadow: inset 0px -30px 99px #0000000a, 0px 8px 36px #a0bdc180;
  border-radius: 24px;
  padding: 24px;
`;

export const WorkFlow = styled.div`
  /* position: relative; */
  background: #fff;
  border-radius: 24px;
  padding: 24px;
  width: 100%;
`;

export const VerticalLine = styled.div`
  height: 20px;
  border-left: 1px solid;
`;

export const ContainerHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const ContainerBody = styled.div`
  border-radius: 10px 0 10px 10px;
  padding: 10px;
  background: linear-gradient(180deg, #f6f6f6 0%, #faf9f8 71%, #ffffff 100%);
`;

// Container Header Childs
export const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  & > button {
  }
`;

export const SpaceBetween = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding-left: 10px;
  > :first-child {
    width: 5%;
  }
`;

export const HeaderButton = styled.button`
  padding: 9px 20px;
  margin-left: 5px;
  border-radius: 10px 10px 0 0;
  background-color: ${({ path, theme }) =>
    path ? theme.color.lightGray : theme.color.gray};

  /* background-color: ${({ theme }) => theme.color.gray}; */
  cursor: pointer;
  transition: 300ms;

  &:hover {
    background-color: ${({ theme }) => theme.color.lightGray};
  }
`;

export const HeaderImage = styled.img`
  width: 20px;
  height: 20px;
`;

// Container Body Childs
export const ListHead = styled.div`
  display: grid;
  clear: both;
  white-space: nowrap;
  grid-template-columns: ${({ grid }) =>
    grid ? `repeat(${grid}, 1fr)` : "repeat(4, 4fr) 1fr"};
  align-items: center;
  padding: 10px 15px 10px 0px;
  border-radius: 15px;
  text-align: center;
  color: ${({ theme }) => theme.color.darkGray};
  background: ${({ theme }) => theme.color.white};
  box-shadow: 0 4px 10px #eee;

  // @media (min-width: 1024px) and (max-width: 1600px){
  //   padding: 10px 15px 10px 70px;
  //   > : last-child{
  //     margin-left: -50px;
  //   }
  // }
`;

export const ListBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 10px;
  overflow-y: auto;
  height: 28vh;

  @media (min-height: 820px) {
    height: 38vh;
  }

  @media (min-height: 920px) {
    height: 44vh;
  }

  @media (min-height: 1120px) {
    height: 52vh;
  }
`;

// List Item
export const ListItem = styled.div`
  ${(props) => {
    switch (props.page) {
      case "حذفیات":
        return css`
          background: linear-gradient(225deg, #ff8080 0%, #ff4d4d 100%);
          box-shadow: 0 3px 6px #00000029;
        `;
      case "فرم":
        return css``;
      default:
        return css`
          background: ${({ theme }) => theme.color.white};
        `;
    }
  }}
  ${(props) => {
    switch (props.statusObjStyle) {
      case "فعال و در گردش":
        return css`
          color: #fff !important;
          background: linear-gradient(
            267deg,
            #808080 0%,
            #bababa 100%
          ) !important;
          box-shadow: 0px 7px 15px #00000033 !important;
          border: none !important;
        `;
      case "فعال":
        return css`
          color: #37b3b8 !important;
          background: #ffffff !important;
          box-shadow: 0px 3px 6px #00000029 !important;
          border: 1px solid #37b3b8 !important;
        `;
      case "غیر فعال":
        return css`
          color: #fff !important;
          background: linear-gradient(
            267deg,
            #808080 0%,
            #bababa 100%
          ) !important;
          box-shadow: 0px 7px 15px #00000033 !important;
          border: none !important;
        `;
      case "پیش نویس":
        return css`
          color: #e67205 !important;
          background: #ffffff !important;
          box-shadow: 0px 3px 6px #00000029 !important;
          border: 1px solid #e67205 !important;
        `;
      case "تایید شده":
        return css`
          color: #37b3b8 !important;
          background: #ffffff !important;
          box-shadow: 0px 3px 6px #00000029 !important;
          border: 1px solid #37b3b8 !important;
        `;
      case "متصل":
        return css`
          color: #37b3b8 !important;
          background: #ffffff !important;
          box-shadow: 0px 3px 6px #00000029 !important;
          border: 1px solid #37b3b8 !important;
        `;
      case "غیر متصل":
        return css`
          color: #e67205 !important;
          background: #ffffff !important;
          box-shadow: 0px 3px 6px #00000029 !important;
          border: 1px solid #e67205 !important;
        `;
      case "تایید نشده":
        return css`
          color: #808080 !important;
          box-shadow: 0px 3px 6px #00000033 !important;
          border: 1px solid #808080 !important;
        `;
      case "بیرون از مدار":
        return css`
          color: #808080 !important;
          box-shadow: 0px 7px 15px #00000033 !important;
          border: 1px solid #808080 !important;
        `;
      case "جدید":
        return css`
          color: #808080 !important;
          box-shadow: 0px 7px 15px #00000033 !important;
          border: 1px solid #808080 !important;
        `;
      case "غیر عادی":
        return css`
          color: #e67205 !important;
          background: #ffffff !important;
          box-shadow: 0px 3px 6px #00000029 !important;
          border: 1px solid #e67205 !important;
        `;
      case "اضطراری":
        return css`
          color: red !important;
          box-shadow: 0px 7px 15px #00000033 !important;
          border: 1px solid red !important;
        `;
      case "عادی":
        return css`
          color: #37b3b8 !important;
          background: #ffffff !important;
          box-shadow: 0px 3px 6px #00000029 !important;
          border: 1px solid #37b3b8 !important;
        `;
      default:
        return css`
                  // Need to improve
                break;
                `;
    }
  }}

  display: grid;
  grid-template-columns: ${({ grid }) =>
    grid ? `repeat(${grid}, 1fr)` : "repeat(4, 4fr) 1fr"};
  align-items: center;
  padding: 10px;
  border-radius: 15px;
  text-align: center;
  ${({ isDeleteMode }) =>
    isDeleteMode
      ? css`
          position: relative;
          /* top: 50px;
          left: 50%;
          transform: translateX(-50%); */
          z-index: ${({ theme }) => theme.z.listItem};
          width: 100%;
          border: 2px solid ${({ theme }) => theme.color.red};
          color: ${({ theme, page }) =>
            page === "حذفیات" ? theme.color.white : theme.color.red};
        `
      : css`
          ${(props) => {
            switch (props.page) {
              case "حذفیات":
                return css`
                  box-shadow: 0 3px 6px #00000029;
                  color: ${({ theme }) => theme.color.white};
                `;
              default:
                return css`
                  border: 2px solid ${({ theme }) => theme.color.primary};
                  color: ${({ theme }) => theme.color.primary};
                `;
            }
          }}
        `};

  & > div {
    display: flex;
    white-space: nowrap;
    justify-content: center;
    padding-right: 5%;
    align-items: center;
  }
  & > div:last-child {
    justify-content: flex-end;
  }
`;

export const ListItemActions = styled.div`
  display: ${({ isDeleteMode }) => (isDeleteMode ? "none" : "flex")};
  border: ${({ noBorderButton, theme }) =>
    noBorderButton ? "none" : `1px solid ${theme.color.gray}`};
  padding: 4px;
  margin: 0 4px;
  gap: 6px;
  border-radius: 16px;

  img {
    width: 18px;
    transition: 300ms;

    &:hover {
      transform: scale(1.1);
      rotate: ${({ type }) => type === "status" && "-180deg"};
    }
  }
`;

export const TickContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: clamp(16px, 5%, 40px);
  width: 100px;
`;

export const Dots = styled.div`
  margin-top: 5px;
  transform: scale(1.5);
`;

export const TickItem = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;

  & > div {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    border: 1.5px solid
      ${({ theme, isDeleteMode, isTicked }) =>
        isDeleteMode & isTicked
          ? theme.color.red
          : isDeleteMode & !isTicked
          ? theme.color.red
          : theme.color.primary};
    background-color: ${({ theme, isDeleteMode, isTicked }) =>
      isDeleteMode & isTicked ? theme.color.red : theme.color.gray};
    pointer-events: ${({ isDeleteMode }) => (isDeleteMode ? "none" : "all")};
    cursor: ${({ isDeleteMode }) => (isDeleteMode ? "not-allowed" : "pointer")};
  }

  img {
    display: ${({ isDeleteMode }) => (isDeleteMode ? "none" : "block")};
    width: 8px;
    height: 6px;
  }

  @media (min-width: 1100px) {
    & > div {
      width: 20px;
      height: 20px;
    }

    img {
      width: 10px;
      height: 8px;
    }
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 20px;
  margin: 25px 0 0;
`;

// Delete Modal
export const DeleteContainer = styled.div`
  border-radius: 20px;
  border: 2px solid #cbcbcb;
  background-color: ${({ theme }) => theme.color.white};
  box-shadow: inset 0px -30px 40px #00000017, 0px 24px 65px #a0bdc180;
  color: ${({ theme }) => theme.color.red}; ;
`;

export const TopSide = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 20px 40px;

  & > div {
    display: flex;
    justify-content: space-between;
    gap: 20px;
  }
`;

export const BottomSide = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 40px;
  border-top: 2px solid #cbcbcb;
`;

export const CloseBadge = styled.img`
  ${GlobalStyles.closeBadge}
`;

export const HoverActions = styled.div``;

export const HoverActionsWorkflow = styled.div`
  width: 64px;
  display: flex;
  justify-content: flex-end;
`;

export const HrWorkFlow = styled.hr`
  width: 100%;
  height: 1px;
  background-color: #bababa;
  border: none;
  margin: 20px 0;
`;

export const HoverDetail = styled.div`
  display: flex;
  gap: 5px;
  flex-direction: row;
  justify-content: flex-start !important;
  position: absolute;
  width: 99.7%;
  margin-right: -0.6rem;
  border-top: 1px solid #bbb;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
  /* background: linear-gradient(180deg, #f6f6f6 0%, #faf9f8 71%, #ffffff 100%); */
  background-color: #f0f0f0;
  height: 100%;
  padding: 10px;
  bottom: -50px;
  z-index: 1;
  box-shadow: 0px 3px 9px #00000029;
`;

export const AddColumn = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  gap: 40px;
  align-items: flex-start;
`;

export const NewBox = styled.div`
  display: flex;
  flex-direction: column-reverse;
  position: relative;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 200px;
  background-color: #f0f0f0;
  border-radius: 12px;
  margin: 10px 0;
`;

export const ColumnItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #183573;
  padding: 0 10px;
  border-radius: 12px;
  width: 300px;
  height: 40px;
  ${({ isDeleteMode }) =>
    isDeleteMode
      ? css`
          z-index: ${({ theme }) => theme.z.listItem};
        `
      : css``};
`;

export const Diamond = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: ${({ width }) => (width ? width : "50px")};
  height: ${({ height }) => (height ? height : "50px")};
  border-radius: 8px;
  transform: rotate(45deg);
  margin: 10px;
  border: ${({ selected, borderColor }) =>
    selected
      ? "none"
      : borderColor
      ? `1px solid ${borderColor}`
      : "1px solid lightGrey"};
  color: ${({ borderColor }) => borderColor && borderColor};
  background-color: ${({ selected, backgroundColor }) =>
    selected ? "white" : backgroundColor ? backgroundColor : null};
  & > span {
    transform: rotate(-45deg);
  }
  z-index: 1;
  ${({ isDeleteMode }) =>
    isDeleteMode
      ? css`
          z-index: ${({ theme }) => theme.z.listItem};
        `
      : css``};
`;

export const Oval = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: ${({ width }) => (width ? width : "100px")};
  height: ${({ height }) => (height ? height : "60px")};
  border: ${({ selected, borderColor }) =>
    selected
      ? "none"
      : borderColor
      ? `1px solid ${borderColor}`
      : "1px solid lightGrey"};
  color: ${({ borderColor }) => borderColor && borderColor};
  background-color: ${({ selected, backgroundColor }) =>
    selected ? "white" : backgroundColor ? backgroundColor : null};
  border-radius: 100%;
  margin: 10px;
  gap: 5px;
  z-index: 1;
  ${({ isDeleteMode }) =>
    isDeleteMode
      ? css`
          z-index: ${({ theme }) => theme.z.listItem};
        `
      : css``};
`;

export const Circle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: ${({ width }) => (width ? width : "60px")};
  height: ${({ height }) => (height ? height : "60px")};
  border: ${({ selected, borderColor }) =>
    selected
      ? "none"
      : borderColor
      ? `1px solid ${borderColor}`
      : "1px solid lightGrey"};
  color: ${({ borderColor }) => borderColor && borderColor};
  background-color: ${({ selected, backgroundColor }) =>
    selected ? "white" : backgroundColor ? backgroundColor : null};
  border-radius: 100%;
  margin: 10px;
  z-index: 1;
  ${({ isDeleteMode }) =>
    isDeleteMode
      ? css`
          z-index: ${({ theme }) => theme.z.listItem};
        `
      : css``};
`;

export const Rectangle = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  position: relative;
  width: ${({ width }) => (width ? width : "100px")};
  height: ${({ height }) => (height ? height : "50px")};
  border: ${({ selected, borderColor }) =>
    selected
      ? "none"
      : borderColor
      ? `1px solid ${borderColor}`
      : "1px solid lightGrey"};
  color: ${({ borderColor }) => borderColor && borderColor};
  background-color: ${({ selected, backgroundColor }) =>
    selected ? "white" : backgroundColor ? backgroundColor : null};
  border-radius: 12px;
  margin: 10px;
  z-index: 1;
  ${({ isDeleteMode }) =>
    isDeleteMode
      ? css`
          z-index: ${({ theme }) => theme.z.listItem};
        `
      : css``};
`;

export const StarterItem = styled.div`
  /* background-image: linear-gradient(180deg, #d7ebee, #e4f3f4); */
  box-shadow: inset 0px 0px 120px #75c9db59;

  border-radius: 30px;
  padding: 5px 10px 5px 40px;
  white-space: nowrap;
  position: relative;
`;

export const ColoredCircle = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  width: 30px;
  height: 100%;
  border-radius: 100%;
  background-color: ${({ bg }) => bg};
`;

export const RemoveStarterItem = styled.img`
  position: absolute;
  left: 20px;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 20px;
  transition: 300ms;
  cursor: pointer;
  &:hover {
    width: 22px;
  }
`;
