import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { ClientiPage } from './pages/clienti.page';
import { FatturaFormPage } from './pages/fattura-form.page';
import { FattureClientePage } from './pages/fatture-cliente.page';
import { FatturePage } from './pages/fatture.page';
import { ModificaClientePage } from './pages/modifica-cliente.page';
import { ModificaFatturaPage } from './pages/modifica-fattura.page';
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
    component: NuovoClientePage,
    data: {
      role: 'ROLE_ADMIN'
    }
  },
  {
    canActivate:[AuthGuard],
    path: 'clienti/:id/modifica',
    component: ModificaClientePage,
    data: {
      role: 'ROLE_ADMIN'
    }
  },
  {
    canActivate:[AuthGuard],
    path: 'clienti/:id/fatture',
    component: FattureClientePage
  },
  {
    canActivate:[AuthGuard],
    path: 'clienti/:id/fatture/genera-fattura',
    component: FatturaFormPage,
    data: {
      role: 'ROLE_ADMIN'
    }
  },
  {
    canActivate:[AuthGuard],
    path: 'fatture/:id/modifica',
    component: ModificaFatturaPage,
    data: {
      role: 'ROLE_ADMIN'
    }
  },
  {
    path: '',
    redirectTo: 'clienti',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
