import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private db: AngularFireDatabase,
   ) { }

  async resetPassword(email: string) {
    try {
      await firebase.auth().sendPasswordResetEmail(email);
    
    }
    catch (error) {
      
    }
  }
}
