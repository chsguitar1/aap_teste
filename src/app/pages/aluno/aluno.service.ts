
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';
import { Storage } from '@ionic/storage';
import { AngularFireAuth } from '@angular/fire/auth';
import { Usuario } from '../model/usuario-model';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize, map } from 'rxjs/operators';
export interface _Aluno {
  nome: string,
  cpf: string,
  turma: string,
}

export interface _Turma{
  nome: string,
  calendario: string
}

export interface TableDataAluno extends Array<_Aluno> { }
export interface TableDataTurma extends Array<_Turma> { }
@Injectable({
  providedIn: 'root'
})
export class AlunoService {
  constructor(
    private db: AngularFireDatabase,
    public afAuth: AngularFireAuth,
    private storage: Storage,
    private st: AngularFireStorage
  ) { }

  getUsuario(email: string): Observable<any> {
    return this.db.list<Usuario>('usuarios', ref => ref.orderByChild('email').equalTo(email)).valueChanges()
  }

  getResponsavelLogin(email: string): Observable<any> {
    return this.db.list('responsaveislogin', ref => ref.orderByChild('email').equalTo(email)).valueChanges()
  }

  getResponsavelLoginApp(cpf: string) {
    return this.db.object(`responsaveislogin/${cpf}`).valueChanges()
  }

  getAlunoApp(cpf): Observable<any> {
    console.log(cpf)
    const todasTurmas: AngularFireList<any> = this.db.list(`applogin/${cpf}`)
    let eventos: Observable<any[]> = todasTurmas
      .snapshotChanges().pipe(
        map(result => {
          return result.map(c => ({
            key: c.payload.key, ...c.payload.val()
          })
          )
        }))
    return eventos
  }

  getAluno(cpf: string) {
    return this.db.object(`alunoslogin/${cpf}`).valueChanges()
  }

  getCalendario(nometurma: string) :Observable<any> {
 
    const turma: AngularFireList<any> = this.db.list(`turma`,ref => ref.orderByChild('nome').equalTo(nometurma))
    let _turma: Observable<any[]> = turma
      .snapshotChanges().pipe(
        map(result => {
          return result.map(c => ({
            key: c.payload.key, ...c.payload.val()
          })
          )
        }))
   
    return _turma
  }

  pushUpload(upload: string): any {
   
    let idimagem = this.afAuth.auth.currentUser.uid + '-' + new Date().getTime();
    let storageRef = firebase.storage().ref()
    let imageRef = storageRef.child(`aluno/${idimagem}.jpg`);
    imageRef.putString(upload, 'data_url').then(res => {
      res.ref.getDownloadURL().then(r => {
        this.insereFoto(r);
      })

    });
  }

  insereFoto(url: string) {

    this.storage.get('caminho_foto').then((foto) => {
      console.log('cpf foto' + foto);
      this.db.object(`applogin/${foto}`).update({
        'foto': url
      })

    })

  }

  inserirToken(cpf: string, token) {
    this.db.object(`resptoken/${cpf}`)
    .set({
      'token': token
    })
  }
}
