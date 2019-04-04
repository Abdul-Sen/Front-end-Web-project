import { Component, OnInit, OnDestroy } from '@angular/core';
import { Employee } from '../data/employee';
import { EmployeeService } from '../data/employee.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit, OnDestroy {

  employees: Employee[] = [];
  filteredEmployees: Employee[];
  getEmployeeSub: any;
  loadingError: boolean = false;
  constructor(private es: EmployeeService, private router: Router) { }

  ngOnInit() {

    this.getEmployeeSub = this.es.getEmployees().subscribe(
      (next) => {
        this.employees = next;
        this.filteredEmployees = next;
      },
      (err) => { this.loadingError = true; },
      () => { console.log(`complete`) }
    );
  }

  routeEmployee(id: string) {
    console.log(id);
    this.router.navigate(['/employee/', id]); //Instance route navigation
  }

  ngOnDestroy() {
    if (this.getEmployeeSub && this.getEmployeeSub != undefined) this.getEmployeeSub.unsubscribe();
  }

  onEmployeeSearchKeyUP($event) {
    console.log($event.target.value);
    this.filteredEmployees = this.employees.filter((currentElement) => {

      //Please tell me a better way
      if ((currentElement.FirstName.toLocaleLowerCase()).includes(($event.target.value).toLocaleLowerCase())
        ||
        (currentElement.LastName.toLocaleLowerCase()).includes(($event.target.value).toLocaleLowerCase())
        ||
        (currentElement.Position.PositionName.toLocaleLowerCase()).includes(($event.target.value).toLocaleLowerCase())) {
        return currentElement;
      }
    })
  }

}
