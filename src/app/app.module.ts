import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { NavbarComponent } from './components/navbar.component';
import { UtentiPage } from './pages/utenti.page';
import { ClientiPage } from './pages/clienti.page';
import { FatturePage } from './pages/fatture.page';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    UtentiPage,
    ClientiPage,
    FatturePage
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
