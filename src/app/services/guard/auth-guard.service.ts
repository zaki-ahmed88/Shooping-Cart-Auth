import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from "../auth.service";

import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {




  //Router => CanActive: true (accessible) or false (no one can access)


  constructor(private auth: AuthService, private router: Router) {}

  canActivate(router, state: RouterStateSnapshot)
  {
    return this.auth.user$.pipe(map(user =>
      {
        if(user) return true;
        this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
        return false;
      }))
  }
}
