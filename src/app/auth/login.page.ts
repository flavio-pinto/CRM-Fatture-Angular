import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "./auth.service";

@Component({
  template: `
    <div class="container mt-5 text-center p-5">
      <div class="row">
        <div class="col">
          <div *ngIf="errorMessage" class="alert alert-danger" role="alert">
            {{errorMessage}}
          </div>
          <form [formGroup]="form" (ngSubmit)="onSubmit(form)">
            <div class="form-group mb-4">
              <label for="username" class="mb-2">Username</label>
              <input type="text" formControlName="username" id="username" class="form-control">
              <span *ngIf="!form.controls['username'].valid && form.controls['username']?.touched" class="text-danger">
                <ng-container *ngIf="getErrorController('username', 'required')">Devi inserire un username!</ng-container>
              </span>
            </div>
            <div class="form-group mb-4">
              <label for="password" class="mb-2">Password</label>
              <input type="password" formControlName="password" id="password" class="form-control">
              <span *ngIf="!form.controls['password'].valid && form.controls['password']?.touched" class="text-danger">
                <ng-container *ngIf="getErrorController('password', 'required')" class="text-danger">Devi inserire una password!</ng-container>
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
  }`],
})
export class LoginPage implements OnInit {
  form!: FormGroup;
  errorMessage = undefined
  constructor(private authSrv: AuthService, private router: Router, private fb: FormBuilder) {}

  ngOnInit(): void {

    this.form = this.fb.group({
      username: this.fb.control(null, Validators.required),
      password: this.fb.control(null, Validators.required)
    })
  }

  async onSubmit(form: FormGroup){
    try {
      await this.authSrv.login(form.value).toPromise()

      form.reset()
      this.errorMessage=undefined
      this.router.navigate(['/utenti'])
    } catch (error:any) {
      this.errorMessage = error
      console.error(error)
    }
  }

  getErrorController(name: string, error: string) {
    return this.form.get(name)?.errors![error];
  }
}
