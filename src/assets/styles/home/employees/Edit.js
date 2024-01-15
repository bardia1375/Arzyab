import styled from "styled-components";
import { NewEmployeeStyles as style } from "assets/styles/home/employees";
import { input } from "./empFormAndDataCss";

export const Container = styled(style.Container)``;
export const Content = styled(style.Content)``;
export const GridContainer = styled(style.GridContainer)``;
export const GridItem = styled(style.GridItem)``;
export const ButtonContainer = styled(style.ButtonContainer)``;
export const FormGroupWithIcon = styled(style.FormGroupWithIcon)`
  & > div {
    border: 0;
  }
`;
export const ConfirmationContainer = styled(style.ConfirmationContainer)``;
export const FormGroup = styled(style.FormGroup)`
  & > input {
    ${input}
    border: 0;
  }
`;
export const UnChangedInput = styled(style.FormGroup)``;
