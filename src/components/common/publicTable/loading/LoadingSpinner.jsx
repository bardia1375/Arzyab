import React from "react";
import styled from "styled-components";
// import "./loading.css";

export default function LoadingSpinner({ size }) {
  return (
    <SpinnerContainer>
      <LodingSpinner size={size} />
    </SpinnerContainer>
  );
}

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
`;
const LodingSpinner = styled.div`
  width: ${({ size }) => (size ? `${size}px` : "50px")};
  height: ${({ size }) => (size ? `${size}px` : "50px")};
  margin: 5px;
  border: 3px solid #c0ddfd;
  border-top: 3px solid #4ccace;
  border-radius: 50%;
  animation: spinner 1.5s linear infinite;
  @keyframes spinner {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
