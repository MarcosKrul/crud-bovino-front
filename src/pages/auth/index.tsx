import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import LottieView from "react-lottie";

import loadView from "../../assets/lottieAnimations/44991-a-fitness-cow.json";

import Login from "../../components/login";
import Reset from "../../components/reset";
import Forgot from "../../components/forgot";
import Register from "../../components/register";

import {
    Card,
    Container,
} from "./styles";

const AuthPage: React.FC = () => {
    return (
        <Container>
            <LottieView 
                width={450}
                height={450}
                style={{ margin: 0 }}
                options={{
                    loop: true,
                    autoplay: true,
                    animationData: loadView
                }}
            />
            <Card>
                <Switch>
                    <Route exact path="/auth/login" component={Login}/>
                    <Route exact path="/auth/forgot" component={Forgot}/>
                    <Route exact path="/auth/register" component={Register}/>
                    <Route exact path="/auth/reset/:token" component={Reset}/>
                    <Redirect to="/system/notfound" />
                </Switch>
            </Card>
        </Container>
    );
}

export default AuthPage;