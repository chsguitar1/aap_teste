import { Component, Input } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';

@Component({
    templateUrl: 'modal.html',
   
    selector: 'modal-page',
})
export class ModalPage {

constructor(private modalController: ModalController){

}
 async closeModal(mes : string) {
    const onClosedData: string = mes;
    await this.modalController.dismiss(onClosedData);
  }  

}