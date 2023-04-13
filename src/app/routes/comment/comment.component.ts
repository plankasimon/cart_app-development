import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { RoutesService } from 'app/routes-system/routes.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  constructor(private routesServ: RoutesService, private router: Router, private toast: HotToastService) { }

  ngOnInit(): void {
    
  }

  commentControl = new FormControl('');

  commentSubmit(){
    if (this.routesServ.departureComplete && this.routesServ.arrivalComplete && this.routesServ.departureDateComplete && this.routesServ.departureTimeComplete && this.routesServ.seatsComplete && this.routesServ.priceComplete) {
    this.routesServ.addCommentToObject(this.commentControl.value!);
    this.routesServ.addRouteToDb();
    this.router.navigate(["/main"]);
    }else{
      this.toast.warning('Complete all the requirements for the route!')
    }
  }

}
