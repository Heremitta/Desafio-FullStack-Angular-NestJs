import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

export abstract class CrudService<T, C> {
  _APIURL;
  constructor(private http: HttpClient, api: string) {
    this._APIURL = api;
  }
  get _http() {
    return this.http;
  }
  list(): Observable<T[]> {
    return this.http.get<T[]>(this._APIURL);
  }
  loadByID(id: string): Observable<T> {
    return this.http.get<T>(`${this._APIURL}/${id}`).pipe(take(1));
  }
  private create(record: C): Observable<T> {
    return this.http
      .post<T>(this._APIURL, record, {
        reportProgress: true,
      })
      .pipe(take(1));
  }
  private update(record: T) {
    let resolve: any = record;
    return this.http
      .patch<T>(`${this._APIURL}/${resolve.id}`, record, {
        reportProgress: true,
      })
      .pipe(take(1));
  }

  save(record: T | C) {
    let resolve: any = record;
    if (resolve['id']) {
      return this.update(resolve);
    }
    return this.create(resolve);
  }
  remove(id: string) {
    return this.http.delete(`${this._APIURL}/${id}`);
  }
}
