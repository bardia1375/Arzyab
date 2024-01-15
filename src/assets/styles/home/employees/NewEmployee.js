import styled from "styled-components";
import { GlobalStyles } from "assets/styles/global";
import {
  gridContainer,
  gridItem,
  input,
  inputWithIconContainer,
} from "./empFormAndDataCss";

export const Container = styled.div`
  ${GlobalStyles.container}
  position: relative;
  height: 100%;
  padding: 24px;
  border-radius: 24px;
  text-align: center;
  background: ${({ theme }) => theme.color.white};
  box-shadow: inset 0px -30px 99px #0000000a, 0px 8px 36px #a0bdc180;

  & > span {
    display: inline-block;
    color: ${({ theme }) => theme.color.brown};
    margin-bottom: 40px;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  border-radius: 12px;
  margin-top: 20px;
  padding: 20px;
  background: linear-gradient(180deg, #f6f6f6 0%, #faf9f8 71%, #ffffff 100%)
    no-repeat;
`;

export const RemoveArrows = styled.div`
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  input[type="number"] {
    -moz-appearance: textfield;
  }
`;

export const GridContainer = styled.div`
  ${gridContainer}
`;

export const GridItem = styled.div`
  ${gridItem}

  & > span:first-child {
    color: ${({ theme }) => theme.color.darkGray};
  }
  & > span:last-child {
    color: ${({ theme }) => theme.color.dark};
  }
`;

export const FormGroup = styled.div`
  ${gridItem}

  & > span {
    color: ${({ theme }) => theme.color.red};
    padding: 10px 20px;
  }

  & > input {
    ${input}
  }
`;

export const FormGroupWithIcon = styled.div`
  ${gridItem}

  & > span {
    color: ${({ theme }) => theme.color.red};
    padding: 10px 20px;
  }

  & > div {
    ${inputWithIconContainer}
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  margin-left: -15px;
`;

export const ConfirmationContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  text-align: center;
`;

export const ErrorMessage = styled.div`
  margin-top: 10px;
  width: 100%;
  border-radius: 50%;
`;
