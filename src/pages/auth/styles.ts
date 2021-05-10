import styled from "styled-components";

export const Container = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    background-color: #DCDCDC;
    justify-content: space-evenly;

    @media (max-width: 930px) { flex-direction: column; }
`

export const Card = styled.div`
    width: 500px;
    height: 500px;
    display: flex;
    align-items: center;
    border-radius: 10px;
    flex-direction: column;
    justify-content: center;
    background-color: white;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);

    @media (max-width: 580px) { width: 400px; }
    @media (max-width: 400px) { width: 300px; }
`