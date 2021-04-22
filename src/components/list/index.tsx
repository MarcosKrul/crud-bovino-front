import React, { useEffect, useState } from "react";
import api from "../../services/api";

import Row from "./Row";

import { MdSearch } from "react-icons/md";
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow'
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import TableContainer from '@material-ui/core/TableContainer';
import InputAdornment from '@material-ui/core/InputAdornment';

import { useStyles } from "./styles";

export interface Bovino {
    id: string;
    nome: string;
    raca: string;
    sexo: string;
    brinco: string;
    situacao: string;
    nascimento: Date;
    brinco_mae?: string;
    brinco_pai?: string;
    femea?: {
        prenhez?: string;
        ultimo_parto?: string;
    }
}

const List: React.FC = () => {

    const classes = useStyles();
    const [loading, setLoading] = useState<boolean>(true);
    const [listBovino, setListBovino] = useState<Bovino[]>([]);

    useEffect(() => {
        const request = async () => {
            try {
                setLoading(true);
                const response = await api.get('/bovino');
                setListBovino(response.data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
        request();
    }, [])

    return (
        <div>
            <form className={classes.root}>
                <TextField
                    id="search"
                    variant="outlined"
                    className={classes.inputSearch}
                    label="Busca por nome ou brinco"
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton type="submit" onClick={() => { }}>
                                    <MdSearch size="22" />
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                />
            </form>
            {!loading? 
                <TableContainer component={Paper} className={classes.table}>
                    <Table aria-label="collapsible table">
                        <TableHead>
                            <TableRow>
                                <TableCell />
                                <TableCell>Nome</TableCell>
                                <TableCell align="center">Brinco</TableCell>
                                <TableCell align="center">Situação</TableCell>
                                <TableCell align="center">Sexo</TableCell>
                                <TableCell align="center">Nascimento</TableCell>
                                <TableCell align="center">Mãe</TableCell>
                                <TableCell align="center">Pai</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {listBovino.map((bovino: Bovino) => (
                                <Row key={bovino.id} row={bovino} />
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                : 
                <div className={classes.loadingContainer}>
                    <div className={classes.loading} />
                </div>
            }
        </div>
    );
}

export default List;