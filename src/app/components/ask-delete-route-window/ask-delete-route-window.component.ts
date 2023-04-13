import { Component, Inject, inject } from '@angular/core';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { RoutesService } from 'app/routes-system/routes.service';

@Component({
  selector: 'app-ask-delete-route-window',
  templateUrl: './ask-delete-route-window.component.html',
  styleUrls: ['./ask-delete-route-window.component.scss']
})
export class AskDeleteRouteWindowComponent {

  constructor(private routesServ: RoutesService, @Inject(MAT_SNACK_BAR_DATA) public data: any){
    
  }

  snackBarRef = inject(MatSnackBarRef);

  dismissSnack(){
    this.snackBarRef.dismiss();
  }

  async deleteRoute(){
    await this.routesServ.deleteRoute(this.data)
  }

}
