import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import api from "../../services/api";

import Alert from '@material-ui/lab/Alert';
import Input from "@material-ui/core/Input";
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from '@material-ui/core/FormControl';
import InputAdornment from '@material-ui/core/InputAdornment';

import { VscLoading } from "react-icons/vsc";
import { MdVisibility, MdVisibilityOff, MdSend } from "react-icons/md";

import {
    Error,
    Container,
} from "./styles";

interface Params {
    token: string;
}

const Reset: React.FC = () => {

    const history = useHistory();
    const { token } = useParams<Params>();

    const [error, setError] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [showPasswd, setShowPasswd] = useState<boolean>(false);
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [showConfirmPasswd, setShowConfirmPasswd] = useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();

        if (!email) { setError('Por favor, informe o e-mail'); return; }
        if (!password) { setError('Por favor, informe a senha'); return; }
        if (!confirmPassword) { setError('Por favor, confirme a senha'); return; }
        if (password !== confirmPassword) { setError('As senhas são diferentes'); return; }

        try {

            setLoading(true);
            await api.post(`/session/reset/${token}`, {
                email,
                password,
                confirmPassword
            });
            history.push('/auth/login');

        } catch (error) {
            setError(error.response.data.error || 'Ocorreu um erro intero');
        } finally {
            setLoading(false);
        }
    }

    const handleChangePasswd = (value: string) => {
        setError('');
        setPassword(value);
    }

    const handleChangeEmail = (value: string) => {
        setError('');
        setEmail(value);
    }

    const handleChangeConfirmPasswd = (value: string) => {
        setError('');
        setConfirmPassword(value);
    }

    return (
        <Container>
            <h1>Redefinir senha</h1>
            <form id="form-reset" onSubmit={handleSubmit}>
                <FormControl>
                    <InputLabel htmlFor="form-reset">E-mail</InputLabel>
                    <Input
                        value={email}
                        className="input"
                        id="standard-adornment-email"
                        error={error === 'Por favor, informe o e-mail'}
                        onChange={(e) => handleChangeEmail(e.target.value)}
                   />
                </FormControl>
                <FormControl>
                    <InputLabel htmlFor="form-reset">Senha</InputLabel>
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
                    <InputLabel htmlFor="form-reset">Confirme a senha</InputLabel>
                    <Input
                        className="input"
                        value={confirmPassword}
                        id="standard-adornment-password"
                        type={showConfirmPasswd ? 'text' : 'password'}
                        error={error === 'Por favor, confirme a senha'}
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

export default Reset;