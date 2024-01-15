import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100vh;
  background: url(${({ bg }) => bg}) no-repeat 100%;
  background-size: cover;
  position: relative;

  & > *:nth-child(2) {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

export const Header = styled.div`
  padding: 8px 24px;
  border: 1px solid #75c9db80;
  border-radius: 0 0 32px 32px;
  background: #f9f8f7;
  box-shadow: inset 0px 0px 80px #75c9db80, 0px 3px 3px #8125254d;
  transition: 800ms;

  &:hover {
    transform: scale(1.05);
  }
`;

export const LoginBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 450px;
  border: 1px solid #eee;
`;

export const BoxHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  border-radius: 32px 32px 0px 0px;
  background: #f9f8f7;
  /* box-shadow: inset 0 4px 10px #75c9db80; */
`;

export const BoxForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 2rem 4rem;
  border-radius: 0 0 32px 32px;
  background: #fff;
  box-shadow: inset 0px 0px 80px #75c9db80, 0px 3px 3px #8125254d;
`;

export const Title = styled.div`
  padding: 10px;
  border-bottom: 3px solid ${({ theme }) => theme.color.orange};
  color: ${({ theme }) => theme.color.primary};
  font-size: 28px;
  font-weight: 500;
  text-align: center;
`;

export const InputGroupt = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 8px 16px;
  border-radius: 20px;
  background: #fff;
  border: 1px solid #cbcbcb;

  img {
    height: 16px;
  }

  input {
    flex: 1;
    font-size: 16px;

    &::placeholder {
      font-size: 16px;
      color: #cbcbcb;
    }
  }
`;

export const LoginActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;

  & > a {
    /* color: ${({ theme }) => theme.color.orange}; */
    transition: transform 300ms;
    &:hover {
      transform: scale(1.05);
    }

    & > span {
      color: #e67205;
    }
  }
`;

export const LoginButton = styled.button`
  padding: 2px 30px;
  border-radius: 20px;
  background: linear-gradient(270deg, #75c9db 0%, #04165d 100%);
  color: #fff;
  cursor: pointer;
  transition: 400ms;

  &:hover {
    transform: scale(1.05);
  }
`;

// Reset Password Page
export const ResetPassBody = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 30px;
  border-radius: 0 0 30px 30px;
  background: #ff808030;
  box-shadow: inset 0px 0px 80px #75c9db75, 0px 3px 3px #8125254d;
`;

// Confirmed Section
export const Confirmed = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 40px 20px;
  border-radius: 30px;
  background: #9bfbff05;
  box-shadow: inset 0px 0px 80px #75c9db40, 0px 3px 3px #8125254d;
  backdrop-filter: blur(5px);

  & > div {
    color: ${({ theme }) => theme.color.secondary};
  }

  img {
    height: 60px;
  }
`;
