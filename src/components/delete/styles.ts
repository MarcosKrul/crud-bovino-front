import styled from 'styled-components';


export const Container = styled.div`
    width: 400px;
    height: 350px;
    display: flex;
    align-items: center;
    border-radius: 10px;
    flex-direction: column;
    background-color: white;
    justify-content: center;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4);

    h1 {
        width: 80%;
        margin: 20px 0;
    }

    Button {
        width: 80%;
        color: white;
        margin: 10px 0;
    }

    #btn-rejeitar { background-color: red; }
    #btn-confirmar { background-color: green; }
`

