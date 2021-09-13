import { Token } from '@angular/compiler/src/ml_parser/lexer';
import { Injectable } from '@angular/core';
import dexie from 'dexie';

export interface UserLocalData {
  userId: string;
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserDbService extends dexie {
  userDb: dexie.Table<UserLocalData, any>;
  user: UserLocalData = { userId: '', token: '' };

  constructor() {
    super('db-user');
    this.version(1).stores({
      user: '++id',
    });
    this.userDb = this.table('user');

    this.userDb.toArray().then((usuario) => {
      this.user = usuario[0];
    });
  }
  getUser() {
    return this.userDb.toArray((user) => (this.user = user[0]));
  }

  async saveUser(user: UserLocalData) {
    try {
      await this.userDb.clear();
      localStorage.setItem('token', user.token);
      await this.userDb.add(user);
      let dados = await this.userDb.toArray();
      console.log('User save in indexedDb ', dados);
    } catch (e) {
      console.log('erro to save user in indexedDb ', e);
    }
  }
  logout() {
    this.userDb.clear();
    localStorage.clear();
  }
}
