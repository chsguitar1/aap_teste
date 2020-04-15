import { Evento } from "./evento-model";
import { Aluno } from "./aluno-model";


export class Turma{
    constructor(
        public nome: string,
        public nivel: string,
        public fase: string,
        public status:string,
        public dataCadastro: String,
        public eventos: Evento[],
        public colaborador: string,
        public ano: string,
        public alunos?: Aluno[]
        

    ){}
}