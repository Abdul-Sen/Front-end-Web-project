import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from './employee';
import { EmployeeRaw } from './employeeRaw';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private myHttp: HttpClient) { }

  getEmployees() : Observable<Employee[]>
  {
    return this.myHttp.get<Employee[]>(`https://polar-headland-60757.herokuapp.com/employees`);
  }
  
  saveEmployee(employee: EmployeeRaw)
  {
    return this.myHttp.put<any>(`https://polar-headland-60757.herokuapp.com/employee/${employee._id}`, employee);//TODO: Might need to add `:`
  }

  getEmployee(id)
  {
    return this.myHttp.get<EmployeeRaw[]>(`https://polar-headland-60757.herokuapp.com/employee-raw/${id}`);//Returns array with 1 element
  }
}