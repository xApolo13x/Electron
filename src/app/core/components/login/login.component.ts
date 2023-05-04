import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NgxPermissionsService } from 'ngx-permissions';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { LoginService } from '../../services/login.service';
import { User } from '../../models/user';
import { permissions } from 'src/app/shared/permissions/permissions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user: User = new User();

  constructor(
    private snack: MatSnackBar,
    private loginService: LoginService,
    private router: Router,
    private permissionsService: NgxPermissionsService
  ) {
    
  }

  formSubmit() {
    if (!this.isFormValid()) {
      return;
    }

    this.loginService.generateToken(this.user).pipe(
      tap((data: any) => {
        this.loginService.loginUser(data.token);
      }),
      switchMap(() => this.loginService.getCurrentUser()),
      tap((user: User) => {
        this.loginService.setUser(user);
        const perm = this.loginService.getUserRole();
        if (perm == permissions.admin || perm === permissions.operator) {
          this.permissionsService.loadPermissions([perm]);
          this.router.navigate(['home']);
          this.loginService.loginStatusSubject.next(true);
        } else {
          this.loginService.logout();
        }
      }),
      catchError((error: Error) => {
        const errorMessage = 'An error occurred while getting user data';
        this.snack.open(errorMessage, 'Accept', {
          duration: 3000,
          verticalPosition: 'top'
        });
        throw new Error(errorMessage + error);
      })
    ).subscribe();
  }

  private isFormValid(): boolean {
    if (!this.user.username) {
      this.snack.open('Username is required !!', 'Accept', {
        verticalPosition: 'top',
        duration: 3000
      });
      return false;
    }
    if (!this.user.password) {
      this.snack.open('Password is required !!', 'Accept', {
        verticalPosition: 'top',
        duration: 3000
      });
      return false;
    }
    return true;
  }
}
