import { Platform } from '@ionic/angular';

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { FCM } from '@ionic-native/fcm/ngx';
import { Subscription } from 'rxjs';
import { TableDataAluno, AlunoService } from '../aluno.service';
import { AlunoPage } from '../aluno.page';
import { ComunicadosPage } from '../../comunicados/comunicados.page';
import { Constants, NUMCOMUNICADOS } from '../../comunicados/constants';
import { ComunicadoService, TableDataComunicado, TableDataComunicadoResponsavel } from '../../comunicados/comunicado.service';
import { EventosService, TableDataEvento } from '../../eventos/eventos.service';
import { map } from 'rxjs/operators';
import { Globals } from '../../globals';


@Component({
  selector: 'app-alunof',
  templateUrl: './alunof.page.html',
  styleUrls: ['./alunof.page.scss'],
})
export class AlunofPage implements OnInit {
 

  email: string
  public alunos: TableDataAluno
  usuario: any
  foto: string = 'assets/img/no-photo.png'
  pushes: any = [];
  // listaaluno : Subscription;
  public static EMAIL = ''
  globals : Globals
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
    globals : Globals
    
  ) {
    this.globals = globals
    this.email = AlunoPage.EMAIL
    this.platform.backButton.subscribeWithPriority(601, async () => {

    })
    this.platform.backButton.subscribe(() => {

    });



    console.log('emailaluno' + AlunoPage.EMAIL)
    // this.plt.ready()
    // .then(() => {


    // })

    this.storage.remove('turma')
    this.storage.remove('nomeAluno')
    this.storage.remove('foto')


    storage.set('email', this.email)

    this.alunoService.getUsuario(this.email)
      .subscribe(result => {
        this.usuario = result[0]

        //    if (this.usuario.tipo == 'responsavel') {
        let responsavel

        this.alunoService.getResponsavelLoginApp(this.usuario.cpf)
          .subscribe(resp => {
            this.alunoService.getAlunoApp(this.usuario.cpf)
              .subscribe(resp => {
                this.alunos = resp
          console.log('sub'+this.alunos)
               

                this.fcm.getToken().then(token => {

                  this.alunoService.inserirToken(this.usuario.cpf, token)
                })

              })
            //  }
          })
        // })

      })
    //  }


    // this.fcm.onNotification().subscribe(data => {
    //   if (data.wasTapped) {
    //     console.log("Received in background");
    //     this.router.navigate([''])
    //   } else {
    //     console.log("Received in foreground");
    //   };
    // });

    // this.fcm.onTokenRefresh().subscribe(token => {
    // this.storage.set('token',token)

    // });

  }
  // ngOnDestroy(): void {
  //  this.listaaluno.unsubscribe()
  // }

  ngOnInit() {
    //this.alunos = null

  }

  // getToken() {
  //   this.fcm.getToken().then(token => {
  //     // Register your new token in your back-end if you want
  //     // backend.registerToken(token);
  //     console.log('token = '+token);
  //   });
  // }

  unsubscribeFromTopic() {
    this.fcm.unsubscribeFromTopic('enappd');
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
    this.getEventos()
    this.getNumerosComunicados()

  }
  getNumerosComunicados() : number {
    this.comunicadoService.getComunicadosNLidos(Constants.CPFUSUARIO)
      .subscribe((res: any[]) => {
      
      this.globals.ncom = res.length
    //    NUMCOMUNICADOS = this.ncomunicados
        console.log('numerocom '+ NUMCOMUNICADOS)
        
      })
      return this.globals.ncom
      
  }
  // goHome(cpf: string, turma: string, nome: string, foto: string) {
  //   console.log('foto' + foto + ' cpf ' + cpf + ' turma' + turma + ' nome ' + nome)
  //   AlunoPage.NOME = nome
  //   Constants.NOME = nome
    
  //   Constants.turma = turma
  //   if (foto === 'sem') {
  //     foto = 'assets/img/no-photo.png'
  //   }
  //   Constants.foto = foto
  //   Constants.CPFALUNO = cpf
  //   this.storage.set('turma', turma)
  //   this.storage.set('nomeAluno', AlunoPage.NOME)
  //   this.storage.set('foto', foto),
  //     this.storage.set('cpfAluno', cpf)
  //   this.storage.set('caminho_foto', `${this.usuario.cpf}/${cpf}`)

  //   this.alunos = []
  //   this.router.navigate([`/tabs-home/`],
  //     {
  //       queryParams: {
  //         turma: turma,
  //         email: this.email,
  //         cpfAluno: cpf,
  //         cpfUsuaro: this.usuario.cpf,

  //       }
  //     })
  //     this.getComunicados()
  //    this.getEventos()

  // }
  // getComunicados() {
  //   // this.nomeAluno = AlunoPage.NOME
   
     
  //     this.comunicadoService.getComunicados(Constants.turma).
  //     pipe( map(c => c.filter(com => com.status === 'publicar')))
  //       .subscribe((result: TableDataComunicado) => {
  //         console.log('resultado' + result.length)
  //         Constants.comunicados = [...result]
  //       })

  //     // this.comunicadoService.getComunicadosTodos()
  //     //   .subscribe(result => {
  //     //     console.log('todos'+result)
  //     //     const comunicados: TableDataComunicado = result as TableDataComunicado
  //     //     comunicados.forEach(element => {
  //     //       this.comunicados.push(element)
  //     //     })
  //     //     this.comunicados = this.comunicados.reverse()
  //     //   })

  //     console.log('comunicados' + Constants.comunicados)
    
  // }

  getComunicados() {

    this.comunicadoService.getComunicados(Constants.turma).
      pipe(map(c => c.filter(com => com.status === 'publicar')))
      .subscribe((result: TableDataComunicado) => {
        console.log('resultado' + result.length)
        if (result === null || result === undefined) {
          Constants.comunicados = []
        } else {
          let naoLidos: TableDataComunicadoResponsavel
          this.comunicadoService.getComunicadosNLidos(Constants.CPFUSUARIO)
            .subscribe((res: TableDataComunicadoResponsavel) => {
              console.log('nao lidos'+res)
              naoLidos = res
              result.forEach(r => {
                let posicao = result.indexOf(r)
                naoLidos.forEach(n => {
                  console.log('3 '+n.comunica+ ' '+r.titulo+Constants.CPFUSUARIO)
                  if (n.comunica.replace(/\s/g, '') === r.titulo.replace(/\s/g, '') + Constants.CPFUSUARIO) {
                    result[posicao].checked = true
                  }
                })
              })
              Constants.comunicados = [...result]
            })

          
        }
      })

    console.log('comunicados' + Constants.comunicados)

  }
  getEventos() {
    console.log('alunos p' + this.alunos)
    
      this.eventoService.getEventosE(Constants.turma).pipe(
        map(c => c.filter(com => com.status === 'Ativo')))
        .subscribe((data: TableDataEvento) => {
          Constants.eventos = [...data]
          console.log('evedntos' + Constants.eventos)
        })

   
  }

}
