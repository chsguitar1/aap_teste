import { ModalPage } from './modal';

import { Constants } from './constants';
import { AlunoPage } from './../aluno/aluno.page';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { TableDataComunicado, ComunicadoService, _Comunicado, TableDataComunicadoResponsavel } from './comunicado.service';
import { Storage } from '@ionic/storage';
import { map } from 'rxjs/operators';
import { TabsHomePage } from '../tabs-home/tabs-home.page';
import { Globals } from '../globals';
import { AlertController, ModalController } from '@ionic/angular';
import { async } from 'rxjs/internal/scheduler/async';


@Component({
  selector: 'app-comunicados',
  templateUrl: './comunicados.page.html',
  styleUrls: ['./comunicados.page.scss'],
})
export class ComunicadosPage implements OnInit, OnDestroy {

  ngOnDestroy(): void {
    this.comunicados = null
  }

  comunicados: TableDataComunicado
  nomeAluno: string
  foto: any
  globals: Globals
  filtered: boolean
  titleIcon

  constructor(
    private comunicadoService: ComunicadoService,
    private storage: Storage,
    private router: Router,
    globals: Globals,
    public alertController: AlertController,
    public modalController: ModalController

  ) {
    this.globals = globals
    this.comunicados = null
    console.log(Constants.NOME)
    this.nomeAluno = Constants.NOME

  }


  ngOnInit() {
    this.getNameAluno()
    this.getComunicadoAluno()
    this.comunicados = Constants.comunicados
    this.getFoto()
  }

  getFoto() {
    return Constants.foto
  }
  getNameAluno() {
    return Constants.NOME
  }
  getComunicadoAluno() {

    return Constants.comunicados
  }

  async presentModal() {
    if (this.filtered) {
      Constants.comunicados = this.comunicados;
      this.getComunicados()
      this.getComunicadoAluno()
      this.filtered = false
    } else {
      const modal = await this.modalController.create({
        component: ModalPage,
        cssClass: 'modalcss'
      });
      modal.onDidDismiss().then((dataReturned) => {
        if (dataReturned !== null) {
          this.getComunicadoFiltered(dataReturned.data)
        }
      });
      return await modal.present();
    }
  }


  getComunicadoFiltered(mes: string) {
    let dataFilter = Constants.getDataFilter(mes)
    this.comunicadoService.getComunicados(Constants.turma).
      pipe(map(c => c.filter(com => com.data.includes(dataFilter) && com.status === 'publicar')))
      .subscribe((result: TableDataComunicado) => {
        if (result === null || result === undefined) {
          Constants.comunicados = []
        } else {
          let naoLidos: TableDataComunicadoResponsavel
          this.comunicadoService.getComunicadosNLidos(Constants.CPFUSUARIO)
            .subscribe((res: TableDataComunicadoResponsavel) => {
              naoLidos = res
              result.forEach(r => {
                let posicao = result.indexOf(r)
                naoLidos.forEach(n => {
                  if (n.comunica === r.titulo + Constants.CPFUSUARIO) {
                    result[posicao].checked = true
                  }
                })
              })
              Constants.comunicados = [...result]
            })
        }
      })
    this.filtered = true;
  }

  getComunicados() {
    this.comunicadoService.getComunicados(Constants.turma).
      pipe(map(c => c.filter(com => com.status === 'publicar')))
      .subscribe((result: TableDataComunicado) => {
        if (result === null || result === undefined) {
          Constants.comunicados = []
        } else {
          let naoLidos: TableDataComunicadoResponsavel
          this.comunicadoService.getComunicadosNLidos(Constants.CPFUSUARIO)
            .subscribe((res: TableDataComunicadoResponsavel) => {
              naoLidos = res
              result.forEach(r => {
                let posicao = result.indexOf(r)
                naoLidos.forEach(n => {
                  if (n.comunica === r.titulo + Constants.CPFUSUARIO) {
                    result[posicao].checked = true
                  }
                })
              })
              Constants.comunicados = [...result]
            })
        }
      })
  }

  viewComunicado(item: _Comunicado, index) {
    Constants.comunicados[index].checked = false
    this.comunicadoService.setComunicadoLido(item)
    this.comunicadoService.getComunicadosNLidos(Constants.CPFUSUARIO)
      .subscribe((res: any[]) => {
        this.globals.ncom = res.length
      })
    this.router.navigate([`/view-comunicado`], { queryParams: item })
  }

  editAluno() {
    this.router.navigate([`/edit-aluno`])
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Confirme!',
      message: 'Deseja realmente sair?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Sim',
          handler: () => {
            this.logout()
          }
        }
      ]
    });
    await alert.present();
  }

  logout() {
    this.storage.clear()
    this.router.navigate([''])
  }

}

