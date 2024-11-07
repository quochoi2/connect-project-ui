import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { authService } from './services/authService';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: authService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const currentUser = this.authService.currentUserValue;

    if (currentUser) {
      if (route.data['role'] && route.data['role'] !== currentUser.role) {
        this.router.navigate(['/unauthorized']);
        return false;
      }
      return true;
    }

    const token = localStorage.getItem('token');
    if (token) {
      const currentUser = this.authService.currentUserValue;
      if (currentUser.role === 'admin') {
        this.router.navigate(['/admin-dashboard']);
      } else if (currentUser.role === 'user') {
        this.router.navigate(['/user-dashboard']);
      }
      return false;
    }
    return true;
  }
}
