/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// Services
import { INITIAL_VALUE, validate } from "services/input-initial";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Redux
import { userLogin } from "../Module";

// Components
import PageOne from "./PageOne";
import PageTwo from "./PageTwo";
import LoginPage from "./LoginPage";

// Styled Elements
import { LoginStyles } from "assets/styles/auth";

const Login = () => {
  const dispatch = useDispatch();
  // States

  const [employeeId, setEmployeeId] = useState({ ...INITIAL_VALUE });
  const [password, setPassword] = useState({ ...INITIAL_VALUE });

  const employeeIdChangeHandler = (event) => setEmployeeId(validate(event));
  const passwordChangeHandler = (event) => setPassword(validate(event));
  const { userLoginLoading } = useSelector((state) => state.auth);

  const submitHandler = (event) => {
    event.preventDefault();
    if (!employeeId.isValid || !password.isValid) return;

    const user = new FormData();
    user.append("UserName", employeeId.value);
    user.append("PassWord", password.value);

    dispatch(userLogin(user));
    // dispatch(setAuthentication(true))
    // navigate("/")
  };

  const [page, setPage] = useState(1);

  return (
    // <LoginLayout>
    //   <LoginStyles.Container>
    <LoginStyles.LoginBody>
      {page === 1 && <PageOne page={page} setPage={setPage} />}
      {page === 2 && <PageTwo setPage={setPage} />}
      {page === 3 && <LoginPage setPage={setPage} />}
    </LoginStyles.LoginBody>
    //   </LoginStyles.Container>
    // </LoginLayout>
  );
};

export default Login;
