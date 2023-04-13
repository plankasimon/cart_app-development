import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoutesService } from 'app/routes-system/routes.service';

@Component({
  selector: 'app-departure-date',
  templateUrl: './departure-date.component.html',
  styleUrls: ['./departure-date.component.css']
})
export class DepartureDateComponent implements OnInit {

  selected?: Date;
  minDate: Date;
  neco?: number;
  // den má 86,400,000 milisekund

  constructor(private routesServ: RoutesService, private router: Router) {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const currentDay = new Date().getDate();
    this.minDate = new Date(currentYear, currentMonth, currentDay);
  }

  ngOnInit(): void {
  }

  submitDate() {
    this.routesServ.addDepartureDateToObject(this.selected!.toLocaleDateString(), this.selected!.getTime());
    this.routesServ.departureDateComplete = true;
    this.router.navigate(['/departure-time'])
  }

}
