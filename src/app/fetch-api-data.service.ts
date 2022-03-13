/**
 * This file contains all the functions for API calls.
 * @module FetchApiDataService
 */
import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from '@angular/common/http';
import {
  Observable,
  throwError
} from 'rxjs';
import { map, catchError } from 'rxjs/operators';


/**
 * The root URL for the hosted API.
 * Declaring the API URL that will provide the data, then the user calls it.
 */
const apiUrl = 'https://movies-api-21.herokuapp.com';

@Injectable({
  providedIn: 'root'
})

/** 
 * Inject the HttpClient module to the constructor params
 * This will provide HttpClient to the entire class, making it available via this.http
 */
export class FetchApiDataService {
  constructor(private http: HttpClient) { }

  /**
   * This function calls the user registration endpoint.
   * @function userRegistration
   * @param userDetails {Username: <string>, Password: <string>
   * Email: <string>, BirthDate: <string (optional)>}
   * @returns data for new user in JSON format
   * { _id: <string>,
   *   Username: <string>,
   *   Password: <string> (hashed),
   *   Email: <string>,
   *   Birthday: <string>
   *   FavoriteMovies: []
   * }
   */
  public userRegistration(userDetails: any): Observable<any> {
    return this.http
      .post(apiUrl + 'users', userDetails)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * This function calls the user login endpoint.
   * @function userLogin
   * @param userDetails {Username: <string>, Password: <string>}
   * @returns  data for logged in user and JWT in JSON format
   * { user: {
   *   _id: <string>,
   *   Username: <string>,
   *   Password: <string> (hashed),
   *   Email: <string>,
   *   Birthday: <string>,
   *   FavoriteMovies: [<string>]
   *   },
   *   token: <string>
   * }
   */
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + 'login', userDetails)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * This function gets all movies data after login.
   * @function getAllMovies
   * Pulls token from localStorage for auth.
   * @returns object containing array of data for all movies
   * {[
   *   Genre: { Name: <string>, Description: <string> },
   *   Director: { Name: <string>, Bio: <string>, Birth: <string>, Deth: <string> },
   *   _id: <string>,
   *   Title: <string>,
   *   Description: <string>,
   *   Featured: <boolean>,
   *   ImagePath: <string> (example: "SchindlersList.png"),
   * ]}
   */
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

  /**
   * This function gets the data for one single movie by title.
   * @function getMovie
   * Pulls token from localStorage for authentication
   * @param Title <any>
   * @returns object containing data for one single movie.
   * {
   *   Genre: { Name: <string>, Description: <string> },
   *   Director: { Name: <string>, Bio: <string>, Birth: <string>, Deth: <string> },
   *   _id: <string>,
   *   Title: <string>,
   *   Description: <string>,
   *   Featured: <boolean>,
   *   ImagePath: <string> (example: "SchindlersList.png"),
   * }
   */
  getMovie(Title: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + '/movies/' + Title, {
        headers: new HttpHeaders({ Authorization: 'Bearer ' + token }),
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  /**
   * Gets one director name from API
   * @function getDirector
   * Pulls token from localStorage for authentication
   * @param Director {any}
   * @return a director's info in JSON format
   */
  getDirector(Director: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + '/directors/' + Director, {
        headers: new HttpHeaders({ Authorization: 'Bearer ' + token }),
      })
      .pipe(map(
        this.extractResponseData),
        catchError(this.handleError)
      );
  }

  /**
   * Gets one genre data from API
   * @function getGenre
   * Pulls token from localStorage for authentication
   * @param Genre {any}
   * @return one genre's data in JSON format
   */
  getGenre(Genre: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + '/genres/' + Genre, {
        headers: new HttpHeaders({ Authorization: 'Bearer ' + token }),
      })
      .pipe(map(
        this.extractResponseData),
        catchError(this.handleError)
      );
  }

  /**
   * This function calls to get user's data from API.
   * @function getUser
   * Pulls token from localStorage for authentication.
   * @returns object containing user's data.
   * { _id: <string>,
   *   Username: <string>,
   *   Password: <string> (hashed),
   *   Email: <string>,
   *   Birthday: <string>
   *   FavoriteMovies: [<string>]
   * }
   */
  getUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http
      .get(apiUrl + '/users/' + username, {
        headers: new HttpHeaders({ Authrization: 'Bearer ' + token }),
      })
      .pipe(map(
        this.extractResponseData),
        catchError(this.handleError)
      );
  }

  /**
   * This function gets the movie data of the user's favorite movie.
   * @function getFavoriteMovies
   * Pulls token from localStorage for authentication.
   * @returns [<string>]
   */
  getFavoriteMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http
      .get(apiUrl + '/users/' + username + '/movies', {
        headers: new HttpHeaders({ Authorization: 'Bearer ' + token }),
      })
      .pipe(map(
        this.extractResponseData),
        catchError(this.handleError)
      );
  }

  /**
   * This function adds a movie to a user's favorite list.
   * @function addFavoriteMovies
   * Pulls token from localStorage for authentication.
   * @param movieID <any>
   * @returns updated user data
   * { _id: <string>,
   *   Username: <string>,
   *   Password: <string> (hashed),
   *   Email: <string>,
   *   Birthday: <string>
   *   FavoriteMovies: [<string>]
   * }
   */
  public addFavoriteMovie(MovieID: any): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http
      .put(apiUrl + '/users/' + username + '/add-movies/' + MovieID, null, {
        headers: new HttpHeaders({ Authorization: 'Bearer ' + token }),
      })
      .pipe(map(
        this.extractResponseData),
        catchError(this.handleError)
      );
  }

  /**
   * Deletes a movie from a user's favorite list.
   * @function deleteFavoriteMovie
   * Pulls token from localStorage for authentication.
   * @param movieID <any>
   * @returns updated user data
   * { _id: <string>,
   *   Username: <string>,
   *   Password: <string> (hashed),
   *   Email: <string>,
   *   Birthday: <string>
   *   FavoriteMovies: [<string>]
   * }
   */
  deleteFavoriteMovie(movieId: any): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http
      .delete(apiUrl + '/users/' + username + '/delete-movies/' + movieId, {
        headers: new HttpHeaders({ Authorization: 'Bearer ' + token }),
      })
      .pipe(map(
        this.extractResponseData),
        catchError(this.handleError)
      );
  }

  /**
   * This function updates the user's account info.
   * Pulls username and token from local storage to use for endpoint and authorization.
   * @param userDetails {Username: <string>, Password: <string>,
   * Email: <string>, BirthDate: <string>} (all fields optional)
   * @returns updated user info
   * { _id: <string>,
   *   Username: <string>,
   *   Password: <string> (hashed),
   *   Email: <string>,
   *   Birthday: <string>
   *   FavoriteMovies: [<string>]
   * }
   */
  editUser(userDetails: any): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http
      .put(apiUrl + '/users/' + username, userDetails, {
        headers: new HttpHeaders({ Authorization: 'Bearer ' + token }),
      })
      .pipe(map(
        this.extractResponseData),
        catchError(this.handleError)
      );
  }

  /**
   * This funtion deletes the current user's account
   * @function deleteUser
   * Pulls token from localStorage for authentication.
   * @returns delete status
   */
  deleteUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http
      .delete(apiUrl + '/users/' + username, {
        headers: new HttpHeaders({ Authorization: 'Bearer ' + token }),
      })
      .pipe(map(
        this.extractResponseData),
        catchError(this.handleError)
      );
  }

  /**
  * Non-typed response extracttion
  * @param res {any}
  * @returns response || empty object
  */
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
      'Something is wrong. Please, try again');
  }
}