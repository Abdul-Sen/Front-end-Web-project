import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Position } from '../data/position';
import { PositionService } from '../data/position.service';

@Component({
  selector: 'app-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.css']
})
export class PositionComponent implements OnInit, OnDestroy {

  paramSubscription: any;
  positionSubscription: any;
  savePositionSubscription: any;
  position: Position;
  successMessage: boolean = false;
  failMessage: boolean = false;

  constructor(private ps: PositionService, private ar: ActivatedRoute) { }

  ngOnInit() {
    this.paramSubscription = this.ar.snapshot.params['id'];
    this.positionSubscription = this.ps.getPosition(this.paramSubscription).subscribe(
      (results) => {
        this.position = results[0];
      },
      (err) => { console.log(err) },
      () => { console.log(`completed`) });
  }

  OnSubmit() {
    this.savePositionSubscription = this.ps.savePosition(this.position).subscribe(
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
      () => { console.log(`completed`) }
    );
  }

  ngOnDestroy() {
    console.log(this.positionSubscription)
    if (this.positionSubscription && this.positionSubscription != undefined)
      this.positionSubscription.unsubscribe();

    console.log(this.savePositionSubscription)
    if (this.savePositionSubscription && this.savePositionSubscription != undefined)
      this.savePositionSubscription.unsubscribe();


    console.log(this.paramSubscription)
    if (this.paramSubscription && this.paramSubscription != undefined)
      this.paramSubscription.unsubscribe();
  }

}
