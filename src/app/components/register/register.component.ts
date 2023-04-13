import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RegisterForm } from 'app/auth/Auth';
import { AuthService } from 'app/auth/auth.service';
import { RoutesService } from 'app/routes-system/routes.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('',[Validators.required, Validators.minLength(6)]),
    age: new FormControl('', [Validators.required, Validators.max(99), Validators.min(18)]),
    gender: new FormControl('', [Validators.required])
  })

  fNameV?: string;
  lNameV?: string;
  emailV?: string;
  passwordV?: string;
  ageV?: string;
  genderV?: string;

  constructor(private authService: AuthService, private routeServ: RoutesService) { }

  ngOnInit(): void {
    this.routeServ.clearRoutes();
  }

  hide = true;

  get firstName(){
    return this.registerForm.get("firstName");
  }
  get lastName(){
    return this.registerForm.get("lastName");
  }
  get email(){
    return this.registerForm.get("email");
  }
  get password(){
    return this.registerForm.get("password");
  }
  get age(){
    return this.registerForm.get("age");
  }
  get gender(){
    return this.registerForm.get("gender");
  }
  

  register(){

    if(!this.registerForm.valid){
      return;
    }

    this.fNameV = this.firstName!.value!;
    this.lNameV = this.lastName!.value!;
    this.emailV = this.email!.value!;
    this.passwordV = this.password!.value!;
    this.ageV = this.age!.value!;
    this.genderV = this.gender!.value!;


    this.authService.register(this.fNameV, this.lNameV, this.emailV, this.passwordV, this.ageV, this.genderV);
  }

  isLoading(): boolean{
    return this.authService.isLoading;
  }

}
