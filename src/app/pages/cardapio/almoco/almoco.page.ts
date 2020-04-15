import { Constants } from './../../comunicados/constants';
import { CardapioService, TableDataCardapio } from './../cardapio.service';
import { Component, OnInit,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Menu } from '../menu-model';
import { IfStmt } from '@angular/compiler';

@Component({
  selector: 'app-almoco',
  templateUrl: './almoco.page.html',
  styleUrls: ['./almoco.page.scss'],
})
export class AlmocoPage implements OnInit {
  items: Menu[]
  data: TableDataCardapio
  constructor(private carcapioService: CardapioService) {
  }

  ngOnInit() {
    this.getCardapioAlmoco()
  }

  getCardapioAlmoco() {
    let mes = new Date().getMonth()
    this.carcapioService.getCardapioAlmoco()
      .subscribe((res: TableDataCardapio) => {
        this.data = [...res]
        this.items = []
        this.data.forEach(e => {
          e.turmas.forEach(t => {
            if (t.nome.replace(/\s/g, '') === Constants.turma) {
              console.log('mes' + mes + ' - ' + e.periodo)
              if (mes < 5 && e.periodo === 1) {
                this.setItem(e)
              }
              if (this.items.length === 0) {
                if (mes > 5 && e.periodo === 2) {
                  this.setItem(e)
                }
              }
            }
          })
        })
      })

  }
  setItem(e) {
    e.menuCardapio.forEach(m => {
      let menu = new Menu(m.referenciaPeriodo, 0, m.itensCardapio, this.getDia(m.referenciaPeriodo))
      this.items.push(menu)
    })
  }
  getDia(dia): string {
    switch (dia) {
      case 1:
        return 'Segunda'
        break
      case 2:
        return 'Terça'
        break
      case 3:
        return 'Quarta'
        break
      case 4:
        return 'Quinta'
        break
      case 5:
        return 'Sexta'
        break

    }
  }
  getItens() {
    return this.items
  }
}
