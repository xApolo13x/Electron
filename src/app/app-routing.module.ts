import { NgModule } from '@angular/core';
import { LoginComponent } from './core/components/login/login.component';
import { SignupComponent } from './core/components/signup/signup.component';
import { RouterModule, Routes} from '@angular/router';
import { AdminGuard } from './core/guards/admin.guard';
import { OperatorGuard } from './core/guards/operator.guard';
import { HomeComponent } from './core/components/home/home.component';
import { AuthGuard } from './core/guards/auth.guard';


const routes: Routes = [
  {path: '', component: LoginComponent, pathMatch: 'full'},
  {path: 'signup', component: SignupComponent, canActivate:[AdminGuard]},
  {path: 'login', component: LoginComponent, pathMatch: 'full'},
  {path: 'home', component: HomeComponent, canActivate:[AdminGuard]},

];

@NgModule({
  imports: [
   [RouterModule.forRoot(routes)]],
  exports: [RouterModule]
  
})
export class AppRoutingModule { }
