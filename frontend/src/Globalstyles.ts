import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
    body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 0;
        background-color: #ffffff;
        transition: background-color 0.3s ease;
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