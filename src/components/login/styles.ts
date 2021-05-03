import styled from "styled-components";

export const Container = styled.div`
    width: 90%;
    height: 90%;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;

    h1 { font-size: 26px; }

    .link {
        color: black;
        text-decoration: none;
    }

    .link:hover { text-decoration: underline; }

    form {
        width: 80%;
        display: flex;
        flex-direction: column;

        .input { margin: 10px 0; }

        .button { margin: 40px 0 15px 0; }
    }
`

export const Error = styled.div`
    width: 80%;
    height: 10px;
    margin-top: 10px;
`