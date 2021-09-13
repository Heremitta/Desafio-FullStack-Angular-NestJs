import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, delay, retryWhen, takeWhile } from 'rxjs/operators';
import { AlertMessageService } from './alert-message.service';
import { LoaderService } from './loader.service';
import { UserDbService, UserLocalData } from './UserDb.service';

@Injectable({
  providedIn: 'root',
})
export class InterceptorService {
  private requests: HttpRequest<any>[] = [];
  private errors: number = 0;
  constructor(
    private _alertMessageService: AlertMessageService,
    private loaderService: LoaderService,
    private router: Router,
    private _userDbService: UserDbService
  ) {}

  removeRequest(req: HttpRequest<any>) {
    const i = this.requests.indexOf(req);
    if (i >= 0) {
      this.requests.splice(i, 1);
    }
    setTimeout(() => {
      this.loaderService.isLoading.next(this.requests.length > 0);
    }, 400);
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let token = localStorage.getItem('token');
    let reqDup;

    if (token) {
      reqDup = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + token),
      });
    }
    if (reqDup) {
      req = reqDup;
    }
    this.requests.push(req);
    this.loaderService.isLoading.next(this.requests.length > 0);
    return new Observable((observer) => {
      const subscription = next
        .handle(req)
        .pipe(
          catchError((err) => {
            ++this.errors;
            //   ((this.errors <= 5) && (err.status != 500) && (err.status != 501) && (err.status != 401))? this.errors = 0 : '';
            if (err.status == 401) {
              this._userDbService.logout();
              this.errors = 5;
              this.removeRequest(req);
              observer.complete();
              if (this.router.url != '/') {
                this._alertMessageService.setAlert('warning', err.error.error);
                // if(!this.router.url)
              }
            }
            if (err.status == 501 || err.status == 500) {
              this.errors = 5;
              this._alertMessageService.setAlert('warning', err.error.error);
              console.log(err);
              this.removeRequest(req);
              observer.complete();
            }
            if (err.status == 400) {
              this.errors = 5;

              this._alertMessageService.setAlert('warning', err.error.error);

              console.log(err);
              this.removeRequest(req);
              observer.complete();
            }
            if (err.status == 409) {
              this.errors = 5;
              this._alertMessageService.setAlert('warning', err.error.error);

              console.log(err);
              this.removeRequest(req);
              observer.complete();
            }
            if (err.status == 404) {
              this._alertMessageService.setAlert('warning', err.error.error);

              this.removeRequest(req);
              observer.complete();
            }

            // console.log('Houve um erro ao fazer o pedido, tentando novamente!')
            return throwError(err);
          }),
          retryWhen((errors) => {
            return errors.pipe(
              takeWhile(
                (val) =>
                  (this.errors < 1 && val.status != 400) ||
                  (this.errors < 5 && val.status !== 404) ||
                  (this.errors < 5 && val.status == 500),
                true
              ),
              delay(1000)
            );
          })
        )
        .subscribe(
          (event) => {
            if (event instanceof HttpResponse) {
              this.removeRequest(req);
              observer.next(event);
            }
          },
          (err) => {
            this.removeRequest(req);
            observer.error(err);
          },
          () => {
            this.removeRequest(req);
            observer.complete();
          }
        );
      // remove request from queue when cancelled
      return () => {
        this.removeRequest(req);
        subscription.unsubscribe();
      };
    });
  }

  async checkUserIndexedDb(): Promise<UserLocalData> {
    return await this._userDbService.getUser();
  }
}
