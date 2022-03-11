import { Component, OnInit } from '@angular/core';
import { Cliente } from '../models/cliente';
import { ClientiService } from '../services/clienti.service';

@Component({
  template: `
    <table class="table">
      <thead>
        <tr>
          <th scope="col">id</th>
          <th scope="col">Ragione Sociale</th>
          <th scope="col">Email</th>
          <th scope="col">Partita Iva</th>
          <th scope="col"><button type="button" class="btn btn-success">Nuova</button></th>
          <th scope="col"></th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let cliente of response.content">
          <td>{{cliente.id}}</td>
          <td>{{cliente.ragioneSociale}}</td>
          <td>{{cliente.email}}</td>
          <td>{{cliente.partitaIva}}</td>
          <td><button type="button" class="btn btn-info">Fatture</button></td>
          <td><button type="button" class="btn btn-warning">Modifica</button></td>
          <td><button type="button" class="btn btn-danger">Elimina</button></td>
        </tr>
      </tbody>
  </table>

  <nav aria-label="Page navigation example">
    <ul class="pagination">
      <li *ngIf="!response.first; else elsePrevious" class="page-item" (click)="goToPage(response.number - 1)"><a class="page-link">Previous</a></li>
      <li *ngFor="let page of pages" class="page-item" (click)="goToPage(page)"><a [ngClass]="{'active-pagination' : page == response.number}" class="page-link">{{page + 1}}</a></li>
      <li *ngIf="!response.last; else elseNext" class="page-item" (click)="goToPage(response.number + 1)"><a class="page-link">Next</a></li>
      <ng-template #elsePrevious><li class="page-item"><a class="page-link">Previous</a></li></ng-template>
      <ng-template #elseNext><li class="page-item"><a class="page-link">Previous</a></li></ng-template>
    </ul>
  </nav>
  `,
  styles: [`
    .active-pagination {
      background-color: lightgray;
    }

    .pagination li {
      cursor: pointer;
    }
  `]
})
export class ClientiPage implements OnInit {
  response!: any;
  pages: number[] = [];

  constructor(private clientiSrv: ClientiService) { }

  ngOnInit(): void {
    this.clientiSrv.getClienti(0).subscribe(res => {
      this.response = res;
      this.pages = Array(this.response.totalPages).fill(0).map((x, i) => i)
    })
  }

  goToPage(page: number) {
    this.response.content.length = 0;
    this.clientiSrv.getClienti(page).subscribe(res => {
      this.response = res;
    })
  }

}
