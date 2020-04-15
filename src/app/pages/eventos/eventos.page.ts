import { AlunoPage } from './../aluno/aluno.page';
import { map } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { EventosService, TableDataEvento, TableDataMedia } from './eventos.service';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { Media } from '../model/media-model';
import { Constants } from '../comunicados/constants';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.page.html',
  styleUrls: ['./eventos.page.scss'],
})
export class EventosPage implements OnInit {
  eventos: TableDataEvento
  medias: any[] = []
  nomeAluno: any;
  fotonula: string = 'assets/img/no-photo.png'
  foto: any
  constructor(
    private eventoService: EventosService,
    private storage: Storage,
    private router: Router,
    public alertController: AlertController) {
    this.storage.get('foto').then((valor) => {
      this.foto = valor
    })
  }


  ngOnInit() {
    this.getNameAluno()
    this.getEventosAluno()
    this.getFoto()
  }
  getNameAluno() {
    return Constants.NOME
  }
  getEventosAluno() {
    return Constants.eventos
  }
  getFoto() {
    return Constants.foto
  }

  viewEvento(item, key) {
    console.log(key)

    this.router.navigate(['/view-evento'], { queryParams: item })
  }
  editAluno() {
    this.router.navigate([`/edit-aluno`])
  }

  logout() {
    this.storage.clear()
    this.router.navigate([''])
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


}
