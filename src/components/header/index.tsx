import React from "react";

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';

import { MdViewHeadline } from "react-icons/md";

import useStyles from "./styles";

interface Props {
    onclick: () => void;
}

const Header: React.FC<Props> = ({ onclick }: Props) => {

    const classes = useStyles();

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
                    style={{ fontSize: '1.5rem', fontWeight: 700 }}
                >
                    Controle de Bovinos
                        </Typography>
            </Toolbar>
        </AppBar>
    );
}


export default Header;