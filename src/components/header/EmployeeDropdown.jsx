import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import PropTypes from "prop-types";

// Components
import { NavDropContainer } from "components/common";
import { EmployeeDropItem } from "components/header/EmployeeDropItem";

// eslint-disable-next-line no-unused-vars
const dropData = [
  {
    text: "کارمند جدید",
    defSrc: require("assets/images/header/employee-dropdown/user-secondary.svg")
      .default,
    hoverSrc: require("assets/images/header/employee-dropdown/user-primary.svg")
      .default,
    badge: require("assets/images/common/plus/white-color-yellow-bg.svg")
      .default,
    path: "/employees/new-employee",
  },
  {
    text: "لیست کارمندان",
    defSrc: require("assets/images/header/employee-dropdown/user-secondary.svg")
      .default,
    hoverSrc: require("assets/images/header/employee-dropdown/user-primary.svg")
      .default,
    badge: "",
    path: "/employees/list",
  },
  {
    text: "کارمندان حذف شده",
    defSrc: require("assets/images/header/employee-dropdown/user-secondary.svg")
      .default,
    hoverSrc: require("assets/images/header/employee-dropdown/user-primary.svg")
      .default,
    badge: require("assets/images/common/trash/white-color.svg").default,
    path: "/employees/deleted-list",
  },
  {
    text: "ارسال پیامک",
    defSrc:
      require("assets/images/header/employee-dropdown/message-secondary.svg")
        .default,
    hoverSrc:
      require("assets/images/header/employee-dropdown/message-primary.svg")
        .default,
    badge: "",
    path: "/employees/send-message",
  },
  {
    text: "بارگذاری گروهی",
    defSrc:
      require("assets/images/header/employee-dropdown/upload-secondary.svg")
        .default,
    hoverSrc:
      require("assets/images/header/employee-dropdown/upload-primary.svg")
        .default,
    badge: "",
    path: "/employees/upload",
  },
];

export const EmployeeDropdown = ({
  button,
  route,
  title,
  innerDrop,
  indexNavbar,
  index,
}) => {
  const location = useLocation();
  const [isShown, setIsShown] = useState(false);
  const isShownChangeHandler = (bool) => setIsShown(bool);
  const Navigate = useNavigate();
  useEffect(() => {
    setIsShown(false);
  }, [location?.pathname]);

  return (
    <Container
      onMouseOver={() => isShownChangeHandler(true)}
      onMouseLeave={() => isShownChangeHandler(false)}
    >
      <Button
        button={button}
        style={{ marginRight: "4px" }}
        onClick={() => Navigate("/employees/list")}
      >
        {title}
      </Button>
      {/* {index !== indexNavbar - 1 && index !== indexNavbar ? (
        <Spacer line={index} />
      ) : null} */}

      {isShown && (
        <NavDropContainer>
          <DropList>
            {innerDrop?.map((dropItem, idx) => (
              <EmployeeDropItem key={idx} {...dropItem} />
            ))}
          </DropList>
        </NavDropContainer>
      )}
    </Container>
  );
};

EmployeeDropdown.propTypes = {
  title: PropTypes.string.isRequired,
};

const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 10px;
  height: 100%;
`;

const Button = styled.button`
  ${(props) => {
    switch (props.button) {
      case "white":
        return css`
          font-size: 1.1rem;
          padding: 0.12rem 0.5rem;
          border-radius: 20px;
          background-color: ${({ theme }) => theme.color.light};
          color: ${({ theme }) => theme.color.primary};
          width: 80px;
          text-align: center;
        `;
      default:
        return css`
          font-size: 1.1rem;
          margin-left: 4px;
        `;
    }
  }}

  cursor: pointer;
  transition: 300ms;

  &:hover {
    transform: scale(1.05);
  }
  /* 
  @media (min-width: 1100px) {
    padding: 0.22rem 1.8rem;
  }

  @media (min-width: 1400px) {
    padding: 0.22rem 2.25rem;
  } */
`;

const DropList = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 15px;
  gap: 1rem;
  width: 140px;
  color: ${({ theme }) => theme.color.primary};

  @media (min-width: 1100px) {
    width: 170px;
  }

  @media (min-width: 1400px) {
    width: 190px;
  }
`;
