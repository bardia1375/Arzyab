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
  cursor: pointer;
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

export const Status = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  white-space: nowrap;
`;

export const StatusItem = styled.div`
  color: ${({ selected }) => (selected ? "none" : "#37b3b8")};
  background-color: ${({ selected }) => (selected ? "#37b3b8" : "none")};
  /* padding: ${({ selected }) => (selected ? "10px 40px" : "10px")}; */
  padding: 10px 2vw;
  border-radius: 20px;
  font-size: 2vh;
  font-weight: 400;
  background: ${({ selected }) =>
    selected ? "rgba(214, 238, 244, 0.95)" : null};
  border: ${({ selected }) =>
    selected ? "1px solid rgba(86, 172, 194, 0.6)" : null};
`;

export const RequestCard = styled.div`
  background-color: ${({ deleted }) => (deleted ? "#ed4539" : "white")};
  color: ${({ deleted }) => (deleted ? "white" : "black")};
  width: 100%;
  min-height: 10vh;
  border: 1px solid #bbbbbb;
  border-radius: 16px;
  padding: 10px;
  box-shadow: 0px 3px 10px -2px rgba(0, 0, 0, 0.3);
  position: relative;
`;

export const RequestCardInfo = styled.div`
  /* background-color: #f3f3f3; */
  /* background-image: linear-gradient(to bottom, #f7f7f7, white); */

  background-color: ${({ deleted }) => (deleted ? "#ed4539" : "white")};
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  /* border-top-left-radius: 30px;
  border-top-right-radius: 30px; */
  /* padding: 10px; */
`;

export const ListOFRequests = styled.div`
  /* margin: 10px 0; */
  padding-bottom: 15px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const RequestCardStatus = styled.div`
  display: flex;
  justify-content: ${({ justify }) => (justify ? justify : "space-between")};
  margin: 10px 0 0;
`;

export const RequestCardStatusItem = styled.div`
  ${({ type }) => {
    let style;
    switch (type) {
      case "waiting":
        style = css`
          padding: 8px 20px;
          color: ${({ deleted }) => (deleted ? "white" : "#9c9c9c")};
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

export const Image = styled.img`
  transition: 500ms;
  cursor: pointer;
  :hover {
    scale: 1.2;
  }
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
  /* height: 150px; */
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
  opacity: ${({ disabled }) => (disabled ? 0.2 : 1)};
  /* :hover {
    color: grey;
    background-color: lightgrey;
  } */
`;

export const EditItem = styled.div`
  position: absolute;
  border-radius: 6px;
  border-bottom-left-radius: 0;
  border-top-left-radius: 0;
  background-color: grey;
  color: white;
  right: -65px;
  padding: 10px;
  bottom: -10px;
  cursor: pointer;
  /* :hover {
    color: grey;
    background-color: lightgrey;
  } */
`;
