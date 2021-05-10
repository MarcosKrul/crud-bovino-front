import styled from "styled-components";

export const Container = styled.div`
    width: 100vw;
    display: flex;
    height: 100vh;
    color: #A9A9A9;
    align-items: center;
    flex-direction: row;
    justify-content: space-evenly;
    background-color: #191970;

    p { 
        font-size: 52px;
        margin: 20px;
    } 

    @media (max-width: 900px) { flex-direction: column; }
`

export const Text = styled.div`
    margin: 30px;
    font-weight: 500;
    font-size: 26px;

    text {
        font-weight: 500;
        font-size: 26px;
        color: #00FF7F;
    }
`