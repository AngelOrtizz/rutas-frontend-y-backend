import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from '../../pages/auth/services/auth';

@Injectable({
  providedIn: 'root'
})
export class CheckLoginGuard implements CanActivate {
  constructor(private authSvc: AuthService) { }

  canActivate(): Observable<boolean> {
    return this.authSvc.token$.pipe(
      take(1),
      map(token => (token === '' ? true : false)) 
    );
  }
}
