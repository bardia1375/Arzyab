import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import PropTypes from "prop-types";

// Components
import { Typography } from "components/common";

export const EmployeeDropItem = ({ text, defSrc, hoverSrc, badge, path }) => {
  const [isActive, setIsActive] = useState();
  const imgRef = useRef();
  const navRef = useRef();

  const handleMouseOver = () => imgRef.current.setAttribute("src", hoverSrc);

  const handleMouseOut = () => {
    if (navRef.current.classList.contains("active")) return;
    imgRef.current.setAttribute("src", defSrc);
  };

  useEffect(() => {
    if (navRef.current.classList.contains("active")) {
      setIsActive(true);
      imgRef.current.setAttribute("src", hoverSrc);
    }
  }, [hoverSrc]);

  return (
    <NavLink to={path} ref={navRef}>
      <DropItem
        isActive={isActive}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      >
        <DropIcon>
          <img ref={imgRef} src={defSrc} alt={text} />
          {badge && <DropBadge src={badge} />}
        </DropIcon>
        <Typography size="sm" weight="medium">
          {text}
        </Typography>
      </DropItem>
    </NavLink>
  );
};

EmployeeDropItem.propTypes = {
  text: PropTypes.string,
  defSrc: PropTypes.string,
  hoverSrc: PropTypes.string,
  badge: PropTypes.string,
  path: PropTypes.string,
};

export const DropItem = styled.li`
  position: relative;
  display: flex;
  align-items: center;
  gap: 6px;
  color: ${({ theme, isActive }) =>
    isActive ? theme.color.primary : theme.color.secondary};
  transition: 100ms;

  &:hover {
    color: ${({ theme }) => theme.color.primary};
  }
`;

export const DropIcon = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  img:first-child {
    width: 24px;
  }
`;

export const DropBadge = styled.img`
  position: absolute;
  top: -3px;
  left: -3px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #ff5757;
  padding: 1px;
`;
