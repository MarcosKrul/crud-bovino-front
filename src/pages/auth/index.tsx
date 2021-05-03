import React from "react";
import { Route } from "react-router-dom";

import Login from "../../components/login";
import Forgot from "../../components/forgot";
import Register from "../../components/register";

import {
    Card,
    Container,
} from "./styles";

const AuthPage: React.FC = () => {
    return (
        <Container>
            <Card>
                <Route exact path="/auth/login" component={Login}/>
                <Route exact path="/auth/forgot" component={Forgot}/>
                <Route exact path="/auth/register" component={Register}/>
            </Card>
        </Container>
    );
}

export default AuthPage;