import styled, { keyframes } from "styled-components";

export const Loading = () => {
  return (
    <Wrapper>
      <div></div>
      <div></div>
      <div></div>
    </Wrapper>
  );
};
const roller = keyframes`
0% {
      top: 10%;
      height: 80%;
    }
    50%, 100% {
      top: 30%;
      height: 40%;
    } `;
const Wrapper = styled.div`
  display: inline-block;
  position: relative;
  width: 100%;
  height: 100%;

  & div {
    display: inline-block;
    position: absolute;
    left: 10%;
    width: 20%;
    background: ${({ theme }) => `${theme.color.red}`};
    animation-name: ${roller};
    animation-duration: 1.2s;
    animation-iteration-count: infinite;
    animation-timing-function: cubic-bezier(0, 0.5, 0.5, 1);
  }
  & div:nth-child(1) {
    left: 10%;
    animation-delay: -0.24s;
  }
  & div:nth-child(2) {
    left: 40%;
    animation-delay: -0.12s;
  }
  & div:nth-child(3) {
    left: 70%;
    animation-delay: 0;
  }
  animation-name: ${roller};
`;
