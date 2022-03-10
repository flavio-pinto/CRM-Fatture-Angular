import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "./auth.service";

@Component({
  template: `
  <div class="container mt-5 text-center p-5">
    <div class="row justify-content-center">
      <div *ngIf="errorMessage" class="alert alert-danger" role="alert">
          {{errorMessage}}
        </div>
        <form class="mb-3" #form="ngForm" (ngSubmit)="onSubmit(form)" >
          <div class="form-group">
            <label for="username">Username</label>
            <input ngModel name="username" class="form-control" type="text" id="username" />
          </div>
          <div class="form-group">
            <label for="pass">Password</label>
            <input ngModel name="password" class="form-control" type="password" id="pass" />
          </div>
          <button  class="btn btn-primary mt-3" [disabled]="isLoading" type="submit">Accedi
          <span
              *ngIf="isLoading"
              class="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
          </button>
        </form>
        <p>Nuovo utente? <a [routerLink]="['/signup']">Registrati</a></p>
      </div>
    </div>
  `,
  styles: [`
  .container {
    border: 1px solid black;
    width: 30em;
  }`],
})
export class LoginPage implements OnInit {
  isLoading = false
  errorMessage = undefined
  constructor(private authSrv:AuthService,private router:Router) {}

  ngOnInit(): void {

  }

  async onSubmit(form:any){
    try {
      console.log(form.value);
      await this.authSrv.login(form.value).toPromise()


      form.reset()
      this.errorMessage=undefined
      this.router.navigate(['/utenti'])
    } catch (error:any) {
      this.errorMessage = error
      console.error(error)
    }
  }
}
