import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RoutesService } from 'app/routes-system/routes.service';

@Component({
  selector: 'app-price',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.css']
})
export class PriceComponent implements OnInit {

  constructor(private routesServ: RoutesService, private router: Router) { }

  ngOnInit(): void {
    
  }

  priceControl = new FormControl('', [Validators.required, Validators.max(2000), Validators.pattern('^[0-9]*$')]);

  priceSubmit(){
    this.routesServ.addPriceToObject(this.priceControl.value!);
    this.routesServ.priceComplete = true;
    this.router.navigate(['/comment'])
  }

}
