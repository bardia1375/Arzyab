/* eslint-disable no-sequences */
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

// Components
import { Typography, NavDropContainer } from "components/common";
import { Link, useNavigate } from "react-router-dom";

export const NavbarFooItem = ({
  text,
  icon,
  color,
  bg,
  border,
  innerDrop,
  index,
  handleChangeIcon,
  item,
  getItems,
  setIsShown,
  setIndexNavbar,
  navbarItems,
}) => {
  const [show, setShow] = useState(false);
  const [plusIcon, setpPlusIcon] = useState(true);
  const Navigate = useNavigate();
  const ref = useRef();
  const handleShow = () => setShow(true);
  const handleHide = () => setShow(false);
  const showNavbarItems = () => {
    return setIsShown(false), setIndexNavbar(-1);
  };
  // setpPlusIcon(!plusIcon)

  // //first useEffect for persisit items of navbar when refresh page
  // useEffect(() => {
  //   setpPlusIcon(JSON.parse(localStorage.getItem('plusIcon')))  ;
  // }, []);

  // //second useEffect for persisit items of navbar when refresh page
  // useEffect(() => {
  //   window.localStorage.setItem('plusIcon', JSON.stringify(plusIcon));
  // }, [plusIcon]);

  const innerDropElements = innerDrop?.map((item, idx) => (
    <Link key={idx} to={`${item.path}`}>
      <Typography size="sm" weight="light" key={idx}>
        {item.text}
      </Typography>
    </Link>
  ));

  const ChangeIcon = (index) => {
    setpPlusIcon(!plusIcon);
    handleChangeIcon(index);
  };

  const getItemsnavbar = (item, index) => {
    // Navigate(item?.route);
    ChangeIcon(index);

    setIndexNavbar(navbarItems.length);

    return getItems({
      text: item.text,
      id: item?.id,
      link: item?.link,
      route: item?.route,
      innerDrop: item.innerDrop,
    });
  };

  useEffect(() => {
    const closeDropDown = (e) => {
      if (e.path[0] !== ref.current) {
        setShow(false);
      }
    };
    document.body.addEventListener("click", closeDropDown);
    return () => document.body.removeEventListener("click", closeDropDown);
  }, []);

  const navigateLink = (item) => {
    Navigate(item?.route);

    // return getItems({
    //   text: item.text,
    //   id: item?.id,
    //   link: item?.link,
    //   route: item?.route,
    //   innerDrop: item.innerDrop,
    // });
  };
  return (
    <Container
      ref={ref}
      onMouseOver={handleShow}
      onMouseLeave={handleHide}
      bg={bg}
      color={color}
      border={border}
      plusIcon={plusIcon}
    >
      <button onClick={() => navigateLink(item)}>
        <div style={{ width: "80%" }} onClick={() => showNavbarItems()}>
          <Typography size="sm">{text}</Typography>
        </div>
        <img
          onClick={() => getItemsnavbar(item, index)}
          src={icon}
          alt={text}
        />
      </button>
      {innerDrop?.length > 0 && show && (
        <NavDropContainer onMouseEnter={handleShow} onMouseLeave={handleHide}>
          <InnerDrop>{innerDropElements}</InnerDrop>
        </NavDropContainer>
      )}
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  display: flex;

  & > button {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.3rem 1rem 0.3rem 0.5rem;
    border-radius: 8px;
    border: ${({ theme, border }) =>
      border ? `1px dashed ${theme.color.secondary}` : ""};
    color: ${({ color }) => color};
    background: ${({ bg }) => bg};
    cursor: pointer;
    white-space: nowrap;
    &:hover {
      background: ${({ plusIcon }) => (plusIcon ? `#183573` : `#183573`)};
      color: #fff;
      transition: 0.25s all;
    }

    img {
      width: 14px;
      border: ${({ color }) => color};
    }

    @media (min-width: 1100px) {
      img {
        width: 18px;
        border: ${({ color }) => color};
      }
    }
    @media (min-width: 1400px) {
      img {
        width: 22px;
      }
    }
  }
`;

const InnerDrop = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 8px 16px;
  gap: 16px;
  z-index: ${({ theme }) => theme.z.navDrop};
  max-width: 200px;
  height: 150px;
  overflow-y: scroll;
  white-space: nowrap;
  span {
    color: ${({ theme }) => theme.color.secondary};
  }
`;
