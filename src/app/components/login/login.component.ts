import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'app/auth/auth.service';
import { RoutesService } from 'app/routes-system/routes.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  })

  emailV?: string;
  passwordV?: string;

  constructor(private authService: AuthService, private routeServ: RoutesService) { }

  hide = true;

  get email() {
    return this.loginForm.get("email");
  }

  get password() {
    return this.loginForm.get("password");
  }

  submit() {
    if (!this.loginForm.valid) {
      return;
    }
    this.emailV = this.email!.value!;
    this.passwordV = this.password!.value!;
    this.authService.login(this.emailV, this.passwordV);
  }

  isLoading(): boolean {
    return this.authService.isLoading;
  }


  ngOnInit(): void {
    this.routeServ.clearRoutes();
  }

}
