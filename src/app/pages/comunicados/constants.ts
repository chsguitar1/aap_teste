import { TableDataComunicado } from "./comunicado.service";
import { TableDataEvento } from "../eventos/eventos.service";

export class Constants {
    static NOME = ''
    static comunicados: TableDataComunicado
    static eventos :TableDataEvento
    static foto = ''
    static turma = ''
    static nomeTurma = ''
    static CPF = ''
    static CPFUSUARIO = ''
    static CPFALUNO = ''

    static getDataFilter(mes): string{
       let days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
        let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        return `${months[mes]}`
    }
    
   
}
export  let  NUMCOMUNICADOS;