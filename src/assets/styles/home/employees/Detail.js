import styled from "styled-components";
import { EditStyles, ListStyles, DeletedListStyles } from "assets/styles/home/employees";

export const Container = styled(EditStyles.Container)``;
export const DeletedListHead = styled(DeletedListStyles.ListHead)`
  & > span:last-child {
    text-align: center;
  }
`;
export const DeletedListItem = styled(DeletedListStyles.ListItem)``;
export const ListHead = styled(ListStyles.ListHead)``;
export const ListItem = styled(ListStyles.ListItem)``;
export const TickContainer = styled(ListStyles.TickContainer)``;
export const ConfirmationContainer = styled(EditStyles.ConfirmationContainer)``;
export const InformationModeButton = styled(ListStyles.HeaderButton)``;
export const GridContainer = styled(EditStyles.GridContainer)``;
export const GridItem = styled(EditStyles.GridItem)``;
export const FormGroup = styled(EditStyles.FormGroup)``;
export const FormGroupWithIcon = styled(EditStyles.FormGroupWithIcon)``;
export const UnChangedInput = styled(EditStyles.UnChangedInput)``;
export const InformationModeButtonContainer = styled(ListStyles.HeaderActions)`
  margin-top: 25px;
`;
export const TopSide = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  border-radius: 12px 12px 0 0;
  padding: 20px 20px 50px;
  border-bottom: 4px solid ${({ theme }) => theme.color.gray};
  background: linear-gradient(180deg, #f6f6f6 0%, #faf9f8 71%, #ffffff 100%) no-repeat;
`;
export const BottomSide = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  border-radius: 12px 0 12px 12px;
  padding: 20px;
  background: linear-gradient(180deg, #f6f6f6 0%, #faf9f8 71%, #ffffff 100%) no-repeat;
`;
export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 16px;
`;
