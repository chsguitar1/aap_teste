import { Turma } from "../model/turma-model";
import { Menu } from "./menu-model";

export class Cardapios {
  constructor (
    public periodo: Number,
    public tipoPeriodo: string,
    public tipoCardapio: string,
    public menuCardapio: Array<Menu>,
    public nutricionista: string,
    public turmas: Array<Turma>,
    public colaborador: string,
    public status: string,
  ) {}
}
