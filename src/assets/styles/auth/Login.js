import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 450px;
  border: 1px solid #eee;
  /* margin-top: 40px; */
  position: absolute;
  top: 50%; /* position the top  edge of the element at the middle of the parent */
  left: 50%; /* position the left edge of the element at the middle of the parent */
  transform: translate(-50%, -50%);
`;

export const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px;
  border-radius: 32px 32px 0px 0px;
  background: ${({ theme }) => theme.color.light};
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 2rem 4rem;
  border-radius: 0 0 32px 32px;
  background: ${({ theme }) => theme.color.white};
  box-shadow: inset 0px 0px 80px #75c9db80, 0px 3px 3px #8125254d;
  background: transparent
    linear-gradient(180deg, #b6dfe67c 0%, var(--unnamed-color-4af3f8) 100%) 0%
    0% no-repeat padding-box;
  border: 1px solid #75c9db4d;
  opacity: 0.9;
  backdrop-filter: blur(2px);
  -webkit-backdrop-filter: blur(2px);
`;

export const Title = styled.div`
  padding: 16px 0px 0px 0px;
  color: ${({ theme }) => theme.color.primary};
  font-size: 28px;
  font-weight: 500;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
  justify-content: center;
`;

export const LoginTitle = styled.div`
  padding: 16px 0px 0px 0px;
  color: ${({ theme }) => theme.color.primary};
  font-size: 4vh;
  font-weight: 500;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
  justify-content: center;
`;

export const Spacer = styled.div`
  border-bottom: 1px solid
    ${({ theme, hasBorder }) => (hasBorder ? theme.color.orange : "tranparent")};
  width: 280px;
`;

export const InputGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 4px 16px;
  border-radius: 20px;
  border: 0.5px solid var(--unnamed-color-cbcbcb);
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: inset 0px 1px 3px #00000029;

  img {
    height: 16px;
  }

  input {
    flex: 1;
    font-size: 16px;
    font-weight: 300;

    &::placeholder {
      font-size: 16px;
      color: var(--unnamed-color-666666);
    }
  }
`;

export const Actions = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.color.orange};
`;

export const Button = styled.button`
  padding: 2px 30px;
  border-radius: 20px;
  background: linear-gradient(270deg, #75c9db 0%, #04165d 100%);
  color: ${({ theme }) => theme.color.white};
  cursor: pointer;
  transition: 400ms;

  &:hover {
    transform: scale(1.05);
  }
`;

export const LoginButton = styled.button`
  /* padding: 2px 30px; */
  margin-top: 20px;
  display: flex;
  padding: 7px 0;
  justify-content: center;
  border-radius: 20px;
  width: 100%;
  background: linear-gradient(270deg, #75c9db 0%, #04165d 100%);
  color: ${({ theme }) => theme.color.white};
  cursor: pointer;
  transition: 400ms;

  &:hover {
    transform: scale(1.05);
  }
`;

export const LoginBody = styled.div`
  background-color: #d6eff4;
  height: 100vh;
  width: 100vw;
  max-width: 500px;
`;

export const PageOneBody = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: column;
  padding: 20vh;
`;

export const PageTwoBody = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: column;
`;

export const PageOneImage = styled.div`
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const PageOneDetail = styled.div`
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const PageTwoDetail = styled.div`
  /* width: 100vw; */
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const PageTwoList = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const LoginPageBody = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
