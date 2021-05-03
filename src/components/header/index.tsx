import React from "react";
import { useHistory } from "react-router";
import { useAuth } from "../../hooks/auth";

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';

import { MdViewHeadline } from "react-icons/md";
import { GoSignOut } from 'react-icons/go'

import useStyles from "./styles";

interface Props {
    onclick: () => void;
}

const Header: React.FC<Props> = ({ onclick }: Props) => {

    const classes = useStyles();
    const history = useHistory();
    const { signOut } = useAuth();

    const handleSignOut = () => {
        signOut();
        history.push("/auth/login");
    }

    return (
        <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    onClick={onclick}
                    className={classes.menuButton}
                >
                    <MdViewHeadline />
                </IconButton>
                <Typography
                    noWrap
                    variant="h6"
                    style={{ 
                        width: '100%', 
                        fontWeight: 700,
                        display: 'flex',
                        fontSize: '1.5rem',
                        alignItems: 'center', 
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                    }}
                >
                    Controle de Bovinos
                    <GoSignOut onClick={handleSignOut}/>
                </Typography>
            </Toolbar>
        </AppBar>
    );
}


export default Header;