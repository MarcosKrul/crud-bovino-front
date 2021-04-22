import React, { useState  } from 'react';

import Header from "../../components/header";
import SideBar from "../../components/sidebar";
import CssBaseline from '@material-ui/core/CssBaseline';

import useStyles from "./styles";


const MainPage: React.FC = (props) => {

    const classes = useStyles();
    const [ mobileOpen, setMobileOpen ] = useState<boolean>(false);

    const handleDrawerToggle = () => { setMobileOpen(!mobileOpen); }

    return (
        <div className={classes.root}>
            <CssBaseline />
            <Header onclick={handleDrawerToggle}/>
            <SideBar mobile={mobileOpen} setMobile={setMobileOpen} />
            
            <main className={classes.content}>
                <div className={classes.toolbar} />
                { props.children }
            </main>
        </div>
    );
}

export default MainPage;
