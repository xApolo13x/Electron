import { NgModule } from '@angular/core';
import { LoginComponent } from './core/components/login/login.component';
import { RouterModule, Routes} from '@angular/router';
import { AdminGuard } from './core/guards/admin.guard';
import { OperatorGuard } from './core/guards/operator.guard';
import { HomeComponent } from './core/components/home/home.component';
import { AuthGuard } from './core/guards/auth.guard';
import { RegisterFormComponent } from './core/components/userManagement/register-form/register-form.component';
import { TableUserComponent } from './core/components/userManagement/table-user/table-user.component';


const routes: Routes = [
  {path: '', component: LoginComponent, pathMatch: 'full'},
  {path: 'login', component: LoginComponent, pathMatch: 'full'},
  {path: 'home', component: HomeComponent, pathMatch: 'full'},
  {path: 'table-user', component: TableUserComponent, canActivate:[AdminGuard]},
  {path: 'table-user/register-form', component: RegisterFormComponent, canActivate:[AdminGuard]}
];

@NgModule({
  imports: [
   [RouterModule.forRoot(routes)]],
  exports: [RouterModule]
  
})
export class AppRoutingModule { }
