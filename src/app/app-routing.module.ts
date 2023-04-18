import { NgModule } from '@angular/core';
import { LoginComponent } from './core/components/login/login.component';
import { RouterModule, Routes} from '@angular/router';


const routes: Routes = [
  {path: '', component: LoginComponent, pathMatch: 'full'}
];

@NgModule({
  imports: [
   [RouterModule.forRoot(routes)]],
  exports: [RouterModule]
  
})
export class AppRoutingModule { }
