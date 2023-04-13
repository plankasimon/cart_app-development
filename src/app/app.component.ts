import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { doc, getDoc } from 'firebase/firestore';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('opacityScale', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(.95)' }),
        animate('100ms ease-out', style({ opacity: 1, transform: 'scale(1)' }))
      ]),
      transition(':leave', [
        style({ opacity: 1, transform: 'scale(1)' }),
        animate('75ms ease-in', style({ opacity: 0, transform: 'scale(.95)' }))
      ])
    ])
  ]
})

export class AppComponent implements OnInit {

  constructor(public authService: AuthService, private router: Router) { }

  navBg: any;

  ngOnInit(): void {
  }

  goToLogin(){
    this.router.navigate(['/login']);
  }

  goToRegister(){
    this.router.navigate(['/register'])
  }

  goToDeparture(){
    this.router.navigate(['/departure'])
  }

  goToProfile(){
    this.router.navigate(['/profile'])
  }

  title = 'CarT';

  isMenu = false;

  toggleMenu() {
    this.isMenu = !this.isMenu;
  }

  logout() {
    this.authService.logout();
  }
}
