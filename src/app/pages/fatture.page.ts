import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
        <tr *ngFor="let fattura of response.content; let i = index">
          <td *ngIf="fattura.id; else nullContent">{{fattura.id}}</td>
          <td *ngIf="fattura.data; else nullContent">{{fattura.data}}</td>
          <td *ngIf="fattura.numero; else nullContent">{{fattura.numero}}</td>
          <td *ngIf="fattura.anno; else nullContent">{{fattura.anno}}</td>
          <td *ngIf="fattura.importo; else nullContent">{{fattura.importo | currency: 'EUR'}}</td>
          <td *ngIf="fattura.stato; else nullContent">{{fattura.stato.nome}}</td>
          <td *ngIf="fattura.cliente; else nullContent">{{fattura.cliente.ragioneSociale}}</td>
          <td><button type="button" (click)="modificaFattura(fattura.id)" class="btn btn-warning">Modifica</button></td>
          <td><button type="button" (click)="getIndexId(fattura.id, i)" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal">Elimina</button></td>
        </tr>
        <ng-template #nullContent><td>NON DISP.</td></ng-template>
      </tbody>
    </table>

    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li class="page-item" (click)="goToPage(0)"><a class="page-link"><--First</a></li>
        <li *ngIf="!response.first; else elsePrevious" class="page-item" (click)="goToPage(response.number - 1)"><a class="page-link">Previous</a></li>
        <ng-container *ngFor="let page of pages">
          <li *ngIf="page < response.number + 5 && page > response.number - 5" class="page-item" (click)="goToPage(page)"><a [ngClass]="{'active-pagination' : page == response.number}" class="page-link">{{page + 1}}</a></li>
        </ng-container>
        <li *ngIf="!response.last; else elseNext" class="page-item" (click)="goToPage(response.number + 1)"><a class="page-link">Next</a></li>
        <li class="page-item" (click)="goToPage(response.totalPages - 1)"><a class="page-link">Last--></a></li>
        <ng-template #elsePrevious><li class="page-item"><a class="page-link">Previous</a></li></ng-template>
        <ng-template #elseNext><li class="page-item"><a class="page-link">Next</a></li></ng-template>
      </ul>
    </nav>

    <!-- Modale -->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Sei sicuro di voler eliminare questa fattura?</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <p class="text-danger">L'operazione non è reversibile</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-danger" data-bs-dismiss="modal" (click)="eliminaFattura(fatturaCorrente[0], fatturaCorrente[1])">Elimina</button>
          </div>
        </div>
      </div>
    </div>
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
  fatturaCorrente: number[] = [-50, -50];

  constructor(private fattSrv: FattureService, private router: Router) { }

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

  modificaFattura(id: number) {
    this.router.navigate([`/fatture/${id}/modifica`])
  }

  getIndexId(id: number, index: number) {
    this.fatturaCorrente = [id, index];
  }

  eliminaFattura(id: number, index: number) {
    this.fattSrv.deleteFattura(id).subscribe();
    this.response.content.splice(index, 1);
    console.log(this.fatturaCorrente);
  }
}
