import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import { LoginService } from '../../services/login.service';
import { User } from '../../models/user';
import { NgxPermissionsService } from 'ngx-permissions';
import {Router} from '@angular/router';
import { permissions } from 'src/app/shared/permissions/permissions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  user! : User;

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
    this.loginService.generateToken(this.user).subscribe(
      (data: any) => {
        console.log(data);

        this.loginService.loginUser(data.token);
        this.loginService.getCurrentUser().subscribe((user: any) => {
          this.loginService.setUser(user)
          console.log(user);

          const perm = this.loginService.getUserRole();

          if (perm == permissions.admin) {
            this.permissionsService.loadPermissions([perm]);
            this.router.navigate(['signup'])
            this.loginService.loginStatusSubject.next(true);


          } else if (perm == permissions.operator) {
            this.permissionsService.loadPermissions([perm]);
            this.router.navigate([''])
            this.loginService.loginStatusSubject.next(true);

          } else {
            this.loginService.logout();
          }
        })
      }, (error) => {
        console.log(error);
        this.snack.open('The parameters are incorrect, please try again', 'Accept',
          {duration: 3000},
        )
      }
    )
    
  }
}