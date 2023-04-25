import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import { LoginService } from '../../services/login.service';
import { User } from '../../models/user';
import { NgxPermissionsService } from 'ngx-permissions';
import {Router} from '@angular/router';
import { permissions } from 'src/app/shared/permissions/permissions';
import { tap, catchError } from 'rxjs/operators';

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
      });
      return;
    }
  
    if (this.user.password == '' || this.user.password == null) {
      this.snack.open('Password is required !!', 'Accept', {
        verticalPosition: 'top',
        duration: 3000
      });
      return;
    }
    
    this.loginService.generateToken(this.user).pipe(
      tap((data: any) => {
        console.log(data);
        this.loginService.loginUser(data.token);
      }),
      catchError((error: any) => {
        console.log(error);
        this.snack.open('The parameters are incorrect, please try again', 'Accept', {
          duration: 3000,
          verticalPosition: 'top',
        });
        return [];
      })
    ).subscribe((data: any) => {
      this.loginService.getCurrentUser().pipe(
        tap((user: any) => {
          this.loginService.setUser(user);
          console.log(user);
  
          const perm = this.loginService.getUserRole();
  
          if (perm == permissions.admin) {
            this.permissionsService.loadPermissions([perm]);
            this.router.navigate(['signup']);
            this.loginService.loginStatusSubject.next(true);
  
          } else if (perm == permissions.operator) {
            this.permissionsService.loadPermissions([perm]);
            this.router.navigate(['']);
            this.loginService.loginStatusSubject.next(true);
  
          } else {
            this.loginService.logout();
          }
        }),
        catchError((error: any) => {
          console.log(error);
          this.snack.open('An error occurred while getting user data', 'Accept', {
            duration: 3000,
            verticalPosition: 'top',
          });
          return [];
        })
      ).subscribe();
    });
  }
}

