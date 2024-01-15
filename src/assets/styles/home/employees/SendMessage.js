import styled from "styled-components";
import { GlobalStyles } from "assets/styles/global";

export const Container = styled.div`
  ${GlobalStyles.container}
  display: flex;
  flex-direction: column;
  padding: 32px;
  border-radius: 16px;
  background: #fff;
  box-shadow: inset 0px -30px 99px #0000000a, 0px 8px 36px #a0bdc180;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;

  & > div:first-child {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-top: 20px;
    color: #8e8e8e;
    overflow: auto;
  }

  & > textarea {
    width: calc(100% - 32px);
    height: 30vh;
    padding: 16px;
    border-radius: 12px;
    border: 2px solid #bababa;
    font-size: 18px;
    overflow: auto;

    &::placeholder {
      color: #bababa;
      font-size: 18px;
      font-weight: 300;
    }
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const ReciversContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  height: 50px;
  padding: 0 10px;
  border-radius: 12px;
  border: 2px solid #bababa;
`;

export const ReciverItem = styled.div`
  display: flex;
  gap: 16px;
  padding: 0 10px;
  border-radius: 20px;
  border: 1px solid ${({ theme }) => theme.color.secondary};
  color: ${({ theme }) => theme.color.secondary};

  img {
    width: 14px;
    transition: 300ms;
    cursor: pointer;

    :hover {
      transform: scale(1.1);
    }

    @media (min-width: 1100px) {
      width: 20px;
    }
  }
`;
