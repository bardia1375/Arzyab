import styled, { css } from "styled-components";

export const List = styled.ul`
  display: flex;
  align-items: center;
`;

export const ListItem = styled.div`
  transition: 300ms;

  :hover {
    transform: scale(1.1);
  }

  ${(props) => {
    switch (props.button) {
      case "white":
        return css`
          padding: 0.15rem;
          margin-right: 12px;
          margin-left: 12px;
          border-radius: 20px;
          background-color: ${({ theme }) => theme.color.light};
          color: ${({ theme }) => theme.color.primary};
          white-space: nowrap;
          width: 110px;
          text-align: center;
        `;
      default:
        return css`
          width: 100px;
          text-align: center;
        `;
    }
  }}
`;
