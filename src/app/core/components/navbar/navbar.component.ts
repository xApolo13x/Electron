import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { User } from '../../models/user';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

  title: string = "SMGT"
  isLoggedIn = false;
  user: User;

  constructor(public login:LoginService, private router: Router) {
  }

  ngOnInit(): void {
    this.isLoggedIn = this.login.isLoggedIn();
    this.user = this.login.getUser();
    this.login.loginStatusSubject.asObservable().subscribe(
      data => {
        this.isLoggedIn = this.login.isLoggedIn();
        this.user = this.login.getUser();
      }
    )
  }

  public logout() {
    this.login.logout();
    this.router.navigate([''])

  }
  
}

