import { BackButtonTabsModule } from 'ion-back-button-tabs';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { LanchePage } from './lanche.page';
import { DatePickerModule } from 'ionic4-date-picker';

const routes: Routes = [
  {
    path: '',
    component: LanchePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    BackButtonTabsModule,
    DatePickerModule
  ],
  declarations: [LanchePage],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class LanchePageModule {}
