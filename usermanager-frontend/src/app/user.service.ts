import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:8080'
  constructor(private http: HttpClient) {}

  public getUsers() : Observable<User[]>{
    return this.http.get<User[]>(`${this.baseUrl}/user/all`)
  }
  public addUser(user : User) : Observable<User>{
    return this.http.post<User>(`${this.baseUrl}/user/add`,user)
  }
  public updateUser(user : User) : Observable<User>{
    return this.http.put<User>(`${this.baseUrl}/user/update`,user)
  }
  public deleteUser(id : number) : Observable<void>{
    return this.http.delete<void>(`${this.baseUrl}/user/delete/${id}`)
  }
}
