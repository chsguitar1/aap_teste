
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CardapioService, TableDataCardapio } from '../cardapio.service';
import { Menu } from '../menu-model';
import { Constants } from '../../comunicados/constants';
import { ItemCardapio } from '../itemCardapio-model';
import { ToastController } from '@ionic/angular';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-lanche',
  templateUrl: './lanche.page.html',
  styleUrls: ['./lanche.page.scss'],
})
export class LanchePage implements OnInit {
  items: Menu[]
  data: TableDataCardapio
  itensCardapio: Array<ItemCardapio>

  constructor(private carcapioService: CardapioService,
    public toastController: ToastController) { }

  ngOnInit() {
  }

  getCardapioLanche(turma, dia, mes) {

    this.carcapioService.getCardapioLanche(turma, dia).
      pipe(map(c => c.filter(com => com.status === 'Ativo')))
      .subscribe((res: TableDataCardapio) => {
        this.data = [...res]
        this.items = []
        this.data.forEach(e => {
          if (turma !== '') {
            e.turmas.forEach(t => {
              if (t.nome.replace(/\s/g, '') === Constants.turma) {
                if (e.menuCardapio !== undefined) {
                  e.menuCardapio.forEach(r => {
                    if (r.referenciaPeriodo === dia && r.mes === mes) {
                      let menu: Menu = {
                        referenciaPeriodo: dia,
                        mes: mes,
                        itensCardapio: r.itensCardapio
                      }
                      this.items.push(menu)
                    }
                  })
                }
              }
            })
          }
        })
        if (this.items.length > 0) {
          this.presentToast()
        }
      })

  }

  dateSelected(event) {

    this.getCardapioLanche(Constants.turma, event.getDate(), event.getMonth())
  }

  async presentToast() {
    let pratos: string = ''
    this.items.forEach(i => {
      i.itensCardapio.forEach(c => {
        pratos += c.prato + ' '
      })
    })

    const toast = await this.toastController.create({
      header: 'Cardápio de lanche',
      message: pratos,
      position: 'bottom',
      closeButtonText: 'Fechar',
      color: 'light',
      showCloseButton: true,
      duration: 1500
    });
    toast.present();
  }

}
