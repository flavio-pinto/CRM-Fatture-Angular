import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { NavbarComponent } from './components/navbar.component';
import { UtentiPage } from './pages/utenti.page';
import { ClientiPage } from './pages/clienti.page';
import { FatturePage } from './pages/fatture.page';
import { NuovoClientePage } from './pages/nuovo-cliente.page';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModificaClientePage } from './pages/modifica-cliente.page';
import { FattureClientePage } from './pages/fatture-cliente.page';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    UtentiPage,
    ClientiPage,
    FatturePage,
    NuovoClientePage,
    ModificaClientePage,
    FattureClientePage
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
