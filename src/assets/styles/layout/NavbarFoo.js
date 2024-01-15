import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  & > div {
    top: 22px;
    right: -140px;
  }
`;

export const Dots = styled.img`
  width: 24px;
  transition: 300ms;

  &:hover {
    transform: scale(1.1);
  }
`;

export const GridSys = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 100px);
  gap: 8px;

  @media (min-width: 1100px) {
    grid-template-columns: repeat(3, 140px);
  }

  @media (min-width: 1400px) {
    grid-template-columns: repeat(3, 160px);
  }
`;
