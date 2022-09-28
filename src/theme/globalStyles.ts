import { createGlobalStyle } from "styled-components";
import { ThemeProps } from "./theme";

export const GlobalStyles = createGlobalStyle<{ theme: ThemeProps }>`
  *,*::before,*::after{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body {
    background-color: ${({ theme }) => theme.backgroundColor};
    overflow-x: hidden;
    font-family: 'Montserrat', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`;
