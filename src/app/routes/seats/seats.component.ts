import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoutesService } from 'app/routes-system/routes.service';

@Component({
  selector: 'app-seats',
  templateUrl: './seats.component.html',
  styleUrls: ['./seats.component.css']
})
export class SeatsComponent implements OnInit {

  seatsNumber: number = 3;

  constructor(private routesServ: RoutesService, private router: Router) { }

  ngOnInit(): void {
    
  }

  addOne(){
    if (this.seatsNumber != 4) {
      this.seatsNumber++; 
    }
  }

  minusOne(){
    if (this.seatsNumber != 1) {
      this.seatsNumber--;
    }
  }

  seatsSubmit(){
    this.routesServ.addSeatsToObject(this.seatsNumber!);
    this.routesServ.seatsComplete = true;
    this.router.navigate(['/price'])
  }

}
