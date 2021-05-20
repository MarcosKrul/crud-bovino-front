import React, { useState } from "react";
import api from "../../services/api";
import { useAuth } from "../../hooks/auth";
import { useHistory } from "react-router-dom";

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

const Register: React.FC = () => {

    const histoy = useHistory();
    const { signIn } = useAuth();

    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [showPasswd, setShowPasswd] = useState<boolean>(false);
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [showConfirmPasswd, setShowConfirmPasswd] = useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();

        if (!name) { setError('Por favor, informe o nome'); return; }
        if (!email) { setError('Por favor, informe o e-mail'); return; }
        if (!password) { setError('Por favor, informe a senha'); return; }
        if (password !== confirmPassword) { setError('As senhas são diferentes'); return; }

        try {

            setLoading(true);
            await api.post('/users', {
                name,
                email,
                password,
                confirmPassword
            });
            await signIn({ email, password });
            histoy.push("/dashboard/home");

        } catch (error) {
            setError(error.response?.data?.error || 'Ocorreu um erro intero');
        } finally {
            setLoading(false);
        }
    }

    const handleChangePasswd = (value: string) => {
        setError('');
        setPassword(value);
    }

    const handleChangeConfirmPasswd = (value: string) => {
        setError('');
        setConfirmPassword(value);
    }

    const handleChangeEmail = (value: string) => {
        setError('');
        setEmail(value)
    }

    const handleChangeName = (value: string) => {
        setError('');
        setName(value);
    }

    return (
        <Container>
            <h1>REGISTRO</h1>
            <form id="form-register" onSubmit={handleSubmit}>
                <FormControl>
                    <InputLabel htmlFor="form-register">Nome</InputLabel>
                    <Input
                        value={name}
                        className="input"
                        id="standard-adornment-name"
                        error={error === 'Por favor, informe o nome'}
                        onChange={(e) => handleChangeName(e.target.value)}
                   />
                </FormControl>
                <FormControl>
                    <InputLabel htmlFor="form-register">E-mail</InputLabel>
                    <Input
                        value={email}
                        className="input"
                        id="standard-adornment-email"
                        error={error === 'Por favor, informe o e-mail'}
                        onChange={(e) => handleChangeEmail(e.target.value)}
                   />
                </FormControl>
                <FormControl>
                    <InputLabel htmlFor="form-register">Senha</InputLabel>
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
                <FormControl>
                    <InputLabel htmlFor="form-register">Confirme a senha</InputLabel>
                    <Input
                        value={confirmPassword}
                        className="input"
                        id="standard-adornment-password"
                        type={showConfirmPasswd ? 'text' : 'password'}
                        error={error === 'Por favor, informe a senha'}
                        onChange={(e) => handleChangeConfirmPasswd(e.target.value)}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={(e) => setShowConfirmPasswd(!showConfirmPasswd)}
                                >
                                    {showConfirmPasswd ? <MdVisibility /> : <MdVisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        }
                   />
                </FormControl>
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
            <Error>
                {error? <Alert severity="error">{error}</Alert> : null}
            </Error>
        </Container>
    );
}

export default Register;