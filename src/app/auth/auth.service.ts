import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, throwError } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { environment } from "src/environments/environment";

export interface SignupData {
  username: string,
  email: string,
  password: string,
  nome: string;
  cognome: string;
  role: [
    {
      id: number,
      roleName: 'user' | 'admin'
    }
  ]
}
export interface AuthData {
  accessToken: string;
  user: {
    id: number,
    username: string,
    email: string,
    nome: string,
    cognome: string,
    roles: {
      id: number,
      roleName: string
    }
  };
}

@Injectable({
  providedIn: "root",
})
export class AuthService {
  baseURL = environment.apiBaseUrl;
  private authSubject = new BehaviorSubject<null|AuthData>(null);
  user$ = this.authSubject.asObservable();
  isLoggedIn$ = this.user$.pipe(map(user=>!!user));
  tipoUtente: string | undefined;

  constructor(private http: HttpClient, private router:Router) {
    this.restoreUser()
  }

  login(data: { username: string; password: string }) {
    return this.http.post<AuthData>(`${this.baseURL}/api/auth/login/`, data).pipe(
      tap((data) => {
        this.authSubject.next(data);
        localStorage.setItem('user', JSON.stringify(data))
      }),
      catchError(this.errors)
    );
  }

  restoreUser(){
    const userJson = localStorage.getItem('user')
    if (!userJson) {
      return
    }
    const user:AuthData = JSON.parse(userJson)
    this.authSubject.next(user)
  }

  signup(data: SignupData) {
    return this.http.post(`${this.baseURL}/api/auth/signup`, data).pipe(catchError(this.errors));
  }

  logout(){
    this.authSubject.next(null)
    this.router.navigate(["/login"])
    localStorage.removeItem('user')
  }

  getRole() { //alcuni utenti per qualche motivo hanno il doppio ruolo
    const userJson = localStorage.getItem('user');
    if(!userJson) {
      return
    }
    const user = JSON.parse(userJson);
    if(user.roles.find((el: any) => el == 'ROLE_ADMIN')) {
      this.tipoUtente = 'ROLE_ADMIN';
    } else {
      this.tipoUtente =  'ROLE_USER';
    }

    return this.tipoUtente;
  }

  private errors(err: any) {
    console.log(err);

    switch (err.error.message) {
      case "Error: Username is already taken!":
        return throwError("Attenzione: Questo username esiste già!");
        break;
      case "Error: Email is already in use!":
        return throwError("Attenzione: Questa email esiste già!");
        break;
      case "Unauthorized":
        return throwError("Attenzione: utente inesistente o password errata");
        break;
      default:
        return throwError("Attenzione: errore nella chiamata");
        break;
    }
  }
}
