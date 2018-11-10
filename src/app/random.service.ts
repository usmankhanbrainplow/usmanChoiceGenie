import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class RandomService {

  private msgsource = new BehaviorSubject<string>('75001');
  telecast = this.msgsource.asObservable();
  constructor() { }
  eidtMsg(newmsg){
    this.msgsource.next(newmsg);
  }

}
