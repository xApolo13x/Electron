import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  user: User = new User();

  constructor(private userService: UserService, private snack: MatSnackBar) {
  }

  ngOnInit(): void { }

  formSubmit() {
    if (!this.user.username) {
      this.snack.open('The username is required !!', 'Accept', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right'
      });
      return;
    }
  
    this.userService.addUser(this.user).subscribe({
      next: (data) => {
        this.openSnackBar();
      },
      error: (error) => {
        console.log(error);
        this.snack.open('The user already exists!!', 'OK', {
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



