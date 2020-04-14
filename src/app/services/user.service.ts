import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { IUser } from '../models/user.model'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  uri = "https://jsonplaceholder.typicode.com/users"


  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get<Array<IUser>>(this.uri)
  }

  addUser(user: IUser) {
    return this.http.post(this.uri, user)
  }

  deleteUser(id: string) {
    return this.http.delete(`${this.uri}/${id}`)
  }

  getUserById(payload: string): Observable<IUser> {
    return this.http.get<IUser>(`${this.uri}/${payload}`);
  }

  updateUser(user: IUser) {
    return this.http.patch(`${this.uri}/${user.id}`, user);
  }
}
