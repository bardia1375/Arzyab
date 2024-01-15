import styled, { css } from "styled-components";
import { ListStyles } from "assets/styles/home/employees";

const grid5 = css`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  align-items: center;
`;

export const SContainer = styled(ListStyles.SContainer)``;
export const ContainerHeader = styled(ListStyles.ContainerHeader)``;
export const ContainerBody = styled(ListStyles.ContainerBody)``;
export const HeaderActions = styled(ListStyles.HeaderActions)``;
export const HeaderButton = styled(ListStyles.HeaderButton)``;
export const ListBody = styled(ListStyles.ListBody)``;
export const ListItemActions = styled(ListStyles.ListItemActions)``;
export const DeleteContainer = styled(ListStyles.DeleteContainer)``;
export const TopSide = styled(ListStyles.TopSide)``;

export const CloseBadge = styled(ListStyles.CloseBadge)``;

export const ListHead = styled.div`
  ${grid5}
  text-align: center;
  padding: 10px;
  border-radius: 12px;
  background-color: #fff;
  color: ${({ theme }) => theme.color.darkGray};

  & > span:last-child {
    text-align: right;
  }
`;

export const ListItem = styled.div`
  ${grid5}
  padding: 10px;
  border-radius: 15px;
  text-align: center;
  color: #fff;
  background: linear-gradient(225deg, #ff8080 0%, #ff4d4d 100%);
  box-shadow: 0 3px 6px #00000029;
  ${({ isDeleteMode }) =>
    isDeleteMode
      ? css`
          position: absolute;
          top: 50px;
          left: 50%;
          transform: translateX(-50%);
          z-index: ${({ theme }) => theme.z.listItem};
          width: 90%;
        `
      : css``};

  & > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

export const BottomSide = styled(ListStyles.BottomSide)`
  flex-direction: row;
  gap: 2px;
`;
