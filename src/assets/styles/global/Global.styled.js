import { css, createGlobalStyle } from "styled-components";

export const Global = createGlobalStyle`
  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  body {
    font-size: ${({ theme }) => theme.font.size.sm.base};
    font-weight: ${({ theme }) => theme.font.weight["500"]};
    letter-spacing: -0.6px;
    /* user-select: text;
    -o-user-select: text;
    -moz-user-select: text;
    -webkit-user-select: text; */
    user-select: none;
    -o-user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
    display: flex;
    justify-content: center;
    -webkit-tap-highlight-color: transparent;
  }
  
  body input, body textarea {
    user-select: text;
    -o-user-select: text;
    -moz-user-select: text;
    -webkit-user-select: text;
  }

  img {
    display: inline-block;
  }

  ul {
    list-style: none;
  }

  button, input, select,textarea {
    all: unset;
  }

  a {
    color: inherit;
    text-decoration: none;
  }
  /* width */
::-webkit-scrollbar {
  width:0px;

  height: 3px;
}

/* Track */
::-webkit-scrollbar-track {
  background: ${({ theme }) => theme.color.lightBlue};

}

/* Handle */
::-webkit-scrollbar-thumb {
  background: ${({ theme }) => theme.color.lightBlue};
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: ${({ theme }) => theme.color.primary};
}
`;

export const container = css`
  width: 90vw;
  max-width: 1680px;
  margin: 0 auto;
`;

export const closeBadge = css`
  position: absolute;
  top: -4px;
  left: -4px;
  z-index: ${({ theme }) => theme.z.modal};
  width: 20px;
  height: 20px;
  transition: 300ms;

  :hover {
    transform: scale(1.05);
  }
`;
