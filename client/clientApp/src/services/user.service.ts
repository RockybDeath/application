import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../models/i-user';
import { Observable, of } from 'rxjs';

@Injectable()
export class UserService {
  constructor(private http: HttpClient) {}

  public getUser(): Observable<IUser> {
    return of({
      id: 1,
      name: 'Alex',
    });
  }
}
