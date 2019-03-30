import { Component, OnInit, OnDestroy } from '@angular/core';
import { EmployeeRaw } from '../data/employeeRaw';
import { EmployeeService } from '../data/employee.service';
import { ActivatedRoute } from '@angular/router';
import { PositionService } from '../data/position.service';
import { Position } from '../data/position';



@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit, OnDestroy {
  paramSubscription: any;
  employeeSubscription: any;
  getPositionsSubcription: any;
  saveEmployeeSubscription: any;
  employee: EmployeeRaw;
  positions: Position[];
  successMessage: boolean = false;
  failMessage: boolean = false;

  constructor(private es: EmployeeService, private ar: ActivatedRoute, private ps: PositionService) { }

  ngOnInit() {
    this.paramSubscription = this.ar.snapshot.params['id'];
    //Getting employee
    this.employeeSubscription = this.es.getEmployee(this.paramSubscription).subscribe(
      (results) => {
        this.employee = results[0];
      },
      (err) => { console.log(err) },
      () => { console.log(`Completed`) });

    //Getting positions
    this.getPositionsSubcription = this.ps.getPositions().subscribe(
      (results) => {
        this.positions = results;
      },
      (err) => { console.log(err) },
      () => { console.log(`Completed`) });
  }

  onSubmit() {
    this.saveEmployeeSubscription = this.es.saveEmployee(this.employee).subscribe(
      (data) => {
        console.log(data);
        this.successMessage = true;
        setTimeout(() => {
          this.successMessage = false;
        }, 2500);
      },
      (err) => {
        console.log(`error! ${err}`);
        this.failMessage = true;
        setTimeout(() => {
          this.failMessage = false;
        }, 2500);
      },
      ()=>{console.log(`completed`)});
  }

  ngOnDestroy(){
    // console.log(this.paramSubscription)
    // if(this.paramSubscription && this.paramSubscription != undefined)
    // this.paramSubscription.unsubscribe();

    console.log(this.employeeSubscription)
    if(this.employeeSubscription && this.employeeSubscription != undefined)
    this.employeeSubscription.unsubscribe();

    console.log(this.saveEmployeeSubscription)
    if(this.saveEmployeeSubscription && this.saveEmployeeSubscription != undefined)
    this.saveEmployeeSubscription.unsubscribe();

    console.log(this.getPositionsSubcription)
    if(this.getPositionsSubcription && this.getPositionsSubcription != undefined)
    this.getPositionsSubcription.unsubscribe();
    
  }

}