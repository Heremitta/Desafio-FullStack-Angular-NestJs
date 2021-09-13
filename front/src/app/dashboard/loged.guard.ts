import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { Observable } from "rxjs";
import { AlertMessageService } from "../shared/services/alert-message.service";
import { AuthService } from "../shared/services/auth.service";

@Injectable({
  providedIn: "root",
})
export class LogedGuard implements CanActivate {
  constructor(
    private _authService: AuthService,
    private _router: Router,
    private alertMessageService: AlertMessageService,
  ) {}

  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    let user = this._authService.checkUserIndexedDb();
    if (user) {
      this._authService.haveToken();
    } else {
      if (!this._authService.isLoged.value) {
        this._authService.logout();
      }
      this.alertMessageService.setAlert(
        "warning",
        "Efetue o login para entrar!",
      );
    }
    return this._authService.isLoged.value;
  }
}
