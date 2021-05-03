import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { AuthProvider } from "../hooks/auth";

import MainPage from "../pages/main";
import AuthPage from "../pages/auth";
import NotFound from "../pages/notfound";


const Routes: React.FC = () => (
    <Switch>
        <Redirect exact from="/" to="/auth/login" />
        <Redirect exact from="/auth" to="/auth/login" />
        <Redirect exact from="/dashboard" to="/dashboard/home" />
        <AuthProvider>
            <Route path="/auth" component={AuthPage}/>
            <Route path="/dashboard" component={MainPage}/>
        </AuthProvider>
        <Route component={NotFound}/>
    </Switch>
);

export default Routes;