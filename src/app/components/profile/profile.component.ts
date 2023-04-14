import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/auth/auth.service';
import { RoutesService } from 'app/routes-system/routes.service';
import { MatDialog } from '@angular/material/dialog';
import { InfoRouteWindowComponent } from '../info-route-window/info-route-window.component';
import { ThemePalette } from '@angular/material/core';
import { HotToastService } from '@ngneat/hot-toast';
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { AskDeleteRouteWindowComponent } from '../ask-delete-route-window/ask-delete-route-window.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  color: ThemePalette = 'primary'
  fileName = '';
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  firstNameV?: string;
  lastNameV?: string;
  ageV?: string;
  genderV?: string;
  userRoutes: any;

  ProfileForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    age: new FormControl('', [Validators.required, Validators.max(99), Validators.min(18), Validators.pattern('^[0-9]*$')]),
    gender: new FormControl('', [Validators.required]),
  })

  constructor(public authService: AuthService, public routesServ: RoutesService, public dialog: MatDialog,
    private toast: HotToastService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.routesServ.clicked = false;
    this.routesServ.routesSearched = false;
    this.authService.userProfile$?.subscribe((user) => {
      this.ProfileForm.patchValue({ ...user });
    });
  }

  get firstName() {
    return this.ProfileForm.get("firstName");
  }

  get lastName() {
    return this.ProfileForm.get("lastName");
  }

  get age() {
    return this.ProfileForm.get("age");
  }

  get gender() {
    return this.ProfileForm.get("gender");
  }

   updateProfile() {
    this.firstNameV = this.firstName?.value!;
    this.lastNameV = this.lastName?.value!;
    this.ageV = this.age?.value!;
    this.genderV = this.gender?.value!;
    this.ProfileForm.reset()
    this.authService.updateUser(this.firstNameV, this.lastNameV, this.ageV, this.genderV)
  }

  async getRoute(routeID: string) {
    await this.routesServ.getRoute(routeID);
  }

  async unsubscribeRoute(routeID: string) {
    await this.routesServ.getUnsubscribedOrderedRoute(routeID);
    this.toast.success("Route usnubscribed successfully!")
  }


  askDeleteRoute(routeID: string) {
    this.snackBar.openFromComponent(AskDeleteRouteWindowComponent, {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      data: routeID,
      panelClass: ['white-snack']
    });

  }

  async openDialog(routeID: string) {
    await this.getRoute(routeID);
    const dialogRef = this.dialog.open(InfoRouteWindowComponent, {
      data: {
        departure: this.routesServ.routeEdit.departure,
        arrival: this.routesServ.routeEdit.arrival,
        userName: this.routesServ.routeEdit.userName,
        departureTime: this.routesServ.routeEdit.departureTime,
        departureDate: this.routesServ.routeEdit.departureDate,
        comment: this.routesServ.routeEdit.comment,
        email: this.routesServ.routeEdit.email
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  onFileSelected(event: any) {

    const storage = getStorage();
    const file: File = event.target.files[0];
    console.log(file.size);

    if (file) {
      if (file.size / 1000 <= 2500) {
        this.fileName = file.name;
        const storageRef = ref(storage, "user-images/" + this.routesServ.userId + ".jpg");

        uploadBytes(storageRef, file).then((snapshot) => {
          console.log('Uploaded a blob or file!');
          window.location.reload();
        });
      } else {
        this.toast.error("Max size of image is 2.5MB", {
          position: 'top-right'
        })
      }
    }
  }



}
