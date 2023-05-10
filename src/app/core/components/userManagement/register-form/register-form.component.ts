import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/models/user';
import { UserService } from 'src/app/core/services/user.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';


@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit{

  user: User = new User();

  constructor(private userService: UserService, private snack: MatSnackBar) {
  }

  ngOnInit(): void {}

    formSubmit() {
      if (!this.user.userId) {
        this.snack.open('The username is required !!', 'Accept', {
          duration: 3000,
          verticalPosition: 'top',
        });
        return;
      }
    
      this.userService.createUser(this.user).subscribe({
        next: () => {
          this.openSnackBar();
        },
        error: (error) => {
          console.log(error);
          this.snack.open('The data already exists!!', 'OK', {
            duration: 3000,
            verticalPosition: 'top',
          });
        }
      });
    }
    
    openSnackBar() {
      const config = new MatSnackBarConfig()
      config.panelClass = ['white-snackbar'];
      this.snack.open('User Saved: User successfully registered in the system', 'Close', {
        duration: 3000,
        verticalPosition: 'top',
      });
    }
  
  }
  
  
  
  