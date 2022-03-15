import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ComuniService {

  apiComuniBaseURL = "https://comuni-ita.herokuapp.com/api";

  constructor(private http: HttpClient) { }

  getProvince() {
    return this.http.get<any>(`${environment.apiBaseUrl}/api/province`);
  }

  getComuni() {
    return this.http.get<any>(`${environment.apiBaseUrl}/api/comuni`);
  }

  getComuniById(id: number) {
    return this.http.get<any>(`${environment.apiBaseUrl}/api/comuni/${id}`);
  }
}
