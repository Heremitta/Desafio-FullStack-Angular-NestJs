import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable, Subscription } from "rxjs";
import { authLoginDto } from "src/app/shared/dtos/login.dto";
import { environment } from "src/environments/environment";
import { AlertMessageService } from "./alert-message.service";
import { UserDbService, UserLocalData } from "./UserDb.service";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  isLoged = new BehaviorSubject(false);
  user$: Observable<authLoginDto> = new Observable();
  currentUSer: authLoginDto | undefined;

  constructor(
    private _http: HttpClient,
    private userUb: UserDbService,
    private _router: Router,
    private alertMessage: AlertMessageService,
  ) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  }
  login(email: string, senha: string) {
    return this._http.post<authLoginDto>(environment.API + "auth/login", {
      email,
      senha,
    });
  }
  checkUserIndexedDb() {
    let storage = localStorage.getItem("token");
    let indexedDb = this.userUb.getUser();
    let result = storage ? storage : indexedDb;
    return result;
  }
  getProfile() {
    return this._http.get<authLoginDto>(environment.API + "auth/profile");
  }
  async haveToken() {
    this.user$ = this.getProfile();
    let sub: Subscription = this.user$.subscribe(
      async (login) => {
        debugger;
        if ("user" in login) {
          this.isLoged.next(true);
          this.currentUSer = login;
          let a = await this.userUb.saveUser({
            token: login.access_token,
            userId: <string>login.user.id,
          });
          this._router.navigate(["/dashboard"]);
        }
      },
      (erro) => {
        console.log(erro);
      },
      () => {
        sub.unsubscribe();
      },
    );
  }
  logout() {
    this.alertMessage.setAlert(
      "warning",
      `Efetuando Logout! Até mais ${this.currentUSer?.user.nome}`,
    );
    this.userUb.logout();
    this.user$ = new Observable();
    this.currentUSer = undefined;
    this.isLoged.next(false);
    setTimeout(() => {
      this._router.navigate(["/"]);
    }, 2000);
  }
}
