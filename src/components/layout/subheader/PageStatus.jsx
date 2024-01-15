/* eslint-disable no-unused-vars */
/* eslint-disable eqeqeq */
import { useState } from "react";
import PropTypes from "prop-types";

// Components
// import { pagesStatusData } from "components/layout/subheader/Module";

// Styled Elements
import { SubheaderStyles } from "assets/styles/layout/subheader";
import { Menu } from "./Menu";

// Images
import MenuIcon from "assets/images/subheader/right/menu.svg";
import styled from "styled-components";

export const PageStatus = ({ title, icon, badge, path, setPath }) => {
  const [pageStatus, setPageStatus] = useState();
  // const statusSetHandler = (name) =>
  //   setPageStatus(pagesStatusData.find((s) => s.name === name));
  // useEffect(() => {
  //   // if (location.pathname.includes("/")) {
  //   statusSetHandler("employees-list");
  //   // }
  // }, [location.pathname]);

  const [openModal, setOpenModal] = useState(false);
  const openMenu = () => {
    setOpenModal(true);
  };

  return (
    <div
      style={{
        position: "absolute",
        top: "0",
        width: "100%",
        height: `${openModal ? "100%" : "0"}`,
        zIndex: openModal ? "3" : "2",
      }}
    >
      <Menu openModal={openModal} setOpenModal={setOpenModal} />
      <SubheaderStyles.PageStatus onClick={openMenu} type={pageStatus?.type}>
        {/* <MsgNoti>2</MsgNoti> */}
        <img src={MenuIcon} alt="icon" />
      </SubheaderStyles.PageStatus>
    </div>
  );
};

PageStatus.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.node,
  badge: PropTypes.node,
};

export const MsgNoti = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  background-color: #ff8800;
  width: 22px;
  height: 22px;
  top: 0;
  left: 0;
  border-radius: 50%;
`;
