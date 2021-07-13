import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SortColumn, SortDirection } from '../_directives/sortable.directive';
import { Appointment } from '../_models/appointment';

// interface SearchResult {
//   appointments: Appointment[];
//   total: number;
// }

// interface State {
//   page: number;
//   pageSize: number;
//   searchTerm: string;
//   sortColumn: SortColumn;
//   sortDirection: SortDirection;
// }

// const compare = (v1: string | number, v2: string | number) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
// const compareDates = (v1: Date, v2: Date) => v1.getTime() < v2.getTime() ? -1 : v1.getTime() > v2.getTime() ? 1 : 0

// function sort(appointments: Appointment[], column: SortColumn, direction: string): Appointment[] {
//   if (direction === '' || column === '') {
//     return appointments;
//   } else {
//     return [...appointments].sort((a, b) => {
//       if(typeof(a[column]) === typeof(Date) && typeof(b[column]) === typeof(Date)){
//         const res = compareDates((a[column] as Date), (b[column] as Date));
//         return direction === 'asc' ? res : -res;
//       } else {
//         const res = compare(a[column] as string | number, b[column] as string | number);
//         return direction === 'asc' ? res : -res;
//       }
//     });
//   }
// }

@Injectable({
  providedIn: 'root'
})
export class AppointmentsService {
  // private _loading$ = new BehaviorSubject<boolean>(true);
  // private _appointments$ = new BehaviorSubject<Appointment[]>([]);
  // private _total$ = new BehaviorSubject<number>(0);

  // private _state: State = {
  //   page: 1,
  //   pageSize: 4,
  //   searchTerm: '',
  //   sortColumn: '',
  //   sortDirection: ''
  // };


  // get appointments$() { return this._appointments$.asObservable(); }
  // get total$() { return this._total$.asObservable(); }
  // get loading$() { return this._loading$.asObservable(); }
  // get page() { return this._state.page; }
  // get pageSize() { return this._state.pageSize; }
  // // get searchTerm() { return this._state.searchTerm; }

  // set page(page: number) { this._set({page}); }
  // set pageSize(pageSize: number) { this._set({pageSize}); }
  // // set searchTerm(searchTerm: string) { this._set({searchTerm}); }
  // set sortColumn(sortColumn: SortColumn) { this._set({sortColumn}); }
  // set sortDirection(sortDirection: SortDirection) { this._set({sortDirection}); }

  // private _set(patch: Partial<State>) {
  //   Object.assign(this._state, patch);
  //   // this._search$.next();
  // }
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAllAppointments(orderBy: string) {
    return this.http.get<Appointment[]>(this.baseUrl + 'appointments/' + orderBy);
  }

  createAppointment(username: string, appointmentTime: Date) {
    return this.http.post<Appointment>(this.baseUrl + 'appointments/', {username: username, appointmentTime: appointmentTime});
  }

  deleteAppointment(username:string) {
    return this.http.delete(this.baseUrl + 'appointments/' + username);
  }

  editAppointment(username: string, date: Date) {
    return this.http.put<Appointment>(this.baseUrl + 'appointments/', {username: username, appointmentTime: date});
  }
}
