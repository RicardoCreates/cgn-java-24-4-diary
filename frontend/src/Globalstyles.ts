import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
    body {
        background-color: ${({ theme }) => theme.background};
        color: ${({ theme }) => theme.text};
        transition: all 0.3s linear;
        margin: 0;
        font-family: Arial, sans-serif;
    }


    main {
        text-align: center;
        padding: 20px;
        max-width: 800px;
        margin: 80px auto;
        background-color: #89CFF0;
        border-radius: 8px;
        box-shadow: 10px 10px 50px rgba(0, 0, 0, 0.3);

        li {
            list-style-type: none;
        }
    }

`;

export default GlobalStyles;