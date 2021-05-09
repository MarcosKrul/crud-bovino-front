import React from 'react'
import Bovino from '../../common/Bovino';

import Create from "../create";

import {
    Container
} from './styles';

interface Props{
    bovino: Bovino;
}

const Update: React.FC<Props> = ({ bovino }) => (
    <Container>
        <Create bov={bovino} create={false} />
    </Container>
);

export default Update;