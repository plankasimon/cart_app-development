import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BookedUser, RoutesInt } from 'app/routes-system/routes';
import { RoutesService } from 'app/routes-system/routes.service';

@Component({
  selector: 'app-info-route-window',
  templateUrl: './info-route-window.component.html',
  styleUrls: ['./info-route-window.component.scss']
})
export class InfoRouteWindowComponent {
  userDetails: BookedUser[] = [];

  constructor(private routesServ: RoutesService,
    public dialogRef: MatDialogRef<InfoRouteWindowComponent>,
    @Inject(MAT_DIALOG_DATA) public data: RoutesInt,
  ) {
    this.userDetails = this.routesServ.bookedUserDetails;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
