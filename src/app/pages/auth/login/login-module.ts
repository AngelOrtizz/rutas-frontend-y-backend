import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { Login } from './login';
import { MaterialModule } from '../../../../../material.module';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '', component: Login }
];

@NgModule({
  declarations: [
    // Login component removed from declarations since it's standalone
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    MaterialModule,
    Login // Import the standalone Login component instead
  ]
})
export class LoginModule { }
