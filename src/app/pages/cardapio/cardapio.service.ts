import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { Cardapios } from './cardapio-model';
import { map } from 'rxjs/operators';

export interface TableDataCardapio extends Array<Cardapios> { }


@Injectable({
  providedIn: 'root'
})
export class CardapioService {

  constructor(public db: AngularFireDatabase) { }

  getCardapioAlmoco(): Observable<any> {
    return this.getCardapios('Almoço')
      .pipe(map(c =>{ 
        c.filter(com => com.tipoCardapio === 'Almoço' && com.status === 'Ativo')
        return c.map(d =>({
          key: d.payload.key, ...d.payload.val()
        }))
      }))
     
  }
  getCardapioLanche(turma, dia): Observable<any> {
    return this.getCardapios('Lanche')
      .pipe(map(c =>{ 
        c.filter(com => com.tipoCardapio === 'Lanche' && com.status === 'Ativo' && com.turmas !== '' )
        return c.map(d =>({
          key: d.payload.key, ...d.payload.val()
        }))
      }))
     
  }
 private  getCardapios(tipo): Observable<any> {
    return this.db.list(`cardapios`,ref => ref.orderByChild('tipoCardapio').equalTo(tipo)).snapshotChanges()
  }
 
}
