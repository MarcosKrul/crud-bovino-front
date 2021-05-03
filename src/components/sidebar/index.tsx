import React from "react";
import { Link } from "react-router-dom";

import List from '@material-ui/core/List';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import ListItem from '@material-ui/core/ListItem';
import { useTheme } from '@material-ui/core/styles';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import { MdHome, MdList, MdCreate } from "react-icons/md";

import useStyles from "./styles";

const linkStyle = {
    color: 'black',
    textDecoration: 'none',
}

interface Props {
    mobile: boolean;
    window?: () => Window;
    setMobile: (newState: boolean) => void;
}

const SideBar: React.FC<Props> = ({ window, setMobile, mobile }: Props) => {

    const theme = useTheme();
    const classes = useStyles();

    const container = window !== undefined ? () => window().document.body : undefined;

    const drawer = (
        <div>
            <div className={classes.toolbar} />
            <List>
                <Link to="/dashboard/home" style={linkStyle}>
                    <ListItem button onClick={() => setMobile(false)} key="home">
                        <ListItemIcon>
                            <MdHome />
                        </ListItemIcon>
                        <ListItemText primary="Home" />
                    </ListItem>
                </Link>
                <Link to="/dashboard/list" style={linkStyle}>
                    <ListItem button onClick={() => setMobile(false)} key="list">
                        <ListItemIcon>
                            <MdList />
                        </ListItemIcon>
                    <ListItemText primary="Listagem" />
                    </ListItem>
                </Link>
                <Link to="/dashboard/create" style={linkStyle}>
                    <ListItem button onClick={() => setMobile(false)} key="register">
                        <ListItemIcon>
                            <MdCreate />
                        </ListItemIcon>
                        <ListItemText primary="Cadastro" />
                    </ListItem>
                </Link>
            </List>
        </div>
    );

    return (
        <nav className={classes.drawer} aria-label="mailbox folders">
            <Hidden smUp implementation="css">
                <Drawer
                    open={mobile}
                    variant="temporary"
                    container={container}
                    onClose={() => setMobile(!mobile)}
                    anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    ModalProps={{
                        keepMounted: true,
                    }}
                >
                    {drawer}
                </Drawer>
            </Hidden>
            <Hidden xsDown implementation="css">
                <Drawer
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    variant="permanent"
                    open
                >
                    {drawer}
                </Drawer>
            </Hidden>
        </nav>
    );
};

export default SideBar;