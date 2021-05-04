import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`  
    * {
        margin: 0;
        padding: 0;
        outline: 0;
        box-sizing: border-box;

        font-size: 18px;
        font-family: Poppins;
    }

    input:-webkit-autofill,
    input:-webkit-autofill:hover, 
    input:-webkit-autofill:focus
    {
        margin-top: 5px;   
        -webkit-box-shadow: inset 20px 20px 20px 20px white;  
    }
`;