import { Constants } from './constants';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Comunicado } from '../model/comunicado-model';

export interface _Comunicado {
  data: string,
  status: string,
  data_cadastro: string,
  colaborador: string,
  texto: string,
  titulo: string,
  checked?: boolean,
  tipoComunicado:string
 
}
export interface TableDataComunicado extends Array<_Comunicado> { }
export interface _ComUnicadosResponsavel{
 alunoCpf: string,
 comunica: string,
 status: string
}
export interface TableDataComunicadoResponsavel extends Array<_ComUnicadosResponsavel> { }
@Injectable({
  providedIn: 'root'
})
export class ComunicadoService {
  public nComunicados: number;
  
  constructor(private db: AngularFireDatabase) { }

  getComunicados(turma: string): Observable<any> {
    console.log('turmaservice' + turma)
    const todasTurmas: AngularFireList<any> = this.db.list(`comunicadosturma/${turma}`,ref => ref.orderByChild('dataOrder'))
    let comunicados: Observable<any[]> = todasTurmas
      .snapshotChanges().pipe(
        map(result => {
          return result.map(c => ({
            key: c.payload.key, ...c.payload.val()
          })
          ).sort((a, b) => a.dataOrder - b.dataOrder ).reverse()
        }))
    return comunicados
  }

  private getNumberComunicados(cpf): Observable<any> {
    return this.db.list<Observable<any>>(`comunicadosResponsavel/${cpf}/${Constants.CPFALUNO}`, ref => ref.orderByChild('status').equalTo('NV')).snapshotChanges()
  }

  getComunicadosNLidos(cpf) {
    return this.getNumberComunicados(cpf)
      .pipe(map(c => {
        c.filter(com => com.status === 'NV')
        return c.map(d => ({
          key: d.payload.key, ...d.payload.val()
        }))
      }))
  }

  getComunicadosTodos() {
    return this.db.list(`comunicadosturma/Todas`, ref => ref.orderByKey()).valueChanges()
  }

  getComunicadosE(turma): Observable<any> {
    console.log(turma)
    const todasTurmas: AngularFireList<any> = this.db.list(`comunicadosturma/${turma}`)
    let comunicados: Observable<any[]> = todasTurmas
      .snapshotChanges().pipe(
        map(result => {
          return result.map(c => ({
            key: c.payload.key, ...c.payload.val()
          })
          ).sort((a, b) => b.data - a.data )
        }))
    return comunicados
  }

  setComunicadoLido(item: any) {
  this.getComunicadosNLidos(Constants.CPFUSUARIO)
  .subscribe((res: any[])=>{
    res.forEach(e => {
      if(e.comunica.replace(/\s/g, '') === item.titulo.replace(/\s/g, '')+Constants.CPFUSUARIO){
        this.db.object(`comunicadosResponsavel/${Constants.CPFUSUARIO}/${Constants.CPFALUNO}/${e.key}`).update({status: 'YN'})
      }
    });
  })
  }

}
