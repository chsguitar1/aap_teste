import { ItemCardapio } from "./itemCardapio-model";

export class Menu {
  constructor (
    public referenciaPeriodo: number,
    public mes: number,
    public itensCardapio: Array<ItemCardapio>,
    public dia?:string
  ) {}
}
