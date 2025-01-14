import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PassSelectedTimeSlotService {
  private reloadSubject = new BehaviorSubject<(Date | number)[]>([]);
  reload$ = this.reloadSubject.asObservable();

  triggerReload(date: Date, timeslot: number): void {
    this.reloadSubject.next([date, timeslot]);
  }
}