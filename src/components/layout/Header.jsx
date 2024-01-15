/* eslint-disable no-unused-vars */
// Components
import { Navbar } from "components/layout";
import { Typography, Spacer } from "components/common";

// Styled Elements
import { HeaderStyles } from "assets/styles/layout";

// Images
import Setting from "assets/images/header/setting.svg";
import Power from "assets/images/header/power.svg";
import Refresh from "assets/images/header/refresh.svg";
import TickportLogo from "assets/images/header/tickport-logo.png";
import { useState } from "react";
import { setAuthentication } from "routes/Auth/Module";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

export const Header = () => {
  const dispatch = useDispatch();
  const { Avatar } = useSelector((state) => state.auth);

  const user = {
    name: "حمیدرضا نوروزی مطلق",
    employeeId: "12000",
  };
  const [indexNavbar, setIndexNavbar] = useState(null);

  const logout = () => {
    dispatch(setAuthentication(false));
  };

  const User = JSON.parse(localStorage.getItem("personsData"));
  return (
    <HeaderStyles.Container>
      {/* <HeaderStyles.User>
        {User?.Avatar ? (
          <img src={Avatar} alt="UserImage" />
        ) : (
          <div>
            {`${User?.FirstName}`.charAt(0)} {`${User?.LastName}`.charAt(0)}
          </div>
        )}
        <div>
          <Typography>{`${User?.FirstName} ${User?.LastName}`}</Typography>
          <Typography size="xs" weight="thin">
            کد کارمندی: &nbsp; {User?.PersonnelId}
          </Typography>
        </div>
      </HeaderStyles.User>
      <Spacer />
      <Navbar indexNavbar={indexNavbar} setIndexNavbar={setIndexNavbar} />
      <HeaderStyles.LeftSide>
        <HeaderStyles.Options>
          <img src={Setting} alt="Setting" />
          <img src={Refresh} alt="Refresh" />
          <img src={Power} alt="Power" onClick={logout} />
        </HeaderStyles.Options>
        <Spacer />
        <HeaderStyles.Logo src={TickportLogo} alt="TickportLogo" />
      </HeaderStyles.LeftSide> */}
    </HeaderStyles.Container>
  );
};
