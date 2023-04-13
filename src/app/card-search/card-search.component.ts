import { Component } from '@angular/core';
import { RoutesInt } from 'app/routes-system/routes';
import { RoutesService } from 'app/routes-system/routes.service';

@Component({
  selector: 'app-card-search',
  templateUrl: './card-search.component.html',
  styleUrls: ['./card-search.component.scss']
})
export class CardSearchComponent {

  routesSearch: RoutesInt[] = [];

  constructor(public routesServ: RoutesService) { 
  }

  routesSearched = this.routesServ.routesSearched;
  clicked = this.routesServ.clicked;

  routeToService(routeID: string){
    this.routesServ.getRouteSeats(routeID);
  }

  

}
