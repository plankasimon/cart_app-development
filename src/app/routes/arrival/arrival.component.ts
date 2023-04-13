import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { RoutesService } from 'app/routes-system/routes.service';
import { distinctUntilChanged, Observable, Subject, switchMap, tap } from 'rxjs';
import { RoutesInt } from 'app/routes-system/routes';

@Component({
  selector: 'app-arrival',
  templateUrl: './arrival.component.html',
  styleUrls: ['./arrival.component.css']
})
export class ArrivalComponent implements OnInit {

  cityControl = new FormControl('',);

  constructor(private routesServ: RoutesService, private router: Router) { }

  cities$!: Observable<RoutesInt[]>;
  private searchTerms = new Subject<string>();
  loading?: boolean;

  ngOnInit() {
    this.cities$ = this.searchTerms.pipe(
      tap(() => this.loading = true),
      distinctUntilChanged(),
      switchMap((term: string) => this.routesServ.searchCities(term)),
      tap(() => this.loading = false),
    );
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  arrivalSubmit() {
    this.routesServ.addArrivalToObject(this.cityControl.value!);
    this.routesServ.arrivalComplete = true;
    this.router.navigate(["/departure-date"])
  }

}
