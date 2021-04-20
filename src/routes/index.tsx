import React from "react";
import { Switch, Route } from "react-router-dom";

const Routes: React.FC = () => (
    <Switch>
        <Route path="/" exact component={() => (<h1>pagina /</h1>)}/>
        <Route path="/teste" component={() => (<h1>pagina teste</h1>)}/>
    </Switch>
)

export default Routes;