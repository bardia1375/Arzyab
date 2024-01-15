/* eslint-disable eqeqeq */
import styled, { css } from "styled-components";

const subheaderUI = css`
  background-color: #ecfbfb;
  border: 1px solid #75c9db4d;
  backdrop-filter: blur(7px);
`;

export const Container = styled.div`
  /* position: sticky; */
  top: 126px;
  z-index: ${({ theme }) => theme.z.subheader};
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

export const ContainerPublic = styled.div`
  position: sticky;
  top: 0px;
  z-index: ${({ theme }) => theme.z.subheader};
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

export const PageStatus = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  width: 74px;
  height: 60px;
  padding: 0 1.25rem;
  border-radius: 35px 0 0 35px;
  ${subheaderUI}
  margin-top:16px;
  transition: 0.5s all;
  cursor: pointer;
  /* div:nth-child(2) {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    font-weight: 600;
  } */
  img {
    width: 20px;
  }
`;

export const main = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 16px;
`;

export const PageStatusBadge = styled.img`
  position: absolute;
  top: ${({ fromTop }) => (fromTop ? fromTop : "-4px")};
  left: -8px;
  width: 13px;
  height: 13px;

  @media (min-width: 1400px) {
    top: ${({ fromTop }) => (fromTop ? fromTop : "-3px")};
    left: -11px;
    width: 16px;
    height: 16px;
  }
`;

export const PageHelperContainer = styled.div`
  width: 77%;
  min-height: 60px;
  border-radius: 0 32px 32px 0;
  ${subheaderUI}
  display: flex;
  align-items: center;
  transition: 500ms;
  position: absolute;
  left: 0;
  top: 16px;
  /* margin-top: 10px; */
`;

export const Typography = styled.p`
  opacity: 1;

  ${(props) => {
    switch (props.type) {
      case "spiderChart":
        if (props.lastIndex == 0) {
          return css`
            background: transparent
              linear-gradient(248deg, #37abb8 0%, #71fbff 100%) 0% 0% no-repeat
              padding-box;
            border-radius: 20px;
            color: #fff;
            border-top: none;
            padding: 3px 32px;
            margin-right: -10px;
            transform: translateX(-30px);
            z-index: 10;
            cursor: pointer;
          `;
        }
        if (props.index == props.lastIndex && props.lastIndex !== 0) {
          return css`
            background: transparent
              linear-gradient(248deg, #37abb8 0%, #71fbff 100%) 0% 0% no-repeat
              padding-box;
            border-radius: 20px;
            color: #fff;
            border-top: none;
            padding: 3px 32px;
            margin-right: -10px;
            transform: translateX(-30px);
            z-index: 10;
            cursor: pointer;
            &::after,
            &::before {
              content: "";
              display: inline-block;
              width: 20px;
              height: 20px;
              position: absolute;
              top: 16%;
              right: -9px;
              border-top: 1px solid rgb(76, 200, 210);
              border-right: 1px solid rgb(76, 200, 210);
              background: 0% 0% no-repeat padding-box padding-box
                rgb(208, 231, 235);
              border-radius: 0px 5px 0px 55px;
              transform: rotate(225deg);
            }
          `;
        }
        if (props.index == 0) {
          return css`
            background: 0% 0% no-repeat padding-box padding-box
              rgb(208, 231, 235);
            border-radius: 20px;
            color: rgb(76, 200, 210);
            border-top: 1px solid rgb(76, 200, 210);
            border-bottom: 1px solid rgb(76, 200, 210);

            padding: 3px 32px;
            margin-right: -10px;
            transform: translateX(-30px);
          `;
        }

        return css`
          opacity: 1;
          background: 0% 0% no-repeat padding-box padding-box rgb(208, 231, 235);
          border-radius: 20px;
          color: #fff;
          padding: 3px 32px;
          margin-right: -10px;
          transform: translateX(-30px);
          color: rgb(76, 200, 210);
          border-top: 1px solid rgb(76, 200, 210);
          border-bottom: 1px solid rgb(76, 200, 210);
          cursor: pointer;
          &::after,
          &::before {
            content: "";
            display: inline-block;
            width: 20px;
            height: 20px;
            position: absolute;
            top: 16%;
            right: -10px;
            border-top: 1px solid rgb(76, 200, 210);
            border-right: 1px solid rgb(76, 200, 210);
            background: 0% 0% no-repeat padding-box padding-box
              rgb(208, 231, 235);
            border-radius: 0px 5px 0px 55px;
            transform: rotate(225deg);
          }

          /* &::before {
            content: "";
            display: inline-block;
            width: 20px;
            height: 20px;
            position: absolute;
            transform: scale(1.5);
            transform-origin: right;
            top: 30%;
            right: 0;
            background: transparent
              linear-gradient(248deg, #37abb8 0%, #71fbff 100%) 0% 0% no-repeat
              padding-box;
            z-index: 5;
          } */
        `;

      default:
        return css``;
    }
  }}

  ${(props) => {
    switch (props.position) {
      case "Left":
        return css`
          opacity: 1;
          background: none;
          color: #183573;
          font-size: 1rem;
        `;

      default:
        return css``;
    }
  }}
`;
