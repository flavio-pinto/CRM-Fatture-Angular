import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { UtentiPage } from './pages/utenti.page';

const routes: Routes = [
  {
    canActivate:[AuthGuard],
    path: 'utenti',
    component: UtentiPage
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
