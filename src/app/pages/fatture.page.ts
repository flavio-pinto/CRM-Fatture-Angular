import { Component, OnInit } from '@angular/core';
import { FattureService } from '../services/fatture.service';

@Component({
  template: `
    <table class="table">
      <thead>
        <tr>
          <th scope="col">id</th>
          <th scope="col">Data</th>
          <th scope="col">Numero</th>
          <th scope="col">Anno</th>
          <th scope="col">Importo</th>
          <th scope="col">Stato</th>
          <th scope="col">Cliente</th>
          <th scope="col"></th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let fattura of response.content">
          <td>{{fattura.id}}</td>
          <td>{{fattura.data}}</td>
          <td>{{fattura.numero}}</td>
          <td>{{fattura.anno}}</td>
          <td>{{fattura.importo}}</td>
          <td>{{fattura.stato.nome}}</td>
          <td>{{fattura.cliente.ragioneSociale}}</td>
          <td><button type="button" class="btn btn-warning">Modifica</button></td>
          <td><button type="button" class="btn btn-danger">Elimina</button></td>
        </tr>
      </tbody>
    </table>

    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li *ngIf="!response.first; else elsePrevious" class="page-item" (click)="goToPage(response.number - 1)"><a class="page-link">Previous</a></li>
        <!-- <li *ngFor="let page of pages" class="page-item" (click)="goToPage(page)"><a [ngClass]="{'active-pagination' : page == response.number}" class="page-link">{{page + 1}}</a></li> -->
        <ng-container *ngFor="let page of pages">
          <li *ngIf="page < response.number + 5 && page > response.number - 5" class="page-item" (click)="goToPage(page)"><a [ngClass]="{'active-pagination' : page == response.number}" class="page-link">{{page + 1}}</a></li>
        </ng-container>
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
export class FatturePage implements OnInit {
  response!: any;
  pages: number[] = [];
  paginationLimited: any;

  constructor(private fattSrv: FattureService) { }

  ngOnInit(): void {
    this.fattSrv.getAllFatture(0).subscribe(res => {
      this.response = res;
      this.pages = Array(this.response.totalPages).fill(0).map((x, i) => i)
    })
  }

  goToPage(page: number) {
    this.response.content.length = 0;
    this.fattSrv.getAllFatture(page).subscribe(res => {
      this.response = res;
    })
  }
}
