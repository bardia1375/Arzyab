import styled, { css, keyframes } from "styled-components";

export const Button = styled.button`
  display: ${({ display }) => (display ? display : "block")};
  justify-content: ${({ justify }) => justify?justify:"center"};
  align-items: ${({ align }) => align?align:"center"};
  gap: ${({ gap }) => (gap ? gap : "10px")};
  text-align: ${({ textAlign }) => textAlign};
  padding: ${({ padding }) => (padding ? padding : "2px 30px")};
  border-width: ${({ borderWidth }) => (borderWidth ? borderWidth : "2px")};
  border-style: ${({ borderStyle }) => (borderStyle ? borderStyle : "solid")};
  border-radius: ${({ radius }) => (radius ? radius : "16px")};
  width: ${({ width }) => width};
  box-shadow: ${({ shadow }) => shadow};
  white-space: nowrap;
  //Margin & center added
  /* margin-bottom: 10px; */
  height: ${({ height }) => height};
  margin: auto 0;
  margin: ${({ margin }) => margin};
  align-items: center;
  ////////////////////
  cursor: ${({ cursor }) => (cursor ? cursor : "pointer")};
  transition: 500ms;
  & > img {
    width: ${({ imageWidth }) => imageWidth};
    height: ${({ imageHeight }) => imageHeight};
  }
  &:hover {
    ${({ hoverType, hoverBg, hoverColor }) => {
      let style;
      switch (hoverType) {
        case "scale":
          style = css`
            transform: scale(1px solid 0.1px solid);
          `;
          break;
        case "colorChange":
          style = css`
            background: ${hoverBg};
            color: ${hoverColor};
          `;
          break;
        case "none":
          style = "";
          break;
        default:
          style = css`
            transform: scale(1px solid 0.1px solid);
          `;
          break;
      }
      return style;
    }};
  }
  ${({ variant }) => {
    let style;
    switch (variant) {
      case "standard":
        style = css`
          border-color: ${({ theme, bg }) =>
            bg ? theme.color[bg] : theme.color.primary};
          color: ${({ theme, color }) =>
            color ? theme.color[color] : theme.color.primary};
          background: ${({ theme, bg }) => (bg ? theme.color[bg] : "#fff")};
        `;
        break;
      case "bordered":
        style = css`
          border-color: ${({ theme, color }) =>
            color ? theme.color[color] : theme.color.primary};
          color: ${({ theme, color }) =>
            color ? theme.color[color] : theme.color.primary};
          background: ${({ theme, bg }) => (bg ? theme.color[bg] : "#fff")};
        `;
        break;
      case "linear":
        style = css`
          border-color: ${({ theme, bg }) =>
            bg ? theme.color[bg] : theme.color.primary};
          color: ${({ theme, color }) =>
            color ? theme.color[color] : theme.color.primary};
          background: ${({ bg }) => bg};
        `;
        break;
      case "cancel":
        style = css`
          border-color: ${({ theme, bg }) =>
            bg ? theme.color[bg] : theme.color.red};
          color: ${({ theme, color }) =>
            color ? theme.color[color] : theme.color.white};
          background: ${({ bg, theme }) => theme.color.red};
        `;
        break;
      default:
        style = css`
          border-color: ${({ theme, bg }) =>
            bg ? theme.color[bg] : "#37b3b8"};
          color: ${({ theme, color }) =>
            color ? theme.color[color] : theme.color.white};
          background: ${({ theme, bg }) => (bg ? theme.color[bg] : "#37b3b8")};
        `;
        break;
    }
    return style;
  }};
`;

const breatheAnimation = keyframes`
 0% { border-style: dashed}
 100% { border-style:solid}
`;

const opacityAnimation = keyframes`
 0% { opacity: 0}
 100% { opacity:1px solid }
`;

const positionAnimation = keyframes`
 0% { right: 100px}
 100% { right:10%}
`;

export const ConfirmButton = styled.button`
  position: relative;
  padding: ${({ padding }) => (padding ? padding : "2px 40px")};
  border-width: ${({ borderWidth, noBorderColor }) =>
    noBorderColor ? "0" : borderWidth ? borderWidth : "2px"};
  border-style: ${({ borderStyle }) => (borderStyle ? borderStyle : "solid")};
  border-radius: ${({ radius }) => (radius ? radius : "32px")};
  margin: ${({ margin }) => (margin ? margin : "5px")};
  cursor: pointer;
  transition: 500ms;
  display: flex;
  justify-content: ${({ justifyContent }) =>
    justifyContent ? justifyContent : "space-between"};
  & > span {
    ${({ hoverControl }) =>
      hoverControl
        ? css`
            margin-right: 3vw;
          `
        : null}

    animation-duration: ${({ hoverControl }) => (hoverControl ? "1s" : null)};
    animation-name: ${({ hoverControl }) =>
      hoverControl ? opacityAnimation : null};
  }
  &:hover {
    & > img {
      ${({ hoverControl }) =>
        hoverControl
          ? css`
              animation-duration: ${({ hoverControl }) =>
                hoverControl ? "1s" : null};
              animation-name: ${({ hoverControl }) =>
                hoverControl ? positionAnimation : null};
              position: absolute;
              right: 10%;
            `
          : css``};
    }
    animation-duration: ${({ hoverControl }) => (hoverControl ? "3s" : null)};
    animation-name: ${({ hoverControl }) =>
      hoverControl ? breatheAnimation : null};
    border-style: ${({ hoverControl, borderStyle }) =>
      hoverControl ? "solid" : borderStyle};
    gap: ${({ hoverControl }) => (hoverControl ? "10px" : null)};
    transform: ${({ hover }) =>
      hover ? "scale(1px solid .1px solid )" : null};
  }

  white-space: ${({ whiteSpace }) => (whiteSpace ? whiteSpace : "")};
  align-items: center;
  width: ${({ width }) => (width ? width : null)};
  height: ${({ height }) => (height ? height : null)};
  box-shadow: ${({ shadow }) => shadow};
  ${({ variant }) => {
    let style;
    switch (variant) {
      case "standard":
        style = css`
          border-color: ${({ theme, bg }) =>
            bg ? theme.color[bg] : theme.color.red};
          color: ${({ theme, color }) =>
            color ? theme.color[color] : theme.color.white};
          background: ${({ theme, bg }) =>
            bg ? theme.color[bg] : theme.color.red};
          opacity: 0.8;
          &:hover {
            opacity: 1px solid;
          }
        `;
        break;
      case "bordered":
        style = css`
          border-color: ${({ theme, color }) =>
            color ? theme.color[color] : theme.color.red};
          color: ${({ theme, color }) =>
            color ? theme.color[color] : theme.color.red};
          background: ${({ theme, bg }) => (bg ? theme.color[bg] : "#fff")};
        `;
        break;
      case "linear":
        style = css`
          border-color: ${({ theme, color, noBorderColor }) =>
            noBorderColor
              ? "none"
              : color
              ? theme.color[color]
              : theme.color.red};
          color: ${({ theme, color }) =>
            color ? theme.color[color] : theme.color.red};
          background: linear-gradient(
            to left,
            ${({ theme, bg }) => (bg ? theme.color[bg] : "#37ABB8")} 0%,
            ${({ theme, bgg }) => (bgg ? theme.color[bgg] : "#71FBFF")} 100%
          );
          opacity: 0.8;
          &:hover {
            opacity: 1px solid;
          }
        `;
        break;
      default:
        style = css`
          border-color: ${({ theme, bg }) =>
            bg ? theme.color[bg] : theme.color.red};
          color: ${({ theme, color }) =>
            color ? theme.color[color] : theme.color.white};
          background: ${({ theme, bg }) =>
            bg ? theme.color[bg] : theme.color.red};
          opacity: 0.8;
          &:hover {
            opacity: 1px solid;
          }
        `;
        break;
    }
    return style;
  }};
`;
