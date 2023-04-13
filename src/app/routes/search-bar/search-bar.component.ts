import { Component, OnInit } from '@angular/core';
import { RoutesService } from 'app/routes-system/routes.service';
import { distinctUntilChanged, Observable, Subject, switchMap, tap } from 'rxjs';
import { RoutesInt } from 'app/routes-system/routes';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

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

  departureSubmit() {
    this.routesServ.addDepartureToDb(this.cityControl.value!);
    this.routesServ.departureComplete = true;
    this.router.navigate(["/arrival"])
  }
}
