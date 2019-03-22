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
}
