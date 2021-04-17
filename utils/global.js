import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
    *,
    *::before,
    *::after {
        margin: 0;
        padding: 0;
        box-sizing: inherit;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    html {
        box-sizing: border-box;

        /* Variables globales */
        --color-main: ${({ theme }) => theme.colors.main};
        --color-green: ${({ theme }) => theme.colors.green};
        --color-red: ${({ theme }) => theme.colors.red};
        --color-gray: ${({ theme }) => theme.colors.gray};
        --color-gray-light: ${({ theme }) => theme.colors.grayLight};
        --color-text: ${({ theme }) => theme.colors.text};
    }
    
    a, 
    input, 
    textarea,
    button {
        outline: none;
        text-decoration: none;
        font-family: inherit;
    }
`;
