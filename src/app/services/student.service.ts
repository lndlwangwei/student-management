import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Student} from '../models/Student';
import {Observable} from 'rxjs';
import {Pagination} from '../models/Pagination';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private baseUrl = 'http://localhost:8888/users';

  constructor(public httpClient: HttpClient) { }

  public get(params: any): Observable<Pagination<Student>> {
    return this.httpClient.get<Pagination<Student>>(`${this.baseUrl}`, {params: params});
  }

  public add(student: Student): Observable<Student> {
    return this.httpClient.post<Student>(`${this.baseUrl}`, student);
  }

  public update(student: Student): Observable<Student> {
    return this.httpClient.put<Student>(`${this.baseUrl}/${student.id}`, student);
  }

  public delete(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.baseUrl}/${id}`);
  }
}
