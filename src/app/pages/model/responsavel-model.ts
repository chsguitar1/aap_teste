import { Colaborador } from "./colaborador-model";


export class Responsaveis {
constructor(
    public nome: string,
    public endereco: string,
    public telefone: string,
    public celular: string,
    public cpf: string,
    public rg: string,
    public status: string,
    public colaborador: string,
    public dataCadastro: string,
    public dataNascimento: string,
    public numero: string,
    public _colaborador: Colaborador,
    public tipo: string,
    public email: string
   ){

}
}