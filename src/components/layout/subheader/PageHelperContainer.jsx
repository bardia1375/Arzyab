/* eslint-disable no-unused-vars */
import { useState } from "react";

// Styled Elements
import { SubheaderStyles } from "assets/styles/layout/subheader";

// Components
import { EmployeesListHelper } from "./EmployeesListHelper";

export const PageHelperContainer = (props) => {
  const [changeIcons, setChangeIcons] = useState(false);
  const [pageName, setPageName] = useState(null);

  const onMouseOver = () => {
    setChangeIcons(true);
  };
  const onMouseLeave = () => {
    setChangeIcons(false);
  };
  return (
    <SubheaderStyles.PageHelperContainer
      pageName={pageName}
      onMouseOver={() => onMouseOver()}
      onMouseLeave={() => onMouseLeave()}
    >
      {/* {leftSideElement} */}
      <EmployeesListHelper />
    </SubheaderStyles.PageHelperContainer>
  );
};
