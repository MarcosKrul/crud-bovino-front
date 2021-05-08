import React, { useState, useEffect } from "react";

import Bovino from "../../common/Bovino";

import Box from '@material-ui/core/Box';
import Table from '@material-ui/core/Table';
import Modal from '@material-ui/core/Modal';
import Collapse from '@material-ui/core/Collapse';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';

import Menu from "./Menu";
import Delete from "../delete";

import { BsGear } from "react-icons/bs";
import { MdArrowDropUp, MdArrowDropDown } from "react-icons/md";

import { useRowStyles } from "./styles";

interface Props {
    row: Bovino;
}

const Row: React.FC<Props> = ({ row }: Props) => {

    const classes = useRowStyles();
    const [open, setOpen] = useState<boolean>(false);
    const [proximoParto, setProximoParto] = useState<string>('-');
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const [viewDeleteModal, setViewDeleteModal] = useState<boolean>(false);
    
    useEffect(() => {
        if (row.femea?.prenhez) {
            const date = new Date(row.femea?.prenhez);
            date.setMonth(date.getMonth() + 9); 
            setProximoParto(date.toISOString().split('T')[0].split('-').reverse().join('/'));
        }
    }, []);

    const handleOpenMenu = (e: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(e.currentTarget);
    }

    const handleCloseMenu = () => {
        setAnchorEl(null);
    }

    return (<>
        <TableRow className={classes.root}>
            <TableCell>
                <button onClick={handleOpenMenu} className={classes.menuButton}>
                    <BsGear color="#4F4F4F" />
                </button>
                <Menu 
                    anchorEl={anchorEl} 
                    handleOnClose={handleCloseMenu}
                    setViewDeleteModal={setViewDeleteModal}
                />
            </TableCell>
            <TableCell component="th" scope="row">
                {row.nome}
            </TableCell>
            <TableCell align="center">{row.brinco}</TableCell>
            <TableCell align="center">{row.situacao}</TableCell>
            <TableCell align="center">
                <div className={classes.expandContainer}>
                    {row.sexo.toUpperCase()}
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {row.sexo === 'F' 
                            ? open 
                                ? <MdArrowDropUp /> 
                                : <MdArrowDropDown />
                            : null
                        }
                    </IconButton>
                </div>
            </TableCell>
            <TableCell align="center">{row.nascimento.toString().split('-').reverse().join('/')}</TableCell>
            <TableCell align="center">{row.brinco_mae || '-'}</TableCell>
            <TableCell align="center">{row.brinco_pai || '-'}</TableCell>
        </TableRow>
        {row.sexo === "F" ?
            <TableRow className={classes.root}>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={3}>
                            <Typography variant="h6" gutterBottom component="div">
                                Bovino fêmea
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Prenhez</TableCell>
                                        <TableCell>Próximo parto</TableCell>
                                        <TableCell>Último parto</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableCell component="th" scope="row">
                                        {row.femea?.prenhez
                                            ? row.femea.prenhez.toString().split('-').reverse().join('/')
                                            : '-'
                                        }
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {proximoParto}
                                    </TableCell>
                                    <TableCell>
                                        {row.femea?.ultimo_parto
                                            ? row.femea.ultimo_parto.toString().split('-').reverse().join('/')
                                            : '-'
                                        }
                                    </TableCell>
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
            : null
        }
        <Modal
            open={viewDeleteModal}
            className={classes.modal}
            aria-labelledby="simple-modal-title"
            onClose={() => setViewDeleteModal(false)}
            aria-describedby="simple-modal-description"
        >
            <Delete 
                id={row.id}
                setViewDeleteModal={setViewDeleteModal} 
            />
        </Modal>
    </>);
}

export default Row;