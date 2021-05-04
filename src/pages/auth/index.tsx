import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

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