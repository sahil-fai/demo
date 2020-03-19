import { Component, OnInit, Inject, ElementRef, ViewChild } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { BusinessService } from 'src/app/services/business-service/business.service';

export interface DialogData {
  currentUserid: any
  }

@Component({
  selector: 'disconnect-business-modal',
  templateUrl: './disconnect-business-modal.component.html',
})
export class DisconnectBusinessModalComponent implements OnInit {

  public SelectedData:any;
    constructor(public businessService: BusinessService,
        public dialogRef: MatDialogRef<DisconnectBusinessModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData) {}


    ngOnInit(){
    }
    onNoClick(): void {
      this.dialogRef.close();
    }

    diconnectBusiness(): void{
       this.SelectedData={
        Disconnect: true
      };
      this.dialogRef.close({ data:  this.SelectedData});
    }
}