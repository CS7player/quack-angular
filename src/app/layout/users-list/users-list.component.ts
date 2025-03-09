import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [],
  templateUrl: './users-list.component.html'
})
export class UsersListComponent implements OnInit {

 @Input() users_list = [];

 ngOnInit(): void {
  console.log(this.users_list);
 }
 
}
