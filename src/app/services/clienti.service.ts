import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientiService {

  constructor(private http: HttpClient) { }

  getClienti(page: number) {
    return this.http.get<any>(`${environment.apiBaseUrl}/api/clienti?page=${page}&sort=id,ASC`)
  }
}
