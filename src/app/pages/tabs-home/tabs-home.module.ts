import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TabsHomePage } from './tabs-home.page';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

const routes: Routes = [
  {
    path: '',
    component: TabsHomePage,
    children: [
      {
        path: 'comunicados',
        children:
          [
            {
              path: '',
              loadChildren: '../comunicados/comunicados.module#ComunicadosPageModule'
            }
          ]
      },
      {
        path: 'cardapio',
        children:
          [
            {
              path: '',
              loadChildren: '../cardapio/cardapio.module#CardapioPageModule'
            }
          ]
      },
      {
        path: 'eventos',
        children:
          [
            {
              path: '',
              loadChildren: '../eventos/eventos.module#EventosPageModule'
            }
          ]
      },
      {
        path: '',
        redirectTo: 'comunicados',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: 'comunicados',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),

  ],
  declarations: [TabsHomePage],
  providers: [
    InAppBrowser,
  ]
})
export class TabsHomePageModule { }
