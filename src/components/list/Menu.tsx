import React from 'react';

import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import { StyledMenu, StyledMenuItem } from "./styles";

import { MdEdit, MdDelete } from 'react-icons/md';

interface Props {
    anchorEl: HTMLElement | null;
    handleOnClose(): void;
}

const Menu: React.FC<Props> = ({ anchorEl, handleOnClose }) => (
    <StyledMenu
        keepMounted
        anchorEl={anchorEl}
        id="customized-menu"
        onClose={handleOnClose}
        open={Boolean(anchorEl)}
    >
        <StyledMenuItem>
            <ListItemIcon><MdEdit fontSize="small" /></ListItemIcon>
            <ListItemText primary="Editar" />
        </StyledMenuItem>
        <StyledMenuItem>
            <ListItemIcon><MdDelete fontSize="small" color="red"/></ListItemIcon>
            <ListItemText primary="Deletar" />
        </StyledMenuItem>
    </StyledMenu>
);

export default Menu;