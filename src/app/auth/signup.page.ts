import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "./auth.service";

@Component({
  template: `
  <div class="container text-center p-5 mt-5 rounded">
    <div class="row justify-content-center">
        <div *ngIf="errorMessage" class="alert alert-danger" role="alert">
          {{errorMessage}}
        </div>
        <form #form="ngForm" (ngSubmit)="onsubmit(form)">
          <div class="form-group mb-2">
            <label for="name">Nome</label>
            <input ngModel name="name" class="form-control" type="text" id="name" />
          </div>
          <div class="form-group mb-2">
            <label for="cognome">Cognome</label>
            <input ngModel name="surname" class="form-control" type="text" id="cognome" />
          </div>
          <div class="form-group mb-2">
            <label for="email">Email</label>
            <input ngModel name="email" class="form-control" type="email" id="email" />
          </div>
          <div class="form-group mb-2">
            <label for="pass">Password</label>
            <input ngModel name="password" class="form-control" type="password" id="pass" />
          </div>
          <div class="form-group mb-2">
            <h4>Tipo di impiego:</h4>
            <label for="amministrativo" class="me-1">Amministrativo</label>
            <input ngModel name="type" class="form-check-input me-3" type="radio" value="amministrativo" />
            <label for="contabile" class="me-1">Contabile</label>
            <input ngModel name="type" class="form-check-input me-3" type="radio" value="contabile" />
            <label for="commerciale" class="me-1">Commerciale</label>
            <input ngModel name="type" class="form-check-input me-3" type="radio" value="commerciale" />
          </div>
          <button class="btn btn-primary mt-3 mb-3" [disabled]="isLoading" type="submit">
            Registrati
            <span *ngIf="isLoading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
          </button>
        </form>
        <p>Sei già registrato? <a [routerLink]="['/login']">Accedi</a></p>
      </div>
    </div>
  `,
  styles: [`
  .container {
    border: 1px solid black;
    width: 30em;
  }
  `],
})
export class SignupPage implements OnInit {
  isLoading = false;
  errorMessage = undefined
  constructor(private authSrv: AuthService, private router:Router) {}

  ngOnInit(): void {}

  async onsubmit(form: NgForm) {
    this.isLoading = true;
    try {
      await this.authSrv.signup(form.value).toPromise();
      form.reset();
      this.isLoading = false;
      this.errorMessage = undefined
      this.router.navigate(['/login'])
    } catch (error:any) {
      this.isLoading = false;
      this.errorMessage = error
      console.error(error);
    }
  }
}
