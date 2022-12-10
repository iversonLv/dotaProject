import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {
  isLogined: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  private BASE_API_URL = environment.BASE_API_URL;

  private BASE_LOCAL_DATA_URL = environment.BASE_LOCAL_DATA_URL;

  private BASE_GIT_RAW_DATA_URL = environment.BASE_GIT_RAW_DATA_URL;

  constructor(
    private httpClient: HttpClient,
  ) { }

  // GET
  get(endpoint, params?, headers?): Observable<any> {
    return this.httpClient.get<any>(this.BASE_API_URL + endpoint, {
      ...headers,
      ...params
    })
    .pipe(
      catchError(this.errorHandle)
    );
  }

  // GET local json data
  getUser(): Observable<any> {
    return this.httpClient.get<any>('https://steamloginlv.herokuapp.com/', {
      headers: {
        'content-type': 'text/html'
      },
      withCredentials: true
    }).pipe(
      catchError(this.errorHandle)
    );
  }

  getAccountId(): any {
    if (!!localStorage.getItem('loginedAccountId')) {
      return this.isLogined.next(true);
    }
    return this.isLogined.next(false);
  }
  getLogout(): any {
    localStorage.removeItem('loginedAccountId');
    return this.isLogined.next(false);
  }
  // here get filter query params local json static data
  getLocalData(endpoint): Observable<any> {
    return this.httpClient.get<any>(this.BASE_LOCAL_DATA_URL + endpoint)
    .pipe(
      catchError(this.errorHandle)
    );
  }

  // GET git raw json data
  getGitRawData(endpoint): Observable<any> {
    return this.httpClient.get<any>(this.BASE_GIT_RAW_DATA_URL + endpoint)
    .pipe(
      catchError(this.errorHandle)
    );
  }

  // POST
  post(endpoint, data?, headers?): Observable<any> {
    return this.httpClient.post<any>(this.BASE_API_URL + endpoint, data, {
      ...headers
    })
    .pipe(
      retry(1),
      catchError(this.errorHandle)
    );
  }

  // error
  errorHandle(error): any {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // get client side error
      errorMessage = error.error.message;
    } else {
      // get sever side error
      errorMessage = error.error.message;
    }
    return throwError(errorMessage);
  }

}
