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
          <td>{{user.nome}}</td>
          <td>{{user.cognome}}</td>
          <td>{{user.username}}</td>
          <td>{{user.email}}</td>
          <td>{{user.roles[0].roleName}}</td>
        </tr>
      </tbody>
  </table>
  <nav aria-label="Page navigation example">
  <ul class="pagination">
    <li *ngIf="currentPage > 0" class="page-item" (click)="goToPage(currentPage - 1)"><a class="page-link">Previous</a></li>
    <li *ngIf="currentPage == 0" class="page-item"><a class="page-link">Previous</a></li>
    <li *ngFor="let page of pages" class="page-item" (click)="goToPage(page)"><a class="page-link">{{page + 1}}</a></li>
    <li *ngIf="currentPage < pages.length - 1" class="page-item" (click)="goToPage(currentPage + 1)"><a class="page-link">Next</a></li>
    <li *ngIf="currentPage >= pages.length - 1" class="page-item"><a class="page-link">Next</a></li>
  </ul>
</nav>
  `,
  styles: [
  ]
})
export class UtentiPage implements OnInit {
  users!: User[];
  totalPages!: number;
  pages: number[] = [];
  currentPage: number = 0;

  constructor(private usersSrv: UsersService) {
  }

  ngOnInit(): void {
    this.usersSrv.getAllUsers(0).subscribe(res => {
      this.users = res.content;
      this.totalPages = res.totalPages;
      this.pages = Array(this.totalPages).fill(0).map((x, i) => i)
      console.log(this.users);

    })
  }

  goToPage(page: number) {
    this.users.length = 0;
    this.usersSrv.getAllUsers(page).subscribe(res => {
      this.users = res.content;
    })
    this.currentPage = page;
    console.log(this.currentPage);

  }

}
