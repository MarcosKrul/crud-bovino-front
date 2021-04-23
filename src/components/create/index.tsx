import React, { useState, useEffect } from "react";
import api from "../../services/api";

import Bovino from "../../common/Bovino";

import Button from '@material-ui/core/Button';
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";

import { MdSave } from "react-icons/md";
import { VscLoading } from "react-icons/vsc";

import useStyles from "./styles";

const generosBovino = [
    { value: "F", label: "Fêmea" },
    { value: "M", label: "Macho" }
]

const Create: React.FC = () => {

    const classes = useStyles();
    const [racas, setRacas] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [situacoes, setSituacoes] = useState<string[]>([]);
    const [bovino, setBovino] = useState<Bovino>({sexo: 'M'} as Bovino);

    useEffect(() => {
        const request = async () => {
            try {
                const response = await api.get('/selects');
                setRacas(['Selecione', ...response.data.racas]);
                setSituacoes(['Selecione', ...response.data.situacoes]);
            } catch (error) {
                console.log(error);
            }
        }
        request();
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setLoading(true);
            await api.post('/bovino', {...bovino, ...bovino.femea});
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className={classes.container}>
            <h1 className={classes.title}>
                CADASTRO DE BOVINOS
            </h1>
            <form className={classes.form} onSubmit={(e) => handleSubmit(e)}>
                <TextField
                    id="nome"
                    label="Nome"
                    variant="outlined"
                    className={classes.input}
                    style={{ gridRow: '1/2', gridColumn: '1/2', justifySelf: 'end' }}
                    onChange={(e) => setBovino({...bovino, nome: e.target.value})}
                />
                <TextField
                    id="brinco"
                    label="Brinco"
                    variant="outlined"
                    className={classes.input}
                    style={{ gridRow: '1/2', gridColumn: '2/3' }}
                    onChange={(e) => setBovino({...bovino, brinco: e.target.value})}
                />
                <TextField
                    select
                    id="raca"
                    label="Raça"
                    variant="outlined"
                    value={bovino.raca}
                    defaultValue={"Selecione"}
                    className={classes.input}
                    style={{ gridRow: '2/3', gridColumn: '1/2', justifySelf: 'end' }}
                    onChange={(e) => setBovino({...bovino, raca: e.target.value})}
                >
                    {racas.map((option) => (
                        <MenuItem key={new Date().getTime()} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    select
                    id="situacao"
                    label="Situação"
                    variant="outlined"
                    value={bovino.situacao}
                    defaultValue={"Selecione"}
                    className={classes.input}
                    style={{ gridRow: '2/3', gridColumn: '2/3' }}
                    onChange={(e) => setBovino({...bovino, situacao: e.target.value})}
                >
                    {situacoes.map((option) => (
                        <MenuItem key={new Date().getTime()} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    type="date"
                    id="nascimento"
                    label="Nascimento"
                    variant="outlined"
                    className={classes.input}
                    InputLabelProps={{ shrink: true }}
                    style={{ gridRow: '3/4', gridColumn: '1/2', justifySelf: 'end' }}
                    onChange={(e) => setBovino({...bovino, nascimento: e.target.value})}
                />
                <TextField
                    select
                    id="sexo"
                    label="Sexo"
                    variant="outlined"
                    value={bovino.sexo}
                    className={classes.input}
                    style={{ gridRow: '3/4', gridColumn: '2/3' }}
                    onChange={(e) => setBovino({...bovino, sexo: e.target.value})}
                >
                    {generosBovino.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
                {bovino.sexo === 'F' ? (<>
                    <TextField
                        type="date"
                        id="prenhez"
                        label="Prenhez"
                        variant="outlined"
                        className={classes.input}
                        InputLabelProps={{ shrink: true }}
                        style={{ gridRow: '4/5', gridColumn: '1/2', justifySelf: 'end' }}
                        onChange={(e) => setBovino({
                            ...bovino, 
                            femea: {
                                ...bovino.femea,
                                prenhez: e.target.value
                            } 
                        })}
                    />
                    <TextField
                        type="date"
                        id="ultimo_parto"
                        label="Último parto"
                        variant="outlined"
                        className={classes.input}
                        InputLabelProps={{ shrink: true }}
                        style={{ gridRow: '4/5', gridColumn: '2/3' }}
                        onChange={(e) => setBovino({
                            ...bovino, 
                            femea: {
                                ...bovino.femea,
                                ultimo_parto: e.target.value
                            } 
                        })}
                    />
                </>) : null
                }
                <TextField
                    id="brinco_mae"
                    variant="outlined"
                    label="Brinco da mãe"
                    className={classes.input}
                    style={{ 
                        gridColumn: '1/2', 
                        justifySelf: 'end', 
                        gridRow: bovino.sexo === 'F'? '5/6' : '4/5',
                    }}
                    onChange={(e) => setBovino({...bovino, brinco_mae: e.target.value})}
                />
                <TextField
                    id="brinco_pai"
                    variant="outlined"
                    label="Brinco do pai"
                    className={classes.input}
                    style={{
                        gridColumn: '2/3',
                        gridRow: bovino.sexo === 'F'? '5/6' : '4/5'
                    }}
                    onChange={(e) => setBovino({...bovino, brinco_pai: e.target.value})}
                />
                <Button
                    size="small"
                    type="submit"
                    color="primary"
                    variant="contained"
                    className={classes.button}
                    startIcon={ loading? <VscLoading /> : <MdSave /> }
                    style={{ 
                        gridColumn: '1/3', 
                        justifySelf: 'center', 
                        gridRow: bovino.sexo === 'F'? '6/7' : '5/6'
                    }}
                >
                    Cadastrar
                </Button>
            </form>
        </div>
    );
}

export default Create;