import React from "react";
import { Switch, Route } from "react-router-dom";

import MainPage from "../pages/main";
import List from "../components/list";
import Home from "../components/home";
import Create from "../components/create";

const Routes: React.FC = () => (
    <Switch>
        <MainPage>
            <Route path="/list" component={List}/>
            <Route exact path="/" component={Home}/>
            <Route path="/create" component={Create}/>
        </MainPage>
    </Switch>
);

export default Routes;