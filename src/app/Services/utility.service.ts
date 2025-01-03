import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

/****** Timer*****/
  private timeLeftSource = new BehaviorSubject<number>(0); 
  private timer: any;

  constructor() {}

/****** Timer*****/
  startTimer(duration: number): Observable<number> {
    this.stopTimer(); 
    this.timeLeftSource.next(duration);

    this.timer = setInterval(() => {
      const currentTime = this.timeLeftSource.value;
      if (currentTime > 0) {
        this.timeLeftSource.next(currentTime - 1); 
      } else {
        this.stopTimer(); 
      }
    }, 1000);

    return this.timeLeftSource.asObservable();
  }
  
  stopTimer(): void {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }
}
