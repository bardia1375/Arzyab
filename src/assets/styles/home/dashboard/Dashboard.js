import styled from "styled-components";

export const TotalTimeNumber = styled.div`
  font-size: 4vw;
  height: 100%;
  display: flex;
  align-items: center;
  transform: translateY(8px);
  color: grey;
  @media (min-width: 720px) {
    font-size: 22px;
  }
`;

export const TotalWorkNumber = styled.div`
  display: flex;
  align-items: flex-end;
  font-size: 12vw;
  color: #ff4d4d;
  @media (min-width: 720px) {
    font-size: 66px;
  }
`;

export const DashboardBody = styled.div`
  height: 75vh;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 80px;
`;

export const TitleStyle = styled.div`
  color: ${({ selected }) => (selected ? "white" : "#37b3b8")};
  background-color: ${({ selected }) => (selected ? "#37b3b8" : "none")};
  padding: ${({ selected }) => (selected ? "1vh 40px" : "1vh")};
  border-radius: 30px;
  font-size: 2vw;
  font-weight: 400;
  width: 100%;
  text-align: center;
  white-space: nowrap;
  margin: 5px;
  cursor: pointer;
  z-index: 1;
`;

export const DashboardHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #ecfcfc;
  border-radius: 30px;
  margin-bottom: 10px;
`;

export const StatusTypes = styled.div`
  background-color: #ecfcfc;
  border-radius: 16px;
  padding: 20px 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
`;

export const Status = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  white-space: nowrap;
`;
export const RequestCardStatus = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px 0 0;
`;

export const StatusItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  white-space: nowrap;
  gap: 5px;
  width: 100%;
  cursor: pointer;
  padding: 20px;
  border-radius: 26px;
  color: ${({ selected }) => (selected ? "none" : "#4bbbc0")};
  background: ${({ selected }) => (selected ? "#d4eef4" : null)};
  border: ${({ selected }) => (selected ? "1px solid #b1e5ee" : "none")};
  font-size: 3vw;
  @media (min-width: 720px) {
    font-size: 20px;
  }
`;

export const StatusList = styled.div`
  display:flex;
  align-items:center;
  justify-content:center
`;

export const TotalTime = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0 20px 0;
`;

export const SwiftButton = styled.div`
  width: 50px;
  height: 50px;
  z-index: 1;
  background-image: linear-gradient(to bottom left, #3fb6c1, #54d3db);
  box-shadow: -1px 10px 20px -2px rgb(0 0 0 / 30%);
  border-radius: 50%;
`;

export const Collapse = styled.div`
  -moz-transition: height 0.5s;
  -ms-transition: height 0.5s;
  -o-transition: height 0.5s;
  -webkit-transition: height 0.5s;
  transition: height 0.5s;
  height: 0;
  overflow: hidden;
  width: 100%;
`;

export const CollapseDetail = styled.div`
  width: 100%;
  padding: 15px;
  border-radius: 24px;
  background-color: #fbfbfb;
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
`;

export const CollapseItem = styled.div`
  font-size: 3vw;
  @media (min-width: 500px) {
    font-size: 18px;
  }
`;

export const CardTitle = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 10px;
  align-items: center;
  font-size: 2.5vw;
  @media (min-width: 500px) {
    font-size: 18px;
  }
`;

export const AllTrafficsButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  border-radius: 36px;
  padding: 10px;
  color: #e67205;
  border: 1px solid #e67205;
  align-items: center;
  cursor: pointer;
  font-size: 2.5vw;
  @media (min-width: 500px) {
    font-size: 18px;
  }
`;
