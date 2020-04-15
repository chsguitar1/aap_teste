import { TableDataComunicadoResponsavel } from './../comunicados/comunicado.service';
import { Constants } from './../comunicados/constants';
import { Platform } from '@ionic/angular';
import { AlunoService, TableDataAluno, _Aluno } from './aluno.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { FCM } from '@ionic-native/fcm/ngx';
import { Subscription, pipe } from 'rxjs';
import { ComunicadoService, TableDataComunicado } from '../comunicados/comunicado.service';
import { EventosService, TableDataEvento } from '../eventos/eventos.service';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-aluno',
  templateUrl: './aluno.page.html',
  styleUrls: ['./aluno.page.scss'],
})
export class AlunoPage {

  email: string
  public alunos: TableDataAluno
  usuario: any
  foto: string = 'assets/img/no-photo.png'
  pushes: any = [];
  public static EMAIL = ''
  public static NOME = ''
  constructor(
    private route: ActivatedRoute,
    private alunoService: AlunoService,
    private router: Router,
    private storage: Storage,
    public plt: Platform,
    private fcm: FCM,
    public platform: Platform,
    private comunicadoService: ComunicadoService,
    private eventoService: EventosService,

  ) {
    this.email = AlunoPage.EMAIL
    this.platform.backButton.subscribeWithPriority(601, async () => {

    })
    this.platform.backButton.subscribe(() => {

    });

    this.storage.remove('turma')
    this.storage.remove('nomeAluno')
    this.storage.remove('foto')
    storage.set('email', this.email)

    this.alunoService.getUsuario(this.email)
      .subscribe(result => {
        this.usuario = result[0]
        Constants.CPFUSUARIO = this.usuario.cpf
        this.alunoService.getAlunoApp(this.usuario.cpf)
          .subscribe(resp => {
            this.alunos = resp


            this.fcm.getToken().then(token => {

              this.alunoService.inserirToken(this.usuario.cpf, token)
            })

          })
      })

    this.fcm.onNotification().subscribe(data => {
      if (data.wasTapped) {
        console.log(data.alunos, data.email);
        this.router.navigate([''])
      }
    });

  }


  goHome(cpf: string, turma: string, nome: string, foto: string, nometurma: string) {

    AlunoPage.NOME = nome
    Constants.NOME = nome
    if (foto === 'sem') {
      foto = 'assets/img/no-photo.png'
    }
    Constants.foto = foto
    Constants.turma = turma
    Constants.nomeTurma = nometurma
    Constants.CPFALUNO = cpf

    this.storage.set('turma', turma)
    this.storage.set('nomeAluno', nome)
    this.storage.set('foto', foto),
      this.storage.set('cpfAluno', cpf)
    this.storage.set('caminho_foto', `${this.usuario.cpf}/${cpf}`)
    this.storage.set('cpfusuario', this.usuario.cpf)
    this.alunos = []
    this.router.navigate([`/tabs-home`],
      {
        queryParams: {
          turma: turma,
          email: this.email,
          cpfAluno: cpf,
          cpfUsuaro: this.usuario.cpf,
          nomeAluno: AlunoPage.NOME,
        }
      })
    this.getComunicados()
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
                  if (n.comunica.replace(/\s/g, '') === r.titulo.replace(/\s/g, '') + Constants.CPFUSUARIO) {
                    result[posicao].checked = true
                  }
                })
              })
              Constants.comunicados = [...result]
            })
        }
      })
  }

  getEventos() {
    this.eventoService.getEventosE(Constants.turma).pipe(
      map(c => c.filter(com => com.status === 'Ativo')))
      .subscribe((data: TableDataEvento) => {
        Constants.eventos = [...data]
      })

  }

}
