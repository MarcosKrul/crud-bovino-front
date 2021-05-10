import React, { useState  } from 'react';
import { Redirect, Switch } from "react-router-dom";
import PrivateRoute from "../../routes/PrivateRoute";
import { useAuth } from "../../hooks/auth";
import { ListBovinoProvider } from "../../hooks/listBovino";

import List from "../../components/list";
import Home from "../../components/home";
import Create from "../../components/create";
import Header from "../../components/header";
import SideBar from "../../components/sidebar";
import CssBaseline from '@material-ui/core/CssBaseline';

import useStyles from "./styles";


const MainPage: React.FC = (props) => {

    const classes = useStyles();
    const { isAuthenticated } = useAuth();
    const [ mobileOpen, setMobileOpen ] = useState<boolean>(false);

    const handleDrawerToggle = () => { setMobileOpen(!mobileOpen); }

    return (
        <div className={classes.root}>
            <CssBaseline />
            <Header onclick={handleDrawerToggle}/>
            <SideBar mobile={mobileOpen} setMobile={setMobileOpen} />
            
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <ListBovinoProvider>
                    <Switch>
                        <PrivateRoute 
                            exact 
                            component={Home}
                            path="/dashboard/home" 
                            isAuthenticated={isAuthenticated} 
                        />
                        <PrivateRoute 
                            exact 
                            component={Create}
                            path="/dashboard/create" 
                            isAuthenticated={isAuthenticated} 
                        />
                        <PrivateRoute 
                            exact 
                            component={List}
                            path="/dashboard/list" 
                            isAuthenticated={isAuthenticated} 
                        />
                        <Redirect to="/system/notfound" />
                    </Switch>
                </ListBovinoProvider>
            </main>
        </div>
    );
}

export default MainPage;
