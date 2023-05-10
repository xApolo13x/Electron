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
import { RouterModule } from '@angular/router';
import { authInterceptorServiceProviders } from './interceptors/auth.interceptor.service';
import { HomeComponent } from './components/home/home.component';
import { NgxPermissionsModule } from 'ngx-permissions';
import { TableUserComponent } from './components/userManagement/table-user/table-user.component';
import { RegisterFormComponent } from './components/userManagement/register-form/register-form.component';


@NgModule({
  declarations: [
       ShellComponent,
       NavbarComponent,
       FooterComponent,
       LoginComponent,
       HomeComponent,
       TableUserComponent,
       RegisterFormComponent,
       
          
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
    NgxPermissionsModule.forRoot()
    
    

  ],
  providers: [authInterceptorServiceProviders],
  exports: [ShellComponent
    
  ]
})
export class CoreModule { }
