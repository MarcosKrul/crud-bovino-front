import React, { useEffect, useState } from "react";
import LottieView from "react-lottie";
import { useList } from "../../hooks/listBovino";

import Row from "./Row";
import Bovino from "../../common/Bovino";
import loadView from "../../assets/lottieAnimations/lf30_editor_cyvdum0m.json"; 

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

interface IPagination {
    page: number;
    values: Bovino[];
}

const List: React.FC = () => {

    const { 
        isEmpty, 
        pageCount, 
        listBovino, 
        currentPage,
        load, 
        reset, 
        setCurrentPage,
    } = useList();

    const classes = useStyles();
    const [error, setError] = useState<string>('');
    const [search, setSearch] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);
    const [newSearch, setNewSearch] = useState<boolean>(false);
    const [searchByName, setSearchByName] = useState<boolean>(false);

    useEffect(() => {
        const request = async () => {
            try {

                setLoading(true);
                await load({
                    search,
                    searchByName,
                });

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
        reset();
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
                                <TableCell align="center">Raça</TableCell>
                                <TableCell align="left">Sexo</TableCell>
                                <TableCell align="center">Nascimento</TableCell>
                                <TableCell align="center">Mãe</TableCell>
                                <TableCell align="center">Pai</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                listBovino
                                .filter((item: IPagination) => (
                                    item.page === currentPage? item : null
                                ))[0]?.values.map((bovino: Bovino) => (
                                    <Row key={bovino.id} row={bovino} />
                                ))
                            }
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
                    <LottieView 
                        options={{
                            loop: true,
                            autoplay: true,
                            animationData: loadView
                        }}
                        width={700}
                        height={700}
                    />
                </div>
            }
        </div>
    );
}

export default List;