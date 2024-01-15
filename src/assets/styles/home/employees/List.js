import styled, { css } from "styled-components";
import { GlobalStyles } from "assets/styles/global";

const grid4 = css`
  display: grid;
  grid-template-columns: repeat(3, 1fr) 3fr;
  align-items: center;
`;

export const SContainer = styled.div`
  position: relative;
  ${GlobalStyles.container}
  background: #fff;
  border-radius: 24px;
  padding: 24px;
`;

export const ContainerHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const ContainerBody = styled.div`
  border-radius: 10px 0 10px 10px;
  padding: 10px;
  background: linear-gradient(180deg, #f6f6f6 0%, #faf9f8 71%, #ffffff 100%);
`;

// Container Header Childs
export const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  & > button {
  }
`;

export const HeaderButton = styled.button`
  padding: 8px 20px;
  border-radius: 10px 10px 0 0;
  background-color: ${({ theme }) => theme.color.gray};
  cursor: pointer;
  transition: 300ms;

  &:hover {
    background-color: ${({ theme }) => theme.color.lightGray};
  }
`;

export const HeaderImage = styled.img`
  width: 20px;
  height: 20px;
`;

// Container Body Childs
export const ListHead = styled.div`
  ${grid4}
  padding: 10px;
  border-radius: 15px;
  text-align: center;
  color: ${({ theme }) => theme.color.darkGray};
  background: ${({ theme }) => theme.color.white};
  box-shadow: 0 4px 10px #eee;
`;

export const ListBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 10px;
  overflow-y: auto;
  height: 32vh;

  @media (min-height: 820px) {
    height: 38vh;
  }

  @media (min-height: 920px) {
    height: 44vh;
  }

  @media (min-height: 1120px) {
    height: 52vh;
  }
`;

// List Item Styles
export const ListItem = styled.div`
  ${grid4}
  padding: 10px;
  border-radius: 15px;
  text-align: center;
  background: ${({ theme }) => theme.color.white};
  ${({ isDeleteMode }) =>
    isDeleteMode
      ? css`
          position: absolute;
          top: 50px;
          left: 50%;
          transform: translateX(-50%);
          z-index: ${({ theme }) => theme.z.listItem};
          width: 90%;
          border: 2px solid ${({ theme }) => theme.color.red};
          color: ${({ theme }) => theme.color.red};
        `
      : css`
          border: 2px solid ${({ theme }) => theme.color.primary};
          color: ${({ theme }) => theme.color.primary};
        `};

  & > div {
    display: grid;
    grid-template-columns: 1fr 80px;
    padding-right: 5%;
    align-items: center;
  }
`;

export const ListItemActions = styled.div`
  display: ${({ isDeleteMode }) => (isDeleteMode ? "none" : "flex")};
  border: 1px solid ${({ theme }) => theme.color.gray};
  padding: 4px;
  gap: 6px;
  border-radius: 16px;

  img {
    width: 18px;
    transition: 300ms;

    &:hover {
      transform: scale(1.1);
    }
  }
`;

export const TickContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: clamp(16px, 20%, 40px);
`;

export const TickItem = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;

  & > div {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    border: 1.5px solid
      ${({ theme, isDeleteMode, isTicked }) =>
        isDeleteMode & isTicked
          ? theme.color.red
          : isDeleteMode & !isTicked
          ? theme.color.red
          : theme.color.primary};
    background-color: ${({ theme, isDeleteMode, isTicked }) =>
      isDeleteMode & isTicked ? theme.color.red : theme.color.gray};
    pointer-events: ${({ isDeleteMode }) => (isDeleteMode ? "none" : "all")};
    cursor: ${({ isDeleteMode }) => (isDeleteMode ? "not-allowed" : "pointer")};
  }

  img {
    display: ${({ isDeleteMode }) => (isDeleteMode ? "none" : "block")};
    width: 8px;
    height: 6px;
  }

  @media (min-width: 1100px) {
    & > div {
      width: 20px;
      height: 20px;
    }

    img {
      width: 10px;
      height: 8px;
    }
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 20px;
  margin: 25px 0 0;
`;

// Delete Modal
export const DeleteContainer = styled.div`
  border-radius: 20px;
  border: 2px solid #cbcbcb;
  background-color: ${({ theme }) => theme.color.white};
  box-shadow: inset 0px -30px 40px #00000017, 0px 24px 65px #a0bdc180;
  /* color: ${({ theme }) => theme.color.grey}; ; */
`;

export const TopSide = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 20px 40px;

  & > div {
    display: flex;
    justify-content: space-between;
    gap: 20px;
  }
`;

export const BottomSide = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  width: 100%;
  gap: 10px;
`;

export const CloseBadge = styled.img`
  ${GlobalStyles.closeBadge}
`;

// Add Modal
export const AddContainer = styled.div`
  border-radius: 20px;
  border: 2px solid #cbcbcb;
  background-color: ${({ theme }) => theme.color.white};
  box-shadow: inset 0px -30px 40px #00000017, 0px 24px 65px #a0bdc180;
  color: ${({ theme }) => theme.color.secondary};
`;

export const BodyForm = styled.div`
  display: flex;
  white-space: nowrap;
  width: 500px;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-end;
  align-items: stretch;
  align-content: center;
`;

export const ItemForm = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  align-content: center;
  color: ${({ theme, color }) => theme.color[color]};
`;

export const InputTextName = styled.input`
  /* font: var(--unnamed-font-style-normal) normal var(--unnamed-font-weight-300) var(--unnamed-font-size-24)/var(--unnamed-line-spacing-37) var(--unnamed-font-family-yekan-bakh); */
  /* letter-spacing: var(--unnamed-character-spacing--0-6); */
  /* color: var(--unnamed-color-cbcbcb); */
  ::placeholder {
    text-align: right;
    font: normal normal 300 17px Yekan Bakh;
    letter-spacing: -0.6px;
    color: #cbcbcb;
  }
  color: #000;
  width: 100%;
  height: 38px;
  padding-right: 5px;
  margin: 5px 5px 5px 0;
  background: var(--unnamed-color-ffffff) 0% 0% no-repeat padding-box;
  border: 1px solid var(--unnamed-color-ff4d4d);
  background: #ffffff 0% 0% no-repeat padding-box;
  border: 1px solid #ff4d4d;
  border-radius: 6px;
  opacity: 1;
`;

export const AddButton = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-end !important;
  align-items: center;
  align-content: center;
  width: 100%;
`;
export const AddBottomSide = styled.div`
  display: flex;
  position: absolute;
  width: 100%;
  top: -10px;
  flex-direction: column;
  align-items: center;
  border-top: 1px solid #cbcbcb;
`;
