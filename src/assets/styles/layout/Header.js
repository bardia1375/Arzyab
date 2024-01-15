import styled from "styled-components";

export const Container = styled.header`
  position: sticky;
  top: 32px;
  z-index: ${({ theme }) => theme.z.nav};
  display: flex;
  align-items: center;
  width: 0;
  /* height: 70px; */
  margin-top: 5px;
  margin-right: auto;
  border-radius: 0 4rem 4rem 0;
  /* color: ${({ theme }) => theme.color.light};
  background: linear-gradient(90deg, #0089a7 0%, #04165d 100%);
  box-shadow: inset 0px -40px 30px #183573, 0px 20px 14px #033f7752; */

  /* @media (min-width: 1100px) {
    width: 90vw;
  } */
`;

export const LeftSide = styled.div`
  display: flex;
  margin-right: auto;
  margin-left: 3%;

  @media (min-width: 1100px) {
    margin-left: 6%;
  }
`;

export const Options = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;

  img {
    background-color: ${({ theme }) => theme.color.light};
    width: 22px;
    height: 22px;
    border-radius: 25px;
    transition: 300ms;

    &:hover {
      transform: scale(1.1);
    }
  }

  img:first-child {
    padding: 2px;
  }

  @media (min-width: 1400px) {
    gap: 8px;

    img {
      width: 28px;
      height: 28px;
    }
  }
`;

export const Logo = styled.img`
  width: 80px;

  @media (min-width: 1400px) {
    width: 100px;
  }
`;

export const User = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  & > img {
    position: relative;
    height: 70px;
    width: 70px;
    border-radius: 50%;
    border: 4px solid ${({ theme }) => theme.color.yellow};
    margin-right: -25px;
    padding: 3px;
    transform: scale(1.1);
    transition: 500ms, border-width 250ms;

    &:hover {
      border: 0 solid ${({ theme }) => theme.color.yellow};
      transform: scale(0.96);
    }

    @media (min-width: 1400px) {
      height: 80px;
      width: 80px;
    }
  }

  & > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 2px;
  }
  div:nth-child(1) {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 70px;
    width: 70px;
    border-radius: 50%;
    border: 4px solid ${({ theme }) => theme.color.yellow};
    color: ${({ theme }) => theme.color.primary};
    background-color: #e4e4e4;
    margin-right: -25px;
    padding: 3px;
    transform: scale(1.1);
    transition: 500ms, border-width 250ms;

    &:hover {
      border: 0 solid ${({ theme }) => theme.color.yellow};
      transform: scale(0.96);
    }

    @media (min-width: 1400px) {
      height: 80px;
      width: 80px;
    }
  }
`;
