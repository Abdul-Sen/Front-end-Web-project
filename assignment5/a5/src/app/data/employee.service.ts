import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from './employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private myHttp: HttpClient) { }

  getEmployees() : Observable<Employee[]>
  {
    return this.myHttp.get<Employee[]>(`https://polar-headland-60757.herokuapp.com/employees`);
  }
}