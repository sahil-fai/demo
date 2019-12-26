import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SwitchCompanyService {
    private emitChangeSource = new Subject<any>();
    companySwitched = this.emitChangeSource.asObservable();
    switchCompany() {
      this.emitChangeSource.next();
    }
}
