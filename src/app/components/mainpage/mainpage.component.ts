import { ViewportScroller } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { RoutesInt } from 'app/routes-system/routes';
import { RoutesService } from 'app/routes-system/routes.service';
import { distinctUntilChanged, Observable, Subject, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.css'],
})

export class MainpageComponent implements OnInit {

  departureControl = new FormControl('', [Validators.required]);
  arrivalControl = new FormControl('', [Validators.required]);
  departureClickControl = new FormControl('', [Validators.required]);
  arrivalClickControl = new FormControl('', [Validators.required,]);
  seatsControl = new FormControl('', [Validators.required]);
  dateControl = new FormControl(new Date(), [Validators.required]);

  constructor(public routesServ: RoutesService) { }

  cities$!: Observable<RoutesInt[]>;
  cities$2!: Observable<RoutesInt[]>;
  numbers: number[] = [1, 2, 3, 4]
  private searchTerms = new Subject<string>();
  private searchTerms2 = new Subject<string>();
  date = new Date;
  selectedDate?: Date;
  formatedDate?: string;
  departureS?: string;
  arrivalS?: string;
  seats?: string;
  loadingD?: boolean;
  loadingA?: boolean;


  ngOnInit(): void {

    this.cities$ = this.searchTerms.pipe(
      tap(() => this.loadingD = true),
      distinctUntilChanged(),
      switchMap((term: string) => this.routesServ.searchCities(term)),
      tap(() => this.loadingD = false),
    );
    this.cities$2 = this.searchTerms2.pipe(
      tap(() => this.loadingA = true),
      distinctUntilChanged(),
      switchMap((term: string) => this.routesServ.searchCities(term)),
      tap(() => this.loadingA = false),
    );

  }

  search(term: string): void {
    if (term == "") {
      this.departureSubmit()
      return;
    }
    this.searchTerms.next(term);
  }
  search2(term: string): void {

    if (term == "") {
      this.arrivalSubmit()
      return;
    }
    this.searchTerms2.next(term);
  }

  departureSubmit() {
    this.departureS = this.departureControl.value!;
    this.departureClickControl.setValue(this.departureS);
  }

  arrivalSubmit() {
    this.arrivalS = this.arrivalControl.value!;
    this.arrivalClickControl.setValue(this.arrivalS);
  }

  setValues() {
    this.selectedDate = this.dateControl.value!;
    this.formatedDate = this.selectedDate.toLocaleDateString();
    this.seats = this.seatsControl.value!;
  }

  sendValuesToService() {
    this.setValues();
    this.routesServ.getValuesFromMain(this.departureS!, this.arrivalS!, this.formatedDate!, this.seats!);
  }


}
