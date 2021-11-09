import { createGlobalStyle } from "styled-components"

const GlobalStyle = createGlobalStyle`
    *, *::before, *::after{
        padding: 0;
        margin: 0;
        box-sizing: border-box;
    }

    html{
        font-family: 'Spartan', sans-serif;

        /*____________ VARIABLES ____________*/
        
        /*___ colors ___*/

        --layout-max-width: 69.375rem;
        --black: #000000;
        --black-secondary: #0C0E16;
        --white: #FFFFFF;
        --gray: #888EB0;
        --blueish-gray: #DFE3FA;

        --dark-primary: #141625; 
        --dark-secondary: #1E2139;
        --dark-ternary: #252945;
        --light-primary: #F8F8FB;
        --light-secondary: #F9FAFE;
        --anthracite: #373B53;

        --green: #33D69F;
        --orange: #FF8F00;
        --blue-primary: #7C5DFA;
        --blue-secondary: #9277FF;
        --blue-ternary: #7E88C3;
        --red-primary: #EC5757;
        --red-secondary: #FF9797;

        /*___ font weights___*/
        
        --fw-medium: 500;
        --fw-bold: 700;
    }
`

export default GlobalStyle;