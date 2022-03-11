import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UsersService } from '../services/users.service';

@Component({
  template: `
    <table class="table">
      <thead>
        <tr>
          <th scope="col">id</th>
          <th scope="col">Username</th>
          <th scope="col">Nome</th>
          <th scope="col">Cognome</th>
          <th scope="col">email</th>
          <th scope="col">Ruolo</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let user of users">
          <td>{{user.id}}</td>
          <td>{{user.username}}</td>
          <td>{{user.nome}}</td>
          <td>{{user.cognome}}</td>
          <td>{{user.email}}</td>
          <td><span *ngFor="let item of user.roles">{{item.roleName}}</span></td>
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
export class UtentiPage implements OnInit {
  users!: User[];
  response!: any;
  pages: number[] = [];

  constructor(private usersSrv: UsersService) {
  }

  ngOnInit(): void {
    this.usersSrv.getAllUsers(0).subscribe(res => {
      this.users = res.content;
      this.response = res;
      this.pages = Array(this.response.totalPages).fill(0).map((x, i) => i)
      console.log(this.users);
    })
  }

  goToPage(page: number) {
    this.users.length = 0;
    this.usersSrv.getAllUsers(page).subscribe(res => {
      this.users = res.content;
      this.response = res;
    })
  }
}
