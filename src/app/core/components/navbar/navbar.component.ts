import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { User } from '../../models/user';
import { LoginService } from '../../services/login.service';
import { NgxPermissionsService } from 'ngx-permissions';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

  title: string = "SMGT"
  isLoggedIn = false;
  user: User = new User();


  constructor(public login:LoginService, private router: Router, private permissionsService: NgxPermissionsService) {
    this.user = this.login.getUser()
  }

  ngOnInit(): void {

    this.isLoggedIn = this.login.isLoggedIn();
    this.login.loginStatusSubject.asObservable().subscribe(
      data => {
        this.isLoggedIn = this.login.isLoggedIn();
        this.user = this.login.getUser();
      }
    )

    const perm = this.login.getUserRole();
    this.permissionsService.loadPermissions([perm]);
  }

  public logout() {
    this.login.logout();
    location.href = '' 
  }
  
}

