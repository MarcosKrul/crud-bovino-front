import React, { useEffect, useState } from "react";
import api from "../../services/api";

import Row from "./Row";
import Bovino from "../../common/Bovino";

import { MdSearch } from "react-icons/md";
import Grid from '@material-ui/core/Grid';
import Alert from '@material-ui/lab/Alert';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow'
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import Pagination from '@material-ui/lab/Pagination';
import TableHead from '@material-ui/core/TableHead';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import TableContainer from '@material-ui/core/TableContainer';
import InputAdornment from '@material-ui/core/InputAdornment';

import { useStyles, AntSwitch } from "./styles";

const List: React.FC = () => {

    const classes = useStyles();
    const [error, setError] = useState<string>('');
    const [search, setSearch] = useState<string>('');
    const [pageCount, setPageCount] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);
    const [isEmpty, setIsEmpty] = useState<boolean>(false);
    const [firstReq, setFirstReq] = useState<boolean>(true);
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [newSearch, setNewSearch] = useState<boolean>(false);
    const [listBovino, setListBovino] = useState<Bovino[]>([]);
    const [searchByName, setSearchByName] = useState<boolean>(false);

    useEffect(() => {
        const request = async () => {
            try {
                setLoading(true);
                if ((firstReq && listBovino.length === 0) || listBovino.length <= currentPage*6) {
                    const response = searchByName
                        ? await api.get(`/bovino?page=${currentPage}&nome=${search.replace(' ', '-')}`)
                        : await api.get(`/bovino?page=${currentPage}&brinco=${search.replace(' ', '-')}`);
                    
                    const list: Bovino[] = [...listBovino, ...response.data.list];
                    setFirstReq(false);
                    setListBovino(list);
                    list.length === 0 ? setIsEmpty(true) : setIsEmpty(false);
                    setPageCount(Math.ceil(response.data.count/6));
                }
            } catch (error) {
                setError('Ocorreu um erro interno. Por favor, contate a equipe de desenvolvimento.')
            } finally {
                setLoading(false);
            }
        }
        request();
    }, [currentPage, newSearch]);


    const handleChangeSearch = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setCurrentPage(0);
        setFirstReq(true);
        setListBovino([]);
        setNewSearch(!newSearch);
    }

    return (
        <div>
            <form className={classes.root}>
                <TextField
                    id="search"
                    variant="outlined"
                    className={classes.inputSearch}
                    onChange={(e) => setSearch(e.target.value)}
                    label={searchByName? "Buscar por nome" : "Buscar por brinco"}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton type="submit" onClick={(e) => handleChangeSearch(e)}>
                                    <MdSearch size="22" />
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                />
                <Typography component="div">
                    <Grid component="label" container alignItems="center" spacing={1}>
                        <Grid item>Brinco</Grid>
                        <Grid item>
                            <AntSwitch 
                                name="searchType" 
                                checked={searchByName} 
                                onChange={() => setSearchByName(!searchByName)} 
                            />
                        </Grid>
                        <Grid item>Nome</Grid>
                    </Grid>
                </Typography>
            </form>
            {!loading? 
                error !== ''?
                    <div className={classes.handleErrorEmpty}>
                        <Alert severity="error">{error}</Alert>
                    </div>
                : isEmpty?
                    <div className={classes.handleErrorEmpty}>
                        <Alert severity="info">Não há bovinos cadastrados</Alert>
                    </div>
                : <><TableContainer component={Paper} className={classes.table}>
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