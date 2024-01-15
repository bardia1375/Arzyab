import React from "react";
import styled from "styled-components";
import { Outlet } from "react-router-dom";
import { Subheader } from "components/layout";

export const MainBody = (props) => {
  return (
    <>
      <Subheader />
      <Container>
        <Outlet />
      </Container>
    </>
  );
};

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 0 20px;
  height: 100%;
`;
