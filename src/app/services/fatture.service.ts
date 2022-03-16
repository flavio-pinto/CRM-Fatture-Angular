import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FattureService {

  constructor(private http: HttpClient) { }

  getAllFatture(page: number) {
    return this.http.get<any>(`${environment.apiBaseUrl}/api/fatture?page=${page}&sort=id,ASC`);
  }

  getFattureByCliente(id: number, page: number) {
    return this.http.get<any>(`${environment.apiBaseUrl}/api/fatture/cliente/${id}?page=${page}&sort=id,ASC`);
  }
}
