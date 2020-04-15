import { Media } from "./media-model";

export class Evento{
    constructor(
        public nome:string,
        public data: string,
        public status: string,
        public texto: string,
        public media: Media[],
        public hora:string,
        public ano: string,
        public turmas: Array<string>
       
    ){

    }
}