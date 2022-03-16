import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { ClientiPage } from './pages/clienti.page';
import { FatturaFormPage } from './pages/fattura-form.page';
import { FattureClientePage } from './pages/fatture-cliente.page';
import { FatturePage } from './pages/fatture.page';
import { ModificaClientePage } from './pages/modifica-cliente.page';
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
  },
  {
    canActivate:[AuthGuard],
    path: 'clienti/:id/modifica',
    component: ModificaClientePage
  },
  {
    canActivate:[AuthGuard],
    path: 'clienti/:id/fatture',
    component: FattureClientePage
  },
  {
    canActivate:[AuthGuard],
    path: 'clienti/:id/fatture/genera-fattura',
    component: FatturaFormPage
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
