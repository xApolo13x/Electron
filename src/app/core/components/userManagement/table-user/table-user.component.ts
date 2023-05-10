import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/models/user';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-table-user',
  templateUrl: './table-user.component.html',
  styleUrls: ['./table-user.component.css']
})
export class TableUserComponent implements OnInit{

  users: User[] = []

  constructor(private userService: UserService){}

  ngOnInit(): void {
    this.userService.getListUser().subscribe(
      users => this.users = users
    ); 
  }

}
