import React from "react";
import styled from "styled-components";

export const ButtonLoding = ({ children }) => {
  return <LodingContainer>{children}</LodingContainer>;
};

const LodingContainer = styled.div`
  border: 2px solid #f3f3f3;
  border-radius: 50%;
  border-top: 2px solid #3498db;
  height: 13px;
  animation: spin 1s linear infinite;
  width: 13px;
  margin-left: 1rem;
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
