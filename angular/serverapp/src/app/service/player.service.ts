import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {
  Injectable,
  ɵsetAllowDuplicateNgModuleIdsForTest,
} from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { CustomResponse } from '../interface/custom-response';
import { Player } from '../interface/player';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  private readonly apiUrl = 'any';
  constructor(private http: HttpClient) {}

  allPlayers$ = <Observable<CustomResponse>>(
    this.http
      .get<CustomResponse>(`${this.apiUrl}/all`)
      .pipe(tap(console.log), catchError(this.handleError))
  );

  new$ = (player: Player) =>
    <Observable<CustomResponse>>(
      this.http
        .post<CustomResponse>(`${this.apiUrl}/new`, player)
        .pipe(tap(console.log), catchError(this.handleError))
    );

  player$ = (id: number) =>
    <Observable<CustomResponse>>(
      this.http
        .get<CustomResponse>(`${this.apiUrl}/get/${id}`)
        .pipe(tap(console.log), catchError(this.handleError))
    );

  delete$ = (id: number) =>
    <Observable<CustomResponse>>(
      this.http
        .delete<CustomResponse>(`${this.apiUrl}/delete/${id}`)
        .pipe(tap(console.log), catchError(this.handleError))
    );

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.log(error);
    return throwError(
      () => new Error('An error occurred - Code: ' + error.status)
    );
  }
}
