import styled, { css } from "styled-components";
import PropTypes from "prop-types";

// Component
export const Typography = ({
  el,
  size,
  weight,
  gutterBottom,
  onClick,
  children,
  color,
  cursor,
  isHovering,
  colorHover,
  statusType,
  whiteSpace,
}) => {
  return (
    <T
      as={el}
      onClick={onClick}
      size={size}
      weight={weight}
      gutterBottom={gutterBottom}
      color={color}
      cursor={cursor}
      isHovering={isHovering}
      colorHover={colorHover}
      statusType={statusType}
      whiteSpace={whiteSpace}
    >
      {children}
    </T>
  );
};

Typography.propTypes = {
  el: PropTypes.string,
  size: PropTypes.oneOf(["xs", "sm", "base", "lg", "xl"]),
  weight: PropTypes.oneOf(["thin", "light", "medium", "bold"]),
  gutterBottom: PropTypes.string,
};

// Styled Elements
export const T = styled.span`
  cursor: ${({ cursor }) => (cursor ? cursor : null)};
  display: ${({ statusType }) => (statusType ? "flex" : "inline-block")};
  white-space: ${({ whiteSpace }) => (whiteSpace ? "noWrap" : "wrap")};
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  align-content: center;
  font-size: ${({ theme, size }) =>
    size ? theme.font.size.sm[size] : theme.font.size.sm["base"]};
  font-weight: ${({ theme, weight }) =>
    weight ? theme.font.weight[weight] : theme.font.size.sm["medium"]};
  margin-bottom: ${({ gutterBottom }) => (gutterBottom ? gutterBottom : "0")};
  /* color: ${({ theme, color }) => (color ? theme.color[color] : null)}; */

  // Font should be Optional not like this
  font-family: "Yekan Bakh";
  font-weight: 500;
  src: url("../../fonts/TTF/YekanBakhFaNum-Regular.ttf") format("truetype");

  ${(props) => {
    switch (props.isHovering) {
      case false:
        return css`
          color: ${({ theme, colorHover }) =>
            colorHover ? theme.color[colorHover] : null};
        `;
      default:
        return css`
          color: ${({ theme, color }) =>
            color ? (theme.color[color] ? theme.color[color] : color) : null};
        `;
    }
  }}

  @media (min-width: 500px) {
    font-size: 12px;
  }
`;
