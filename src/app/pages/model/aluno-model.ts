import { Pessoa } from "./pessoa-model";
import { Responsaveis } from "./responsavel-model";
import { Turma } from "./turma-model";
import { Comunicado } from "./comunicado-model";


export class Aluno extends Pessoa{
    super(
        matricula: string,
        foto: string,
        responsaveis: Responsaveis[],
        turma: Turma,
        comunicados: Comunicado[]
    ){

    }
}