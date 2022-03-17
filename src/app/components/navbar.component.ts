import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-navbar',
  template: `
    <nav class="navbar navbar-expand navbar-light bg-light">
    <div class="container-fluid">
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarTogglerDemo01"
        aria-controls="navbarTogglerDemo01"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a
            class="nav-link active"
            aria-current="page"
              >CRM ANGULAR</a
            >
          </li>
          <li *ngIf="!isLoggedIn" class="nav-item">
            <a
              class="nav-link"
              [routerLink]="['/login']"
              routerLinkActive="active"
              [routerLinkActiveOptions]="{ exact: true }"
              >Login</a
            >
          </li>
          <li *ngIf="!isLoggedIn" class="nav-item">
            <a
              class="nav-link"
              [routerLink]="['/signup']"
              routerLinkActive="active"
              [routerLinkActiveOptions]="{ exact: true }"
              >Signup</a
            >
          </li>
          <li *ngIf="isLoggedIn" class="nav-item">
            <a
              class="nav-link"
              [routerLink]="['/utenti']"
              routerLinkActive="active"
              [routerLinkActiveOptions]="{ exact: true }"
              >Utenti</a
            >
          </li>
          <li *ngIf="isLoggedIn" class="nav-item">
            <a
              class="nav-link"
              [routerLink]="['/clienti']"
              routerLinkActive="active"
              [routerLinkActiveOptions]="{ exact: true }"
              >Clienti</a
            >
          </li>
          <li *ngIf="isLoggedIn" class="nav-item">
            <a
              class="nav-link"
              [routerLink]="['/fatture']"
              routerLinkActive="active"
              [routerLinkActiveOptions]="{ exact: true }"
              >Fatture</a
            >
          </li>
        </ul>
        <div *ngIf="isLoggedIn" class="ms-auto">
          <p class="d-inline username-welc-back">Bentornato <span class="fst-italic fw-bolder">{{welcomeUser}}</span></p>
          <button class="btn btn-danger mx-3" (click)="onLogout()">logout</button>
        </div>
      </div>
    </div>
  </nav>

  `,
  styles: [
  ]
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false;
  welcomeUser!: string | undefined;

  constructor(private authSrv: AuthService) { }

  ngOnInit(): void {
    this.authSrv.isLoggedIn$.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    })

    this.setWelcomeMessage();
  }

  onLogout() {
    this.authSrv.logout();
  }

  setWelcomeMessage() {
    const userJson = localStorage.getItem('user');
    if(!userJson) {
      return;
    }
    const user = JSON.parse(userJson);
    this.welcomeUser = user.username;
  }
}
