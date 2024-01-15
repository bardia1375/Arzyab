// Services
import "react-toastify/dist/ReactToastify.css";

// Redux

// Components

// Styled Elements
import { LoginStyles } from "assets/styles/auth";
import styled from "styled-components";

// Images
import NextPage from "assets/images/auth/next-page.svg";
import PageTwoStatus from "assets/images/auth/page-two-status.svg";
import Tik from "assets/images/auth/tik.svg";

const PageTwo = ({ setPage }) => {
  return (
    <LoginStyles.PageTwoBody>
      <LoginStyles.PageTwoDetail>
        <div style={{ color: "#e67205", fontSize: "7vh", fontWeight: "400" }}>
          سلام!
        </div>
        <Title>
          من دستیار شما هستم و از این پس به شما کمک می‌کنم تا به سادگی این کارها
          را انجام دهید
        </Title>
      </LoginStyles.PageTwoDetail>
      <LoginStyles.PageTwoList style={{ whiteSpace: "nowrap" }}>
        <div>
          <div
            style={{
              color: "#183573",
              fontSize: "3vh",
              fontWeight: "600",
              padding: "5px",
              display: "flex",
              gap: "10px",
            }}
          >
            <img width={20} src={Tik} alt="Tik" />
            ثبت تردد
          </div>
          <div
            style={{
              color: "#183573",
              fontSize: "3vh",
              fontWeight: "600",
              padding: "5px",
              display: "flex",
              gap: "10px",
            }}
          >
            <img width={20} src={Tik} alt="Tik" />
            مدیریت کارها و برنامه‌ها
          </div>
          <div
            style={{
              color: "#183573",
              fontSize: "3vh",
              fontWeight: "600",
              padding: "5px",
              display: "flex",
              gap: "10px",
            }}
          >
            <img width={20} src={Tik} alt="Tik" />
            محاسبۀ حقوق و مزایا
          </div>
          <div
            style={{
              color: "#183573",
              fontSize: "3vh",
              fontWeight: "600",
              padding: "5px",
              display: "flex",
              gap: "10px",
            }}
          >
            <img width={20} src={Tik} alt="Tik" />
            ثبت مرخصی و مأموریت
          </div>
        </div>
      </LoginStyles.PageTwoList>
      <LoginStyles.PageOneImage>
        <div
          onClick={() => {
            setPage(3);
          }}
        >
          <img src={NextPage} alt="" />
        </div>
      </LoginStyles.PageOneImage>
      <LoginStyles.PageOneImage>
        <img src={PageTwoStatus} alt="" />
      </LoginStyles.PageOneImage>
    </LoginStyles.PageTwoBody>
  );
};

export default PageTwo;

export const Title = styled.div`
  color: #183573;
  font-size: 4vh;
  font-weight: 300;
  text-align: center;
  /* width: 100%; */
  padding: 10px;

  @media (min-width: 500px) {
    font-size: 35px;
  }
`;
