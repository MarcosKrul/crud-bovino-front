import React, { useEffect, useState } from "react";
import api from "../../services/api";

import Row from "./Row";
import Bovino from "../../common/Bovino";

import { MdSearch } from "react-icons/md";
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow'
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import Pagination from '@material-ui/lab/Pagination';
import TableHead from '@material-ui/core/TableHead';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import TableContainer from '@material-ui/core/TableContainer';
import InputAdornment from '@material-ui/core/InputAdornment';

import { useStyles } from "./styles";

const List: React.FC = () => {

    const classes = useStyles();
    const [pageCount, setPageCount] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);
    const [firstReq, setFirstReq] = useState<boolean>(true);
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [listBovino, setListBovino] = useState<Bovino[]>([]);

    useEffect(() => {
        const request = async () => {
            try {
                setLoading(true);
                if ((firstReq && listBovino.length === 0) || listBovino.length <= currentPage*6) {
                    const response = await api.get(`/bovino?page=${currentPage}`);
                    setFirstReq(false);
                    setListBovino([...listBovino, ...response.data.list]);
                    setPageCount(Math.ceil(response.data.count/6));
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
        request();
    }, [currentPage]);

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
                <><TableContainer component={Paper} className={classes.table}>
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
                            {listBovino.slice(currentPage*6, (currentPage*6)+6).map((bovino: Bovino) => (
                                <Row key={bovino.id} row={bovino} />
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <div className={classes.pagination}>
                    <Pagination 
                        count={pageCount} 
                        page={currentPage+1} 
                        onChange={(e, value) => setCurrentPage(value-1)} 
                    />
                </div></> 
                : 
                <div className={classes.loadingContainer}>
                    <div className={classes.loading} />
                </div>
            }
        </div>
    );
}

export default List;