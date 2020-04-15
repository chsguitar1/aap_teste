import { Permissoes } from "./permissao-model";
import { Usuario } from "./usuario-model";

export class Colaborador{
    constructor(
        public nome:string,
        public cargo:string,
        public status:string,
        public dataCadastro: string,
        public permissoes: Permissoes[],
        public usuario: Usuario,
        public cpf: string
    ){}
}