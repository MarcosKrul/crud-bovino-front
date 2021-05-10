import React, { useState } from 'react';
import { useList } from "../../hooks/listBovino";

import Alert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';

import { VscLoading } from 'react-icons/vsc';
import { MdCheck, MdError } from 'react-icons/md';

import {
    Container,
} from './styles';

interface Props {
    id?: string;
    setViewDeleteModal(b: boolean): void;
}

const Delete: React.FC<Props> = ({ id, setViewDeleteModal }) => {

    const { remove } = useList();
    const [error, setError] = useState<string>('');
    const [success, setSuccess] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit = async (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();

        try {
         
            setLoading(true);
            if (id) {
                await remove(id);
                setSuccess(true);
            } else {
                setError('Ocorreu um erro interno')
            }

        } catch (error){
            setError(error?.response?.data?.error || 'Ocorreu um erro interno');
        } finally {
            setLoading(false);
        }
    }

    return (
        <Container>
            <h1>Você tem certeza que deseja exluir o bovino?</h1>
            <Button
                onClick={() => setViewDeleteModal(false)}
                id="btn-confirmar"
                className="button"
                variant="contained"
                endIcon={<MdCheck />}
            >
                Não, desejo mantê-lo
            </Button>
            <Button
                onClick={(e) => handleSubmit(e)}
                id="btn-rejeitar"
                className="button"
                variant="contained"
                endIcon={loading? <VscLoading /> : <MdError />}
            >
                Sim, desejo removê-lo
            </Button>
            {error
                ? <Alert severity="error" style={{width: '80%', margin: '10px 0'}}>
                    {error}
                  </Alert>
                : null
            }
            {success
                ? <Alert severity="success" style={{width: '80%', margin: '10px 0'}}>
                    Bovino removido!
                  </Alert>
                : null
            }
        </Container>
    );   
}

export default Delete;