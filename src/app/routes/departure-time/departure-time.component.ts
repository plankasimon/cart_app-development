import { Component, OnInit } from '@angular/core';
import { TimeInt } from 'app/routes-system/routes';
import { RoutesService } from 'app/routes-system/routes.service';
import { TimeService } from 'app/routes-system/time.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-departure-time',
  templateUrl: './departure-time.component.html',
  styleUrls: ['./departure-time.component.css']
})
export class DepartureTimeComponent implements OnInit{

  selectedTime?: string;

  constructor(private routesServ: RoutesService, private timeServ: TimeService, private router: Router){}

  ngOnInit(): void {
    
  }

  times: TimeInt[] = this.timeServ.times;

  submitTime(){
    this.routesServ.addDepartureTimeToObject(this.selectedTime!);
    this.routesServ.departureTimeComplete = true;
    this.router.navigate(['/seats'])
  }

  

}
