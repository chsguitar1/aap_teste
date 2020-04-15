export class Comunicado{
    constructor(
        public data: string,
        public turma: Array<string>,
        public status:string,
        public data_cadastro:string,
        public colabolador: string,
        public texto: string,
        public titulo: string
    ){

    }
}