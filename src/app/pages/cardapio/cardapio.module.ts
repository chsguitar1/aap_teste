
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CardapioPage } from './cardapio.page';
import { BackButtonTabsModule } from 'node_modules/ion-back-button-tabs';

const routes: Routes = [
  {
    path: '',
    component: CardapioPage
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
  declarations: [CardapioPage]
})
export class CardapioPageModule {}
