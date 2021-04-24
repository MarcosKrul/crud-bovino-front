import React from "react";

import { Container, Text } from "./styles";

const url = window.location.pathname;

const NotFound: React.FC = () => (
    <Container>
        <Text>
            Error 404 <br />
            A url <text>{url}</text> não foi encontrada no sistema
        </Text>
        <p>:(</p>
    </Container>
);

export default NotFound;