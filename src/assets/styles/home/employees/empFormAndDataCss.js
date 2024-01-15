import { css } from "styled-components";

export const gridContainer = css`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  background-color: #f5f5f5;
  box-shadow: 0 3px 10px #00000029;
  padding: 10px;
  border-radius: 12px;
`;

export const gridItem = css`
  display: flex;
  align-items: center;
  box-shadow: 0 4px 8px rgba(255, 255, 255, 0.5);

  & > *:first-child {
    flex: 1;
  }

  & > *:last-child {
    flex: 3;
  }
`;

export const input = css`
  text-align: center;
  height: 22px;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.color.red};
  background-color: ${({ theme }) => theme.color.white};

  &::placeholder {
    color: ${({ theme }) => theme.color.borderGray};
    font-size: 12px;
  }

  @media (min-width: 1100px) {
    height: 28px;
    font-size: 18px;
    &::placeholder {
      font-size: 14px;
    }
  }
`;

export const inputWithIconContainer = css`
  display: flex;
  align-items: center;
  padding-right: 10px;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.color.red};
  background-color: ${({ theme }) => theme.color.white};

  img {
    width: 30px;
    height: 80%;
    padding-left: 10px;
    border-left: 1.5px solid ${({ theme }) => theme.color.red};
  }

  input {
    ${input}
    flex: 1;
    border: 0;
  }
`;
