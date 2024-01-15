/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from "react";
import styled from "styled-components";

export const NavDropContainer = ({ children, setIsShown, isShown }) => {
  const ref = useRef();

  useEffect(() => {
    const closeDropDown = (e) => {
      if (
        ref.current &&
        !ref.current.contains(e.target) &&
        setIsShown !== undefined
      ) {
        setIsShown(false);
      }
    };
    document.body.addEventListener("click", closeDropDown);
    return () => document.body.removeEventListener("click", closeDropDown);
  }, [isShown]);

  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     if (ref.current && !ref.current.contains(event.target)) {
  //       isShown && setIsShown(false);
  //     }
  //   };
  //   document.addEventListener('click', handleClickOutside, true);
  //   return () => {
  //     document.removeEventListener('click', handleClickOutside, true);
  //   };
  // }, [ isShown ]);

  return <DropContainer ref={ref}>{children}</DropContainer>;
};

const DropContainer = styled.div`
  position: absolute;
  z-index: ${({ theme }) => theme.z.navDrop};
  top: 100%;
  right: -4px;
  margin-top: 0px;
  border-radius: 20px;
  padding: 10px;
  background: linear-gradient(216deg, #ffffff 0%, #92d9e8 100%);
  box-shadow: 0px 0px 30px #0000003d;
`;
