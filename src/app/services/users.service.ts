import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  baseURL = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  getAllUsers(page: number) {
    return this.http.get<any>((`${this.baseURL}/api/users/?page=${page}&size=20`));
  }
}
