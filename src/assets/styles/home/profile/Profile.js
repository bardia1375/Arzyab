import styled from "styled-components";

export const RequestBody = styled.div`
  height: 75vh;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const RowDetail = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 2vh;
  margin-bottom: 10px;
`;

export const RowDetailChildren = styled.div`
  font-weight: 600;
  & span {
    font-weight: 400;
  }
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
