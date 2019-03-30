import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Position } from './position';

@Injectable({
  providedIn: 'root'
})
export class PositionService {

  constructor(private myHttps: HttpClient) { }

  getPositions(): Observable<Position[]>
  {
    return this.myHttps.get<Position[]>(`https://polar-headland-60757.herokuapp.com/positions`);
  }

  savePosition(position: Position) {
    return this.myHttps.put<any>(`https://polar-headland-60757.herokuapp.com/position/${position._id}`, position);
  }

  getPosition(id)
  {
    return this.myHttps.get<Position[]>(`https://polar-headland-60757.herokuapp.com/position/${id}`);//Returns array with 1 element
  }
}
