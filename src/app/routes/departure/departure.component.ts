import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { RoutesService } from 'app/routes-system/routes.service';
import { map, Observable, startWith } from 'rxjs';

@Component({
  selector: 'app-departure',
  templateUrl: './departure.component.html',
  styleUrls: ['./departure.component.css']
})



export class DepartureComponent implements OnInit {

  constructor(public routesServ: RoutesService){}

  ngOnInit() {
    this.routesServ.clearRoutes();
  }


}


