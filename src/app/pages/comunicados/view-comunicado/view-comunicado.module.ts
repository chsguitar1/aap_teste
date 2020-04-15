import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ViewComunicadoPage } from './view-comunicado.page';
import { BackButtonTabsModule } from 'ion-back-button-tabs';

const routes: Routes = [
  {
    path: '',
    component: ViewComunicadoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    BackButtonTabsModule
  ],
  declarations: [ViewComunicadoPage],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class ViewComunicadoPageModule {}
