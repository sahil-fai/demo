import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private numberOfRequests = 0;

  private loaderSubject = new Subject<any>();

  loaderState = this.loaderSubject.asObservable();

  showLoader() {
    this.numberOfRequests++;
    console.log(this.numberOfRequests)
    this.loaderSubject.next(this.numberOfRequests);
  }

  hideLoader() {
    if (this.numberOfRequests > 0) {
      console.log(this.numberOfRequests)
      this.numberOfRequests--;
    }
    this.loaderSubject.next(this.numberOfRequests);
  }
}
