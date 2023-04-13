import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from 'app/components/register/register.component';
import { LoginComponent } from 'app/components/login/login.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { AppRoutingModule } from '../app-routing.module';




@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent,
    PasswordResetComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatIconModule,
    MatInputModule,
    AppRoutingModule
  ]
})
export class AuthModule { }
