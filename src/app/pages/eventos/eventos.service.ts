import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Constants } from '../comunicados/constants';

export interface _Evento {
  nome: string,
  data: string,
  status: string,
  texto: string,
  midias: _Media[],
  turmas: Array<string>,
  ano: string,
  hora: string,

}
export interface _Media {
  downloadURL: string,
  path: string

}
export interface TableDataEvento extends Array<_Evento> { }
export interface TableDataMedia extends Array<_Media> { }
@Injectable({
  providedIn: 'root'
})
export class EventosService {

  constructor(private db: AngularFireDatabase) { }

  getEventos(): Observable<any> {
    return this.db.list<_Evento>(`eventos`).valueChanges()
  }

  getEventosId(key: string): Observable<any> {
    return this.db.list<_Evento>(`eventos/${key}`).valueChanges()
  }

  getEventosI(): Observable<any> {
    const todasTurmas: AngularFireList<any> = this.db.list(`eventos/`)
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

  getEventosE(turma): Observable<any> {
    let nometurma = turma.replace(/\s/g, '')
    const todasTurmas: AngularFireList<any> = this.db.list(`eventosturma/${nometurma}`, ref => ref.orderByChild('dataOrder'))
    let eventos: Observable<any[]> = todasTurmas
      .snapshotChanges().pipe(
        map(result => {
          return result.map(c => ({
            key: c.payload.key, ...c.payload.val()
          })
          ).reverse()
        }))
    return eventos
  }

  getEventosKey(key: string): Observable<any> {
    const todasTurmas: AngularFireList<any> = this.db.list(`eventos/${key}`)
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
  
  getMedias(id: string): Observable<any> {
    const todasTurmas: AngularFireList<any> = this.db.list(`eventosturma/${Constants.turma}/${id}/midias/`)
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
}

