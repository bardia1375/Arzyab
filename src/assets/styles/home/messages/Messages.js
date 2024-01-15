import styled, { css } from "styled-components";

export const RequestBody = styled.div`
  height: 75vh;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const TitleStyle = styled.div`
  color: ${({ selected }) => (selected ? "white" : "#37b3b8")};
  background-color: ${({ selected }) => (selected ? "#37b3b8" : "none")};
  padding: ${({ selected }) => (selected ? "10px 40px" : "10px")};
  border-radius: 30px;
  font-size: 2vh;
  font-weight: 400;
  width: ${({ width }) => (width ? width : "50%")};
  text-align: center;
  white-space: nowrap;
  margin: 5px;
  position: relative;
`;

export const RequestHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 10vh;
  background-color: #ecfcfc;
  border-radius: 30px;
  margin-top: 5px;
`;

export const NewRequest = styled.div`
  background-color: #ecfcfc;
  border-radius: 30px;
  padding: 20px 15px;
  height: 100%;
  gap: 3vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  overflow: auto;
`;

export const CustomButton = styled.div`
  color: ${({ color }) => (color ? color : "white")};
  border: ${({ border, color }) => (border ? `1px solid ${color}` : "none")};
  display: flex;
  justify-content: center;
  align-items: center;
  height: 6vh;
  border-radius: 30px;
  background-image: ${({ noBackground }) =>
    noBackground ? "none" : "linear-gradient(to left, #ff8080, #ffb931)"};
  box-shadow: ${({ border }) =>
    border ? "none" : "0px 5px 20px -2px rgba(0, 0, 0, 0.3)"};
  position: relative;
  & > img {
    width: 15px;
    position: absolute;
    left: ${({ left }) => (left ? left : "none")};
    right: ${({ right }) => (right ? right : "none")};
  }
`;

export const RequestCard = styled.div`
  background-color: white;
  width: 100%;
  min-height: 10vh;
  border: 1px solid #bbbbbb;
  border-radius: 16px;
  padding: 10px;
  box-shadow: 0px 3px 10px -2px rgba(0, 0, 0, 0.3);
  position: relative;
  cursor: pointer;
`;

export const RequestCardInfo = styled.div`
  background-image: linear-gradient(to bottom, #f7f7f7, white);
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  opacity: ${({ read }) => (read ? 0.5 : 1)};
`;

export const RequestTitle = styled.div`
  font-size: 3vw;
  color: #e67205;
  width: 100%;
  @media (min-width: 500px) {
    font-size: 18px;
  }
`;

export const RequestDesc = styled.div`
  color: #9c9c9c;
  width: 100%;
  font-size: 2vw;
  @media (min-width: 500px) {
    font-size: 10px;
  }
`;

export const RequestDate = styled.div`
  display: flex;
  color: #9c9c9c;
  font-weight: 400;
  font-size: 1.8vw;
  align-items: center;
  @media (min-width: 500px) {
    font-size: 11px;
  }
`;

export const ListOFRequests = styled.div`
  padding-bottom: 15px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const RequestCardStatusItem = styled.div`
  ${({ type }) => {
    let style;
    switch (type) {
      case "waiting":
        style = css`
          padding: 8px 20px;
          color: #9c9c9c;
          white-space: nowrap;
        `;
        break;
      default:
        style = css``;
        break;
    }
    return style;
  }};
`;

export const Option = styled.div`
  margin-top: 7px;
  font-size: 20px;
  cursor: pointer;
`;

export const OptionMenu = styled.div`
  min-width: 100px;
  display: flex;
  flex-direction: column;
  background-color: grey;
  color: white;
  position: absolute;
  z-index: 1;
  top: 10vh;
  left: 0;
  padding: 10px;
  gap: 10px;
  border-radius: 12px;
  border-bottom-right-radius: ${({ openEdit }) => (openEdit ? "0" : "12px")};
`;

export const OptionItem = styled.div`
  border-radius: 6px;
  text-align: left;
  padding: 5px;
  color: ${({ openEdit }) => (openEdit ? "grey" : "white")};
  background-color: ${({ openEdit }) => (openEdit ? "lightGrey" : "grey")};
  cursor: pointer;
  user-select: none;
  -o-user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
`;
