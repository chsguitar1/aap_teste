import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'home-results', loadChildren: './pages/home-results/home-results.module#HomeResultsPageModule' },
  { path: 'tabs-home', loadChildren: './pages/tabs-home/tabs-home.module#TabsHomePageModule' },
  { path: 'aluno', loadChildren: './pages/aluno/aluno.module#AlunoPageModule' },
  { path: 'view-comunicado', loadChildren: './pages/comunicados/view-comunicado/view-comunicado.module#ViewComunicadoPageModule' },
   { path: 'view-evento', loadChildren: './pages/eventos/view-evento/view-evento.module#ViewEventoPageModule' },
  { path: 'view-foto', loadChildren: './pages/eventos/view-foto/view-foto.module#ViewFotoPageModule' },
  { path: 'edit-aluno', loadChildren: './pages/aluno/edit-aluno/edit-aluno.module#EditAlunoPageModule' },
  { path: 'alunof', loadChildren: './pages/aluno/alunof/alunof.module#AlunofPageModule' },
  { path: 'cardapio', loadChildren: './pages/cardapio/cardapio.module#CardapioPageModule' },
  { path: 'almoco', loadChildren: './pages/cardapio/almoco/almoco.module#AlmocoPageModule' },
  { path: 'lanche', loadChildren: './pages/cardapio/lanche/lanche.module#LanchePageModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
