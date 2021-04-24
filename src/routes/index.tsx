import React from "react";
import { Switch, Route } from "react-router-dom";

import MainPage from "../pages/main";
import List from "../components/list";
import Home from "../components/home";
import NotFound from "../pages/notfound";
import Create from "../components/create";

const routes = [
    "/",
    "/list",
    "/create",
];

const Routes: React.FC = () => (
    <Switch>
        {routes.includes(window.location.pathname) 
            ? <MainPage>
                    <Route path="/list" component={List}/>
                    <Route exact path="/" component={Home}/>
                    <Route path="/create" component={Create}/>
                </MainPage>
            : <Route component={NotFound}/>
        }
    </Switch>
);

export default Routes;