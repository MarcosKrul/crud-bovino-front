import React, { useState, useEffect } from "react";
import api from "../../services/api";

import Bovino from "../../common/Bovino";

import Alert from '@material-ui/lab/Alert';
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
    const [error, setError] = useState<string>('');
    const [racas, setRacas] = useState<string[]>([]);
    const [success, setSuccess] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [situacoes, setSituacoes] = useState<string[]>([]);
    const [bovino, setBovino] = useState<Bovino>({
        sexo: 'M', 
        raca: 'Selecione',
        situacao: 'Selecione'
    } as Bovino);

    const handleSetBovino = (b: Bovino) => {
        setBovino(b);
        setError('');
    }

    useEffect(() => {
        const request = async () => {
            try {
                const response = await api.get('/selects');
                setRacas(['Selecione', ...response.data.racas]);
                setSituacoes(['Selecione', ...response.data.situacoes]);
            } catch (error) {
                setError("Ocorreu um erro ao carregar as informações");
            }
        }
        request();
    }, []);

    useEffect(() => {
        setTimeout(() => {
            if (success) setBovino({
                nome: '',
                sexo: 'M', 
                brinco: '',
                raca: 'Selecione',
                situacao: 'Selecione',
                nascimento: 'dd/mm/aaaa'
            } as Bovino);
            setSuccess(false);
        }, 5000);
    }, [success]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!bovino.nome) { setError("Insira o nome do bovino"); return; }
        if (!bovino.brinco) { setError("Insira o brinco do bovino"); return; }
        if (bovino.raca === "Selecione") { setError("Selecione a raca do bovino"); return; }
        if (bovino.situacao === "Selecione") { setError("Selecione a situacao do bovino"); return; }
        if (!bovino.nascimento) { setError("Insira a data de nascimento do bovino"); return; }
        
        try {
            setLoading(true);
            await api.post('/bovino', {...bovino, ...bovino.femea});
            setSuccess(true);
        } catch (error) {
            setError(error.response.data.error);
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
                    value={bovino.nome}
                    className={classes.input}
                    error={error === "Insira o nome do bovino"}
                    style={{ gridRow: '1/2', gridColumn: '1/2', justifySelf: 'end' }}
                    onChange={(e) => handleSetBovino({...bovino, nome: e.target.value})}
                />
                <TextField
                    id="brinco"
                    label="Brinco"
                    variant="outlined"
                    value={bovino.brinco}
                    className={classes.input}
                    error={error === "Insira o brinco do bovino"}
                    style={{ gridRow: '1/2', gridColumn: '2/3' }}
                    onChange={(e) => handleSetBovino({...bovino, brinco: e.target.value})}
                />
                <TextField
                    select
                    id="raca"
                    label="Raça"
                    variant="outlined"
                    value={bovino.raca}
                    defaultValue={"Selecione"}
                    className={classes.input}
                    error={error === "Selecione a raca do bovino"}
                    style={{ gridRow: '2/3', gridColumn: '1/2', justifySelf: 'end' }}
                    onChange={(e) => handleSetBovino({...bovino, raca: e.target.value})}
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
                    error={error === "Selecione a situacao do bovino"}
                    onChange={(e) => handleSetBovino({...bovino, situacao: e.target.value})}
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
                    value={bovino.nascimento}
                    className={classes.input}
                    InputLabelProps={{ shrink: true }}
                    error={error === "Insira a data de nascimento do bovino"}
                    style={{ gridRow: '3/4', gridColumn: '1/2', justifySelf: 'end' }}
                    onChange={(e) => handleSetBovino({...bovino, nascimento: e.target.value})}
                />
                <TextField
                    select
                    id="sexo"
                    label="Sexo"
                    variant="outlined"
                    value={bovino.sexo}
                    className={classes.input}
                    style={{ gridRow: '3/4', gridColumn: '2/3' }}
                    onChange={(e) => handleSetBovino({...bovino, sexo: e.target.value})}
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
                        onChange={(e) => handleSetBovino({
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
                        onChange={(e) => handleSetBovino({
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
                    onChange={(e) => handleSetBovino({...bovino, brinco_mae: e.target.value})}
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
                    onChange={(e) => handleSetBovino({...bovino, brinco_pai: e.target.value})}
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
                <div 
                    className={classes.handleErrorSuccess} 
                    style={{ gridRow: bovino.sexo === 'F'? '7/8' : '6/7' }}
                >
                    {error
                        ? <Alert severity="error">{error}</Alert>
                        : null
                    }
                    {success
                        ? <Alert severity="success">Bovino cadastrado com sucesso!</Alert>
                        : null
                    }
                </div>
            </form>
        </div>
    );
}

export default Create;