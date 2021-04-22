export default interface Bovino {
    id?: string;
    nome: string;
    raca: string;
    sexo: string;
    brinco: string;
    situacao: string;
    nascimento: string;
    brinco_mae?: string;
    brinco_pai?: string;
    femea?: {
        prenhez?: string;
        ultimo_parto?: string;
    }
}