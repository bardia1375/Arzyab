/* eslint-disable no-fallthrough */
import PropTypes from "prop-types";
import styled from "styled-components";
import { css } from "styled-components";

export const Spacer = ({ children, color, line, horizontal, width }) => {
  return (
    <S color={color} horizontal={horizontal} width={width}>
      {children}
    </S>
  );
};

Spacer.propTypes = {
  color: PropTypes.string,
  children: PropTypes.node,
};

export const S = styled.div`
  /* width: 1px;
  height: 24px;
  margin: 0 8px;
  background-color: ${({ theme, color }) =>
    color ? theme.color[color] : theme.color.white}; */
  ${(props) => {
    switch (props.index) {
      case 1:
        css`
          display: hidden;
        `;

      default:
        break;
    }
  }}
  ${(props) => {
    switch (props.horizontal) {
      case "true":
        return css`
          height: 1px;
          width: ${({ width }) => (width ? width : "100%")};
          /* margin: 0 8px; */
          margin: 14px 0px;
          background-color: ${({ theme, color }) =>
            color ? theme.color[color] : theme.color.white};
          @media (min-width: 1400px) {
            width: ${({ width }) => (width ? width : "100%")};
          }
        `;

      default:
        return css`
          width: 1px;
          height: 24px;
          margin: 0 8px;
          background-color: ${({ theme, color }) =>
            color ? theme.color[color] : theme.color.white};
          @media (min-width: 1400px) {
            height: 30px;
            margin: 0 20px;
          }
        `;
    }
  }}
`;
