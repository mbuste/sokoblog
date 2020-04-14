import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service'
import {take, tap, map} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(private auth: AuthService, private router: Router){}
  
  canActivate(): Observable<boolean> {

    return this.auth.user$.pipe(
      take(1),
      map(user=>!!user),
      tap(loggedIn=>{
        if(!loggedIn){
          this.router.navigate(['/'])
          return false;
        }else{
          return true;
        }
      })
    )
  }

}
