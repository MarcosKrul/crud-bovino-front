import React from "react";

import { Container } from "./styles";

const Home: React.FC = () => (
    <Container>
        <h1>Sistema para controle de bovinos</h1>
        <h2>Resolução do teste teórico e prático para treinamento do estágio na empresa Rerum Engenharia de Sistemas</h2>
        <h3>Desenvolvido em 04/2021 por Marcos Renan Krul {'<marcoskrul2k@gmail.com>'}</h3>

        <p>Repositórios remotos contendo o código fonte</p> <br />
        <ul>
            <li>
                <a href="https://github.com/MarcosKrul/crud-bovino-front" target="_blank">Front-end</a>
            </li>
            <li>
                <a href="https://github.com/MarcosKrul/crud-bovino-back" target="_blank">Back-end</a>
            </li>
        </ul>
        
        <p>Funcionalidades do sistema</p> <br />
        <ul>
            <li>Cadastro de bovinos</li>
            <li>Listagem de bovinos</li>
            <li>Busca de bovinos ou por nome ou por brinco</li>
        </ul>

        <p>Características de um bovino</p> <br />
        <ul>
            <li>Raça</li>
            <li>Situação atual</li>
            <li>Data de nascimento</li>
            <li>Brinco do bovino mãe</li>
            <li>Brinco do bovino pai</li>
            <li>Nome (máx. 20 caracteres)</li>
            <li>Brinco (máx. 8 caracteres)</li>
            <li>
                Para fêmeas
                <ul>
                    <li>Data de prenhez</li>
                    <li>Data do último parto</li>
                    <li>Data do próximo parto (prenhez + 9 meses)</li>
                </ul>
            </li>
        </ul>
    </Container>
)

export default Home;