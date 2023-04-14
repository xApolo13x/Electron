import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalileoDatePipe } from './pipes/galileo-date.pipe';

@NgModule({
  declarations: [
    GalileoDatePipe
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
