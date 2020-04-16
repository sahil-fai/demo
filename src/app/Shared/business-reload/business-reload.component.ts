import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
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
    isProcessing: false,
    isDone: false
  }
  public connectionSource: string;
  constructor( @Inject(MAT_DIALOG_DATA) public data, public dialogRef: MatDialogRef<BusinessReloadComponent>) {
  this.connectionSource = this.data.connectedSource;

   }

  ngOnInit() {
    setTimeout(() => {
      this.establishingConnection.isProcessing = false;
      this.establishingConnection.isDone = true;
      this.fetchingTransactions.isProcessing = true;
    }, 1000);
    setTimeout(() => {
      this.fetchingTransactions.isProcessing = false;
      this.fetchingTransactions.isDone = true;
      this.generatingReports.isProcessing = true;
    }, 2000);
    setTimeout(() => {
      this.generatingReports.isProcessing = false;
      this.generatingReports.isDone = true;
      this.settingUpProjects.isProcessing = true;    
      this.dialogRef.close();
    }, 3500);
    
  }
}
