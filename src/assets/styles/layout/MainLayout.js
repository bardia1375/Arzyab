import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  /* gap: 1.5rem; */
  height: 100vh;
  width: 100vw;
  max-width: 500px;
  color: ${({ theme }) => theme.color.primary};
  background-image: linear-gradient(180deg, #d7ebee, #e4f3f4);
  box-shadow: inset 0px 0px 120px #75c9db59;
  justify-content: space-between;
  position: relative;
  overflow: hidden;
  & > main {
    flex: ${({ flex }) => (flex ? "1" : "0")};
  }
`;
