import { ThemeProvider } from "styled-components";
import { Global } from "./assets/styles/global/Global.styled";

const theme = {
  bg: {
    card: "linear-gradient(to right bottom,#c7c7c7 0%,#e5e5e5 41%,#f8f8f8 76%,#ffffff 100%)0% 0% no-repeat padding-box;",
    searchSuggest: "#F5F5F5 0% 0% no-repeat padding-box;",
  },
  color: {
    primary: "#183573",
    secondary: "#37B3B8",
    red: "#ff4d4d",
    lightRed: "#ff8080",
    yellow: "#daa210",
    orange: "#E67205 ",
    brown: "#966C5A",
    gray: "#e9e9e9",
    darkGray: "#9e9e9e",
    lightGray: "#f1f1f2",
    light: "#f8f8f7",
    dark: "#222",
    white: "#fff",
    borderGray: "#cbcbcb",
    lightBlue:"#37B3B8;",
    grayBorder:"#BABABA"
  },
  font: {
    weight: {
      thin: "100",
      light: "300",
      medium: "500",
      bold:"600"
    },
    size: {
      lg: {
   
        xs: "14px",
        sm: "18px",
        base: "22px",
        lg: "26px",
        xl: "30px",
      },
      md: {
        xs: "12px",
        sm: "16px",
        base: "18px",
        lg: "24px",
        xl: "26px",
      },
      sm: {
        xs: "10px",
        sm: "12px",
        base: "14px",
        lg: "16px",
        xl: "22px",
      },
    },
  },
  z: {
    overlay: 1,
    listItem: 2,
    modal: 3,
    subheader: 4,
    nav: 5,
    navDrop: 10,
  },
};

const Theme = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <Global />
      {children}
    </ThemeProvider>
  );
};

export default Theme;
