import { Component, OnInit } from '@angular/core';
// import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-business-reload',
  templateUrl: './business-reload.component.html',
  styleUrls: ['./business-reload.component.less']
})
export class BusinessReloadComponent implements OnInit {

  public establishingConnection = {
    isProcessing: true,
    isDone: false
  }

  public fetchingTransactions = {
    isProcessing: false,
    isDone: false
  }

  public generatingReports = {
    isProcessing: false,
    isDone: false
  }

  public settingUpProjects = {
    isProcessing: false
  }

  constructor() { }

  ngOnInit() {
    setTimeout(() => {
      this.establishingConnection.isProcessing = false;
      this.establishingConnection.isDone = true;
      this.fetchingTransactions.isProcessing = true;
    }, 3000);
    setTimeout(() => {
      this.fetchingTransactions.isProcessing = false;
      this.fetchingTransactions.isDone = true;
      this.generatingReports.isProcessing = true;
    }, 15000);
    setTimeout(() => {
      this.generatingReports.isProcessing = false;
      this.generatingReports.isDone = true;
      this.settingUpProjects.isProcessing = true;
    }, 80000);
  }

}
