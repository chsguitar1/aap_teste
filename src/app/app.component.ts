import { Component } from '@angular/core';

import { Platform, NavController, AlertController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
//import { Firebase } from '@ionic-native/firebase/ngx';
//import { FCM } from '@ionic-native/fcm/ngx';
import { Pages } from './interfaces/pages';
import { Storage } from '@ionic/storage';
import { FCM } from '@ionic-native/fcm/ngx';
import { Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import { timer } from 'rxjs/observable/timer';
import { AlunoService } from './pages/aluno/aluno.service';
import { AngularFireAuth } from '@angular/fire/auth';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  showSplash = true;
  public appPages: Array<Pages>;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public navCtrl: NavController,

    private alertCtrl: AlertController,

    private fcm: FCM,
    private router: Router,
    private st: AngularFireStorage,
    private storage: Storage,
    private alunoService: AlunoService,
    public auth: AngularFireAuth,
  ) {

    platform.ready().then(() => {
      statusBar.styleDefault();
      this.iniciarListenerDeNotificacoes()
      timer(3000).subscribe(() =>{ 
        this.storage.get('logedIn').then((value) => {
          if (value) {
            this.storage.get('email').then((email) => {
              this.storage.get('pass').then((pass) => {
                this.login(email, pass)
              })
            })
          }else{
            this.showSplash = false
          }
        })
      })
    }).catch(() => { });
    
   
    this.platform.backButton.subscribe(() => {

    });

    
  }

  login(email: string, password: string) {
    let usuarios: any[]
    this.alunoService.getResponsavelLogin(email)
      .subscribe(usu => {
        usuarios = usu
        if (usuarios.length > 0) {
          this.auth.auth.signInWithEmailAndPassword(
            email, password
          )
            .then(response => {
              this.storage.set('logedIn', true)
              this.storage.set('email', email)
              this.storage.set('pass', password)
              this.router.navigate([`/aluno/${email}`])
              this.showSplash = false

            }).catch(erro => {
              this.errorLogin()
            })
        }
      })
  }

  iniciarListenerDeNotificacoes() {
    this.fcm.onNotification().subscribe(e => {
      this.mostrarAlert('notificação',e.wasTapped.valueOf());
    })
  }

  async errorLogin() {
    const alert = await this.alertCtrl.create({
      header: 'Login',
      message: 'Usuário ou senha não encontrados',
      buttons: [
        {
          text: 'Sair',
          role: 'cancel',
          cssClass: 'secondary',
        }
      ]
    });
  }
  goToEditProgile() {
    this.navCtrl.navigateForward('edit-profile');
  }

  logout() {
    this.navCtrl.navigateRoot('/');
  }

  async mostrarAlert(titulo, texto) {
    const alert = await this.alertCtrl.create({
      header: titulo,
      message: texto,
      buttons: [
        {
          text: texto,
          handler: () => {
          }
        }
      ]
    });
    await alert.present();
  }
}
