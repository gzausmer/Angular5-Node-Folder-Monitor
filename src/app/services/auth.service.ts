import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map';
import {apiUrl} from "../consts";
import {Router} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {catchError, tap} from "rxjs/operators";

@Injectable()

export class AuthenticationService {

  private loginRoute = apiUrl + 'login/';

  constructor(private http: HttpClient, private router: Router) {
  }

  login(userObj: any): Observable<any> {
    return this.http.post<any>(this.loginRoute + 'loginUser', userObj)
      .pipe(
        tap(userObj => console.log(`logging in`)),
        catchError(this.handleError('logginIn', []))
      )
      .map(userObj => {
        if (userObj && userObj.user === 'authorised') {
          localStorage.setItem('currentUser', JSON.stringify(userObj));
        }
        return userObj;
      });
  }

  logout(): void {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);
      return Observable.throw(`${error.message}`);

    };
  }
}
