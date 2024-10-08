import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router, CanMatch, CanActivate, Route, ActivatedRouteSnapshot, GuardResult, MaybeAsync, RouterStateSnapshot, UrlSegment } from '@angular/router';
import { map, Observable, tap } from 'rxjs';

@Injectable({providedIn: 'root'})
export class PublicGuard implements CanMatch, CanActivate{
  constructor(
    private authService:AuthService,
    private router: Router,
  ) { }

  private checkAuthStatus():Observable<boolean>{
    return this.authService.checkAuthentication()
      .pipe(
        tap(isAuthenticated => {
          if(isAuthenticated ){
            this.router.navigate(['./'])
          }
        }),
        map( isAuthenticated => !isAuthenticated)
      )
  }
  canMatch(route: Route, segments: UrlSegment[]): MaybeAsync<GuardResult> {
    return this.checkAuthStatus();
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    return this.checkAuthStatus();
  }

}
