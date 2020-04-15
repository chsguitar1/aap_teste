import { Colaborador } from './colaborador-model';
import { Responsaveis } from "./responsavel-model";


export class Usuario {
    constructor(
        public email: string,
        public login: string,
        public pass: string,
        public responsavel: Responsaveis,
        public colaborador: Colaborador,
        public status: string,
        public tipo: string,
        public padrao: number,
        public cpf: string
       
    ) { }
}