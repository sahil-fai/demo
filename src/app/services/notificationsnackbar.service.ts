import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {MatSnackBar,MatSnackBarConfig,MatSnackBarHorizontalPosition,MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
import { NotificationSnackbarComponent } from '../../app/Shared/notification-snackbar/notification-snackbar.component';


@Injectable({
  providedIn: 'root'
})
export class NotificationsnackbarService {
private snackbarSubject= new Subject<any>();
public snackbarState= this.snackbarSubject.asObservable();
autoHide: number = 1000;
horizontalPosition: MatSnackBarHorizontalPosition = 'center';
verticalPosition: MatSnackBarVerticalPosition = 'bottom';
public notification$: Subject<string> = new Subject();
  constructor(private _snackBar: MatSnackBar) { }
  public openSnackBar(message,  action: string) {
    let config = new MatSnackBarConfig();
    config.verticalPosition = this.verticalPosition;
    config.horizontalPosition = this.horizontalPosition;
   // config.duration=this.autoHide;
    this._snackBar.open(message,action, config);
    // this._snackBar.openFromComponent(NotificationSnackbarComponent, {
    //   duration: 5000,
    //   data: { message: message}
    // });
  }
}
  