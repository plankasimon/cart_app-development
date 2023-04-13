import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent {

  resetPassForm = new FormGroup({
    email: new FormControl('',[Validators.required, Validators.email])
  })

  emailV?: string;

  constructor(private authServ: AuthService, private toast: HotToastService){}

  get email(){
    return this.resetPassForm.get("email");
  }

  isLoading(): boolean{
    return this.authServ.isLoadingPass;
  }

  async sendMail(){
    if(!this.resetPassForm.valid){
      return
    }
    this.emailV = this.email?.value!.trim();
    await this.authServ.forgotPassword(this.emailV!);
  }

}
