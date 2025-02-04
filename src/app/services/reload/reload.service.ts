import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReloadService {
  private reloadSubject = new BehaviorSubject<boolean>(false);
  reload$ = this.reloadSubject.asObservable();

  triggerReload(): void {
    this.reloadSubject.next(true);
  }
}