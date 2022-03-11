import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { ClientiPage } from './pages/clienti.page';
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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
