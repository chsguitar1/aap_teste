import { BackButtonTabsModule } from 'ion-back-button-tabs';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AlmocoPage } from './almoco.page';
import { CUSTOM_ELEMENTS_SCHEMA } from 'node_modules/@angular/core';

const routes: Routes = [
  {
    path: '',
    component: AlmocoPage
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
  declarations: [AlmocoPage],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AlmocoPageModule {}
