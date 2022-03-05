import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from '@angular/common/http';
import {
  Observable,
  throwError,
  catchError
} from 'rxjs';
import { map } from 'rxjs/operators';


// Declaring the api url that will provide data for the client app
const apiUrl = '';

@Injectable({
  providedIn: 'root'
})

export class FetchApiDataService {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) { }

  // Making the api call for the user registration endpoint
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + '/users', userDetails)
      .pipe(
        catchError(this.handleError)
      );
  }

  // User login
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + '/login', userDetails)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Get all movies from API
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + '/movies', {
        headers: new HttpHeaders(
          {
            Authorization: 'Bearer ' + token,
          })
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  // Get one movie from API
  getMovie(Title: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + `/movies/:Title`, {
        headers: new HttpHeaders({ Authorization: 'Bearer ' + token }),
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  // Get director from API
  getDirector(Name: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + `/directors/:Name`, {
        headers: new HttpHeaders({ Authorization: 'Bearer ' + token }),
      })
      .pipe(map(
        this.extractResponseData),
        catchError(this.handleError)
      );
  }

  // Get genre from API
  getGenre(Name: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + `/genres/:Name`, {
        headers: new HttpHeaders({ Authorization: 'Bearer ' + token }),
      })
      .pipe(map(
        this.extractResponseData),
        catchError(this.handleError)
      );
  }

  // Get user from API
  getUser(Username: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + `/users/:Username`, {
        headers: new HttpHeaders({ Authrization: 'Bearer ' + token }),
      })
      .pipe(map(
        this.extractResponseData),
        catchError(this.handleError)
      );
  }

  /* 
  // Get favourite movies from API
  getFavoriteMovies(Username: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + `/users/:Username/movies`, {
        headers: new HttpHeaders({ Authorization: 'Bearer ' + token }),
      })
      .pipe(map(
        this.extractResponseData),
        catchError(this.handleError)
      );
  } 
  */

  // Add a movie to favourite Movies
  addFavoriteMovie(_id: any): Observable<any> {
    const token = localStorage.getItem('token');
    const Username = localStorage.getItem('Username');
    return this.http
      .post(apiUrl + `/users/:Username/add-movies/:_id`, {
        headers: new HttpHeaders({ Authorization: 'Bearer ' + token }),
      })
      .pipe(map(
        this.extractResponseData),
        catchError(this.handleError)
      );
  }

  // Delete a movie from the favorite movies list
  deleteFavoriteMovie(_id: any): Observable<any> {
    const token = localStorage.getItem('token');
    const Username = localStorage.getItem('Username');
    return this.http
      .delete(apiUrl + `/users/:Username/delete-movies/:_id`, {
        headers: new HttpHeaders({ Authorization: 'Bearer ' + token }),
      })
      .pipe(map(
        this.extractResponseData),
        catchError(this.handleError)
      );
  }

  // Edit user
  editUser(userDetails: any): Observable<any> {
    const token = localStorage.getItem('token');
    const Username = localStorage.getItem('Username');
    return this.http
      .put(apiUrl + `/users/:Username`, userDetails, {
        headers: new HttpHeaders({ Authorization: 'Bearer ' + token }),
      })
      .pipe(map(
        this.extractResponseData),
        catchError(this.handleError)
      );
  }

  // Delete user
  deleteUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const Username = localStorage.getItem('Username');
    return this.http
      .delete(apiUrl + `/users/:Username`, {
        headers: new HttpHeaders({ Authorization: 'bearer ' + token }),
      })
      .pipe(map(
        this.extractResponseData),
        catchError(this.handleError)
      );
  }

  // Non-typed response extraction
  private extractResponseData(res: any): any {
    const body = res;
    return body || {};
  }

  // Error handler
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`
      );
    }

    return throwError(
      'Something bad happened; please try again later.');
  }
}