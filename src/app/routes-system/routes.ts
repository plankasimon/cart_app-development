export interface RoutesInt {
    userID?: string;
    routeID?: string;
    userName?: string;
    name?: string;
    departure?: string;
    arrival?: string;
    departureDate?: string;
    departureDateMili?: number;
    departureTime?: string;
    seats?: number;
    price?: string;
    comment?: string;
    bookedUsers?: string[];
    email?: string;
}

export interface BookedUser {
    firstName?: string,
    lastName?: string,
    age?: number,
    gender?: string,
    email?: string,
}

export interface TimeInt {
    value: string;
    viewValue: string;
}