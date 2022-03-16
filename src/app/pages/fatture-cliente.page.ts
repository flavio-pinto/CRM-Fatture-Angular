import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Fattura } from '../models/fattura';
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
          <th scope="col"><button type="button" (click)="nuovaFatturaCliente(idCliente)" class="btn btn-success">Nuova Fattura</button></th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let fattura of fattureCliente.content">
          <td *ngIf="fattura.id; else nullContent">{{fattura.id}}</td>
          <td *ngIf="fattura.data; else nullContent">{{fattura.data}}</td>
          <td *ngIf="fattura.numero; else nullContent">{{fattura.numero}}</td>
          <td *ngIf="fattura.anno; else nullContent">{{fattura.anno}}</td>
          <td *ngIf="fattura.importo; else nullContent">{{fattura.importo}}</td>
          <td *ngIf="fattura.stato; else nullContent">{{fattura.stato.nome}}</td>
          <td *ngIf="fattura.cliente; else nullContent">{{fattura.cliente.ragioneSociale}}</td>
          <td><button type="button" class="btn btn-warning">Modifica</button></td>
          <td><button type="button" class="btn btn-danger">Elimina</button></td>
        </tr>
        <ng-template #nullContent><td>NON DISP.</td></ng-template>
      </tbody>
    </table>

    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li class="page-item" (click)="goToPage(idCliente, 0)"><a class="page-link"><--First</a></li>
        <li *ngIf="!fattureCliente.first; else elsePrevious" class="page-item" (click)="goToPage(idCliente, fattureCliente.number - 1)"><a class="page-link">Previous</a></li>
        <ng-container *ngFor="let page of pages">
          <li *ngIf="page < fattureCliente.number + 5 && page > fattureCliente.number - 5" class="page-item" (click)="goToPage(idCliente, page)"><a [ngClass]="{'active-pagination' : page == fattureCliente.number}" class="page-link">{{page + 1}}</a></li>
        </ng-container>
        <li *ngIf="!fattureCliente.last; else elseNext" class="page-item" (click)="goToPage(idCliente, fattureCliente.number + 1)"><a class="page-link">Next</a></li>
        <li class="page-item" (click)="goToPage(idCliente, fattureCliente.totalPages - 1)"><a class="page-link">Last--></a></li>
        <ng-template #elsePrevious><li class="page-item"><a class="page-link">Previous</a></li></ng-template>
        <ng-template #elseNext><li class="page-item"><a class="page-link">Next</a></li></ng-template>
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
export class FattureClientePage implements OnInit {
  fattureCliente!: any;
  pages: number[] = [];
  idCliente!: number;

  constructor(private actRoute: ActivatedRoute, private fattSrv: FattureService, private router: Router) { }

  ngOnInit(): void {
    this.actRoute.params.subscribe(params => {
      const id = +params['id'];

      this.fattSrv.getFattureByCliente(id, 0).subscribe(res => {
        this.fattureCliente = res;
        this.pages = Array(this.fattureCliente.totalPages).fill(0).map((x, i) => i)
        console.log(this.fattureCliente);
        console.log(this.idCliente);

      });

      this.idCliente = id;
    })
  }

  goToPage(id: number, page: number) {
    this.fattureCliente.content.length = 0;
    this.fattSrv.getFattureByCliente(id, page).subscribe(res => {
      this.fattureCliente = res;
    })
  }

  nuovaFatturaCliente(id: number) {
    this.router.navigate([`/clienti/${id}/fatture/genera-fattura`])
  }

}
