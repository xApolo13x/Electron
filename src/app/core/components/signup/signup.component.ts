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

  user!: User;

  constructor(private userService: UserService, private snack: MatSnackBar) {
    this.user = new User();
  }

  ngOnInit(): void { }

  formSubmit() {
    console.log(this.user);
    if (this.user.username == '' || this.user.username == null) {
      this.snack.open('The username is required !!', 'Accept', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right'
      });
      return;
    }

    this.userService.addUser(this.user).subscribe(
      (data) => {
        console.log(data);
        this.openSnackBar();
      }, (error) => {
        console.log(error);
        this.snack.open('The user already exists!!', 'OK', {
          duration: 3000,
          verticalPosition: 'top',
        });
      }
    )
  }

  openSnackBar() {
    const config = new MatSnackBarConfig()
    config.panelClass = ['white-snackbar'];
    config.duration = 5000;
    this.snack.open('User Saved: User successfully registered in the system', 'Close', config);
  }

}



