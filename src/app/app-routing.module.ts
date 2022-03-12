import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { ClientiPage } from './pages/clienti.page';
import { FatturePage } from './pages/fatture.page';
import { NuovoClientePage } from './pages/nuovo-cliente.page';
import { UtentiPage } from './pages/utenti.page';

const routes: Routes = [
  {
    canActivate:[AuthGuard],
    path: 'utenti',
    component: UtentiPage
  },
  {
    canActivate:[AuthGuard],
    path: 'clienti',
    component: ClientiPage
  },
  {
    canActivate:[AuthGuard],
    path: 'fatture',
    component: FatturePage
  },
  {
    canActivate:[AuthGuard],
    path: 'nuovo-cliente',
    component: NuovoClientePage
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
