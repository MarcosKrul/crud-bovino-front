import React from "react";
import LottieView from "react-lottie";

import loadView from "../../assets/lottieAnimations/50479-sleeping-404.json";

import { Container, Text } from "./styles";

const url = window.location.pathname;

const NotFound: React.FC = () => (
    <Container>
        <Text>
            Error 404 <br />
            A url <text>{url}</text> não foi encontrada no sistema
        </Text>
        <LottieView 
            width={350}
            height={350}
            style={{ margin: '30px' }}
            options={{
                loop: true,
                autoplay: true,
                animationData: loadView
            }}
        />
    </Container>
);

export default NotFound;