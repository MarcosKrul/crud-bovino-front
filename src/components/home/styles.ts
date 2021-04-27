import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    margin: 40px 0px;
    margin-left: 40px;
    align-items: start;
    flex-direction: column;
    justify-content: center;

    p { margin-top: 50px; }

    ul { list-style-type: disc; }

    li { margin-left: 50px; }

    li a { 
        color: black;
        text-decoration: none; 
    }

    li a:hover {
        color: blue;
        font-size: 1.1rem;
    }
`