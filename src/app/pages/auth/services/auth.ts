import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../../../environments/environment';
import { AuthResponse } from '../../../shared/models/auth.interface';

const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token = new BehaviorSubject<string>("");
  private tokenData = new BehaviorSubject<any>({});

  constructor(
    private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar
  ) { 
    this.checkToken();
  }

  get token$(): Observable<string> {
    return this.token.asObservable();
  }

  get tokenData$(): Observable<any> {
    return this.tokenData.asObservable();
  }

  handlerError(error: any): Observable<never> {
    let errorMessage = "Ocurrio un error";
    if (error) {
      errorMessage = `${error.error.message}`;
    }
    this.snackBar.open(errorMessage, '', {
      duration: 5 * 1000,
      panelClass: ['error-snackbar'],
      horizontalPosition: 'right',
      verticalPosition: 'top'
    });
    return throwError(errorMessage);
  }

  saveLocalStorage(token: string) {
    localStorage.setItem("token", token);
  }

  logout() {
    localStorage.removeItem("token");
    this.token.next("");
    this.tokenData.next(null);
    this.router.navigate(['/']);
  }

  checkToken() {
    const token = localStorage.getItem("token");
    if (token) {
      const isExpired = helper.isTokenExpired(token);
      if (isExpired) {
        this.logout();
      } else {
        this.token.next(token);
        // renovar los datos del perfil
        const { iat, exp, ...data } = helper.decodeToken(token);
        this.tokenData.next(data);
      }
    } else {
      this.logout();
    }
  }

  login(loginData: any): Observable<AuthResponse | void> {
    return this.http.post<AuthResponse>(`${environment.API_URL}/auth`, loginData)
      .pipe(
        map((data: AuthResponse) => {
          if (data.token) {
            this.saveLocalStorage(data.token);
            this.token.next(data.token);
            this.router.navigate(['/home']);
            this.checkToken();
          }
          return data;
        }),
        catchError((error) => this.handlerError(error))
      );
  }
}
