import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ComunicadosPage } from './comunicados.page';
import { CalendarModule } from 'ion2-calendar';
import { ModalPage } from './modal';


const routes: Routes = [
  {
    path: '',
    component: ComunicadosPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    CalendarModule,
  ],
  declarations: [ComunicadosPage,ModalPage],
  entryComponents: [ModalPage]
})
export class ComunicadosPageModule {}
