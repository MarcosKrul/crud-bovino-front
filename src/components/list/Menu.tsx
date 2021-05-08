import React from 'react';

import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import { StyledMenu, StyledMenuItem } from "./styles";

import { MdEdit, MdDelete } from 'react-icons/md';

interface Props {
    anchorEl: HTMLElement | null;
    handleOnClose(): void;
    setViewDeleteModal(b: boolean): void;
}

const Menu: React.FC<Props> = ({ anchorEl, handleOnClose, setViewDeleteModal }) => (
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
        <StyledMenuItem onClick={() => setViewDeleteModal(true)}>
            <ListItemIcon><MdDelete fontSize="small" /></ListItemIcon>
            <ListItemText primary="Deletar" />
        </StyledMenuItem>
    </StyledMenu>
);

export default Menu;