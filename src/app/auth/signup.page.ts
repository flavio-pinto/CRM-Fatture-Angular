import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "./auth.service";

@Component({
  template: `
  <!-- <div class="container text-center p-5 mt-5 rounded">
    <div class="row justify-content-center">
        <div *ngIf="errorMessage" class="alert alert-danger" role="alert">
          {{errorMessage}}
        </div>
        <form #form="ngForm" (ngSubmit)="onSubmit(form)">
          <div class="form-group mb-2">
            <label for="username">Username</label>
            <input ngModel name="username" class="form-control" type="text" id="username" />
          </div>
          <div class="form-group mb-2">
            <label for="email">Email</label>
            <input ngModel name="email" class="form-control" type="email" id="email" />
          </div>
          <div class="form-group mb-2">
            <label for="pass">Password</label>
            <input ngModel name="password" class="form-control" type="password" id="password" />
          </div>
          <div class="form-group mb-2">
            <label for="name">Nome</label>
            <input ngModel name="name" class="form-control" type="text" id="name" />
          </div>
          <div class="form-group mb-2">
            <label for="cognome">Cognome</label>
            <input ngModel name="surname" class="form-control" type="text" id="cognome" />
          </div>
          <div class="form-group mb-2">
            <h4>Ruolo:</h4>
            <select ngModel class="form-control">
              <option value="ROLE_USER"></option>
              <option value="ROLE_ADMIN"></option>
            </select>
          </div>
          <button class="btn btn-primary mt-3 mb-3" [disabled]="isLoading" type="submit">
            Registrati
            <span *ngIf="isLoading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
          </button>
        </form>
        <p>Sei già registrato? <a [routerLink]="['/login']">Accedi</a></p>
      </div>
    </div> -->
    <div class="container mt-5 text-center p-5">
      <div class="row">
        <div class="col">
          <form [formGroup]="form" (ngSubmit)="onSubmit(form)">
            <div class="form-group mb-4">
              <label for="username" class="mb-2">Username</label>
              <input type="text" formControlName="username" id="username" class="form-control">
              <span *ngIf="!form.controls['username'].valid && form.controls['username']?.touched" class="text-danger">
                <ng-container *ngIf="getErrorController('username', 'required')">Devi inserire un username!</ng-container>
              </span>
            </div>
            <div class="form-group mb-4">
                <label for="email">Email</label>
                <input type="email" formControlName="email" id="email" class="form-control">
                <span *ngIf="!form.controls['email'].valid && form.controls['email']?.touched" class="text-danger">
                  <ng-container *ngIf="getErrorController('email', 'required')">Devi inserire una email!</ng-container>
                </span>
            </div>
            <div class="form-group mb-4">
              <label for="password" class="mb-2">Password</label>
              <input type="password" formControlName="password" id="password" class="form-control">
              <span *ngIf="!form.controls['password'].valid && form.controls['password']?.touched" class="text-danger">
                <ng-container *ngIf="getErrorController('password', 'required')" class="text-danger">Devi inserire una password!</ng-container>
              </span>
            </div>
            <div class="form-group mb-4">
              <label for="nome" class="mb-2">Nome</label>
              <input type="text" formControlName="nome" id="nome" class="form-control">
              <span *ngIf="!form.controls['nome'].valid && form.controls['nome']?.touched" class="text-danger">
                <ng-container *ngIf="getErrorController('nome', 'required')">Devi inserire un nome!</ng-container>
              </span>
            </div>
            <div class="form-group mb-4">
              <label for="cognome" class="mb-2">Cognome</label>
              <input type="text" formControlName="cognome" id="cognome" class="form-control">
              <span *ngIf="!form.controls['cognome'].valid && form.controls['cognome']?.touched" class="text-danger">
                <ng-container *ngIf="getErrorController('cognome', 'required')">Devi inserire un cognome!</ng-container>
              </span>
            </div>
            <div class="form-group mb-4">
              <label for="role" class="mb-2">Ruolo</label>
              <select formControlName="role" class="form-select" aria-label="Default select example">
                <option value="" selected>Seleziona un ruolo</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
              <span *ngIf="!form.controls['roleName'].valid && form.controls['roleName']?.touched" class="text-danger">
                <ng-container *ngIf="getErrorController('role', 'required')" class="text-danger">Devi selezionare un ruolo!</ng-container>
              </span>
            </div>
            <button type="submit" class="btn btn-primary">Invia</button>
          </form>
        </div>
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
  form!: FormGroup;
  isLoading = false;
  errorMessage = undefined
  constructor(private authSrv: AuthService, private router: Router, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      username: this.fb.control(null, Validators.required),
      password: this.fb.control(null, Validators.required),
      email: this.fb.control(null, [Validators.required, Validators.email]),
      nome: this.fb.control(null, Validators.required),
      cognome: this.fb.control(null, Validators.required),
      roleName: this.fb.control(null, Validators.required)
    })
  }

  async onSubmit(form: FormGroup) {
    console.log(form.value);

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

  getErrorController(name: string, error: string) {
    return this.form.get(name)?.errors![error];
  }
}
