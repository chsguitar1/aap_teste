
import { SQLite } from '@ionic-native/sqlite';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, MenuController, ToastController, AlertController, LoadingController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { AlunoService } from '../aluno/aluno.service';
import { LoginService } from './login.service';
import { AlunoPage } from '../aluno/aluno.page';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public onLoginForm: FormGroup;

  constructor(
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    private formBuilder: FormBuilder,
    public auth: AngularFireAuth,
    private router: Router,
    private storage: Storage,
    private alunoService: AlunoService,
    private loginService: LoginService

  ) { }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  ngOnInit() {
    this.storage.get('logedIn').then((value) => {
      if (value) {
        this.storage.get('email').then((email) => {
          this.storage.get('pass').then((pass) => {
            console.log(email)
            this.login(email, pass)
          })
        })

      }
    })
    this.onLoginForm = this.formBuilder.group({
      'email': [null, Validators.compose([
        Validators.required
      ])],
      'password': [null, Validators.compose([
        Validators.required
      ])]
    });

  }

  async forgotPass() {
    const alert = await this.alertCtrl.create({
      header: 'Esqueceu sua senha?',
      message: 'Digite seu email para receber o link seguro ',
      inputs: [
        {
          name: 'email',
          type: 'email',
          placeholder: 'Email'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Confirmar',
          handler: async data => {
            const loader = await this.loadingCtrl.create({
              duration: 2000
            });
            loader.present();
            this.loginService.resetPassword(data.email)
              .then(e => {
                this.loadermanagement(loader)
              })
              .catch(_error => {
                console.log(_error)
              })

            // 

          }
        }
      ]
    });

    await alert.present();
  }

  goToRegister() {
    this.auth.auth.signInWithEmailAndPassword(
      this.onLoginForm.value.email,
      this.onLoginForm.value.password)
      .then(response => {
        this.navCtrl.navigateRoot('/register');
      }).catch(erro => {
        this.errorLogin()
      })

  }

  goToHome() {
    this.login(this.onLoginForm.value.email,
      this.onLoginForm.value.password)
  }

  login(email: string, password: string) {
    AlunoPage.EMAIL = email
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
              this.router.navigate([`/aluno`])
              this.onLoginForm.reset()
            }).catch(erro => {
              this.errorLogin()
            })
        }
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

    await alert.present();
  }

  sendResetEmail(email) {
    this.loginService.resetPassword(email)
      .then(() => alert(`Um email foi enviado para seu ${email}`))
      .catch(_error => {
        console.log(_error)
      })
  }

  loadermanagement(loader) {
    loader.onWillDismiss().then(async l => {
      const toast = await this.toastCtrl.create({
        showCloseButton: true,
        closeButtonText: 'Fechar',
        message: 'Email enviado com sucesso!.',
        duration: 3000,
        position: 'bottom'
      });

      toast.present();
    });
  }

}
