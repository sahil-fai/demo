import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notification-snackbar',
  templateUrl: './notification-snackbar.component.html',
  styleUrls: ['./notification-snackbar.component.less']
})
export class NotificationSnackbarComponent implements OnInit {
public message: string;
  constructor() { }
  ngOnInit() {}

}
