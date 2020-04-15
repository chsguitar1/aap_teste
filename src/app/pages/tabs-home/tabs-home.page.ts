import { ComunicadoService } from './../comunicados/comunicado.service';
//import { Constants } from './../comunicados/constants';
import { NUMCOMUNICADOS, Constants } from './../comunicados/constants';
import { AlunoService, TableDataTurma, _Turma } from './../aluno/aluno.service';
import { AlunoPage } from './../aluno/aluno.page';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Platform } from '@ionic/angular';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';
import { Globals } from '../globals';


@Component({
  selector: 'app-tabs-home',
  templateUrl: './tabs-home.page.html',
  styleUrls: ['./tabs-home.page.scss'],

})
export class TabsHomePage implements OnInit {
  email: string
  cpfAluno: any;
  cpfUsuario: string
  turma: string
  ncomunicados: number = 0
  globals: Globals;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private storage: Storage,
    private platform: Platform,
    private iab: InAppBrowser,
    private alunoservice: AlunoService,
    private comunicadoService: ComunicadoService,
    globals: Globals,
  ) {
    this.globals = globals
    this.platform.ready().then(() => {
      this.platform.backButton.subscribe(() => {
      });
    })
    this.route.queryParams.subscribe(
      par => {
        this.email = par['email']
        this.cpfAluno = par['cpf']
        this.cpfUsuario = par['cpfUsuario'],
          this.turma = par[`turma`]
        AlunoPage.NOME = par['nomeAluno'],
          this.router.navigate([`/tabs-home/comunicados`])
      }
    )
    this.platform.backButton.subscribe(() => {
    });
    this.getNumerosComunicados()

  }

  ngOnInit() {

  }

  goAlunos() {
    this.router.navigate([`/alunof`])
  }

  goComunicados() {
    this.router.navigate([`/comunicados`])
  }
  options: InAppBrowserOptions = {
    location: 'yes',//Or 'no' 
    hidden: 'no', //Or  'yes'
    clearcache: 'yes',
    clearsessioncache: 'yes',
    zoom: 'yes',//Android only ,shows browser zoom controls 
    hardwareback: 'yes',
    mediaPlaybackRequiresUserAction: 'no',
    shouldPauseOnSuspend: 'no', //Android only 
    closebuttoncaption: 'Close', //iOS only
    disallowoverscroll: 'no', //iOS only 
    toolbar: 'yes', //iOS only 
    enableViewportScale: 'no', //iOS only 
    allowInlineMediaPlayback: 'no',//iOS only 
    presentationstyle: 'pagesheet',//iOS only 
    fullscreen: 'yes',//Windows only    
  }

  goCalendario() {
    this.alunoservice.getCalendario(Constants.nomeTurma)
      .subscribe((r: TableDataTurma) => {
        let turma = [...r]
        let target = "_system";
        this.iab.create(turma[0].calendario, target, this.options);
      })
  }

  getNumerosComunicados(): number {
    this.comunicadoService.getComunicadosNLidos(Constants.CPFUSUARIO)
      .subscribe((res: any[]) => {
        this.globals.ncom = res.length
      })

    return this.ncomunicados
  }
  
  getComunicadosN() {
    return this.globals.ncom
  }

}
