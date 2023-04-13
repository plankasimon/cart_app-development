import { Injectable, OnInit } from '@angular/core';
import { AuthService } from 'app/auth/auth.service';
import { firebaseConfig } from '../firebase.config';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { addDoc, doc, getDocs, query, setDoc, updateDoc, where, increment, getDoc, deleteDoc, onSnapshot, Timestamp, orderBy } from "firebase/firestore";
import { catchError } from 'rxjs/operators';
import { RoutesInt, BookedUser } from './routes';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { HotToastService } from '@ngneat/hot-toast';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class RoutesService implements OnInit {

  userRoutes$: BehaviorSubject<RoutesInt[]> = new BehaviorSubject<RoutesInt[]>([]);
  routesBooked$: BehaviorSubject<RoutesInt[]> = new BehaviorSubject<RoutesInt[]>([]);
  bookedUserDetails: BookedUser[] = [];
  routesSearch$: BehaviorSubject<RoutesInt[]> = new BehaviorSubject<RoutesInt[]>([]);
  routeEdit: RoutesInt = {};
  routeBookedDelete: string[] = [];
  protected apiKey = "EdKCzuZSdSqizwp5BnJlpw==us6a8vh8Hj4TF5Jk";
  userId = this.authService.uid;
  route: RoutesInt = {};
  departureComplete: boolean = false;
  arrivalComplete: boolean = false;
  departureDateComplete: boolean = false;
  departureTimeComplete: boolean = false;
  seatsComplete: boolean = false;
  priceComplete: boolean = false;
  departureS?: string;
  arrivalS?: string;
  formatedDate?: string;
  seatsS?: string;
  routesSearched?: boolean = false;
  clicked?: boolean = false;
  currentRouteSeats?: number;
  gotUserRoutes?: boolean = false;
  isAuth?: boolean;
  date?: Date;
  currentBookedArray?: Array<[]> = [];

  constructor(private authService: AuthService, private http: HttpClient,
    private authServ: AuthService, private toast: HotToastService, private router: Router) {

    //GET CURRENT DATE

    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const currentDay = new Date().getDate();
    this.date = new Date(currentYear, currentMonth, currentDay);
    const auth = getAuth();

    //AUTHENTICATION STATE CHECKER

    onAuthStateChanged(auth, async (user) => {
      if (user) {
        this.userId = user.uid;
        this.clicked = false;
        this.isAuth = true;
        this.userRoutes$ = new BehaviorSubject<RoutesInt[]>([]);
        this.routesBooked$ = new BehaviorSubject<RoutesInt[]>([]);
        console.log("NEW USER")
        await this.getUserRoutes();
        await this.searchBookedRoutes();
        /* this.bookedRoutesNotif(); */
      } else {
        this.isAuth = false;
        this.userId = "";
        /* await this.getUserRoutes();
        this.userRoutes$.next([]);
        await this.searchBookedRoutes(); */
        /* await this.bookedRoutesNotif(); */
        this.clicked = false;
        console.log("No user")
      }
    });
  }


  //DATABASE, FIRESTORE AND API INITIALIZATION
  private ROOT_URL = "https://api.api-ninjas.com/v1/";
  app = initializeApp(firebaseConfig);
  db = getFirestore(this.app);

  //CITIES API SEARCH

  searchCities(term: string): Observable<RoutesInt[]> {
    if (!term.trim()) {
      return of([]);
    }
    let header = new HttpHeaders({ 'X-Api-Key': this.apiKey });
    return this.http.get<RoutesInt[]>(`${this.ROOT_URL}/city?name=${term}&limit=5&country=CZ`, { headers: header }).pipe(
      catchError(this.handleError<RoutesInt[]>('searchCities', [])),
    );
  }

  //ERROR HANDLER

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

  //ROUTE PARAMETERS TO OBJECT

  addDepartureToDb(cityName: string) {
    this.route.userID = this.userId;
    this.route.departure = cityName;
  }

  addArrivalToObject(cityName: string) {
    this.route.arrival = cityName;
  }

  addDepartureDateToObject(selected: string, dateToMili: number) {
    this.route.departureDate = selected;
    this.route.departureDateMili = dateToMili;
  }

  addDepartureTimeToObject(selectedTime: string) {
    this.route.departureTime = selectedTime;
  }

  addSeatsToObject(seatsNumber: number) {
    this.route.seats = seatsNumber;
  }

  addPriceToObject(priceControl: string) {
    this.route.price = priceControl;
  }

  addCommentToObject(commentControl: string) {
    this.route.comment = commentControl;
  }

  //ADDING ROUTE TO DATABASE

  async addRouteToDb() {
    if (this.departureComplete && this.arrivalComplete && this.departureDateComplete && this.departureTimeComplete && this.seatsComplete && this.priceComplete) {
      try {
        await addDoc(collection(this.db, "routes"), {
          userID: this.route.userID,
          userName: this.authServ.firstName + " " + this.authServ.lastName!,
          departure: this.route.departure,
          arrival: this.route.arrival,
          departureDate: this.route.departureDate,
          departureDateMili: this.route.departureDateMili,
          departureTime: this.route.departureTime,
          seats: this.route.seats,
          price: this.route.price,
          comment: this.route.comment,
          bookedUsers: [],
          createdDate: Timestamp.now(),
          email: this.authServ.email,
        })
        this.toast.success('Route added successfully!');
      } catch (e) {
        this.toast.warning("There was an error! Route wasn't added!")
        console.error("Error adding document: ", e);
      }
    }
  }

  //REAL TIME USER ROUTES GETTING

  async getUserRoutes() {
    const routesRef = collection(this.db, "routes");
    const q = query(routesRef, where("userID", "==", this.userId), orderBy("createdDate"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      if (!this.isAuth) {
        unsubscribe();
      }
      this.userRoutes$.next([]);
      querySnapshot.forEach((doc) => {
        const userRoute = {
          userID: doc.data()['userID'],
          routeID: doc.id,
          userName: doc.data()['userName'],
          departure: doc.data()['departure'],
          arrival: doc.data()['arrival'],
          departureDate: doc.data()['departureDate'],
          departureTime: doc.data()['departureTime'],
          seats: doc.data()['seats'],
          price: doc.data()['price'],
          comment: doc.data()['comment'],
          bookedUsers: doc.data()['bookedUsers'] ?? [],
        }
        const currentArray = this.userRoutes$?.getValue();
        const newArray = [...currentArray ?? [], userRoute];
        this.userRoutes$?.next(newArray);
      });
    })
  }

  //BOOKED ROUTES SEARCHING

  async searchBookedRoutes() {
    const routesRef = collection(this.db, "routes");
    const q = query(routesRef);
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      if (!this.isAuth) {
        console.log("Unsub");
        unsubscribe();
      }
      this.routesBooked$.next([]);
      querySnapshot.forEach((doc) => {
        if (doc.get("departureDateMili") >= this.date!.getTime() + 86400000) {
          if (doc.get("bookedUsers").some((user: any) => user == this.userId)) {
            const object = {
              userID: doc.data()['userID'],
              routeID: doc.id,
              userName: doc.data()['userName'],
              departure: doc.data()['departure'],
              arrival: doc.data()['arrival'],
              departureDate: doc.data()['departureDate'],
              departureTime: doc.data()['departureTime'],
              seats: doc.data()['seats'],
              price: doc.data()['price'],
              comment: doc.data()['comment'],
              bookedUsers: doc.data()['bookedUsers'] ?? [],
              email: doc.data()['email'],
            }
            const currentArray = this.routesBooked$?.getValue();
            const newArray = [...currentArray ?? [], object];
            this.routesBooked$?.next(newArray);
          }
        }
      });
    })
  }

  //GETTING VALUES FROM MAIN

  public getValuesFromMain(departure: string, arrival: string, date: string, seats: string) {
    this.departureS = departure;
    this.arrivalS = arrival;
    this.formatedDate = date;
    this.seatsS = seats;
    this.searchRoutes();
  }

  //VALUE CLEARING

  clearValues() {
    this.departureS = "";
    this.arrivalS = "";
    this.formatedDate = "";
    this.seatsS = "";
  }

  //MAIN PAGE ROUTE SEARCHING

  async searchRoutes() {
    const routesRef = collection(this.db, "routes");
    const q = query(routesRef, where("seats", ">=", this.seatsS), where("departure", "==", this.departureS),
      where("arrival", "==", this.arrivalS), where("departureDate", "==", this.formatedDate), orderBy("seats", "desc"));
    const querySnapshot = await getDocs(q);
    this.routesSearch$.next([])
    querySnapshot.forEach((doc) => {
      if (this.authServ.isAuthenticated != false) {
        if (doc.get("userID") != this.userId && !doc.get("bookedUsers").some((user: any) => user == this.userId)) {
          const object = {
            userID: doc.data()['userID'],
            routeID: doc.id,
            userName: doc.data()['userName'],
            departure: doc.data()['departure'],
            arrival: doc.data()['arrival'],
            departureDate: doc.data()['departureDate'],
            departureTime: doc.data()['departureTime'],
            seats: doc.data()['seats'],
            price: doc.data()['price'],
            comment: doc.data()['comment'],
            bookedUsers: doc.data()['bookedUsers'] ?? []
          }
          const currentArray = this.routesSearch$?.getValue();
          const newArray = [...currentArray ?? [], object];
          this.routesSearch$?.next(newArray);
        }
      } else {
        const object = {
          userID: doc.data()['userID'],
          routeID: doc.id,
          userName: doc.data()['userName'],
          departure: doc.data()['departure'],
          arrival: doc.data()['arrival'],
          departureDate: doc.data()['departureDate'],
          departureTime: doc.data()['departureTime'],
          seats: doc.data()['seats'],
          price: doc.data()['price'],
          comment: doc.data()['comment'],
          bookedUsers: doc.data()['bookedUsers'] ?? []
        }
        const currentArray = this.routesSearch$?.getValue();
        const newArray = [...currentArray ?? [], object];
        this.routesSearch$?.next(newArray);
      }

    });
    if (this.routesSearch$.value.length != 0) {
      this.routesSearched = true;
    } else {
      this.routesSearched = false;
    }
    this.clicked = true;
  }

  //ROUTE SEATS UPDATE

  async getRouteSeats(routeID: string) {
    const docRef = doc(this.db, "routes", routeID);
    try {
      await updateDoc(docRef, {
        seats: increment(-this.seatsS!),
      })
      await this.bookRoute(routeID);
      await this.getUserRoutes();
      this.clicked = false;
      this.clearValues();
      this.routesSearch$.next([]);
      this.router.navigate(['/main']);
    } catch (e) {
      console.error("Cant update doc: ", e)
    }

  }

  //GETTING ROUTE TO UNSUBSCRIBE

  async getUnsubscribedOrderedRoute(routeID: string) {
    const docRef = doc(this.db, "routes", routeID);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      this.routeBookedDelete = docSnap.data()["bookedUsers"];
    } else {
      this.toast.warning("Route not found!")
    }
    const seatsnum = this.routeBookedDelete.filter(item => item == this.userId);
    this.routeBookedDelete = this.routeBookedDelete.filter(item => !this.userId.includes(item));
    this.unsubscribeOrderedRoute(routeID, this.routeBookedDelete, seatsnum.length);
  }

  //ROUTE UNSUBSCRIBE

  async unsubscribeOrderedRoute(routeID: string, routeUserDelete: string[], seatsToInc: number) {
    const docRef = doc(this.db, "routes", routeID);
    try {
      await updateDoc(docRef, {
        bookedUsers: routeUserDelete,
        seats: increment(seatsToInc),
      })
    } catch (e) {
      this.toast.warning("Can't unsubscribe this route!")
    }
  }

  //ROUTE DELETE

  async deleteRoute(routeID: string) {
    await deleteDoc(doc(this.db, "routes", routeID));
    this.toast.success("Route deleted")
  }

  //ROUTE BOOKING

  async bookRoute(routeID: string) {
    try {
      if (this.seatsS == "1") {
        await setDoc(doc(this.db, "routes", routeID), {

          bookedUsers: [
            ...this.routesSearch$.value[0].bookedUsers!,
            this.userId,
          ]
        }, { merge: true }).then(() => {
          this.toast.success("You booked the route!");
        })
      }
      if (this.seatsS == "2") {
        await setDoc(doc(this.db, "routes", routeID), {
          bookedUsers: [
            ...this.routesSearch$.value[0].bookedUsers!,
            this.userId,
            this.userId
          ]
        }, { merge: true }).then(() => {
          this.toast.success("You booked the route!");
        })
      }
      if (this.seatsS == "3") {
        await setDoc(doc(this.db, "routes", routeID), {
          bookedUsers: [
            ...this.routesSearch$.value[0].bookedUsers!,
            this.userId,
            this.userId,
            this.userId,
          ]
        }, { merge: true }).then(() => {
          this.toast.success("You booked the route!");
        })
      }
      if (this.seatsS == "4") {
        await setDoc(doc(this.db, "routes", routeID), {
          bookedUsers: [
            this.userId,
            this.userId,
            this.userId,
            this.userId,
          ]
        }, { merge: true }).then(() => {
          this.toast.success("You booked the route!");
        })
      }

    } catch (e) {
      console.error("Error: ", e)
      this.toast.warning("There was an error booking route!");
    }
  }

  //ROUTE INFO GETTING

  async getRoute(routeID: string) {
    const docRef = doc(this.db, "routes", routeID);
    const docSnap = await getDoc(docRef);
    this.bookedUserDetails = [];
    if (docSnap.exists()) {
      this.routeEdit = docSnap.data();
      this.routeEdit.bookedUsers!.forEach(async (id) => {
        const docSnaps = await getDoc(doc(this.db, "users", id));
        if (docSnaps.exists()) {
          this.bookedUserDetails.push(docSnaps.data())
        } else {
          console.log("No user");
        }
      })
    } else {
      this.toast.warning("Route not found!");
    }
  }

  //ROUTE VARIABLES CLEAR

  clearRoutes() {
    this.routesSearch$.next([]);
    this.clicked = false;
    this.routesSearched = false;
  }

  ngOnInit(): void {
    this.clicked = false;
    this.routesSearched = false;
  }


}



