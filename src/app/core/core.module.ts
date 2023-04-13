import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShellComponent } from './shell/shell.component';
import { FooterComponent } from './shell/footer/footer.component';
import { NavbarComponent } from './shell/navbar/navbar.component';

@NgModule({
  declarations: [
  
    ShellComponent,
       FooterComponent,
       NavbarComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ShellComponent
  ]
})
export class CoreModule { }
