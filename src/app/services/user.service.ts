import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'http://localhost:8888/users';

  constructor(public httpClient: HttpClient) { }

  public getAll(): Observable<User> {
    return this.httpClient.get<User>(this.baseUrl);
  }

  public add(user: User): Observable<boolean> {
    return this.httpClient.post<boolean>(this.baseUrl, user);
  }

  public update(user: User): Observable<boolean> {
    return this.httpClient.put(this.baseUrl + `/${user.id}`, user);
  }

  public delete(user: User): Observable<boolean> {
    return this.httpClient.delete(this.baseUrl + `/${user.id}`);
  }

  public getUserByName(): Observable<User> {
    return this.httpClient.get<User>(this.baseUrl + '/my-info');
  }
}
