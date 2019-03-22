import { Component, OnInit, OnDestroy } from '@angular/core';
import { PositionService } from '../data/position.service';
import { Position} from '../data/position';

@Component({
  selector: 'app-positions',
  templateUrl: './positions.component.html',
  styleUrls: ['./positions.component.css']
})
export class PositionsComponent implements OnInit, OnDestroy {

  positions: Position[];
  getPositionsSub: any;
  loadingError: boolean = false;

  constructor(private ps: PositionService) { }

  ngOnInit() {
    this.getPositionsSub = this.ps.getPositions().subscribe(
        (next)=>{console.log(next); this.positions = next;},
        (err)=>{this.loadingError = true;},
        ()=>{console.log(`complete`)});
  }

  ngOnDestroy(){
    if(this.getPositionsSub && this.getPositionsSub != undefined)
    this.getPositionsSub.unsubscribe();
  }
  

}
