import { NgModule } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card'
import {MatPaginatorModule} from '@angular/material/paginator'
import {MatFormFieldModule} from '@angular/material/form-field'
import {MatInputModule} from '@angular/material/input'

 @NgModule({
  declarations: [],
  imports: [
    MatButtonModule,
    MatCardModule, 
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule
  ],
  exports:[
    MatButtonModule,
    MatCardModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule
  ] 
})
export class MaterialModule { }