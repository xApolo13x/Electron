import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import { LoginService } from '../../services/login.service';
import { User } from '../../models/user';
import { NgxPermissionsService } from 'ngx-permissions';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  user : User;

  ngOnInit(): void {
  }

  constructor(private snack: MatSnackBar, private loginService: LoginService, private router: Router,
    private permissionsService: NgxPermissionsService) {
      this.user = new User();
  }

  formSubmit() {
    if (this.user.username == '' || this.user.username == null) {
      this.snack.open('Username is required !!', 'Accept', {
        verticalPosition: 'top',
        duration: 3000
      })
      return;
    }

    if (this.user.password == '' || this.user.password == null) {
      this.snack.open('Password is required !!', 'Accept', {
        verticalPosition: 'top',
        duration: 3000
      })
      return;
    }

    

  }



}