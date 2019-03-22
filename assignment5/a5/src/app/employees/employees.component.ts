import { Component, OnInit, OnDestroy } from '@angular/core';
import { Employee } from '../data/employee';
import { EmployeeService } from '../data/employee.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit, OnDestroy {

  employees: Employee[] = [];
  getEmployeeSub: any;
  loadingError: boolean = false;
  constructor(private es: EmployeeService) { }

  ngOnInit() {

    this.getEmployeeSub = this.es.getEmployees().subscribe(
      (next)=>{console.log(next); this.employees = next;},
      (err)=>{this.loadingError = true;},
      ()=>{console.log(`complete`)}
      );
  }
  // next(item){console.log(`next item is : ${item}`)},
  // error(err){ this.loadingError = true; console.log(`error occured getting employeess!!`)},
  // complete(data){ console.log(`here it is everyone! ${data}`)}

  ngOnDestroy(){
    if(this.getEmployeeSub && this.getEmployeeSub != undefined) this.getEmployeeSub.unsubscribe();
  }

}
