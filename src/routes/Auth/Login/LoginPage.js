import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// Services
import { INITIAL_VALUE, validate } from "services/input-initial";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Redux
import { userLogin } from "../Module";

// Components
import { Typography } from "components/common";

// Styled Elements
import { LoginStyles } from "assets/styles/auth";

// import LoginLogo from "assets/images/auth/login-logo.svg";
import JGPRLogo from "assets/images/header/logo.png";
import PreviousPage from "assets/images/auth/previous-page.svg";
import LoginPageStatus from "assets/images/auth/login-page-status.svg";
import Avatar from "assets/images/auth/avatar.svg";
import Eye from "assets/images/auth/eye-orange.svg";
import { ButtonLoding } from "./../../../components/common/ButtonLoding";
import styled from "styled-components";

const LoginPage = ({ setPage }) => {
  const dispatch = useDispatch();
  // States

  const [employeeId, setEmployeeId] = useState({ ...INITIAL_VALUE });
  const [password, setPassword] = useState({ ...INITIAL_VALUE });
  const [showing, setShowing] = useState(false);

  const employeeIdChangeHandler = (event) => setEmployeeId(validate(event));
  const passwordChangeHandler = (event) => setPassword(validate(event));
  const { userLoginLoading } = useSelector((state) => state.auth);

  const submitHandler = (event) => {
    event.preventDefault();
    if (!employeeId.isValid || !password.isValid) return;

    // const user = new FormData();
    // user.append("UserName", employeeId.value);
    // user.append("PassWord", password.value);

    const user = {
      UserName: employeeId.value,
      PassWord: password.value,
    };

    dispatch(userLogin(user));
    localStorage.setItem("firstTime", true);
    // dispatch(setAuthentication(true))
    // navigate("/")
  };

  const showPass = () => {
    if (showing) {
      setShowing(false);
    } else {
      setShowing(true);
    }
  };

  return (
    <LoginStyles.LoginPageBody>
      {/* <LoginStyles.Header> */}
      <img width={110} src={JGPRLogo} alt="JGPRLogo" />
      {/* </LoginStyles.Header> */}
      <form onSubmit={submitHandler}>
        <LoginStyles.LoginTitle hasBorder="true">
          ورود به نرم افزار
          <LoginStyles.Spacer
            style={{ marginBottom: "20px" }}
            hasBorder="true"
          />
        </LoginStyles.LoginTitle>

        <LoginStyles.InputGroup style={{ marginBottom: "20px" }}>
          <img src={Avatar} alt="Avatar" />
          <input
            type="text"
            placeholder="شمارۀ پرسنلی خود را وارد کنید"
            name="employeeId"
            value={employeeId.value}
            required
            onInvalid={(e) =>
              e.target.setCustomValidity("لطفا شماره پرسنلی خود را وارد نمایید")
            }
            onInput={(e) => e.target.setCustomValidity("")}
            onChange={employeeIdChangeHandler}
          />
        </LoginStyles.InputGroup>
        <LoginStyles.InputGroup style={{ marginBottom: "20px" }}>
          <img src={Eye} alt="Eye" onClick={showPass} />
          <input
            type={showing ? "text" : "password"}
            placeholder="رمز عبور خود را وارد کنید"
            name="password"
            value={password.value}
            onChange={passwordChangeHandler}
          />
        </LoginStyles.InputGroup>
        <LoginStyles.Actions>
          {/* <Link to="/password/reset"> */}
          {/* <Typography size="lg" weight="light">
            کد فعال‌سازی به این شماره ارسال می‌شود.
          </Typography> */}
          {/* </Link> */}
          <ToastContainer />
        </LoginStyles.Actions>
        <LoginStyles.LoginButton>
          {userLoginLoading && <ButtonLoding />}

          <Typography size="lg">ورود</Typography>
        </LoginStyles.LoginButton>
      </form>
      <LoginStyles.PageOneImage style={{ margin: "40px" }}>
        {localStorage.getItem("firstTime") === null && (
          <div
            onClick={() => {
              setPage(2);
            }}
          >
            <img src={PreviousPage} alt="" />
          </div>
        )}
      </LoginStyles.PageOneImage>
      <LoginStyles.PageOneImage>
        <img src={LoginPageStatus} alt="" />
      </LoginStyles.PageOneImage>
    </LoginStyles.LoginPageBody>
  );
};

export default LoginPage;

export const Shape = styled.div`
  width: 100px;
  height: 100px;
  background-color: red;
  position: relative;
  ::after {
    content: "";
    width: 50px;
    height: 100%;
    border-top: 50px solid transparent;
    border-bottom: 50px solid transparent;
    border-right: 50px solid red;
    position: absolute;
    left: -50px;
    background-color: blue;
  }
`;
export const Shape1 = styled.div`
  width: 100%;
  height: 0;
  width: 0;
  height: 0;
  border-top: 50px solid transparent;
  border-bottom: 50px solid transparent;
  border-right: 50px solid red;
  position: absolute;
  left: -50px;
`;
