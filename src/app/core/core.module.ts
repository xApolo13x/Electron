import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShellComponent } from './components/shell/shell.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from "@angular/material/form-field";
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { SignupComponent } from './components/signup/signup.component';
import { RouterModule } from '@angular/router';
import { authInterceptorServiceProviders } from './interceptors/auth.interceptor.service';


@NgModule({
  declarations: [
       ShellComponent,
       NavbarComponent,
       FooterComponent,
       LoginComponent,
       SignupComponent,
          
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatCardModule,
    FormsModule,
    RouterModule,
    
    

  ],
  providers: [authInterceptorServiceProviders],
  exports: [ShellComponent
    
  ]
})
export class CoreModule { }
