import React, { useState } from "react";

import { Bovino } from "./index";

import Box from '@material-ui/core/Box';
import Table from '@material-ui/core/Table';
import Collapse from '@material-ui/core/Collapse';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';

import { MdArrowDropUp, MdArrowDropDown} from "react-icons/md";

import { useRowStyles } from "./styles";

interface Props {
    row: Bovino;
}

const Row: React.FC<Props> = ({ row }: Props) => {

    const classes = useRowStyles();
    const [open, setOpen] = useState<boolean>(false);

    return (<>
        <TableRow className={classes.root}>
            <TableCell>
                <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                    {row.sexo === 'f' 
                        ? open 
                            ? <MdArrowDropUp /> 
                            : <MdArrowDropDown />
                        : null
                    }
                </IconButton>
            </TableCell>
            <TableCell component="th" scope="row">
                {row.nome}
            </TableCell>
            <TableCell align="center">{row.brinco}</TableCell>
            <TableCell align="center">{row.situacao}</TableCell>
            <TableCell align="center">{row.sexo.toUpperCase()}</TableCell>
            <TableCell align="center">{row.nascimento.toString().split('-').reverse().join('/')}</TableCell>
            <TableCell align="center">{row.brinco_mae || '-'}</TableCell>
            <TableCell align="center">{row.brinco_pai || '-'}</TableCell>
        </TableRow>
        {row.sexo === "f" ?
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
    </>);
}

export default Row;