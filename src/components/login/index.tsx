import React, { useState } from "react";
import { Link } from "react-router-dom";

import Alert from '@material-ui/lab/Alert';
import Input from "@material-ui/core/Input";
import Button from '@material-ui/core/Button';
import InputLabel from "@material-ui/core/InputLabel";
import IconButton from '@material-ui/core/IconButton';
import FormControl from '@material-ui/core/FormControl';
import InputAdornment from '@material-ui/core/InputAdornment';

import { VscLoading } from "react-icons/vsc";
import { MdVisibility, MdVisibilityOff, MdSend } from "react-icons/md";


import {
    Error,
    Container,
} from "./styles";

const Login: React.FC = () => {

    const [email, setEmail] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [showPasswd, setShowPasswd] = useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();

        if (!email) { setError('Por favor, informe o e-mail'); return; }
        if (!password) { setError('Por favor, informe a senha'); return; }

        console.log(email);
        console.log(password);
    }

    const handleChangePasswd = (value: string) => {
        setError('');
        setPassword(value);
    }

    const handleChangeEmail = (value: string) => {
        setError('');
        setEmail(value)
    }

    return (
        <Container>
            <h1>LOGIN</h1>
            <form id="form-login" onSubmit={handleSubmit}>
                <FormControl>
                    <InputLabel htmlFor="form-login">E-mail</InputLabel>
                    <Input
                        value={email}
                        className="input"
                        id="standard-adornment-email"
                        error={error === 'Por favor, informe o e-mail'}
                        onChange={(e) => handleChangeEmail(e.target.value)}
                   />
                </FormControl>
                <FormControl>
                    <InputLabel htmlFor="form-login">Senha</InputLabel>
                    <Input
                        value={password}
                        className="input"
                        id="standard-adornment-password"
                        type={showPasswd ? 'text' : 'password'}
                        error={error === 'Por favor, informe a senha'}
                        onChange={(e) => handleChangePasswd(e.target.value)}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={(e) => setShowPasswd(!showPasswd)}
                                >
                                    {showPasswd ? <MdVisibility /> : <MdVisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        }
                   />
                </FormControl>
                <Link to="/auth/forgot" className="link">
                    Esqueceu sua senha?
                </Link>
                <Button
                    type="submit"
                    color="primary"
                    className="button"
                    variant="contained"
                    endIcon={loading? <VscLoading /> : <MdSend />}
                >
                    Enviar
                </Button>
            </form>
            <Link to="/auth/register" className="link">
                Não possui acesso? Cadastre-se já!
            </Link>
            <Error>
                {error? <Alert severity="error">{error}</Alert> : null}
            </Error>
        </Container>
    );
}

export default Login;