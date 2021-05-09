import styled from 'styled-components';


export const Container = styled.div`
    width: 800px;
    height: 700px;
    display: flex;
    align-items: center;
    border-radius: 10px;
    flex-direction: column;
    background-color: white;
    justify-content: center;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4);

    @media (max-width: 600px) { height: 1200px; }
`

