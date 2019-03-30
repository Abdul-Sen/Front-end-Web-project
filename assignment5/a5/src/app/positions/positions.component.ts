import { Component, OnInit, OnDestroy } from '@angular/core';
import { PositionService } from '../data/position.service';
import { Position} from '../data/position';
import {Router } from '@angular/router';

@Component({
  selector: 'app-positions',
  templateUrl: './positions.component.html',
  styleUrls: ['./positions.component.css']
})
export class PositionsComponent implements OnInit, OnDestroy {

  positions: Position[];
  getPositionsSub: any;
  loadingError: boolean = false;

  constructor(private ps: PositionService, private router: Router) { }

  ngOnInit() {
    this.getPositionsSub = this.ps.getPositions().subscribe(
        (next)=>{this.positions = next;},
        (err)=>{this.loadingError = true;},
        ()=>{console.log(`complete`)});
  }

  routePosition(id: string)
  {
    console.log(id);
    this.router.navigate(['/position/', id]); //Instance route navigation
  }

  ngOnDestroy(){
    if(this.getPositionsSub && this.getPositionsSub != undefined)
    this.getPositionsSub.unsubscribe();
  }
  

}
