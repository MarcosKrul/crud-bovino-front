import React, { useState } from "react";
import api from "../../services/api";

import Alert from '@material-ui/lab/Alert';
import Input from "@material-ui/core/Input";
import Button from '@material-ui/core/Button';
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from '@material-ui/core/FormControl';

import { VscLoading } from "react-icons/vsc";
import { MdSend } from "react-icons/md";


import {
    Container,
    HandleErrorOrSuccess
} from "./styles";

const Forgot: React.FC = () => {

    const [email, setEmail] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [success, setSuccess] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();

        if (!email) { setError('Por favor, informe o e-mail'); return; }

        try {

            setLoading(true);
            await api.post('/session/forgot', {
                email
            });
            setSuccess('Um e-mail com as instruções foi enviado!');

        } catch (error) {
            setError(error.response.data.error || 'Ocorreu um erro intero');
        } finally {
            setLoading(false);
        }
    }

    const handleChangeEmail = (value: string) => {
        setError('');
        setEmail(value)
    }

    return (
        <Container>
            <h1>RECUPERAR SENHA</h1>
            <form id="form-forgot" onSubmit={handleSubmit}>
                <FormControl>
                    <InputLabel htmlFor="form-forgot">E-mail</InputLabel>
                    <Input
                        value={email}
                        className="input"
                        id="standard-adornment-email"
                        error={error === 'Por favor, informe o e-mail'}
                        onChange={(e) => handleChangeEmail(e.target.value)}
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
            <HandleErrorOrSuccess>
                {error
                    ? <Alert severity="error">{error}</Alert> 
                    : success  
                        ? <Alert severity="success">{success}</Alert>
                        : null
                }
            </HandleErrorOrSuccess>
        </Container>
    );
}

export default Forgot;